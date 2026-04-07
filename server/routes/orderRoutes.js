const router = require("express").Router();
const Order = require("../models/Order");

router.post("/place", async (req, res) => {
  const order = new Order({
    phone: req.body.phone,
    location: req.body.location,
    items: req.body.items,
  });

  await order.save();

  res.json({
    success: true,
    orderId: order._id,
    eta: 30,
  });
});

router.get("/:id", async (req, res) => {
  const order = await Order.findById(req.params.id);

  res.json(order);
});

module.exports = router;
