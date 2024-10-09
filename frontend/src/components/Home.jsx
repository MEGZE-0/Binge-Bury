import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faBookmark } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';
import './Home.css';
import { fetchFavoritesAndWishlist, addMovieToFavorites, addMovieToWishlist } from '../api';

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [genre, setGenre] = useState('');
  const [userFavorites, setUserFavorites] = useState([]);
  const [userWishlist, setUserWishlist] = useState([]);
  const moviesPerPage = 25;

  // Fetch movies from API
  const getMovies = async (page) => {
    try {
      const url = `http://localhost:5000/api/movies/fetch-movies?page=${page}&limit=${moviesPerPage}`;
      const params = [];

      if (searchQuery) {
        params.push(`search=${encodeURIComponent(searchQuery)}`);
      }

      if (genre) {
        params.push(`genre=${encodeURIComponent(genre)}`);
      }

      const response = await axios.get(`${url}${params.length > 0 ? `&${params.join('&')}` : ''}`);
      setMovies(response.data.movies);
      setTotalPages(response.data.total);
    } catch (error) {
      console.error('Failed to fetch movies:', error);
    }
  };

  const fetchUserFavoritesAndWishlist = async () => {
    const token = localStorage.getItem('token');

    if (!token) {
      console.error('No auth token found');
      return;
    }

    try {
      const { favorites, wishlist } = await fetchFavoritesAndWishlist(token);
      setUserFavorites(favorites);  // Ensure favorites is an array of strings
      setUserWishlist(wishlist);    // Ensure wishlist is an array of strings
    } catch (error) {
      console.error('Failed to fetch favorites and wishlist:', error.response.data || error.message);
    }
  };

  // Trigger fetching of movies and user data on load and when filters change
  useEffect(() => {
    getMovies(currentPage);
    fetchUserFavoritesAndWishlist(); // Fetch user's favorites and wishlist
  }, [currentPage, searchQuery, genre]);

  // Handle user adding a movie to favorites
  const handleLove = async (event, movieId) => {
    event.stopPropagation();
    const token = localStorage.getItem('token');

    if (!token) {
      console.error('No auth token found');
      return;
    }

    try {
      await addMovieToFavorites(token, movieId);
      fetchUserFavoritesAndWishlist(); // Update favorites after adding
      Swal.fire({
        title: 'Success!',
        text: 'Movie added to favorites.',
        icon: 'success',
      });
    } catch (error) {
      console.error('Failed to add movie to favorites:', error);
      Swal.fire({
        title: 'Error!',
        text: error.response?.data?.message || 'Failed to add movie to favorites.',
        icon: 'error',
      });
    }
  };

  const handleWishlist = async (event, movieId) => {
    event.stopPropagation();
    const token = localStorage.getItem('token');

    if (!token) {
      console.error('No auth token found');
      return;
    }

    try {
      await addMovieToWishlist(token, movieId);
      fetchUserFavoritesAndWishlist(); // Update wishlist after adding
      Swal.fire({
        title: 'Success!',
        text: 'Movie added to wishlist.',
        icon: 'success',
      });
    } catch (error) {
      console.error('Failed to add movie to wishlist:', error);
      Swal.fire({
        title: 'Error!',
        text: error.response?.data?.message || 'Failed to add movie to wishlist.',
        icon: 'error',
      });
    }
  };

  // Check if movie is in user's favorites
  const isFavorite = (movieId) => userFavorites.includes(movieId.toString());

  // Check if movie is in user's wishlist
  const isInWishlist = (movieId) => userWishlist.includes(movieId.toString());

  // Handle search input change
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  // Handle genre selection change
  const handleGenreChange = (event) => {
    setGenre(event.target.value);
  };

  return (
    <div className="home-container">
      <h1 className="home-title">Movies</h1>

      <input
        type="text"
        placeholder="Search for movies..."
        value={searchQuery}
        onChange={handleSearchChange}
        className="search-input"
      />

      <select value={genre} onChange={handleGenreChange} className="genre-select">
        <option value="">All Genres</option>
        <option value="28">Action</option>
        <option value="12">Adventure</option>
        <option value="16">Animation</option>
        <option value="35">Comedy</option>
        {/* Add more genres as needed */}
      </select>

      {movies.length > 0 ? (
        <div className="movies-grid">
          {movies.map(movie => (
            <div className="movie-card" key={movie.id}>
              <Link to={`/movies/${movie.id}`} className="movie-link">
                <img
                  className="movie-video"
                  src={movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : 'https://via.placeholder.com/150'}
                  alt={movie.title}
                />
                <h2 className="movie-title">{movie.title}</h2>
                <p className="movie-description"><strong>Overview:</strong> {movie.overview}</p>
                <p className="movie-release-date"><strong>Release Date:</strong> {movie.release_date}</p>
                <p className="movie-rating"><strong>Rating:</strong> {movie.vote_average}</p>
              </Link>
              <div className="movie-actions">
                <button 
                  onClick={(event) => handleLove(event, movie.id)} 
                  className={`action-button love-button ${isFavorite(movie.id) ? 'active highlight' : ''}`}
                >
                  <FontAwesomeIcon icon={faHeart} /> {isFavorite(movie.id) ? 'Loved' : 'Love'}
                </button>
                <button 
                  onClick={(event) => handleWishlist(event, movie.id)} 
                  className={`action-button wishlist-button ${isInWishlist(movie.id) ? 'active highlight' : ''}`}
                >
                  <FontAwesomeIcon icon={faBookmark} /> {isInWishlist(movie.id) ? 'In Wishlist' : 'Wishlist'}
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No movies found.</p>
      )}

      <div className="pagination">
        <button 
          onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} 
          disabled={currentPage === 1}
          className="pagination-button"
        >
          Previous
        </button>
        <span>Page {currentPage} of {totalPages}</span>
        <button 
          onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))} 
          disabled={currentPage === totalPages}
          className="pagination-button"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Home;
