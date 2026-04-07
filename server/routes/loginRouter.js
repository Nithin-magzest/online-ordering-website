const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const twilio = require("twilio");

const router = express.Router();

const JWT_SECRET = process.env.JWT_SECRET || "change_this_secret_in_production";
const client = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN,
);

// ── User Schema ────────────────────────────────────────────────────────────────
const userSchema = new mongoose.Schema({
  userId: { type: String, required: true, unique: true, trim: true },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: { type: String, required: true, minlength: 6 },
  phone: { type: String, required: false, unique: true },
  location: {
    latitude: { type: Number, default: null },
    longitude: { type: Number, default: null },
    address: { type: String, default: null },
    locationGranted: { type: Boolean, default: false },
  },
  createdAt: { type: Date, default: Date.now },
  lastLogin: { type: Date, default: null },
});

// Hash password before saving
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(12);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Reuse model if hot-reload
const User = mongoose.models.User || mongoose.model("User", userSchema);

// ── Helper ─────────────────────────────────────────────────────────────────────
const signToken = (user) =>
  jwt.sign(
    { id: user._id, userId: user.userId, email: user.email },
    JWT_SECRET,
    { expiresIn: "7d" },
  );

// ── REGISTER ──────────────────────────────────────────────────────────────────
router.post("/register", async (req, res) => {
  try {
    const { userId, email, password, location, phone } = req.body;

    if (!userId || !email || !password) {
      return res
        .status(400)
        .json({
          success: false,
          message: "User ID, email, and password are required.",
        });
    }

    if (password.length < 6) {
      return res
        .status(400)
        .json({
          success: false,
          message: "Password must be at least 6 characters.",
        });
    }

    const existing = await User.findOne({
      $or: [
        { userId: userId.trim() },
        { email: email.toLowerCase().trim() },
        { phone: phone ?? null },
      ],
    });

    if (existing) {
      const field =
        existing.userId === userId.trim()
          ? "User ID"
          : existing.email === email
            ? "Email"
            : "Phone";
      return res
        .status(409)
        .json({ success: false, message: `${field} is already taken.` });
    }

    const newUser = new User({
      userId: userId.trim(),
      email: email.toLowerCase().trim(),
      password,
      phone: phone ?? null,
      location: {
        latitude: location?.latitude ?? null,
        longitude: location?.longitude ?? null,
        address: location?.address ?? null,
        locationGranted: location?.locationGranted ?? false,
      },
    });

    await newUser.save();
    const token = signToken(newUser);

    res.status(201).json({
      success: true,
      message: "Account created successfully! 🎉",
      token,
      user: {
        userId: newUser.userId,
        email: newUser.email,
        phone: newUser.phone,
      },
    });
  } catch (err) {
    console.error("[REGISTER ERROR]", err);
    res
      .status(500)
      .json({ success: false, message: "Server error. Try again." });
  }
});

// ── LOGIN (Email/Password) ─────────────────────────────────────────────────────
router.post("/login", async (req, res) => {
  try {
    const { userId, password, location } = req.body;
    if (!userId || !password)
      return res
        .status(400)
        .json({ success: false, message: "User ID and password required." });

    const user = await User.findOne({ userId: userId.trim() });
    if (!user)
      return res
        .status(401)
        .json({ success: false, message: "Invalid credentials." });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res
        .status(401)
        .json({ success: false, message: "Invalid credentials." });

    // Update last login & location
    user.lastLogin = new Date();
    if (location?.locationGranted) {
      user.location = {
        latitude: location.latitude ?? user.location.latitude,
        longitude: location.longitude ?? user.location.longitude,
        address: location.address ?? user.location.address,
        locationGranted: true,
      };
    }
    await user.save();

    const token = signToken(user);
    res.status(200).json({
      success: true,
      message: `Welcome back, ${user.userId}!`,
      token,
      user: {
        userId: user.userId,
        email: user.email,
        phone: user.phone,
        locationGranted: user.location.locationGranted,
      },
    });
  } catch (err) {
    console.error("[LOGIN ERROR]", err);
    res
      .status(500)
      .json({ success: false, message: "Server error. Try again." });
  }
});

// ── OTP SEND ───────────────────────────────────────────────────────────────────
router.post("/send-otp", async (req, res) => {
  try {
    const { phone } = req.body;
    if (!phone)
      return res
        .status(400)
        .json({ success: false, message: "Phone number required" });

    const verification = await client.verify.v2
      .services(process.env.TWILIO_SERVICE_SID)
      .verifications.create({ to: phone, channel: "sms" });

    res
      .status(200)
      .json({ success: true, message: "OTP sent", sid: verification.sid });
  } catch (err) {
    console.error("[OTP SEND ERROR]", err);
    res.status(500).json({ success: false, message: "Failed to send OTP" });
  }
});

// ── OTP VERIFY ─────────────────────────────────────────────────────────────────
router.post("/verify-otp", async (req, res) => {
  try {
    const { phone, code } = req.body;
    if (!phone || !code)
      return res
        .status(400)
        .json({ success: false, message: "Phone & code required" });

    const verification_check = await client.verify.v2
      .services(process.env.TWILIO_SERVICE_SID)
      .verificationChecks.create({ to: phone, code });

    if (verification_check.status !== "approved") {
      return res
        .status(401)
        .json({ success: false, message: "OTP verification failed" });
    }

    // Check if user exists by phone, otherwise create a new OTP-only user
    let user = await User.findOne({ phone });
    if (!user) {
      user = new User({
        userId: phone,
        email: `${phone}@otp.local`,
        password: phone,
        phone,
      });
      await user.save();
    }

    const token = signToken(user);
    res
      .status(200)
      .json({
        success: true,
        message: "OTP verified",
        token,
        user: { userId: user.userId, email: user.email, phone },
      });
  } catch (err) {
    console.error("[OTP VERIFY ERROR]", err);
    res.status(500).json({ success: false, message: "OTP verification error" });
  }
});

module.exports = router;
