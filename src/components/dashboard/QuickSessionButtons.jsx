// src/components/dashboard/QuickSessionButtons.jsx
import React from 'react';
import { 
  Card, 
  CardContent, 
  Typography, 
  Box, 
  Button,
  Grid
} from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import ListAltIcon from '@mui/icons-material/ListAlt';
import GroupIcon from '@mui/icons-material/Group';
import MenuBookIcon from '@mui/icons-material/MenuBook';

const QuickSessionButtons = ({ onStartSession }) => {
  const sessionTypes = [
    {
      type: 'pomodoro',
      label: 'Pomodoro',
      description: '25 min focus + 5 min break',
      icon: <AccessTimeIcon />,
      color: '#A8D1E7'
    },
    {
      type: 'body-double',
      label: 'Body Double',
      description: 'Work with your AI buddy',
      icon: <GroupIcon />,
      color: '#9DE0AD'
    },
    {
      type: 'task-breakdown',
      label: 'Task Breakdown',
      description: 'Break down a big task',
      icon: <ListAltIcon />,
      color: '#F8A978'
    },
    {
      type: 'deep-work',
      label: 'Deep Work',
      description: '90 min distraction-free',
      icon: <MenuBookIcon />,
      color: '#B39DDB'
    }
  ];
  
  return (
    <Card sx={{ height: '100%' }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Quick Start a Session
        </Typography>
        
        <Grid container spacing={2} sx={{ mt: 1 }}>
          {sessionTypes.map((session) => (
            <Grid item xs={6} key={session.type}>
              <Button
                variant="outlined"
                onClick={() => onStartSession(session.type)}
                fullWidth
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  p: 2,
                  height: '100%',
                  borderColor: session.color,
                  color: 'text.primary',
                  '&:hover': {
                    borderColor: session.color,
                    backgroundColor: `${session.color}20`
                  }
                }}
              >
                <Box sx={{ 
                  backgroundColor: `${session.color}40`,
                  borderRadius: '50%',
                  p: 1,
                  mb: 1,
                  color: session.color
                }}>
                  {session.icon}
                </Box>
                <Typography variant="subtitle2" sx={{ fontWeight: 'bold', mb: 0.5 }}>
                  {session.label}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {session.description}
                </Typography>
              </Button>
            </Grid>
          ))}
        </Grid>
      </CardContent>
    </Card>
  );
};

export default QuickSessionButtons;