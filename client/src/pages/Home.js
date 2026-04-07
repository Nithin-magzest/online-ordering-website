import React, { useState, useContext } from "react";
import { CartContext } from "../Context/CartContext";
import "./Home.css";

const foodData = {
  fastfood: [
    {
      id: 1,
      name: "Cheese Burger",
      price: 199,
      type: "nonveg",
      img: "https://images.unsplash.com/photo-1550547660-d9450f859349",
    },
    {
      id: 2,
      name: "Veg Burger",
      price: 149,
      type: "veg",
      img: "https://images.unsplash.com/photo-1606755962773-d324e0a13086",
    },
    {
      id: 3,
      name: "Chicken Burger",
      price: 249,
      type: "nonveg",
      img: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd",
    },
    {
      id: 4,
      name: "Paneer Burger",
      price: 179,
      type: "veg",
      img: "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec",
    },
    {
      id: 5,
      name: "Chicken Wrap",
      price: 229,
      type: "nonveg",
      img: "https://images.unsplash.com/photo-1528735602780-2552fd46c7af",
    },
    {
      id: 6,
      name: "Veg Wrap",
      price: 189,
      type: "veg",
      img: "https://images.unsplash.com/photo-1606755456206-b25206cde27e",
    },
    {
      id: 7,
      name: "Grilled Chicken Sandwich",
      price: 219,
      type: "nonveg",
      img: "https://images.unsplash.com/photo-1528735602780-2552fd46c7af",
    },
    {
      id: 8,
      name: "Veg Club Sandwich",
      price: 169,
      type: "veg",
      img: "https://images.unsplash.com/photo-1509722747041-616f39b57569",
    },
    {
      id: 9,
      name: "Paneer Roll",
      price: 199,
      type: "veg",
      img: "https://images.unsplash.com/photo-1617196038437-84d4a7b4f4cb",
    },
    {
      id: 10,
      name: "Chicken Shawarma",
      price: 249,
      type: "nonveg",
      img: "https://images.unsplash.com/photo-1645204071515-1bdf4cf0a1d2",
    },
  ],
  biriyani: [
    {
      id: 11,
      name: "Chicken Biriyani",
      price: 299,
      type: "nonveg",
      img: "https://images.unsplash.com/photo-1633945274405-b6c8069047b0",
    },
    {
      id: 12,
      name: "Mutton Biriyani",
      price: 349,
      type: "nonveg",
      img: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398",
    },
    {
      id: 13,
      name: "Veg Biriyani",
      price: 229,
      type: "veg",
      img: "https://images.unsplash.com/photo-1601050690117-94f5f6fa2c06",
    },
    {
      id: 14,
      name: "Paneer Biriyani",
      price: 249,
      type: "veg",
      img: "https://images.unsplash.com/photo-1601050690597-df0568f70950",
    },
    {
      id: 15,
      name: "Egg Biriyani",
      price: 239,
      type: "nonveg",
      img: "https://images.unsplash.com/photo-1633945274430-7466f0c93a13",
    },
    {
      id: 16,
      name: "Hyderabadi Dum Biriyani",
      price: 319,
      type: "nonveg",
      img: "https://images.unsplash.com/photo-1631515243349-e0cb75fb8d3a",
    },
    {
      id: 17,
      name: "Mushroom Biriyani",
      price: 239,
      type: "veg",
      img: "https://images.unsplash.com/photo-1617191519105-d07b98b10de6",
    },
    {
      id: 18,
      name: "Paneer Dum Biriyani",
      price: 259,
      type: "veg",
      img: "https://images.unsplash.com/photo-1601050690597-df0568f70950",
    },
    {
      id: 19,
      name: "Family Chicken Biriyani",
      price: 499,
      type: "nonveg",
      img: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398",
    },
    {
      id: 20,
      name: "Special Veg Dum Biriyani",
      price: 269,
      type: "veg",
      img: "https://images.unsplash.com/photo-1601050690117-94f5f6fa2c06",
    },
  ],
  starters: [
    {
      id: 21,
      name: "Chicken Wings",
      price: 279,
      type: "nonveg",
      img: "https://source.unsplash.com/400x300/?chicken-wings,fried",
    },
    {
      id: 22,
      name: "Chicken Popcorn",
      price: 199,
      type: "nonveg",
      img: "https://source.unsplash.com/400x300/?chicken-popcorn,fried",
    },
    {
      id: 23,
      name: "Paneer Tikka",
      price: 239,
      type: "veg",
      img: "https://source.unsplash.com/400x300/?paneer-tikka",
    },
    {
      id: 24,
      name: "Veg Spring Rolls",
      price: 179,
      type: "veg",
      img: "https://source.unsplash.com/400x300/?veg-spring-rolls",
    },
    {
      id: 25,
      name: "Chicken Lollipop",
      price: 289,
      type: "nonveg",
      img: "https://source.unsplash.com/400x300/?chicken-lollipop",
    },
    {
      id: 26,
      name: "Chilli Chicken",
      price: 269,
      type: "nonveg",
      img: "https://source.unsplash.com/400x300/?chilli-chicken",
    },
    {
      id: 27,
      name: "Veg Manchurian",
      price: 199,
      type: "veg",
      img: "https://source.unsplash.com/400x300/?veg-manchurian",
    },
    {
      id: 28,
      name: "Paneer Manchurian",
      price: 229,
      type: "veg",
      img: "https://source.unsplash.com/400x300/?paneer-manchurian",
    },
    {
      id: 29,
      name: "Fish Fingers",
      price: 299,
      type: "nonveg",
      img: "https://source.unsplash.com/400x300/?fish-fingers",
    },
    {
      id: 30,
      name: "Garlic Mushrooms",
      price: 189,
      type: "veg",
      img: "https://source.unsplash.com/400x300/?garlic-mushrooms",
    },
  ],

  fries: [
    {
      id: 31,
      name: "French Fries",
      price: 129,
      type: "veg",
      img: "https://source.unsplash.com/400x300/?french-fries",
    },
    {
      id: 32,
      name: "Peri Peri Fries",
      price: 149,
      type: "veg",
      img: "https://source.unsplash.com/400x300/?peri-peri-fries",
    },
    {
      id: 33,
      name: "Chicken Loaded Fries",
      price: 199,
      type: "nonveg",
      img: "https://source.unsplash.com/400x300/?loaded-fries,chicken",
    },
    {
      id: 34,
      name: "Cheese Fries",
      price: 169,
      type: "veg",
      img: "https://source.unsplash.com/400x300/?cheese-fries",
    },
    {
      id: 35,
      name: "Spicy Fries",
      price: 139,
      type: "veg",
      img: "https://source.unsplash.com/400x300/?spicy-fries",
    },
    {
      id: 36,
      name: "Chicken Cheese Fries",
      price: 219,
      type: "nonveg",
      img: "https://source.unsplash.com/400x300/?cheese-fries,chicken",
    },
    {
      id: 37,
      name: "Garlic Fries",
      price: 159,
      type: "veg",
      img: "https://source.unsplash.com/400x300/?garlic-fries",
    },
    {
      id: 38,
      name: "BBQ Chicken Fries",
      price: 229,
      type: "nonveg",
      img: "https://source.unsplash.com/400x300/?bbq-chicken-fries",
    },
    {
      id: 39,
      name: "Loaded Veg Fries",
      price: 189,
      type: "veg",
      img: "https://source.unsplash.com/400x300/?loaded-fries,vegetarian",
    },
    {
      id: 40,
      name: "Masala Fries",
      price: 149,
      type: "veg",
      img: "https://source.unsplash.com/400x300/?masala-fries",
    },
  ],

  pizza: [
    {
      id: 41,
      name: "Margherita Pizza",
      price: 299,
      type: "veg",
      img: "https://source.unsplash.com/400x300/?margherita-pizza",
    },
    {
      id: 42,
      name: "Veggie Pizza",
      price: 259,
      type: "veg",
      img: "https://source.unsplash.com/400x300/?veggie-pizza",
    },
    {
      id: 43,
      name: "Chicken Pizza",
      price: 349,
      type: "nonveg",
      img: "https://source.unsplash.com/400x300/?chicken-pizza",
    },
    {
      id: 44,
      name: "Pepperoni Pizza",
      price: 379,
      type: "nonveg",
      img: "https://source.unsplash.com/400x300/?pepperoni-pizza",
    },
    {
      id: 45,
      name: "Paneer Pizza",
      price: 319,
      type: "veg",
      img: "https://source.unsplash.com/400x300/?paneer-pizza",
    },
    {
      id: 46,
      name: "BBQ Chicken Pizza",
      price: 399,
      type: "nonveg",
      img: "https://source.unsplash.com/400x300/?bbq-chicken-pizza",
    },
    {
      id: 47,
      name: "Mushroom Pizza",
      price: 289,
      type: "veg",
      img: "https://source.unsplash.com/400x300/?mushroom-pizza",
    },
    {
      id: 48,
      name: "Farmhouse Pizza",
      price: 329,
      type: "veg",
      img: "https://source.unsplash.com/400x300/?farmhouse-pizza",
    },
    {
      id: 49,
      name: "Chicken Tikka Pizza",
      price: 389,
      type: "nonveg",
      img: "https://source.unsplash.com/400x300/?chicken-tikka-pizza",
    },
    {
      id: 50,
      name: "Deluxe Veg Pizza",
      price: 339,
      type: "veg",
      img: "https://source.unsplash.com/400x300/?veg-pizza",
    },
  ],
};
const comboOffers = [
  {
    id: 101,
    name: "KFC 5pc Chicken Bucket",
    price: 499,
    img: "https://source.unsplash.com/400x300/?fried-chicken-bucket",
  },
  {
    id: 102,
    name: "KFC Chicken + Fries + Coke",
    price: 399,
    img: "https://source.unsplash.com/400x300/?fried-chicken-meal",
  },
  {
    id: 103,
    name: "KFC Zinger Burger Combo",
    price: 349,
    img: "https://source.unsplash.com/400x300/?chicken-burger-meal",
  },
  {
    id: 104,
    name: "KFC Chicken Popcorn Combo",
    price: 299,
    img: "https://source.unsplash.com/400x300/?chicken-popcorn-meal",
  },
  {
    id: 105,
    name: "Family Chicken Bucket",
    price: 799,
    img: "https://source.unsplash.com/400x300/?fried-chicken-family-meal",
  },
];

