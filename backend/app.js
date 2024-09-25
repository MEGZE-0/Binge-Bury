// app.js
const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoutes');
const movieRoutes = require('./routes/movieRoutes');
const reviewRoutes = require('./routes/reviewRoutes');
const genreRoutes = require('./routes/genreRoutes');
const movieGenreRoutes = require('./routes/movieGenreRoutes');
const authRoutes = require('./routes/authRoutes');
const os = require('os'); // Import the os module

const app = express();

// Middleware
app.use(express.json()); // For parsing application/json

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/yourdbname', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch((error) => console.error('MongoDB connection error:', error));

// Routes
app.use('/api/users', userRoutes);
app.use('/api/movies', movieRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/genres', genreRoutes);
app.use('/api/movieGenres', movieGenreRoutes);
app.use('/api/auth', authRoutes);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  const networkInterfaces = os.networkInterfaces();
  let ipAddress;

  for (const interface in networkInterfaces) {
    for (const details of networkInterfaces[interface]) {
      if (details.family === 'IPv4' && !details.internal) {
        ipAddress = details.address;
      }
    }
  }

  console.log(`Server is running on http://localhost:${PORT}`);
  console.log(`You can access the server at http://${ipAddress}:${PORT} from other devices on the same network`);
});

// Export the app instance for testing
module.exports = app;
