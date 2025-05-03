# FocusJuju

<div align="center">
  <img src="public/logo192.png" alt="FocusJuju Logo" width="200" />
  <p><i>Your AI accountability buddy for better focus and productivity</i></p>
</div>

## 🌟 Overview

FocusJuju is an AI-powered accountability buddy designed to help you stay focused and productive. Drawing inspiration from the concept of "body doubling" (working alongside someone to maintain focus), FocusJuju creates a supportive, virtual presence that adapts to your mood and needs.

### Perfect for ADHD and Focus Challenges

If you struggle with:
- Getting started on tasks
- Maintaining focus during work sessions
- Breaking down overwhelming projects
- Building consistent habits

FocusJuju's supportive, non-judgmental AI companion can help make focusing easier.

## 🧠 Key Features

- **AI Body Doubling**: Work alongside a friendly AI companion that provides gentle encouragement
- **Mood-Responsive Support**: The AI adapts its approach based on how you're feeling
- **Micro-Goal Setting**: Break overwhelming tasks into manageable chunks
- **Flexible Focus Sessions**: Choose from different session types based on your energy level
- **Progress Tracking**: Monitor your achievements with non-intimidating visualizations
- **Weekend Mode**: Different support patterns for workdays vs. weekends

## 📷 Screenshots

<div align="center">
  <img src="docs/screenshots/dashboard.png" alt="Dashboard" width="45%" />
  <img src="docs/screenshots/body-doubling.png" alt="Body Doubling Session" width="45%" />
</div>

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or later)
- npm or yarn
- Firebase account (free tier is sufficient)
- OpenAI API key (optional, for enhanced AI features)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/focus-juju.git
   cd focus-juju
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Create a `.env` file in the root directory and add your Firebase configuration:
   ```
   REACT_APP_FIREBASE_API_KEY=your_api_key
   REACT_APP_FIREBASE_AUTH_DOMAIN=your_auth_domain
   REACT_APP_FIREBASE_PROJECT_ID=your_project_id
   REACT_APP_FIREBASE_STORAGE_BUCKET=your_storage_bucket
   REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
   REACT_APP_FIREBASE_APP_ID=your_app_id
   REACT_APP_OPENAI_API_KEY=your_openai_api_key
   ```

4. Start the development server:
   ```bash
   npm start
   # or
   yarn start
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🔄 Firebase Setup

1. Create a new Firebase project at [firebase.google.com](https://firebase.google.com/)
2. Enable Authentication with Email/Password
3. Create a Firestore database
4. Set up the following Firestore collections:
   - `users`: User profiles and preferences
   - `tasks`: User tasks and micro-goals
   - `sessions`: Focus session records
   - `moods`: User mood tracking data
   - `messages`: Chat interactions during sessions

## 🛠️ Tech Stack

- **Frontend**: React, Material UI, Framer Motion
- **State Management**: React Context API
- **Backend**: Firebase (Authentication, Firestore)
- **AI Integration**: OpenAI API, local fallback system
- **Deployment**: Vercel/Netlify/Firebase Hosting

## 📋 Project Structure

```
src/
├── components/
│   ├── auth/           # Authentication components
│   ├── avatar/         # Robot avatar components
│   ├── common/         # Shared components
│   ├── dashboard/      # Dashboard components
│   ├── goals/          # Micro-goal setting components
│   └── session/        # Focus session components
├── context/
│   └── AuthContext.jsx # Authentication context
├── services/
│   ├── aiService.js    # AI integration
│   └── databaseService.js # Firebase interactions
├── theme.js            # Material UI theme config
├── App.js              # Main app component
└── index.js            # Entry point
```

## 🧩 Components

### Core Components

1. **BodyDoublingSession**: The main focus session interface with timer, robot avatar, and chat
2. **MicroGoalSetting**: Interface for breaking down tasks into smaller, manageable chunks
3. **RobotAvatar**: Animated robot character that changes mood based on context
4. **Dashboard**: Main user interface showing stats, tasks, and quick actions

### UX/UI Features

- Responsive design works on mobile and desktop
- Animated UI elements for engagement
- Dark/light mode support
- Accessibility considerations

## 📏 Code Standards

- Modern React practices with functional components and hooks
- Consistent code formatting with Prettier
- Component separation with single responsibility
- Informative comments for complex logic
- TypeScript integration (planned for future)

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgements

- Inspired by body doubling techniques used in ADHD coaching
- Robot avatar design inspired by friendly assistant robots
- Icons from Material Design icon set
- Built with ❤️ for everyone who struggles with focus

---

<div align="center">
  <p>Made with ❤️ as a non-commercial, open-source project</p>
  <p>⭐ Star us on GitHub if this helps you! ⭐</p>
</div>