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
  Divider
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import RobotAvatar from '../avatar/RobotAvatar';
import MoodTracker from './MoodTracker';
import TaskList from './TaskList';
import ProgressStats from './ProgressStats';
import QuickSessionButtons from './QuickSessionButtons';
import { collection, query, where, getDocs, orderBy, limit } from 'firebase/firestore';
import { db } from '../../firebase';

const Dashboard = () => {
  const { currentUser, userProfile } = useAuth();
  const [loading, setLoading] = useState(true);
  const [tasks, setTasks] = useState([]);
  const [recentSessions, setRecentSessions] = useState([]);
  const [currentMood, setCurrentMood] = useState(null);
  const navigate = useNavigate();
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch user's tasks
        const tasksQuery = query(
          collection(db, 'tasks'),
          where('userId', '==', currentUser.uid),
          where('completed', '==', false),
          orderBy('priority', 'desc')
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
          orderBy('endTime', 'desc'),
          limit(5)
        );
        
        const sessionsSnapshot = await getDocs(sessionsQuery);
        const sessionsList = sessionsSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setRecentSessions(sessionsList);
        
        setLoading(false);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
        setLoading(false);
      }
    };
    
    if (currentUser) {
      fetchData();
    }
  }, [currentUser]);
  
  const getTimeBasedGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 18) return "Good Afternoon";
    return "Good Evening";
  };
  
  const getAvailableTime = () => {
    // Check if it's weekend
    const today = new Date().getDay();
    const isWeekend = today === 0 || today === 6;
    
    if (isWeekend && userProfile?.preferences?.weekendMode) {
      return "It's the weekend! Take it easy today.";
    }
    
    return "What would you like to focus on today?";
  };
  
  const startSession = (type) => {
    navigate(`/session/new?type=${type}`);
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
        <Grid container spacing={4}>
          {/* Welcome Section */}
          <Grid item xs={12}>
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
                  alignItems: 'center'
                }}>
                  <RobotAvatar 
                    mood={currentMood ? (currentMood > 3 ? 'happy' : 'encouraging') : 'focused'} 
                    size={100} 
                  />
                  <Box sx={{ ml: { xs: 0, md: 3 }, mt: { xs: 2, md: 0 }, textAlign: { xs: 'center', md: 'left' } }}>
                    <Typography variant="body1" color="text.secondary">
                      {getAvailableTime()}
                    </Typography>
                  </Box>
                </Box>
                
                <Button 
                  variant="contained" 
                  size="large"
                  onClick={() => startSession('body-double')}
                  sx={{ mt: { xs: 2, md: 0 } }}
                >
                  Start Focus Session
                </Button>
              </CardContent>
            </Card>
          </Grid>
          
          {/* Mood Tracker */}
          <Grid item xs={12} md={6}>
            <MoodTracker onMoodChange={setCurrentMood} currentMood={currentMood} />
          </Grid>
          
          {/* Quick Session Options */}
          <Grid item xs={12} md={6}>
            <QuickSessionButtons onStartSession={startSession} />
          </Grid>
          
          {/* Tasks Section */}
          <Grid item xs={12} md={8}>
            <TaskList tasks={tasks} />
          </Grid>
          
          {/* Progress Stats */}
          <Grid item xs={12} md={4}>
            <ProgressStats sessions={recentSessions} />
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default Dashboard;