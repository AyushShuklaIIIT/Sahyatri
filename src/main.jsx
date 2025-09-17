import { StrictMode, useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import "leaflet/dist/leaflet.css";
import { Auth0Provider } from '@auth0/auth0-react';
import './i18n';
import { Provider } from 'react-redux';

// ✅ PWA service worker helper
import { registerSW } from 'virtual:pwa-register'
import { store } from './store/store.js';

const domain = import.meta.env.VITE_AUTH0_DOMAIN;
const clientId = import.meta.env.VITE_AUTH0_CLIENT_ID;
const audience = import.meta.env.VITE_AUTH0_AUDIENCE;

// ---------------- PWA Registration + Logs -----------------
registerSW({
  onNeedRefresh() {
    console.log("New content available, refresh the page.");
  },
  onOfflineReady() {
    console.log("App ready to work offline.");
  },
  onRegistered(registration) {
    console.log("Service Worker registered:", registration);
  },
  onRegisterError(error) {
    console.error("Service Worker registration failed:", error);
  },
});

fetch("/manifest.webmanifest")
  .then(res => res.json())
  .then(data => console.log("Manifest loaded successfully:", data))
  .catch(err => console.error("Failed to load manifest:", err));

// ---------------- Install Prompt Debug -----------------
let deferredPrompt = null;
window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  console.log('beforeinstallprompt fired');
  deferredPrompt = e; // store the event to trigger later
});

window.addEventListener('appinstalled', (e) => {
  console.log('App installed!', e);
});

console.log('Current URL:', window.location.href);
console.log('Service Worker controller:', navigator.serviceWorker.controller);
// --------------------------------------------------------

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <Auth0Provider
        domain={domain}
        clientId={clientId}
        authorizationParams={{
          redirect_uri: window.location.origin,
          audience: audience,
          scope: 'openid profile email'
        }}
      >
        <App deferredPrompt={deferredPrompt} />
      </Auth0Provider>
    </Provider>
  </StrictMode>
);
