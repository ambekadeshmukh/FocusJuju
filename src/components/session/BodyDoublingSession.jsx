// src/components/session/BodyDoublingSession.jsx
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { 
  Box, 
  Typography, 
  Button, 
  Card, 
  CardContent,
  TextField,
  IconButton,
  Paper,
  Chip,
  Fade,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Divider,
  FormControlLabel,
  Switch,
  Slider,
  Tooltip,
  useMediaQuery
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import RobotAvatar from '../avatar/RobotAvatar';
import { db } from '../../firebase';
import { collection, addDoc, serverTimestamp, doc, updateDoc, getDoc } from 'firebase/firestore';
import PauseIcon from '@mui/icons-material/Pause';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import StopIcon from '@mui/icons-material/Stop';
import MicIcon from '@mui/icons-material/Mic';
import SendIcon from '@mui/icons-material/Send';
import SettingsIcon from '@mui/icons-material/Settings';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import VolumeOffIcon from '@mui/icons-material/VolumeOff';
import ChatIcon from '@mui/icons-material/Chat';
import CloseIcon from '@mui/icons-material/Close';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import TimerIcon from '@mui/icons-material/Timer';
import { motion } from 'framer-motion';

// Import AI service
import { generateAIResponse } from '../../services/aiService';

// Simple notification sound
const notificationSound = new Audio('/sounds/notification.mp3');
const completionSound = new Audio('/sounds/completion.mp3');

const BodyDoublingSession = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const { currentUser, userProfile } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  
  // Get query parameters
  const queryParams = new URLSearchParams(location.search);
  const sessionType = queryParams.get('type') || 'body-double';
  const initialTask = queryParams.get('task') || '';
  
  const [sessionId, setSessionId] = useState(null);
  const [timer, setTimer] = useState(25 * 60); // Default: 25 minutes in seconds
  const [isRunning, setIsRunning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [sessionStartTime, setSessionStartTime] = useState(null);
  const [currentTask, setCurrentTask] = useState(initialTask);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [robotMood, setRobotMood] = useState('focused');
  const [robotMessage, setRobotMessage] = useState('');
  const [showRobotMessage, setShowRobotMessage] = useState(false);
  const [showReward, setShowReward] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [confirmEndDialog, setConfirmEndDialog] = useState(false);
  const [sessionComplete, setSessionComplete] = useState(false);
  const [sessionSettings, setSessionSettings] = useState({
    duration: 25,
    encouragementFrequency: 5, // minutes
    soundEnabled: true,
    backgroundSound: 'none'
  });
  
  const messageEndRef = useRef(null);
  const encouragementTimer = useRef(null);
  const timerRef = useRef(null);
  
  // Load existing session or initialize for a specific task
  useEffect(() => {
    const initializeSessionData = async () => {
      const sessionIdFromUrl = location.pathname.split('/').pop();
      
      if (sessionIdFromUrl && sessionIdFromUrl !== 'new') {
        try {
          // Load existing session
          const sessionDoc = await getDoc(doc(db, 'sessions', sessionIdFromUrl));
          
          if (sessionDoc.exists() && sessionDoc.data().userId === currentUser.uid) {
            const sessionData = sessionDoc.data();
            
            setSessionId(sessionIdFromUrl);
            setCurrentTask(sessionData.taskDescription || '');
            
            // Calculate remaining time if session is in progress
            if (sessionData.status === 'in-progress') {
              const startTime = sessionData.startTime.toDate();
              const plannedEndTime = new Date(startTime.getTime() + (sessionData.plannedDurationMinutes * 60 * 1000));
              const currentTime = new Date();
              
              if (plannedEndTime > currentTime) {
                const remainingSeconds = Math.round((plannedEndTime - currentTime) / 1000);
                setTimer(remainingSeconds);
              }
              
              setSessionStartTime(startTime);
              setIsRunning(true);
              setSessionSettings(prev => ({
                ...prev,
                duration: sessionData.plannedDurationMinutes
              }));
            }
          }
        } catch (error) {
          console.error("Error loading session:", error);
        }
      } else {
        // Set duration based on session type
        let duration = 25; // default
        
        if (sessionType === 'pomodoro') {
          duration = 25; // standard pomodoro
        } else if (sessionType === 'deep-work') {
          duration = 90; // longer session
        } else if (sessionType === 'task-breakdown') {
          duration = 15; // shorter session
        }
        
        // Initialize with user preferences if available
        if (userProfile?.preferences) {
          setSessionSettings(prev => ({
            ...prev,
            duration: duration,
            soundEnabled: userProfile.preferences.soundEnabled !== false
          }));
        } else {
          setSessionSettings(prev => ({
            ...prev,
            duration: duration
          }));
        }
        
        // Set timer based on session type
        setTimer(duration * 60);
      }
    };
    
    if (currentUser) {
      initializeSessionData();
    }
  }, [currentUser, location.pathname, location.search, sessionType, initialTask, userProfile]);
  
  // Array of encouraging messages based on user's preferred style
  const encouragingMessages = {
    friendly: [
      "You're doing great! Keep going! 👏",
      "I'm right here with you. You've got this!",
      "You're making progress, one step at a time!",
      "Keep up the good work! I'm here if you need me.",
      "You're focusing so well right now!",
    ],
    serious: [
      "Progress noted. Continuing as planned.",
      "You are maintaining good focus. Continue.",
      "Productivity levels optimal. Keep going.",
      "Task progression is on track.",
      "Focused work is happening. Excellent.",
    ],
    funny: [
      "Still awake? Just checking! 😴",
      "If focus were a sport, you'd be winning gold! 🥇",
      "Your brain cells are doing a happy dance right now! 💃",
      "Productivity level: Superhero! 🦸",
      "You're crushing this like it's a bug under your productivity shoe! 👞",
    ],
    motivational: [
      "PUSH THROUGH! YOU'VE GOT THIS! 💪",
      "EVERY SECOND COUNTS! MAKE IT HAPPEN! 🔥",
      "YOU ARE UNSTOPPABLE! KEEP CRUSHING IT! 🚀",
      "TRANSFORM YOUR DREAMS INTO REALITY! RIGHT NOW! ✨",
      "FEEL THE POWER OF YOUR FOCUS! YOU'RE INCREDIBLE! ⚡",
    ]
  };
  
  // Reward messages
  const rewardMessages = [
    "Great job! You've earned a mini-break! 🎉",
    "Focus champion! Take a moment to celebrate! 🏆",
    "You're crushing it! Time for a quick celebration! 🎊",
    "Fantastic work session! Give yourself a pat on the back! 👏",
    "Look at you being productive! Reward time! ✨"
  ];
  
  // Scroll to bottom of messages
  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);
  
  // Get session type display name
  const getSessionTypeName = () => {
    switch (sessionType) {
      case 'pomodoro':
        return 'Pomodoro Session';
      case 'body-double':
        return 'Body Doubling';
      case 'deep-work':
        return 'Deep Work Session';
      case 'task-breakdown':
        return 'Task Breakdown Session';
      default:
        return 'Focus Session';
    }
  };
  
  // Timer functionality
  useEffect(() => {
    if (isRunning && !isPaused) {
      timerRef.current = setInterval(() => {
        setTimer(prevTimer => {
          if (prevTimer <= 1) {
            // Session completed
            clearInterval(timerRef.current);
            handleSessionComplete();
            return 0;
          }
          return prevTimer - 1;
        });
      }, 1000);
    } else {
      clearInterval(timerRef.current);
    }
    
    return () => clearInterval(timerRef.current);
  }, [isRunning, isPaused]);
  
  // Encouragement timer
  useEffect(() => {
    if (isRunning && !isPaused) {
      // Clear any existing encouragement timer
      if (encouragementTimer.current) {
        clearInterval(encouragementTimer.current);
      }
      
      // Set new encouragement timer based on frequency setting
      encouragementTimer.current = setInterval(() => {
        sendEncouragement();
      }, sessionSettings.encouragementFrequency * 60 * 1000);
    } else {
      clearInterval(encouragementTimer.current);
    }
    
    return () => clearInterval(encouragementTimer.current);
  }, [isRunning, isPaused, sessionSettings.encouragementFrequency]);
  
  // Format time from seconds to MM:SS
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };
  
  // Start session
  const startSession = async () => {
    if (!currentTask.trim()) {
      // Add default task if user didn't specify
      setCurrentTask('Focus Session');
    }
    
    try {
      // Create session document in Firestore
      const sessionRef = await addDoc(collection(db, 'sessions'), {
        userId: currentUser.uid,
        startTime: serverTimestamp(),
        plannedDurationMinutes: sessionSettings.duration,
        taskDescription: currentTask.trim() || 'Focus Session',
        type: sessionType,
        status: 'in-progress'
      });
      
      setSessionId(sessionRef.id);
      setIsRunning(true);
      setSessionStartTime(new Date());
      
      // Add welcome message
      const messageStyle = userProfile?.preferences?.messageStyle || 'friendly';
      let welcomeMessage = "Let's focus together! I'll be right here with you.";
      
      if (messageStyle === 'serious') {
        welcomeMessage = "Session initiated. Focus mode engaged. I will provide periodic updates.";
      } else if (messageStyle === 'funny') {
        welcomeMessage = "Focus mode: ACTIVATED! 🚀 Let's show those distractions who's boss! I'll be your productivity sidekick!";
      } else if (messageStyle === 'motivational') {
        welcomeMessage = "LET'S CRUSH THIS SESSION! 💪 YOUR JOURNEY TO SUCCESS STARTS RIGHT NOW! I'M HERE TO PUSH YOU FORWARD!";
      }
      
      setMessages([
        {
          id: Date.now(),
          sender: 'ai',
          text: welcomeMessage,
          timestamp: new Date()
        }
      ]);
      
      // Update robot mood and message
      setRobotMood('encouraging');
      setRobotMessage(welcomeMessage);
      setShowRobotMessage(true);
      
      setTimeout(() => {
        setRobotMood('focused');
        setShowRobotMessage(false);
      }, 4000);
      
    } catch (error) {
      console.error("Error starting session:", error);
    }
  };
  
  // Pause/Resume session
  const togglePause = () => {
    setIsPaused(prev => !prev);
    setRobotMood(isPaused ? 'focused' : 'thinking');
    
    // Add message about pausing/resuming
    const message = isPaused
      ? "Session resumed. Let's continue focusing!"
      : "Session paused. Take a short break, then we'll continue.";
    
    setMessages(prev => [
      ...prev,
      {
        id: Date.now(),
        sender: 'ai',
        text: message,
        timestamp: new Date()
      }
    ]);
    
    // Show robot message
    setRobotMessage(message);
    setShowRobotMessage(true);
    setTimeout(() => setShowRobotMessage(false), 3000);
  };
  
  // End session
  const endSession = async (completed = false) => {
    setIsRunning(false);
    setIsPaused(false);
    
    try {
      if (sessionId) {
        // Calculate session duration
        const endTime = new Date();
        const sessionDuration = Math.floor((endTime - (sessionStartTime || endTime)) / 1000);
        
        // Update session in Firestore
        await updateDoc(doc(db, 'sessions', sessionId), {
          endTime: serverTimestamp(),
          status: completed ? 'completed' : 'ended-early',
          actualDurationSeconds: sessionDuration
        });
      }
      
      // Add message about ending
      const message = completed
        ? "Great job! You've completed the session!"
        : "Session ended. You still made progress!";
      
      setMessages(prev => [
        ...prev,
        {
          id: Date.now(),
          sender: 'ai',
          text: message,
          timestamp: new Date()
        }
      ]);
      
      // Play sound if enabled
      if (sessionSettings.soundEnabled && !isMuted) {
        if (completed) {
          completionSound.play().catch(err => console.error("Error playing sound:", err));
        } else {
          notificationSound.play().catch(err => console.error("Error playing sound:", err));
        }
      }
      
      // Set robot mood and message
      setRobotMood('happy');
      setRobotMessage(message);
      setShowRobotMessage(true);
      
      if (completed) {
        setSessionComplete(true);
      } else {
        // Navigate back to dashboard after a short delay
        setTimeout(() => {
          navigate('/dashboard');
        }, 3000);
      }
      
    } catch (error) {
      console.error("Error ending session:", error);
    }
  };
  
  // Handle session completion
  const handleSessionComplete = useCallback(() => {
    // Play completion sound if enabled
    if (sessionSettings.soundEnabled && !isMuted) {
      completionSound.play().catch(err => console.error("Error playing sound:", err));
    }
    
    setIsRunning(false);
    setShowReward(true);
    endSession(true);
    
    setTimeout(() => {
      setShowReward(false);
    }, 4000);
  }, [sessionSettings.soundEnabled, isMuted]);
  
  // Send an encouraging message
  const sendEncouragement = () => {
    if (!isRunning || isPaused) return;
    
    // Get a random encouraging message based on user preference
    const messageStyle = userProfile?.preferences?.messageStyle || 'friendly';
    const messages = encouragingMessages[messageStyle] || encouragingMessages.friendly;
    const randomMessage = messages[Math.floor(Math.random() * messages.length)];
    
    setMessages(prev => [
      ...prev,
      {
        id: Date.now(),
        sender: 'ai',
        text: randomMessage,
        timestamp: new Date()
      }
    ]);
    
    // Play notification sound if enabled
    if (sessionSettings.soundEnabled && !isMuted) {
      notificationSound.play().catch(err => console.error("Error playing sound:", err));
    }
    
    // Show animated reward
    setShowReward(true);
    setTimeout(() => setShowReward(false), 3000);
    
    // Change robot mood and message briefly
    setRobotMood('encouraging');
    setRobotMessage(randomMessage);
    setShowRobotMessage(true);
    
    setTimeout(() => {
      setRobotMood('focused');
      setShowRobotMessage(false);
    }, 4000);
  };
  
  // Send user message
  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;
    
    // Add user message
    const userMessage = {
      id: Date.now(),
      sender: 'user',
      text: newMessage.trim(),
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setNewMessage('');
    
    // Set robot to thinking mode
    setRobotMood('thinking');
    
    try {
      // Get AI response
      const aiResponse = await generateAIResponse(newMessage.trim(), userProfile);
      
      // Add AI response
      const aiMessage = {
        id: Date.now(),
        sender: 'ai',
        text: aiResponse,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, aiMessage]);
      
      // Play notification sound if enabled
      if (sessionSettings.soundEnabled && !isMuted) {
        notificationSound.play().catch(err => console.error("Error playing sound:", err));
      }
      
      // Show robot message
      setRobotMessage(aiResponse);
      setShowRobotMessage(true);
      
      // Reset robot mood after a delay
      setTimeout(() => {
        setRobotMood('focused');
        setShowRobotMessage(false);
      }, 4000);
      
    } catch (error) {
      console.error("Error getting AI response:", error);
      
      // Add fallback response
      setMessages(prev => [
        ...prev,
        {
          id: Date.now(),
          sender: 'ai',
          text: "I'm here to support you. Let's keep focusing together!",
          timestamp: new Date()
        }
      ]);
      
      // Reset robot mood
      setRobotMood('focused');
    }
  };
  
  // Handle settings changes
  const handleSettingsChange = (name, value) => {
    setSessionSettings(prev => ({
      ...prev,
      [name]: value
    }));
    
    // If changing duration and session not started, update timer
    if (name === 'duration' && !isRunning) {
      setTimer(value * 60);
    }
  };
  
  // Render session setup
  const renderSessionSetup = () => (
    <Card variant="outlined" sx={{ maxWidth: 600, mx: 'auto', mt: 4 }}>
      <CardContent>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 4 }}>
          <RobotAvatar 
            mood="idle" 
            size={120} 
            showMessage={true} 
            message={`Ready for a ${getSessionTypeName()}?`}
          />
          <Typography variant="h5" sx={{ mt: 2 }}>
            Ready to Focus Together?
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ textAlign: 'center', mt: 1 }}>
            I'll be your virtual body double, keeping you company while you work.
          </Typography>
        </Box>
        
        <TextField
          fullWidth
          label="What are you working on? (optional)"
          variant="outlined"
          value={currentTask}
          onChange={(e) => setCurrentTask(e.target.value)}
          placeholder="e.g., Writing report, Studying for exam, Coding project"
          sx={{ mb: 3 }}
        />
        
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
          <Typography variant="body1" sx={{ mr: 2 }}>
            Session Duration:
          </Typography>
          <Chip 
            label={`${sessionSettings.duration} min`} 
            color="primary"
            onClick={() => setShowSettings(true)}
          />
          <IconButton 
            color="primary" 
            onClick={() => setShowSettings(true)}
            sx={{ ml: 1 }}
          >
            <SettingsIcon />
          </IconButton>
        </Box>
        
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <Button
            variant="contained"
            size="large"
            startIcon={<PlayArrowIcon />}
            onClick={startSession}
            sx={{ px: 4 }}
          >
            Start Session
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
  
  // Render active session
  const renderActiveSession = () => (
    <Box sx={{ maxWidth: 960, mx: 'auto', mt: 4, position: 'relative' }}>
      <Paper 
        elevation={3} 
        sx={{ 
          p: 3, 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        {/* Background animation */}
        <Box 
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: isRunning && !isPaused ? '#A8D1E710' : '#F5F5F5',
            zIndex: 0,
            transition: 'background-color 0.5s ease'
          }}
        >
          {isRunning && !isPaused && (
            <motion.div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: `radial-gradient(circle, ${theme.palette.primary.light}10 0%, transparent 70%)`,
                zIndex: 0
              }}
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.5, 0.3]
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                repeatType: 'reverse'
              }}
            />
          )}
        </Box>
        
        <Box sx={{ position: 'relative', zIndex: 1, width: '100%' }}>
          {/* Session type badge */}
          <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
            <Chip 
              icon={<TimerIcon fontSize="small" />} 
              label={getSessionTypeName()} 
              color="primary" 
              variant="outlined"
            />
          </Box>
          
          {/* Timer */}
          <Box sx={{ textAlign: 'center', mb: 4 }}>
            <Typography 
              variant="h1" 
              sx={{ 
                fontSize: { xs: '4rem', sm: '5rem' }, 
                fontWeight: 'bold',
                color: isPaused ? theme.palette.text.secondary : theme.palette.primary.main
              }}
            >
              {formatTime(timer)}
            </Typography>
            <Typography variant="subtitle1" color="text.secondary">
              {currentTask || 'Focus Session'}
            </Typography>
          </Box>
          
          {/* Avatar */}
          <Box 
            sx={{ 
              display: 'flex', 
              justifyContent: 'center', 
              mb: 4,
              position: 'relative'
            }}
          >
            <RobotAvatar 
              mood={robotMood} 
              size={isMobile ? 120 : 180} 
              showMessage={showRobotMessage}
              message={robotMessage}
            />
            
            {/* Celebration animation */}
            {showReward && (
              <Fade in={showReward}>
                <Box
                  sx={{
                    position: 'absolute',
                    top: -20,
                    left: '50%',
                    transform: 'translateX(-50%)',
                    backgroundColor: theme.palette.secondary.light,
                    color: theme.palette.secondary.dark,
                    borderRadius: 2,
                    py: 1,
                    px: 2,
                    whiteSpace: 'nowrap'
                  }}
                >
                  <Typography variant="body2" fontWeight="bold">
                    {rewardMessages[Math.floor(Math.random() * rewardMessages.length)]}
                  </Typography>
                </Box>
              </Fade>
            )}
          </Box>
          
          {/* Controls */}
          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mb: 3 }}>
            <Button
              variant={isPaused ? "contained" : "outlined"}
              color={isPaused ? "primary" : "inherit"}
              onClick={togglePause}
              startIcon={isPaused ? <PlayArrowIcon /> : <PauseIcon />}
              disabled={!isRunning}
            >
              {isPaused ? 'Resume' : 'Pause'}
            </Button>
            
            <Button
              variant="outlined"
              color="error"
              onClick={() => setConfirmEndDialog(true)}
              startIcon={<StopIcon />}
              disabled={!isRunning}
            >
              End Session
            </Button>
          </Box>
          
          {/* Quick Actions */}
          <Box 
            sx={{ 
              display: 'flex', 
              justifyContent: 'center', 
              gap: 1,
              flexWrap: 'wrap'
            }}
          >
            <Tooltip title="Open Chat">
              <Chip
                icon={<ChatIcon />}
                label="Need Help?"
                onClick={() => setShowChat(true)}
                clickable
              />
            </Tooltip>
            
            <Tooltip title={isMuted ? "Unmute" : "Mute"}>
              <Chip
                icon={isMuted ? <VolumeOffIcon /> : <VolumeUpIcon />}
                label={isMuted ? "Unmute" : "Mute"}
                onClick={() => setIsMuted(!isMuted)}
                clickable
              />
            </Tooltip>
            
            <Tooltip title="Get Encouragement">
              <Chip
                icon={<EmojiEmotionsIcon />}
                label="Encourage Me"
                onClick={sendEncouragement}
                clickable
                color="secondary"
              />
            </Tooltip>
          </Box>
        </Box>
      </Paper>
      
      {/* Chat drawer */}
      <Drawer
        anchor="right"
        open={showChat}
        onClose={() => setShowChat(false)}
        PaperProps={{
          sx: { width: { xs: '100%', sm: 350 } }
        }}
      >
        <Box sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h6">Chat with Juju</Typography>
          <IconButton onClick={() => setShowChat(false)}>
            <CloseIcon />
          </IconButton>
        </Box>
        <Divider />
        
        <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
          <Box sx={{ flex: 1, overflowY: 'auto', p: 2 }}>
            {messages.map((message) => (
              <Box
                key={message.id}
                sx={{
                  display: 'flex',
                  justifyContent: message.sender === 'user' ? 'flex-end' : 'flex-start',
                  mb: 2
                }}
              >
                <Paper
                  elevation={1}
                  sx={{
                    p: 2,
                    borderRadius: 2,
                    maxWidth: '80%',
                    backgroundColor: message.sender === 'user' 
                      ? theme.palette.primary.light 
                      : theme.palette.background.paper
                  }}
                >
                  <Typography variant="body1">{message.text}</Typography>
                  <Typography variant="caption" color="text.secondary">
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </Typography>
                </Paper>
              </Box>
            ))}
            <div ref={messageEndRef} />
          </Box>
          
          <Box sx={{ p: 2, borderTop: 1, borderColor: 'divider' }}>
            <form onSubmit={handleSendMessage}>
              <Box sx={{ display: 'flex', gap: 1 }}>
                <TextField
                  fullWidth
                  size="small"
                  placeholder="Type a message..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                />
                <IconButton color="primary" type="submit">
                  <SendIcon />
                </IconButton>
              </Box>
            </form>
          </Box>
        </Box>
      </Drawer>
      
      {/* Settings drawer */}
      <Drawer
        anchor="left"
        open={showSettings}
        onClose={() => setShowSettings(false)}
        PaperProps={{
          sx: { width: { xs: '100%', sm: 350 } }
        }}
      >
        <Box sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h6">Session Settings</Typography>
          <IconButton onClick={() => setShowSettings(false)}>
            <CloseIcon />
          </IconButton>
        </Box>
        <Divider />
        
        <List sx={{ p: 2 }}>
          <ListItem>
            <Box sx={{ width: '100%' }}>
              <Typography id="duration-slider" gutterBottom>
                Session Duration: {sessionSettings.duration} minutes
              </Typography>
              <Slider
                value={sessionSettings.duration}
                onChange={(e, value) => handleSettingsChange('duration', value)}
                min={5}
                max={90}
                step={5}
                marks={[
                  { value: 15, label: '15m' },
                  { value: 25, label: '25m' },
                  { value: 50, label: '50m' },
                  { value: 90, label: '90m' }
                ]}
                disabled={isRunning}
                aria-labelledby="duration-slider"
              />
            </Box>
          </ListItem>
          
          <ListItem>
            <Box sx={{ width: '100%' }}>
              <Typography id="encouragement-slider" gutterBottom>
                Encouragement Frequency: {sessionSettings.encouragementFrequency} minutes
              </Typography>
              <Slider
                value={sessionSettings.encouragementFrequency}
                onChange={(e, value) => handleSettingsChange('encouragementFrequency', value)}
                aria-labelledby="encouragement-slider"
                valueLabelDisplay="auto"
                step={1}
                marks
                min={1}
                max={15}
              />
            </Box>
          </ListItem>
          
          <ListItem>
            <FormControlLabel
              control={
                <Switch
                  checked={sessionSettings.soundEnabled}
                  onChange={(e) => handleSettingsChange('soundEnabled', e.target.checked)}
                />
              }
              label="Enable Sounds"
            />
          </ListItem>
        </List>
      </Drawer>
      
      {/* Confirm end dialog */}
      <Dialog
        open={confirmEndDialog}
        onClose={() => setConfirmEndDialog(false)}
      >
        <DialogTitle>End Session?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to end this session early? Your progress will still be saved.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmEndDialog(false)}>Cancel</Button>
          <Button 
            onClick={() => {
              setConfirmEndDialog(false);
              endSession(false);
            }} 
            color="error"
          >
            End Session
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
  
  // Render session completed view
  const renderSessionCompleted = () => (
    <Card sx={{ maxWidth: 600, mx: 'auto', mt: 4 }}>
      <CardContent>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 4 }}>
          <RobotAvatar mood="happy" size={120} />
          <Typography variant="h5" sx={{ mt: 2 }}>
            Session Complete!
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ textAlign: 'center', mt: 1 }}>
            Great job focusing! You've completed your session.
          </Typography>
        </Box>
        
        <Box sx={{ 
          backgroundColor: theme.palette.secondary.light,
          borderRadius: 2,
          p: 3,
          mb: 3
        }}>
          <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
            Session Summary
          </Typography>
          
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
            <Typography variant="body2" color="text.secondary">Task:</Typography>
            <Typography variant="body2">{currentTask || 'Focus Session'}</Typography>
          </Box>
          
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
            <Typography variant="body2" color="text.secondary">Duration:</Typography>
            <Typography variant="body2">{sessionSettings.duration} minutes</Typography>
          </Box>
          
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant="body2" color="text.secondary">Completion:</Typography>
            <Typography variant="body2" color="success.main">100%</Typography>
          </Box>
        </Box>
        
        <Box sx={{ display: 'flex', justifyContent: 'space-around' }}>
          <Button
            variant="outlined"
            onClick={() => {
              // Reset session state
              setIsRunning(false);
              setIsPaused(false);
              setTimer(sessionSettings.duration * 60);
              setSessionId(null);
              setMessages([]);
              setRobotMood('idle');
              setSessionComplete(false);
            }}
          >
            New Session
          </Button>
          
          <Button
            variant="contained"
            onClick={() => navigate('/dashboard')}
          >
            Dashboard
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
  
  return (
    <Box sx={{ p: 2, minHeight: '100vh' }}>
      {!isRunning && !sessionComplete && renderSessionSetup()}
      {isRunning && renderActiveSession()}
      {sessionComplete && renderSessionCompleted()}
    </Box>
  );
};

export default BodyDoublingSession;