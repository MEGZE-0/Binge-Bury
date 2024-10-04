import React, { useState } from 'react';
import { register } from '../../api';
import { useAuth } from '../../context/AuthContext';
import Swal from 'sweetalert2'; // Import SweetAlert2
import './Auth.css';

const Register = () => {
  const { loginUser } = useAuth();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false); // State for loading

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true); // Start loading
    try {
      const data = await register(username, email, password);
      loginUser(data); // Log in the user after successful registration
      // You can redirect or perform further actions here if needed
      Swal.fire({
        icon: 'success',
        title: 'Registration Successful',
        text: 'You have registered successfully!',
      });
    } catch (err) {
      console.error(err); // Log the error for debugging
      const errorMessage = err.response?.data?.message || 'Please try again or check your inputs.';
      Swal.fire({
        icon: 'error',
        title: 'Registration failed',
        text: errorMessage,
      });
    }
     finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <div className="auth-container">
      <h2>Register</h2>
      <form onSubmit={handleRegister}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Registering...' : 'Register'} {/* Loading text */}
        </button>
      </form>
    </div>
  );
};

export default Register;
