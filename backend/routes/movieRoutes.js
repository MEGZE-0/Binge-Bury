const express = require('express');
const movieController = require('../controllers/movieController');

const router = express.Router();

router.post('/create-movie', movieController.createMovie);
router.get('/get-all-movie', movieController.getAllMovies);

module.exports = router;
