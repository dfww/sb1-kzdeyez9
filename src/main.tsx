import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './App';
import './styles/theme.css';
import { initAuth } from './lib/auth/initAuth';
import { initFacebookSDK } from './lib/social/facebook/sdk';
import './i18n/config';

// Initialize Facebook SDK and auth immediately
Promise.all([
  initFacebookSDK(),
  initAuth()
]).catch(console.error);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);