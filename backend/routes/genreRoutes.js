const express = require('express');
const genreController = require('../controllers/genreController');

const router = express.Router();

router.post('/create-gen', genreController.createGenre);
router.get('/get-all-gen', genreController.getAllGenres);

module.exports = router;
