'use client';
import { createContext, useContext, useEffect, useState } from 'react';
import { 
  onAuthStateChanged, 
  signInWithEmailAndPassword, 
  signOut,
  createUserWithEmailAndPassword 
} from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { auth, db } from '@/lib/firebase';
import { useRouter } from 'next/navigation';

const AuthContext = createContext({});

export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      console.log('🔥 Auth State Changed:', firebaseUser?.email);
      
      if (firebaseUser) {
        try {
          // Fetch user data from Firestore
          const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid));
          
          if (userDoc.exists()) {
            const userData = userDoc.data();
            console.log('📄 User Data from Firestore:', userData);
            
            setUser({
              uid: firebaseUser.uid,
              email: firebaseUser.email,
              displayName: userData.displayName || firebaseUser.displayName,
              role: userData.role || 'user',
              isActive: userData.isActive !== undefined ? userData.isActive : true,
              ...userData
            });
          } else {
            // If user document doesn't exist, create it with default role
            const newUserData = {
              displayName: firebaseUser.displayName || firebaseUser.email?.split('@')[0] || 'User',
              email: firebaseUser.email,
              role: 'user',
              isActive: true,
              createdAt: new Date()
            };
            
            await setDoc(doc(db, 'users', firebaseUser.uid), newUserData);
            
            setUser({
              uid: firebaseUser.uid,
              email: firebaseUser.email,
              ...newUserData
            });
          }
        } catch (error) {
          console.error('❌ Error fetching user data:', error);
          setUser(null);
        }
      } else {
        console.log('👤 No authenticated user');
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
        if (userData.role === 'admin') {
          console.log('🔀 Redirecting to admin dashboard');
          router.push('/admin');
        } else {
          console.log('🔀 Redirecting to user dashboard');
          router.push('/dashboard');
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

      router.push('/dashboard');
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