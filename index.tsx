import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { worker } from './mocks/browser';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

// Start the Mock Service Worker
// Use the app's base URL so the worker script loads correctly in dev and production.
const baseUrl = import.meta.env.BASE_URL.replace(/\/$/, '');
worker.start({
  onUnhandledRequest: 'bypass', // Pass through any requests that are not handled by our mock server
  serviceWorker: {
    url: `${baseUrl}/mockServiceWorker.js`
  }
});

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
