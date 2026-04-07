import { useEffect, useState } from "react";

export default function TrackOrder({ orderId }) {
  const [status, setStatus] = useState("");
  const [eta, setEta] = useState("");

  useEffect(() => {
    const interval = setInterval(async () => {
      const res = await fetch(`http://localhost:5000/api/orders/${orderId}`);

      const data = await res.json();

      setStatus(data.status);
      setEta(data.eta);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <h2>Order Tracking</h2>

      <h3>Status : {status}</h3>

      <h4>Delivery in {eta} minutes</h4>
    </div>
  );
}
