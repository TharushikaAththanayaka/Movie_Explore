// src/Components/Auth/SignupPopup.js
import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, TextField, Button, IconButton, Typography, Box } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const SignupPopup = ({ open, onClose, onSignup }) => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSignup = () => {
    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    onSignup({ email, username, password });
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          borderRadius: 4,
          p: 2,
          width: '400px', // increase width
          maxWidth: '90vw'
        }
      }}
    >
      <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        Sign Up
        <IconButton onClick={onClose} size="small">
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <TextField
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
          />
          <TextField
            label="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            fullWidth
          />
          <TextField
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
          />
          <TextField
            label="Confirm Password"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            fullWidth
          />

          <Button
            variant="contained"
            onClick={handleSignup}
            sx={{
              backgroundColor: '#ff5722',
              color: 'white',
              fontWeight: 'bold',
              mt: 1,
              '&:hover': { backgroundColor: '#e64a19' },
              borderRadius: 3
            }}
          >
            Create Account
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default SignupPopup;
