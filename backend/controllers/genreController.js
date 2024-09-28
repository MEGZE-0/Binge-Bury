const Genre = require('../models/genre');

// Get all genres
exports.getAllGenres = async (req, res) => {
  try {
    const genres = await Genre.find();
    res.status(200).json(genres);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Create a new genre
exports.createGenre = async (req, res) => {
  try {
    const { name } = req.body;
    const genre = new Genre({ name });
    await genre.save();
    res.status(201).json(genre);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
