const express = require("express");
const cors = require("cors");

const restaurantRoutes = require("./routes/restaurants");
const menuRoutes = require("./routes/menuRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/restaurants", restaurantRoutes);
app.use("/menu", menuRoutes);

app.get("/", (req, res) => {
  res.send("Food Ordering API Running 🚀");
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
