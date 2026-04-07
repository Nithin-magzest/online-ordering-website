const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
  phone: String,

  location: {
    lat: Number,
    lon: Number,
  },

  items: Array,

  status: {
    type: String,
    default: "Order Placed",
  },

  eta: {
    type: Number,
    default: 30,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Order", OrderSchema);
