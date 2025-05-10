// src/components/info/AboutUs.jsx
import React from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Paper,
  Grid,
  Card,
  CardContent,
  Avatar,
  Button,
  Breadcrumbs,
  Link,
  Divider,
  useTheme
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import TwitterIcon from '@mui/icons-material/Twitter';
import RobotAvatar from '../avatar/RobotAvatar';

const AboutUs = () => {
  const theme = useTheme();
  
  // Team members data
  const teamMembers = [
    {
      name: "Alexandra Rivera",
      role: "Founder & CEO",
      bio: "Alex founded FocusJuju after her personal struggles with ADHD. With a background in UX design and psychology, she's passionate about creating tools that help neurodivergent people thrive.",
      avatar: "/images/team/alex.jpg",
      social: {
        linkedin: "https://linkedin.com/in/alexrivera",
        twitter: "https://twitter.com/alexrivera",
        github: "https://github.com/alexrivera"
      }
    },
    {
      name: "Marcus Chen",
      role: "Lead Developer",
      bio: "Marcus brings 10+ years of experience in web development with a focus on creating accessible applications. He's committed to making FocusJuju both powerful and easy to use.",
      avatar: "/images/team/marcus.jpg",
      social: {
        linkedin: "https://linkedin.com/in/marcuschen",
        twitter: "https://twitter.com/marcuschen",
        github: "https://github.com/marcuschen"
      }
    },
    {
      name: "Dr. Priya Sharma",
      role: "Neurodiversity Advisor",
      bio: "Dr. Sharma is a clinical psychologist specializing in ADHD and executive function. She ensures FocusJuju's features are grounded in evidence-based approaches.",
      avatar: "/images/team/priya.jpg",
      social: {
        linkedin: "https://linkedin.com/in/drpriyasharma",
        twitter: "https://twitter.com/drpriyasharma"
      }
    }
  ];
  
  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 4 }}>
        <Link color="inherit" component={RouterLink} to="/">
          Home
        </Link>
        <Typography color="text.primary">About Us</Typography>
      </Breadcrumbs>
      
      {/* Hero Section */}
      <Paper 
        elevation={1} 
        sx={{ 
          p: 6, 
          borderRadius: 2, 
          textAlign: 'center',
          mb: 6,
          background: `linear-gradient(to right, ${theme.palette.primary.light}, ${theme.palette.background.paper})`
        }}
      >
        <Box sx={{ maxWidth: 800, mx: 'auto' }}>
          <Typography variant="h3" component="h1" gutterBottom>
            Our Mission
          </Typography>
          <Typography variant="h5" sx={{ mb: 4, fontWeight: 'normal' }}>
            To create a supportive, AI-powered companion that helps people with focus challenges achieve their goals.
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'center', mb: 4 }}>
            <RobotAvatar mood="happy" size={150} />
          </Box>
          <Typography variant="body1" paragraph>
            FocusJuju was born from a simple observation: working alongside someone else makes it easier to focus. 
            We've reimagined this concept of "body doubling" for the digital age, creating an AI companion that provides 
            the benefits of accountability without the social pressure.
          </Typography>
        </Box>
      </Paper>
      
      {/* Our Story Section */}
      <Grid container spacing={6} sx={{ mb: 8 }} alignItems="center">
        <Grid item xs={12} md={6}>
          <Typography variant="h4" component="h2" gutterBottom>
            Our Story
          </Typography>
          <Typography variant="body1" paragraph>
            FocusJuju began in 2023 when our founder, Alex, was struggling with her ADHD diagnosis and finding it 
            difficult to stay focused while working remotely. Traditional productivity apps weren't cutting it - they 
            were either too rigid or lacked the human element that made body doubling so effective.
          </Typography>
          <Typography variant="body1" paragraph>
            Partnering with neurodiversity experts and developers, Alex set out to create a tool that would provide 
            the benefits of body doubling in a supportive, non-judgmental way. The goal was to create an experience 
            that felt like working with a supportive friend rather than a sterile productivity app.
          </Typography>
          <Typography variant="body1" paragraph>
            Today, FocusJuju is helping thousands of people with ADHD, anxiety, and other focus challenges to be more 
            productive without the stress of traditional productivity methods.
          </Typography>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper 
            elevation={3} 
            sx={{ 
              borderRadius: 4, 
              overflow: 'hidden',
              height: '100%',
              minHeight: 400,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: theme.palette.primary.light
            }}
          >
            <Typography variant="h6" sx={{ p: 4, textAlign: 'center', fontStyle: 'italic' }}>
              "I created FocusJuju because I needed someone to sit with me while I worked, without the pressure 
              of having a real person judging my progress. Our AI buddy is the supportive, non-judgmental companion 
              I always wished for."
              <Box component="span" sx={{ display: 'block', mt: 2, fontWeight: 'bold' }}>
                — Alexandra Rivera, Founder
              </Box>
            </Typography>
          </Paper>
        </Grid>
      </Grid>
      
      {/* Our Values Section */}
      <Box sx={{ mb: 8 }}>
        <Typography variant="h4" component="h2" gutterBottom sx={{ mb: 4 }}>
          Our Values
        </Typography>
        
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Card sx={{ height: '100%' }}>
              <CardContent>
                <Typography variant="h6" gutterBottom sx={{ color: theme.palette.primary.main }}>
                  Neurodiversity-First Design
                </Typography>
                <Typography variant="body1">
                  We believe that tools should adapt to people, not the other way around. FocusJuju is designed 
                  with neurodivergent users in mind from the beginning, not as an afterthought.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          
          <Grid item xs={12} md={4}>
            <Card sx={{ height: '100%' }}>
              <CardContent>
                <Typography variant="h6" gutterBottom sx={{ color: theme.palette.primary.main }}>
                  Compassionate Technology
                </Typography>
                <Typography variant="body1">
                  Technology should support us, not stress us out. We create tools that offer encouragement 
                  and understanding rather than pressure and judgment.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          
          <Grid item xs={12} md={4}>
            <Card sx={{ height: '100%' }}>
              <CardContent>
                <Typography variant="h6" gutterBottom sx={{ color: theme.palette.primary.main }}>
                  Accessibility for All
                </Typography>
                <Typography variant="body1">
                  We believe that helpful tools should be available to everyone who needs them. That's why 
                  FocusJuju is free, open-source, and designed with accessibility in mind.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
      
      {/* Team Section */}
      <Box sx={{ mb: 8 }}>
        <Typography variant="h4" component="h2" gutterBottom sx={{ mb: 4 }}>
          Meet Our Team
        </Typography>
        
        <Grid container spacing={4}>
          {teamMembers.map((member, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Card sx={{ height: '100%' }}>
                <CardContent>
                  <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 2 }}>
                    <Avatar 
                      src={member.avatar} 
                      alt={member.name}
                      sx={{ width: 120, height: 120, mb: 2 }}
                    />
                    <Typography variant="h6" gutterBottom>
                      {member.name}
                    </Typography>
                    <Typography variant="subtitle1" color="text.secondary" gutterBottom>
                      {member.role}
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
                      {member.social.linkedin && (
                        <Link href={member.social.linkedin} target="_blank" rel="noopener noreferrer">
                          <LinkedInIcon />
                        </Link>
                      )}
                      {member.social.twitter && (
                        <Link href={member.social.twitter} target="_blank" rel="noopener noreferrer">
                          <TwitterIcon />
                        </Link>
                      )}
                      {member.social.github && (
                        <Link href={member.social.github} target="_blank" rel="noopener noreferrer">
                          <GitHubIcon />
                        </Link>
                      )}
                    </Box>
                  </Box>
                  <Typography variant="body2">
                    {member.bio}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
      
      {/* Open Source Section */}
      <Paper 
        elevation={1} 
        sx={{ 
          p: 4, 
          borderRadius: 2, 
          textAlign: 'center',
          mb: 6,
          background: theme.palette.background.default
        }}
      >
        <Typography variant="h4" component="h2" gutterBottom>
          Open Source Project
        </Typography>
        <Typography variant="body1" paragraph>
          FocusJuju is an open-source project, which means anyone can contribute to its development or use the code for their own projects.
        </Typography>
        <Typography variant="body1" paragraph>
          We believe in the power of community-driven development to create tools that truly meet users' needs.
        </Typography>
        <Button 
          variant="contained" 
          startIcon={<GitHubIcon />}
          href="https://github.com/focusjuju/focusjuju"
          target="_blank"
          rel="noopener noreferrer"
          sx={{ mt: 2 }}
        >
          View on GitHub
        </Button>
      </Paper>
      
      {/* Contact Section */}
      <Box sx={{ textAlign: 'center' }}>
        <Typography variant="h4" component="h2" gutterBottom>
          Get in Touch
        </Typography>
        <Typography variant="body1" paragraph>
          Have questions, suggestions, or just want to say hello? We'd love to hear from you!
        </Typography>
        <Button 
          variant="contained" 
          component={RouterLink}
          to="/contact"
          sx={{ mt: 2 }}
        >
          Contact Us
        </Button>
      </Box>
    </Container>
  );
};

export default AboutUs;