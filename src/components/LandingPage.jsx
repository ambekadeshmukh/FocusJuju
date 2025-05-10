// Updated src/components/LandingPage.jsx with demo section
import React, { useEffect, useState } from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Button, 
  Grid,
  Card, 
  CardContent, 
  Paper,
  Divider,
  useTheme,
  useMediaQuery,
  Tab,
  Tabs
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import RobotAvatar from './avatar/RobotAvatar';
import BodyDoublingDemo from './demo/BodyDoublingDemo';

// Icons
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import PsychologyIcon from '@mui/icons-material/Psychology';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt';
import ShowChartIcon from '@mui/icons-material/ShowChart';
import ChatIcon from '@mui/icons-material/Chat';
import WeekendIcon from '@mui/icons-material/Weekend';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

const MotionBox = motion(Box);
const MotionGrid = motion(Grid);
const MotionTypography = motion(Typography);
const MotionCard = motion(Card);

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
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

const fadeInVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { 
      duration: 0.8
    }
  }
};

// Animated section component
const AnimatedSection = ({ children }) => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    threshold: 0.2,
    triggerOnce: true
  });

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);

  return (
    <MotionBox
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={containerVariants}
    >
      {children}
    </MotionBox>
  );
};

const LandingPage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const isSmall = useMediaQuery(theme.breakpoints.down('sm'));
  const navigate = useNavigate();
  const [showDemo, setShowDemo] = useState(false);
  
  const features = [
    {
      icon: <PsychologyIcon fontSize="large" color="primary" />,
      title: "Emotionally Intelligent",
      description: "Juju senses your mood and adapts its support for personalized help when you need it most."
    },
    {
      icon: <AccessTimeIcon fontSize="large" color="primary" />,
      title: "Flexible Scheduling",
      description: "Different session types adapt to your energy level and focus capacity for optimal productivity."
    },
    {
      icon: <TaskAltIcon fontSize="large" color="primary" />,
      title: "Micro-Goal Setting",
      description: "Break overwhelming tasks into achievable 15-30 minute chunks to build momentum and progress."
    },
    {
      icon: <SentimentSatisfiedAltIcon fontSize="large" color="primary" />,
      title: "Gentle Encouragement",
      description: "Supportive nudges based on your preference: serious, funny, friendly, or motivational."
    },
    {
      icon: <ShowChartIcon fontSize="large" color="primary" />,
      title: "Progress Tracking",
      description: "Visualize your growth with simple charts showing your focus streaks and achievements."
    },
    {
      icon: <ChatIcon fontSize="large" color="primary" />,
      title: "Conversational Support",
      description: "Chat naturally when you're stuck - Juju offers help to get you back on track."
    },
    {
      icon: <WeekendIcon fontSize="large" color="primary" />,
      title: "Weekend Mode",
      description: "Different support patterns for workdays vs. weekends to maintain work-life balance."
    }
  ];
  
  const benefits = [
    "Overcome procrastination with gentle accountability",
    "Reduce anxiety about getting started with step-by-step guidance",
    "Find a compassionate companion for tough work sessions",
    "Build consistent focus habits that last",
    "Transform overwhelming projects into manageable pieces",
    "Track your progress with non-judgmental feedback"
  ];
  
  return (
    <Box>
      {/* Hero Section */}
      <Box sx={{ 
        backgroundColor: theme.palette.primary.light, 
        pt: { xs: 6, md: 10 }, 
        pb: { xs: 6, md: 8 },
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Background subtle pattern */}
        <Box sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          opacity: 0.05,
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%23000000' fill-opacity='0.1' fill-rule='evenodd'/%3E%3C/svg%3E")`,
        }}
      />
        
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
                    fontSize: { xs: '2.5rem', md: '3.5rem' }
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
                <Box sx={{ 
                  display: 'flex', 
                  gap: 2,
                  flexDirection: { xs: 'column', sm: 'row' }
                }}>
                  <Button 
                    variant="contained" 
                    size="large" 
                    onClick={() => navigate('/signup')}
                    sx={{ px: 4, py: 1.5 }}
                  >
                    Get Started Free
                  </Button>
                  <Button 
                    variant="outlined" 
                    size="large" 
                    onClick={() => setShowDemo(true)}
                    sx={{ px: 4, py: 1.5 }}
                  >
                    Try Demo
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
                      boxShadow: 2,
                      display: { xs: 'none', sm: 'block' }
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
                      boxShadow: 2,
                      display: { xs: 'none', sm: 'block' }
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
      
      {/* Demo Section */}
      {showDemo && (
        <Container maxWidth="lg" sx={{ py: 4 }}>
          <Box sx={{ textAlign: 'center', mb: 4 }}>
            <Typography variant="h4" component="h2" fontWeight="bold">
              Try It Now
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Experience how FocusJuju helps you stay focused with this interactive demo
            </Typography>
          </Box>
          
          <BodyDoublingDemo />
          
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
            <Button 
              variant="outlined" 
              onClick={() => setShowDemo(false)}
              sx={{ mr: 2 }}
            >
              Hide Demo
            </Button>
            <Button 
              variant="contained" 
              onClick={() => navigate('/signup')}
            >
              Sign Up for Full Experience
            </Button>
          </Box>
        </Container>
      )}
      
      {/* How It Works Section */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <AnimatedSection>
          <Box sx={{ textAlign: 'center', mb: 6 }}>
            <MotionTypography 
              variant="h3" 
              component="h2" 
              sx={{ mb: 2, fontWeight: 'bold' }}
              variants={itemVariants}
            >
              How FocusJuju Works
            </MotionTypography>
            <MotionTypography 
              variant="body1" 
              color="text.secondary" 
              sx={{ maxWidth: 700, mx: 'auto' }}
              variants={itemVariants}
            >
              FocusJuju combines AI body doubling, emotional intelligence, and smart task management
              to create a personalized productivity experience.
            </MotionTypography>
          </Box>
          
          <MotionGrid container spacing={4} variants={containerVariants}>
            <Grid item xs={12} md={4}>
              <MotionCard 
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
                variants={itemVariants}
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
              </MotionCard>
            </Grid>
            
            <Grid item xs={12} md={4}>
              <MotionCard 
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
                variants={itemVariants}
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
              </MotionCard>
            </Grid>
            
            <Grid item xs={12} md={4}>
              <MotionCard 
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
                variants={itemVariants}
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
              </MotionCard>
            </Grid>
          </MotionGrid>
        </AnimatedSection>
      </Container>
      
      {/* Features Section */}
      <Box sx={{ backgroundColor: theme.palette.background.default, py: 8 }}>
        <Container maxWidth="lg">
          <AnimatedSection>
            <Box sx={{ textAlign: 'center', mb: 6 }}>
              <MotionTypography 
                variant="h3" 
                component="h2" 
                sx={{ mb: 2, fontWeight: 'bold' }}
                variants={itemVariants}
              >
                Key Features
              </MotionTypography>
              <MotionTypography 
                variant="body1" 
                color="text.secondary" 
                sx={{ maxWidth: 700, mx: 'auto' }}
                variants={itemVariants}
              >
                FocusJuju combines all these powerful features to create a personalized productivity experience.
              </MotionTypography>
            </Box>
            
            <MotionGrid container spacing={4} variants={containerVariants}>
              {features.map((feature, index) => (
                <Grid item xs={12} sm={6} md={4} key={index}>
                  <MotionBox
                    variants={itemVariants}
                    sx={{ 
                      display: 'flex', 
                      flexDirection: 'column',
                      alignItems: 'center',
                      textAlign: 'center',
                      p: 3
                    }}
                  >
                    <Box sx={{ mb: 2 }}>
                      {feature.icon}
                    </Box>
                    <Typography variant="h6" gutterBottom>
                      {feature.title}
                    </Typography>
                    <Typography color="text.secondary">
                      {feature.description}
                    </Typography>
                  </MotionBox>
                </Grid>
              ))}
            </MotionGrid>
          </AnimatedSection>
        </Container>
      </Box>
      
      {/* Body Doubling Section */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <AnimatedSection>
          <Grid container spacing={6} alignItems="center">
            <Grid item xs={12} md={6}>
              <MotionBox variants={itemVariants}>
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
                <Box component="ul" sx={{ mb: 4, pl: 2 }}>
                  <Typography component="li" variant="body1" sx={{ mb: 1 }}>
                    Sits with you during work sessions
                  </Typography>
                  <Typography component="li" variant="body1" sx={{ mb: 1 }}>
                    Sends encouraging messages at intervals
                  </Typography>
                  <Typography component="li" variant="body1" sx={{ mb: 1 }}>
                    Offers help when you get stuck
                  </Typography>
                  <Typography component="li" variant="body1">
                    Celebrates your progress with mini rewards
                  </Typography>
                </Box>
                {!showDemo && (
                  <Button 
                    variant="contained" 
                    size="large" 
                    sx={{ mt: 2 }}
                    onClick={() => setShowDemo(true)}
                  >
                    Try Demo Now
                  </Button>
                )}
              </MotionBox>
            </Grid>
            <Grid item xs={12} md={6}>
              <MotionBox variants={itemVariants}>
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
                        zIndex: 2,
                        display: { xs: 'none', sm: 'block' }
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
        </AnimatedSection>
      </Container>
      
      {/* Benefits Section */}
      <Box sx={{ 
        backgroundColor: theme.palette.primary.light, 
        py: 8
      }}>
        <Container maxWidth="lg">
          <AnimatedSection>
            <Grid container spacing={4} alignItems="center">
              <Grid item xs={12} md={6}>
                <MotionBox variants={itemVariants}>
                  <Box sx={{ 
                    position: 'relative',
                    background: 'white',
                    borderRadius: 4,
                    p: 2,
                    boxShadow: 3,
                    maxWidth: 450,
                    mx: 'auto'
                  }}>
                    <MotionBox
                      animate={{ 
                        scale: [1, 1.03, 1],
                      }}
                      transition={{ 
                        duration: 5,
                        repeat: Infinity,
                        repeatType: 'reverse'
                      }}
                    >
                      <Box 
                        component="img"
                        src="/images/dashboard-mockup.png"
                        alt="FocusJuju Dashboard"
                        sx={{
                          width: '100%',
                          height: 'auto',
                          borderRadius: 2,
                          display: 'block',
                        }}
                      />
                    </MotionBox>
                  </Box>
                </MotionBox>
              </Grid>
              <Grid item xs={12} md={6}>
                <MotionBox variants={itemVariants}>
                  <Typography variant="h3" component="h2" sx={{ mb: 3, fontWeight: 'bold' }}>
                    Perfect for ADHD and Focus Challenges
                  </Typography>
                  <Typography variant="body1" sx={{ mb: 4 }}>
                    FocusJuju was designed with neurodiversity in mind. Our approach helps people who struggle with:
                  </Typography>
                  <Box component="ul" sx={{ mb: 4, pl: 2 }}>
                    {benefits.map((benefit, index) => (
                      <Typography key={index} component="li" variant="body1" sx={{ mb: 1 }}>
                        {benefit}
                      </Typography>
                    ))}
                  </Box>
                </MotionBox>
              </Grid>
            </Grid>
          </AnimatedSection>
        </Container>
      </Box>
      
      {/* CTA Section */}
      <Box sx={{ 
        backgroundColor: theme.palette.primary.main, 
        color: 'white',
        py: 8
      }}>
        <Container maxWidth="md">
          <AnimatedSection>
            <Box sx={{ textAlign: 'center' }}>
              <MotionTypography 
                variant="h3" 
                component="h2" 
                sx={{ mb: 3, fontWeight: 'bold' }}
                variants={itemVariants}
              >
                Ready to Boost Your Focus?
              </MotionTypography>
              <MotionTypography 
                variant="h6" 
                sx={{ mb: 4, maxWidth: 700, mx: 'auto', opacity: 0.9 }}
                variants={itemVariants}
              >
                Join thousands of people who are using FocusJuju to overcome procrastination and increase productivity.
              </MotionTypography>
              <MotionBox variants={itemVariants}>
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
              </MotionBox>
            </Box>
          </AnimatedSection>
        </Container>
      </Box>
      
      {/* FAQ Section */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <AnimatedSection>
          <Box sx={{ textAlign: 'center', mb: 6 }}>
            <MotionTypography 
              variant="h3" 
              component="h2" 
              sx={{ mb: 2, fontWeight: 'bold' }}
              variants={itemVariants}
            >
              Frequently Asked Questions
            </MotionTypography>
          </Box>
          
          <MotionGrid container spacing={4} variants={containerVariants}>
            <Grid item xs={12} md={6}>
              <MotionBox variants={itemVariants}>
                <Box sx={{ mb: 3 }}>
                  <Typography variant="h6" gutterBottom>
                    What is "body doubling"?
                  </Typography>
                  <Typography variant="body1">
                    Body doubling is a productivity technique where another person is present during your work session. 
                    Their presence creates accountability and reduces isolation. FocusJuju provides an AI companion that 
                    serves as your virtual body double.
                  </Typography>
                </Box>
                
                <Box sx={{ mb: 3 }}>
                  <Typography variant="h6" gutterBottom>
                    How does FocusJuju help with ADHD?
                  </Typography>
                  <Typography variant="body1">
                    FocusJuju addresses common ADHD challenges by providing external accountability, breaking down overwhelming 
                    tasks into manageable pieces, offering timely encouragement, and creating structured work sessions — all 
                    in a non-judgmental, supportive environment.
                  </Typography>
                </Box>
                
                <Box sx={{ mb: 3 }}>
                  <Typography variant="h6" gutterBottom>
                    Is FocusJuju free to use?
                  </Typography>
                  <Typography variant="body1">
                    Yes! FocusJuju is completely free to use. It's an open-source project created to help people improve 
                    their focus and productivity, especially those with ADHD or focus challenges.
                  </Typography>
                </Box>
              </MotionBox>
            </Grid>
            
            <Grid item xs={12} md={6}>
              <MotionBox variants={itemVariants}>
                <Box sx={{ mb: 3 }}>
                  <Typography variant="h6" gutterBottom>
                    How is my data used?
                  </Typography>
                  <Typography variant="body1">
                    FocusJuju respects your privacy. Your data is stored securely in Firebase and is only used to provide 
                    you with a personalized experience. We never sell your data or share it with third parties.
                  </Typography>
                </Box>
                
                <Box sx={{ mb: 3 }}>
                  <Typography variant="h6" gutterBottom>
                    Can I customize how Juju interacts with me?
                  </Typography>
                  <Typography variant="body1">
                    Absolutely! You can choose between friendly, serious, funny, or motivational communication styles. 
                    You can also adjust session durations, encouragement frequency, and other settings to match your 
                    preferences.
                  </Typography>
                </Box>
                
                <Box sx={{ mb: 3 }}>
                  <Typography variant="h6" gutterBottom>
                    Does FocusJuju work offline?
                  </Typography>
                  <Typography variant="body1">
                    Currently, FocusJuju requires an internet connection to function, as it uses Firebase for authentication 
                    and data storage. However, we're exploring options for offline functionality in future updates.
                  </Typography>
                </Box>
              </MotionBox>
            </Grid>
          </MotionGrid>
        </AnimatedSection>
      </Container>
      
      {/* Testimonials Section */}
      <Box sx={{ backgroundColor: theme.palette.background.default, py: 8 }}>
        <Container maxWidth="lg">
          <AnimatedSection>
            <Box sx={{ textAlign: 'center', mb: 6 }}>
              <MotionTypography 
                variant="h3" 
                component="h2" 
                sx={{ mb: 2, fontWeight: 'bold' }}
                variants={itemVariants}
              >
                What Users Are Saying
              </MotionTypography>
            </Box>
            
            <MotionGrid container spacing={4} variants={containerVariants}>
              <Grid item xs={12} md={4}>
                <MotionBox variants={itemVariants}>
                  <Paper 
                    elevation={2} 
                    sx={{ 
                      p: 3, 
                      borderRadius: 4, 
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column'
                    }}
                  >
                    <Typography variant="body1" sx={{ mb: 2, flex: 1 }}>
                      "FocusJuju helped me finally finish my thesis. The body doubling feature gave me the accountability 
                      I needed without the anxiety of having someone watch over my shoulder."
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Box 
                        sx={{ 
                          width: 50, 
                          height: 50, 
                          borderRadius: '50%', 
                          backgroundColor: theme.palette.primary.light,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontWeight: 'bold',
                          mr: 2
                        }}
                      >
                        JD
                      </Box>
                      <Box>
                        <Typography variant="subtitle2" fontWeight="bold">
                          Jamie D.
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Grad Student
                        </Typography>
                      </Box>
                    </Box>
                  </Paper>
                </MotionBox>
              </Grid>
              
              <Grid item xs={12} md={4}>
                <MotionBox variants={itemVariants}>
                  <Paper 
                    elevation={2} 
                    sx={{ 
                      p: 3, 
                      borderRadius: 4, 
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column'
                    }}
                  >
                    <Typography variant="body1" sx={{ mb: 2, flex: 1 }}>
                      "As someone with ADHD, breaking tasks down has always been hard for me. The micro-goal 
                      setting feature is a game changer. Now I can actually start projects without feeling overwhelmed."
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Box 
                        sx={{ 
                          width: 50, 
                          height: 50, 
                          borderRadius: '50%', 
                          backgroundColor: theme.palette.secondary.light,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontWeight: 'bold',
                          mr: 2
                        }}
                      >
                        SM
                      </Box>
                      <Box>
                        <Typography variant="subtitle2" fontWeight="bold">
                          Sam M.
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          UX Designer
                        </Typography>
                      </Box>
                    </Box>
                  </Paper>
                </MotionBox>
              </Grid>
              
              <Grid item xs={12} md={4}>
                <MotionBox variants={itemVariants}>
                  <Paper 
                    elevation={2} 
                    sx={{ 
                      p: 3, 
                      borderRadius: 4, 
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column'
                    }}
                  >
                    <Typography variant="body1" sx={{ mb: 2, flex: 1 }}>
                      "I've tried dozens of productivity apps, but FocusJuju is different. The AI companion feels 
                      genuinely supportive rather than judgmental. It's like having a work buddy who's always positive."
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Box 
                        sx={{ 
                          width: 50, 
                          height: 50, 
                          borderRadius: '50%', 
                          backgroundColor: theme.palette.primary.light,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontWeight: 'bold',
                          mr: 2
                        }}
                      >
                        AJ
                      </Box>
                      <Box>
                        <Typography variant="subtitle2" fontWeight="bold">
                          Alex J.
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Freelance Writer
                        </Typography>
                      </Box>
                    </Box>
                  </Paper>
                </MotionBox>
              </Grid>
            </MotionGrid>
          </AnimatedSection>
        </Container>
      </Box>
      
      {/* Final CTA Section */}
      <Box sx={{ 
        py: 10,
        position: 'relative',
        overflow: 'hidden',
        backgroundColor: theme.palette.primary.dark,
        color: 'white'
      }}>
        {/* Background pattern */}
        <Box 
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            opacity: 0.1,
            backgroundImage: `radial-gradient(circle, ${theme.palette.primary.light} 1px, transparent 1px)`,
            backgroundSize: '20px 20px',
          }}
        />
        
        <Container maxWidth="md">
          <AnimatedSection>
            <Box sx={{ textAlign: 'center' }}>
              <MotionBox 
                variants={itemVariants}
                sx={{ display: 'flex', justifyContent: 'center', mb: 4 }}
              >
                <RobotAvatar mood="encouraging" size={120} />
              </MotionBox>
              
              <MotionTypography 
                variant="h3" 
                component="h2" 
                sx={{ mb: 3, fontWeight: 'bold' }}
                variants={itemVariants}
              >
                Start Focusing Better Today
              </MotionTypography>
              
              <MotionTypography 
                variant="h6" 
                sx={{ mb: 4, maxWidth: 700, mx: 'auto', opacity: 0.9 }}
                variants={itemVariants}
              >
                Your AI accountability buddy is ready to help you tackle your tasks with confidence and focus.
              </MotionTypography>
              
              <MotionBox variants={itemVariants}>
                <Button 
                  variant="contained" 
                  size="large" 
                  sx={{ 
                    px: 4, 
                    py: 1.5, 
                    backgroundColor: 'white', 
                    color: theme.palette.primary.dark,
                    '&:hover': {
                      backgroundColor: theme.palette.grey[100]
                    }
                  }}
                  onClick={() => navigate('/signup')}
                >
                  Create Free Account
                </Button>
              </MotionBox>
            </Box>
          </AnimatedSection>
        </Container>
      </Box>
    </Box>
  );
};

export default LandingPage;