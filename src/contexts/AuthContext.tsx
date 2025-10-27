// src/contexts/AuthContext.tsx
<<<<<<< HEAD
import { createContext, useContext, useEffect, useState } from 'react';
=======
import React, { createContext, useContext, useEffect, useState } from 'react';
>>>>>>> 27e8a865d1dcb8be48c266b1dfcaa1f03b83bcb9
import type { AuthUser } from '../types';
import * as authService from '../services/authService';

interface AuthContextType {
  currentUser: AuthUser | null;
<<<<<<< HEAD
=======
  loading: boolean;
>>>>>>> 27e8a865d1dcb8be48c266b1dfcaa1f03b83bcb9
  signUp: typeof authService.signUp;
  signIn: typeof authService.signIn;
  signInWithGoogle: typeof authService.signInWithGoogle;
  passwordReset: typeof authService.passwordReset;
  logOut: typeof authService.logOut;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

<<<<<<< HEAD
export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<AuthUser | null>(null);
=======
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);
>>>>>>> 27e8a865d1dcb8be48c266b1dfcaa1f03b83bcb9

  useEffect(() => {
    // Listen for authentication state changes using the local auth service
    const unsubscribe = authService.onAuthStateChanged((user) => {
      setCurrentUser(user);
<<<<<<< HEAD
=======
      setLoading(false);
>>>>>>> 27e8a865d1dcb8be48c266b1dfcaa1f03b83bcb9
    });

    // Unsubscribe from the listener when the component unmounts
    return unsubscribe;
  }, []);

  const value = {
    currentUser,
<<<<<<< HEAD
=======
    loading,
>>>>>>> 27e8a865d1dcb8be48c266b1dfcaa1f03b83bcb9
    signUp: authService.signUp,
    signIn: authService.signIn,
    signInWithGoogle: authService.signInWithGoogle,
    passwordReset: authService.passwordReset,
    logOut: authService.logOut,
  };

  return (
    <AuthContext.Provider value={value}>
<<<<<<< HEAD
      {children}
=======
      {!loading && children}
>>>>>>> 27e8a865d1dcb8be48c266b1dfcaa1f03b83bcb9
    </AuthContext.Provider>
  );
};
