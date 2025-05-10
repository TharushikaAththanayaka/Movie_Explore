import React from 'react';
import {
  AppBar,
  Toolbar,
  Box,
  Typography,
  IconButton,
} from '@mui/material';
import {
  Brightness4 as MoonIcon,
  Brightness7 as SunIcon
} from '@mui/icons-material';
import { NavLink } from 'react-router-dom';
import logo from '../../Img/newlogo-removebg-preview.png';

export default function NavBar({ mode, toggleMode }) {
  const colors = {
    light: {
      accent: '#FFD700', // Gold accent
      secondaryAccent: '#000000', // Black for text and borders
      text: '#121212', // Dark text for light mode
      activeLink: '#808080', // Gray for active link in light mode
    },
    dark: {
      accent: '#FFD700', // Gold accent
      secondaryAccent: '#000000', // Black for text and borders
      text: '#F8F9FA', // Light text for dark mode
      activeLink: '#F8F9FA', // White for active link in dark mode
    },
  };

  const palette = colors[mode || 'light'];

  return (
    <AppBar
      position="static"
      sx={{
        bgcolor: '#1E1E1E', // Navbar background
        color: palette.text,
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
        padding: '0 20px',
      }}
    >
      <Toolbar sx={{ justifyContent: 'space-between', flexWrap: 'wrap', display: 'flex', alignItems: 'center' }}>
        {/* Logo + Title */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
          <img src={logo} alt="logo" style={{ height: 40 }} />
          <Typography variant="h6" fontWeight={700} sx={{ color: palette.accent }}>
            MovieExplorer
          </Typography>
        </Box>

        {/* Spacer */}
        <Box sx={{ flexGrow: 1 }} />

        {/* Navigation Links */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
          {[{ path: '/', label: 'Home' }, { path: '/movies', label: 'Movies' }, { path: '/favourites', label: 'Favourite' }].map(({ path, label }) => (
            <NavLink
              key={path}
              to={path}
              style={({ isActive }) => ({
                color: isActive ? palette.activeLink : palette.accent, // active: white/gray; inactive: gold
                textDecoration: isActive ? 'underline' : 'none',
                fontWeight: isActive ? 'bold' : 'normal',
                transition: 'all 0.3s',
                padding: '8px 16px',
              })}
            >
              {label}
            </NavLink>
          ))}

          {/* Mode Toggle (Gold icon color) */}
          <IconButton onClick={toggleMode} sx={{ color: palette.accent }}>
            {mode === 'light' ? <MoonIcon /> : <SunIcon />}
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
