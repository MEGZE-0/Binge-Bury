const Movie = require('../models/movie');

// Get all movies
exports.getAllMovies = async (req, res) => {
  try {
    const movies = await Movie.find();
    res.status(200).json(movies);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Create a new movie
exports.createMovie = async (req, res) => {
  try {
    const { title, release_date, rating, description } = req.body;
    const movie = new Movie({ title, release_date, rating, description });
    await movie.save();
    res.status(201).json(movie);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
