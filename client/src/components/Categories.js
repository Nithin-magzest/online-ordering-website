import React from "react";
import "./Categories.css";

function Categories() {
  const items = [
    { icon: "🍕", name: "Pizza" },
    { icon: "🍔", name: "Burgers" },
    { icon: "🍜", name: "Noodles" },
    { icon: "🍱", name: "Biryani" },
    { icon: "🍣", name: "Sushi" },
    { icon: "🌮", name: "Tacos" },
    { icon: "🍦", name: "Desserts" },
    { icon: "☕", name: "Drinks" },
    { icon: "🥞", name: "Breakfast" },
  ];

  return (
    <div className="categories-section">
      <h2>Popular Categories</h2>

      <div className="categories-grid">
        {items.map((item, index) => (
          <div className="category-card" key={index}>
            <div className="category-icon">{item.icon}</div>
            <p>{item.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Categories;
