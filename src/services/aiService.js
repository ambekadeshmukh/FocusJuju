// src/services/aiService.js
import OpenAI from 'openai';

// Initialize OpenAI (in production, use environment variables)
const openaiApiKey = process.env.REACT_APP_OPENAI_API_KEY;

// Fallback to client-side AI if no API key is available
// Using a simple rule-based system for responses
const fallbackAI = {
  generateResponse: (message, style, context) => {
    // Simple keyword matching for common queries
    const lowercaseMessage = message.toLowerCase();
    
    if (lowercaseMessage.includes('stuck') || lowercaseMessage.includes('help')) {
      if (style === 'friendly') {
        return "I understand feeling stuck can be frustrating! Try breaking your current task into smaller steps. What's the smallest part you could tackle first? 💪";
      } else if (style === 'serious') {
        return "Recognized: productivity obstacle. Recommendation: decompose task into smaller components. Focus on initial step.";
      } else if (style === 'funny') {
        return "Ah, the dreaded Wall of Can't-Do-It! 🧱 Let's chip away at it brick by tiny brick. Pick the tiniest piece to tackle first. Even demolition experts start with one swing! 🔨";
      } else if (style === 'motivational') {
        return "OBSTACLES ARE JUST STEPPING STONES TO SUCCESS! 🔥 BREAK IT DOWN, TACKLE ONE PIECE AT A TIME! YOU'VE GOT THE POWER TO PUSH THROUGH! 💪";
      }
    }
    
    if (lowercaseMessage.includes('tired') || lowercaseMessage.includes('break')) {
      if (style === 'friendly') {
        return "It's perfectly okay to need a short break! Your brain needs rest to function well. How about a quick 5-minute stretch or a glass of water? 😊";
      } else if (style === 'serious') {
        return "Fatigue detected. Recommendation: implement strategic 5-minute reset. Hydration and movement optimal for cognitive resource renewal.";
      } else if (style === 'funny') {
        return "Your brain cells are staging a tiny rebellion! 🧠✊ Time for a 5-minute parley with them - stretch those limbs or grab some H2O. The rebellion will soon be quelled! 😄";
      } else if (style === 'motivational') {
        return "STRATEGIC REST IS PART OF THE CHAMPION'S PLAYBOOK! ⚡ TAKE 5 TO RECHARGE AND COME BACK STRONGER! YOUR ENERGY IS YOUR WEAPON! 🔋";
      }
    }
    
    if (lowercaseMessage.includes('distracted') || lowercaseMessage.includes('focus')) {
      if (style === 'friendly') {
        return "Getting distracted is normal! Try the 5-4-3-2-1 grounding technique: name 5 things you see, 4 things you feel, 3 things you hear, 2 things you smell, and 1 thing you taste. This can help bring you back to the present moment. 🌱";
      } else if (style === 'serious') {
        return "Attention divergence common. Implement grounding protocol: identify 5 visual stimuli, 4 tactile, 3 auditory, 2 olfactory, 1 gustatory. Resume task with renewed focus.";
      } else if (style === 'funny') {
        return "Oh look, a distraction! And another one! They're multiplying like rabbits! 🐰 Time for the 5-4-3-2-1 distraction zapper: 5 things you see, 4 you feel, 3 you hear, 2 you smell, 1 you taste. Pew pew! Distractions begone! ✨";
      } else if (style === 'motivational') {
        return "DISTRACTIONS ARE JUST TESTS OF YOUR DETERMINATION! 🔥 USE THE 5-4-3-2-1 TECHNIQUE TO RECENTER! YOU ARE STRONGER THAN ANY DISTRACTION! 💯";
      }
    }
    
    // Default encouraging responses if no specific keywords match
    if (style === 'friendly') {
      return "I'm right here with you. Keep going at your own pace. You're making progress! 💫";
    } else if (style === 'serious') {
      return "Continuing focus mode. Progress acknowledged. Maintain current trajectory.";
    } else if (style === 'funny') {
      return "Still typing away like a champion keyboard warrior! 🏆 Your fingers are like tiny productivity ninjas! 🥷";
    } else if (style === 'motivational') {
      return "EVERY KEYSTROKE IS A STEP TOWARD GREATNESS! 🔥 KEEP PUSHING YOUR LIMITS! YOU'RE UNSTOPPABLE! 💪";
    }
  },
  
  generateMicroGoals: (task) => {
    // Simple task breakdown based on common patterns
    const defaultGoals = [
      {
        title: "Research and gather information",
        description: "Collect all necessary information and resources needed for the task",
        estimatedMinutes: 15,
        priority: "high"
      },
      {
        title: "Create an outline or plan",
        description: "Organize your thoughts and create a structured approach",
        estimatedMinutes: 10,
        priority: "high"
      },
      {
        title: "Complete first part",
        description: "Work on the first section of your task",
        estimatedMinutes: 20,
        priority: "medium"
      },
      {
        title: "Review progress and adjust",
        description: "Check what you've done so far and make any necessary adjustments",
        estimatedMinutes: 10,
        priority: "medium"
      },
      {
        title: "Finalize and polish",
        description: "Add finishing touches and ensure everything is complete",
        estimatedMinutes: 15,
        priority: "low"
      }
    ];
    
    // If task contains keywords, try to provide more specific goals
    const lowercaseTask = task.toLowerCase();
    
    if (lowercaseTask.includes('essay') || lowercaseTask.includes('paper') || lowercaseTask.includes('article')) {
      return [
        {
          title: "Brainstorm main points",
          description: "List the key arguments or points you want to make",
          estimatedMinutes: 10,
          priority: "high"
        },
        {
          title: "Create outline with topic sentences",
          description: "Structure your thoughts with main sections and topic sentences",
          estimatedMinutes: 15,
          priority: "high"
        },
        {
          title: "Write introduction",
          description: "Draft your opening paragraph with thesis statement",
          estimatedMinutes: 15,
          priority: "medium"
        },
        {
          title: "Write first supporting paragraph",
          description: "Develop your first main point with evidence",
          estimatedMinutes: 20,
          priority: "medium"
        },
        {
          title: "Take a short break and review",
          description: "Rest briefly, then review what you've written so far",
          estimatedMinutes: 10,
          priority: "low"
        }
      ];
    }
    
    if (lowercaseTask.includes('code') || lowercaseTask.includes('program') || lowercaseTask.includes('develop')) {
      return [
        {
          title: "Define requirements",
          description: "Clearly outline what your code needs to accomplish",
          estimatedMinutes: 10,
          priority: "high"
        },
        {
          title: "Plan architecture/components",
          description: "Sketch the structure and key components of your solution",
          estimatedMinutes: 15,
          priority: "high"
        },
        {
          title: "Set up development environment",
          description: "Prepare your coding environment and initial files",
          estimatedMinutes: 10,
          priority: "medium"
        },
        {
          title: "Implement core functionality",
          description: "Code the essential function or feature",
          estimatedMinutes: 25,
          priority: "medium"
        },
        {
          title: "Test your implementation",
          description: "Verify your code works as expected",
          estimatedMinutes: 15,
          priority: "medium"
        }
      ];
    }
    
    if (lowercaseTask.includes('clean') || lowercaseTask.includes('organize') || lowercaseTask.includes('tidy')) {
      return [
        {
          title: "Gather supplies",
          description: "Collect all cleaning supplies or organizing tools needed",
          estimatedMinutes: 5,
          priority: "high"
        },
        {
          title: "Clear initial space",
          description: "Clear off surfaces or make initial space",
          estimatedMinutes: 10,
          priority: "high"
        },
        {
          title: "Sort items into categories",
          description: "Group similar items together",
          estimatedMinutes: 15,
          priority: "medium"
        },
        {
          title: "Clean or organize first area",
          description: "Focus on completely finishing one small area",
          estimatedMinutes: 20,
          priority: "medium"
        },
        {
          title: "Take a short break and reassess",
          description: "Quick break, then decide on next area to tackle",
          estimatedMinutes: 10,
          priority: "low"
        }
      ];
    }
    
    return defaultGoals;
  },
  
  generateAdvice: (mood, energy, focus) => {
    // Generate advice based on user's current state
    let advice = {
      summary: "Based on your current state, I've put together some personalized suggestions.",
      primaryAdvice: "Take things one step at a time and focus on making progress.",
      secondaryAdvice: "Consider breaking your tasks into smaller, more manageable pieces.",
      encouragement: "Remember that every small step forward is progress!",
      recommendedSessionType: "body-double"
    };
    
    if (mood <= 2) {
      advice.summary = "I notice your mood is a bit low today.";
      advice.primaryAdvice = "Start with something small and enjoyable to build momentum.";
      advice.secondaryAdvice = "Consider a shorter session today with more frequent breaks.";
      advice.encouragement = "It's okay to have tough days. Small wins still count!";
      advice.recommendedSessionType = "body-double";
    } else if (mood >= 4) {
      advice.summary = "You're in a positive mood today - great!";
      advice.primaryAdvice = "This is a good time to tackle something challenging.";
      advice.secondaryAdvice = "Try to harness this positive energy for focused work.";
      advice.encouragement = "Your positive state is a great foundation for productivity!";
      advice.recommendedSessionType = "deep-work";
    }
    
    if (energy <= 2) {
      advice.summary = "Your energy seems to be running low today.";
      advice.primaryAdvice = "Choose gentle, low-energy tasks that still move you forward.";
      advice.secondaryAdvice = "Consider shorter work periods with more frequent breaks.";
      advice.encouragement = "Even on low energy days, small progress adds up!";
      advice.recommendedSessionType = "body-double";
    } else if (energy >= 4) {
      advice.summary = "You've got good energy today!";
      advice.primaryAdvice = "This is a great time to tackle more demanding tasks.";
      advice.secondaryAdvice = "Try to channel this energy into focused work sessions.";
      advice.encouragement = "With this energy, you can make significant progress today!";
      advice.recommendedSessionType = "deep-work";
    }
    
    if (focus <= 2) {
      advice.summary = "You might be finding it hard to focus today.";
      advice.primaryAdvice = "Try the Pomodoro technique with shorter focus periods.";
      advice.secondaryAdvice = "Remove distractions from your environment if possible.";
      advice.encouragement = "Focus can be trained - each attempt strengthens your ability!";
      advice.recommendedSessionType = "pomodoro";
    } else if (focus >= 4) {
      advice.summary = "Your focus is strong today!";
      advice.primaryAdvice = "This is an excellent time for deep, concentrated work.";
      advice.secondaryAdvice = "Try to maintain this flow state by minimizing interruptions.";
      advice.encouragement = "With this level of focus, you can achieve great things today!";
      advice.recommendedSessionType = "deep-work";
    }
    
    return advice;
  }
};

