const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Backend running");
});

app.get("/menu", (req, res) => {
  res.json([
    { id: 1, name: "Chicken Burger", price: 120 },
    { id: 2, name: "Fried Chicken", price: 200 },
    { id: 3, name: "French Fries", price: 80 },
  ]);
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
