// src/contexts/AuthContext.js - UPDATED VERSION
'use client';
import { createContext, useContext, useState, useEffect } from 'react';
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  sendPasswordResetEmail,
  updateProfile
} from 'firebase/auth';
import { auth, db } from '@/lib/firebase';
import { doc, setDoc, getDoc } from 'firebase/firestore';

const AuthContext = createContext({});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (authUser) => {
      if (authUser) {
        try {
          // Fetch additional user data from Firestore
          const userDoc = await getDoc(doc(db, 'users', authUser.uid));
          const userData = userDoc.data();
          
          setUser({
            uid: authUser.uid,
            email: authUser.email,
            displayName: authUser.displayName || userData?.displayName,
            role: userData?.role || 'member', // Default role is 'member'
            ...userData
          });
        } catch (error) {
          console.error('Error fetching user data:', error);
          setUser({
            uid: authUser.uid,
            email: authUser.email,
            displayName: authUser.displayName,
            role: 'member'
          });
        }
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const signup = async (email, password, displayName) => {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    
    // Update profile
    await updateProfile(userCredential.user, { displayName });
    
    // Create user document in Firestore
    await setDoc(doc(db, 'users', userCredential.user.uid), {
      displayName,
      email,
      createdAt: new Date(),
      role: 'member', // Default role for new users
      isActive: true
    });

    return userCredential;
  };

  const login = async (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logout = async () => {
    return signOut(auth);
  };

  const resetPassword = async (email) => {
    return sendPasswordResetEmail(auth, email);
  };

  // Check if user has admin role
  const isAdmin = () => {
    return user?.role === 'admin';
  };

  // Check if user has staff role (staff or admin)
  const isStaff = () => {
    return user?.role === 'admin' || user?.role === 'staff';
  };

  const value = {
    user,
    loading,
    signup,
    login,
    logout,
    resetPassword,
    isAdmin,
    isStaff
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};