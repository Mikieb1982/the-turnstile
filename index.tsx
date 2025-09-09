import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { worker } from './mocks/browser';
import { BASE_URL } from './config';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

// Start the Mock Service Worker before rendering so it can intercept initial requests.
async function enableMocks() {
  await worker.start({
    onUnhandledRequest: 'bypass', // Pass through any requests that are not handled by our mock server
    serviceWorker: {
      url: `${BASE_URL}/mockServiceWorker.js`
    }
  });
}

enableMocks().then(() => {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
});
