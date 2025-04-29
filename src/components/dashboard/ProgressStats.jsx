// src/components/dashboard/ProgressStats.jsx
import React from 'react';
import { 
  Card, 
  CardContent, 
  Typography, 
  Box,
  Divider,
  LinearProgress
} from '@mui/material';
import { 
  Chart as ChartJS, 
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const ProgressStats = ({ sessions = [] }) => {
  // Calculate total focus time (in minutes)
  const totalFocusTime = sessions.reduce((total, session) => {
    const startTime = session.startTime?.toDate ? session.startTime.toDate() : new Date(session.startTime);
    const endTime = session.endTime?.toDate ? session.endTime.toDate() : new Date(session.endTime);
    
    const durationMinutes = Math.round((endTime - startTime) / (1000 * 60));
    return total + durationMinutes;
  }, 0);
  
  // Calculate streak (consecutive days with at least one session)
  const calculateStreak = () => {
    if (sessions.length === 0) return 0;
    
    // Sort sessions by end time (most recent first)
    const sortedSessions = [...sessions].sort((a, b) => {
      const aTime = a.endTime?.toDate ? a.endTime.toDate() : new Date(a.endTime);
      const bTime = b.endTime?.toDate ? b.endTime.toDate() : new Date(b.endTime);
      return bTime - aTime;
    });
    
    // Get unique days
    const uniqueDays = new Set();
    sortedSessions.forEach(session => {
      const endTime = session.endTime?.toDate ? session.endTime.toDate() : new Date(session.endTime);
      const dateStr = endTime.toISOString().split('T')[0];
      uniqueDays.add(dateStr);
    });
    
    // Convert to array and sort
    const days = Array.from(uniqueDays).sort((a, b) => new Date(b) - new Date(a));
    
    // Calculate streak
    let streak = 1;
    const today = new Date().toISOString().split('T')[0];
    
    // Check if today has a session
    if (days[0] !== today) {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      const yesterdayStr = yesterday.toISOString().split('T')[0];
      
      // If no session today or yesterday, streak is 0
      if (days[0] !== yesterdayStr) {
        return 0;
      }
    }
    
    // Count consecutive days
    for (let i = 0; i < days.length - 1; i++) {
      const current = new Date(days[i]);
      const next = new Date(days[i + 1]);
      const diffTime = Math.abs(current - next);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      
      if (diffDays === 1) {
        streak++;
      } else {
        break;
      }
    }
    
    return streak;
  };
  
  const streak = calculateStreak();
  
  // Prepare data for the focus time chart
  const prepareChartData = () => {
    // Get last 7 days
    const dates = [];
    const focusData = [];
    
    for (let i = 6; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const dateStr = date.toISOString().split('T')[0];
      dates.push(dateStr.split('-')[2]); // Just get the day
      
      // Sum focus time for this day
      const dayFocusTime = sessions.reduce((total, session) => {
        const endTime = session.endTime?.toDate ? session.endTime.toDate() : new Date(session.endTime);
        const sessionDateStr = endTime.toISOString().split('T')[0];
        
        if (sessionDateStr === dateStr) {
          const startTime = session.startTime?.toDate ? session.startTime.toDate() : new Date(session.startTime);
          const durationMinutes = Math.round((endTime - startTime) / (1000 * 60));
          return total + durationMinutes;
        }
        
        return total;
      }, 0);
      
      focusData.push(dayFocusTime);
    }
    
    return {
      labels: dates,
      datasets: [
        {
          label: 'Focus Minutes',
          data: focusData,
          borderColor: '#A8D1E7',
          backgroundColor: 'rgba(168, 209, 231, 0.5)',
          tension: 0.3,
          fill: true
        }
      ]
    };
  };
  
  const chartData = prepareChartData();
  
  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        mode: 'index',
        intersect: false
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 30
        }
      }
    },
    maintainAspectRatio: false
  };
  
  // Calculate weekly goal progress (example: 300 minutes per week)
  const weeklyGoal = 300;
  const weeklyProgress = Math.min((totalFocusTime / weeklyGoal) * 100, 100);
  
  return (
    <Card sx={{ height: '100%' }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Your Progress
        </Typography>
        
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
          <Box sx={{ textAlign: 'center', flex: 1 }}>
            <Box sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              backgroundColor: '#A8D1E740',
              borderRadius: '50%',
              width: 48,
              height: 48,
              mb: 1,
              mx: 'auto'
            }}>
              <AccessTimeIcon color="primary" />
            </Box>
            <Typography variant="h6">{totalFocusTime}</Typography>
            <Typography variant="body2" color="text.secondary">Minutes Focused</Typography>
          </Box>
          
          <Divider orientation="vertical" flexItem sx={{ mx: 2 }} />
          
          <Box sx={{ textAlign: 'center', flex: 1 }}>
            <Box sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              backgroundColor: '#9DE0AD40',
              borderRadius: '50%',
              width: 48,
              height: 48,
              mb: 1,
              mx: 'auto'
            }}>
              <EmojiEventsIcon sx={{ color: '#9DE0AD' }} />
            </Box>
            <Typography variant="h6">{streak}</Typography>
            <Typography variant="body2" color="text.secondary">Day Streak</Typography>
          </Box>
        </Box>
        
        <Divider sx={{ my: 3 }} />
        
        <Box sx={{ mb: 2 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
            <Typography variant="body2">Weekly Goal Progress</Typography>
            <Typography variant="body2" fontWeight="bold">{Math.round(weeklyProgress)}%</Typography>
          </Box>
          <LinearProgress 
            variant="determinate" 
            value={weeklyProgress} 
            sx={{ 
              height: 8, 
              borderRadius: 4,
              backgroundColor: '#E0E0E0',
              '& .MuiLinearProgress-bar': {
                backgroundColor: weeklyProgress >= 100 ? '#9DE0AD' : '#A8D1E7'
              }
            }}
          />
          <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 0.5 }}>
            {totalFocusTime} / {weeklyGoal} minutes
          </Typography>
        </Box>
        
        <Box sx={{ mt: 3 }}>
          <Typography variant="subtitle2" sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
            <TrendingUpIcon fontSize="small" sx={{ mr: 1 }} />
            Focus Time (Last 7 Days)
          </Typography>
          <Box sx={{ height: 160 }}>
            <Line data={chartData} options={chartOptions} />
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default ProgressStats;