// src/App.js
import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom'; // ✅ removed BrowserRouter here
import { FavoritesProvider } from './Context/FavouriteContext'; // Import the provider
import NavBar from './Components/NavBar/NavBar2';
import HomePage from './Pages/loginPage';
import MoviePage from './Pages/MoviesPage';
import MovieDetailsPage from './Pages/MoviedetailsPage';
import FavouritesPage from './Pages/FavouritePage'; // New favourites page
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';

function App() {
  const [mode, setMode] = useState('light');

  const toggleMode = () => {
    setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
  };

  const theme = createTheme({
    palette: {
      mode: mode,
    },
  });

  return (
    <FavoritesProvider> {/* ✅ keep provider */}
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <NavBar mode={mode} toggleMode={toggleMode} />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/movies" element={<MoviePage />} />
          <Route path="/movies/:id" element={<MovieDetailsPage />} />
          <Route path="/favourites" element={<FavouritesPage />} /> {/* ✅ route */}
        </Routes>
      </ThemeProvider>
    </FavoritesProvider>
  );
}

export default App;
