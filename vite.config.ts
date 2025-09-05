import path from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  base: '/The-Scrum-Book/',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '.'),
    }
  }
});
