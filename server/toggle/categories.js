// routes/categories.js — Food category pills endpoints
const express = require("express");
const router = express.Router();

// Matches the 11 category pills rendered on the homepage
const categories = [
  { id: 1, name: "All", emoji: "🔥", slug: "all" },
  { id: 2, name: "Pizza", emoji: "🍕", slug: "pizza" },
  { id: 3, name: "Burgers", emoji: "🍔", slug: "burgers" },
  { id: 4, name: "Biryani", emoji: "🍱", slug: "biryani" },
  { id: 5, name: "Noodles", emoji: "🍜", slug: "noodles" },
  { id: 6, name: "Salads", emoji: "🥗", slug: "salads" },
  { id: 7, name: "Sushi", emoji: "🍣", slug: "sushi" },
  { id: 8, name: "Tacos", emoji: "🌮", slug: "tacos" },
  { id: 9, name: "Desserts", emoji: "🍦", slug: "desserts" },
  { id: 10, name: "Drinks", emoji: "☕", slug: "drinks" },
  { id: 11, name: "Breakfast", emoji: "🥞", slug: "breakfast" },
];

// GET /api/categories — list all categories
router.get("/", (req, res) => {
  res.json({ categories });
});

// GET /api/categories/:slug — get a specific category
router.get("/:slug", (req, res) => {
  const category = categories.find((c) => c.slug === req.params.slug);
  if (!category) return res.status(404).json({ error: "Category not found" });
  res.json(category);
});

module.exports = router;
