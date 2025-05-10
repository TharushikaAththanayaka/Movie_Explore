import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Button,
  TextField,
  Modal,
  InputAdornment,
  IconButton
} from '@mui/material';
import Link from '@mui/material/Link';
import PersonIcon from '@mui/icons-material/Person';
import LockIcon from '@mui/icons-material/Lock';
import EmailIcon from '@mui/icons-material/Email';
import CloseIcon from '@mui/icons-material/Close'; // Added Close Icon
import { useNavigate } from 'react-router-dom';

// Replace with your image imports
import bg1 from '../Img/film-4591329_1280.jpg';
import bg2 from '../Img/istockphoto-1492206283-612x612.jpg';
import bg3 from '../Img/istockphoto-1937002588-612x612.jpg';
import bg4 from '../Img/ticket-2974645_1280.jpg';

const backgroundImages = [bg1, bg2, bg3, bg4];

const inputStyles = {
  input: { color: '#FFD700' },
  label: { color: '#FFD700' },
  mb: 2,
  '& .MuiOutlinedInput-root': {
    borderRadius: '12px',
    backgroundColor: '#1A1A1A',
    '& fieldset': { borderColor: '#FFD700' },
    '&:hover fieldset': { borderColor: '#FFA500' },
    '&.Mui-focused fieldset': { borderColor: '#FFA500' }
  },
  '& .MuiInputLabel-root': { color: '#FFD700' },
  '& .MuiInputLabel-root.Mui-focused': { color: '#FFA500' }
};

