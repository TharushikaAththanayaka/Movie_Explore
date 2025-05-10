// src/Pages/MovieDetails.js

import React, { useEffect, useState } from 'react';
import { Box, Typography, Button, Grid, Rating, Card, CardMedia, useTheme } from '@mui/material';
import tmdbApi from '../../Context/tmdbApi';

const MovieDetails = ({ movieId }) => {
  const [movieDetails, setMovieDetails] = useState(null);
  const theme = useTheme();

  useEffect(() => {
    const fetchMovieDetails = async () => {
      const details = await tmdbApi.getMovieDetails(movieId);
      setMovieDetails(details);
    };

    if (movieId) {
      fetchMovieDetails();
    }
  }, [movieId]);

  if (!movieDetails) {
    return (
      <Box sx={{ padding: 4 }}>
        <Typography variant="h5" color="text.primary">Loading...</Typography>
      </Box>
    );
  }

  const releaseYear = movieDetails.release_date?.split('-')[0];
  const genres = movieDetails.genres?.map((genre) => genre.name).join(', ');
  const shortOverview = movieDetails.overview.split('. ').slice(0, 3).join('. ') + '.';
  const trailer = movieDetails.videos?.results.find((video) => video.type === 'Trailer' && video.site === 'YouTube');
  const otherVideos = movieDetails.videos?.results.filter((video) => video.site === 'YouTube' && video.type !== 'Trailer');

  const handleWatchMovie = () => {
    const movieUrl = `https://www.themoviedb.org/movie/${movieId}`;
    window.open(movieUrl, '_blank');
  };

  // Define conditional colors
  const titleColor = theme.palette.mode === 'light' ? '#333333' : '#FFD700';
  const linkColor = theme.palette.mode === 'light' ? '#6200ea' : '#FFD700'; // Purple in light mode, Yellow in dark mode

  return (
    <Box sx={{
      padding: 4,
      backgroundColor: theme.palette.mode === 'light' ? '#F5F5F5' : '#121212',
      color: theme.palette.mode === 'light' ? '#121212' : '#E9ECEF',
      minHeight: '100vh'
    }}>
      <Grid container spacing={4}>
        {/* POSTER */}
        <Grid item xs={12} md={6}>
          <Card sx={{ backgroundColor: theme.palette.mode === 'light' ? '#FFFFFF' : '#1E1E1E', borderRadius: 2 }}>
            <CardMedia
              component="img"
              image={`https://image.tmdb.org/t/p/w500/${movieDetails.poster_path}`}
              alt={movieDetails.title}
              sx={{ borderRadius: 2 }}
            />
          </Card>
        </Grid>

        {/* DETAILS */}
        <Grid item xs={12} md={6}>
          <Typography variant="h3" gutterBottom sx={{ color: titleColor }}>
            {movieDetails.title} ({releaseYear})
          </Typography>
          <Typography variant="subtitle1" gutterBottom color="text.secondary">
            Genres: {genres}
          </Typography>
          <Typography variant="body1" paragraph color="text.primary">
            {shortOverview}
          </Typography>

          <Box display="flex" alignItems="center" mb={2}>
            <Rating value={movieDetails.vote_average / 2} precision={0.5} readOnly />
            <Typography variant="body1" ml={1} color="text.secondary">
              ({movieDetails.vote_average.toFixed(1)})
            </Typography>
          </Box>

          <Button
            variant="contained"
            onClick={handleWatchMovie}
            sx={{
              textTransform: 'none',
              borderRadius: 2,
              backgroundColor: '#FFD700',
              color: '#121212',
              '&:hover': {
                backgroundColor: 'rgb(239, 220, 116)',
                color: '#121212',
              }
            }}
          >
            Watch Movie
          </Button>

          {trailer && (
            <Box mt={4}>
              <Typography variant="h5" gutterBottom color="text.primary">Trailer</Typography>
              <Box
                component="iframe"
                width="100%"
                height="300"
                src={`https://www.youtube.com/embed/${trailer.key}`}
                title="Trailer"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                sx={{ borderRadius: 2 }}
              />
            </Box>
          )}

          {otherVideos && otherVideos.length > 0 && (
            <Box mt={4}>
              <Typography variant="h6" gutterBottom color="text.primary">Other Videos</Typography>
              <ul style={{ paddingLeft: 20 }}>
                {otherVideos.map((video) => (
                  <li key={video.id}>
                    <a
                      href={`https://www.youtube.com/watch?v=${video.key}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        color: linkColor, // Purple or Yellow depending on mode
                        textDecoration: 'none'
                      }}
                    >
                      {video.name}
                    </a>
                  </li>
                ))}
              </ul>
            </Box>
          )}

          <Box mt={4}>
            <Typography variant="h6" gutterBottom color="text.primary">User Reviews</Typography>
            <Typography variant="body2" color="text.secondary" paragraph>
              ⭐ "Fantastic movie with great storytelling and visuals!"
            </Typography>
            <Typography variant="body2" color="text.secondary" paragraph>
              ⭐ "I loved the performances. A must-watch!"
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default MovieDetails;
