/**
 * The base URL of the application.
 * This is configured in `vite.config.ts` and provided by Vite's environment variables.
 * It's crucial for correct asset and service worker pathing, especially for deployments
 * to a subdirectory (like on GitHub Pages).
 */
export const BASE_URL = import.meta.env.BASE_URL;

/**
 * The prefix for all API calls.
 * For the local development environment using Mock Service Worker (MSW),
 * requests are intercepted at the root level, so this is an empty string.
 * For a real backend, this might be something like 'https://api.example.com'.
 */
export const API_PREFIX = '';

