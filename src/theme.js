import { createTheme } from '@mui/material/styles';

const customTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#FFD700', // Gold (buttons, highlights)
      light: '#FFF4BD', // Soft gold (hover effects)
      dark: '#B8860B',  // Dark gold (active states)
    },
    secondary: {
      main: '#000000', // Black (text, borders)
    },
    background: {
      default: '#121212', // True black (main BG)
      paper: '#1E1E1E',  // Slightly lighter (cards/navbar)
    },
    text: {
      primary: '#FFFFFF', // White (headings)
      secondary: '#FFD700', // Gold (subtext)
      disabled: '#5A5A5A',  // Gray (inactive elements)
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          fontWeight: 'bold',
          textTransform: 'none', // Disables ALL-CAPS
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderColor: '#FFD700', // Gold outline for input fields (like search bar)
          '&:hover': {
            borderColor: '#FFF4BD', // Light gold when hovered
          },
          '&.Mui-focused': {
            borderColor: '#FFD700', // Keep gold when focused
          },
        },
      },
    },
    MuiButtonBase: {
      styleOverrides: {
        root: {
          '&:hover': {
            backgroundColor: '#FFF4BD', // Gold on hover for buttons
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          fontWeight: 'bold',
          textTransform: 'none',
        },
        outlined: {
          borderColor: '#FFD700', // Gold border for outlined buttons
        },
        contained: {
          backgroundColor: '#FFD700', // Gold background for contained buttons
          color: '#121212', // Dark text for buttons
          '&:hover': {
            backgroundColor: '#FFF4BD', // Soft gold hover effect
          },
        },
      },
    },
  },
});

export default customTheme;
