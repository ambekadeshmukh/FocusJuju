// src/components/legal/TermsOfService.jsx
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

const TermsOfService = () => {
  return (
    <Container maxWidth="md" sx={{ py: 6 }}>
      <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 4 }}>
        <Link color="inherit" component={RouterLink} to="/">
          Home
        </Link>
        <Typography color="text.primary">Terms of Service</Typography>
      </Breadcrumbs>
      
      <Paper elevation={1} sx={{ p: 4, borderRadius: 2 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Terms of Service
        </Typography>
        <Typography variant="subtitle1" color="text.secondary" sx={{ mb: 4 }}>
          Last updated: May 2025
        </Typography>
        
        <Typography variant="body1" paragraph>
          Welcome to FocusJuju! These Terms of Service ("Terms") govern your access to and use of the FocusJuju website and services (the "Service"). Please read these Terms carefully before using the Service.
        </Typography>
        
        <Typography variant="h6" gutterBottom sx={{ mt: 4 }}>
          1. Acceptance of Terms
        </Typography>
        <Typography variant="body1" paragraph>
          By accessing or using the Service, you agree to be bound by these Terms. If you do not agree to these Terms, please do not use the Service.
        </Typography>
        
        <Typography variant="h6" gutterBottom sx={{ mt: 4 }}>
          2. Changes to Terms
        </Typography>
        <Typography variant="body1" paragraph>
          We reserve the right to modify these Terms at any time. We will provide notice of any material changes by posting the updated Terms on our website. Your continued use of the Service after such modifications constitutes your acceptance of the revised Terms.
        </Typography>
        
        <Typography variant="h6" gutterBottom sx={{ mt: 4 }}>
          3. Account Registration
        </Typography>
        <Typography variant="body1" paragraph>
          To access certain features of the Service, you may need to create an account. You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. You agree to provide accurate, current, and complete information during the registration process and to update such information to keep it accurate, current, and complete.
        </Typography>
        
        <Typography variant="h6" gutterBottom sx={{ mt: 4 }}>
          4. Use of the Service
        </Typography>
        <Typography variant="body1" paragraph>
          You agree to use the Service only for lawful purposes and in accordance with these Terms. You agree not to:
        </Typography>
        <Box component="ul" sx={{ pl: 4 }}>
          <Typography component="li" variant="body1" paragraph>
            Use the Service in any way that violates any applicable federal, state, local, or international law or regulation
          </Typography>
          <Typography component="li" variant="body1" paragraph>
            Use the Service to transmit any material that is defamatory, obscene, or offensive
          </Typography>
          <Typography component="li" variant="body1" paragraph>
            Attempt to interfere with, compromise the system integrity or security, or decipher any transmissions to or from the servers running the Service
          </Typography>
          <Typography component="li" variant="body1" paragraph>
            Use the Service for any purpose that is harmful or fraudulent
          </Typography>
        </Box>
        
        <Typography variant="h6" gutterBottom sx={{ mt: 4 }}>
          5. Intellectual Property
        </Typography>
        <Typography variant="body1" paragraph>
          The Service and its original content, features, and functionality are and will remain the exclusive property of FocusJuju and its licensors. The Service is protected by copyright, trademark, and other laws of both the United States and foreign countries.
        </Typography>
        
        <Typography variant="h6" gutterBottom sx={{ mt: 4 }}>
          6. User Content
        </Typography>
        <Typography variant="body1" paragraph>
          You retain all rights to any content you submit, post, or display on or through the Service ("User Content"). By submitting User Content, you grant us a worldwide, non-exclusive, royalty-free license to use, reproduce, modify, adapt, publish, translate, and distribute such content in connection with providing the Service.
        </Typography>
        
        <Typography variant="h6" gutterBottom sx={{ mt: 4 }}>
          7. Privacy
        </Typography>
        <Typography variant="body1" paragraph>
          Your use of the Service is also governed by our Privacy Policy, which is incorporated into these Terms by reference.
        </Typography>
        
        <Typography variant="h6" gutterBottom sx={{ mt: 4 }}>
          8. Termination
        </Typography>
        <Typography variant="body1" paragraph>
          We may terminate or suspend your account and access to the Service immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach these Terms. Upon termination, your right to use the Service will immediately cease.
        </Typography>
        
        <Typography variant="h6" gutterBottom sx={{ mt: 4 }}>
          9. Limitation of Liability
        </Typography>
        <Typography variant="body1" paragraph>
          In no event shall FocusJuju, its directors, employees, partners, agents, suppliers, or affiliates be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from (i) your access to or use of or inability to access or use the Service; (ii) any conduct or content of any third party on the Service; or (iii) unauthorized access, use, or alteration of your transmissions or content.
        </Typography>
        
        <Typography variant="h6" gutterBottom sx={{ mt: 4 }}>
          10. Disclaimer
        </Typography>
        <Typography variant="body1" paragraph>
          Your use of the Service is at your sole risk. The Service is provided on an "AS IS" and "AS AVAILABLE" basis. The Service is provided without warranties of any kind, whether express or implied, including, but not limited to, implied warranties of merchantability, fitness for a particular purpose, non-infringement, or course of performance.
        </Typography>
        
        <Typography variant="h6" gutterBottom sx={{ mt: 4 }}>
          11. Governing Law
        </Typography>
        <Typography variant="body1" paragraph>
          These Terms shall be governed and construed in accordance with the laws of the United States, without regard to its conflict of law provisions. Our failure to enforce any right or provision of these Terms will not be considered a waiver of those rights.
        </Typography>
        
        <Typography variant="h6" gutterBottom sx={{ mt: 4 }}>
          12. Contact Us
        </Typography>
        <Typography variant="body1" paragraph>
          If you have any questions about these Terms, please contact us at:
        </Typography>
        <Typography variant="body1" paragraph>
          Email: terms@focusjuju.com
        </Typography>
      </Paper>
    </Container>
  );
};

export default TermsOfService;