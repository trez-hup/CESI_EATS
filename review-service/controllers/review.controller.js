const Review = require("../models/review.model");

// POST /api/reviews
exports.createReview = async (req, res) => {
  const review = await Review.create(req.body);
  res.status(201).json(review);
};

// GET /api/reviews/:targetType/:targetId
exports.getReviewsByTarget = async (req, res) => {
  const { targetType, targetId } = req.params;
  const reviews = await Review.find({ targetType, targetId });

  const avgRating =
    reviews.reduce((acc, r) => acc + r.rating, 0) / (reviews.length || 1);

  res.json({ averageRating: avgRating.toFixed(2), reviews });
};
