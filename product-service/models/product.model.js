const { Schema, model } = require('mongoose');

const productSchema = new Schema({
  name:        { type: String, required: true },
  address:     { type: String, required: true },
  phone:       { type: String },
  logoUrl:     { type: String },
  rating:      { type: Number, default: 0 },
  isActive:    { type: Boolean, default: true }
}, { timestamps: true });

module.exports = model('Product', productSchema);
