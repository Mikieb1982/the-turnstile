import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  onAuthStateChanged as firebaseOnAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile as firebaseUpdateProfile,
  type User as FirebaseUser,
} from 'firebase/auth';

import { auth } from '../lib/firebase';
import type { AuthUser } from '../types';

type AuthListener = (user: AuthUser | null) => void;

const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: 'select_account' });

const toAuthUser = (user: FirebaseUser): AuthUser => ({
  uid: user.uid,
  displayName: user.displayName,
  email: user.email,
  avatarUrl: user.photoURL,
  isAnonymous: user.isAnonymous,
});

export const onAuthStateChanged = (callback: AuthListener) =>
  firebaseOnAuthStateChanged(auth, (user) => {
    callback(user ? toAuthUser(user) : null);
  });

export const signUp = async (name: string, email: string, password: string) => {
  const trimmedName = name.trim();
  const normalisedEmail = email.trim().toLowerCase();
  const trimmedPassword = password.trim();

  if (!trimmedName || !normalisedEmail || !trimmedPassword) {
    throw new Error('Name, email, and password are required to create an account.');
  }

  const userCredential = await createUserWithEmailAndPassword(auth, normalisedEmail, trimmedPassword);
  const { user } = userCredential;

  if (trimmedName && user.displayName !== trimmedName) {
    await firebaseUpdateProfile(user, { displayName: trimmedName });
  }

  return toAuthUser(auth.currentUser ?? user);
};

export const signIn = async (email: string, password: string) => {
  const normalisedEmail = email.trim().toLowerCase();
  const trimmedPassword = password.trim();

  if (!normalisedEmail || !trimmedPassword) {
    throw new Error('Email and password are required to sign in.');
  }

  const { user } = await signInWithEmailAndPassword(auth, normalisedEmail, trimmedPassword);
  return toAuthUser(user);
};

export const signInWithGoogle = async () => {
  const { user } = await signInWithPopup(auth, googleProvider);
  return toAuthUser(user);
};

export const passwordReset = async (identifier: string) => {
  const trimmedEmail = identifier.trim();
  if (!trimmedEmail) {
    throw new Error('Please provide an email address to reset your password.');
  }

  await sendPasswordResetEmail(auth, trimmedEmail.toLowerCase());
};

export const logOut = async () => {
  await signOut(auth);
};

interface ProfileUpdates {
  name?: string | null;
  avatarUrl?: string | null;
}

export const updateProfile = async (updates: ProfileUpdates) => {
  const user = auth.currentUser;
  if (!user) {
    throw new Error('No active session found.');
  }

  const profileUpdates: { displayName?: string | null; photoURL?: string | null } = {};

  if (Object.prototype.hasOwnProperty.call(updates, 'name')) {
    profileUpdates.displayName = updates.name ?? null;
  }

  if (Object.prototype.hasOwnProperty.call(updates, 'avatarUrl')) {
    profileUpdates.photoURL = updates.avatarUrl ?? null;
  }

  if (Object.keys(profileUpdates).length > 0) {
    await firebaseUpdateProfile(user, profileUpdates);
  }

  return toAuthUser(auth.currentUser ?? user);
};
