import React, { useState } from "react";
import axios from "axios";

const OTPLogin = () => {
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState(1); // 1 = enter phone, 2 = enter OTP

  // Send OTP API call
  const sendOTP = async () => {
    try {
      const res = await axios.post("http://localhost:5000/api/auth/send-otp", {
        phone,
      });
      if (res.data.success) {
        alert("OTP sent to your phone!");
        setStep(2);
      }
    } catch (err) {
      console.error(err);
      alert("Failed to send OTP");
    }
  };

  // Verify OTP API call
  const verifyOTP = async () => {
    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/verify-otp",
        { phone, code: otp },
      );
      if (res.data.success) {
        alert("OTP verified! Login successful");
      } else {
        alert("Incorrect OTP, try again");
      }
    } catch (err) {
      console.error(err);
      alert("Failed to verify OTP");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      {step === 1 && (
        <>
          <input
            type="text"
            placeholder="Enter phone number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          <button onClick={sendOTP}>Send OTP</button>
        </>
      )}

      {step === 2 && (
        <>
          <input
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />
          <button onClick={verifyOTP}>Verify OTP</button>
        </>
      )}
    </div>
  );
};

export default OTPLogin;
