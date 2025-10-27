// .firebase/config.ts

/**
 * Centralized Firebase configuration.
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

// This is the only change needed. "export" is added before "const".
export const firebaseConfig: FirebaseConfig = {
  apiKey: (import.meta.env.VITE_FIREBASE_API_KEY || '').trim(),
  authDomain: (import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || '').trim(),
  projectId: (import.meta.env.VITE_FIREBASE_PROJECT_ID || '').trim(),
  storageBucket: (import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || '').trim(),
  messagingSenderId: (import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || '').trim(),
  appId: (import.meta.env.VITE_FIREBASE_APP_ID || '').trim(),
  measurementId: (import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || '').trim() || undefined,
  useEmulators: import.meta.env.VITE_USE_FIREBASE_EMULATORS === 'true',
};

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

// We no longer need a separate export statement at the end.
