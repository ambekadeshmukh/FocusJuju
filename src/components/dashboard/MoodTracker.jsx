// src/components/dashboard/MoodTracker.jsx
import React, { useState } from 'react';
import { 
  Card, 
  CardContent, 
  Typography, 
  Box, 
  Slider, 
  Button,
  Chip
} from '@mui/material';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../../firebase';
import { useAuth } from '../../context/AuthContext';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied';
import SentimentNeutralIcon from '@mui/icons-material/SentimentNeutral';
import SentimentSatisfiedIcon from '@mui/icons-material/SentimentSatisfied';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAltOutlined';

const MoodTracker = ({ onMoodChange, currentMood }) => {
  const { currentUser } = useAuth();
  const [mood, setMood] = useState(currentMood || 3);
  const [energy, setEnergy] = useState(3);
  const [focus, setFocus] = useState(3);
  const [loading, setLoading] = useState(false);
  
  const moodLabels = {
    1: 'Struggling',
    2: 'Challenged',
    3: 'Neutral',
    4: 'Good',
    5: 'Great'
  };
  
  const energyLabels = {
    1: 'Exhausted',
    2: 'Low Energy',
    3: 'Moderate',
    4: 'Energetic',
    5: 'High Energy'
  };
  
  const focusLabels = {
    1: 'Very Distracted',
    2: 'Somewhat Distracted',
    3: 'Neutral',
    4: 'Focused',
    5: 'Deeply Focused'
  };
  
  const moodIcons = {
    1: <SentimentVeryDissatisfiedIcon />,
    2: <SentimentDissatisfiedIcon />,
    3: <SentimentNeutralIcon />,
    4: <SentimentSatisfiedIcon />,
    5: <SentimentSatisfiedAltIcon />
  };
  
  const handleMoodChange = (event, newValue) => {
    setMood(newValue);
    if (onMoodChange) {
      onMoodChange(newValue);
    }
  };
  
  const handleEnergyChange = (event, newValue) => {
    setEnergy(newValue);
  };
  
  const handleFocusChange = (event, newValue) => {
    setFocus(newValue);
  };
  
  const saveMood = async () => {
    if (!currentUser) return;
    
    setLoading(true);
    
    try {
      const moodRef = doc(collection(db, 'moods'));
      await setDoc(moodRef, {
        userId: currentUser.uid,
        mood,
        energy,
        focus,
        timestamp: serverTimestamp()
      });
      
      // Update the user's current mood in their profile
      await setDoc(doc(db, 'users', currentUser.uid), {
        currentMood: {
          mood,
          energy,
          focus,
          timestamp: serverTimestamp()
        }
      }, { merge: true });
      
    } catch (error) {
      console.error("Error saving mood:", error);
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <Card sx={{ height: '100%' }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          How are you feeling today?
        </Typography>
        
        <Box sx={{ mt: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
            <Typography id="mood-slider" gutterBottom sx={{ minWidth: 80 }}>
              Mood:
            </Typography>
            <Chip 
              icon={moodIcons[mood]} 
              label={moodLabels[mood]} 
              color={mood > 3 ? "success" : mood < 3 ? "error" : "default"}
              sx={{ ml: 2 }}
            />
          </Box>
          <Slider
            value={mood}
            onChange={handleMoodChange}
            min={1}
            max={5}
            step={1}
            marks
            aria-labelledby="mood-slider"
          />
        </Box>
        
        <Box sx={{ mt: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
            <Typography id="energy-slider" gutterBottom sx={{ minWidth: 80 }}>
              Energy:
            </Typography>
            <Chip 
              label={energyLabels[energy]} 
              color={energy > 3 ? "success" : energy < 3 ? "warning" : "default"}
              sx={{ ml: 2 }}
            />
          </Box>
          <Slider
            value={energy}
            onChange={handleEnergyChange}
            min={1}
            max={5}
            step={1}
            marks
            aria-labelledby="energy-slider"
          />
        </Box>
        
        <Box sx={{ mt: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
            <Typography id="focus-slider" gutterBottom sx={{ minWidth: 80 }}>
              Focus:
            </Typography>
            <Chip 
              label={focusLabels[focus]} 
              color={focus > 3 ? "success" : focus < 3 ? "warning" : "default"}
              sx={{ ml: 2 }}
            />
          </Box>
          <Slider
            value={focus}
            onChange={handleFocusChange}
            min={1}
            max={5}
            step={1}
            marks
            aria-labelledby="focus-slider"
          />
        </Box>
        
        <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
          <Button 
            variant="contained" 
            onClick={saveMood}
            disabled={loading}
          >
            {loading ? 'Saving...' : 'Save Mood'}
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default MoodTracker;