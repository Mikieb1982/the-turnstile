import path from 'path';
import { defineConfig } from 'vite';

// The loadEnv function is no longer needed as we are not loading environment variables.
// import { defineConfig, loadEnv } from 'vite';

export default defineConfig(({ mode }) => {
    // const env = loadEnv(mode, '.', '');
    return {
      // The 'define' block for setting the API key has been removed.
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '.'),
        }
      }
    };
});
