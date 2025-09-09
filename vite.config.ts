import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // This base path is crucial for GitHub Pages deployment.
  // It tells Vite that your app will be served from a subdirectory.
  base: '/The-Scrum-Book/',
  build: {
    // Set the target to esnext to ensure modern JS features like import.meta are supported.
    target: 'esnext'
  }
});
