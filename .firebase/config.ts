// src/firebase/config.ts

/**
 * Centralized Firebase configuration.
 * This module reads environment variables and exports a configuration object
 * for use throughout the application. It ensures that Firebase is only initialized
 * once and provides a single source of truth for configuration values.
 */

interface FirebaseConfig {
  apiKey: string;
  authDomain: string;
  projectId: string;
  storageBucket: string;
  messagingSenderId: string;
  appId: string;
  measurementId?: string;
  useEmulators: boolean;
}

const firebaseConfig: FirebaseConfig = {
  apiKey: (import.meta.env.VITE_FIREBASE_API_KEY || '').trim(),
  authDomain: (import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || '').trim(),
  projectId: (import.meta.env.VITE_FIREBASE_PROJECT_ID || '').trim(),
  storageBucket: (import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || '').trim(),
  messagingSenderId: (import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || '').trim(),
  appId: (import.meta.env.VITE_FIREBASE_APP_ID || '').trim(),
  measurementId: (import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || '').trim() || undefined,
  useEmulators: import.meta.env.VITE_USE_FIREBASE_EMULATORS === 'true',
};

// A function to check if the core Firebase configuration is present.
// This helps differentiate between a local-only setup and a Firebase-connected setup.
export const isFirebaseConfigured = (): boolean => {
  return !!(
    firebaseConfig.apiKey &&
    firebaseConfig.authDomain &&
    firebaseConfig.projectId
  );
};

export const getGoogleClientId = (): string | undefined => {
    const clientId = (import.meta.env.VITE_GOOGLE_CLIENT_ID || '').trim();
    return clientId || undefined;
}

export default firebaseConfig;
