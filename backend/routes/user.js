const express = require('express');
const {
  getUserProfile,
  updateUserProfile,
  deleteUserProfile,
} = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware'); // Middleware for authentication

const router = express.Router();

// Get user profile
router.get('/', authMiddleware, getUserProfile); // Adjusted to match the API URL structure

// Update user profile
router.put('/profile-update', authMiddleware, updateUserProfile); // Keep this the same

// Delete user profile
router.delete('/', authMiddleware, deleteUserProfile); // Adjusted to match the API URL structure

module.exports = router;
