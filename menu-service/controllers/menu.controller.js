const service = require('../services/menu.service');

exports.create = async (req, res) => {
  try {
    const menu = await service.createMenu(req.body);
    res.status(201).json(menu);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.list = async (_req, res) => {
  const menus = await service.getAllMenus();
  res.json(menus);
};

exports.get = async (req, res) => {
  const menu = await service.getMenuById(req.params.id);
  if (!menu) return res.status(404).json({ message: 'Menu introuvable' });
  res.json(menu);
};

exports.update = async (req, res) => {
  const menu = await service.updateMenu(req.params.id, req.body);
  if (!menu) return res.status(404).json({ message: 'Menu introuvable' });
  res.json(menu);
};

exports.remove = async (req, res) => {
  const menu = await service.deleteMenu(req.params.id);
  if (!menu) return res.status(404).json({ message: 'Menu introuvable' });
  res.json({ message: 'Menu supprimé' });
};
