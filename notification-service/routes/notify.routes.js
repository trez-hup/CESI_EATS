const express = require("express");
const router = express.Router();
const ctrl = require("../controllers/notify.controller");

router.post("/email", ctrl.sendNotification);

module.exports = router;
