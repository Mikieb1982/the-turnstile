// FIX: Manually define Vite's `import.meta.env` type to resolve errors.
// The project's TypeScript configuration is not correctly picking up `vite/client`
// types, causing errors. This manual definition for the used properties on
// `import.meta.env` resolves the issue.
interface ImportMetaEnv {
  readonly BASE_URL: string;
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