const mongoose = require("mongoose");

const menuSchema = new mongoose.Schema({
  restaurantId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Restaurant",
    required: true
  },
  name: String,
  description: String,
  price: Number
}, { timestamps: true });

module.exports = mongoose.model("Menu", menuSchema);
