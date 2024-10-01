// src/components/Auth/Login.jsx
import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { login } from '../../api';
import Swal from 'sweetalert2'; // Import SweetAlert2
import './Auth.css';

const Login = () => {
  const { loginUser } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const data = await login(email, password);
      loginUser(data);

      // Display a success alert after login
      Swal.fire({
        icon: 'success',
        title: 'Login Successful',
        text: 'Welcome back!',
      });

      // Redirect or perform further actions if needed
    } catch (err) {
      // Extract the error message
      const errorMessage = err.response?.data?.message || 'Please check your email and password.';

      Swal.fire({
        icon: 'error',
        title: 'Invalid credentials',
        text: errorMessage, // Display the error message from the server
      });
    }
  };

  return (
    <div className="auth-container">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
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
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
