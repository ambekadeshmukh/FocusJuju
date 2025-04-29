// src/components/goals/MicroGoalSetting.jsx
import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  TextField, 
  Button, 
  Card, 
  CardContent,
  Grid,
  Chip,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  IconButton,
  CircularProgress,
  Collapse,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Slider,
  Tooltip,
  Paper
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import FlagIcon from '@mui/icons-material/Flag';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import RobotAvatar from '../avatar/RobotAvatar';
import { generateMicroGoals } from '../../services/aiService';
import { db } from '../../firebase';
import { 
  collection, 
  addDoc, 
  query, 
  where, 
  getDocs, 
  doc, 
  updateDoc, 
  deleteDoc, 
  serverTimestamp,
  writeBatch
} from 'firebase/firestore';

const MicroGoalSetting = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  
  const [mainTask, setMainTask] = useState('');
  const [microGoals, setMicroGoals] = useState([]);
  const [savedMicroGoals, setSavedMicroGoals] = useState([]);
  const [loading, setLoading] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [currentGoal, setCurrentGoal] = useState(null);
  
  // New goal form
  const [newGoal, setNewGoal] = useState({
    title: '',
    description: '',
    estimatedMinutes: 15,
    priority: 'medium'
  });
  
  // Fetch saved micro-goals on component mount
  useEffect(() => {
    const fetchMicroGoals = async () => {
      if (!currentUser) return;
      
      setLoading(true);
      try {
        const microGoalsQuery = query(
          collection(db, 'tasks'),
          where('userId', '==', currentUser.uid),
          where('isPartOfLargerTask', '==', true)
        );
        
        const querySnapshot = await getDocs(microGoalsQuery);
        const goals = [];
        
        querySnapshot.forEach((doc) => {
          goals.push({
            id: doc.id,
            ...doc.data()
          });
        });
        
        // Group by parentTaskId
        const groupedGoals = goals.reduce((acc, goal) => {
          const parentId = goal.parentTaskId || 'ungrouped';
          if (!acc[parentId]) {
            acc[parentId] = [];
          }
          acc[parentId].push(goal);
          return acc;
        }, {});
        
        setSavedMicroGoals(groupedGoals);
      } catch (error) {
        console.error("Error fetching micro-goals:", error);
        setError("Failed to load your micro-goals. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    
    fetchMicroGoals();
  }, [currentUser]);
  
  // Generate micro-goals from the main task
  const handleGenerateMicroGoals = async () => {
    if (!mainTask.trim()) {
      setError("Please enter a task description first.");
      return;
    }
    
    setGenerating(true);
    setError('');
    
    try {
      const generatedGoals = await generateMicroGoals(mainTask, {});
      setMicroGoals(generatedGoals);
    } catch (error) {
      console.error("Error generating micro-goals:", error);
      setError("Failed to generate micro-goals. Please try again.");
    } finally {
      setGenerating(false);
    }
  };
  
  // Save all micro-goals to Firestore
  const handleSaveMicroGoals = async () => {
    if (!currentUser) return;
    if (microGoals.length === 0) {
      setError("No micro-goals to save.");
      return;
    }
    
    setLoading(true);
    setError('');
    
    try {
      // First, create the parent task
      const parentTaskRef = await addDoc(collection(db, 'tasks'), {
        userId: currentUser.uid,
        title: mainTask,
        isLargerTask: true,
        completed: false,
        createdAt: serverTimestamp()
      });
      
      // Then create each micro-goal
      const batch = writeBatch(db);
      
      microGoals.forEach((goal) => {
        const microGoalRef = doc(collection(db, 'tasks'));
        batch.set(microGoalRef, {
          userId: currentUser.uid,
          title: goal.title,
          description: goal.description || '',
          estimatedMinutes: goal.estimatedMinutes || 15,
          priority: goal.priority || 'medium',
          isPartOfLargerTask: true,
          parentTaskId: parentTaskRef.id,
          parentTaskTitle: mainTask,
          completed: false,
          createdAt: serverTimestamp()
        });
      });
      
      await batch.commit();
      
      // Show success message
      setSuccess("Micro-goals saved successfully!");
      
      // Reset the form
      setMainTask('');
      setMicroGoals([]);
      
      // Refresh the saved micro-goals
      // (In a real app, you'd update the state with the new data instead of fetching again)
      
    } catch (error) {
      console.error("Error saving micro-goals:", error);
      setError("Failed to save micro-goals. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  
  // Add a manual micro-goal
  const handleAddMicroGoal = () => {
    if (!newGoal.title.trim()) {
      setError("Please enter a title for the micro-goal.");
      return;
    }
    
    setMicroGoals([...microGoals, { ...newGoal }]);
    
    // Reset new goal form
    setNewGoal({
      title: '',
      description: '',
      estimatedMinutes: 15,
      priority: 'medium'
    });
  };
  
  // Edit a micro-goal
  const handleEditMicroGoal = (index) => {
    setCurrentGoal({ ...microGoals[index], index });
    setNewGoal({
      title: microGoals[index].title,
      description: microGoals[index].description || '',
      estimatedMinutes: microGoals[index].estimatedMinutes || 15,
      priority: microGoals[index].priority || 'medium'
    });
    setShowEditDialog(true);
  };
  
  // Save edited micro-goal
  const handleSaveEditedMicroGoal = () => {
    if (!newGoal.title.trim() || !currentGoal) return;
    
    const updatedGoals = [...microGoals];
    updatedGoals[currentGoal.index] = { ...newGoal };
    setMicroGoals(updatedGoals);
    
    setShowEditDialog(false);
    setCurrentGoal(null);
    
    // Reset new goal form
    setNewGoal({
      title: '',
      description: '',
      estimatedMinutes: 15,
      priority: 'medium'
    });
  };
  
  // Delete a micro-goal
  const handleDeleteMicroGoal = (index) => {
    const updatedGoals = [...microGoals];
    updatedGoals.splice(index, 1);
    setMicroGoals(updatedGoals);
  };
  
  // Start a session with a specific micro-goal
  const handleStartSession = (goalTitle) => {
    navigate(`/session/new?type=body-double&task=${encodeURIComponent(goalTitle)}`);
  };
  
  // Mark a micro-goal as completed
  const handleToggleComplete = async (goalId, completed) => {
    if (!currentUser) return;
    
    try {
      await updateDoc(doc(db, 'tasks', goalId), {
        completed: !completed,
        completedAt: !completed ? serverTimestamp() : null
      });
      
      // In a real app, you'd update the state with the updated data
      // For simplicity, we're not doing that here
      
    } catch (error) {
      console.error("Error updating micro-goal:", error);
    }
  };
  
  // Get color based on priority
  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return 'error';
      case 'medium':
        return 'warning';
      case 'low':
        return 'success';
      default:
        return 'default';
    }
  };
  
  // Render the new/edit micro-goal dialog
  const renderMicroGoalDialog = () => (
    <Dialog 
      open={showEditDialog} 
      onClose={() => setShowEditDialog(false)}
      fullWidth
      maxWidth="sm"
    >
      <DialogTitle>
        {currentGoal ? 'Edit Micro-Goal' : 'Add Micro-Goal'}
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          Break down your task into a small, achievable step that can be completed in under 30 minutes.
        </DialogContentText>
        
        <TextField
          autoFocus
          margin="dense"
          id="title"
          label="Goal Title"
          type="text"
          fullWidth
          variant="outlined"
          value={newGoal.title}
          onChange={(e) => setNewGoal({ ...newGoal, title: e.target.value })}
          sx={{ mb: 2, mt: 2 }}
        />
        
        <TextField
          margin="dense"
          id="description"
          label="Description (Optional)"
          type="text"
          fullWidth
          multiline
          rows={2}
          variant="outlined"
          value={newGoal.description}
          onChange={(e) => setNewGoal({ ...newGoal, description: e.target.value })}
          sx={{ mb: 2 }}
        />
        
        <Box sx={{ mb: 2 }}>
          <Typography id="estimated-minutes" gutterBottom>
            Estimated Time: {newGoal.estimatedMinutes} minutes
          </Typography>
          <Slider
            value={newGoal.estimatedMinutes}
            onChange={(e, value) => setNewGoal({ ...newGoal, estimatedMinutes: value })}
            aria-labelledby="estimated-minutes"
            valueLabelDisplay="auto"
            step={5}
            marks
            min={5}
            max={30}
          />
        </Box>
        
        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel id="priority-label">Priority</InputLabel>
          <Select
            labelId="priority-label"
            id="priority"
            value={newGoal.priority}
            label="Priority"
            onChange={(e) => setNewGoal({ ...newGoal, priority: e.target.value })}
          >
            <MenuItem value="low">Low</MenuItem>
            <MenuItem value="medium">Medium</MenuItem>
            <MenuItem value="high">High</MenuItem>
          </Select>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setShowEditDialog(false)}>Cancel</Button>
        <Button 
          onClick={currentGoal ? handleSaveEditedMicroGoal : handleAddMicroGoal} 
          variant="contained"
        >
          {currentGoal ? 'Save Changes' : 'Add Goal'}
        </Button>
      </DialogActions>
    </Dialog>
  );
  
  return (
    <Box sx={{ maxWidth: 960, mx: 'auto', p: 2 }}>
      <Typography variant="h4" gutterBottom>
        Micro-Goal Setting
      </Typography>
      
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        Break down overwhelming tasks into bite-sized, achievable goals.
      </Typography>
      
      {error && (
        <Collapse in={!!error}>
          <Alert 
            severity="error" 
            onClose={() => setError('')}
            sx={{ mb: 3 }}
          >
            {error}
          </Alert>
        </Collapse>
      )}
      
      {success && (
        <Collapse in={!!success}>
          <Alert 
            severity="success" 
            onClose={() => setSuccess('')}
            sx={{ mb: 3 }}
          >
            {success}
          </Alert>
        </Collapse>
      )}
      
      <Card sx={{ mb: 4 }}>
        <CardContent>
          <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 3 }}>
            <RobotAvatar mood="thinking" size={80} />
            <Box sx={{ ml: 2 }}>
              <Typography variant="h6">
                What big task are you working on?
              </Typography>
              <Typography variant="body2" color="text.secondary">
                I'll help you break it into manageable pieces.
              </Typography>
            </Box>
          </Box>
          
          <TextField
            fullWidth
            label="Describe your task"
            variant="outlined"
            value={mainTask}
            onChange={(e) => setMainTask(e.target.value)}
            placeholder="e.g., Write a research paper on climate change"
            sx={{ mb: 2 }}
            multiline
            rows={2}
          />
          
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Button
              variant="outlined"
              onClick={() => setShowEditDialog(true)}
              startIcon={<AddIcon />}
            >
              Add Goal Manually
            </Button>
            
            <Button
              variant="contained"
              onClick={handleGenerateMicroGoals}
              startIcon={generating ? <CircularProgress size={20} /> : <AutorenewIcon />}
              disabled={generating || !mainTask.trim()}
            >
              {generating ? 'Generating...' : 'Generate Micro-Goals'}
            </Button>
          </Box>
        </CardContent>
      </Card>
      
      {microGoals.length > 0 && (
        <Card sx={{ mb: 4 }}>
          <CardContent>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="h6">
                Your Micro-Goals
              </Typography>
              <Button
                variant="contained"
                onClick={handleSaveMicroGoals}
                disabled={loading}
              >
                {loading ? 'Saving...' : 'Save All Goals'}
              </Button>
            </Box>
            
            <Paper variant="outlined" sx={{ p: 2, mb: 3, backgroundColor: 'background.default' }}>
              <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                Main Task: {mainTask}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Broken down into {microGoals.length} micro-goals
              </Typography>
            </Paper>
            
            <List>
              {microGoals.map((goal, index) => (
                <React.Fragment key={index}>
                  <ListItem
                    secondaryAction={
                      <Box>
                        <IconButton edge="end" onClick={() => handleEditMicroGoal(index)}>
                          <EditIcon fontSize="small" />
                        </IconButton>
                        <IconButton edge="end" onClick={() => handleDeleteMicroGoal(index)}>
                          <DeleteIcon fontSize="small" />
                        </IconButton>
                      </Box>
                    }
                  >
                    <ListItemIcon>
                      <Chip 
                        label={index + 1} 
                        color="primary"
                        size="small"
                      />
                    </ListItemIcon>
                    <ListItemText
                      primary={
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <Typography variant="body1">
                            {goal.title}
                          </Typography>
                          <Chip
                            label={goal.priority}
                            size="small"
                            color={getPriorityColor(goal.priority)}
                            sx={{ ml: 1, height: 20, fontSize: '0.65rem' }}
                          />
                        </Box>
                      }
                      secondary={
                        <Box sx={{ mt: 0.5 }}>
                          {goal.description && (
                            <Typography variant="body2" color="text.secondary" paragraph>
                              {goal.description}
                            </Typography>
                          )}
                          <Chip
                            icon={<AccessTimeIcon fontSize="small" />}
                            label={`${goal.estimatedMinutes} min`}
                            size="small"
                            variant="outlined"
                          />
                        </Box>
                      }
                    />
                  </ListItem>
                  <Divider component="li" />
                </React.Fragment>
              ))}
            </List>
          </CardContent>
        </Card>
      )}
      
      {/* Saved Micro-Goals Section */}
      <Typography variant="h5" gutterBottom sx={{ mt: 4 }}>
        Your Saved Micro-Goals
      </Typography>
      
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
          <CircularProgress />
        </Box>
      ) : Object.keys(savedMicroGoals).length === 0 ? (
        <Paper sx={{ p: 3, textAlign: 'center', backgroundColor: 'background.default' }}>
          <Typography variant="body1" color="text.secondary">
            You haven't saved any micro-goals yet. Start by creating some above!
          </Typography>
        </Paper>
      ) : (
        <>
          {Object.entries(savedMicroGoals).map(([parentId, goals]) => (
            <Card key={parentId} sx={{ mb: 3 }}>
              <CardContent>
                <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                  {goals[0]?.parentTaskTitle || 'Task Group'}
                </Typography>
                
                <List>
                  {goals.map((goal) => (
                    <React.Fragment key={goal.id}>
                      <ListItem
                        secondaryAction={
                          <Button
                            size="small"
                            variant="outlined"
                            startIcon={<PlayArrowIcon />}
                            onClick={() => handleStartSession(goal.title)}
                          >
                            Start
                          </Button>
                        }
                      >
                        <ListItemIcon>
                          <IconButton 
                            edge="start" 
                            onClick={() => handleToggleComplete(goal.id, goal.completed)}
                          >
                            {goal.completed ? 
                              <CheckCircleOutlineIcon color="success" /> : 
                              <RadioButtonUncheckedIcon />
                            }
                          </IconButton>
                        </ListItemIcon>
                        <ListItemText
                          primary={
                            <Typography 
                              variant="body1"
                              sx={{ 
                                textDecoration: goal.completed ? 'line-through' : 'none',
                                color: goal.completed ? 'text.secondary' : 'text.primary'
                              }}
                            >
                              {goal.title}
                            </Typography>
                          }
                          secondary={
                            <Box sx={{ display: 'flex', alignItems: 'center', mt: 0.5 }}>
                              <Chip
                                icon={<AccessTimeIcon fontSize="small" />}
                                label={`${goal.estimatedMinutes} min`}
                                size="small"
                                variant="outlined"
                                sx={{ mr: 1 }}
                              />
                              <Chip
                                label={goal.priority}
                                size="small"
                                color={getPriorityColor(goal.priority)}
                              />
                            </Box>
                          }
                        />
                      </ListItem>
                      <Divider component="li" />
                    </React.Fragment>
                  ))}
                </List>
                
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
                  <Typography variant="body2" color="text.secondary">
                    {goals.filter(g => g.completed).length} of {goals.length} completed
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          ))}
        </>
      )}
      
      {renderMicroGoalDialog()}
    </Box>
  );
};

export default MicroGoalSetting;