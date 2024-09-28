const express = require('express');
const reviewController = require('../controllers/reviewController');

const router = express.Router();

router.post('/create-rev', reviewController.createReview);
router.get('/get-all-rev', reviewController.getAllReviews);

module.exports = router;
