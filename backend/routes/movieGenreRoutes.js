const express = require('express');
const movieGenreController = require('../controllers/movieGenreController');

const router = express.Router();

router.post('/create-movie-gen', movieGenreController.createMovieGenre);
router.get('/get-all-movie-gen', movieGenreController.getAllMovieGenres);

module.exports = router;
