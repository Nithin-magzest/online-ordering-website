const MenuItem = require("../models/Restaurant");

exports.getMenu = async (req, res) => {
  const items = await MenuItem.find();
  res.json(items);
};

exports.addMenuItem = async (req, res) => {
  const item = new MenuItem(req.body);
  await item.save();
  res.json(item);
};
