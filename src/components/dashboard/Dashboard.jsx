// src/components/dashboard/Dashboard.jsx
import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Grid, 
  Typography, 
  Card, 
  CardContent,
  Button,
  Container,
  CircularProgress,
  Paper,
  useTheme,
  Alert,
  Snackbar
} from '@mui/material';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import RobotAvatar from '../avatar/RobotAvatar';
import MoodTracker from './MoodTracker';
import TaskList from './TaskList';
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import ProgressStats from './ProgressStats';
import QuickSessionButtons from './QuickSessionButtons';
import { collection, query, where, getDocs, orderBy, limit } from 'firebase/firestore';
import { db } from '../../firebase';
import { generatePersonalizedAdvice } from '../../services/aiService';

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

const Dashboard = () => {
  const theme = useTheme();
  const { currentUser, userProfile } = useAuth();
  const [loading, setLoading] = useState(true);
  const [tasks, setTasks] = useState([]);
  const [recentSessions, setRecentSessions] = useState([]);
  const [currentMood, setCurrentMood] = useState(null);
  const [personalizedAdvice, setPersonalizedAdvice] = useState(null);
  const [error, setError] = useState('');
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const navigate = useNavigate();
  
  // Load dashboard data
  useEffect(() => {
    const fetchDashboardData = async () => {
      if (!currentUser) return;
      
      try {
        // Fetch user's tasks
        const tasksQuery = query(
          collection(db, 'tasks'),
          where('userId', '==', currentUser.uid),
          where('completed', '==', false),
          where('isPartOfLargerTask', '==', false),
          orderBy('createdAt', 'desc'),
          limit(10)
        );
        
        const tasksSnapshot = await getDocs(tasksQuery);
        const tasksList = tasksSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setTasks(tasksList);
        
        // Fetch recent sessions
        const sessionsQuery = query(
          collection(db, 'sessions'),
          where('userId', '==', currentUser.uid),
          orderBy('startTime', 'desc'),
          limit(20)
        );
        
        const sessionsSnapshot = await getDocs(sessionsQuery);
        const sessionsList = sessionsSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setRecentSessions(sessionsList);
        
        // Get personalized advice based on mood and sessions
        if (userProfile?.currentMood) {
          setCurrentMood(userProfile.currentMood.mood);
          const advice = await generatePersonalizedAdvice(userProfile, sessionsList);
          setPersonalizedAdvice(advice);
        }
        
        setLoading(false);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
        setError("Failed to load dashboard data. Please refresh to try again.");
        setLoading(false);
      }
    };
    
    fetchDashboardData();
  }, [currentUser, userProfile]);
  
  // Refresh dashboard data when mood is updated
  const handleMoodChange = async (mood) => {
    setCurrentMood(mood);
    
    try {
      // Get updated advice based on new mood
      const updatedUserProfile = {
        ...userProfile,
        currentMood: {
          ...userProfile?.currentMood,
          mood
        }
      };
      
      const advice = await generatePersonalizedAdvice(updatedUserProfile, recentSessions);
      setPersonalizedAdvice(advice);
      
      setShowSnackbar(true);
      setSnackbarMessage('Mood updated and recommendations refreshed');
    } catch (error) {
      console.error("Error refreshing advice:", error);
    }
  };
  
  // Start session
  const startSession = (type) => {
    navigate(`/session/new?type=${type}`);
  };
  
  // Get time-based greeting
  const getTimeBasedGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 18) return "Good Afternoon";
    return "Good Evening";
  };
  
  // Determine robot mood based on user mood
  const getRobotMood = () => {
    if (!currentMood) return 'idle';
    if (currentMood >= 4) return 'happy';
    if (currentMood <= 2) return 'encouraging';
    return 'focused';
  };
  
  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <CircularProgress />
      </Box>
    );
  }
  
  return (
    <Container maxWidth="lg">
      <Box sx={{ py: 4 }}>
        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}
        
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <Grid container spacing={4}>
            {/* Welcome Section */}
            <Grid item xs={12}>
              <motion.div variants={itemVariants}>
                <Card>
                  <CardContent sx={{ 
                    display: 'flex', 
                    flexDirection: { xs: 'column', md: 'row' },
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    p: 3
                  }}>
                    <Box sx={{ 
                      display: 'flex', 
                      flexDirection: { xs: 'column', md: 'row' },
                      alignItems: 'center',
                      mb: { xs: 3, md: 0 }
                    }}>
                      <RobotAvatar 
                        mood={getRobotMood()} 
                        size={100} 
                        showMessage={!!personalizedAdvice}
                        message={personalizedAdvice?.encouragement}
                      />
                      <Box sx={{ ml: { xs: 0, md: 3 }, mt: { xs: 2, md: 0 }, textAlign: { xs: 'center', md: 'left' } }}>
                        <Typography variant="h4" gutterBottom>
                          {getTimeBasedGreeting()}, {userProfile?.name || currentUser.displayName}!
                        </Typography>
                        
                        {personalizedAdvice ? (
                          <Typography variant="body1" color="text.secondary">
                            {personalizedAdvice.summary}
                          </Typography>
                        ) : (
                          <Typography variant="body1" color="text.secondary">
                            What would you like to focus on today?
                          </Typography>
                        )}
                      </Box>
                    </Box>
                    
                    <Button 
                      variant="contained" 
                      size="large"
                      onClick={() => startSession(personalizedAdvice?.recommendedSessionType || 'body-double')}
                    >
                      Start Focus Session
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>
            
            {/* Personalized Advice Section */}
            {personalizedAdvice && (
              <Grid item xs={12}>
                <motion.div variants={itemVariants}>
                  <Paper 
                    elevation={0} 
                    sx={{ 
                      p: 3, 
                      backgroundColor: theme.palette.primary.light,
                      borderRadius: 2
                    }}
                  >
                    <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
                      <LightbulbIcon sx={{ color: theme.palette.primary.dark, mr: 2, mt: 0.5 }} />
                      <Box>
                        <Typography variant="h6" gutterBottom>
                          Today's Suggestions
                        </Typography>
                        
                        <Box sx={{ mb: 2 }}>
                          <Typography variant="subtitle1" gutterBottom>
                            Primary Suggestion:
                          </Typography>
                          <Typography variant="body1">
                            {personalizedAdvice.primaryAdvice}
                          </Typography>
                        </Box>
                        
                        {personalizedAdvice.secondaryAdvice && (
                          <Box sx={{ mb: 2 }}>
                            <Typography variant="subtitle1" gutterBottom>
                              Additional Tip:
                            </Typography>
                            <Typography variant="body1">
                              {personalizedAdvice.secondaryAdvice}
                            </Typography>
                          </Box>
                        )}
                        
                        <Box sx={{ mb: 1 }}>
                          <Typography variant="subtitle1" gutterBottom>
                            Recommended Session Type:
                          </Typography>
                          <Button 
                            variant="outlined"
                            onClick={() => startSession(personalizedAdvice.recommendedSessionType)}
                            sx={{ textTransform: 'capitalize' }}
                          >
                            {personalizedAdvice.recommendedSessionType.replace(/-/g, ' ')}
                          </Button>
                        </Box>
                      </Box>
                    </Box>
                  </Paper>
                </motion.div>
              </Grid>
            )}
            
            {/* Mood Tracker */}
            <Grid item xs={12} md={6}>
              <motion.div variants={itemVariants}>
                <MoodTracker onMoodChange={handleMoodChange} currentMood={currentMood} />
              </motion.div>
            </Grid>
            
            {/* Quick Session Options */}
            <Grid item xs={12} md={6}>
              <motion.div variants={itemVariants}>
                <QuickSessionButtons onStartSession={startSession} />
              </motion.div>
            </Grid>
            
            {/* Tasks Section */}
            <Grid item xs={12} md={8}>
              <motion.div variants={itemVariants}>
                <TaskList tasks={tasks} />
              </motion.div>
            </Grid>
            
            {/* Progress Stats */}
            <Grid item xs={12} md={4}>
              <motion.div variants={itemVariants}>
                <ProgressStats sessions={recentSessions} />
              </motion.div>
            </Grid>
          </Grid>
        </motion.div>
      </Box>
      
      {/* Success Snackbar */}
      <Snackbar
        open={showSnackbar}
        autoHideDuration={4000}
        onClose={() => setShowSnackbar(false)}
        message={snackbarMessage}
      />
    </Container>
  );
};

export default Dashboard;