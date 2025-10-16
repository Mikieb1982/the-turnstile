// src/services/authService.ts
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  sendPasswordResetEmail,
  signOut,
  updateProfile,
} from 'firebase/auth';
import { auth } from '../firebase';

// Sign Up with Email and Password
export const signUp = async (name, email, password) => {
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  // Add the user's name to their profile
  if (userCredential.user) {
    await updateProfile(userCredential.user, { displayName: name });
  }
  return userCredential;
};

// Sign In with Email and Password
export const signIn = (email, password) => {
  return signInWithEmailAndPassword(auth, email, password);
};

// Sign In with Google
export const signInWithGoogle = () => {
  const provider = new GoogleAuthProvider();
  return signInWithPopup(auth, provider);
};

// Password Reset
export const passwordReset = (email) => {
  return sendPasswordResetEmail(auth, email);
};

// Sign Out
export const logOut = () => {
  return signOut(auth);
};
