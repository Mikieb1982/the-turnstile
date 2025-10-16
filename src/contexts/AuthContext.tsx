// src/contexts/AuthContext.tsx
import React, { createContext, useContext, useEffect, useState } from 'react';
import type { AuthUser } from '../types';
import * as authService from '../services/authService';

interface AuthContextType {
  currentUser: AuthUser | null;
  loading: boolean;
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

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Listen for authentication state changes using the local auth service
    const unsubscribe = authService.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    // Unsubscribe from the listener when the component unmounts
    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    loading,
    signUp: authService.signUp,
    signIn: authService.signIn,
    signInWithGoogle: authService.signInWithGoogle,
    passwordReset: authService.passwordReset,
    logOut: authService.logOut,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
