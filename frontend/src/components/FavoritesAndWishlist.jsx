import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext'; // Adjust the import as necessary
import { fetchFavoritesAndWishlist } from '../api'; 
import axios from 'axios';
import './FavoritesAndWishlist.css'; // Import the CSS file

const TMDB_API_KEY = 'ab785c229d70ba8653cc935f6a189303'; // Replace with your TMDB API key

const FavoritesAndWishlist = () => {
    const { user } = useAuth(); // Use the custom hook to access user context
    const [favorites, setFavorites] = useState([]);
    const [wishlist, setWishlist] = useState([]);
    const [movieDetails, setMovieDetails] = useState([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getFavoritesAndWishlist = async () => {
            const token = localStorage.getItem('token');
            console.log('Authorization Token:', token); // Log the token
            console.log('User:', user); // Log the user context

            if (token) {
                try {
                    const data = await fetchFavoritesAndWishlist(token);
                    console.log('Fetched Data:', data); // Log the fetched data
                    setFavorites(data.favorites);
                    setWishlist(data.wishlist);
                    // Fetch movie details after setting favorites and wishlist
                    await fetchMoviesDetails([...data.favorites, ...data.wishlist]);
                } catch (error) {
                    console.error('Failed to fetch favorites and wishlist:', error);
                    setError('Failed to fetch your favorites and wishlist. Please try again later.');
                } finally {
                    setLoading(false);
                }
            } else {
                console.warn('No token found. User is not authorized.'); // Warn if token is not found
                setLoading(false);
            }
        };

        const fetchMoviesDetails = async (movieIds) => {
            try {
                const details = await Promise.all(movieIds.map(async (id) => {
                    const response = await axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=${TMDB_API_KEY}`);
                    return response.data;
                }));
                setMovieDetails(details);
            } catch (error) {
                console.error('Failed to fetch movie details:', error);
                setError('Failed to fetch movie details. Please try again later.');
            }
        };

        getFavoritesAndWishlist();
    }, [user]);

    if (loading) {
        console.log('Loading state is true.'); // Log loading state
        return <div>Loading your favorites and wishlist...</div>;
    }

    console.log('Movie Details:', movieDetails); // Log movie details array
    console.log('Error:', error); // Log any error message

    return (
        <div className="favorites-wishlist">
            <h1>Your Favorites</h1>
            {error && <p className="error">{error}</p>} {/* Display error message if any */}
            {favorites.length > 0 ? (
                <ul>
                    {movieDetails.map((movie) => (
                        <li key={movie.id}>
                            <h2>{movie.title}</h2>
                            <p>{movie.overview}</p>
                            <p>Release Date: {movie.release_date}</p>
                            <p>Rating: {movie.vote_average}</p>
                            <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No favorites added yet.</p>
            )}

            <h1>Your Wishlist</h1>
            {wishlist.length > 0 ? (
                <ul>
                    {movieDetails.map((movie) => (
                        <li key={movie.id}>
                            <h2>{movie.title}</h2>
                            <p>{movie.overview}</p>
                            <p>Release Date: {movie.release_date}</p>
                            <p>Rating: {movie.vote_average}</p>
                            <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No movies in your wishlist yet.</p>
            )}

            {/* Display all movie details here */}

        </div>
    );
};

export default FavoritesAndWishlist;
