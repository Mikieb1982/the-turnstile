import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';
import { getFirestore } from 'firebase/firestore';

// 1. Parse the config from the environment variable
const firebaseConfigStr = process.env.NEXT_PUBLIC_FIREBASE_CONFIG;

if (!firebaseConfigStr) {
  throw new Error("Missing Firebase config environment variable (NEXT_PUBLIC_FIREBASE_CONFIG)");
}

const firebaseConfig = JSON.parse(firebaseConfigStr);

// 2. Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

const auth = getAuth(app);
const storage = getStorage(app);
const db = getFirestore(app);

export { auth, storage, db };
