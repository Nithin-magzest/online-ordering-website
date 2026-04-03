// routes/cart.js — Shopping cart endpoints
// Corresponds to the cart icon (🛒) with badge count shown in the nav
const express = require("express");
const router = express.Router();

// In-memory cart store (replace with DB / session in production)
// Pre-seeded with 2 items to match the badge count of "2" shown on the homepage
let cart = {
  items: [
    { id: 1, restaurantId: 1, name: "Margherita Pizza", qty: 1, price: 299 },
    { id: 2, restaurantId: 3, name: "Smash Burger Combo", qty: 1, price: 349 },
  ],
};

function getCartSummary() {
  const totalItems = cart.items.reduce((sum, item) => sum + item.qty, 0);
  const totalPrice = cart.items.reduce(
    (sum, item) => sum + item.price * item.qty,
    0,
  );
  return { ...cart, totalItems, totalPrice };
}

// GET /api/cart — return full cart
router.get("/", (req, res) => {
  res.json(getCartSummary());
});

// POST /api/cart/items — add item to cart
router.post("/items", (req, res) => {
  const { restaurantId, name, price } = req.body;
  if (!restaurantId || !name || !price) {
    return res
      .status(400)
      .json({ error: "restaurantId, name, and price are required" });
  }

  const existing = cart.items.find(
    (i) => i.restaurantId === restaurantId && i.name === name,
  );

  if (existing) {
    existing.qty += 1;
  } else {
    const newItem = {
      id: Date.now(),
      restaurantId,
      name,
      qty: 1,
      price,
    };
    cart.items.push(newItem);
  }

  res.status(201).json(getCartSummary());
});

// PATCH /api/cart/items/:id — update item quantity
router.patch("/items/:id", (req, res) => {
  const item = cart.items.find((i) => i.id === parseInt(req.params.id));
  if (!item) return res.status(404).json({ error: "Cart item not found" });

  const { qty } = req.body;
  if (qty <= 0) {
    cart.items = cart.items.filter((i) => i.id !== item.id);
  } else {
    item.qty = qty;
  }

  res.json(getCartSummary());
});

// DELETE /api/cart/items/:id — remove item
router.delete("/items/:id", (req, res) => {
  const before = cart.items.length;
  cart.items = cart.items.filter((i) => i.id !== parseInt(req.params.id));
  if (cart.items.length === before) {
    return res.status(404).json({ error: "Cart item not found" });
  }
  res.json(getCartSummary());
});

// DELETE /api/cart — clear entire cart
router.delete("/", (req, res) => {
  cart.items = [];
  res.json(getCartSummary());
});

module.exports = router;
