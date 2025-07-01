const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: String,
  role: String
});

const User = mongoose.model('User', userSchema);

async function findUserByEmail(email) {
  return await User.findOne({ email });
}

async function createUser(email, password, role) {
  return await User.create({ email, password, role });
}

module.exports = {
  findUserByEmail,
  createUser
};
