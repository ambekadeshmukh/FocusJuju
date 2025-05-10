// src/components/demo/BodyDoublingDemo.jsx
import React, { useState, useEffect, useRef } from 'react';
import { 
  Box, 
  Typography, 
  Button, 
  Card, 
  CardContent,
  Paper,
  Chip,
  Fade,
  CircularProgress,
  Drawer,
  List,
  ListItem,
  Divider,
  IconButton,
  TextField,
  useTheme,
  useMediaQuery,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import RobotAvatar from '../avatar/RobotAvatar';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import StopIcon from '@mui/icons-material/Stop';
import ChatIcon from '@mui/icons-material/Chat';
import CloseIcon from '@mui/icons-material/Close';
import SendIcon from '@mui/icons-material/Send';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import TimerIcon from '@mui/icons-material/Timer';
import { motion } from 'framer-motion';

const BodyDoublingDemo = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const navigate = useNavigate();
  
  // State for the demo
  const [timer, setTimer] = useState(5 * 60); // 5 minutes for demo
  const [isRunning, setIsRunning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [robotMood, setRobotMood] = useState('idle');
  const [robotMessage, setRobotMessage] = useState('');
  const [showRobotMessage, setShowRobotMessage] = useState(false);
  const [showReward, setShowReward] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [messages, setMessages] = useState([
    { id: 1, sender: 'ai', text: "Hi there! I'm Juju, your AI accountability buddy. I'll help you stay focused during your work session.", timestamp: new Date() }
  ]);
  const [newMessage, setNewMessage] = useState('');
  const [showSignUpDialog, setShowSignUpDialog] = useState(false);
  
  const messageEndRef = useRef(null);
  const timerRef = useRef(null);
  
  // Scroll to bottom of messages
  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);
  
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
  
  // Format time from seconds to MM:SS
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };
  
  // Start session
  const startSession = () => {
    setIsRunning(true);
    setRobotMood('encouraging');
    setRobotMessage("Let's focus together! I'll be right here with you.");
    setShowRobotMessage(true);
    
    setMessages(prev => [
      ...prev,
      {
        id: Date.now(),
        sender: 'ai',
        text: "Session started! Let's focus on your task together. I'll be here if you need any encouragement.",
        timestamp: new Date()
      }
    ]);
    
    setTimeout(() => {
      setRobotMood('focused');
      setShowRobotMessage(false);
    }, 4000);
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
  const endSession = () => {
    setIsRunning(false);
    setIsPaused(false);
    setTimer(5 * 60); // Reset to 5 minutes
    
    // Add message about ending
    setMessages(prev => [
      ...prev,
      {
        id: Date.now(),
        sender: 'ai',
        text: "Session ended. You made progress! Sign up to track your sessions and progress.",
        timestamp: new Date()
      }
    ]);
    
    // Set robot mood and message
    setRobotMood('happy');
    setRobotMessage("You've finished your demo session! Ready to sign up and unlock the full experience?");
    setShowRobotMessage(true);
    
    // Show sign up dialog
    setTimeout(() => {
      setShowSignUpDialog(true);
    }, 1500);
  };
  
  // Handle session completion
  const handleSessionComplete = () => {
    setIsRunning(false);
    setShowReward(true);
    
    // Add message about completion
    setMessages(prev => [
      ...prev,
      {
        id: Date.now(),
        sender: 'ai',
        text: "Great job! You've completed the demo session. Sign up to unlock longer sessions and track your progress!",
        timestamp: new Date()
      }
    ]);
    
    setTimeout(() => {
      setShowReward(false);
      setShowSignUpDialog(true);
    }, 3000);
  };
  
  // Send an encouraging message
  const sendEncouragement = () => {
    if (!isRunning) return;
    
    // Encouraging messages for the demo
    const encouragingMessages = [
      "You're doing great! Keep going!",
      "Focus on making progress, not perfection.",
      "I'm right here with you. You've got this!",
      "Small steps forward are still progress.",
      "You're building your focus muscle right now!"
    ];
    
    // Get a random encouraging message
    const randomMessage = encouragingMessages[Math.floor(Math.random() * encouragingMessages.length)];
    
    setMessages(prev => [
      ...prev,
      {
        id: Date.now(),
        sender: 'ai',
        text: randomMessage,
        timestamp: new Date()
      }
    ]);
    
    // Change robot mood and message briefly
    setRobotMood('encouraging');
    setRobotMessage(randomMessage);
    setShowRobotMessage(true);
    setShowReward(true);
    
    setTimeout(() => {
      setRobotMood('focused');
      setShowRobotMessage(false);
      setShowReward(false);
    }, 4000);
  };
  
  // Send user message
  const handleSendMessage = (e) => {
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
    
    // Demo AI responses based on common inputs
    setTimeout(() => {
      let aiResponse = "I'm here to support your focus session!";
      const userText = newMessage.toLowerCase();
      
      if (userText.includes('stuck') || userText.includes('help')) {
        aiResponse = "It's normal to feel stuck sometimes. Try breaking your task into smaller steps. What's the smallest part you could tackle first?";
      } else if (userText.includes('distracted') || userText.includes('focus')) {
        aiResponse = "When you feel distracted, try the 5-4-3-2-1 technique: Name 5 things you see, 4 things you feel, 3 things you hear, 2 things you smell, and 1 thing you taste. This can help bring you back to the present moment.";
      } else if (userText.includes('tired') || userText.includes('break')) {
        aiResponse = "Taking short breaks is important! Try a quick 2-minute stretch or get a glass of water, then come back to your task.";
      } else if (userText.includes('thank')) {
        aiResponse = "You're welcome! I'm happy to be your focus buddy. You're doing a great job!";
      } else if (userText.includes('how') && userText.includes('work')) {
        aiResponse = "I'm your AI focus buddy! I'll sit with you virtually while you work, provide encouragement, and help you stay accountable. In the full version, I'll track your progress and help break down big tasks too!";
      } else {
        aiResponse = "I'm right here with you. Keep going at your own pace. What are you working on right now?";
      }
      
      // Add AI response
      const aiMessage = {
        id: Date.now(),
        sender: 'ai',
        text: aiResponse,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, aiMessage]);
      
      // Show robot message
      setRobotMessage(aiResponse);
      setShowRobotMessage(true);
      
      // Reset robot mood after a delay
      setTimeout(() => {
        setRobotMood('focused');
        setShowRobotMessage(false);
      }, 4000);
    }, 1000);
  };
  
  return (
    <Box sx={{ maxWidth: 960, mx: 'auto', mt: 4, p: 2, position: 'relative' }}>
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
              label="Focus Session Demo" 
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
              Demo Focus Session
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
                    Great job! Keep up the good work! 🎉
                  </Typography>
                </Box>
              </Fade>
            )}
          </Box>
          
          {/* Controls */}
          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mb: 3 }}>
            {!isRunning ? (
              <Button
                variant="contained"
                color="primary"
                onClick={startSession}
                startIcon={<PlayArrowIcon />}
              >
                Start Demo Session
              </Button>
            ) : (
              <>
                <Button
                  variant={isPaused ? "contained" : "outlined"}
                  color={isPaused ? "primary" : "inherit"}
                  onClick={togglePause}
                  startIcon={isPaused ? <PlayArrowIcon /> : <PauseIcon />}
                >
                  {isPaused ? 'Resume' : 'Pause'}
                </Button>
                
                <Button
                  variant="outlined"
                  color="error"
                  onClick={endSession}
                  startIcon={<StopIcon />}
                >
                  End Session
                </Button>
              </>
            )}
          </Box>
          
          {/* Quick Actions */}
          {isRunning && (
            <Box 
              sx={{ 
                display: 'flex', 
                justifyContent: 'center', 
                gap: 1,
                flexWrap: 'wrap'
              }}
            >
              <Chip
                icon={<ChatIcon />}
                label="Need Help?"
                onClick={() => setShowChat(true)}
                clickable
              />
              
              <Chip
                icon={<EmojiEmotionsIcon />}
                label="Encourage Me"
                onClick={sendEncouragement}
                clickable
                color="secondary"
              />
            </Box>
          )}
          
          {!isRunning && !showSignUpDialog && (
            <Box sx={{ textAlign: 'center', mt: 3 }}>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                This is a demo of the Body Doubling feature.
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Sign up to access full sessions and track your progress!
              </Typography>
              <Button
                variant="outlined"
                sx={{ mt: 2 }}
                onClick={() => navigate('/signup')}
              >
                Create Free Account
              </Button>
            </Box>
          )}
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
      
      {/* Sign up dialog */}
      <Dialog
        open={showSignUpDialog}
        onClose={() => setShowSignUpDialog(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Ready to unlock the full experience?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            You've completed the demo! Sign up for free to unlock these features:
          </DialogContentText>
          <List>
            <ListItem>
              <Chip size="small" color="primary" sx={{ mr: 1 }} />
              <Typography variant="body1">Full-length focus sessions (up to 90 minutes)</Typography>
            </ListItem>
            <ListItem>
              <Chip size="small" color="primary" sx={{ mr: 1 }} />
              <Typography variant="body1">Track your progress and build streaks</Typography>
            </ListItem>
            <ListItem>
              <Chip size="small" color="primary" sx={{ mr: 1 }} />
              <Typography variant="body1">Break down big tasks into manageable micro-goals</Typography>
            </ListItem>
            <ListItem>
              <Chip size="small" color="primary" sx={{ mr: 1 }} />
              <Typography variant="body1">Personalized support based on your preferences</Typography>
            </ListItem>
          </List>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowSignUpDialog(false)}>Maybe Later</Button>
          <Button variant="contained" onClick={() => navigate('/signup')}>
            Create Free Account
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default BodyDoublingDemo;