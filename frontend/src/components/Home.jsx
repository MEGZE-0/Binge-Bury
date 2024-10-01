import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faBookmark } from '@fortawesome/free-solid-svg-icons';
import './Home.css';

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [genre, setGenre] = useState('');
  const moviesPerPage = 25;

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

  useEffect(() => {
    getMovies(currentPage);
  }, [currentPage, searchQuery, genre]);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
    setCurrentPage(1);
  };

  const handleGenreChange = (event) => {
    setGenre(event.target.value);
    setCurrentPage(1);
  };

  const handleLove = (event, movieId) => {
    event.stopPropagation(); // Prevent link click
    console.log(`Loved movie with ID: ${movieId}`);
    // Implement your logic for loving a movie
  };

  const handleWishlist = (event, movieId) => {
    event.stopPropagation(); // Prevent link click
    console.log(`Added movie with ID: ${movieId} to wishlist`);
    // Implement your logic for adding to wishlist
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
                <button onClick={(event) => handleLove(event, movie.id)} className="action-button love-button">
                  <FontAwesomeIcon icon={faHeart} /> Love
                </button>
                <button onClick={(event) => handleWishlist(event, movie.id)} className="action-button wishlist-button">
                  <FontAwesomeIcon icon={faBookmark} /> Wishlist
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