/**
 * Generate AI responses for the FocusJuju application
 * @param {string} userMessage - The message sent by the user
 * @param {Object} userProfile - The user's profile data
 * @returns {Promise<string>} - The AI response
 */
export const generateAIResponse = async (userMessage, userProfile) => {
  try {
    // Determine message style based on user preference
    const messageStyle = userProfile?.preferences?.messageStyle || 'friendly';
    
    // If OpenAI API key is available, use it
    if (openaiApiKey) {
      const openai = new OpenAI({
        apiKey: openaiApiKey,
        dangerouslyAllowBrowser: true // For demo purposes - in production use a backend proxy
      });
      
      // Create system prompt based on message style
      let systemPrompt = "";
      
      switch (messageStyle) {
        case 'serious':
          systemPrompt = `You are FocusJuju, a professional, serious AI assistant focused on helping users stay productive. 
          Your responses are concise, formal, and focused on efficiency. 
          You avoid excessive emotion or humor, and instead focus on practical solutions.
          As a body double, you help the user stay on task with minimal distraction.
          Keep responses brief, fact-based, and solution-oriented.`;
          break;
          
        case 'funny':
          systemPrompt = `You are FocusJuju, a humorous and light-hearted AI assistant focused on helping users stay productive.
          Your responses are upbeat, witty, and include appropriate emojis and humor.
          You use fun metaphors and playful language to encourage the user.
          As a body double, you help the user stay on task but you do so with humor and lightness.
          Keep responses cheerful, creative, and sprinkle in appropriate jokes.`;
          break;
          
        case 'motivational':
          systemPrompt = `You are FocusJuju, a high-energy, motivational AI assistant focused on helping users stay productive.
          Your responses are enthusiastic, inspirational, and use strong, energetic language.
          You're like a personal coach cheering the user on to greater heights.
          As a body double, you help the user stay on task with energetic encouragement.
          Keep responses energetic, use CAPS for emphasis occasionally, and include motivational phrases.`;
          break;
          
        case 'friendly':
        default:
          systemPrompt = `You are FocusJuju, a friendly, supportive AI assistant focused on helping users stay productive.
          Your responses are warm, encouraging, and empathetic.
          You understand the challenges of staying focused and offer gentle support.
          As a body double, you help the user stay on task with kind encouragement.
          Keep responses supportive, positive, and include occasional emojis where appropriate.`;
          break;
      }
      
      // Add context about body doubling and current session
      systemPrompt += `\n\nYou're currently serving as a virtual "body double" - someone who works alongside the user to help them stay focused.
      Body doubling works because having someone else present (even virtually) creates accountability and reduces the feeling of isolation.
      
      When responding to the user:
      1. Keep responses relatively brief (1-3 sentences typically)
      2. Be encouraging without being intrusive
      3. If the user is struggling, offer practical suggestions like breaking tasks down smaller
      4. Remind them you're here to help them stay focused
      5. Don't ask too many questions - keep the focus on their work
      
      The user is currently in a focus session and has reached out to you while working.`;
      
      // Generate response from OpenAI
      const response = await openai.chat.completions.create({
        model: "gpt-3.5-turbo", // Use the model of your choice
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userMessage }
        ],
        max_tokens: 150, // Keep responses concise
        temperature: messageStyle === 'serious' ? 0.3 : 0.7, // Lower temperature for serious, higher for others
      });
      
      return response.choices[0]?.message?.content || "I'm here to support your focus session!";
    } else {
      // Use fallback AI if no API key
      return fallbackAI.generateResponse(userMessage, messageStyle);
    }
    
  } catch (error) {
    console.error("Error generating AI response:", error);
    
    // Fallback responses based on message style
    const fallbacks = {
      serious: "Continuing focus mode. I'm here if you need assistance with your task.",
      funny: "Oops! My brain had a mini vacation 🏝️ But I'm back now! Let's keep focusing!",
      motivational: "KEEP GOING! YOU'VE GOT THIS! I believe in your ability to achieve your goals!",
      friendly: "I'm here with you! Let's keep going with your focus session. You're doing great! 💪"
    };
    
    return fallbacks[userProfile?.preferences?.messageStyle] || fallbacks.friendly;
  }
};

