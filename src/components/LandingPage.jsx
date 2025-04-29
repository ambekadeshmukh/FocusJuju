// src/components/LandingPage.jsx
import React from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Button, 
  Grid, 
  Card, 
  CardContent, 
  CardMedia,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
  Divider,
  useTheme
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import RobotAvatar from './avatar/RobotAvatar';

// Icons
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import PsychologyIcon from '@mui/icons-material/Psychology';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt';
import ShowChartIcon from '@mui/icons-material/ShowChart';
import ChatIcon from '@mui/icons-material/Chat';
import WeekendIcon from '@mui/icons-material/Weekend';

const MotionBox = motion(Box);

const LandingPage = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  
  const features = [
    {
      icon: <PsychologyIcon fontSize="large" color="primary" />,
      title: "Emotionally Intelligent",
      description: "Juju can sense your mood through short questions and adapts its support accordingly."
    },
    {
      icon: <AccessTimeIcon fontSize="large" color="primary" />,
      title: "Flexible Scheduling",
      description: "Sessions adapt based on how you feel, not just rigid timers."
    },
    {
      icon: <TaskAltIcon fontSize="large" color="primary" />,
      title: "Micro-Goal Setting",
      description: "Break down overwhelming tasks into bite-sized, achievable chunks."
    },
    {
      icon: <SentimentSatisfiedAltIcon fontSize="large" color="primary" />,
      title: "Gentle Encouragement",
      description: "Supportive nudges based on your preference: serious, funny, or friendly."
    },
    {
      icon: <ShowChartIcon fontSize="large" color="primary" />,
      title: "Progress Tracking",
      description: "See your growth with non-intimidating charts showing your small wins."
    },
    {
      icon: <ChatIcon fontSize="large" color="primary" />,
      title: "Conversational Support",
      description: "Chat naturally when you're stuck - Juju offers helpful options to keep moving."
    },
    {
      icon: <WeekendIcon fontSize="large" color="primary" />,
      title: "Weekend Mode",
      description: "Recognizes different energy patterns on weekends vs. workdays."
    }
  ];
  
  return (
    <Box>
      {/* Hero Section */}
      <Box sx={{ 
        backgroundColor: theme.palette.primary.light, 
        pt: 10, 
        pb: 8
      }}>
        <Container maxWidth="lg">
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <MotionBox
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <Typography 
                  variant="h2" 
                  component="h1" 
                  sx={{ 
                    fontWeight: 'bold',
                    mb: 2,
                    fontFamily: "'Nunito', sans-serif",
                  }}
                >
                  Meet FocusJuju
                </Typography>
                <Typography 
                  variant="h5" 
                  component="h2" 
                  color="text.secondary"
                  sx={{ mb: 3 }}
                >
                  Your AI Accountability Buddy for Better Focus
                </Typography>
                <Typography 
                  variant="body1" 
                  sx={{ mb: 4, fontSize: '1.1rem' }}
                >
                  FocusJuju helps you stay focused and productive with AI-powered body doubling, 
                  emotional intelligence, and smart task breakdown - all without the pressure of 
                  a real human watching.
                </Typography>
                <Box sx={{ display: 'flex', gap: 2 }}>
                  <Button 
                    variant="contained" 
                    size="large" 
                    onClick={() => navigate('/signup')}
                  >
                    Get Started Free
                  </Button>
                  <Button 
                    variant="outlined" 
                    size="large" 
                    onClick={() => navigate('/signin')}
                  >
                    Sign In
                  </Button>
                </Box>
              </MotionBox>
            </Grid>
            <Grid item xs={12} md={6}>
              <MotionBox
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                sx={{ display: 'flex', justifyContent: 'center' }}
              >
                <Box sx={{ position: 'relative' }}>
                  <Paper
                    elevation={4}
                    sx={{
                      p: 4,
                      borderRadius: 4,
                      backgroundColor: 'white',
                      width: { xs: 280, sm: 350 },
                      height: { xs: 280, sm: 350 },
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    <RobotAvatar mood="happy" size={150} />
                    <Typography variant="h6" sx={{ mt: 3, textAlign: 'center' }}>
                      "Ready to focus together?"
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mt: 1, textAlign: 'center' }}>
                      I'll be your virtual accountability buddy!
                    </Typography>
                  </Paper>
                  
                  {/* Animated elements around the avatar */}
                  <MotionBox
                    animate={{ 
                      y: [0, -10, 0],
                      opacity: [0.7, 1, 0.7]
                    }}
                    transition={{ 
                      duration: 3,
                      repeat: Infinity,
                      repeatType: 'reverse'
                    }}
                    sx={{
                      position: 'absolute',
                      top: -20,
                      right: -10,
                      backgroundColor: theme.palette.secondary.light,
                      borderRadius: 2,
                      p: 1.5,
                      boxShadow: 2
                    }}
                  >
                    <Typography variant="body2" fontWeight="bold">
                      You're doing great! 👏
                    </Typography>
                  </MotionBox>
                  
                  <MotionBox
                    animate={{ 
                      y: [0, 8, 0],
                      opacity: [0.7, 1, 0.7]
                    }}
                    transition={{ 
                      duration: 4,
                      delay: 1,
                      repeat: Infinity,
                      repeatType: 'reverse'
                    }}
                    sx={{
                      position: 'absolute',
                      bottom: -10,
                      left: -10,
                      backgroundColor: theme.palette.primary.light,
                      borderRadius: 2,
                      p: 1.5,
                      boxShadow: 2
                    }}
                  >
                    <Typography variant="body2" fontWeight="bold">
                      25:00 ⏱️ Focus Time
                    </Typography>
                  </MotionBox>
                </Box>
              </MotionBox>
            </Grid>
          </Grid>
        </Container>
      </Box>
      
      {/* How It Works Section */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography variant="h3" component="h2" sx={{ mb: 2, fontWeight: 'bold' }}>
            How FocusJuju Works
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 700, mx: 'auto' }}>
            FocusJuju combines AI body doubling, emotional intelligence, and smart task management
            to create a personalized productivity experience.
          </Typography>
        </Box>
        
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Card 
              sx={{ 
                height: '100%', 
                display: 'flex', 
                flexDirection: 'column',
                transition: '0.3s',
                '&:hover': { 
                  transform: 'translateY(-5px)',
                  boxShadow: 5
                }
              }}
            >
              <Box sx={{ 
                backgroundColor: '#F0F7FF', 
                p: 3, 
                display: 'flex', 
                justifyContent: 'center' 
              }}>
                <Box sx={{ position: 'relative' }}>
                  <RobotAvatar mood="focused" size={100} />
                  <Typography 
                    variant="caption" 
                    sx={{ 
                      position: 'absolute', 
                      top: 0, 
                      right: -20,
                      backgroundColor: theme.palette.primary.main,
                      color: 'white',
                      borderRadius: 5,
                      px: 1.5,
                      py: 0.5
                    }}
                  >
                    Step 1
                  </Typography>
                </Box>
              </Box>
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography gutterBottom variant="h5" component="h3" sx={{ fontWeight: 'bold' }}>
                  Check In
                </Typography>
                <Typography>
                  Start with a quick mood check-in. FocusJuju adapts its approach based on how you're feeling today.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          
          <Grid item xs={12} md={4}>
            <Card 
              sx={{ 
                height: '100%', 
                display: 'flex', 
                flexDirection: 'column',
                transition: '0.3s',
                '&:hover': { 
                  transform: 'translateY(-5px)',
                  boxShadow: 5
                }
              }}
            >
              <Box sx={{ 
                backgroundColor: '#F0FFF5', 
                p: 3, 
                display: 'flex', 
                justifyContent: 'center' 
              }}>
                <Box sx={{ position: 'relative' }}>
                  <RobotAvatar mood="thinking" size={100} />
                  <Typography 
                    variant="caption" 
                    sx={{ 
                      position: 'absolute', 
                      top: 0, 
                      right: -20,
                      backgroundColor: theme.palette.secondary.main,
                      color: 'white',
                      borderRadius: 5,
                      px: 1.5,
                      py: 0.5
                    }}
                  >
                    Step 2
                  </Typography>
                </Box>
              </Box>
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography gutterBottom variant="h5" component="h3" sx={{ fontWeight: 'bold' }}>
                  Break It Down
                </Typography>
                <Typography>
                  Enter your big task, and Juju helps break it into manageable micro-goals that feel achievable.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          
          <Grid item xs={12} md={4}>
            <Card 
              sx={{ 
                height: '100%', 
                display: 'flex', 
                flexDirection: 'column',
                transition: '0.3s',
                '&:hover': { 
                  transform: 'translateY(-5px)',
                  boxShadow: 5
                }
              }}
            >
              <Box sx={{ 
                backgroundColor: '#FFF8F0', 
                p: 3, 
                display: 'flex', 
                justifyContent: 'center' 
              }}>
                <Box sx={{ position: 'relative' }}>
                  <RobotAvatar mood="encouraging" size={100} />
                  <Typography 
                    variant="caption" 
                    sx={{ 
                      position: 'absolute', 
                      top: 0, 
                      right: -20,
                      backgroundColor: '#F8A978',
                      color: 'white',
                      borderRadius: 5,
                      px: 1.5,
                      py: 0.5
                    }}
                  >
                    Step 3
                  </Typography>
                </Box>
              </Box>
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography gutterBottom variant="h5" component="h3" sx={{ fontWeight: 'bold' }}>
                  Focus Together
                </Typography>
                <Typography>
                  Start a focus session with your AI body double. Juju sits with you virtually, providing gentle encouragement.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
      
      {/* Features Section */}
      <Box sx={{ backgroundColor: theme.palette.background.default, py: 8 }}>
        <Container maxWidth="lg">
          <Box sx={{ textAlign: 'center', mb: 6 }}>
            <Typography variant="h3" component="h2" sx={{ mb: 2, fontWeight: 'bold' }}>
              Key Features
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 700, mx: 'auto' }}>
              FocusJuju combines all these powerful features to create a personalized productivity experience.
            </Typography>
          </Box>
          
          <Grid container spacing={4}>
            {features.map((feature, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <MotionBox
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Box sx={{ 
                    display: 'flex', 
                    flexDirection: 'column',
                    alignItems: 'center',
                    textAlign: 'center',
                    p: 3
                  }}>
                    <Box sx={{ mb: 2 }}>
                      {feature.icon}
                    </Box>
                    <Typography variant="h6" gutterBottom>
                      {feature.title}
                    </Typography>
                    <Typography color="text.secondary">
                      {feature.description}
                    </Typography>
                  </Box>
                </MotionBox>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
      
      {/* Body Doubling Section */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Grid container spacing={6} alignItems="center">
          <Grid item xs={12} md={6}>
            <MotionBox
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <Typography variant="h3" component="h2" sx={{ mb: 3, fontWeight: 'bold' }}>
                Virtual Body Doubling
              </Typography>
              <Typography variant="body1" sx={{ mb: 3 }}>
                Working alone can be challenging. "Body doubling" is when someone works alongside you,
                creating a sense of accountability without judgment.
              </Typography>
              <Typography variant="body1" sx={{ mb: 3 }}>
                FocusJuju reimagines this with AI - giving you a friendly virtual presence that:
              </Typography>
              <List>
                <ListItem disableGutters>
                  <ListItemIcon sx={{ minWidth: 40 }}>
                    <TaskAltIcon color="secondary" />
                  </ListItemIcon>
                  <ListItemText primary="Sits with you during work sessions" />
                </ListItem>
                <ListItem disableGutters>
                  <ListItemIcon sx={{ minWidth: 40 }}>
                    <TaskAltIcon color="secondary" />
                  </ListItemIcon>
                  <ListItemText primary="Sends encouraging messages at intervals" />
                </ListItem>
                <ListItem disableGutters>
                  <ListItemIcon sx={{ minWidth: 40 }}>
                    <TaskAltIcon color="secondary" />
                  </ListItemIcon>
                  <ListItemText primary="Offers help when you get stuck" />
                </ListItem>
                <ListItem disableGutters>
                  <ListItemIcon sx={{ minWidth: 40 }}>
                    <TaskAltIcon color="secondary" />
                  </ListItemIcon>
                  <ListItemText primary="Celebrates your progress with mini rewards" />
                </ListItem>
              </List>
              <Button 
                variant="contained" 
                size="large" 
                sx={{ mt: 2 }}
                onClick={() => navigate('/signup')}
              >
                Try Body Doubling
              </Button>
            </MotionBox>
          </Grid>
          <Grid item xs={12} md={6}>
            <MotionBox
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <Paper
                elevation={3}
                sx={{
                  p: 3,
                  borderRadius: 4,
                  backgroundColor: 'white',
                  overflow: 'hidden',
                  position: 'relative'
                }}
              >
                <Box sx={{ 
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  height: 8,
                  backgroundColor: theme.palette.primary.main
                }} />
                
                <Box sx={{ textAlign: 'center', mb: 2 }}>
                  <Typography variant="h4" fontWeight="bold">
                    25:00
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Focus Session
                  </Typography>
                </Box>
                
                <Box sx={{ 
                  display: 'flex', 
                  justifyContent: 'center', 
                  mb: 3,
                  position: 'relative'
                }}>
                  <RobotAvatar mood="focused" size={120} />
                  <MotionBox
                    animate={{ 
                      opacity: [0, 1, 0],
                      y: [10, 0, 10]
                    }}
                    transition={{ 
                      duration: 4,
                      repeat: Infinity
                    }}
                    sx={{
                      position: 'absolute',
                      top: -30,
                      px: 2,
                      py: 1,
                      borderRadius: 2,
                      backgroundColor: theme.palette.secondary.light,
                      zIndex: 2
                    }}
                  >
                    <Typography variant="body2" fontWeight="bold">
                      Still with you! Keep going! 🚀
                    </Typography>
                  </MotionBox>
                </Box>
                
                <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mb: 3 }}>
                  <Button variant="outlined" size="small" startIcon={<AccessTimeIcon />}>
                    Pause
                  </Button>
                  <Button variant="outlined" size="small" color="error">
                    End Session
                  </Button>
                </Box>
                
                <Box sx={{ 
                  display: 'flex', 
                  alignItems: 'center',
                  p: 2,
                  borderRadius: 2,
                  backgroundColor: theme.palette.grey[50]
                }}>
                  <Typography variant="body2" color="text.secondary" sx={{ flex: 1 }}>
                    Need help or feeling stuck? Chat with Juju!
                  </Typography>
                  <Button 
                    variant="contained" 
                    size="small" 
                    startIcon={<ChatIcon />}
                    sx={{ ml: 2 }}
                  >
                    Chat
                  </Button>
                </Box>
              </Paper>
            </MotionBox>
          </Grid>
        </Grid>
      </Container>
      
      {/* CTA Section */}
      <Box sx={{ 
        backgroundColor: theme.palette.primary.main, 
        color: 'white',
        py: 8
      }}>
        <Container maxWidth="md">
          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="h3" component="h2" sx={{ mb: 3, fontWeight: 'bold' }}>
              Ready to Boost Your Focus?
            </Typography>
            <Typography variant="h6" sx={{ mb: 4, maxWidth: 700, mx: 'auto', opacity: 0.9 }}>
              Join thousands of people who are using FocusJuju to overcome procrastination and increase productivity.
            </Typography>
            <Button 
              variant="contained" 
              size="large" 
              sx={{ 
                px: 4, 
                py: 1.5, 
                backgroundColor: 'white', 
                color: theme.palette.primary.main,
                '&:hover': {
                  backgroundColor: theme.palette.grey[100]
                }
              }}
              onClick={() => navigate('/signup')}
            >
              Get Started for Free
            </Button>
            <Typography variant="body2" sx={{ mt: 2, opacity: 0.8 }}>
              No credit card required. Free plan available.
            </Typography>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default LandingPage;