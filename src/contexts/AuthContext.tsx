// src/contexts/AuthContext.tsx
import { createContext, useContext, useEffect, useState } from 'react';
import type { AuthUser } from '../types';
import * as authService from '../services/authService';

interface AuthContextType {
  currentUser: AuthUser | null;
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

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<AuthUser | null>(null);

  useEffect(() => {
    // Listen for authentication state changes using the local auth service
    const unsubscribe = authService.onAuthStateChanged((user) => {
      setCurrentUser(user);
    });

    // Unsubscribe from the listener when the component unmounts
    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    signUp: authService.signUp,
    signIn: authService.signIn,
    signInWithGoogle: authService.signInWithGoogle,
    passwordReset: authService.passwordReset,
    logOut: authService.logOut,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