const LoginPage = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [openLogin, setOpenLogin] = useState(false);
  const [openSignup, setOpenSignup] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [signupUsername, setSignupUsername] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === backgroundImages.length - 1 ? 0 : prevIndex + 1
      );
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  const handleLogin = () => {
    console.log('Logged in:', username, password);
    setOpenLogin(false);
    navigate('/movies');
  };

  const handleSignup = () => {
    console.log('Signed up:', signupUsername, signupEmail, signupPassword);
    setOpenSignup(false);
    navigate('/movies');
  };

  return (
    <>
      <Box
        sx={{
          backgroundImage: `url(${backgroundImages[currentImageIndex]})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          transition: 'background-image 1s ease-in-out',
          height: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
          position: 'relative',
          '&::before': {
            content: '""',
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to bottom, rgba(0,0,0,0.6), rgba(0,0,0,0.9))',
            zIndex: 1
          },
          filter: (openLogin || openSignup) ? 'blur(5px)' : 'none' // Blur the background when modal is open
        }}
      >
        <Typography
          variant="h3"
          sx={{
            color: '#FFD700',
            textAlign: 'center',
            fontWeight: 500,
            lineHeight: 1.4,
            mb: 4,
            zIndex: 2,
            maxWidth: 700,
            px: 3
          }}
        >
          Step into the Magic of Movies — Explore the Best in Cinema, Stream the Latest Blockbusters, and Immerse Yourself in Unforgettable Stories. Your Next Favorite Movie Awaits!
        </Typography>

        <Box sx={{ display: 'flex', gap: 2, zIndex: 2 }}>
          <Button
            variant="contained"
            sx={{
              background: 'linear-gradient(45deg, #FFD700, #FFA500)',
              color: '#000000',
              px: 5,
              py: 1.5,
              borderRadius: '30px',
              fontWeight: 600,
              boxShadow: '0 0 20px rgba(255, 215, 0, 0.6)',
              textTransform: '0.1',
              '&:hover': {
                background: 'linear-gradient(45deg, #FFC300, #FF8C00)'
              }
            }}
            onClick={() => setOpenLogin(true)}
          >
            Login
          </Button>

          <Button
            variant="outlined"
            sx={{
              borderColor: '#FFD700',
              color: '#FFD700',
              px: 5,
              py: 1.5,
              borderRadius: '30px',
              fontWeight: 600,
              textTransform: '0.1',
              '&:hover': { borderColor: '#FFA500', color: '#FFA500' }
            }}
            onClick={() => setOpenSignup(true)}
          >
            Sign Up
          </Button>
        </Box>

        {/* LOGIN MODAL */}
        <Modal open={openLogin} onClose={() => setOpenLogin(false)} aria-labelledby="login-modal">
          <Box
            sx={{
              backgroundColor: '#000000',
              p: 5,
              borderRadius: 3,
              maxWidth: 420,
              mx: 'auto',
              mt: '20vh',
              boxShadow: '0 0 30px rgba(255, 215, 0, 0.6)',
              position: 'relative'
            }}
          >
            <IconButton
              sx={{
                position: 'absolute',
                top: 10,
                right: 10,
                color: '#FFD700',
                fontSize: 30
              }}
              onClick={() => setOpenLogin(false)}
            >
              <CloseIcon />
            </IconButton>

            <Typography id="login-modal" variant="h5" sx={{ color: '#FFD700', mb: 3, fontWeight: 500 }}>
              Welcome Back
            </Typography>

            <TextField
              label="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username"
              variant="outlined"
              fullWidth
              sx={inputStyles}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PersonIcon sx={{ color: '#FFD700' }} />
                  </InputAdornment>
                )
              }}
            />

            <TextField
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              variant="outlined"
              fullWidth
              sx={inputStyles}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockIcon sx={{ color: '#FFD700' }} />
                  </InputAdornment>
                )
              }}
            />

            <Button
              variant="contained"
              onClick={handleLogin}
              fullWidth
              sx={{
                background: 'linear-gradient(45deg, #FFD700, #FFA500)',
                color: '#000000',
                px: 4,
                py: 1.5,
                borderRadius: '30px',
                fontWeight: 600,
                mt: 2,
                boxShadow: '0 0 20px rgba(255, 215, 0, 0.6)',
                '&:hover': { background: 'linear-gradient(45deg, #FFC300, #FF8C00)' }
              }}
            >
              Login
            </Button>
          </Box>
        </Modal>

        {/* SIGNUP MODAL */}
        <Modal open={openSignup} onClose={() => setOpenSignup(false)} aria-labelledby="signup-modal">
          <Box
            sx={{
              backgroundColor: '#000000',
              p: 5,
              borderRadius: 3,
              maxWidth: 420,
              mx: 'auto',
              mt: '20vh',
              boxShadow: '0 0 30px rgba(255, 215, 0, 0.6)',
              position: 'relative'
            }}
          >
            <IconButton
              sx={{
                position: 'absolute',
                top: 10,
                right: 10,
                color: '#FFD700',
                fontSize: 30
              }}
              onClick={() => setOpenSignup(false)}
            >
              <CloseIcon />
            </IconButton>

            <Typography id="signup-modal" variant="h5" sx={{ color: '#FFD700', mb: 3, fontWeight: 500 }}>
              Create Account
            </Typography>

            <TextField
              label="Username"
              value={signupUsername}
              onChange={(e) => setSignupUsername(e.target.value)}
              placeholder="Username"
              variant="outlined"
              fullWidth
              sx={inputStyles}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PersonIcon sx={{ color: '#FFD700' }} />
                  </InputAdornment>
                )
              }}
            />

            <TextField
              label="Email"
              value={signupEmail}
              onChange={(e) => setSignupEmail(e.target.value)}
              placeholder="Email"
              variant="outlined"
              fullWidth
              sx={inputStyles}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <EmailIcon sx={{ color: '#FFD700' }} />
                  </InputAdornment>
                )
              }}
            />

            <TextField
              label="Password"
              type="password"
              value={signupPassword}
              onChange={(e) => setSignupPassword(e.target.value)}
              placeholder="Password"
              variant="outlined"
              fullWidth
              sx={inputStyles}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockIcon sx={{ color: '#FFD700' }} />
                  </InputAdornment>
                )
              }}
            />

            <Button
              variant="contained"
              onClick={handleSignup}
              fullWidth
              sx={{
                background: 'linear-gradient(45deg, #FFD700, #FFA500)',
                color: '#000000',
                px: 4,
                py: 1.5,
                borderRadius: '30px',
                fontWeight: 600,
                mt: 2,
                boxShadow: '0 0 20px rgba(255, 215, 0, 0.6)',
                '&:hover': { background: 'linear-gradient(45deg, #FFC300, #FF8C00)' }
              }}
            >
              Sign Up
            </Button>
          </Box>
        </Modal>
      </Box>
    </>
  );
};

export default LoginPage;
