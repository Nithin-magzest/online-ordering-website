// routes/restaurants.js — Featured Restaurants endpoints
const express = require("express");
const router = express.Router();

// Static data representing the 6 restaurant cards shown on the homepage
const restaurants = [
  {
    id: 1,
    name: "Pizzeria Roma",
    cuisine: "Italian · Wood-fired · Pasta",
    rating: 4.9,
    eta: 22,
    priceForTwo: 200,
    badge: "TOP RATED",
    badgeType: "top",
    emoji: "🍕",
    thumbClass: "t1",
    isFavourite: true,
  },
  {
    id: 2,
    name: "Dum Pukht",
    cuisine: "North Indian · Biryani · Kebabs",
    rating: 4.7,
    eta: 28,
    priceForTwo: 350,
    badge: "NEW",
    badgeType: "new",
    emoji: "🍱",
    thumbClass: "t2",
    isFavourite: false,
  },
  {
    id: 3,
    name: "Smash & Stack",
    cuisine: "American · Burgers · Fries · Shakes",
    rating: 4.6,
    eta: 18,
    priceForTwo: 250,
    badge: "40% OFF",
    badgeType: "promo",
    emoji: "🍔",
    thumbClass: "t3",
    isFavourite: false,
  },
  {
    id: 4,
    name: "Tokyo Bites",
    cuisine: "Japanese · Sushi · Ramen · Bento",
    rating: 4.8,
    eta: 35,
    priceForTwo: 500,
    badge: "BESTSELLER",
    badgeType: "top",
    emoji: "🍣",
    thumbClass: "t4",
    isFavourite: false,
  },
  {
    id: 5,
    name: "The Green Bowl",
    cuisine: "Healthy · Salads · Wraps · Smoothies",
    rating: 4.5,
    eta: 20,
    priceForTwo: 180,
    badge: "FREE DEL",
    badgeType: "promo",
    emoji: "🥗",
    thumbClass: "t5",
    isFavourite: false,
  },
  {
    id: 6,
    name: "El Rancho",
    cuisine: "Mexican · Tacos · Burritos · Nachos",
    rating: 4.4,
    eta: 25,
    priceForTwo: 220,
    badge: "TRENDING",
    badgeType: "new",
    emoji: "🌮",
    thumbClass: "t6",
    isFavourite: false,
  },
];

// GET /api/restaurants — return all restaurants (supports ?category= filter)
router.get("/", (req, res) => {
  const { category, sort } = req.query;

  let results = [...restaurants];

  // Simple category filter by name match in cuisine string
  if (category && category.toLowerCase() !== "all") {
    results = results.filter((r) =>
      r.cuisine.toLowerCase().includes(category.toLowerCase()),
    );
  }

  // Sort support: rating | eta | price
  if (sort === "rating") results.sort((a, b) => b.rating - a.rating);
  if (sort === "eta") results.sort((a, b) => a.eta - b.eta);
  if (sort === "price") results.sort((a, b) => a.priceForTwo - b.priceForTwo);

  res.json({ total: results.length, restaurants: results });
});

// GET /api/restaurants/:id — return single restaurant
router.get("/:id", (req, res) => {
  const restaurant = restaurants.find((r) => r.id === parseInt(req.params.id));
  if (!restaurant)
    return res.status(404).json({ error: "Restaurant not found" });
  res.json(restaurant);
});

// PATCH /api/restaurants/:id/favourite — toggle favourite
router.patch("/:id/favourite", (req, res) => {
  const restaurant = restaurants.find((r) => r.id === parseInt(req.params.id));
  if (!restaurant)
    return res.status(404).json({ error: "Restaurant not found" });
  restaurant.isFavourite = !restaurant.isFavourite;
  res.json({ id: restaurant.id, isFavourite: restaurant.isFavourite });
});

module.exports = router;
