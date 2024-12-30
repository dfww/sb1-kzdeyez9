import { facebookConfig } from './config';
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
        FB.init({
          appId: facebookConfig.appId,
          cookie: true,
          xfbml: true,
          version: facebookConfig.version
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
        if (firstScript?.parentNode) {
          firstScript.parentNode.insertBefore(script, firstScript);
        }
      }
    } catch (error) {
      logger.error('Failed to initialize Facebook SDK:', error);
      initializationPromise = null;
      reject(error);
    }
  });

  return initializationPromise;
};

export const ensureFBInitialized = async () => {
  if (!isFBInitialized) {
    await initFacebookSDK();
  }
  return true;
};

// Add the missing fbApiCall export
export const fbApiCall = <T>(path: string, params: object = {}): Promise<T> => {
  return new Promise((resolve, reject) => {
    FB.api(path, params, (response: T | { error: any }) => {
      if ('error' in response) {
        reject(response.error);
      } else {
        resolve(response as T);
      }
    });
  });
};