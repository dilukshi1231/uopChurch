// src/contexts/AuthContext.js - CORRECTED VERSION
'use client';
import { createContext, useContext, useEffect, useState } from 'react';
import { 
  onAuthStateChanged, 
  signInWithEmailAndPassword, 
  signOut,
  createUserWithEmailAndPassword 
} from 'firebase/auth';
import { auth, db } from '@/lib/firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { useRouter } from 'next/navigation';

const AuthContext = createContext({});

export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    console.log('🔄 AuthProvider mounted - setting up auth listener');
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      console.log('🔔 Auth state changed:', firebaseUser?.email);
      
      if (firebaseUser) {
        try {
          const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid));
          
          if (userDoc.exists()) {
            const userData = {
              uid: firebaseUser.uid,
              email: firebaseUser.email,
              ...userDoc.data()
            };
            console.log('✅ User data loaded:', { 
              email: userData.email, 
              role: userData.role,
              isActive: userData.isActive 
            });
            setUser(userData);
          } else {
            console.warn('⚠️ User document not found in Firestore');
            setUser(null);
          }
        } catch (error) {
          console.error('❌ Error fetching user data:', error);
          setUser(null);
        }
      } else {
        console.log('👤 No user logged in');
        setUser(null);
      }
      
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const login = async (email, password) => {
    try {
      console.log('🔐 Attempting login for:', email);
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      
      // Fetch user role from Firestore
      const userDoc = await getDoc(doc(db, 'users', userCredential.user.uid));
      
      if (userDoc.exists()) {
        const userData = userDoc.data();
        console.log('✅ Login successful. User role:', userData.role);
        
        // Check if user is active
        if (userData.isActive === false) {
          await signOut(auth);
          throw new Error('Your account has been deactivated. Please contact the administrator.');
        }
        
        // Redirect based on role
        if (userData.role === 'admin' || userData.role === 'staff') {
          console.log('🔀 Redirecting to admin dashboard');
          router.push('/admin');
        } else {
          console.log('🔀 Redirecting regular user to home page');
          router.push('/'); // CHANGED: Redirect regular users to home page
        }
        
        return { success: true, role: userData.role };
      } else {
        console.error('❌ User document not found in Firestore');
        throw new Error('User data not found');
      }
    } catch (error) {
      console.error('❌ Login error:', error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      router.push('/');
    } catch (error) {
      console.error('Logout error:', error);
      throw error;
    }
  };

  const signup = async (email, password, displayName) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      
      // Create user document in Firestore with default 'user' role
      await setDoc(doc(db, 'users', userCredential.user.uid), {
        displayName: displayName || email.split('@')[0],
        email,
        role: 'user', // Default role
        isActive: true,
        createdAt: new Date()
      });

      // CHANGED: Redirect new users to home page instead of dashboard
      router.push('/');
      return { success: true };
    } catch (error) {
      console.error('Signup error:', error);
      throw error;
    }
  };

  const value = {
    user,
    loading,
    login,
    logout,
    signup
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}