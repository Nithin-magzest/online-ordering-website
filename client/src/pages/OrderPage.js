import React, { useState } from "react";

export default function OrderPage() {
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [verified, setVerified] = useState(false);
  const [location, setLocation] = useState(null);
  const [orderStatus, setOrderStatus] = useState(null);
  const [eta, setEta] = useState(null);

  // Get location
  const getLocation = () => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const loc = {
          lat: pos.coords.latitude,
          lon: pos.coords.longitude,
        };

        setLocation(loc);
      },
      () => {
        alert("Location is required to place order");
      },
    );
  };

  // Send OTP
  const sendOTP = async () => {
    const res = await fetch("http://localhost:5000/api/send-otp", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ phone }),
    });

    const data = await res.json();

    if (data.success) {
      alert("OTP Sent");
    }
  };

  // Verify OTP
  const verifyOTP = async () => {
    const res = await fetch("http://localhost:5000/api/verify-otp", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ phone, otp }),
    });

    const data = await res.json();

    if (data.success) {
      setVerified(true);
      alert("Mobile Verified");
    }
  };

  // Place Order
  const placeOrder = async () => {
    if (!location) {
      alert("Location Required");
      return;
    }

    if (!verified) {
      alert("Mobile verification required");
      return;
    }

    const res = await fetch("http://localhost:5000/api/orders/place", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        phone,
        location,
      }),
    });

    const data = await res.json();

    if (data.success) {
      setOrderStatus("Order Confirmed");
      setEta(data.eta);

      trackOrder(data.orderId);
    }
  };

  // Track order
  const trackOrder = (orderId) => {
    setInterval(async () => {
      const res = await fetch(`http://localhost:5000/api/orders/${orderId}`);

      const data = await res.json();

      setOrderStatus(data.status);
      setEta(data.eta);
    }, 5000);
  };

  return (
    <div style={{ padding: "40px" }}>
      <h2>Place Your Order</h2>

      <button onClick={getLocation}>Enable Location</button>

      {location && <p>Location Enabled ✅</p>}

      <h3>Mobile Verification</h3>

      <input
        placeholder="Enter phone"
        onChange={(e) => setPhone(e.target.value)}
      />

      <button onClick={sendOTP}>Send OTP</button>

      <input placeholder="Enter OTP" onChange={(e) => setOtp(e.target.value)} />

      <button onClick={verifyOTP}>Verify OTP</button>

      {verified && <p>Mobile Verified ✅</p>}

      <hr />

      <button
        style={{
          padding: "12px 30px",
          background: "#c8440a",
          color: "#fff",
          border: "none",
          borderRadius: "8px",
        }}
        onClick={placeOrder}
      >
        Place Order
      </button>

      {orderStatus && (
        <div style={{ marginTop: "30px" }}>
          <h3>Order Status</h3>

          <p>Status : {orderStatus}</p>

          <p>Estimated Delivery : {eta} minutes</p>
        </div>
      )}
    </div>
  );
}
