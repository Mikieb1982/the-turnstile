import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import { worker } from './mocks/browser.ts';
import { BASE_URL } from './config.ts';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error('Could not find root element to mount to');
}

// Ensure no trailing slash on BASE_URL, then append the worker path
const SW_URL = `${BASE_URL.replace(/\/$/, '')}/mockServiceWorker.js`;

async function enableMocks() {
  if (import.meta.env.MODE === 'development') {
    await worker.start({
      onUnhandledRequest: 'bypass',
      serviceWorker: { url: SW_URL },
    });
  }
}

enableMocks().then(() => {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
});

