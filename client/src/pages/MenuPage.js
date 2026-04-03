import React, { useState } from "react";

const menuItems = [
  {
    id: 1,
    name: "Paneer Tikka Wrap",
    type: "veg",
    price: 179,
    rating: 4.5,
    desc: "Soft paneer marinated in tandoori spices wrapped in a flaky paratha.",
  },
  {
    id: 2,
    name: "Chicken Dum Biryani",
    type: "nonveg",
    price: 299,
    rating: 4.8,
    desc: "Slow cooked basmati rice layered with tender chicken.",
  },
  {
    id: 3,
    name: "Margherita Pizza",
    type: "veg",
    price: 249,
    rating: 4.3,
    desc: "Classic pizza with mozzarella and basil.",
  },
  {
    id: 4,
    name: "Zinger Burger",
    type: "nonveg",
    price: 219,
    rating: 4.6,
    desc: "Crispy fried chicken burger with mayo.",
  },
];

function MenuPage() {
  const [cartCount, setCartCount] = useState(0);
  const [vegFilter, setVegFilter] = useState(true);
  const [nonVegFilter, setNonVegFilter] = useState(false);

  const addToCart = () => {
    setCartCount(cartCount + 1);
  };

  const filteredMenu = menuItems.filter((item) => {
    if (!vegFilter && !nonVegFilter) return true;
    if (vegFilter && item.type === "veg") return true;
    if (nonVegFilter && item.type === "nonveg") return true;
    return false;
  });

  return (
    <div className="menu-wrap">
      {/* Header */}
      <div className="header">
        <div className="logo">🍽</div>
        <div className="brand">FoodieHub</div>
        <div className="location">Hyderabad, IN</div>
      </div>

      {/* Search */}
      <div className="search-bar">
        <input className="search-input" placeholder="Search dishes..." />
      </div>

      {/* Veg NonVeg Filter */}
      <div className="filter-row">
        <button
          className="veg-btn veg"
          onClick={() => setVegFilter(!vegFilter)}
        >
          Veg
        </button>

        <button
          className="veg-btn nonveg"
          onClick={() => setNonVegFilter(!nonVegFilter)}
        >
          Non Veg
        </button>
      </div>

      {/* Menu Grid */}
      <div className="menu-grid">
        {filteredMenu.map((item) => (
          <div className="menu-card" key={item.id}>
            <div className="card-img-placeholder">🍔</div>

            <div className="card-body">
              <div className="card-top">
                <div className="card-name">{item.name}</div>

                <div className={`veg-indicator ${item.type}`}></div>
              </div>

              <div className="stars">⭐ {item.rating}</div>

              <div className="card-desc">{item.desc}</div>

              <div className="card-footer">
                <div className="price">₹{item.price}</div>

                <button className="add-btn" onClick={addToCart}>
                  + Add
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Cart Bar */}
      {cartCount > 0 && (
        <div className="cart-bar">
          <div className="cart-left">
            <div className="cart-count">{cartCount} items</div>
            <div style={{ fontSize: "11px" }}>View your order</div>
          </div>

          <div className="cart-right">Go to cart →</div>
        </div>
      )}
    </div>
  );
}

export default MenuPage;
