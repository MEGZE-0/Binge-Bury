const MovieGenre = require('../models/movieGenre');

// Create a new movie-genre relationship
exports.createMovieGenre = async (req, res) => {
  try {
    const movieGenre = new MovieGenre(req.body);
    await movieGenre.save();
    res.status(201).json(movieGenre);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all movie-genre relationships
exports.getAllMovieGenres = async (req, res) => {
  try {
    const movieGenres = await MovieGenre.find().populate('movie_id genre_id');
    res.status(200).json(movieGenres);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Add more movie-genre related methods as needed...
