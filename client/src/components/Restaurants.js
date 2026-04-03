import React from "react";

function Restaurants() {
  return (
    <div className="section">
      <h2>Featured Restaurants</h2>

      <div className="rest-grid">
        <div className="rest-card">
          <div className="rest-thumb">🍕</div>
          <div className="rest-body">
            <div className="rest-name">Pizzeria Roma</div>
            <div className="rest-cuisine">Italian · Pizza</div>
          </div>
        </div>

        <div className="rest-card">
          <div className="rest-thumb">🍔</div>
          <div className="rest-body">
            <div className="rest-name">Smash Burger</div>
            <div className="rest-cuisine">American · Burgers</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Restaurants;
