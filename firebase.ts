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
] as const;

type RequiredFirebaseKey = (typeof requiredKeys)[number];

type FirebaseEnv = Pick<ImportMetaEnv, RequiredFirebaseKey | 'VITE_FIREBASE_MEASUREMENT_ID' | 'VITE_USE_FIREBASE_EMULATORS'>;

const env: FirebaseEnv = import.meta.env;

const missingKeys = requiredKeys.filter((key) => !env[key]);

export const isFirebaseConfigured = missingKeys.length === 0;

if (!isFirebaseConfigured) {
  console.warn(
    `Firebase configuration is incomplete. Missing values for: ${missingKeys.join(', ')}.\n` +
      'Update your environment variables (see .env.example) before using authenticated features.'
  );
}

const firebaseConfig = isFirebaseConfigured
  ? {
      apiKey: env.VITE_FIREBASE_API_KEY,
      authDomain: env.VITE_FIREBASE_AUTH_DOMAIN,
      projectId: env.VITE_FIREBASE_PROJECT_ID,
      storageBucket: env.VITE_FIREBASE_STORAGE_BUCKET,
      messagingSenderId: env.VITE_FIREBASE_MESSAGING_SENDER_ID,
      appId: env.VITE_FIREBASE_APP_ID,
      measurementId: env.VITE_FIREBASE_MEASUREMENT_ID
    }
  : undefined;

export const app = isFirebaseConfigured
  ? firebase.apps.length
    ? firebase.app()
    : firebase.initializeApp(firebaseConfig!)
  : null;

export const auth = isFirebaseConfigured ? firebase.auth() : null;
export const db = isFirebaseConfigured ? firebase.firestore() : null;
export const storage = isFirebaseConfigured ? firebase.storage() : null;

if (isFirebaseConfigured && auth && db) {
  if (env.VITE_USE_FIREBASE_EMULATORS === 'true') {
    console.info('Using Firebase emulators for local development.');
    auth.useEmulator('http://localhost:9099');
    db.useEmulator('localhost', 8080);
    storage?.useEmulator('localhost', 9199);
  }

  db.enablePersistence().catch((err: firebase.firestore.FirestoreError) => {
    if (err.code === 'failed-precondition') {
      console.warn('Firestore persistence failed: Multiple tabs open.');
    } else if (err.code === 'unimplemented') {
      console.warn('Firestore persistence is not supported in this browser.');
    }
  });
}
