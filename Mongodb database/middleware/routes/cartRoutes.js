const express = require('express');
const router = express.Router();
const Cart = require('../models/Cart');
const auth = require('../middleware/authMiddleware');

// GET cart
router.get('/', auth, async (req, res) => {
  const cart = await Cart.findOne({ userId: req.user.id });
  res.json(cart || { items: [] });
});

// ADD item
router.post('/add', auth, async (req, res) => {
  const { menuItemId, name, price, quantity, image } = req.body;
  let cart = await Cart.findOne({ userId: req.user.id });

  if (!cart) cart = new Cart({ userId: req.user.id, items: [] });

  const existing = cart.items.find(i => i.menuItemId === menuItemId);
  if (existing) {
    existing.quantity += quantity;
  } else {
    cart.items.push({ menuItemId, name, price, quantity, image });
  }

  await cart.save();
  res.json(cart);
});

// REMOVE item
router.delete('/remove/:menuItemId', auth, async (req, res) => {
  const cart = await Cart.findOne({ userId: req.user.id });
  if (!cart) return res.status(404).json({ message: 'Cart not found' });

  cart.items = cart.items.filter(i => i.menuItemId !== req.params.menuItemId);
  await cart.save();
  res.json(cart);
});

module.exports = router;