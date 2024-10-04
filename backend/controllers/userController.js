const User = require('../models/User');
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
// Add movie to favorites
exports.addMovieToFavorites = async (req, res) => {
  try {
      // Check if the user is authenticated
      if (!req.user || !req.user._id) {
          return res.status(401).json({ message: 'Unauthorized: No user found' });
      }

      // Find the user
      const user = await User.findById(req.user._id);
      if (!user) {
          return res.status(404).json({ message: 'User not found' });
      }

      // Get movieId from the request body
      const { movieId } = req.body;
      if (!movieId) {
          return res.status(400).json({ message: 'Movie ID is required' });
      }

      // Check if the movie is already in favorites
      if (user.favorites.includes(movieId)) {
          return res.status(400).json({ message: 'Movie already in favorites' });
      }

      // Add movieId to favorites and save the user
      user.favorites.push(movieId);
      await user.save();

      // Send a response with the updated favorites
      res.status(200).json({ message: 'Movie added to favorites', favorites: user.favorites });
  } catch (err) {
      console.error('Error adding to favorites:', err); // Log the error for debugging
      res.status(500).json({ error: err.message });
  }
};


exports.addMovieToWishlist = async (req, res) => {
  try {
      const user = await User.findById(req.user._id);
      if (!user) {
          return res.status(404).json({ message: 'User not found' });
      }

      const { movieId } = req.body;
      if (!movieId) {
          return res.status(400).json({ message: 'Movie ID is required' });
      }

      if (user.wishlist.includes(movieId)) {
          return res.status(400).json({ message: 'Movie already in wishlist' });
      }

      user.wishlist.push(movieId);
      await user.save();
      res.status(200).json({ message: 'Movie added to wishlist', wishlist: user.wishlist });
  } catch (err) {
      console.error('Error adding to wishlist:', err); // Log the error
      res.status(500).json({ error: err.message });
  }
};
// Fetch user favorites and wishlist
exports.getUserFavoritesAndWishlist = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('-password'); // Exclude password
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
// Remove a movie from user favorites
exports.removeMovieFromFavorites = async (req, res) => {
  try {
    console.log("Removing movie from favorites...");

    const user = await User.findById(req.user._id);
    console.log("User found:", user); // Log the user object

    if (!user) {
      console.log("User not found");
      return res.status(404).json({ message: 'User not found' });
    }

    const movieId = req.params.movieId;
    console.log("Movie ID to remove:", movieId); // Log the movie ID

    // Check if movieId exists in favorites
    if (!user.favorites.includes(movieId)) {
      console.log("Movie not found in favorites");
      return res.status(400).json({ message: 'Movie not found in favorites' });
    }

    // Remove movieId from favorites
    user.favorites = user.favorites.filter(id => id.toString() !== movieId);
    await user.save(); // Save the updated user document

    console.log("Updated favorites:", user.favorites); // Log the updated favorites
    res.status(200).json({ message: 'Movie removed from favorites', favorites: user.favorites });
  } catch (err) {
    console.error("Error removing movie from favorites:", err); // Log the error
    res.status(500).json({ error: err.message });
  }
};

// Remove a movie from user wishlist
exports.removeMovieFromWishlist = async (req, res) => {
  try {
    console.log("Removing movie from wishlist...");

    const user = await User.findById(req.user._id);
    console.log("User found:", user); // Log the user object

    if (!user) {
      console.log("User not found");
      return res.status(404).json({ message: 'User not found' });
    }

    const movieId = req.params.movieId;
    console.log("Movie ID to remove:", movieId); // Log the movie ID

    // Check if movieId exists in wishlist
    if (!user.wishlist.includes(movieId)) {
      console.log("Movie not found in wishlist");
      return res.status(400).json({ message: 'Movie not found in wishlist' });
    }

    // Remove movieId from wishlist
    user.wishlist = user.wishlist.filter(id => id.toString() !== movieId);
    await user.save(); // Save the updated user document

    console.log("Updated wishlist:", user.wishlist); // Log the updated wishlist
    res.status(200).json({ message: 'Movie removed from wishlist', wishlist: user.wishlist });
  } catch (err) {
    console.error("Error removing movie from wishlist:", err); // Log the error
    res.status(500).json({ message: 'Server error' });
  }
};
// Fetch user favorites
exports.fetchUserFavorites = async (req, res) => {
  try {
      console.log(`[${timestamp()}] Fetching favorites for user ID: ${req.user._id}`);
      
      const user = await User.findById(req.user._id).select('-password'); // Exclude password
      if (!user) {
          console.log(`[${timestamp()}] User not found`);
          return res.status(404).json({ message: 'User not found' });
      }
      
      console.log(`[${timestamp()}] User found: ${user.username}`); 
      console.log(`[${timestamp()}] Favorites: ${JSON.stringify(user.favorites)}`);
      
      res.status(200).json({ favorites: user.favorites });
  } catch (err) {
      console.error(`[${timestamp()}] Error fetching favorites:`, err.message);
      res.status(500).json({ error: err.message });
  }
};

// Fetch user wishlist
exports.fetchUserWishlist = async (req, res) => {
  try {
      console.log(`[${timestamp()}] Fetching wishlist for user ID: ${req.user._id}`);
      
      const user = await User.findById(req.user._id).select('-password'); // Exclude password
      if (!user) {
          console.log(`[${timestamp()}] User not found`);
          return res.status(404).json({ message: 'User not found' });
      }
      
      console.log(`[${timestamp()}] User found: ${user.username}`);
      console.log(`[${timestamp()}] Wishlist: ${JSON.stringify(user.wishlist)}`);
      
      res.status(200).json({ wishlist: user.wishlist });
  } catch (err) {
      console.error(`[${timestamp()}] Error fetching wishlist:`, err.message);
      res.status(500).json({ error: err.message });
  }
};
