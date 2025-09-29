// FIX: Update Firebase imports to use the v9 compat libraries to resolve module export errors.
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';


const requiredKeys = [
  'VITE_FIREBASE_API_KEY',
  'VITE_FIREBASE_AUTH_DOMAIN',
  'VITE_FIREBASE_PROJECT_ID',
  'VITE_FIREBASE_STORAGE_BUCKET',
  'VITE_FIREBASE_MESSAGING_SENDER_ID',
  'VITE_FIREBASE_APP_ID'
];

const missingKeys = requiredKeys.filter((key) => !import.meta.env[key]);

if (missingKeys.length > 0) {
  console.warn(
    `Firebase configuration is incomplete. Missing values for: ${missingKeys.join(', ')}.\n` +
      'Update your environment variables (see .env.example) before using authenticated features.'
  );
}

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID
};

// Initialize Firebase (guard against re-initialisation during hot reloads)
const app = firebase.apps.length ? firebase.app() : firebase.initializeApp(firebaseConfig);


// Export Firebase services
export const auth = firebase.auth();
export const db = firebase.firestore();
export const storage = firebase.storage();

if (import.meta.env.VITE_USE_FIREBASE_EMULATORS === 'true') {
  console.info('Using Firebase emulators for local development.');
  auth.useEmulator('http://localhost:9099');
  db.useEmulator('localhost', 8080);
  storage.useEmulator('localhost', 9199);
}

// Enable offline persistence
// FIX: Use the v8-compatible API for enabling persistence.
db.enablePersistence().catch((err) => {
    if (err.code === 'failed-precondition') {
        // This can happen if multiple tabs are open.
        console.warn('Firestore persistence failed: Multiple tabs open.');
    } else if (err.code === 'unimplemented') {
        // The current browser does not support all of the features required to enable persistence.
        console.warn('Firestore persistence is not supported in this browser.');
    }
});
