// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { AuthProvider, useAuth } from './context/AuthContext';
import theme from './theme';

// Import components
import SignIn from './components/auth/SignIn';
import SignUp from './components/auth/SignUp';
import Dashboard from './components/dashboard/Dashboard';
import BodyDoublingSession from './components/session/BodyDoublingSession';
import MicroGoalSetting from './components/goals/MicroGoalSetting';
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import LandingPage from './components/LandingPage';
import NotFound from './components/common/NotFound';
import Loading from './components/common/Loading';

// Private Route wrapper
const PrivateRoute = ({ children }) => {
  const { currentUser, loading } = useAuth();
  
  if (loading) {
    return <Loading />;
  }
  
  if (!currentUser) {
    return <Navigate to="/signin" />;
  }
  
  return children;
};

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <Router>
          <Header />
          <Routes>
            {/* Public routes */}
            <Route path="/" element={<LandingPage />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            
            {/* Protected routes */}
            <Route 
              path="/dashboard" 
              element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              } 
            />
            <Route 
              path="/session/:id" 
              element={
                <PrivateRoute>
                  <BodyDoublingSession />
                </PrivateRoute>
              } 
            />
            <Route 
              path="/session/new" 
              element={
                <PrivateRoute>
                  <BodyDoublingSession />
                </PrivateRoute>
              } 
            />
            <Route 
              path="/goals" 
              element={
                <PrivateRoute>
                  <MicroGoalSetting />
                </PrivateRoute>
              } 
            />
            
            {/* 404 route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Footer />
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;