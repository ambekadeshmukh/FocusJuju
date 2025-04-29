// src/components/avatar/RobotAvatar.jsx
import React from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';

const AvatarContainer = styled(motion.div)`
  width: ${props => props.size}px;
  height: ${props => props.size}px;
  position: relative;
  margin: 0 auto;
`;

const Head = styled(motion.div)`
  width: 60%;
  height: 40%;
  background-color: #e8e8e8;
  border-radius: 50% 50% 45% 45%;
  position: absolute;
  top: 10%;
  left: 20%;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const Eye = styled(motion.div)`
  width: ${props => props.blinking ? '12%' : '15%'};
  height: ${props => props.blinking ? '1%' : '15%'};
  background-color: #2A6D82;
  border-radius: 50%;
  position: absolute;
  top: ${props => props.blinking ? '25%' : '20%'};
  left: ${props => props.side === 'left' ? '30%' : '60%'};
  transition: all 0.2s ease;
`;

const Body = styled(motion.div)`
  width: 50%;
  height: 35%;
  background-color: #d8d8d8;
  border-radius: 30% 30% 40% 40%;
  position: absolute;
  top: 45%;
  left: 25%;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const Arm = styled(motion.div)`
  width: 15%;
  height: 40%;
  background-color: #c8c8c8;
  border-radius: 40%;
  position: absolute;
  top: 45%;
  left: ${props => props.side === 'left' ? '10%' : '75%'};
`;

const Mouth = styled(motion.div)`
  width: 30%;
  height: 5%;
  background-color: #2A6D82;
  border-radius: ${props => props.happy ? '0 0 10px 10px' : '10px 10px 0 0'};
  position: absolute;
  top: 35%;
  left: 35%;
`;

const GlowCircle = styled(motion.div)`
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(157, 224, 173, 0.3) 0%, rgba(157, 224, 173, 0) 70%);
  position: absolute;
  z-index: -1;
`;

const moods = {
  happy: {
    head: { scale: 1.05 },
    eyes: { scale: 1.1 },
    mouth: { scaleX: 1.2 },
    glow: { opacity: 0.8, scale: 1.1 }
  },
  focused: {
    head: { scale: 1 },
    eyes: { scale: 1 },
    mouth: { scaleX: 0.9 },
    glow: { opacity: 0.5, scale: 1 }
  },
  thinking: {
    head: { rotate: [0, 5, 0, -5, 0], transition: { repeat: Infinity, duration: 2 } },
    eyes: { scale: 0.9 },
    mouth: { scaleX: 0.7 },
    glow: { opacity: 0.3, scale: 0.9 }
  },
  encouraging: {
    head: { y: [0, -10, 0], transition: { repeat: Infinity, duration: 1 } },
    eyes: { scale: 1.2 },
    mouth: { scaleX: 1.3 },
    glow: { opacity: 1, scale: 1.2 }
  },
  idle: {
    head: { y: [0, -5, 0], transition: { repeat: Infinity, duration: 4, ease: "easeInOut" } },
    eyes: { scale: 1 },
    mouth: { scaleX: 1 },
    glow: { opacity: 0.2, scale: 1, transition: { repeat: Infinity, duration: 3 } }
  }
};

const RobotAvatar = ({ mood = 'idle', size = 200, className }) => {
  const [blinking, setBlinking] = React.useState(false);
  
  React.useEffect(() => {
    const blinkInterval = setInterval(() => {
      setBlinking(true);
      setTimeout(() => setBlinking(false), 200);
    }, Math.random() * 3000 + 2000);
    
    return () => clearInterval(blinkInterval);
  }, []);

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
      
      <Head
        animate={currentMood.head}
        transition={{ duration: 0.5 }}
      />
      
      <Eye 
        side="left" 
        blinking={blinking}
        animate={blinking ? {} : currentMood.eyes}
      />
      
      <Eye 
        side="right" 
        blinking={blinking}
        animate={blinking ? {} : currentMood.eyes}
      />
      
      <Mouth 
        happy={isHappy}
        animate={currentMood.mouth}
        transition={{ duration: 0.5 }}
      />
      
      <Body />
      
      <Arm 
        side="left"
        animate={
          mood === 'encouraging' 
            ? { rotate: [0, -20, 0], transition: { repeat: Infinity, duration: 1 } }
            : {}
        }
      />
      
      <Arm 
        side="right"
        animate={
          mood === 'encouraging' 
            ? { rotate: [0, 20, 0], transition: { repeat: Infinity, duration: 1, delay: 0.2 } }
            : {}
        }
      />
    </AvatarContainer>
  );
};

export default RobotAvatar;