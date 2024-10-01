import axios from 'axios';

const API_URL = 'http://localhost:5000/api/auth/';
const MOVIE_API_URL = 'http://localhost:5000/api/movies/'; // Adjusted to your movie routes
const USER_API_URL = 'http://localhost:5000/api/profile/'; // This should be consistent

// Authentication API Functions
export const login = async (email, password) => {
    const response = await axios.post(`${API_URL}login`, { email, password });
    return response.data;
};

export const register = async (username, email, password) => {
    const response = await axios.post(`${API_URL}register`, { username, email, password });
    return response.data;
};

// User API Functions
// Fetch user profile
export const getUserProfile = async (token) => {
    const response = await axios.get(`${USER_API_URL}`, { // Adjusted to remove 'profile' at the end
      headers: {
        Authorization: `Bearer ${token}`, // Include token for authentication
      },
    });
    return response.data;
  };

// Update user profile
export const updateUserProfile = async (token, profileData) => {
    const response = await axios.put(`${USER_API_URL}profile-update`, profileData, { // Adjusted to use USER_API_URL
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  };
  
// Function to delete user profile
export const deleteUserProfile = async (token) => {
    const response = await axios.delete(`${USER_API_URL}profile`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data;
};

// Movie API Functions
// Fetch all movies
export const fetchAllMovies = async () => {
    try {
        const response = await axios.get('/api/movies'); // Adjust this URL if needed
        return response.data; // Ensure this matches your backend response structure
    } catch (error) {
        console.error('Error fetching movies from the API:', error);
        throw error; // Rethrow to handle it in the component
    }
};

// Upload a movie
export const uploadMovie = async (movieData, token) => {
    const response = await axios.post(`${MOVIE_API_URL}upload`, movieData, {
        headers: {
            Authorization: `Bearer ${token}`, // Include token for authentication
        },
    });
    return response.data;
};

// Fetch popular movies from TMDB
export const fetchPopularMovies = async () => {
    const response = await axios.get(`${MOVIE_API_URL}tmdb/popular`);
    return response.data;
};

// Search for movies
export const searchMovies = async (query) => {
    const response = await axios.get(`${MOVIE_API_URL}search`, {
        params: { q: query },
    });
    return response.data;
};

// Get details of a specific movie
export const getMovieDetails = async (movieId) => {
    const response = await axios.get(`${MOVIE_API_URL}details/${movieId}`);
    return response.data;
};

// Get movie recommendations
export const getRecommendations = async (movieId) => {
    const response = await axios.get(`${MOVIE_API_URL}recommendations/${movieId}`);
    return response.data;
};

// Add more API functions as needed
