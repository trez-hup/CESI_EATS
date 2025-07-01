const express = require("express");
const router = express.Router();
const ctrl = require("../controllers/review.controller");

router.post("/", ctrl.createReview);
router.get("/:targetType/:targetId", ctrl.getReviewsByTarget);

module.exports = router;
