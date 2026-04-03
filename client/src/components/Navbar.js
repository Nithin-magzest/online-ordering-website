import React from "react";
import "../App.css";

function Navbar() {
  return (
    <nav>
      <div className="nav-inner">
        <div className="logo">🍔 FoodApp</div>

        <ul className="nav-links">
          <li>
            <a href="#">Home</a>
          </li>
          <li>
            <a href="#">Restaurants</a>
          </li>
          <li>
            <a href="#">Offers</a>
          </li>
          <li>
            <a href="#">Track Order</a>
          </li>
          <li>
            <a href="#">Help</a>
          </li>
        </ul>

        <div className="nav-right">
          <div className="icon-btn">🔍</div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
