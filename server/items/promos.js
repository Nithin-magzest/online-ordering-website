// routes/promos.js — Promotional content endpoints
// Backs the topbar banner and the 4-item promo strip on the homepage
const express = require("express");
const router = express.Router();

// Topbar announcement banner data
const topbarPromo = {
  message: "Get 40% off your first order",
  code: "FIRSTBITE",
  secondaryMessage: "Free delivery on orders above ₹299",
};

// The 4 promo strip cards shown below the hero
const promoStrip = [
  {
    id: 1,
    emoji: "🚀",
    title: "Express Delivery",
    subtitle: "Under 30 mins, guaranteed",
  },
  {
    id: 2,
    emoji: "💰",
    title: "Best Prices",
    subtitle: "Price match + no hidden fees",
  },
  {
    id: 3,
    emoji: "🔒",
    title: "Safe Payments",
    subtitle: "UPI, card, wallet — all secured",
  },
  {
    id: 4,
    emoji: "🌿",
    title: "Eco Packaging",
    subtitle: "Sustainable & spill-proof bags",
  },
];

// Hero statistics shown in the meta row beneath the search bar
const heroStats = {
  avgDeliveryMinutes: 22,
  avgRating: 4.8,
  totalRestaurants: 200,
  liveOrders: 1284,
};

// GET /api/promos/topbar
router.get("/topbar", (req, res) => {
  res.json(topbarPromo);
});

// GET /api/promos/strip
router.get("/strip", (req, res) => {
  res.json({ promos: promoStrip });
});

// GET /api/promos/stats — hero section live stats
router.get("/stats", (req, res) => {
  // Simulate a small random fluctuation in live orders
  const liveOrders = heroStats.liveOrders + Math.floor(Math.random() * 20 - 10);
  res.json({ ...heroStats, liveOrders });
});

module.exports = router;
