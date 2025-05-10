// src/components/auth/SignUp.jsx
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
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  IconButton,
  InputAdornment,
  Container,
  Stepper,
  Step,
  StepLabel,
  CircularProgress,
  FormHelperText,
  Divider
} from '@mui/material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
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

const SignUp = () => {
  // State for form fields
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [messageStyle, setMessageStyle] = useState('friendly');
  const [sessionDuration, setSessionDuration] = useState(25);
  const [weekendMode, setWeekendMode] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(true);
  
  // UI state
  const [activeStep, setActiveStep] = useState(0);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});
  
  const { signUp, authError, setAuthError } = useAuth();
  const navigate = useNavigate();
  
  // Clear any previous auth errors when component mounts
  useEffect(() => {
    if (setAuthError) {
      setAuthError('');
    }
  }, [setAuthError]);
  
  // Steps for the signup process
  const steps = ['Account Details', 'Personalize Experience'];
  
  // Validate account details
  const validateAccountDetails = () => {
    const errors = {};
    
    if (!name.trim()) {
      errors.name = 'Name is required';
    }
    
    if (!email.trim()) {
      errors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errors.email = 'Please enter a valid email address';
    }
    
    if (!password) {
      errors.password = 'Password is required';
    } else if (password.length < 6) {
      errors.password = 'Password must be at least 6 characters';
    }
    
    if (password !== confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
    }
    
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };
  
  // Handle next step
  const handleNext = () => {
    if (activeStep === 0) {
      if (validateAccountDetails()) {
        setActiveStep((prevStep) => prevStep + 1);
      }
    } else {
      handleSignUp();
    }
  };
  
  // Handle back step
  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };
  
  // Handle sign up submission
  const handleSignUp = async () => {
    if (!validateAccountDetails()) {
      setActiveStep(0);
      return;
    }
    
    setLoading(true);
    
    try {
      const preferences = {
        messageStyle,
        sessionDuration,
        weekendMode,
        soundEnabled
      };
      
      const success = await signUp(email, password, name, preferences);
      
      if (success) {
        console.log("Sign up successful, redirecting to dashboard");
        navigate('/dashboard');
      } else {
        // If signUp returns false but doesn't set an error, set a generic one
        if (!authError) {
          setAuthError('Failed to create an account. Please try again.');
        }
        setLoading(false);
      }
    } catch (error) {
      console.error('Unexpected error during sign up:', error);
      setAuthError('An unexpected error occurred. Please try again.');
      setLoading(false);
    }
  };
  
  // Toggle password visibility
  const handleTogglePasswordVisibility = (field) => {
    if (field === 'password') {
      setShowPassword((prev) => !prev);
    } else {
      setShowConfirmPassword((prev) => !prev);
    }
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
  
  // Render account details step
  const renderAccountDetails = () => (
    <>
      <TextField
        margin="normal"
        required
        fullWidth
        id="name"
        label="Your Name"
        name="name"
        autoFocus
        value={name}
        onChange={(e) => handleInputChange(e, setName)}
        error={!!validationErrors.name}
        helperText={validationErrors.name}
      />
      
      <TextField
        margin="normal"
        required
        fullWidth
        id="email"
        label="Email Address"
        name="email"
        autoComplete="email"
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
        value={password}
        onChange={(e) => handleInputChange(e, setPassword)}
        error={!!validationErrors.password}
        helperText={validationErrors.password}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={() => handleTogglePasswordVisibility('password')}
                edge="end"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
      
      <TextField
        margin="normal"
        required
        fullWidth
        name="confirmPassword"
        label="Confirm Password"
        type={showConfirmPassword ? 'text' : 'password'}
        id="confirmPassword"
        value={confirmPassword}
        onChange={(e) => handleInputChange(e, setConfirmPassword)}
        error={!!validationErrors.confirmPassword}
        helperText={validationErrors.confirmPassword}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle confirm password visibility"
                onClick={() => handleTogglePasswordVisibility('confirm')}
                edge="end"
              >
                {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
    </>
  );
  
  // Render preferences step
  const renderPreferences = () => (
    <>
      <Box sx={{ mb: 3 }}>
        <Typography variant="subtitle1" gutterBottom>
          Personalize your experience with FocusJuju
        </Typography>
        <Typography variant="body2" color="text.secondary">
          You can always change these settings later.
        </Typography>
      </Box>
      
      <FormControl fullWidth margin="normal">
        <InputLabel id="message-style-label">Message Style</InputLabel>
        <Select
          labelId="message-style-label"
          id="messageStyle"
          value={messageStyle}
          label="Message Style"
          onChange={(e) => setMessageStyle(e.target.value)}
        >
          <MenuItem value="friendly">Friendly & Supportive</MenuItem>
          <MenuItem value="serious">Professional & Serious</MenuItem>
          <MenuItem value="funny">Humorous & Light</MenuItem>
          <MenuItem value="motivational">Energetic & Motivational</MenuItem>
        </Select>
        <FormHelperText>
          How should Juju communicate with you during focus sessions?
        </FormHelperText>
      </FormControl>
      
      <FormControl fullWidth margin="normal">
        <InputLabel id="session-duration-label">Default Session Duration</InputLabel>
        <Select
          labelId="session-duration-label"
          id="sessionDuration"
          value={sessionDuration}
          label="Default Session Duration"
          onChange={(e) => setSessionDuration(e.target.value)}
        >
          <MenuItem value={15}>15 minutes</MenuItem>
          <MenuItem value={25}>25 minutes</MenuItem>
          <MenuItem value={50}>50 minutes</MenuItem>
          <MenuItem value={90}>90 minutes</MenuItem>
        </Select>
        <FormHelperText>
          How long should your default focus sessions be?
        </FormHelperText>
      </FormControl>
      
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
        <FormControl component="fieldset">
          <Typography variant="body2">Weekend Mode</Typography>
          <Select
            size="small"
            value={weekendMode ? 'enabled' : 'disabled'}
            onChange={(e) => setWeekendMode(e.target.value === 'enabled')}
            sx={{ mt: 1, minWidth: 120 }}
          >
            <MenuItem value="enabled">Enabled</MenuItem>
            <MenuItem value="disabled">Disabled</MenuItem>
          </Select>
          <FormHelperText>
            Different approach for weekends
          </FormHelperText>
        </FormControl>
        
        <FormControl component="fieldset">
          <Typography variant="body2">Sound Effects</Typography>
          <Select
            size="small"
            value={soundEnabled ? 'enabled' : 'disabled'}
            onChange={(e) => setSoundEnabled(e.target.value === 'enabled')}
            sx={{ mt: 1, minWidth: 120 }}
          >
            <MenuItem value="enabled">Enabled</MenuItem>
            <MenuItem value="disabled">Disabled</MenuItem>
          </Select>
          <FormHelperText>
            Notification sounds
          </FormHelperText>
        </FormControl>
      </Box>
    </>
  );

  return (
    <Grid container component="main" sx={{ height: '100vh' }}>
      <Grid
        item
        xs={false}
        sm={4}
        md={7}
        sx={{
          backgroundImage: 'url(https://source.unsplash.com/random?focus)',
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
                my: 6,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              {/* You can add RobotAvatar here when available */}
              <Typography component="h1" variant="h4" sx={{ mt: 2 }}>
                Join FocusJuju
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
                Your AI accountability buddy is waiting to help you focus
              </Typography>
              
              <Stepper activeStep={activeStep} sx={{ width: '100%', mb: 4 }}>
                {steps.map((label) => (
                  <Step key={label}>
                    <StepLabel>{label}</StepLabel>
                  </Step>
                ))}
              </Stepper>
              
              {authError && (
                <Alert severity="error" sx={{ width: '100%', mb: 2 }}>
                  {authError}
                </Alert>
              )}
              
              <Box component="form" noValidate sx={{ mt: 1, width: '100%' }}>
                {activeStep === 0 ? renderAccountDetails() : renderPreferences()}
                
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
                  <Button
                    onClick={handleBack}
                    disabled={activeStep === 0 || loading}
                  >
                    Back
                  </Button>
                  <Button
                    variant="contained"
                    onClick={handleNext}
                    disabled={loading}
                  >
                    {loading ? (
                      <CircularProgress size={24} />
                    ) : activeStep === steps.length - 1 ? (
                      'Create Account'
                    ) : (
                      'Next'
                    )}
                  </Button>
                </Box>
                
                <Box sx={{ mt: 4, textAlign: 'center' }}>
                  <Typography variant="body2">
                    Already have an account?{' '}
                    <Link component={RouterLink} to="/signin" variant="body2">
                      Sign In
                    </Link>
                  </Typography>
                </Box>
              </Box>
            </Box>
          </motion.div>
        </Container>
      </Grid>
    </Grid>
  );
};

export default SignUp;