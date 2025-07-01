const User = require("../models/user.model");

// GET /api/users/
exports.getAllUsers = async (req, res) => {
  const users = await User.find();
  res.json(users);
};

// GET /api/users/:id
exports.getUserById = async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) return res.status(404).json({ message: "Utilisateur non trouvé" });
  res.json(user);
};

// PUT /api/users/:id
exports.updateUser = async (req, res) => {
  const updated = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
};

// DELETE /api/users/:id
exports.deleteUser = async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.json({ message: "Utilisateur supprimé" });
};

exports.createUser = async (req, res) => {
  const { email, role } = req.body;
  const newUser = await User.create({ email, role });
  res.status(201).json(newUser);
};