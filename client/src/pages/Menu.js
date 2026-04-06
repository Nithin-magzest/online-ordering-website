// src/pages/Menu.js
import { useEffect, useState, useContext } from "react";
import { CartContext } from "../Context/CartContext";
import { useParams } from "react-router-dom";

function Menu() {
  const { id } = useParams();
  const [menu, setMenu] = useState([]);
  const { cartItems, addToCart, removeFromCart } = useContext(CartContext);

  useEffect(() => {
    fetch(`http://localhost:5000/menu/${id}`)
      .then((res) => res.json())
      .then((data) => setMenu(data));
  }, [id]);

  const handleCartToggle = (item) => {
    const inCart = cartItems.find((i) => i.id === item.id);
    if (inCart) {
      removeFromCart(item.id);
    } else {
      addToCart(item);
    }
  };

  return (
    <div>
      <h1>Menu</h1>
      {menu.map((item) => {
        // check dynamically for each render if the item is in cart
        const isInCart = cartItems.some((i) => i.id === item.id);

        return (
          <div key={item.id} style={{ marginBottom: "10px" }}>
            <h3>{item.name}</h3>
            <p>₹{item.price}</p>
            <button
              onClick={() => handleCartToggle(item)}
              style={{
                backgroundColor: isInCart ? "red" : "green",
                color: "white",
                border: "none",
                padding: "5px 10px",
                cursor: "pointer",
              }}
            >
              {isInCart ? "Remove from Cart" : "Add to Cart"}
            </button>
          </div>
        );
      })}
    </div>
  );
}

export default Menu;
