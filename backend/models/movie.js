const mongoose = require('mongoose'); // Import mongoose

const movieSchema = new mongoose.Schema({
    title: { type: String, required: true },
    release_date: { type: Date, required: true },
    rating: { type: Number, default: 0.0 },
    description: { type: String, required: true },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
});

const Movie = mongoose.model('Movie', movieSchema);

module.exports = Movie; // Export the model
