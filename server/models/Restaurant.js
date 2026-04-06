const mongoose = require("mongoose");

const restaurantSchema = new mongoose.Schema({
  name: String,
  cuisine: String,
  rating: Number,
  eta: Number,
  priceForTwo: Number,
  badge: String,
  badgeType: String,
  emoji: String,
  thumbClass: String,
  isFavourite: Boolean,
});

module.exports = mongoose.model("Restaurant", restaurantSchema);
