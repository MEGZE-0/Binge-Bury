const User = require('../models/User');

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
  
      // Log the user ID and body for debugging
      console.log('Updating user with ID:', req.user._id);
      console.log('Request body:', req.body);
  
      // Perform the update operation
      const user = await User.findByIdAndUpdate(
        req.user._id,
        { 
          username, 
          email, 
          bio, 
          profilePicture, 
          location, 
          phone 
        },
        { new: true, runValidators: true } // Return updated user and validate fields
      ).select('-password'); // Exclude password from the returned user
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      // Log the updated user object
      console.log('Updated user:', user);
  
      res.status(200).json(user);
    } catch (err) {
      // Log the error
      console.error('Error updating user:', err);
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
