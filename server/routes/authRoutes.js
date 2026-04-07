const router = require("express").Router();

let otpStore = {};

router.post("/send-otp", (req, res) => {
  const { phone } = req.body;

  const otp = Math.floor(1000 + Math.random() * 9000);

  otpStore[phone] = otp;

  console.log("OTP:", otp);

  res.json({ success: true });
});

router.post("/verify-otp", (req, res) => {
  const { phone, otp } = req.body;

  if (otpStore[phone] == otp) {
    res.json({
      success: true,
      token: "dummy-token",
    });
  } else {
    res.json({ success: false });
  }
});

module.exports = router;
