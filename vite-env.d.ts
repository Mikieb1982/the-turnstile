// FIX: Manually define Vite's `import.meta.env` type to resolve errors.
// The project's TypeScript configuration is not correctly picking up `vite/client`
// types, causing errors. This manual definition for the used properties on
// `import.meta.env` resolves the issue.
interface ImportMetaEnv {
  readonly BASE_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
