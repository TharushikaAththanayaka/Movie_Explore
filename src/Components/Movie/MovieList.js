import React from 'react';
import { useMovieContext } from '../context/MovieContext';

const MovieList = () => {
  const { movies, favoriteMovies, addFavoriteMovie, removeFavoriteMovie } = useMovieContext();

  // Handle adding a movie to favorites
  const handleAddFavorite = (movie) => {
    addFavoriteMovie(movie);
  };

  // Handle removing a movie from favorites
  const handleRemoveFavorite = (movie) => {
    removeFavoriteMovie(movie);
  };

  return (
    <div>
      <h2>Movies</h2>
      <div>
        {movies.length === 0 ? (
          <p>No movies available!</p> // Shows when no movies are present
        ) : (
          movies.map((movie) => (
            <div key={movie.id} style={{ marginBottom: '10px' }}>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <img 
                  src={`https://image.tmdb.org/t/p/w92${movie.poster_path}`} 
                  alt={movie.title} 
                  style={{ width: '50px', height: '75px', marginRight: '10px' }} 
                />
                <span>{movie.title}</span>
              </div>
              {/* Check if the movie is in favorites using movie ID */}
              {favoriteMovies.some(fav => fav.id === movie.id) ? (
                <button onClick={() => handleRemoveFavorite(movie)}>Remove from Favorites</button>
              ) : (
                <button onClick={() => handleAddFavorite(movie)}>Add to Favorites</button>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default MovieList;
