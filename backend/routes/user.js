const express = require('express');
const {
  getUserProfile,
  updateUserProfile,
  deleteUserProfile,
  addMovieToWishlist,
  addMovieToFavorites,
  getUserFavoritesAndWishlist,
  fetchUserFavorites,
  fetchUserWishlist,
} = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware'); // Middleware for authentication

const router = express.Router();

// Get user profile
router.get('/', authMiddleware, getUserProfile); // Adjusted to match the API URL structure

// Update user profile
router.put('/profile-update', authMiddleware, updateUserProfile); // Keep this the same

// Delete user profile
router.delete('/', authMiddleware, deleteUserProfile); // Adjusted to match the API URL structure
// Route to add a movie to favorites
router.post('/favorites', authMiddleware, addMovieToFavorites);

// Route to add a movie to wishlist
router.post('/wishlist', authMiddleware, addMovieToWishlist);
router.post('/get-fav-wish', authMiddleware, getUserFavoritesAndWishlist);
// Route to fetch user favorites
router.get('/favorites',authMiddleware, fetchUserFavorites);

// Route to fetch user wishlist
router.get('/wishlist', authMiddleware, fetchUserWishlist);
module.exports = router;