/**
 * Generate micro-goals from a larger task
 * @param {string} taskDescription - The description of the larger task
 * @param {Object} userProfile - The user's profile data
 * @returns {Promise<Array>} - Array of micro-goals
 */
export const generateMicroGoals = async (taskDescription, userProfile) => {
  try {
    // If OpenAI API key is available, use it
    if (openaiApiKey) {
      const openai = new OpenAI({
        apiKey: openaiApiKey,
        dangerouslyAllowBrowser: true // For demo purposes - in production use a backend proxy
      });
      
      // Create system prompt for micro-goal generation
      const systemPrompt = `You are FocusJuju, an AI assistant specializing in breaking down large tasks into manageable micro-goals.
      
      For the task described by the user, create a list of 3-5 specific, actionable micro-goals that:
      1. Are small enough to complete in 15-30 minutes each
      2. Have clear completion criteria
      3. Follow a logical sequence
      4. Are specific and concrete
      
      Format your response as a JSON array of objects with these properties:
      - title: A brief, actionable title for the micro-goal
      - description: A 1-2 sentence description with more details
      - estimatedMinutes: Estimated time to complete (between 5-30 minutes)
      - priority: Either "high", "medium", or "low"
      
      The user's current energy level is: ${userProfile?.currentMood?.energy || 3}/5`;
      
      // Generate response from OpenAI
      const response = await openai.chat.completions.create({
        model: "gpt-3.5-turbo", // Use the model of your choice
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: `Task: ${taskDescription}` }
        ],
        response_format: { type: "json_object" },
      });
      
      // Parse the JSON response
      const content = response.choices[0]?.message?.content || '{"microGoals":[]}';
      const parsedResponse = JSON.parse(content);
      
      return parsedResponse.microGoals || [];
    } else {
      // Use fallback AI if no API key
      return fallbackAI.generateMicroGoals(taskDescription);
    }
    
  } catch (error) {
    console.error("Error generating micro-goals:", error);
    
    // Return fallback micro-goals
    return [
      {
        title: "Get started with a small piece",
        description: "Choose the easiest part of the task to begin with",
        estimatedMinutes: 15,
        priority: "high"
      },
      {
        title: "Continue making progress",
        description: "Work on the next logical step of the task",
        estimatedMinutes: 20,
        priority: "medium"
      },
      {
        title: "Review what you've done",
        description: "Check your work and identify next steps",
        estimatedMinutes: 10,
        priority: "low"
      }
    ];
  }
};

