// index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { ThemeProvider, CssBaseline } from '@mui/material';
import customTheme from './theme';
import { MovieProvider } from './Context/MovieContext'; // ✅ Import MovieProvider

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    {/* ✅ Only ONE BrowserRouter here */}
    <BrowserRouter>
      {/* MovieProvider wraps everything to provide movie context */}
      <MovieProvider>
        {/* ThemeProvider wraps the application to provide theme */}
        <ThemeProvider theme={customTheme}>
          {/* CssBaseline to normalize styles */}
          <CssBaseline />
          {/* Main app component */}
          <App />
        </ThemeProvider>
      </MovieProvider>
    </BrowserRouter>
  </React.StrictMode>
);
