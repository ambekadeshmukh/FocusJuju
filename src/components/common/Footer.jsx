// src/components/common/Footer.jsx
import React from 'react';
import { Box, Container, Typography, Link, Divider, useTheme } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

const Footer = () => {
  const theme = useTheme();
  const year = new Date().getFullYear();
  
  return (
    <Box 
      component="footer" 
      sx={{ 
        py: 3, 
        px: 2, 
        mt: 'auto',
        backgroundColor: theme.palette.background.paper
      }}
    >
      <Divider sx={{ mb: 3 }} />
      <Container maxWidth="lg">
        <Box sx={{ 
          display: 'flex', 
          flexDirection: { xs: 'column', sm: 'row' },
          justifyContent: 'space-between',
          alignItems: { xs: 'center', sm: 'flex-start' }
        }}>
          <Box sx={{ mb: { xs: 2, sm: 0 }, textAlign: { xs: 'center', sm: 'left' } }}>
            <Typography 
              variant="h6" 
              component={RouterLink} 
              to="/"
              sx={{ 
                fontFamily: "'Nunito', sans-serif", 
                fontWeight: 700,
                textDecoration: 'none',
                color: 'text.primary',
                display: 'block',
                mb: 1
              }}
            >
              FocusJuju
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Your friendly AI accountability buddy
            </Typography>
          </Box>
          
          <Box sx={{ 
            display: 'flex', 
            flexDirection: { xs: 'column', sm: 'row' }, 
            gap: 3,
            textAlign: { xs: 'center', sm: 'left' }
          }}>
            <Box>
              <Typography variant="subtitle2" sx={{ mb: 1 }}>
                Resources
              </Typography>
              <Link component={RouterLink} to="/about" color="inherit" display="block" sx={{ mb: 0.5 }}>
                About
              </Link>
              <Link component={RouterLink} to="/blog" color="inherit" display="block" sx={{ mb: 0.5 }}>
                Blog
              </Link>
              <Link component={RouterLink} to="/help" color="inherit" display="block">
                Help Center
              </Link>
            </Box>
            
            <Box>
              <Typography variant="subtitle2" sx={{ mb: 1 }}>
                Legal
              </Typography>
              <Link component={RouterLink} to="/privacy" color="inherit" display="block" sx={{ mb: 0.5 }}>
                Privacy Policy
              </Link>
              <Link component={RouterLink} to="/terms" color="inherit" display="block">
                Terms of Service
              </Link>
            </Box>
          </Box>
        </Box>
        
        <Box sx={{ mt: 3, textAlign: 'center' }}>
          <Typography variant="body2" color="text.secondary">
            © {year} FocusJuju. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;