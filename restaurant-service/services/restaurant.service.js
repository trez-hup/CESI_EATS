const Restaurant = require('../models/restaurant.model');

exports.create     = (data)      => Restaurant.create(data);
exports.list       = ()          => Restaurant.find();
exports.get        = (id)        => Restaurant.findById(id);
exports.update     = (id,data)   => Restaurant.findByIdAndUpdate(id, data, { new:true});
exports.remove     = (id)        => Restaurant.findByIdAndDelete(id);
