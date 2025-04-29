// src/components/common/NotFound.jsx
import React from 'react';
import { Box, Container, Typography, Button, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import RobotAvatar from '../avatar/RobotAvatar';

const NotFound = () => {
  const navigate = useNavigate();
  
  return (
    <Container maxWidth="md">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '70vh',
          textAlign: 'center',
          py: 4
        }}
      >
        <Paper 
          elevation={3}
          sx={{
            p: 5,
            borderRadius: 4,
            maxWidth: 500
          }}
        >
          <RobotAvatar mood="thinking" size={120} />
          
          <Typography variant="h2" component="h1" fontWeight="bold" sx={{ mt: 3 }}>
            404
          </Typography>
          
          <Typography variant="h5" component="h2" sx={{ mt: 1, mb: 3 }}>
            Page Not Found
          </Typography>
          
          <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
            Oops! The page you're looking for seems to have wandered off. Let's get you back on track.
          </Typography>
          
          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
            <Button 
              variant="outlined" 
              onClick={() => navigate(-1)}
            >
              Go Back
            </Button>
            
            <Button 
              variant="contained" 
              onClick={() => navigate('/')}
            >
              Home Page
            </Button>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};

export default NotFound;