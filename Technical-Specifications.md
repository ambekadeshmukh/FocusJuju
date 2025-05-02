# FocusJuju Technical Specifications

## Architecture Overview

FocusJuju is built as a modern single-page web application with serverless backend architecture using Firebase. The application follows a component-based architecture with separation of concerns between UI components, services, and state management.

### System Architecture Diagram

```
+-------------------+      +--------------------+     +------------------+
|                   |      |                    |     |                  |
|  React Frontend   |<---->|  Firebase Backend  |<--->|  AI Services     |
|  (SPA)            |      |  (BaaS)            |     |  (OpenAI/OSS)    |
|                   |      |                    |     |                  |
+-------------------+      +--------------------+     +------------------+
```

## Frontend Specifications

### Technologies

- **React**: v18.x - Core UI library
- **Material UI**: v5.x - Component library for styling
- **React Router**: v6.x - Client-side routing
- **Framer Motion**: v7.x - Animation library
- **Chart.js & React-Chartjs-2**: Data visualization
- **Firebase SDK**: Authentication and database interaction

### Component Hierarchy

```
App
├── AuthProvider
│   ├── Header
│   ├── Routes
│   │   ├── LandingPage
│   │   ├── SignIn / SignUp
│   │   ├── Dashboard
│   │   │   ├── MoodTracker
│   │   │   ├── TaskList
│   │   │   ├── ProgressStats
│   │   │   └── QuickSessionButtons
│   │   ├── BodyDoublingSession
│   │   ├── MicroGoalSetting
│   │   └── NotFound
│   └── Footer
```

### State Management

- **Context API**: Used for authentication state, user preferences, and application state
- **Local Component State**: Used for UI state within components
- **React Query (Future)**: Potential addition for more complex data fetching/caching

## Backend Specifications

### Firebase Services

- **Authentication**: Email/password authentication
- **Firestore**: NoSQL database for storing user data, tasks, sessions, etc.
- **Firebase Hosting**: Static hosting for the web application
- **Firebase Storage**: For user uploaded files (future feature)

### Database Schema

#### Collections Structure

- **users**: User profiles and preferences
- **tasks**: User tasks and micro-goals
- **sessions**: Focus session records
- **moods**: User mood tracking data
- **messages**: Chat interactions during sessions

#### Detailed Schema

```javascript
// users collection
{
  id: "user_id",                      // Document ID (from Authentication)
  name: "User Name",                  // Display name
  email: "user@example.com",          // Email address
  createdAt: Timestamp,               // Account creation date
  preferences: {                      // User preferences
    messageStyle: "friendly",         // AI message style (friendly, serious, funny, motivational)
    sessionDuration: 25,              // Default session duration in minutes
    weekendMode: true,                // Whether weekend mode is enabled
    soundEnabled: true                // Whether sound effects are enabled
  },
  currentMood: {                      // Current mood state
    mood: 4,                          // Overall mood (1-5)
    energy: 3,                        // Energy level (1-5)
    focus: 4,                         // Focus ability (1-5)
    timestamp: Timestamp              // When mood was recorded
  }
}

// tasks collection
{
  id: "task_id",                      // Document ID
  userId: "user_id",                  // Owner of the task
  title: "Task title",                // Task title
  description: "Task description",    // Optional description
  priority: "high",                   // Priority (high, medium, low)
  estimatedMinutes: 30,               // Estimated time in minutes
  completed: false,                   // Completion status
  completedAt: Timestamp,             // When task was completed (if applicable)
  createdAt: Timestamp,               // Creation timestamp
  isLargerTask: false,                // Whether this is a parent task
  isPartOfLargerTask: false,          // Whether this is a micro-goal
  parentTaskId: "parent_task_id",     // Reference to parent task (if micro-goal)
  parentTaskTitle: "Parent title"     // Title of parent task (for convenience)
}

// sessions collection
{
  id: "session_id",                   // Document ID
  userId: "user_id",                  // User who created the session
  startTime: Timestamp,               // Session start time
  endTime: Timestamp,                 // Session end time
  plannedDurationMinutes: 25,         // Planned duration
  actualDurationSeconds: 1450,        // Actual duration
  type: "body-double",                // Session type (body-double, pomodoro, deep-work, task-breakdown)
  taskDescription: "Working on X",    // Description of what user is working on
  status: "completed",                // Status (in-progress, completed, ended-early)
  notes: "Session notes"              // Optional notes
}

// moods collection
{
  id: "mood_id",                      // Document ID
  userId: "user_id",                  // User ID
  mood: 4,                            // Overall mood (1-5)
  energy: 3,                          // Energy level (1-5)
  focus: 4,                           // Focus ability (1-5)
  timestamp: Timestamp,               // Recording timestamp
  notes: "Feeling productive today"   // Optional notes
}

// messages collection
{
  id: "message_id",                   // Document ID
  userId: "user_id",                  // User ID
  sessionId: "session_id",            // Associated session
  sender: "user",                     // Sender (user or ai)
  text: "Message content",            // Message content
  timestamp: Timestamp                // Timestamp
}
```

