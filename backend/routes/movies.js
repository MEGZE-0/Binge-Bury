// routes/movieRoutes.js
const express = require('express');
const {
  fetchMoviesFromTMDB,
  searchMovies,
  getMovieDetails,
  getRecommendations
} = require('../controllers/movieController');

const router = express.Router();

router.get('/fetch-movies', fetchMoviesFromTMDB);
router.get('/search', searchMovies);
router.get('/:movieId', getMovieDetails);
router.get('/:movieId/recommendations', getRecommendations);

module.exports = router;
