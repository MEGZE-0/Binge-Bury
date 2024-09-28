const mongoose = require('mongoose'); // Import mongoose

const genreSchema = new mongoose.Schema({
    name: { type: String, unique: true, required: true },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
  });
  
  const Genre = mongoose.model('Genre', genreSchema);
  
  module.exports = Genre; // Export the model
