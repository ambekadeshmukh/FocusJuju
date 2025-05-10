// src/context/AuthContext.jsx
import React, { createContext, useState, useEffect, useContext } from 'react';
import { 
  auth, 
  db 
} from '../firebase';
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut as firebaseSignOut, 
  onAuthStateChanged,
  updateProfile
} from 'firebase/auth';
import { 
  doc, 
  setDoc, 
  getDoc, 
  serverTimestamp 
} from 'firebase/firestore';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [authError, setAuthError] = useState('');

  // Sign up function
  const signUp = async (email, password, name, preferences = {}) => {
    try {
      setAuthError('');
      // Create user with Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      
      // Update the user's display name
      await updateProfile(userCredential.user, {
        displayName: name
      });
      
      // Create user profile in Firestore
      await setDoc(doc(db, 'users', userCredential.user.uid), {
        name: name,
        email: email,
        preferences: preferences,
        createdAt: serverTimestamp(),
        currentMood: {
          mood: 3,
          energy: 3,
          focus: 3,
          timestamp: serverTimestamp()
        }
      });
      
      console.log("User created successfully!");
      return true;
    } catch (error) {
      console.error("Error in sign up:", error);
      
      // Handle specific error cases
      if (error.code === 'auth/email-already-in-use') {
        setAuthError('This email is already in use. Please try a different one or sign in.');
      } else if (error.code === 'auth/weak-password') {
        setAuthError('Password is too weak. Please use at least 6 characters.');
      } else {
        setAuthError('An error occurred during sign up. Please try again.');
      }
      
      return false;
    }
  };

  // Sign in function
  const signIn = async (email, password) => {
    try {
      setAuthError('');
      await signInWithEmailAndPassword(auth, email, password);
      return true;
    } catch (error) {
      console.error("Error in sign in:", error);
      
      // Handle specific error cases
      if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password') {
        setAuthError('Invalid email or password. Please try again.');
      } else if (error.code === 'auth/too-many-requests') {
        setAuthError('Too many failed login attempts. Please try again later or reset your password.');
      } else {
        setAuthError('An error occurred during sign in. Please try again.');
      }
      
      return false;
    }
  };

  // Sign out function
  const signOut = async () => {
    try {
      await firebaseSignOut(auth);
      return true;
    } catch (error) {
      console.error("Error signing out:", error);
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
            // If profile doesn't exist but user does, create a basic profile
            const basicProfile = {
              name: user.displayName || 'User',
              email: user.email,
              createdAt: serverTimestamp(),
              preferences: {
                messageStyle: 'friendly',
                sessionDuration: 25,
                weekendMode: true,
                soundEnabled: true
              },
              currentMood: {
                mood: 3,
                energy: 3,
                focus: 3,
                timestamp: serverTimestamp()
              }
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

  const value = {
    currentUser,
    userProfile,
    loading,
    authError,
    setAuthError,
    signUp,
    signIn,
    signOut
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}