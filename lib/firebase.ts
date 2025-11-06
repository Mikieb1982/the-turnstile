// lib/firebase.ts

import { initializeApp, getApps, getApp, FirebaseApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// --- This is the new, smarter config loading ---

// FIX: Initialize with the fallback first to ensure it's always assigned
let firebaseConfig: {
  apiKey: string;
  authDomain: string;
  projectId: string;
  storageBucket: string;
  messagingSenderId: string;
  appId: string;
} = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY!,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN!,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID!,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET!,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID!,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID!,
};

// Now, try to overwrite it with the single JSON string if it exists
// (This is how Firebase App Hosting provides it)
if (process.env.NEXT_PUBLIC_FIREBASE_CONFIG) {
  try {
    firebaseConfig = JSON.parse(process.env.NEXT_PUBLIC_FIREBASE_CONFIG);
  } catch (e) {
    console.error('Failed to parse NEXT_PUBLIC_FIREBASE_CONFIG, using fallback keys.', e);
    // If parsing fails, the fallback initialized above will be used
  }
}
// --- End of new config loading ---

// Initialize Firebase
let app: FirebaseApp;
if (!getApps().length) {
  // Ensure config was loaded before initializing
  // This check is now safe because firebaseConfig is guaranteed to be assigned
  if (!firebaseConfig.apiKey) {
    console.error('Firebase config is missing. App cannot be initialized.');
  }
  app = initializeApp(firebaseConfig);
} else {
  app = getApp();
}

const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);
const googleAuthProvider = new GoogleAuthProvider();

export { app, auth, db, storage, googleAuthProvider };
