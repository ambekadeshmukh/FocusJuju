// src/services/databaseService.js
import { db } from '../firebase';
import { 
  collection, 
  doc, 
  setDoc, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  query, 
  where, 
  getDocs, 
  getDoc, 
  orderBy, 
  limit, 
  serverTimestamp 
} from 'firebase/firestore';

// User operations
export const createUserProfile = async (userId, userData) => {
  return setDoc(doc(db, 'users', userId), {
    ...userData,
    createdAt: serverTimestamp()
  });
};

// Task operations
export const addTask = async (taskData) => {
  return addDoc(collection(db, 'tasks'), {
    ...taskData,
    createdAt: serverTimestamp()
  });
};

// Session operations
export const startSession = async (sessionData) => {
  return addDoc(collection(db, 'sessions'), {
    ...sessionData,
    startTime: serverTimestamp(),
    status: 'in-progress'
  });
};

// Additional database operations...