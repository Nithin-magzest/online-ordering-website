const express = require("express");
const twilio = require("twilio");
const router = express.Router();

const twilioClient = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN,
);

// Send OTP
router.post("/send-otp", async (req, res) => {
  const { phone } = req.body;
  if (!phone)
    return res
      .status(400)
      .json({ success: false, message: "Phone number is required" });

  const formattedPhone = phone.startsWith("+") ? phone : `+91${phone}`;
  try {
    const verification = await twilioClient.verify
      .services(process.env.TWILIO_SERVICE_SID)
      .verifications.create({ to: formattedPhone, channel: "sms" });

    console.log("[OTP SENT]", verification.sid);
    res
      .status(200)
      .json({
        success: true,
        sid: verification.sid,
        message: "OTP sent successfully",
      });
  } catch (err) {
    console.error("[OTP SEND ERROR]", err);
    res.status(500).json({ success: false, message: err.message });
  }
});

// Verify OTP
router.post("/verify-otp", async (req, res) => {
  const { phone, code } = req.body;
  if (!phone || !code)
    return res
      .status(400)
      .json({ success: false, message: "Phone and code are required" });

  const formattedPhone = phone.startsWith("+") ? phone : `+91${phone}`;
  try {
    const verificationCheck = await twilioClient.verify
      .services(process.env.TWILIO_SERVICE_SID)
      .verificationChecks.create({ to: formattedPhone, code });

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

module.exports = router;
