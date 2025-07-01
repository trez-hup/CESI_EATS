const express = require("express");
const router = express.Router();
const ctrl = require("../controllers/payment.controller");

router.post("/checkout", ctrl.createCheckoutSession);
router.post("/webhook", express.raw({ type: "application/json" }), ctrl.handleWebhook);

module.exports = router;