function Home() {
  const { addToCart } = useContext(CartContext);

  const [category, setCategory] = useState("fastfood");
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  console.log(foodData);
  const allItems = Object.values(foodData).flat();
  const filteredItems = foodData[category].filter((item) => {
    if (filter === "all") return true;
    return item.type === filter;
  });
  const searchFilteredItems = allItems.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="home">
      <h1>Explore Delicious Foods 🍔</h1>

      <div className="search-bar">
        <input
          type="text"
          placeholder="Search food..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Category Buttons */}
      <div className="categories">
        <button onClick={() => setCategory("fastfood")}>🍔 Fast Food</button>
        <button onClick={() => setCategory("biriyani")}>🍛 Biriyani</button>
        <button onClick={() => setCategory("starters")}>🍗 Starters</button>
        <button onClick={() => setCategory("fries")}>🍟 Fries</button>
        <button onClick={() => setCategory("pizza")}>🍕 Pizza</button>
      </div>

      {/* Veg / NonVeg Filter */}
      <div className="filters">
        <button onClick={() => setFilter("all")}>All</button>
        <button onClick={() => setFilter("veg")}>🥦 Veg</button>
        <button onClick={() => setFilter("nonveg")}>🍗 Non Veg</button>
      </div>

      {/* Food Items */}
      <div className="food-container">
        {filteredItems.map((food) => (
          <div className="food-card" key={food.id}>
            <img src={food.img} alt={food.name} />

            <h3>{food.name}</h3>

            <p>₹{food.price}</p>

            <span className={food.type === "veg" ? "veg" : "nonveg"}>
              {food.type.toUpperCase()}
            </span>

            <button className="cart-btn" onClick={() => addToCart(food)}>
              Add to Cart 🛒
            </button>
          </div>
        ))}
      </div>

      {/* Combo Offers */}
      <h2 className="combo-title">🔥 Combo Offers</h2>

      <div className="combo-container">
        {comboOffers.map((combo) => (
          <div className="combo-card" key={combo.id}>
            <img src={combo.img} alt={combo.name} />

            <h3>{combo.name}</h3>

            <p>₹{combo.price}</p>

            <button className="cart-btn" onClick={() => addToCart(combo)}>
              Add Combo 🛒
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
