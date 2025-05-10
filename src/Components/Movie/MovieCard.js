// src/Components/Movie/MovieCard.js
import React, { useState, useEffect } from 'react';
import { Card, CardMedia, CardContent, Typography, Button, Stack } from '@mui/material';
import { Link } from 'react-router-dom';
import { useMovie } from '../../Context/MovieContext';
import { FaEye, FaHeart, FaStar } from 'react-icons/fa';
import { useTheme } from '@mui/material/styles';

const MovieCard = ({ movie }) => {
  const { addFavorite, removeFavorite, favorites } = useMovie();
  const [isFavorite, setIsFavorite] = useState(false);
  const theme = useTheme(); // Get the current theme

  useEffect(() => {
    // Check if the movie is already in the favorites list
    const isMovieFavorite = favorites.some((m) => m.id === movie.id);
    setIsFavorite(isMovieFavorite);
  }, [favorites, movie.id]);

  const handleAddFavorite = () => {
    if (!isFavorite) {
      addFavorite(movie); // Adds movie to favorites
      setIsFavorite(true); // Set as favorited
    } else {
      removeFavorite(movie.id); // Remove from favorites
      setIsFavorite(false); // Set as not favorited
    }
  };

  return (
    <Card
      sx={{
        backgroundColor: theme.palette.background.paper,
        color: theme.palette.text.primary,
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        border: `1px solid ${theme.palette.primary.main}`,
        boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
        transition: 'background-color 0.3s, color 0.3s',
      }}
    >
      <CardMedia
        component="img"
        height="300"
        image={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={movie.title}
        sx={{ objectFit: 'cover' }}
      />
      <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        <Typography variant="h6" sx={{ mb: 1, fontWeight: 'bold', color: theme.palette.primary.main }}>
          {movie.title}
        </Typography>
        <Typography variant="body2" sx={{ color: theme.palette.text.secondary, opacity: 0.7, mb: 1 }}>
          Year: {movie.release_date ? movie.release_date.split('-')[0] : 'N/A'}
        </Typography>

        <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 1 }}>
          <Stack direction="row" alignItems="center" spacing={0.5}>
            <FaEye color={theme.palette.primary.light} />
            <Typography variant="body2">{movie.popularity ? Math.round(movie.popularity) : 'N/A'}</Typography>
          </Stack>
          <Stack direction="row" alignItems="center" spacing={0.5}>
            <FaHeart color="red" />
            <Typography variant="body2">{movie.vote_count ?? 0}</Typography>
          </Stack>
          <Stack direction="row" alignItems="center" spacing={0.5}>
            <FaStar color="gold" />
            <Typography variant="body2">{movie.vote_average ?? 0}</Typography>
          </Stack>
        </Stack>

        <Stack direction="row" spacing={1} mt="auto">
          <Button component={Link} to={`/movies/${movie.id}`} size="small" variant="outlined" sx={{ color: theme.palette.mode === 'dark' ? '#FFD700' : '#121212' }}>
            Details
          </Button>
          <Button
            onClick={handleAddFavorite}
            size="small"
            variant={isFavorite ? 'contained' : 'outlined'}
            sx={{
              backgroundColor: isFavorite ? '#FFD700' : 'transparent',
              color: isFavorite ? '#121212' : '#FFD700',
              borderColor: '#FFD700',
              '&:hover': {
                backgroundColor: '#FFD700',
                color: '#121212',
              },
            }}
          >
            {isFavorite ? 'Favorite' : 'Add to Favorites'} {/* Change text based on state */}
          </Button>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default MovieCard;
