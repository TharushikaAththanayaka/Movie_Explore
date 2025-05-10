// src/Context/MovieContext.js
import { createContext, useContext, useState, useEffect } from 'react';
import tmdbApi from './tmdbApi'; // Ensure this path is correct!

const MovieContext = createContext();

export const MovieProvider = ({ children }) => {
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [favorites, setFavorites] = useState(
    JSON.parse(localStorage.getItem('favorites')) || []
  );
  const [lastSearch, setLastSearch] = useState(
    localStorage.getItem('lastSearch') || ''
  );

  // Add a movie to favorites (avoid duplicates)
  const addFavorite = (movie) => {
    if (!favorites.some((m) => m.id === movie.id)) {
      const updated = [...favorites, movie];
      setFavorites(updated);
      localStorage.setItem('favorites', JSON.stringify(updated));
    }
  };

  // Remove a movie from favorites
  const removeFavorite = (id) => {
    const updated = favorites.filter((m) => m.id !== id);
    setFavorites(updated);
    localStorage.setItem('favorites', JSON.stringify(updated));
  };

  // Fetch trending movies on component mount
  const fetchTrending = async () => {
    try {
      const data = await tmdbApi.getTrending();
      setTrendingMovies(data.results);
    } catch (error) {
      console.error('Error fetching trending movies:', error);
    }
  };

  // Fetch search results
  const searchMovies = async (query, page = 1) => {
    try {
      const data = await tmdbApi.searchMovies(query, page);
      if (page === 1) {
        setSearchResults(data.results); // Reset results on new search
      } else {
        setSearchResults((prev) => [...prev, ...data.results]); // Append new page results
      }
      localStorage.setItem('lastSearch', query);
      setLastSearch(query);
    } catch (error) {
      console.error('Error searching movies:', error);
    }
  };

  // Fetch trending movies once when component mounts
  useEffect(() => {
    fetchTrending();
  }, []);

  return (
    <MovieContext.Provider
      value={{
        trendingMovies,
        searchResults,
        favorites,
        lastSearch,
        searchMovies,
        addFavorite,
        removeFavorite
      }}
    >
      {children}
    </MovieContext.Provider>
  );
};

export const useMovie = () => useContext(MovieContext);
