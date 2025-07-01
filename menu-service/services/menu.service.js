const Menu = require('../models/menu.model');

exports.createMenu = async (data) => {
  return await Menu.create(data);
};

exports.getAllMenus = async () => {
  return await Menu.find();
};

exports.getMenuById = async (id) => {
  return await Menu.findById(id);
};

exports.updateMenu = async (id, data) => {
  return await Menu.findByIdAndUpdate(id, data, { new: true });
};

exports.deleteMenu = async (id) => {
  return await Menu.findByIdAndDelete(id);
};
