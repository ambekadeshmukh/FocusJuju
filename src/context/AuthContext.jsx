// src/context/AuthContext.jsx
import React, { createContext, useState, useEffect, useContext } from 'react';
import { auth, db } from '../firebase';
import { 
  onAuthStateChanged, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  updateProfile,
  signOut as firebaseSignOut,
  sendPasswordResetEmail 
} from 'firebase/auth';
import { 
  doc, 
  getDoc, 
  setDoc, 
  updateDoc, 
  serverTimestamp 
} from 'firebase/firestore';

// Create the auth context
const AuthContext = createContext();

// Custom hook to use the auth context
export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [authError, setAuthError] = useState('');

  // Sign in with email and password
  const signIn = async (email, password) => {
    setAuthError('');
    try {
      await signInWithEmailAndPassword(auth, email, password);
      return true;
    } catch (error) {
      console.error("Error signing in:", error);
      
      // Handle specific error codes with user-friendly messages
      if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password') {
        setAuthError('Invalid email or password. Please try again.');
      } else if (error.code === 'auth/too-many-requests') {
        setAuthError('Too many unsuccessful login attempts. Please try again later or reset your password.');
      } else {
        setAuthError('Failed to sign in. ' + (error.message || 'Please try again.'));
      }
      
      return false;
    }
  };

  // Sign up with email and password
  const signUp = async (email, password, name, preferences = {}) => {
    setAuthError('');
    try {
      // Create user in Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      
      // Set display name
      await updateProfile(userCredential.user, { displayName: name });
      
      // Create user profile in Firestore
      await setDoc(doc(db, 'users', userCredential.user.uid), {
        name,
        email,
        preferences: {
          messageStyle: preferences.messageStyle || 'friendly',
          sessionDuration: preferences.sessionDuration || 25,
          weekendMode: preferences.weekendMode !== false,
          soundEnabled: preferences.soundEnabled !== false
        },
        createdAt: serverTimestamp()
      });
      
      return true;
    } catch (error) {
      console.error("Error signing up:", error);
      
      // Handle specific error codes with user-friendly messages
      if (error.code === 'auth/email-already-in-use') {
        setAuthError('This email is already in use. Please use a different email or sign in instead.');
      } else if (error.code === 'auth/weak-password') {
        setAuthError('Password is too weak. Please use a stronger password.');
      } else if (error.code === 'auth/invalid-email') {
        setAuthError('Invalid email address. Please check your email format.');
      } else {
        setAuthError('Failed to create an account. ' + (error.message || 'Please try again.'));
      }
      
      return false;
    }
  };

  // Sign out
  const signOut = async () => {
    setAuthError('');
    try {
      await firebaseSignOut(auth);
      return true;
    } catch (error) {
      console.error("Error signing out:", error);
      setAuthError('Failed to sign out. Please try again.');
      return false;
    }
  };

  // Reset password
  const resetPassword = async (email) => {
    setAuthError('');
    try {
      await sendPasswordResetEmail(auth, email);
      return true;
    } catch (error) {
      console.error("Error resetting password:", error);
      
      if (error.code === 'auth/user-not-found') {
        setAuthError('No user found with this email address.');
      } else if (error.code === 'auth/invalid-email') {
        setAuthError('Invalid email address. Please check your email format.');
      } else {
        setAuthError('Failed to send password reset email. ' + (error.message || 'Please try again.'));
      }
      
      return false;
    }
  };

  // Update user profile in Firestore
  const updateUserProfile = async (updates) => {
    if (!currentUser) return false;
    
    setAuthError('');
    try {
      const userDocRef = doc(db, 'users', currentUser.uid);
      
      // Get current profile
      const userDoc = await getDoc(userDocRef);
      if (!userDoc.exists()) {
        throw new Error('User profile not found');
      }
      
      const currentProfile = userDoc.data();
      
      // Update with new values
      await updateDoc(userDocRef, {
        ...updates,
        updatedAt: serverTimestamp()
      });
      
      // Update local profile state
      setUserProfile({
        ...currentProfile,
        ...updates
      });
      
      return true;
    } catch (error) {
      console.error("Error updating profile:", error);
      setAuthError('Failed to update profile. Please try again.');
      return false;
    }
  };

  // Update user preferences
  const updateUserPreferences = async (preferences) => {
    if (!currentUser || !userProfile) return false;
    
    setAuthError('');
    try {
      const userDocRef = doc(db, 'users', currentUser.uid);
      
      const updates = {
        preferences: {
          ...userProfile.preferences,
          ...preferences
        },
        updatedAt: serverTimestamp()
      };
      
      // Update in Firestore
      await updateDoc(userDocRef, updates);
      
      // Update local state
      setUserProfile(prev => ({
        ...prev,
        preferences: {
          ...prev.preferences,
          ...preferences
        }
      }));
      
      return true;
    } catch (error) {
      console.error("Error updating preferences:", error);
      setAuthError('Failed to update preferences. Please try again.');
      return false;
    }
  };

  // Listen for auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      
      if (user) {
        // Get user profile data from Firestore
        try {
          const userDoc = await getDoc(doc(db, 'users', user.uid));
          if (userDoc.exists()) {
            setUserProfile(userDoc.data());
          } else {
            // If profile doesn't exist but user is authenticated, create a basic profile
            const basicProfile = {
              name: user.displayName || 'User',
              email: user.email,
              preferences: {
                messageStyle: 'friendly',
                sessionDuration: 25,
                weekendMode: true,
                soundEnabled: true
              },
              createdAt: serverTimestamp()
            };
            
            await setDoc(doc(db, 'users', user.uid), basicProfile);
            setUserProfile(basicProfile);
          }
        } catch (error) {
          console.error("Error fetching user profile:", error);
        }
      } else {
        setUserProfile(null);
      }
      
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  // Context value
  const value = {
    currentUser,
    userProfile,
    loading,
    authError,
    signIn,
    signUp,
    signOut,
    resetPassword,
    updateUserProfile,
    updateUserPreferences,
    setAuthError
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export default AuthContext;