// controllers/authController.js
const User = require('../models/User');

exports.register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Check for existing user
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already exists' });
    }

    const user = new User({
      username,
      email,
      password,
      roles: ['user'], // Set default role to user
    });

    await user.save();
    const token = user.generateAuthToken();
    res.status(201).json({ user, token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Use the comparePassword method
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Generate and return a token if passwords match
    const token = user.generateAuthToken();
    res.status(200).json({ token, user }); // Include user data in the response
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};
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