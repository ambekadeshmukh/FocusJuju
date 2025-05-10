// src/components/avatar/RobotAvatar.jsx
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';

// Styled components for the avatar
const AvatarContainer = styled(motion.div)`
  width: ${props => props.size}px;
  height: ${props => props.size}px;
  position: relative;
  margin: 0 auto;
`;

const Head = styled(motion.div)`
  width: 60%;
  height: 40%;
  background-color: #e8f4f8;
  border-radius: 50% 50% 45% 45%;
  position: absolute;
  top: 10%;
  left: 20%;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const Face = styled(motion.div)`
  width: 70%;
  height: 60%;
  position: absolute;
  top: 20%;
  left: 15%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
`;

const Eyes = styled(motion.div)`
  width: 100%;
  height: 40%;
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

const Eye = styled(motion.div)`
  width: ${props => props.blinking ? '12%' : '20%'};
  height: ${props => props.blinking ? '2%' : '70%'};
  background-color: #2A6D82;
  border-radius: 50%;
  position: relative;
  transition: all 0.1s ease;
  
  &::after {
    content: '';
    position: absolute;
    width: 35%;
    height: 35%;
    background-color: white;
    border-radius: 50%;
    top: 15%;
    left: 15%;
    opacity: 0.7;
  }
`;

const Pupil = styled(motion.div)`
  width: 40%;
  height: 40%;
  background-color: #1a4b5c;
  border-radius: 50%;
  position: absolute;
  top: 30%;
  left: 30%;
`;

const Mouth = styled(motion.div)`
  width: 60%;
  height: 20%;
  background-color: ${props => props.color || '#2A6D82'};
  border-radius: ${props => props.shape || '30% 30% 50% 50%'};
  position: relative;
  margin-top: 10%;
  overflow: hidden;
`;

const SmileInner = styled(motion.div)`
  width: 100%;
  height: 50%;
  background-color: #0c2c38;
  border-radius: 50% 50% 0 0;
  position: absolute;
  bottom: 0;
`;

const Body = styled(motion.div)`
  width: 50%;
  height: 35%;
  background: linear-gradient(to bottom, #d8e6ed 0%, #a8d1e7 100%);
  border-radius: 30% 30% 40% 40%;
  position: absolute;
  top: 45%;
  left: 25%;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const Arm = styled(motion.div)`
  width: 15%;
  height: 40%;
  background: linear-gradient(to bottom, #c8e0ec 0%, #a8d1e7 100%);
  border-radius: 40%;
  position: absolute;
  top: 45%;
  left: ${props => props.side === 'left' ? '10%' : '75%'};
  transform-origin: ${props => props.side === 'left' ? 'right top' : 'left top'};
`;

const Hand = styled(motion.div)`
  width: 70%;
  height: 20%;
  background-color: #baceda;
  border-radius: 50%;
  position: absolute;
  bottom: 0;
  left: 15%;
`;

const GlowCircle = styled(motion.div)`
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(168, 209, 231, 0.3) 0%, rgba(168, 209, 231, 0) 70%);
  position: absolute;
  z-index: -1;
`;

// Add speech bubble for encouragement messages
const SpeechBubble = styled(motion.div)`
  position: absolute;
  top: -40%;
  right: -30%;
  background-color: white;
  border-radius: 12px;
  padding: 10px 15px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  font-size: ${props => Math.max(props.size / 16, 12)}px;
  max-width: 200%;
  z-index: 10;
  
  &:after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 30%;
    border-width: 10px 10px 0;
    border-style: solid;
    border-color: white transparent;
  }
