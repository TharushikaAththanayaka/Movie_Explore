// src/Pages/MovieDetailsPage.js

import React from 'react';
import { useParams, Link } from 'react-router-dom';
import MovieDetails from '../Components/Movie/MovieDetails';
import { Box, Typography, useTheme, Button } from '@mui/material';

const MovieDetailsPage = () => {
  const { id } = useParams();
  const theme = useTheme();

  // Define gold tones based on theme
  const footerTextColor = theme.palette.mode === 'light' ? '#FFD700' : '#B8860B'; // Gold and DarkGoldenRod
  const backgroundColor = theme.palette.mode === 'light' ? '#F8F9FA' : '#121212'; // Light or dark background
  const textColor = theme.palette.mode === 'light' ? '#121212' : '#F8F9FA'; // Adjust text color

  // Button color adjustment based on theme
  const buttonColor = theme.palette.mode === 'light' ? '#121212' : '#FFD700'; // Dark button in light mode, gold in dark mode
  const buttonBorderColor = theme.palette.mode === 'light' ? '#121212' : '#FFD700'; // Dark border in light mode, gold in dark mode

  return (
    <Box sx={{ padding: '2rem', backgroundColor: backgroundColor, color: textColor, minHeight: '100vh' }}>
      {/* Movie Details Component */}
      <MovieDetails movieId={id} />

      {/* Footer */}
      <Box
        sx={{
          backgroundColor: '#1E1E1E', // Always dark footer
          color: footerTextColor,
          textAlign: 'center',
          py: 3,
          mt: 5,
        }}
      >
        <Typography variant="body2">
          © 2025 MovieStream. All rights reserved.
        </Typography>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            gap: 2,
            mt: 1,
          }}
        >
          <Link to="/terms" style={{ color: footerTextColor, textDecoration: 'none' }}>
            Terms of Service
          </Link>
          <Link to="/privacy" style={{ color: footerTextColor, textDecoration: 'none' }}>
            Privacy Policy
          </Link>
          <Link to="/contact" style={{ color: footerTextColor, textDecoration: 'none' }}>
            Contact Us
          </Link>
        </Box>
      </Box>

      {/* Back Button */}
      <Box sx={{ mt: 3, textAlign: 'center' }}>
        <Button
          variant="outlined"
          sx={{
            borderRadius: '30px',
            borderColor: buttonBorderColor,
            color: buttonColor,
            '&:hover': { borderColor: '#E6C200', color: '#E6C200' },
          }}
          component={Link}
          to="/movies"
        >
          Back to Movies
        </Button>
      </Box>
    </Box>
  );
};

export default MovieDetailsPage;
