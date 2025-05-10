// src/components/resources/ADHDResources.jsx
import React from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Paper,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  Breadcrumbs,
  Link,
  Chip,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  useTheme
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import BookIcon from '@mui/icons-material/Book';
import LanguageIcon from '@mui/icons-material/Language';
import VideocamIcon from '@mui/icons-material/Videocam';
import PodcastsIcon from '@mui/icons-material/Podcasts';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import GroupIcon from '@mui/icons-material/Group';
import SchoolIcon from '@mui/icons-material/School';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

const ADHDResources = () => {
  const theme = useTheme();
  
  // Resource categories
  const categories = [
    {
      title: "Educational Resources",
      icon: <SchoolIcon />,
      description: "Learn about ADHD from reputable sources and experts.",
      color: theme.palette.primary.light
    },
    {
      title: "Books & Reading",
      icon: <BookIcon />,
      description: "Recommended books about ADHD, focus, and productivity.",
      color: theme.palette.secondary.light
    },
    {
      title: "Websites & Blogs",
      icon: <LanguageIcon />,
      description: "Online resources with ADHD information and tips.",
      color: "#F0F7FF"
    },
    {
      title: "Videos & Courses",
      icon: <VideocamIcon />,
      description: "Visual and interactive content about managing ADHD.",
      color: "#F0FFF5"
    },
    {
      title: "Podcasts",
      icon: <PodcastsIcon />,
      description: "Audio content focused on ADHD and productivity.",
      color: "#FFF8F0"
    },
    {
      title: "Communities & Support",
      icon: <GroupIcon />,
      description: "Connect with others who understand ADHD challenges.",
      color: "#F5F0FF"
    }
  ];
  
  // Educational Resources
  const educationalResources = [
    {
      title: "CHADD - Children and Adults with ADHD",
      description: "A leading resource on ADHD, providing evidence-based information and support.",
      link: "https://chadd.org/",
      tags: ["official", "research", "support"]
    },
    {
      title: "ADDitude Magazine",
      description: "A comprehensive resource for ADHD information, strategies, and support.",
      link: "https://www.additudemag.com/",
      tags: ["magazine", "strategies", "news"]
    },
    {
      title: "Understood.org",
      description: "Resources for learning and attention issues, including ADHD.",
      link: "https://www.understood.org/",
      tags: ["learning disabilities", "parents", "educators"]
    },
    {
      title: "ADHD Awareness Month",
      description: "Educational resources and events for ADHD awareness.",
      link: "https://adhdawarenessmonth.org/",
      tags: ["awareness", "education", "events"]
    }
  ];
  
  // Book recommendations
  const bookRecommendations = [
    {
      title: "Driven to Distraction",
      author: "Edward M. Hallowell & John J. Ratey",
      description: "A comprehensive guide to understanding and managing ADHD.",
      tags: ["classic", "diagnosis", "treatment"]
    },
    {
      title: "Taking Charge of Adult ADHD",
      author: "Russell A. Barkley",
      description: "Practical strategies for managing ADHD in adulthood.",
      tags: ["self-help", "strategies", "adults"]
    },
    {
      title: "The ADHD Effect on Marriage",
      author: "Melissa Orlov",
      description: "How ADHD affects relationships and strategies to strengthen them.",
      tags: ["relationships", "couples", "communication"]
    },
    {
      title: "A Radical Guide for Women with ADHD",
      author: "Sari Solden & Michelle Frank",
      description: "Empowering strategies specifically for women with ADHD.",
      tags: ["women", "empowerment", "gender-specific"]
    },
    {
      title: "Focused Forward",
      author: "James M. Ochoa",
      description: "Navigating the emotional journey of living with ADHD.",
      tags: ["emotional health", "mindfulness", "personal journey"]
    }
  ];
  
  // Productivity strategies
  const productivityStrategies = [
    {
      title: "Body Doubling",
      description: "Working alongside someone else to increase accountability and focus.",
      tips: [
        "Join virtual co-working sessions",
        "Use FocusJuju's AI body doubling feature",
        "Schedule regular sessions with a friend or colleague"
      ]
    },
    {
      title: "Pomodoro Technique",
      description: "Using timed work intervals (typically 25 minutes) followed by short breaks.",
      tips: [
        "Start with shorter sessions if 25 minutes feels too long",
        "Use a timer that's visible but not distracting",
        "Plan rewards for completed pomodoros"
      ]
    },
    {
      title: "Task Chunking",
      description: "Breaking large projects into smaller, manageable tasks.",
      tips: [
        "Use FocusJuju's micro-goal setting feature",
        "Make each chunk small enough to complete in 15-30 minutes",
        "Focus on action-oriented steps rather than outcomes"
      ]
    },
    {
      title: "Environmental Modifications",
      description: "Adapting your workspace to minimize distractions and support focus.",
      tips: [
        "Use noise-cancelling headphones or background noise",
        "Keep your workspace visually simple",
        "Have fidget tools available for restless energy"
      ]
    },
    {
      title: "Visual Reminders",
      description: "Creating external cues to stay on task and remember important information.",
      tips: [
        "Use sticky notes in prominent places",
        "Create visual schedules or charts",
        "Set multiple alarms for important deadlines"
      ]
    }
  ];
  
  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 4 }}>
        <Link color="inherit" component={RouterLink} to="/">
          Home
        </Link>
        <Typography color="text.primary">ADHD Resources</Typography>
      </Breadcrumbs>
      
      {/* Header Section */}
      <Box sx={{ mb: 6 }}>
        <Typography variant="h3" component="h1" gutterBottom>
          ADHD Resources
        </Typography>
        <Typography variant="subtitle1" color="text.secondary" gutterBottom>
          A curated collection of resources to help you understand and manage ADHD effectively.
        </Typography>
        <Typography variant="body1">
          Whether you're newly diagnosed, supporting someone with ADHD, or looking to expand your 
          knowledge, these resources can help you navigate the challenges and harness the strengths 
          associated with ADHD.
        </Typography>
      </Box>
      
      {/* Resource Categories */}
      <Grid container spacing={3} sx={{ mb: 6 }}>
        {categories.map((category, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card sx={{ 
              height: '100%', 
              display: 'flex', 
              flexDirection: 'column',
              backgroundColor: category.color
            }}>
              <CardContent sx={{ flexGrow: 1 }}>
                <Box sx={{ display: 'flex', mb: 2 }}>
                  {category.icon}
                </Box>
                <Typography variant="h6" component="h2" gutterBottom>
                  {category.title}
                </Typography>
                <Typography variant="body2">
                  {category.description}
                </Typography>
              </CardContent>
              <CardActions>
                <Button 
                  size="small"
                  href={`#${category.title.toLowerCase().replace(/ & /g, '-').replace(/ /g, '-')}`}
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById(category.title.toLowerCase().replace(/ & /g, '-').replace(/ /g, '-')).scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  Explore
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
      
      {/* Educational Resources Section */}
      <Box id="educational-resources" sx={{ mb: 6, scrollMarginTop: '100px' }}>
        <Paper elevation={1} sx={{ p: 3, borderRadius: 2 }}>
          <Typography variant="h5" component="h2" gutterBottom>
            <SchoolIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
            Educational Resources
          </Typography>
          <Divider sx={{ mb: 3 }} />
          
          <Grid container spacing={3}>
            {educationalResources.map((resource, index) => (
              <Grid item xs={12} sm={6} key={index}>
                <Card variant="outlined" sx={{ height: '100%' }}>
                  <CardContent>
                    <Typography variant="h6" component="h3" gutterBottom>
                      {resource.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" paragraph>
                      {resource.description}
                    </Typography>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mb: 2 }}>
                      {resource.tags.map((tag, i) => (
                        <Chip key={i} label={tag} size="small" />
                      ))}
                    </Box>
                  </CardContent>
                  <CardActions>
                    <Button 
                      size="small" 
                      href={resource.link} 
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Visit Website
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Paper>
      </Box>
      
      {/* Books & Reading Section */}
      <Box id="books-&-reading" sx={{ mb: 6, scrollMarginTop: '100px' }}>
        <Paper elevation={1} sx={{ p: 3, borderRadius: 2 }}>
          <Typography variant="h5" component="h2" gutterBottom>
            <BookIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
            Books & Reading
          </Typography>
          <Divider sx={{ mb: 3 }} />
          
          <Typography variant="body1" paragraph>
            These books offer valuable insights and strategies for understanding and managing ADHD.
          </Typography>
          
          <Grid container spacing={3}>
            {bookRecommendations.map((book, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Card variant="outlined" sx={{ height: '100%' }}>
                  <CardContent>
                    <Typography variant="h6" component="h3" gutterBottom>
                      {book.title}
                    </Typography>
                    <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                      by {book.author}
                    </Typography>
                    <Typography variant="body2" paragraph>
                      {book.description}
                    </Typography>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                      {book.tags.map((tag, i) => (
                        <Chip key={i} label={tag} size="small" />
                      ))}
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Paper>
      </Box>
      
      {/* Productivity Strategies Section */}
      <Box sx={{ mb: 6 }}>
        <Paper elevation={1} sx={{ p: 3, borderRadius: 2 }}>
          <Typography variant="h5" component="h2" gutterBottom>
            Productivity Strategies for ADHD
          </Typography>
          <Divider sx={{ mb: 3 }} />
          
          <Typography variant="body1" paragraph>
            These evidence-based strategies can help manage ADHD symptoms and improve productivity.
          </Typography>
          
          {productivityStrategies.map((strategy, index) => (
            <Accordion key={index}>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography variant="h6">{strategy.title}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography variant="body1" paragraph>
                  {strategy.description}
                </Typography>
                <Typography variant="subtitle2" gutterBottom>
                  Implementation Tips:
                </Typography>
                <List dense>
                  {strategy.tips.map((tip, i) => (
                    <ListItem key={i}>
                      <ListItemIcon sx={{ minWidth: 36 }}>
                        <CheckCircleOutlineIcon color="primary" fontSize="small" />
                      </ListItemIcon>
                      <ListItemText primary={tip} />
                    </ListItem>
                  ))}
                </List>
              </AccordionDetails>
            </Accordion>
          ))}
          
          <Box sx={{ mt: 3, textAlign: 'center' }}>
            <Button 
              variant="contained"
              component={RouterLink}
              to="/blog"
            >
              Read Our Blog for More Tips
            </Button>
          </Box>
        </Paper>
      </Box>
      
      {/* Finding Professional Help Section */}
      <Box sx={{ mb: 6 }}>
        <Paper elevation={1} sx={{ p: 3, borderRadius: 2 }}>
          <Typography variant="h5" component="h2" gutterBottom>
            <MedicalServicesIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
            Finding Professional Help
          </Typography>
          <Divider sx={{ mb: 3 }} />
          
          <Typography variant="body1" paragraph>
            While self-help strategies and resources are valuable, professional support is often essential 
            for managing ADHD effectively. Here are some resources to help you find qualified professionals:
          </Typography>
          
          <List>
            <ListItem>
              <ListItemIcon>
                <CheckCircleOutlineIcon />
              </ListItemIcon>
              <ListItemText 
                primary="CHADD Professional Directory" 
                secondary="Search for ADHD specialists in your area."
              />
              <Button 
                variant="outlined" 
                size="small"
                href="https://chadd.org/professional-directory/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Visit
              </Button>
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <CheckCircleOutlineIcon />
              </ListItemIcon>
              <ListItemText 
                primary="Psychology Today Therapist Finder" 
                secondary="Search for therapists who specialize in ADHD."
              />
              <Button 
                variant="outlined" 
                size="small"
                href="https://www.psychologytoday.com/us/therapists/adhd"
                target="_blank"
                rel="noopener noreferrer"
              >
                Visit
              </Button>
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <CheckCircleOutlineIcon />
              </ListItemIcon>
              <ListItemText 
                primary="ADHD Coaches Organization" 
                secondary="Find a coach who specializes in helping people with ADHD."
              />
              <Button 
                variant="outlined" 
                size="small"
                href="https://www.adhdcoaches.org/find-a-coach"
                target="_blank"
                rel="noopener noreferrer"
              >
                Visit
              </Button>
            </ListItem>
          </List>
          
          <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
            Note: FocusJuju is designed to complement, not replace, professional treatment for ADHD. 
            We recommend working with healthcare providers to develop a comprehensive approach to managing ADHD.
          </Typography>
        </Paper>
      </Box>
      
      {/* Call to Action */}
      <Box sx={{ textAlign: 'center', mt: 8, mb: 4 }}>
        <Typography variant="h5" gutterBottom>
          How FocusJuju Can Help
        </Typography>
        <Typography variant="body1" sx={{ maxWidth: 800, mx: 'auto', mb: 3 }}>
          FocusJuju complements these resources by providing practical tools designed specifically 
          for people with ADHD and focus challenges. Our AI-powered body doubling, micro-goal setting, 
          and personalized support can help you implement the strategies you learn about.
        </Typography>
        <Button 
          variant="contained" 
          size="large"
          component={RouterLink}
          to="/signup"
        >
          Start Using FocusJuju
        </Button>
      </Box>
    </Container>
  );
};

export default ADHDResources;