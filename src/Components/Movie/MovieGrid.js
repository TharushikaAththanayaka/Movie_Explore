// src/Components/MovieGrid.js
import React from 'react';
import { Box, Typography } from '@mui/material';
import MovieCard from './MovieCard';

const MovieGrid = ({ movies }) => {
  if (!movies || movies.length === 0) {
    return (
      <Typography sx={{ color: '#E9ECEF', textAlign: 'center', mt: 4 }}>
        No movies available.
      </Typography>
    );
  }

  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: {
          xs: 'repeat(2, 1fr)', // 2 per row on mobile
          sm: 'repeat(3, 1fr)', // 3 per row on small screens
          md: 'repeat(4, 1fr)', // 4 per row on medium
          lg: 'repeat(5, 1fr)', // ✅ 5 per row on large+
        },
        gap: 3,
      }}
    >
      {movies.map((movie) => (
        <Box key={movie.id}>
          <MovieCard movie={movie} />
        </Box>
      ))}
    </Box>
  );
};

export default MovieGrid;
