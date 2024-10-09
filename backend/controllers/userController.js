const User = require('../models/user');
const timestamp = () => new Date().toISOString();

// Fetch user profile by ID
exports.getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('-password'); // Exclude password
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update user profile
exports.updateUserProfile = async (req, res) => {
  try {
    const { username, email, bio, profilePicture, location, phone } = req.body;

    const user = await User.findByIdAndUpdate(
      req.user._id,
      { username, email, bio, profilePicture, location, phone },
      { new: true, runValidators: true }
    ).select('-password'); // Exclude password from the returned user

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete user profile
exports.deleteUserProfile = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.user._id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json({ message: 'User profile deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Add movie to favorites
exports.addMovieToFavorites = async (req, res) => {
  const { movieId } = req.body;

  if (!movieId) {
    return res.status(400).json({ message: 'Movie ID is required' });
  }

  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (!user.favorites.includes(movieId)) {
      user.favorites.push(movieId);
      await user.save();
    }

    res.status(200).json({ message: 'Movie added to favorites', favorites: user.favorites });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Add movie to wishlist
exports.addMovieToWishlist = async (req, res) => {
  const { movieId } = req.body;

  if (!movieId) {
    return res.status(400).json({ message: 'Movie ID is required' });
  }

  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (!user.wishlist.includes(movieId)) {
      user.wishlist.push(movieId);
      await user.save();
    }

    res.status(200).json({ message: 'Movie added to wishlist', wishlist: user.wishlist });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Fetch user's favorites and wishlist
exports.getUserFavoritesAndWishlist = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({
      favorites: user.favorites,
      wishlist: user.wishlist,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
