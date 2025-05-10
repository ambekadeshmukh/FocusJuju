// src/components/legal/PrivacyPolicy.jsx
import React from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Paper,
  Breadcrumbs,
  Link
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

const PrivacyPolicy = () => {
  return (
    <Container maxWidth="md" sx={{ py: 6 }}>
      <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 4 }}>
        <Link color="inherit" component={RouterLink} to="/">
          Home
        </Link>
        <Typography color="text.primary">Privacy Policy</Typography>
      </Breadcrumbs>
      
      <Paper elevation={1} sx={{ p: 4, borderRadius: 2 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Privacy Policy
        </Typography>
        <Typography variant="subtitle1" color="text.secondary" sx={{ mb: 4 }}>
          Last updated: May 2025
        </Typography>
        
        <Typography variant="body1" paragraph>
          At FocusJuju, we are committed to protecting your privacy. This Privacy Policy explains how we collect, use, and safeguard your information when you use our website and services.
        </Typography>
        
        <Typography variant="h6" gutterBottom sx={{ mt: 4 }}>
          Information We Collect
        </Typography>
        <Typography variant="body1" paragraph>
          We collect information that you provide directly to us when you:
        </Typography>
        <Box component="ul" sx={{ pl: 4 }}>
          <Typography component="li" variant="body1" paragraph>
            Create an account (name, email address)
          </Typography>
          <Typography component="li" variant="body1" paragraph>
            Use our services (task information, focus session data, mood tracking data)
          </Typography>
          <Typography component="li" variant="body1" paragraph>
            Communicate with us (support requests, feedback)
          </Typography>
        </Box>
        
        <Typography variant="h6" gutterBottom sx={{ mt: 4 }}>
          How We Use Your Information
        </Typography>
        <Typography variant="body1" paragraph>
          We use the information we collect to:
        </Typography>
        <Box component="ul" sx={{ pl: 4 }}>
          <Typography component="li" variant="body1" paragraph>
            Provide, maintain, and improve our services
          </Typography>
          <Typography component="li" variant="body1" paragraph>
            Personalize your experience and deliver content relevant to your preferences
          </Typography>
          <Typography component="li" variant="body1" paragraph>
            Process and complete transactions
          </Typography>
          <Typography component="li" variant="body1" paragraph>
            Send you technical notices, updates, security alerts, and support messages
          </Typography>
          <Typography component="li" variant="body1" paragraph>
            Respond to your comments, questions, and requests
          </Typography>
        </Box>
        
        <Typography variant="h6" gutterBottom sx={{ mt: 4 }}>
          Data Storage and Security
        </Typography>
        <Typography variant="body1" paragraph>
          We use Firebase (a Google service) to store and process your data. Your data is stored securely in accordance with industry standards. We implement appropriate technical and organizational measures to protect your personal information.
        </Typography>
        
        <Typography variant="h6" gutterBottom sx={{ mt: 4 }}>
          Data Sharing and Disclosure
        </Typography>
        <Typography variant="body1" paragraph>
          We do not sell, trade, or otherwise transfer your personally identifiable information to outside parties. We may share your information in the following limited circumstances:
        </Typography>
        <Box component="ul" sx={{ pl: 4 }}>
          <Typography component="li" variant="body1" paragraph>
            With third-party service providers that help us operate our business (e.g., payment processors, hosting providers)
          </Typography>
          <Typography component="li" variant="body1" paragraph>
            To comply with legal obligations
          </Typography>
          <Typography component="li" variant="body1" paragraph>
            To protect our rights, privacy, safety, or property
          </Typography>
          <Typography component="li" variant="body1" paragraph>
            In connection with a business transaction, such as a merger or acquisition
          </Typography>
        </Box>
        
        <Typography variant="h6" gutterBottom sx={{ mt: 4 }}>
          Your Rights and Choices
        </Typography>
        <Typography variant="body1" paragraph>
          You have the following rights regarding your personal information:
        </Typography>
        <Box component="ul" sx={{ pl: 4 }}>
          <Typography component="li" variant="body1" paragraph>
            Access and update your personal information through your account settings
          </Typography>
          <Typography component="li" variant="body1" paragraph>
            Request deletion of your account and associated data
          </Typography>
          <Typography component="li" variant="body1" paragraph>
            Opt-out of promotional communications
          </Typography>
        </Box>
        
        <Typography variant="h6" gutterBottom sx={{ mt: 4 }}>
          Cookies and Tracking Technologies
        </Typography>
        <Typography variant="body1" paragraph>
          We use cookies and similar tracking technologies to track activity on our website and store certain information. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent.
        </Typography>
        
        <Typography variant="h6" gutterBottom sx={{ mt: 4 }}>
          Children's Privacy
        </Typography>
        <Typography variant="body1" paragraph>
          Our services are not intended for children under 13 years of age. We do not knowingly collect personal information from children under 13.
        </Typography>
        
        <Typography variant="h6" gutterBottom sx={{ mt: 4 }}>
          Changes to This Privacy Policy
        </Typography>
        <Typography variant="body1" paragraph>
          We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date.
        </Typography>
        
        <Typography variant="h6" gutterBottom sx={{ mt: 4 }}>
          Contact Us
        </Typography>
        <Typography variant="body1" paragraph>
          If you have any questions about this Privacy Policy, please contact us at:
        </Typography>
        <Typography variant="body1" paragraph>
          Email: privacy@focusjuju.com
        </Typography>
      </Paper>
    </Container>
  );
};

export default PrivacyPolicy;