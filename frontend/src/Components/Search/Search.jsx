

import React, { useState } from 'react';
import './Search.css';

const Search = () => {
    const [query, setQuery] = useState('');

     const handleSearch = () => {
         alert(`You searched for: ${query}`);
        // Add search logic here
     };

    return (
        <div className="search-container">
            <input 
                type="text" 
                value={query} 
                onChange={(e) => setQuery(e.target.value)} 
                placeholder="Quick search" 
                className="search-bar" 
            />
            <button onClick={handleSearch} className="search-button">
                Search
            </button>
        </div>
    );
};

export default Search;