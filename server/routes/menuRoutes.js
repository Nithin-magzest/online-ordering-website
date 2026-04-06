const express = require("express");
const router = express.Router();

router.get("/:id", (req, res) => {
  res.json([
    { id: 1, name: "Chicken Burger", price: 120 },
    { id: 2, name: "French Fries", price: 80 },
    { id: 3, name: "Fried Chicken", price: 200 },
  ]);
});

module.exports = router;
