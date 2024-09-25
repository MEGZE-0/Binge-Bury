const mongoose = require('mongoose'); // Import mongoose

const movieGenreSchema = new mongoose.Schema({
    movie_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Movie', required: true },
    genre_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Genre', required: true }
  }, { _id: false }); // Prevent creating an _id for this schema
  
  const MovieGenre = mongoose.model('MovieGenre', movieGenreSchema);
  
  module.exports = MovieGenre; // Export the model
