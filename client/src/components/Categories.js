import React from "react";

function Categories() {
  return (
    <div className="section">
      <h2>
        What are you <em>craving?</em>
      </h2>

      <div className="cat-grid">
        <div className="cat-pill">
          <div className="cat-emoji">🍕</div>
          <div className="cat-name">Pizza</div>
        </div>

        <div className="cat-pill">
          <div className="cat-emoji">🍔</div>
          <div className="cat-name">Burger</div>
        </div>

        <div className="cat-pill">
          <div className="cat-emoji">🍱</div>
          <div className="cat-name">Biryani</div>
        </div>

        <div className="cat-pill">
          <div className="cat-emoji">🍦</div>
          <div className="cat-name">Dessert</div>
        </div>
      </div>
    </div>
  );
}

export default Categories;
