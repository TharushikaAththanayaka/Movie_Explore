// src/components/MovieSearch.js
import React, { useState } from 'react';
import { useMovieContext } from '../context/MovieProvider';

const MovieSearch = () => {
  const { searchMovie, lastSearchedMovie, setMovies } = useMovieContext();
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = () => {
    searchMovie(searchTerm);
    // Simulate a movie search (you can call an API here)
    setMovies([{ title: searchTerm }]); // Example: Update movie data based on search
  };

  return (
    <div>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search for movies"
      />
      <button onClick={handleSearch}>Search</button>
      <p>Last Searched Movie: {lastSearchedMovie}</p>
    </div>
  );
};

export default MovieSearch;
