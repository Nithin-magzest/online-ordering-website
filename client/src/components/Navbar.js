import React from "react";

function Navbar() {
  return (
    <nav>
      <div className="nav-inner">
        <div className="logo">
          🍽️ Bite<span>Rush</span>
        </div>

        <ul className="nav-links">
          <li>
            <a href="#" className="active">
              Home
            </a>
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
          <div className="icon-btn">🛒</div>
          <button className="btn-login">Sign In</button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