/**
 * Generate personalized advice based on user's mood and progress
 * @param {Object} userProfile - The user's profile including mood data
 * @param {Array} sessions - Recent session data
 * @returns {Promise<Object>} - Personalized advice and insights
 */
export const generatePersonalizedAdvice = async (userProfile, sessions = []) => {
  try {
    // Extract mood data
    const currentMood = userProfile?.currentMood || { mood: 3, energy: 3, focus: 3 };
    
    // Calculate session statistics
    const totalSessions = sessions.length;
    const totalMinutes = sessions.reduce((total, session) => {
      const duration = session.actualDurationSeconds || 0;
      return total + (duration / 60);
    }, 0);
    
    const averageSessionLength = totalSessions > 0 ? totalMinutes / totalSessions : 0;
    
    // If OpenAI API key is available, use it
    if (openaiApiKey) {
      const openai = new OpenAI({
        apiKey: openaiApiKey,
        dangerouslyAllowBrowser: true // For demo purposes - in production use a backend proxy
      });
      
      // Create system prompt
      const systemPrompt = `You are FocusJuju, an AI assistant specializing in productivity and focus.
      
      Based on the user's mood data and session history, provide personalized advice that:
      1. Acknowledges their current state
      2. Offers 1-2 specific, actionable suggestions
      3. Is encouraging and supportive
      
      Mood data (scale 1-5):
      - Overall mood: ${currentMood.mood}/5
      - Energy level: ${currentMood.energy}/5
      - Focus ability: ${currentMood.focus}/5
      
      Session data:
      - Total sessions: ${totalSessions}
      - Total minutes focused: ${Math.round(totalMinutes)}
      - Average session length: ${Math.round(averageSessionLength)} minutes
      
      Format your response as a JSON object with these properties:
      - summary: A brief summary of their current state (1-2 sentences)
      - primaryAdvice: The most important suggestion based on their data
      - secondaryAdvice: An additional helpful suggestion (optional)
      - encouragement: A brief encouraging message
      - recommendedSessionType: Either "body-double", "pomodoro", "deep-work", or "task-breakdown"`;
      
      // Generate response from OpenAI
      const response = await openai.chat.completions.create({
        model: "gpt-3.5-turbo", // Use the model of your choice
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: "What advice do you have for me today based on my mood and history?" }
        ],
        response_format: { type: "json_object" },
      });
      
      // Parse the JSON response
      const content = response.choices[0]?.message?.content || '{}';
      return JSON.parse(content);
    } else {
      // Use fallback AI if no API key
      return fallbackAI.generateAdvice(currentMood.mood, currentMood.energy, currentMood.focus);
    }
    
  } catch (error) {
    console.error("Error generating personalized advice:", error);
    
    // Return fallback advice
    return {
      summary: "You seem to be making steady progress with your focus sessions.",
      primaryAdvice: "Consider taking short breaks between focus sessions to maintain energy.",
      secondaryAdvice: "Try breaking down larger tasks into smaller steps for better progress.",
      encouragement: "You're doing great! Each focus session is building your productivity muscle.",
      recommendedSessionType: "body-double"
    };
  }
};

export default {
  generateAIResponse,
  generateMicroGoals,
  generatePersonalizedAdvice
};