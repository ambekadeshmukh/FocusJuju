// src/components/common/Loading.jsx
import React from 'react';
import { Box, CircularProgress, Typography, useTheme } from '@mui/material';
import { motion } from 'framer-motion';

const MotionBox = motion(Box);

const Loading = ({ message = "Loading..." }) => {
  const theme = useTheme();
  
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        backgroundColor: theme.palette.background.default
      }}
    >
      <MotionBox
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <CircularProgress size={60} thickness={4} />
      </MotionBox>
      
      <MotionBox
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <Typography variant="h6" sx={{ mt: 3, color: theme.palette.text.secondary }}>
          {message}
        </Typography>
      </MotionBox>
    </Box>
  );
};

export default Loading;