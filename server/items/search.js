// routes/search.js — Global food / restaurant search
// Backs the hero section search bar: "Search for pizza, biryani, sushi..."
const express = require("express");
const router = express.Router();

// Shared data imported here; in a real app this would come from a DB layer
const allRestaurants = [
  {
    id: 1,
    name: "Pizzeria Roma",
    cuisine: "Italian · Wood-fired · Pasta",
    emoji: "🍕",
    rating: 4.9,
    eta: 22,
  },
  {
    id: 2,
    name: "Dum Pukht",
    cuisine: "North Indian · Biryani · Kebabs",
    emoji: "🍱",
    rating: 4.7,
    eta: 28,
  },
  {
    id: 3,
    name: "Smash & Stack",
    cuisine: "American · Burgers · Fries · Shakes",
    emoji: "🍔",
    rating: 4.6,
    eta: 18,
  },
  {
    id: 4,
    name: "Tokyo Bites",
    cuisine: "Japanese · Sushi · Ramen · Bento",
    emoji: "🍣",
    rating: 4.8,
    eta: 35,
  },
  {
    id: 5,
    name: "The Green Bowl",
    cuisine: "Healthy · Salads · Wraps · Smoothies",
    emoji: "🥗",
    rating: 4.5,
    eta: 20,
  },
  {
    id: 6,
    name: "El Rancho",
    cuisine: "Mexican · Tacos · Burritos · Nachos",
    emoji: "🌮",
    rating: 4.4,
    eta: 25,
  },
];

// GET /api/search?q=pizza — fuzzy search across restaurant names & cuisines
router.get("/", (req, res) => {
  const query = (req.query.q || "").toLowerCase().trim();

  if (!query) {
    return res.status(400).json({ error: "Query parameter 'q' is required" });
  }

  const results = allRestaurants.filter(
    (r) =>
      r.name.toLowerCase().includes(query) ||
      r.cuisine.toLowerCase().includes(query),
  );

  res.json({
    query,
    total: results.length,
    results,
  });
});

module.exports = router;
