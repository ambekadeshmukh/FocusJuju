# FocusJuju Deployment Guide

This guide covers how to deploy the FocusJuju application to production using various hosting options.

## Prerequisites

- Node.js (v16+) and npm installed
- Firebase account created
- OpenAI API key (optional)
- Git installed

## Option 1: Firebase Hosting (Recommended)

Firebase offers an integrated solution for hosting, authentication, and database needs.

### Step 1: Install Firebase CLI

```bash
npm install -g firebase-tools
```

### Step 2: Login to Firebase

```bash
firebase login
```

### Step 3: Initialize Firebase in your project

```bash
firebase init
```

Select the following features:
- Firestore
- Hosting
- Storage (optional)
- Emulators (for local development)

### Step 4: Configure Environment Variables

Create a `.env` file in your project root (following the `.env.example` template) with your Firebase and OpenAI API credentials.

### Step 5: Build and Deploy

```bash
npm run build
firebase deploy
```

Your app will be deployed to `https://your-project-id.web.app`.

## Option 2: Vercel Deployment

Vercel provides a smooth deployment experience for React applications.

### Step 1: Install Vercel CLI

```bash
npm install -g vercel
```

### Step 2: Login to Vercel

```bash
vercel login
```

### Step 3: Deploy to Vercel

From your project directory:

```bash
vercel
```

Follow the prompts to complete the deployment. Make sure to set your environment variables in the Vercel dashboard.

## Option 3: Netlify Deployment

Netlify is another excellent option for hosting React applications.

### Step 1: Install Netlify CLI

```bash
npm install -g netlify-cli
```

### Step 2: Login to Netlify

```bash
netlify login
```

### Step 3: Deploy to Netlify

```bash
netlify deploy
```

Follow the prompts to complete the deployment. Configure your environment variables in the Netlify dashboard.

## Setting Up Continuous Deployment

### GitHub Actions (Already Configured)

The repository already includes GitHub Actions workflows for continuous integration and deployment. To use them:

1. Add the following secrets to your GitHub repository:
   - `REACT_APP_FIREBASE_API_KEY`
   - `REACT_APP_FIREBASE_AUTH_DOMAIN`
   - `REACT_APP_FIREBASE_PROJECT_ID`
   - `REACT_APP_FIREBASE_STORAGE_BUCKET`
   - `REACT_APP_FIREBASE_MESSAGING_SENDER_ID`
   - `REACT_APP_FIREBASE_APP_ID`
   - `REACT_APP_OPENAI_API_KEY` (optional)
   - `FIREBASE_SERVICE_ACCOUNT` (JSON object with your Firebase service account credentials)

2. Push to the main branch and the workflow will automatically deploy your application.

## Post-Deployment Steps

1. **Configure Custom Domain**: In your hosting platform (Firebase, Vercel, or Netlify), add and verify your custom domain.

2. **Set Up SSL**: All platforms mentioned provide free SSL certificates.

3. **Monitor Performance**: Use tools like Google Lighthouse to check performance and make necessary optimizations.

4. **Set Up Analytics**: Consider adding Google Analytics or Firebase Analytics to track user interactions.

## Scaling Considerations

### Firebase Firestore

The free tier of Firebase Firestore includes:
- 50K reads/day
- 20K writes/day
- 20K deletes/day
- 1 GB stored data

If you expect to exceed these limits, consider upgrading to a paid plan.

### OpenAI API

Monitor your OpenAI API usage carefully. Consider implementing:
- Rate limiting
- Caching common responses
- Fallback to local models when possible

## Backup and Disaster Recovery

1. **Database Backups**: Set up regular exports of your Firestore data using Firebase Admin SDK.

2. **Version Control**: Keep your codebase and configuration files in version control.

3. **Multiple Environments**: Consider setting up development, staging, and production environments.

## Security Checklist

- ✅ Secure Firebase Rules implemented
- ✅ Environment variables properly configured
- ✅ Authentication flows tested
- ✅ No API keys exposed in client-side code
- ✅ Regular dependency updates
- ✅ Content Security Policy configured

## Additional Resources

- [Firebase Hosting Documentation](https://firebase.google.com/docs/hosting)
- [Vercel Documentation](https://vercel.com/docs)
- [Netlify Documentation](https://docs.netlify.com)
- [OpenAI API Documentation](https://platform.openai.com/docs/api-reference)

For additional support, please open an issue on the GitHub repository.