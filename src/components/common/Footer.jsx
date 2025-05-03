// src/components/common/Footer.jsx
import React from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Link, 
  Divider, 
  Grid, 
  IconButton, 
  useTheme, 
  useMediaQuery 
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import GitHubIcon from '@mui/icons-material/GitHub';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

const Footer = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const currentYear = new Date().getFullYear();
  
  const footerSections = [
    {
      title: 'Features',
      links: [
        { name: 'Body Doubling', path: '/features/body-doubling' },
        { name: 'Micro-Goals', path: '/features/micro-goals' },
        { name: 'Focus Timer', path: '/features/focus-timer' },
        { name: 'Progress Tracking', path: '/features/progress-tracking' }
      ]
    },
    {
      title: 'Resources',
      links: [
        { name: 'Blog', path: '/blog' },
        { name: 'Tips & Guides', path: '/guides' },
        { name: 'ADHD Resources', path: '/resources' },
        { name: 'Support', path: '/support' }
      ]
    },
    {
      title: 'Company',
      links: [
        { name: 'About Us', path: '/about' },
        { name: 'Contact', path: '/contact' },
        { name: 'Privacy Policy', path: '/privacy' },
        { name: 'Terms of Service', path: '/terms' }
      ]
    }
  ];
  
  return (
    <Box 
      component="footer" 
      sx={{ 
        py: 6, 
        px: 2, 
        mt: 'auto',
        backgroundColor: theme.palette.mode === 'light' ? theme.palette.grey[100] : theme.palette.grey[900]
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {/* Logo and Tagline */}
          <Grid item xs={12} md={4}>
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
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              Your friendly AI accountability buddy for better focus and productivity.
            </Typography>
            
            {/* Social Links */}
            <Box sx={{ display: 'flex', gap: 1 }}>
              <IconButton 
                component="a" 
                href="https://github.com/yourusername/focusjuju" 
                target="_blank" 
                rel="noopener noreferrer"
                aria-label="GitHub"
                size="small"
              >
                <GitHubIcon fontSize="small" />
              </IconButton>
              <IconButton 
                component="a" 
                href="https://twitter.com/focusjuju" 
                target="_blank" 
                rel="noopener noreferrer"
                aria-label="Twitter"
                size="small"
              >
                <TwitterIcon fontSize="small" />
              </IconButton>
              <IconButton 
                component="a" 
                href="https://linkedin.com/company/focusjuju" 
                target="_blank" 
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                size="small"
              >
                <LinkedInIcon fontSize="small" />
              </IconButton>
            </Box>
          </Grid>
          
          {/* Footer Sections */}
          {footerSections.map((section) => (
            <Grid item xs={6} md={2} sm={4} key={section.title}>
              <Typography 
                variant="subtitle2" 
                color="text.primary" 
                sx={{ mb: 2, fontWeight: 'bold' }}
              >
                {section.title}
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                {section.links.map((link) => (
                  <Link 
                    key={link.name} 
                    component={RouterLink} 
                    to={link.path} 
                    color="text.secondary"
                    underline="hover"
                    sx={{ 
                      fontSize: '0.875rem',
                      '&:hover': {
                        color: 'primary.main'
                      }
                    }}
                  >
                    {link.name}
                  </Link>
                ))}
              </Box>
            </Grid>
          ))}
          
          {/* Newsletter Signup - Future feature */}
          <Grid item xs={12} md={2}>
            <Typography 
              variant="subtitle2" 
              color="text.primary" 
              sx={{ mb: 2, fontWeight: 'bold' }}
            >
              Stay Updated
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
              Subscribe to our newsletter for productivity tips and updates!
            </Typography>
            <Link 
              component={RouterLink} 
              to="/subscribe" 
              color="primary"
              underline="hover"
              sx={{ 
                fontWeight: 'medium',
                fontSize: '0.875rem'
              }}
            >
              Subscribe →
            </Link>
          </Grid>
        </Grid>
        
        <Divider sx={{ my: 4 }} />
        
        {/* Bottom Section */}
        <Box 
          sx={{ 
            display: 'flex', 
            flexDirection: isMobile ? 'column' : 'row',
            justifyContent: 'space-between',
            alignItems: isMobile ? 'center' : 'flex-start',
            gap: 2
          }}
        >
          <Typography variant="body2" color="text.secondary" align={isMobile ? 'center' : 'left'}>
            © {currentYear} FocusJuju. All rights reserved.
          </Typography>
          
          <Box sx={{ display: 'flex', gap: 3 }}>
            <Link 
              component={RouterLink} 
              to="/privacy" 
              color="text.secondary"
              underline="hover"
              sx={{ fontSize: '0.75rem' }}
            >
              Privacy Policy
            </Link>
            <Link 
              component={RouterLink} 
              to="/terms" 
              color="text.secondary"
              underline="hover"
              sx={{ fontSize: '0.75rem' }}
            >
              Terms of Use
            </Link>
            <Link 
              component={RouterLink} 
              to="/cookies" 
              color="text.secondary"
              underline="hover"
              sx={{ fontSize: '0.75rem' }}
            >
              Cookies
            </Link>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;