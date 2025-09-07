import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { worker } from './mocks/browser';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

// Start the Mock Service Worker
// When deploying to a sub-path (like GitHub Pages), we need to provide the explicit URL to the worker script.
// MSW defaults to looking for it at the root, which causes it to fail in this configuration.
worker.start({
  onUnhandledRequest: 'bypass', // Pass through any requests that are not handled by our mock server
  serviceWorker: {
    url: '/The-Scrum-Book/mockServiceWorker.js'
  }
});

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);