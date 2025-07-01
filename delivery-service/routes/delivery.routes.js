const express = require("express");
const router = express.Router();
const ctrl = require("../controllers/delivery.controller");

router.post("/", ctrl.assignDelivery);
router.get("/:deliveryPersonId", ctrl.getDeliveriesByPerson);
router.put("/:id/status", ctrl.updateDeliveryStatus);

module.exports = router;