## AI Integration Specifications

### AI Services

- **Primary**: OpenAI API (GPT models) for natural language understanding and generation
- **Alternative**: Open source models via Transformers.js (client-side) for reduced dependency on external APIs

### AI Features

- **Conversational Support**: Natural dialogue during focus sessions
- **Micro-Goal Generation**: Breaking down large tasks into smaller steps
- **Mood Analysis**: Interpreting user mood for appropriate responses
- **Personalized Encouragement**: Generating contextual encouragement messages

### Agentic AI Architecture (Future)

The planned agentic AI system will include:

- **Tools Registry**: Database of functions the AI can call
- **Prompt Engineering System**: Dynamic prompt creation based on context
- **Action Parser**: Extracting tool calls from AI responses
- **Tool Executor**: Safely executing tool functions

## Security Specifications

- **Authentication**: Firebase Authentication with email/password
- **Data Security**: Firestore security rules ensuring users can only access their own data
- **API Security**: Environment variables for API keys, client-side only access to necessary Firebase services
- **Content Security**: Input sanitization for user-generated content

## Performance Specifications

- **Target Load Time**: < 2 seconds initial page load
- **Animation Performance**: 60fps for all UI animations
- **Offline Support**: Basic functionality via PWA features (future enhancement)
- **AI Response Time**: < 3 seconds for most AI interactions

## Development & Deployment Workflow

### Development Environment

- **Node.js**: v16.x or higher
- **npm**: v8.x or higher
- **IDE**: VS Code recommended with ESLint and Prettier extensions

### Build Process

- **Development**: `npm start` - Runs development server with hot reloading
- **Testing**: `npm test` - Runs test suite
- **Build**: `npm run build` - Creates production build

### Deployment

- **Hosting**: Vercel or Netlify
- **CI/CD**: Automated deployment from GitHub main branch
- **Environment Variables**: Securely stored in hosting platform

## Future Technical Enhancements

1. **Progressive Web App (PWA)**: For offline capabilities and mobile installation
2. **WebRTC**: For optional peer-to-peer body doubling with friends
3. **IndexedDB**: For robust offline data storage
4. **Web Workers**: For improved performance with client-side AI models
5. **WebSockets**: For real-time collaborative features
6. **Web Speech API**: For voice interaction with the AI companion

## Dependencies

### Production Dependencies

```json
{
  "dependencies": {
    "@emotion/react": "^11.11.0",
    "@emotion/styled": "^11.11.0",
    "@mui/icons-material": "^5.11.16",
    "@mui/material": "^5.13.0",
    "chart.js": "^4.3.0",
    "firebase": "^9.22.0",
    "framer-motion": "^10.12.10",
    "moment": "^2.29.4",
    "openai": "^4.0.0",
    "react": "^18.2.0",
    "react-chartjs-2": "^5.2.0",
    "react-dom": "^18.2.0",
    "react-router-dom": "^6.11.1",
    "react-scripts": "5.0.1",
    "styled-components": "^5.3.10"
  }
}
```

### Development Dependencies

```json
{
  "devDependencies": {
    "@testing-library/jest-dom": "^5.16.5",
    "@testing-library/react": "^14.0.0",
    "@testing-library/user-event": "^14.4.3",
    "eslint": "^8.40.0",
    "eslint-plugin-react": "^7.32.2",
    "prettier": "^2.8.8"
  }
}
```

## Browser Compatibility

- Chrome: Latest 2 versions
- Firefox: Latest 2 versions
- Safari: Latest 2 versions
- Edge: Latest 2 versions
- Mobile browsers: iOS Safari, Android Chrome (latest versions)

## Resource Requirements

- **Minimum Client**: Modern browser with JavaScript enabled, 4GB RAM
- **Recommended Client**: 8GB RAM, modern multi-core CPU
- **Backend**: Firebase Spark plan (free tier) sufficient for development and small-scale usage
- **API Usage**: OpenAI API (within free tier limits or minimal paid usage)

---

This technical specification document serves as a guide for development and may evolve as the project progresses.