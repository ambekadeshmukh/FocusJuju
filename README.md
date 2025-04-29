# FocusJuju

<div align="center">
  <img src="src/assets/images/logo.svg" alt="HelloJuju Logo" width="200" />
  <p><i>Your AI accountability buddy for better focus and productivity</i></p>
</div>

## 🌟 Overview

HelloJuju is an AI-powered accountability buddy designed to help you stay focused and productive. Drawing inspiration from the concept of "body doubling" (working alongside someone to maintain focus), HelloJuju creates a supportive, virtual presence that adapts to your mood and needs.

### 🧠 Key Features

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
   git clone https://github.com/yourusername/hello-juju.git
   cd hello-juju
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

## 🛠️ Tech Stack

- **Frontend**: React, Material UI, Framer Motion
- **State Management**: React Context API
- **Backend**: Firebase (Authentication, Firestore)
- **AI Integration**: OpenAI API, Transformers.js (for open-source models)
- **Deployment**: Vercel/Netlify

## 📋 Project Status

This project is being actively developed as a personal passion project. It's designed to help people who struggle with focus and productivity, especially those who benefit from body doubling but prefer not to have a real person watching them work.

## 🙏 Acknowledgements

- Inspired by body doubling techniques used in ADHD coaching
- Robot avatar design inspired by friendly assistant robots
- Special thanks to my son Juju, whose nickname inspired this project

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Contact

If you have any questions or would like to contribute, please open an issue or reach out to me on [LinkedIn](https://linkedin.com/in/yourusername).

---

<div align="center">
  <p>Made with ❤️ as a non-commercial passion project</p>
</div>