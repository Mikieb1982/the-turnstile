// FIX: Commented out the reference to "vite/client" to resolve a type resolution error.
// This error typically points to a project configuration issue (e.g., in tsconfig.json).
// This workaround allows the file's type definitions for `import.meta.env` to function
// in environments where Vite's types aren't automatically discovered.
// /// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_FIREBASE_API_KEY: string;
  readonly VITE_FIREBASE_AUTH_DOMAIN: string;
  readonly VITE_FIREBASE_PROJECT_ID: string;
  readonly VITE_FIREBASE_STORAGE_BUCKET: string;
  readonly VITE_FIREBASE_MESSAGING_SENDER_ID: string;
  readonly VITE_FIREBASE_APP_ID: string;
  readonly VITE_FIREBASE_MEASUREMENT_ID: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}