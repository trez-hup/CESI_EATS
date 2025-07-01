const Delivery = require("../models/delivery.model");

// POST /api/deliveries
exports.assignDelivery = async (req, res) => {
  const delivery = await Delivery.create(req.body);
  res.status(201).json(delivery);
};

// GET /api/deliveries/:deliveryPersonId
exports.getDeliveriesByPerson = async (req, res) => {
  const deliveries = await Delivery.find({ deliveryPersonId: req.params.deliveryPersonId });
  res.json(deliveries);
};

// PUT /api/deliveries/:id/status
exports.updateDeliveryStatus = async (req, res) => {
  const updated = await Delivery.findByIdAndUpdate(
    req.params.id,
    { status: req.body.status },
    { new: true }
  );
  res.json(updated);
};
