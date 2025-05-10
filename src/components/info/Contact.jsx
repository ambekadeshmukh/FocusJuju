// src/components/info/Contact.jsx
import React, { useState } from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Paper,
  TextField,
  Button,
  Grid,
  Breadcrumbs,
  Link,
  Snackbar,
  Alert,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  useTheme
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import EmailIcon from '@mui/icons-material/Email';
import GitHubIcon from '@mui/icons-material/GitHub';
import TwitterIcon from '@mui/icons-material/Twitter';
import RobotAvatar from '../avatar/RobotAvatar';

const Contact = () => {
  const theme = useTheme();
  
  // Form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    reason: ''
  });
  
  // Feedback state
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success'
  });
  
  // Form validation
  const [errors, setErrors] = useState({});
  
  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when field is edited
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };
  
  // Validate form
  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required';
    }
    
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    }
    
    if (!formData.reason) {
      newErrors.reason = 'Please select a reason for contact';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      // Here would be the actual form submission logic to a backend
      console.log('Form submitted:', formData);
      
      // Show success message
      setSnackbar({
        open: true,
        message: 'Your message has been sent! We\'ll get back to you soon.',
        severity: 'success'
      });
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
        reason: ''
      });
    }
  };
  
  // Close snackbar
  const handleCloseSnackbar = () => {
    setSnackbar(prev => ({
      ...prev,
      open: false
    }));
  };
  
  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 4 }}>
        <Link color="inherit" component={RouterLink} to="/">
          Home
        </Link>
        <Typography color="text.primary">Contact Us</Typography>
      </Breadcrumbs>
      
      <Grid container spacing={6}>
        {/* Contact Info Side */}
        <Grid item xs={12} md={5}>
          <Typography variant="h4" component="h1" gutterBottom>
            Get in Touch
          </Typography>
          <Typography variant="body1" paragraph>
            Have questions, feedback, or just want to say hello? We'd love to hear from you! Fill out the form and we'll get back to you as soon as possible.
          </Typography>
          
          <Paper 
            elevation={2} 
            sx={{ 
              p: 3, 
              borderRadius: 2, 
              mb: 4,
              backgroundColor: theme.palette.primary.light,
              color: theme.palette.primary.contrastText
            }}
          >
            <Box sx={{ display: 'flex', mb: 2 }}>
              <EmailIcon sx={{ mr: 2 }} />
              <Typography variant="body1">
                <Link 
                  href="mailto:hello@focusjuju.com" 
                  sx={{ color: 'inherit', textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}
                >
                  hello@focusjuju.com
                </Link>
              </Typography>
            </Box>
            
            <Box sx={{ display: 'flex', mb: 2 }}>
              <GitHubIcon sx={{ mr: 2 }} />
              <Typography variant="body1">
                <Link 
                  href="https://github.com/focusjuju/focusjuju" 
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{ color: 'inherit', textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}
                >
                  @focusjuju
                </Link>
              </Typography>
            </Box>
            
            <Box sx={{ display: 'flex' }}>
              <TwitterIcon sx={{ mr: 2 }} />
              <Typography variant="body1">
                <Link 
                  href="https://twitter.com/focusjuju" 
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{ color: 'inherit', textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}
                >
                  @focusjuju
                </Link>
              </Typography>
            </Box>
          </Paper>
          
          <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
            <RobotAvatar mood="happy" size={120} />
          </Box>
          
          <Typography variant="body2" sx={{ textAlign: 'center', fontStyle: 'italic' }}>
            "We're always looking for ways to improve! Your feedback helps us make FocusJuju better for everyone."
          </Typography>
        </Grid>
        
        {/* Contact Form Side */}
        <Grid item xs={12} md={7}>
          <Paper elevation={2} sx={{ p: 4, borderRadius: 2 }}>
            <Typography variant="h5" gutterBottom>
              Send Us a Message
            </Typography>
            
            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    id="name"
                    label="Your Name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    error={!!errors.name}
                    helperText={errors.name}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    error={!!errors.email}
                    helperText={errors.email}
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControl fullWidth required error={!!errors.reason}>
                    <InputLabel id="reason-label">Reason for Contact</InputLabel>
                    <Select
                      labelId="reason-label"
                      id="reason"
                      name="reason"
                      value={formData.reason}
                      onChange={handleChange}
                      label="Reason for Contact"
                    >
                      <MenuItem value="general">General Inquiry</MenuItem>
                      <MenuItem value="support">Support Help</MenuItem>
                      <MenuItem value="feature">Feature Request</MenuItem>
                      <MenuItem value="bug">Bug Report</MenuItem>
                      <MenuItem value="feedback">Feedback</MenuItem>
                      <MenuItem value="other">Other</MenuItem>
                    </Select>
                    {errors.reason && (
                      <Typography variant="caption" color="error" sx={{ mt: 0.5, ml: 1.5 }}>
                        {errors.reason}
                      </Typography>
                    )}
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="subject"
                    label="Subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    error={!!errors.subject}
                    helperText={errors.subject}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="message"
                    label="Message"
                    name="message"
                    multiline
                    rows={6}
                    value={formData.message}
                    onChange={handleChange}
                    error={!!errors.message}
                    helperText={errors.message}
                  />
                </Grid>
              </Grid>
              
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3 }}
                size="large"
              >
                Send Message
              </Button>
            </Box>
          </Paper>
        </Grid>
      </Grid>
      
      {/* FAQ Link */}
      <Box sx={{ textAlign: 'center', mt: 8 }}>
        <Typography variant="body1">
          Looking for answers to common questions?
        </Typography>
        <Button 
          component={RouterLink}
          to="/faq"
          variant="outlined"
          sx={{ mt: 2 }}
        >
          View our FAQ
        </Button>
      </Box>
      
      {/* Snackbar for form submission feedback */}
      <Snackbar open={snackbar.open} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default Contact;