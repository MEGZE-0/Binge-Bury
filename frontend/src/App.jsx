// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from './context/AuthContext';
import NavBar from './components/NavBar';
import Home from './components/Home';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import MovieList from './components/MovieDetail';
import MovieDetail from './components/MovieDetail'; // Adjust according to actual filename
import Profile from './components/Profile/Profile';
import FavoritesAndWishlist from './components/FavoritesAndWishlist';

import './styles/App.css';

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/movie" element={<MovieList />} />
          <Route path="/movies/:id" element={<MovieDetail />} /> {/* Route for movie details */}
          <Route path="/profile" element={<Profile />} />
          <Route path="/favorites-wishlist" element={<FavoritesAndWishlist />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
