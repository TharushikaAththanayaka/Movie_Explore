import React, { useEffect, useState } from 'react';
import { Box, Typography, TextField, Button, Link, useTheme, CircularProgress, Alert } from '@mui/material';
import tmdbApi from '../Context/tmdbApi';
import MovieGrid from '../Components/Movie/MovieGrid'; // Assuming you have a MovieGrid component

const MoviesPage = () => {
  const [movies, setMovies] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const theme = useTheme(); // ⭐️ Get MUI theme
  const backgroundColor = theme.palette.mode === 'light' ? '#F8F9FA' : '#121212'; // Light or dark background
  const textColor = theme.palette.mode === 'light' ? '#121212' : '#F8F9FA'; // Adjust text color

  const fetchMovies = async (currentPage = 1) => {
    setIsLoading(true);
    setError(null);  // Reset the error message
    try {
      const res = searchQuery.trim() === '' 
        ? await tmdbApi.getTrending(currentPage) 
        : await tmdbApi.searchMovies(searchQuery, currentPage);
      setMovies((prevMovies) =>
        currentPage === 1 ? res.results : [...prevMovies, ...res.results]
      );
    } catch (err) {
      setError('Error fetching movies. Please try again later.');
      console.error('Error fetching movies:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setPage(1);
    fetchMovies(1);
  };

  const handleLoadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    fetchMovies(nextPage);
  };

  useEffect(() => {
    fetchMovies(1);
  }, []);

  return (
    <Box sx={{ p: 4, backgroundColor: backgroundColor, color: textColor, minHeight: '100vh' }}>
      <Box
        component="form"
        onSubmit={handleSearch}
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          mb: 4,
        }}
      >
        <TextField
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search movies..."
          variant="outlined"
          sx={{
            input: { color: textColor },
            width: { xs: '70%', sm: '50%', md: '40%' },
            mr: 2,
            '& .MuiOutlinedInput-root': {
              borderRadius: '30px',
              backgroundColor: theme.palette.mode === 'light' ? '#fff' : '#1E1E1E',
              '& fieldset': { borderColor: '#FFD700' }, // Gold border
              '&:hover fieldset': { borderColor: '#FFD700' }, // Gold on hover
            },
          }}
        />
        <Button
          variant="contained"
          type="submit"
          sx={{
            backgroundColor: '#FFD700', // Gold background
            color: '#121212', // Black text
            px: 4,
            py: 1,
            borderRadius: '30px',
            fontWeight: 'bold',
            '&:hover': { backgroundColor: '#E6C200' }, // Darker gold on hover
          }}
        >
          Search
        </Button>
      </Box>

      {/* Error Message */}
      {error && (
        <Alert severity="error" sx={{ mb: 4 }}>
          {error}
        </Alert>
      )}

      {/* Loading Spinner */}
      {isLoading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '300px' }}>
          <CircularProgress />
        </Box>
      ) : (
        <MovieGrid movies={movies} />
      )}

      {movies.length > 0 && !isLoading && (
        <Button
          variant="contained"
          onClick={handleLoadMore}
          sx={{
            backgroundColor: '#FFD700', // Gold background
            color: '#121212', // Black text
            px: 4,
            py: 1,
            borderRadius: '30px',
            fontWeight: 'bold',
            '&:hover': { backgroundColor: '#E6C200' }, // Darker gold on hover
            mt: 4,
            display: 'block',
            mx: 'auto',
          }}
        >
          Load More
        </Button>
      )}

      {/* Footer */}
      <Box
        sx={{
          backgroundColor: '#1E1E1E', // Always dark footer
          color: '#FFD700', // Gold text
          textAlign: 'center',
          py: 3,
          mt: 5,
        }}
      >
        <Typography variant="body2">© 2025 MovieStream. All rights reserved.</Typography>
        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mt: 1 }}>
          <Link href="/terms" sx={{ color: '#FFD700' }}>Terms of Service</Link>
          <Link href="/privacy" sx={{ color: '#FFD700' }}>Privacy Policy</Link>
          <Link href="/contact" sx={{ color: '#FFD700' }}>Contact Us</Link>
        </Box>
      </Box>
    </Box>
  );
};

export default MoviesPage;
