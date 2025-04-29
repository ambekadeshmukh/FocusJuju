// src/theme.js
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#A8D1E7', // Light blue (Ice Bear inspired)
      light: '#D1E8F2',
      dark: '#7BABC5',
    },
    secondary: {
      main: '#9DE0AD', // Mint green for positive reinforcement
      light: '#C9F0D2',
      dark: '#6EB382',
    },
    background: {
      default: '#F8F9FA', // Clean white
      paper: '#FFFFFF',
    },
    text: {
      primary: '#2A6D82', // Deep teal for contrast
      secondary: '#5A7D89',
    },
    error: {
      main: '#FF8A80', // Soft red for errors
    },
    warning: {
      main: '#FFD180', // Soft orange for warnings
    },
    info: {
      main: '#80D8FF', // Light blue for info
    },
    success: {
      main: '#B9F6CA', // Light green for success
    },
  },
  typography: {
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    h1: {
      fontFamily: "'Nunito', sans-serif",
      fontWeight: 700,
    },
    h2: {
      fontFamily: "'Nunito', sans-serif",
      fontWeight: 700,
    },
    h3: {
      fontFamily: "'Nunito', sans-serif",
      fontWeight: 600,
    },
    h4: {
      fontFamily: "'Nunito', sans-serif",
      fontWeight: 600,
    },
    h5: {
      fontFamily: "'Nunito', sans-serif",
      fontWeight: 600,
    },
    h6: {
      fontFamily: "'Nunito', sans-serif",
      fontWeight: 600,
    },
    button: {
      fontWeight: 500,
      textTransform: 'none',
    },
  },
  shape: {
    borderRadius: 12,
  },
  shadows: [
    'none',
    '0px 2px 4px rgba(0, 0, 0, 0.05)',
    '0px 4px 8px rgba(0, 0, 0, 0.05)',
    '0px 6px 12px rgba(0, 0, 0, 0.08)',
    // ... more shadow definitions
  ],
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 25,
          padding: '8px 20px',
        },
        contained: {
          boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          boxShadow: '0px 6px 16px rgba(0, 0, 0, 0.08)',
        },
      },
    },
  },
});

export default theme;