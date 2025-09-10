// FIX: Update Firebase imports to use the v9 compat libraries to resolve module export errors.
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';


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

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);


// Export Firebase services
export const auth = firebase.auth();
export const db = firebase.firestore();
export const storage = firebase.storage();

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