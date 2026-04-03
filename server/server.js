const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* ---------- MENU API (React uses this) ---------- */
app.get("/menu", (req, res) => {
  res.json([
    { id: 1, name: "Chicken Burger", price: 120 },
    { id: 2, name: "Fried Chicken", price: 200 },
    { id: 3, name: "French Fries", price: 80 },
  ]);
});

/* ---------- BASIC TEST ROUTE ---------- */
app.get("/", (req, res) => {
  res.send("BiteRush Backend Running 🚀");
});

/* ---------- START SERVER ---------- */
app.listen(PORT, () => {
  console.log(`🍔 BiteRush server running at http://localhost:${PORT}`);
});
