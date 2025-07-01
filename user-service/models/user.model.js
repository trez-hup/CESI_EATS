const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: String,
  name: String,
  phone: String,
  address: String,
  role: { type: String, enum: ['client', 'livreur', 'restaurateur'], default: 'client' },
}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);