`;

// Define mood animations and styles
const moods = {
  happy: {
    head: { scale: 1.05, y: [0, -5, 0], transition: { repeat: Infinity, duration: 2 } },
    eyeScale: 1.1,
    pupil: { y: [-1, 1, -1], transition: { repeat: Infinity, duration: 1.5 } },
    mouthWidth: 65,
    mouthHeight: 25,
    mouthShape: '30% 30% 50% 50%',
    mouthColor: '#2A6D82',
    showTeeth: true,
    body: { rotate: [-1, 1, -1], transition: { repeat: Infinity, duration: 3 } },
    leftArm: { rotate: [0, 5, 0], transition: { repeat: Infinity, duration: 2 } },
    rightArm: { rotate: [0, -5, 0], transition: { repeat: Infinity, duration: 2, delay: 0.5 } },
    glow: { opacity: 0.8, scale: 1.1 }
  },
  focused: {
    head: { scale: 1, y: [0, -2, 0], transition: { repeat: Infinity, duration: 4 } },
    eyeScale: 1,
    pupil: { x: [-2, 2, -2], transition: { repeat: Infinity, duration: 3 } },
    mouthWidth: 50,
    mouthHeight: 15,
    mouthShape: '20% 20% 20% 20%',
    mouthColor: '#2A6D82',
    showTeeth: false,
    body: { rotate: 0 },
    leftArm: { rotate: 0 },
    rightArm: { rotate: 0 },
    glow: { opacity: 0.5, scale: 1 }
  },
  thinking: {
    head: { rotate: [0, 3, 0, -3, 0], transition: { repeat: Infinity, duration: 3 } },
    eyeScale: 0.9,
    pupil: { y: 3, x: 3 },
    mouthWidth: 40,
    mouthHeight: 10,
    mouthShape: '20% 20% 20% 20%',
    mouthColor: '#2A6D82',
    showTeeth: false,
    body: { rotate: 0 },
    leftArm: { rotate: [0, 10, 0], transition: { repeat: Infinity, duration: 2 } },
    rightArm: { rotate: 0 },
    glow: { opacity: 0.3, scale: 0.9 }
  },
  encouraging: {
    head: { y: [0, -8, 0], transition: { repeat: Infinity, duration: 1.2 } },
    eyeScale: 1.2,
    pupil: { scale: [1, 1.2, 1], transition: { repeat: Infinity, duration: 1 } },
    mouthWidth: 70,
    mouthHeight: 30,
    mouthShape: '40% 40% 60% 60%',
    mouthColor: '#2A6D82',
    showTeeth: true,
    body: { rotate: [-2, 2, -2], transition: { repeat: Infinity, duration: 1.5 } },
    leftArm: { rotate: [0, -20, 0], transition: { repeat: Infinity, duration: 1 } },
    rightArm: { rotate: [0, 20, 0], transition: { repeat: Infinity, duration: 1, delay: 0.2 } },
    glow: { opacity: 1, scale: 1.2, transition: { repeat: Infinity, duration: 1.5 } }
  },
  idle: {
    head: { y: [0, -3, 0], transition: { repeat: Infinity, duration: 4, ease: "easeInOut" } },
    eyeScale: 1,
    pupil: { x: [-2, 2, -2], transition: { repeat: Infinity, duration: 5 } },
    mouthWidth: 50,
    mouthHeight: 15,
    mouthShape: '30% 30% 30% 30%',
    mouthColor: '#2A6D82',
    showTeeth: false,
    body: { rotate: 0 },
    leftArm: { rotate: [0, 3, 0], transition: { repeat: Infinity, duration: 4 } },
    rightArm: { rotate: [0, -3, 0], transition: { repeat: Infinity, duration: 4, delay: 1 } },
    glow: { opacity: 0.2, scale: 1, transition: { repeat: Infinity, duration: 3 } }
  }
};

// Encouraging messages for speech bubbles
const encouragingMessages = [
  "You're doing great! 👏",
  "Keep going! You've got this! 💪",
  "I believe in you! 🌟",
  "Focus on progress! 🚀",
  "Small steps matter! 🔍",
  "You're making progress! 📈",
  "Keep up the momentum! ⚡"
];

const RobotAvatar = ({ mood = 'idle', size = 200, className, message = '', showMessage = false }) => {
  const [blinking, setBlinking] = useState(false);
  const [encouragement, setEncouragement] = useState('');
  const [showBubble, setShowBubble] = useState(false);
  
  // Handle blinking animation
  useEffect(() => {
    const blinkInterval = setInterval(() => {
      setBlinking(true);
      setTimeout(() => setBlinking(false), 150);
    }, Math.random() * 3000 + 2000);
    
    return () => clearInterval(blinkInterval);
  }, []);

  // Show random encouragement for encouraging mood
  useEffect(() => {
    if (mood === 'encouraging') {
      const randomMessage = encouragingMessages[Math.floor(Math.random() * encouragingMessages.length)];
      setEncouragement(message || randomMessage);
      setShowBubble(true);
      
      // Hide bubble after a few seconds
      const timer = setTimeout(() => {
        setShowBubble(false);
      }, 4000);
      
      return () => clearTimeout(timer);
    } else if (showMessage && message) {
      setEncouragement(message);
      setShowBubble(true);
      
      // Hide bubble after a few seconds
      const timer = setTimeout(() => {
        setShowBubble(false);
      }, 4000);
      
      return () => clearTimeout(timer);
    } else {
      setShowBubble(false);
    }
  }, [mood, message, showMessage]);

  const currentMood = moods[mood] || moods.idle;
  const isHappy = ['happy', 'encouraging'].includes(mood);
  
  return (
    <AvatarContainer 
      className={className}
      size={size}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <GlowCircle 
        animate={currentMood.glow}
        transition={{ duration: 1.5, repeat: Infinity, repeatType: "reverse" }}
      />
      
      {/* Speech bubble with message */}
      {(showBubble && encouragement) && (
        <SpeechBubble
          size={size}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
        >
          {encouragement}
        </SpeechBubble>
      )}
      
      <Head
        animate={currentMood.head}
      >
        <Face>
          <Eyes>
            <Eye 
              blinking={blinking}
              animate={{ 
                scale: blinking ? 1 : currentMood.eyeScale
              }}
            >
              {!blinking && <Pupil animate={currentMood.pupil} />}
            </Eye>
            
            <Eye 
              blinking={blinking}
              animate={{ 
                scale: blinking ? 1 : currentMood.eyeScale
              }}
            >
              {!blinking && <Pupil animate={currentMood.pupil} />}
            </Eye>
          </Eyes>
          
          <Mouth 
            shape={currentMood.mouthShape}
            color={currentMood.mouthColor}
            animate={{ 
              width: `${currentMood.mouthWidth}%`,
              height: `${currentMood.mouthHeight}%`
            }}
          >
            {currentMood.showTeeth && <SmileInner />}
          </Mouth>
        </Face>
      </Head>
      
      <Body animate={currentMood.body} />
      
      <Arm 
        side="left"
        animate={currentMood.leftArm}
      >
        <Hand />
      </Arm>
      
      <Arm 
        side="right"
        animate={currentMood.rightArm}
      >
        <Hand />
      </Arm>
    </AvatarContainer>
  );
};

export default RobotAvatar;