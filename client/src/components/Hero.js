import React from "react";

function Hero() {
  return (
    <div className="hero">
      <div className="hero-copy">
        <div className="hero-chip">🔥 200+ Restaurants Near You</div>

        <h1>
          Hungry? <em>Food</em> is just <br />a{" "}
          <span className="underline">tap away</span>
        </h1>

        <p className="hero-sub">
          Order from the best local restaurants and enjoy every bite delivered
          to your door.
        </p>

        <div className="search-bar">
          <input placeholder="Search for pizza, biryani, sushi..." />
          <button>Find Food →</button>
        </div>
      </div>

      <div className="hero-visual">
        <div className="hero-food-emoji">🍕</div>
      </div>
    </div>
  );
}

export default Hero;
