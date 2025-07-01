const mongoose = require("mongoose");

const deliverySchema = new mongoose.Schema({
  orderId: { type: String, required: true },
  deliveryPersonId: { type: String, required: true },
  status: {
    type: String,
    enum: ["assigné", "en_route", "livré"],
    default: "assigné"
  },
}, { timestamps: true });

module.exports = mongoose.model("Delivery", deliverySchema);
