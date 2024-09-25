const Review = require('../models/review');

// Get all reviews
exports.getAllReviews = async (req, res) => {
  try {
    const reviews = await Review.find().populate('user_id movie_id'); // Populate user and movie details
    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Create a new review
exports.createReview = async (req, res) => {
  try {
    const { user_id, movie_id, rating, comment } = req.body;
    const review = new Review({ user_id, movie_id, rating, comment });
    await review.save();
    res.status(201).json(review);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
