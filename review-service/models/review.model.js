const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
  userId: String,
  targetId: String, // restaurantId OU deliveryPersonId
  targetType: { type: String, enum: ['restaurant', 'livreur'], required: true },
  rating: { type: Number, min: 1, max: 5 },
  comment: String
}, { timestamps: true });

module.exports = mongoose.model("Review", reviewSchema);
