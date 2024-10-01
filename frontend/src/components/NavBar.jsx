import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // Import the Auth context
import './NavBar.css';

const NavBar = () => {
  const { user, logoutUser } = useAuth(); // Access user and logoutUser from context
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State to track menu visibility

  const handleLogout = () => {
    logoutUser(); // Call the logout function
  };

const toggleMenu = () => {
    setIsMenuOpen(prevState => !prevState); // Toggle menu visibility
};


  return (
    <nav className="navbar">
      <h1>Your Brand</h1>
      <div className="menu-icon" onClick={toggleMenu}>
        <div className={`bar ${isMenuOpen ? 'open' : ''}`}></div>
        <div className={`bar ${isMenuOpen ? 'open' : ''}`}></div>
        <div className={`bar ${isMenuOpen ? 'open' : ''}`}></div>
      </div>
      <ul className={`navbar-menu ${isMenuOpen ? 'active' : ''}`}>
        <li><Link to="/">Home</Link></li>
        {!user ? (
          <>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/register">Register</Link></li>
          </>
        ) : (
          <>
            <li>
              <button onClick={handleLogout} className="logout-button">
                Logout
              </button>
            </li>
            <li><Link to="/profile">Profile</Link></li>
          </>
        )}
        <li><Link to="/favorites">Favorites</Link></li>
        <li><Link to="/movies">Movies</Link></li>
        <li><Link to="/upload">Upload Movie</Link></li>
      </ul>
    </nav>
  );
};

export default NavBar;
