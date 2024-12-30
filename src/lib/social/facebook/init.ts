import { logger } from '../../utils/logger';

let isFBInitialized = false;
let initializationPromise: Promise<void> | null = null;

export const initFacebookSDK = () => {
  if (initializationPromise) {
    return initializationPromise;
  }

  initializationPromise = new Promise<void>((resolve, reject) => {
    if (isFBInitialized) {
      resolve();
      return;
    }

    try {
      window.fbAsyncInit = () => {
        window.FB.init({
          appId: import.meta.env.VITE_FACEBOOK_APP_ID,
          cookie: true,
          xfbml: true,
          version: 'v18.0'
        });
        
        isFBInitialized = true;
        logger.debug('Facebook SDK initialized');
        resolve();
      };

      // Load SDK asynchronously
      const script = document.createElement('script');
      script.src = 'https://connect.facebook.net/en_US/sdk.js';
      script.async = true;
      script.defer = true;
      script.crossOrigin = 'anonymous';
      
      if (!document.getElementById('facebook-jssdk')) {
        const firstScript = document.getElementsByTagName('script')[0];
        firstScript?.parentNode?.insertBefore(script, firstScript);
      }
    } catch (error) {
      logger.error('Failed to initialize Facebook SDK:', error);
      initializationPromise = null;
      reject(error);
    }
  });

  return initializationPromise;
};

// Helper function to ensure FB SDK is initialized
export const ensureFBInitialized = async () => {
  if (!isFBInitialized) {
    await initFacebookSDK();
  }
  return true;
};