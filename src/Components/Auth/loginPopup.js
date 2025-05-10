// src/Components/Auth/LoginPopup.js
import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, TextField, Button, IconButton, Typography, Box, Link } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useTheme } from '@mui/material/styles';

const LoginPopup = ({ open, onClose, onLogin, onOpenSignup }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const theme = useTheme(); // 🎨 access theme colors

  const handleLogin = () => {
    onLogin(username, password);
    onClose();
  };

  const isDark = theme.palette.mode === 'dark';

  return (
    <Dialog
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          borderRadius: 4,
          p: 2,
          width: '400px',
          maxWidth: '90vw',
          bgcolor: isDark ? '#1E1E1E' : '#E9ECEF', // 🎨 background color
          color: isDark ? '#F8F9FA' : '#121212' // 🎨 text color
        }
      }}
    >
      <DialogTitle
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          fontWeight: 'bold',
          color: isDark ? '#F8F9FA' : '#121212'
        }}
      >
        Login
        <IconButton
          onClick={onClose}
          size="small"
          sx={{
            color: isDark ? '#F8F9FA' : '#121212',
            '&:hover': { color: '#6E44FF' } // 🎨 accent color on hover
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <TextField
            label="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            fullWidth
            variant="outlined"
            sx={{
              '& .MuiOutlinedInput-root': {
                '& fieldset': { borderColor: isDark ? '#6E44FF' : '#6E44FF' },
                '&:hover fieldset': { borderColor: '#00D1D1' },
                '&.Mui-focused fieldset': { borderColor: '#00D1D1' },
              },
              input: { color: isDark ? '#F8F9FA' : '#121212' },
              label: { color: isDark ? '#F8F9FA' : '#121212' }
            }}
          />
          <TextField
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
            variant="outlined"
            sx={{
              '& .MuiOutlinedInput-root': {
                '& fieldset': { borderColor: isDark ? '#6E44FF' : '#6E44FF' },
                '&:hover fieldset': { borderColor: '#00D1D1' },
                '&.Mui-focused fieldset': { borderColor: '#00D1D1' },
              },
              input: { color: isDark ? '#F8F9FA' : '#121212' },
              label: { color: isDark ? '#F8F9FA' : '#121212' }
            }}
          />
          <Button
            variant="contained"
            onClick={handleLogin}
            sx={{
              backgroundColor: '#6E44FF', // 🎨 accent color
              color: '#F8F9FA',
              fontWeight: 'bold',
              mt: 1,
              '&:hover': { backgroundColor: '#00D1D1' }, // 🎨 secondary accent on hover
              borderRadius: 3
            }}
          >
            Login
          </Button>

          <Typography variant="body2" sx={{ mt: 1, textAlign: 'center', color: isDark ? '#F8F9FA' : '#121212' }}>
            Don't have an account?{' '}
            <Link
              component="button"
              onClick={() => { onClose(); onOpenSignup(); }}
              sx={{
                color: '#6E44FF',
                fontWeight: 'bold',
                '&:hover': { color: '#00D1D1' }
              }}
            >
              Sign up
            </Link>
          </Typography>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default LoginPopup;
