const Product = require('../models/product.model');

exports.create     = (data)      => Product.create(data);
exports.list       = ()          => Product.find();
exports.get        = (id)        => Product.findById(id);
exports.update     = (id,data)   => Product.findByIdAndUpdate(id, data, { new:true});
exports.remove     = (id)        => Product.findByIdAndDelete(id);
