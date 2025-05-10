// src/App.js
import React, { Suspense, lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { AuthProvider, useAuth } from './context/AuthContext';
import theme from './theme';

// Import components with code splitting
const SignIn = lazy(() => import('./components/auth/SignIn'));
const SignUp = lazy(() => import('./components/auth/SignUp'));
const Dashboard = lazy(() => import('./components/dashboard/Dashboard'));
const BodyDoublingSession = lazy(() => import('./components/session/BodyDoublingSession'));
const MicroGoalSetting = lazy(() => import('./components/goals/MicroGoalSetting'));
const Header = lazy(() => import('./components/common/Header'));
const Footer = lazy(() => import('./components/common/Footer'));
const LandingPage = lazy(() => import('./components/LandingPage'));
const NotFound = lazy(() => import('./components/common/NotFound'));
const Loading = lazy(() => import('./components/common/Loading'));

// Import new demo component
const BodyDoublingDemo = lazy(() => import('./components/demo/BodyDoublingDemo'));

// Import content pages for footer sections
const PrivacyPolicy = lazy(() => import('./components/legal/PrivacyPolicy'));
const TermsOfService = lazy(() => import('./components/legal/TermsOfService'));
const AboutUs = lazy(() => import('./components/info/AboutUs'));
const Contact = lazy(() => import('./components/info/Contact'));
const Blog = lazy(() => import('./components/blog/Blog'));
const ADHDResources = lazy(() => import('./components/resources/ADHDResources'));

// Private Route wrapper
const PrivateRoute = ({ children }) => {
  const { currentUser, loading } = useAuth();
  
  if (loading) {
    return <Loading message="Authenticating..." />;
  }
  
  if (!currentUser) {
    return <Navigate to="/signin" />;
  }
  
  return children;
};

// Public-only route (redirect to dashboard if already logged in)
const PublicOnlyRoute = ({ children }) => {
  const { currentUser, loading } = useAuth();
  
  if (loading) {
    return <Loading message="Authenticating..." />;
  }
  
  if (currentUser) {
    return <Navigate to="/dashboard" />;
  }
  
  return children;
};

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <Suspense fallback={<Loading />}>
          <Header />
          <main style={{ minHeight: 'calc(100vh - 200px)' }}>
              <Routes>
                {/* Public and public-only routes */}
                <Route path="/" element={<LandingPage />} />
                <Route 
                  path="/signin" 
                  element={
                    <PublicOnlyRoute>
                      <SignIn />
                    </PublicOnlyRoute>
                  } 
                />
                <Route 
                  path="/signup" 
                  element={
                    <PublicOnlyRoute>
                      <SignUp />
                    </PublicOnlyRoute>
                  } 
                />
                
                {/* Demo route */}
                <Route path="/demo" element={<BodyDoublingDemo />} />
                
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
                
                {/* Content page routes */}
                <Route path="/privacy" element={<PrivacyPolicy />} />
                <Route path="/terms" element={<TermsOfService />} />
                <Route path="/about" element={<AboutUs />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/resources" element={<ADHDResources />} />
                
                {/* Features pages */}
                <Route path="/features/body-doubling" element={<BodyDoublingDemo />} />
                <Route path="/features/micro-goals" element={<MicroGoalSetting />} />
                
                {/* 404 route */}
                <Route path="*" element={<NotFound />} />
              </Routes>
          </main>
          <Footer />
        </Suspense>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;