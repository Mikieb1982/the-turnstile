import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/The-Scrum-Book/',
  optimizeDeps: {
    exclude: ['@google/genai'],
  },
  build: {
    rollupOptions: {
      external: ['@google/genai'],
    },
  },
});
