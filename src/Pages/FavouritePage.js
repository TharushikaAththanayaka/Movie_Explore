// src/Pages/FavouritePage.js
import React from 'react';
import { useMovie } from '../Context/MovieContext';
import MovieCard from '../Components/Movie/MovieCard';
import { Box, Typography, Link } from '@mui/material';

const FavouritesPage = () => {
  const { favorites } = useMovie(); // Get favorites from context

  return (
    <div>
      <br />
      <br />
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '16px', // Add gap between movie cards
          justifyContent: 'center', // Optionally, center the movie cards
        }}
      >
        {favorites.length === 0 ? (
          <Typography variant="h6" color="textSecondary">
            No favorite movies yet. Add some from the movie list!
          </Typography>
        ) : (
          favorites.map((movie) => <MovieCard key={movie.id} movie={movie} />)
        )}
      </Box>

      {/* Footer Section */}
      <Box
        sx={{
          marginTop: '30px',
          padding: '20px',
          backgroundColor: '#333',
          color: '#FFD700',
          textAlign: 'center',
        }}
      >
        <Typography variant="body2" color="inherit">
          &copy; 2025 MovieApp. All rights reserved.
        </Typography>
        <Typography variant="body2" color="inherit">
          <Link href="/privacy" sx={{ color: '#FFD700', textDecoration: 'none' }}>Privacy Policy</Link> | 
          <Link href="/terms" sx={{ color: '#FFD700', textDecoration: 'none' }}> Terms of Service</Link> |
          <Link href="/contact" sx={{ color: '#FFD700', textDecoration: 'none' }}> Contact Us</Link>
        </Typography>
      </Box>
    </div>
  );
};

export default FavouritesPage;
