// __tests__/movieController.test.js
const request = require('supertest');
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

// Middleware to parse JSON
app.use(express.json());

// Import your movie controller and routes
const movieRoutes = require('../routes/movies');

// Connect the routes
app.use('/api/movies', movieRoutes);

// Connect to MongoDB (replace with your own connection string)
beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
});

// Close the database connection after tests are done
afterAll(async () => {
    await mongoose.connection.close();
});

// Test the fetchMoviesFromTMDB endpoint
describe('Movie API', () => {
    it('should fetch popular movies from TMDB', async () => {
        const res = await request(app).get('/api/movies/fetchTMDB');
        expect(res.statusCode).toEqual(200);
        expect(res.body).toBeInstanceOf(Array); // Check if the response is an array
    });

    it('should search movies in TMDB', async () => {
        const query = 'Inception';
        const res = await request(app).get(`/api/movies/search?query=${query}`);
        expect(res.statusCode).toEqual(200);
        expect(res.body).toBeInstanceOf(Array); // Check if the response is an array
    });

    it('should fetch movie details from TMDB', async () => {
        const movieId = 550; // Use a known movie ID (Fight Club)
        const res = await request(app).get(`/api/movies/${movieId}`);
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('id', movieId); // Check if the response has the correct movie ID
    });

    it('should get recommendations for a movie', async () => {
        const movieId = 550; // Use a known movie ID (Fight Club)
        const res = await request(app).get(`/api/movies/${movieId}/recommendations`);
        expect(res.statusCode).toEqual(200);
        expect(res.body).toBeInstanceOf(Array); // Check if the response is an array
    });
});
