const User = require('../models/user'); // Assuming you have a User model
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config(); // Load environment variables from .env file
// Function to generate a JWT token
const generateToken = (userId) => {
    return jwt.sign({ id: userId }, process.env.JWT_SECRET_KEY, { expiresIn: '1h' }); // Token expires in 1 hour
  };
  const secretKey = generateToken();
  console.log(`Your generated jwt key: ${secretKey}`);
  
// Create new authentication record (sign up)
exports.createAuth = async (req, res) => {
  try {
    const { name, email, password } = req.body; // Include name in registration
    const hashedPassword = await bcrypt.hash(password, 10); 

    const user = new User({
      name,         // Save name
      email,
      hashed_password: hashedPassword,
    });

    await user.save();

    const token = generateToken(user._id); // Generate a token
    res.status(201).json({ token }); // Return the token in response
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// User login
exports.loginAuth = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user || !(await bcrypt.compare(password, user.hashed_password))) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const token = generateToken(user._id); // Generate a token
    res.status(200).json({ token }); // Return the token in response
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
