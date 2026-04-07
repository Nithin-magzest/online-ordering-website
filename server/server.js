const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const twilio = require("twilio");
dotenv.config();

// ── Twilio Client Setup ─────────────────────────────────────────────
const { TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, TWILIO_SERVICE_SID } =
  process.env;

if (!TWILIO_ACCOUNT_SID || !TWILIO_AUTH_TOKEN || !TWILIO_SERVICE_SID) {
  console.error("❌ Twilio credentials missing in .env");
}

const twilioClient = twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);

// ── Route Imports ──────────────────────────────────────────────────
const restaurantRoutes = require("./routes/restaurants");
const menuRoutes = require("./routes/menuRoutes");
const loginRouter = require("./routes/loginRouter"); // auth routes

const app = express();

// ── Middleware ────────────────────────────────────────────────────
app.use(cors({ origin: "http://localhost:3000" }));
app.use(express.json());

// ── MongoDB Connection ────────────────────────────────────────────
mongoose
  .connect("mongodb://127.0.0.1:27017/online_ordering_db")
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB error:", err));

// ── Routes ────────────────────────────────────────────────────────
app.use("/restaurants", restaurantRoutes);
app.use("/menu", menuRoutes);
app.use("/api/auth", loginRouter);

app.get("/", (req, res) => res.send("Food Ordering API Running 🚀"));

// ── Twilio OTP Routes ─────────────────────────────────────────────

// Send OTP
app.post("/api/auth/send-otp", async (req, res) => {
  const { phone } = req.body;

  if (!phone) {
    return res
      .status(400)
      .json({ success: false, message: "Phone number is required" });
  }

  try {
    const verification = await twilioClient.verify.v2
      .services(TWILIO_SERVICE_SID)
      .verifications.create({ to: phone, channel: "sms" });

    console.log("[OTP SENT]", verification.sid);
    res.status(200).json({
      success: true,
      sid: verification.sid,
      message: "OTP sent successfully",
    });
  } catch (err) {
    console.error("[OTP SEND ERROR]", err);
    const message =
      err.code === 20003
        ? "Twilio Authentication Error - check your SID/Auth Token"
        : err.message;
    res.status(500).json({ success: false, message });
  }
});

// Verify OTP
app.post("/api/auth/verify-otp", async (req, res) => {
  const { phone, code } = req.body;

  if (!phone || !code) {
    return res
      .status(400)
      .json({ success: false, message: "Phone and OTP code are required" });
  }

  try {
    const verificationCheck = await twilioClient.verify.v2
      .services(TWILIO_SERVICE_SID)
      .verificationChecks.create({ to: phone, code });

    if (verificationCheck.status === "approved") {
      res.status(200).json({ success: true, message: "OTP Verified!" });
    } else {
      res.status(400).json({ success: false, message: "Incorrect OTP" });
    }
  } catch (err) {
    console.error("[OTP VERIFY ERROR]", err);
    res.status(500).json({ success: false, message: err.message });
  }
});

// ── Start Server ──────────────────────────────────────────────────
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
const otpRouter = require("./routes/otpRouter");
app.use("/api/auth", otpRouter);
