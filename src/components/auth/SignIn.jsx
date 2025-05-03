// src/components/auth/SignIn.jsx
import React, { useState, useEffect } from 'react';
import { 
  Button, 
  TextField, 
  Typography, 
  Paper, 
  Box, 
  Grid, 
  Link,
  Alert,
  IconButton,
  InputAdornment,
  Container,
  Divider,
  CircularProgress,
  FormHelperText
} from '@mui/material';
import { Link as RouterLink, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { motion } from 'framer-motion';

// Animation variants
const formVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { 
      type: 'spring',
      stiffness: 100,
      damping: 15
    }
  }
};

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});
  
  const { signIn, authError, setAuthError } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  
  // Get redirect URL from location state
  const from = location.state?.from?.pathname || '/dashboard';
  
  // Clear any previous auth errors when component mounts
  useEffect(() => {
    if (setAuthError) {
      setAuthError('');
    }
  }, [setAuthError]);
  
  // Check if email has a valid format
  const isEmailValid = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };
  
  // Validate form inputs
  const validateForm = () => {
    const errors = {};
    
    if (!email.trim()) {
      errors.email = 'Email is required';
    } else if (!isEmailValid(email)) {
      errors.email = 'Please enter a valid email address';
    }
    
    if (!password) {
      errors.password = 'Password is required';
    } else if (password.length < 6) {
      errors.password = 'Password must be at least 6 characters';
    }
    
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };
  
  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate form
    if (!validateForm()) {
      return;
    }
    
    setLoading(true);
    
    try {
      const success = await signIn(email, password);
      
      if (success) {
        // Save email in local storage if remember me is checked
        if (rememberMe) {
          localStorage.setItem('rememberedEmail', email);
        } else {
          localStorage.removeItem('rememberedEmail');
        }
        
        // Redirect to dashboard or previous page
        navigate(from, { replace: true });
      }
    } catch (error) {
      console.error('Unexpected error during sign in:', error);
    } finally {
      setLoading(false);
    }
  };
  
  // Toggle password visibility
  const handleTogglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };
  
  // Handle input change
  const handleInputChange = (e, setter) => {
    setter(e.target.value);
    
    // Clear validation error for this field
    if (validationErrors[e.target.name]) {
      setValidationErrors(prev => ({
        ...prev,
        [e.target.name]: ''
      }));
    }
    
    // Clear auth error when user starts typing
    if (authError && setAuthError) {
      setAuthError('');
    }
  };
  
  return (
    <Grid container component="main" sx={{ height: '100vh' }}>
      <Grid
        item
        xs={false}
        sm={4}
        md={7}
        sx={{
          backgroundImage: 'url(https://source.unsplash.com/random?productivity)',
          backgroundRepeat: 'no-repeat',
          backgroundColor: (t) => t.palette.primary.light,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <Container maxWidth="sm">
          <motion.div
            variants={formVariants}
            initial="hidden"
            animate="visible"
          >
            <Box
              sx={{
                my: 8,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              {/* You can add RobotAvatar here when available */}
              <Typography component="h1" variant="h4" sx={{ mt: 2 }}>
                Welcome Back!
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
                Sign in to continue with FocusJuju
              </Typography>
              
              {authError && (
                <Alert severity="error" sx={{ width: '100%', mb: 2 }}>
                  {authError}
                </Alert>
              )}
              
              <Box component="form" noValidate onSubmit={handleSubmit} sx={{ width: '100%' }}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  autoFocus
                  value={email}
                  onChange={(e) => handleInputChange(e, setEmail)}
                  error={!!validationErrors.email}
                  helperText={validationErrors.email}
                />
                
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => handleInputChange(e, setPassword)}
                  error={!!validationErrors.password}
                  helperText={validationErrors.password}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleTogglePasswordVisibility}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
                
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', my: 2 }}>
                  <FormHelperText
                    component={Link}
                    href="/forgot-password"
                    sx={{ 
                      textDecoration: 'none',
                      cursor: 'pointer',
                      color: 'primary.main'
                    }}
                  >
                    Forgot password?
                  </FormHelperText>
                </Box>
                
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 2, mb: 2, py: 1.5 }}
                  disabled={loading}
                >
                  {loading ? <CircularProgress size={24} /> : 'Sign In'}
                </Button>
                
                <Divider sx={{ my: 3 }}>
                  <Typography variant="body2" color="text.secondary">
                    OR
                  </Typography>
                </Divider>
                
                <Box sx={{ textAlign: 'center' }}>
                  <Typography variant="body2" sx={{ mb: 1 }}>
                    Don't have an account?
                  </Typography>
                  <Button
                    component={RouterLink}
                    to="/signup"
                    variant="outlined"
                    fullWidth
                    sx={{ py: 1.5 }}
                  >
                    Create Account
                  </Button>
                </Box>
              </Box>
            </Box>
          </motion.div>
        </Container>
      </Grid>
    </Grid>
  );
};

export default SignIn;