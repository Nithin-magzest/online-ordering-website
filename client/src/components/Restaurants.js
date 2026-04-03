import React, { useEffect, useState } from "react";

function Restaurants() {
  const [menu, setMenu] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/menu")
      .then((res) => res.json())
      .then((data) => setMenu(data));
  }, []);

  return (
    <div className="section">
      <h2>Featured Menu</h2>

      <div className="menu-grid">
        {menu.map((item) => (
          <div className="menu-card" key={item.id}>
            <h3>{item.name}</h3>
            <p>₹{item.price}</p>
            <button>Add to Cart</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Restaurants;
