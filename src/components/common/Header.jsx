// src/components/common/Header.jsx
import React, { useState } from 'react';
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
  useMediaQuery
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { Link as RouterLink, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { signOut } from 'firebase/auth';
import { auth } from '../../firebase';

// Icons
import MenuIcon from '@mui/icons-material/Menu';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import FlagIcon from '@mui/icons-material/Flag';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const Header = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const { currentUser, userProfile } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const menuOpen = Boolean(anchorEl);
  
  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  
  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  
  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };
  
  const handleLogout = async () => {
    try {
      await signOut(auth);
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
  
  const drawer = (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={() => setDrawerOpen(false)}
    >
      <Box sx={{ p: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
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
        <Typography variant="subtitle1">
          {userProfile?.name || currentUser?.displayName || 'User'}
        </Typography>
      </Box>
      <Divider />
      <List>
        {menuItems.map((item) => (
          <ListItem 
            button 
            key={item.text} 
            component={RouterLink} 
            to={item.path}
            selected={isActive(item.path)}
          >
            <ListItemIcon>
              {item.icon}
            </ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        <ListItem button onClick={handleLogout}>
          <ListItemIcon>
            <LogoutIcon />
          </ListItemIcon>
          <ListItemText primary="Logout" />
        </ListItem>
      </List>
    </Box>
  );
  
  return (
    <>
      <AppBar position="static" color="default" elevation={1}>
        <Toolbar>
          {currentUser && (
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { md: 'none' } }}
            >
              <MenuIcon />
            </IconButton>
          )}
          
          <Typography 
            variant="h6" 
            component={RouterLink} 
            to="/"
            sx={{ 
              fontFamily: "'Nunito', sans-serif", 
              fontWeight: 700,
              textDecoration: 'none',
              color: 'inherit',
              flexGrow: 1 
            }}
          >
            FocusJuju
          </Typography>
          
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
                      borderBottom: isActive(item.path) ? `2px solid ${theme.palette.primary.main}` : 'none'
                    }}
                    startIcon={item.icon}
                  >
                    {item.text}
                  </Button>
                ))}
                
                <Box sx={{ ml: 2 }}>
                  <IconButton
                    onClick={handleProfileMenuOpen}
                    size="small"
                    edge="end"
                    aria-label="account of current user"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    color="inherit"
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
                </Box>
              </Box>
              
              {/* Profile menu */}
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={menuOpen}
                onClose={handleMenuClose}
              >
                <MenuItem onClick={() => {
                  handleMenuClose();
                  navigate('/profile');
                }}>
                  <ListItemIcon>
                    <AccountCircleIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText>Profile</ListItemText>
                </MenuItem>
                <MenuItem onClick={() => {
                  handleMenuClose();
                  navigate('/settings');
                }}>
                  <ListItemIcon>
                    <SettingsIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText>Settings</ListItemText>
                </MenuItem>
                <Divider />
                <MenuItem onClick={() => {
                  handleMenuClose();
                  handleLogout();
                }}>
                  <ListItemIcon>
                    <LogoutIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText>Logout</ListItemText>
                </MenuItem>
              </Menu>
            </>
          ) : (
            // Login/Register buttons for logged out users
            <Box>
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
      </AppBar>
      
      {/* Mobile drawer */}
      <Drawer
        variant="temporary"
        open={drawerOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better mobile performance
        }}
      >
        {drawer}
      </Drawer>
    </>
  );
};

export default Header;