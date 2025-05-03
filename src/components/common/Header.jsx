// src/components/common/Header.jsx
import React, { useState, useEffect } from 'react';
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Button, 
  Box, 
  IconButton, 
  Avatar,
  Menu,
  MenuItem,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  useMediaQuery,
  Container,
  Tooltip,
  Badge,
  useScrollTrigger,
  Slide
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { Link as RouterLink, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { motion } from 'framer-motion';

// Icons
import MenuIcon from '@mui/icons-material/Menu';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import FlagIcon from '@mui/icons-material/Flag';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import NotificationsIcon from '@mui/icons-material/Notifications';
import CloseIcon from '@mui/icons-material/Close';

// Hide header on scroll down
function HideOnScroll(props) {
  const { children } = props;
  const trigger = useScrollTrigger();

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

const Header = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const { currentUser, userProfile, signOut } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [profileMenuAnchor, setProfileMenuAnchor] = useState(null);
  const [notificationsMenuAnchor, setNotificationsMenuAnchor] = useState(null);
  const [notifications, setNotifications] = useState([]);
  
  const profileMenuOpen = Boolean(profileMenuAnchor);
  const notificationsMenuOpen = Boolean(notificationsMenuAnchor);
  
  // Example notifications - in a real app, these would come from backend
  useEffect(() => {
    // Only set example notifications if user is logged in
    if (currentUser) {
      setNotifications([
        {
          id: 1,
          message: "You've completed 3 focus sessions this week!",
          type: "achievement",
          read: false
        },
        {
          id: 2,
          message: "Try breaking down your tasks for better progress",
          type: "tip",
          read: true
        }
      ]);
    } else {
      setNotifications([]);
    }
  }, [currentUser]);
  
  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };
  
  const handleProfileMenuOpen = (event) => {
    setProfileMenuAnchor(event.currentTarget);
  };
  
  const handleNotificationsMenuOpen = (event) => {
    setNotificationsMenuAnchor(event.currentTarget);
    // Mark all notifications as read
    setNotifications(prev => 
      prev.map(notification => ({ ...notification, read: true }))
    );
  };
  
  const handleMenuClose = () => {
    setProfileMenuAnchor(null);
    setNotificationsMenuAnchor(null);
  };
  
  const handleLogout = async () => {
    handleMenuClose();
    try {
      await signOut();
      navigate('/');
    } catch (error) {
      console.error("Logout error:", error);
    }
  };
  
  const isActive = (path) => {
    return location.pathname === path;
  };
  
  const menuItems = [
    { text: 'Dashboard', icon: <DashboardIcon />, path: '/dashboard' },
    { text: 'Focus Session', icon: <AccessTimeIcon />, path: '/session/new' },
    { text: 'Micro-Goals', icon: <FlagIcon />, path: '/goals' }
  ];
  
  const unreadNotificationsCount = notifications.filter(n => !n.read).length;
  
  const drawer = (
    <Box
      sx={{ width: 280 }}
      role="presentation"
      onClick={() => setDrawerOpen(false)}
    >
      {currentUser ? (
        <>
          <Box sx={{ p: 3, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Avatar 
              src={currentUser?.photoURL} 
              alt={userProfile?.name || currentUser?.displayName}
              sx={{ width: 64, height: 64, mb: 1 }}
            >
              {(!currentUser?.photoURL && (userProfile?.name || currentUser?.displayName)) 
                ? (userProfile?.name || currentUser?.displayName)[0].toUpperCase()
                : <AccountCircleIcon />
              }
            </Avatar>
            <Typography variant="subtitle1" fontWeight="bold">
              {userProfile?.name || currentUser?.displayName || 'User'}
            </Typography>
          </Box>
          <Divider />
          <List sx={{ p: 1 }}>
            {menuItems.map((item) => (
              <ListItem 
                button 
                key={item.text} 
                component={RouterLink} 
                to={item.path}
                selected={isActive(item.path)}
                sx={{
                  borderRadius: 2,
                  mb: 0.5,
                  '&.Mui-selected': {
                    backgroundColor: theme.palette.primary.light,
                    '&:hover': {
                      backgroundColor: theme.palette.primary.light
                    }
                  }
                }}
              >
                <ListItemIcon>
                  {item.icon}
                </ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItem>
            ))}
          </List>
          <Divider />
          <List sx={{ p: 1 }}>
            <ListItem 
              button 
              sx={{
                borderRadius: 2,
                mb: 0.5
              }}
              onClick={handleLogout}
            >
              <ListItemIcon>
                <LogoutIcon />
              </ListItemIcon>
              <ListItemText primary="Logout" />
            </ListItem>
          </List>
        </>
      ) : (
        <Box sx={{ p: 3, display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant="h6">FocusJuju</Typography>
            <IconButton
              onClick={() => setDrawerOpen(false)}
            >
              <CloseIcon />
            </IconButton>
          </Box>
          <Divider />
          <Button 
            variant="contained" 
            fullWidth 
            component={RouterLink} 
            to="/signin"
            sx={{ mt: 2 }}
          >
            Sign In
          </Button>
          <Button 
            variant="outlined" 
            fullWidth 
            component={RouterLink} 
            to="/signup"
          >
            Sign Up
          </Button>
        </Box>
      )}
    </Box>
  );
  
  return (
    <>
      <HideOnScroll>
        <AppBar 
          position="sticky" 
          color="default" 
          elevation={0}
          sx={{ 
            backgroundColor: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(20px)'
          }}
        >
          <Container maxWidth="lg">
            <Toolbar disableGutters sx={{ justifyContent: 'space-between' }}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <IconButton
                  color="inherit"
                  aria-label="open drawer"
                  edge="start"
                  onClick={handleDrawerToggle}
                  sx={{ mr: 2 }}
                >
                  <MenuIcon />
                </IconButton>
                
                <Typography 
                  variant="h6" 
                  component={RouterLink} 
                  to="/"
                  sx={{ 
                    fontFamily: "'Nunito', sans-serif", 
                    fontWeight: 700,
                    textDecoration: 'none',
                    color: 'inherit'
                  }}
                >
                  FocusJuju
                </Typography>
              </Box>
              
              {currentUser ? (
                <>
                  {/* Desktop navigation */}
                  <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center' }}>
                    {menuItems.map((item) => (
                      <Button
                        key={item.text}
                        component={RouterLink}
                        to={item.path}
                        color="inherit"
                        sx={{ 
                          mx: 1,
                          fontWeight: isActive(item.path) ? 'bold' : 'normal',
                          borderBottom: isActive(item.path) ? `2px solid ${theme.palette.primary.main}` : 'none',
                          borderRadius: 0,
                          py: 2
                        }}
                        startIcon={item.icon}
                      >
                        {item.text}
                      </Button>
                    ))}
                  </Box>
                  
                  {/* User actions (notifications, profile) */}
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Tooltip title="Notifications">
                      <IconButton
                        onClick={handleNotificationsMenuOpen}
                        size="large"
                        aria-label="show notifications"
                        aria-controls="menu-notifications"
                        aria-haspopup="true"
                        color="inherit"
                      >
                        <Badge badgeContent={unreadNotificationsCount} color="secondary">
                          <NotificationsIcon />
                        </Badge>
                      </IconButton>
                    </Tooltip>
                    
                    <Tooltip title="Account">
                      <IconButton
                        onClick={handleProfileMenuOpen}
                        size="small"
                        edge="end"
                        aria-label="account of current user"
                        aria-controls="menu-appbar"
                        aria-haspopup="true"
                        color="inherit"
                        sx={{ ml: 1 }}
                      >
                        <Avatar 
                          src={currentUser?.photoURL} 
                          alt={userProfile?.name || currentUser?.displayName}
                          sx={{ width: 32, height: 32 }}
                        >
                          {(!currentUser?.photoURL && (userProfile?.name || currentUser?.displayName)) 
                            ? (userProfile?.name || currentUser?.displayName)[0].toUpperCase()
                            : <AccountCircleIcon />
                          }
                        </Avatar>
                      </IconButton>
                    </Tooltip>
                  </Box>
                  
                  {/* Profile menu */}
                  <Menu
                    id="menu-appbar"
                    anchorEl={profileMenuAnchor}
                    anchorOrigin={{
                      vertical: 'bottom',
                      horizontal: 'right',
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                    open={profileMenuOpen}
                    onClose={handleMenuClose}
                    PaperProps={{
                      elevation: 3,
                      sx: { mt: 1, minWidth: 180 }
                    }}
                  >
                    <MenuItem 
                      onClick={() => {
                        handleMenuClose();
                        navigate('/profile');
                      }}
                      dense
                    >
                      <ListItemIcon>
                        <AccountCircleIcon fontSize="small" />
                      </ListItemIcon>
                      <ListItemText>Profile</ListItemText>
                    </MenuItem>
                    <MenuItem 
                      onClick={() => {
                        handleMenuClose();
                        navigate('/settings');
                      }}
                      dense
                    >
                      <ListItemIcon>
                        <SettingsIcon fontSize="small" />
                      </ListItemIcon>
                      <ListItemText>Settings</ListItemText>
                    </MenuItem>
                    <Divider />
                    <MenuItem 
                      onClick={handleLogout}
                      dense
                    >
                      <ListItemIcon>
                        <LogoutIcon fontSize="small" />
                      </ListItemIcon>
                      <ListItemText>Logout</ListItemText>
                    </MenuItem>
                  </Menu>
                  
                  {/* Notifications menu */}
                  <Menu
                    id="menu-notifications"
                    anchorEl={notificationsMenuAnchor}
                    anchorOrigin={{
                      vertical: 'bottom',
                      horizontal: 'right',
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: 'top',
                      horizontal: 'right',
                    }}
                    open={notificationsMenuOpen}
                    onClose={handleMenuClose}
                    PaperProps={{
                      elevation: 3,
                      sx: { mt: 1, width: 320 }
                    }}
                  >
                    <Box sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Typography variant="subtitle1" fontWeight="bold">Notifications</Typography>
                      {notifications.length > 0 && (
                        <Button 
                          size="small" 
                          onClick={() => setNotifications([])}
                        >
                          Clear All
                        </Button>
                      )}
                    </Box>
                    <Divider />
                    {notifications.length === 0 ? (
                      <Box sx={{ p: 3, textAlign: 'center' }}>
                        <Typography variant="body2" color="text.secondary">
                          No notifications
                        </Typography>
                      </Box>
                    ) : (
                      notifications.map((notification) => (
                        <MenuItem 
                          key={notification.id}
                          onClick={handleMenuClose}
                          sx={{
                            py: 1.5,
                            borderLeft: notification.read ? 'none' : `4px solid ${theme.palette.primary.main}`,
                            backgroundColor: notification.read ? 'inherit' : 'rgba(0, 0, 0, 0.02)'
                          }}
                        >
                          <ListItemText 
                            primary={notification.message}
                            secondary={notification.type === 'achievement' ? 'Achievement' : 'Tip'}
                          />
                        </MenuItem>
                      ))
                    )}
                  </Menu>
                </>
              ) : (
                // Login/Register buttons for logged out users
                <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                  <Button 
                    color="inherit" 
                    component={RouterLink} 
                    to="/signin"
                    sx={{ mr: 1 }}
                  >
                    Sign In
                  </Button>
                  <Button 
                    variant="contained" 
                    color="primary" 
                    component={RouterLink} 
                    to="/signup"
                  >
                    Sign Up
                  </Button>
                </Box>
              )}
            </Toolbar>
          </Container>
        </AppBar>
      </HideOnScroll>
      
      {/* Mobile drawer */}
      <Drawer
        variant="temporary"
        open={drawerOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better mobile performance
        }}
        PaperProps={{
          sx: {
            width: { xs: '100%', sm: 280 }
          }
        }}
      >
        {drawer}
      </Drawer>
    </>
  );
};

export default Header;