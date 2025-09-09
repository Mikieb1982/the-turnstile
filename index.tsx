import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { worker } from './mocks/browser';
import { BASE_URL } from './config';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error('Could not find root element to mount to');
}

// Ensure no trailing slash on BASE_URL, then append the worker path
const SW_URL = `${BASE_URL.replace(/\/$/, '')}/mockServiceWorker.js`;

// Start the Mock Service Worker
worker.start({
  onUnhandledRequest: 'bypass',
  serviceWorker: { url: SW_URL },
});

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
