// src/services/aiService.js
import OpenAI from 'openai';

// Initialize OpenAI (in production, use environment variables)
const openai = new OpenAI({
  apiKey: process.env.REACT_APP_OPENAI_API_KEY, 
  dangerouslyAllowBrowser: true // For demo purposes - in production use a backend proxy
});

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