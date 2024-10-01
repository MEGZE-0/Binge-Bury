import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom'; // Import useNavigate
import './MovieDetail.css'; // If you have styles

const MovieDetail = () => {
    const { id } = useParams(); // Get the movie ID from the URL
    const [movie, setMovie] = useState(null);
    const [relatedMovies, setRelatedMovies] = useState([]);
    const navigate = useNavigate(); // Initialize useNavigate

    useEffect(() => {
        const fetchMovieDetails = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/movies/${id}`);
                if (response.data.success) {
                    setMovie(response.data.movie); // Adjust according to your API response
                } else {
                    console.error('Error fetching movie:', response.data.error);
                }

                // Fetch related movies if needed
                const relatedResponse = await axios.get(`http://localhost:5000/api/movies/${id}/recommendations`);
                if (relatedResponse.data.success) {
                    setRelatedMovies(relatedResponse.data.recommendations);
                }
            } catch (error) {
                console.error('Failed to fetch movie details:', error.response ? error.response.data : error.message);
            }
        };

        fetchMovieDetails();
    }, [id]);

    if (!movie) return <p>Loading...</p>; // Loading state

    // Handler to navigate to the selected movie's detail page
    const handleRelatedMovieClick = (relatedMovieId) => {
        navigate(`/movies/${relatedMovieId}`); // Adjust the route according to your setup
    };

    return (
        <div className="movie-detail">
            <div className="movie-header">
                <img 
                    className="movie-poster"
                    src={movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : 'https://via.placeholder.com/150'} 
                    alt={movie.title} 
                />
                <h1 className="movie-title">{movie.title}</h1>
            </div>
            <div className="movie-info">
                <p className="movie-overview">{movie.overview}</p>
                <div className="movie-additional-info">
                    <p className="movie-release-date">Release Date: {movie.release_date}</p>
                    <p className="movie-rating">Rating: {movie.vote_average}</p>
                    <p className="movie-runtime">Runtime: {movie.runtime} minutes</p>
                    <p className="movie-budget">Budget: {movie.budget ? `$${movie.budget.toLocaleString()}` : 'N/A'}</p>
                    <p className="movie-revenue">Revenue: {movie.revenue ? `$${movie.revenue.toLocaleString()}` : 'N/A'}</p>
                    <p className="movie-language">Original Language: {movie.original_language}</p>
                    {movie.homepage && <p className="movie-homepage"><a href={movie.homepage} target="_blank" rel="noopener noreferrer">Official Homepage</a></p>}
                </div>

                <h2>Genres</h2>
                <ul className="movie-genres">
                    {movie.genres.map((genre) => (
                        <li key={genre.id}>{genre.name}</li>
                    ))}
                </ul>

                <h2>Director</h2>
                <p>{movie.director && movie.director.name ? movie.director.name : 'No Director Info Available'}</p>

                <h2>Cast</h2>
                <ul className="movie-cast">
                    {movie.cast && movie.cast.length > 0 ? (
                        movie.cast.map((actor) => (
                            <li key={actor.id}>{actor.name}</li>
                        ))
                    ) : (
                        <p>No Cast Info Available</p>
                    )}
                </ul>

                <h2>Trailer</h2>
                {movie.trailer ? (
                    <iframe
                        width="560"
                        height="315"
                        src={`https://www.youtube.com/embed/${movie.trailer}`}
                        title="Trailer"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    ></iframe>
                ) : (
                    <p>No trailer available</p>
                )}

                <h2>Related Movies</h2>
                <div className="related-movies">
                    {relatedMovies.map((relatedMovie) => (
                        <div className="related-movie" key={relatedMovie.id} onClick={() => handleRelatedMovieClick(relatedMovie.id)}>
                            <img 
                                className="related-movie-poster"
                                src={relatedMovie.poster_path ? `https://image.tmdb.org/t/p/w500${relatedMovie.poster_path}` : 'https://via.placeholder.com/100'} 
                                alt={relatedMovie.title} 
                            />
                            <p className="related-movie-title">{relatedMovie.title}</p>
                            <p>Rating: {relatedMovie.vote_average}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default MovieDetail;
