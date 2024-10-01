// context/AuthContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        const expiration = localStorage.getItem('expiration');

        // Check if the token exists and is still valid
        if (token && expiration) {
            const currentTime = new Date().getTime();
            if (currentTime < expiration) {
                // Token is valid, set the user (you might want to fetch user data here)
                setUser({}); // Set user data if available, e.g., fetch from API
            } else {
                // Token expired, remove it
                localStorage.removeItem('token');
                localStorage.removeItem('expiration');
            }
        }
    }, []);

    const loginUser = (data) => {
        setUser(data.user); // Assuming the user object is returned in data.user
        localStorage.setItem('token', data.token); // Store the token
        
        // Set token expiration (1 hour from now)
        const expirationTime = new Date().getTime() + 3600000; // 1 hour in milliseconds
        localStorage.setItem('expiration', expirationTime);
    };

    const logoutUser = () => {
        setUser(null);
        localStorage.removeItem('token');
        localStorage.removeItem('expiration');
    };

    return (
        <AuthContext.Provider value={{ user, loginUser, logoutUser }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
