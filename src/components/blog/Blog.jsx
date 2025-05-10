// src/components/blog/Blog.jsx
import React from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Paper,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Button,
  Breadcrumbs,
  Link,
  Chip,
  InputBase,
  IconButton,
  Divider,
  useTheme
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const Blog = () => {
  const theme = useTheme();
  
  // Sample blog posts data
  const blogPosts = [
    {
      id: 1,
      title: "Understanding Body Doubling for ADHD",
      excerpt: "Learn how the presence of another person can dramatically improve focus for people with ADHD, and how AI can simulate this effect.",
      image: "/images/blog/body-doubling.jpg",
      date: "May 2, 2025",
      author: "Dr. Priya Sharma",
      category: "ADHD",
      tags: ["body doubling", "focus techniques", "ADHD"]
    },
    {
      id: 2,
      title: "5 Micro-Goal Techniques to Beat Procrastination",
      excerpt: "Breaking down tasks is essential for overcoming procrastination. Discover five effective techniques to create achievable micro-goals.",
      image: "/images/blog/micro-goals.jpg",
      date: "April 28, 2025",
      author: "Alexandra Rivera",
      category: "Productivity",
      tags: ["micro-goals", "procrastination", "task management"]
    },
    {
      id: 3,
      title: "The Science of Focus: How Your Brain Concentrates",
      excerpt: "Understanding the neuroscience behind focus can help you optimize your work habits. This post explores the biology of concentration.",
      image: "/images/blog/science-focus.jpg",
      date: "April 15, 2025",
      author: "Dr. Michael Johnson",
      category: "Neuroscience",
      tags: ["focus", "neuroscience", "brain science"]
    },
    {
      id: 4,
      title: "Creating a Distraction-Free Work Environment",
      excerpt: "Your environment significantly impacts your ability to focus. Learn how to set up a workspace that minimizes distractions and enhances productivity.",
      image: "/images/blog/distraction-free.jpg",
      date: "April 5, 2025",
      author: "Jamie Lau",
      category: "Workspace",
      tags: ["environment", "workspace", "distraction management"]
    },
    {
      id: 5,
      title: "How AI is Transforming Productivity Tools",
      excerpt: "Artificial intelligence is revolutionizing how we approach productivity. Explore the latest innovations in AI-powered focus tools.",
      image: "/images/blog/ai-productivity.jpg",
      date: "March 22, 2025",
      author: "Marcus Chen",
      category: "Technology",
      tags: ["AI", "technology", "productivity tools"]
    },
    {
      id: 6,
      title: "The Pomodoro Technique: A Comprehensive Guide",
      excerpt: "The Pomodoro Technique is a time management method that uses focused work sessions and breaks. Learn how to implement it effectively.",
      image: "/images/blog/pomodoro.jpg",
      date: "March 10, 2025",
      author: "Alexandra Rivera",
      category: "Techniques",
      tags: ["pomodoro", "time management", "focus sessions"]
    },
  ];
  
  // Popular categories
  const categories = [
    "ADHD",
    "Productivity",
    "Techniques",
    "Technology",
    "Neuroscience",
    "Workspace",
    "Habits"
  ];
  
  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 4 }}>
        <Link color="inherit" component={RouterLink} to="/">
          Home
        </Link>
        <Typography color="text.primary">Blog</Typography>
      </Breadcrumbs>
      
      {/* Blog Header */}
      <Box sx={{ mb: 6, textAlign: 'center' }}>
        <Typography variant="h3" component="h1" gutterBottom>
          Focus & Productivity Blog
        </Typography>
        <Typography variant="subtitle1" color="text.secondary" sx={{ maxWidth: 700, mx: 'auto' }}>
          Insights, tips, and strategies to help you focus better, manage ADHD, and boost your productivity
        </Typography>
      </Box>
      
      {/* Search and Filter Section */}
      <Paper elevation={1} sx={{ p: 3, borderRadius: 2, mb: 6 }}>
        <Grid container spacing={3} alignItems="center">
          <Grid item xs={12} md={6}>
            <Paper
              component="form"
              sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', border: `1px solid ${theme.palette.divider}` }}
            >
              <InputBase
                sx={{ ml: 1, flex: 1 }}
                placeholder="Search blog posts"
                inputProps={{ 'aria-label': 'search blog posts' }}
              />
              <IconButton type="submit" sx={{ p: '10px' }} aria-label="search">
                <SearchIcon />
              </IconButton>
            </Paper>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
              {categories.map((category) => (
                <Chip 
                  key={category} 
                  label={category} 
                  clickable 
                  variant="outlined"
                  color="primary"
                  size="small"
                />
              ))}
            </Box>
          </Grid>
        </Grid>
      </Paper>
      
      {/* Featured Post */}
      <Paper 
        elevation={2} 
        sx={{ 
          borderRadius: 2, 
          overflow: 'hidden', 
          mb: 6,
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          height: { md: 400 }
        }}
      >
        <Box 
          sx={{ 
            width: { xs: '100%', md: '50%' },
            height: { xs: 250, md: '100%' },
            position: 'relative'
          }}
        >
          <Box
            component="img"
            src="/images/blog/featured-post.jpg"
            alt="Featured Post"
            sx={{
              width: '100%',
              height: '100%',
              objectFit: 'cover'
            }}
          />
          <Chip 
            label="Featured" 
            color="secondary" 
            sx={{ 
              position: 'absolute',
              top: 16,
              left: 16
            }} 
          />
        </Box>
        <Box sx={{ 
          width: { xs: '100%', md: '50%' },
          p: 4,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center'
        }}>
          <Chip 
            label="Productivity" 
            size="small" 
            sx={{ alignSelf: 'flex-start', mb: 2 }} 
          />
          <Typography variant="h4" component="h2" gutterBottom>
            The Ultimate Guide to Body Doubling for Focus
          </Typography>
          <Typography variant="body1" paragraph>
            Body doubling is a powerful technique for improving focus and productivity, especially for people with ADHD. 
            This comprehensive guide explores how it works, why it's effective, and how to implement it in your daily routine.
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2 }}>
            <Typography variant="subtitle2" color="text.secondary">
              By Alex Rivera • May 5, 2025
            </Typography>
            <Button 
              endIcon={<ArrowForwardIcon />}
              component={RouterLink}
              to="/blog/ultimate-guide-body-doubling"
            >
              Read More
            </Button>
          </Box>
        </Box>
      </Paper>
      
      {/* Blog Posts Grid */}
      <Typography variant="h5" component="h2" gutterBottom sx={{ mb: 3 }}>
        Latest Articles
      </Typography>
      
      <Grid container spacing={4}>
        {blogPosts.map((post) => (
          <Grid item xs={12} sm={6} md={4} key={post.id}>
            <Card sx={{ 
              height: '100%', 
              display: 'flex', 
              flexDirection: 'column',
              transition: 'transform 0.3s ease',
              '&:hover': {
                transform: 'translateY(-8px)'
              }
            }}>
              <CardMedia
                component="img"
                height="180"
                image={post.image || `/images/blog/placeholder.jpg`}
                alt={post.title}
              />
              <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                <Chip 
                  label={post.category} 
                  size="small" 
                  sx={{ alignSelf: 'flex-start', mb: 2 }} 
                />
                <Typography variant="h6" component="h3" gutterBottom>
                  {post.title}
                </Typography>
                <Typography variant="body2" color="text.secondary" paragraph sx={{ mb: 2, flex: 1 }}>
                  {post.excerpt}
                </Typography>
                <Divider sx={{ my: 2 }} />
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography variant="caption" color="text.secondary">
                    {post.date}
                  </Typography>
                  <Button 
                    size="small" 
                    endIcon={<ArrowForwardIcon />}
                    component={RouterLink}
                    to={`/blog/${post.id}`}
                  >
                    Read
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      
      {/* Pagination */}
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 6 }}>
        <Button variant="outlined" sx={{ mr: 2 }}>
          Previous
        </Button>
        <Button variant="outlined">
          Next
        </Button>
      </Box>
      
      {/* Newsletter Signup */}
      <Paper 
        elevation={1} 
        sx={{ 
          p: 4, 
          borderRadius: 2, 
          textAlign: 'center',
          mt: 8,
          backgroundColor: theme.palette.primary.light
        }}
      >
        <Typography variant="h5" component="h2" gutterBottom>
          Stay Updated
        </Typography>
        <Typography variant="body1" sx={{ mb: 3, maxWidth: 600, mx: 'auto' }}>
          Subscribe to our newsletter for the latest productivity tips, ADHD strategies, and FocusJuju updates.
        </Typography>
        <Box 
          component="form" 
          sx={{ 
            display: 'flex', 
            flexDirection: { xs: 'column', sm: 'row' },
            gap: 2,
            maxWidth: 500,
            mx: 'auto'
          }}
        >
          <InputBase
            sx={{ 
              flex: 1, 
              backgroundColor: 'white', 
              p: 1, 
              borderRadius: 1,
              pl: 2
            }}
            placeholder="Your email address"
            inputProps={{ 'aria-label': 'email for newsletter' }}
          />
          <Button variant="contained">
            Subscribe
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default Blog;