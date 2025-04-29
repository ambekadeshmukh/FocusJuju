// src/components/dashboard/TaskList.jsx
import React, { useState } from 'react';
import { 
  Card, 
  CardContent, 
  Typography, 
  Box, 
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  ListItemButton,
  Checkbox,
  IconButton,
  TextField,
  Button,
  Divider,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useAuth } from '../../context/AuthContext';
import { db } from '../../firebase';
import { collection, addDoc, updateDoc, deleteDoc, doc, serverTimestamp } from 'firebase/firestore';

const TaskList = ({ tasks = [] }) => {
  const { currentUser } = useAuth();
  const [newTaskDialogOpen, setNewTaskDialogOpen] = useState(false);
  const [editTaskDialogOpen, setEditTaskDialogOpen] = useState(false);
  const [currentTask, setCurrentTask] = useState(null);
  
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    priority: 'medium',
    estimatedMinutes: 30
  });
  
  const handleNewTaskDialogOpen = () => {
    setNewTask({
      title: '',
      description: '',
      priority: 'medium',
      estimatedMinutes: 30
    });
    setNewTaskDialogOpen(true);
  };
  
  const handleEditTaskDialogOpen = (task) => {
    setCurrentTask(task);
    setNewTask({
      title: task.title,
      description: task.description || '',
      priority: task.priority || 'medium',
      estimatedMinutes: task.estimatedMinutes || 30
    });
    setEditTaskDialogOpen(true);
  };
  
  const handleTaskDialogClose = () => {
    setNewTaskDialogOpen(false);
    setEditTaskDialogOpen(false);
  };
  
  const handleNewTaskChange = (e) => {
    const { name, value } = e.target;
    setNewTask(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleNewTaskSubmit = async () => {
    if (!newTask.title.trim()) return;
    
    try {
      await addDoc(collection(db, 'tasks'), {
        userId: currentUser.uid,
        title: newTask.title,
        description: newTask.description,
        priority: newTask.priority,
        estimatedMinutes: Number(newTask.estimatedMinutes),
        completed: false,
        createdAt: serverTimestamp()
      });
      
      setNewTaskDialogOpen(false);
      // Here you would typically refresh the tasks list
      
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };
  
  const handleEditTaskSubmit = async () => {
    if (!newTask.title.trim() || !currentTask) return;
    
    try {
      await updateDoc(doc(db, 'tasks', currentTask.id), {
        title: newTask.title,
        description: newTask.description,
        priority: newTask.priority,
        estimatedMinutes: Number(newTask.estimatedMinutes),
        updatedAt: serverTimestamp()
      });
      
      setEditTaskDialogOpen(false);
      // Here you would typically refresh the tasks list
      
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };
  
  const handleTaskToggle = async (taskId, completed) => {
    try {
      await updateDoc(doc(db, 'tasks', taskId), {
        completed: !completed,
        completedAt: !completed ? serverTimestamp() : null
      });
      
      // Here you would typically refresh the tasks list
      
    } catch (error) {
      console.error("Error toggling task:", error);
    }
  };
  
  const handleTaskDelete = async (taskId) => {
    try {
      await deleteDoc(doc(db, 'tasks', taskId));
      
      // Here you would typically refresh the tasks list
      
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };
  
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
  
  const renderTaskDialog = (isEdit = false) => {
    return (
      <Dialog 
        open={isEdit ? editTaskDialogOpen : newTaskDialogOpen} 
        onClose={handleTaskDialogClose}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>{isEdit ? 'Edit Task' : 'Add New Task'}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="title"
            name="title"
            label="Task Title"
            type="text"
            fullWidth
            variant="outlined"
            value={newTask.title}
            onChange={handleNewTaskChange}
          />
          <TextField
            margin="dense"
            id="description"
            name="description"
            label="Description (Optional)"
            type="text"
            fullWidth
            multiline
            rows={3}
            variant="outlined"
            value={newTask.description}
            onChange={handleNewTaskChange}
          />
          <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
            <FormControl fullWidth>
              <InputLabel id="priority-label">Priority</InputLabel>
              <Select
                labelId="priority-label"
                id="priority"
                name="priority"
                value={newTask.priority}
                label="Priority"
                onChange={handleNewTaskChange}
              >
                <MenuItem value="low">Low</MenuItem>
                <MenuItem value="medium">Medium</MenuItem>
                <MenuItem value="high">High</MenuItem>
              </Select>
            </FormControl>
            <TextField
              margin="dense"
              id="estimatedMinutes"
              name="estimatedMinutes"
              label="Estimated Minutes"
              type="number"
              variant="outlined"
              value={newTask.estimatedMinutes}
              onChange={handleNewTaskChange}
              inputProps={{ min: 5, step: 5 }}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleTaskDialogClose}>Cancel</Button>
          <Button 
            onClick={isEdit ? handleEditTaskSubmit : handleNewTaskSubmit}
            variant="contained"
          >
            {isEdit ? 'Save Changes' : 'Add Task'}
          </Button>
        </DialogActions>
      </Dialog>
    );
  };
  
  return (
    <Card sx={{ height: '100%' }}>
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="h6">
            Your Tasks
          </Typography>
          <Button 
            variant="contained" 
            startIcon={<AddIcon />}
            onClick={handleNewTaskDialogOpen}
            size="small"
          >
            Add Task
          </Button>
        </Box>
        
        {tasks.length === 0 ? (
          <Box sx={{ textAlign: 'center', py: 4 }}>
            <Typography variant="body1" color="text.secondary">
              No tasks yet. Add your first task to get started!
            </Typography>
          </Box>
        ) : (
          <List>
            {tasks.map((task) => (
              <React.Fragment key={task.id}>
                <ListItem 
                  disablePadding
                  secondaryAction={
                    <Box>
                      <IconButton edge="end" onClick={() => handleEditTaskDialogOpen(task)}>
                        <EditIcon fontSize="small" />
                      </IconButton>
                      <IconButton edge="end" onClick={() => handleTaskDelete(task.id)}>
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </Box>
                  }
                >
                  <ListItemButton onClick={() => handleTaskToggle(task.id, task.completed)} dense>
                    <ListItemIcon>
                      <Checkbox
                        edge="start"
                        checked={task.completed}
                        tabIndex={-1}
                        disableRipple
                      />
                    </ListItemIcon>
                    <ListItemText 
                      primary={
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <Typography 
                            variant="body1" 
                            sx={{ 
                              textDecoration: task.completed ? 'line-through' : 'none',
                              color: task.completed ? 'text.secondary' : 'text.primary',
                              mr: 1
                            }}
                          >
                            {task.title}
                          </Typography>
                          <Chip 
                            label={task.priority} 
                            size="small" 
                            color={getPriorityColor(task.priority)}
                            sx={{ height: 20, fontSize: '0.65rem' }}
                          />
                        </Box>
                      }
                      secondary={
                        task.description && (
                          <Typography 
                            variant="body2" 
                            color="text.secondary"
                            sx={{ 
                              textDecoration: task.completed ? 'line-through' : 'none',
                              opacity: task.completed ? 0.7 : 1,
                              mt: 0.5
                            }}
                          >
                            {task.description}
                          </Typography>
                        )
                      }
                    />
                  </ListItemButton>
                </ListItem>
                <Divider component="li" />
              </React.Fragment>
            ))}
          </List>
        )}
        
        {renderTaskDialog(false)}
        {renderTaskDialog(true)}
      </CardContent>
    </Card>
  );
};

export default TaskList;