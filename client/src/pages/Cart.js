// src/pages/Cart.js
import React, { useContext } from "react";
import { CartContext } from "../Context/CartContext";

const Cart = () => {
  const {
    cartItems = [],
    removeFromCart,
    updateQuantity,
    total,
  } = useContext(CartContext);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Your Cart</h1>
      {cartItems.length === 0 ? (
        <p>Cart is empty.</p>
      ) : (
        <table border="1" cellPadding="10">
          <thead>
            <tr>
              <th>Item</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Subtotal</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {cartItems.map((item) => (
              <tr key={item.id}>
                <td>{item.name}</td>
                <td>${item.price}</td>
                <td>
                  <input
                    type="number"
                    min="1"
                    value={item.quantity}
                    onChange={(e) =>
                      updateQuantity(item.id, parseInt(e.target.value))
                    }
                  />
                </td>
                <td>${item.price * item.quantity}</td>
                <td>
                  <button onClick={() => removeFromCart(item.id)}>
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <h2>Total: ${total}</h2>
    </div>
  );
};

export default Cart;
