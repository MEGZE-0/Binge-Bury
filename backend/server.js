const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const authRoutes = require('./routes/auth');
const movieRoutes = require('./routes/movies');
const userRoutes = require('./routes/user');
const { Server } = require('socket.io');
const cors = require('cors'); // Add this line

const http = require('http');

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = new Server(server);
app.use(cors()); // Enable CORS for all routes

app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

// Socket.IO for real-time notifications
io.on('connection', (socket) => {
    console.log('New user connected');
    // Handle events here
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/movies', movieRoutes);
app.use('/api/profile',userRoutes);
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
