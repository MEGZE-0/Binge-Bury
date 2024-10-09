// controllers/movieController.js
const Movie = require('../models/movie');
const axios = require('axios');
require('dotenv').config(); // Add this line at the top of your entry file


// TMDB API configuration
const TMDB_API_KEY = process.env.TMDB_API_KEY;
const TMDB_BASE_URL = 'https://api.themoviedb.org/3';
console.log('TMDB API Key:', TMDB_API_KEY);

exports.uploadMovie = async (req, res) => {
  try {
    const { title, description, genre, videoUrl } = req.body;

    // Input validation
    if (!title || !description || !genre || !videoUrl) {
      return res.status(400).json({ error: 'All fields are required.' });
    }

    const movie = new Movie({
      title,
      description,
      genre,
      videoUrl,
      uploadedBy: req.user._id,
    });
    await movie.save();
    res.status(201).json({ success: true, movie });
  } catch (err) {
    console.error('Error uploading movie:', err); // Log the error
    res.status(500).json({ error: 'Failed to upload movie.' });
  }
};

exports.getAllMovies = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query; // Set default values
    const skip = (page - 1) * limit;

    const movies = await Movie.find()
      .populate('uploadedBy', 'username')
      .skip(skip)
      .limit(limit);

    const totalMovies = await Movie.countDocuments();
    res.json({ success: true, movies, total: totalMovies, page, totalPages: Math.ceil(totalMovies / limit) });
  } catch (err) {
    console.error('Error fetching movies:', err); // Log the error
    res.status(500).json({ error: 'Failed to fetch movies.' });
  }
};

// Fetch movies from TMDb with pagination and search

// Fetch movies from TMDb with search functionality
exports.fetchMoviesFromTMDB = async (req, res) => {
    const searchQuery = req.query.search || ''; // Get search query from the request
    const page = parseInt(req.query.page, 10) || 1; // Convert page to an integer, default to 1

    try {
        let response;
        // If a search query is provided, use the search API
        if (searchQuery) {
            response = await axios.get(`${TMDB_BASE_URL}/search/movie?api_key=${TMDB_API_KEY}&language=en-US&query=${encodeURIComponent(searchQuery)}&page=${page}`);
        } else {
            // Default to popular movies if no search query is provided
            response = await axios.get(`${TMDB_BASE_URL}/movie/popular?api_key=${TMDB_API_KEY}&language=en-US&page=${page}`);
        }

        res.json({
            success: true,
            movies: response.data.results,
            total: response.data.total_pages, // Total number of pages returned by TMDb
            page
        });
    } catch (err) {
        console.error('Error fetching movies from TMDB:', err);
        res.status(500).json({ error: 'Failed to fetch movies from TMDB.' });
    }
};



// Search for movies in TMDb with pagination
exports.searchMovies = async (req, res) => {
  const { query, page = 1, limit = 10 } = req.query; // Get query, page, and limit
  try {
    const response = await axios.get(`${TMDB_BASE_URL}/search/movie?api_key=${TMDB_API_KEY}&query=${encodeURIComponent(query)}&page=${page}&include_adult=false`);
    res.json({ success: true, results: response.data.results, totalPages: response.data.total_pages, page });
  } catch (err) {
    console.error('Error searching for movies:', err); // Log the error
    res.status(500).json({ error: 'Failed to search for movies.' });
  }
};

// Get movie details from TMDb
exports.getMovieDetails = async (req, res) => {
  const { movieId } = req.params;
  try {
    const response = await axios.get(`${TMDB_BASE_URL}/movie/${movieId}?api_key=${TMDB_API_KEY}&language=en-US`);
    res.json({ success: true, movie: response.data });
  } catch (err) {
    console.error('Error fetching movie details:', err);
    res.status(500).json({ error: 'Failed to fetch movie details.' });
  }
};

// Get recommendations based on a movie with pagination
exports.getRecommendations = async (req, res) => {
  const { movieId } = req.params;
  const { page = 1 } = req.query; // Get page from query parameters
  try {
    const response = await axios.get(`${TMDB_BASE_URL}/movie/${movieId}/recommendations?api_key=${TMDB_API_KEY}&language=en-US&page=${page}`);
    res.json({ success: true, recommendations: response.data.results, totalPages: response.data.total_pages, page });
  } catch (err) {
    console.error('Error fetching recommendations:', err); // Log the error
    res.status(500).json({ error: 'Failed to fetch recommendations.' });
  }
};
