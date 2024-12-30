import { supabase } from '../supabase';
import { logger } from '../utils/logger';

const FB_APP_ID = import.meta.env.VITE_FACEBOOK_APP_ID;

if (!FB_APP_ID) {
  throw new Error('Facebook App ID not configured. Please add VITE_FACEBOOK_APP_ID to your .env file.');
}

export const initFacebookSDK = () => {
  return new Promise<void>((resolve, reject) => {
    try {
      // Load the Facebook SDK
      window.fbAsyncInit = () => {
        FB.init({
          appId: FB_APP_ID,
          cookie: true,
          xfbml: true,
          version: 'v18.0'
        });
        
        logger.debug('Facebook SDK initialized');
        resolve();
      };

      // Load SDK asynchronously
      const script = document.createElement('script');
      script.src = 'https://connect.facebook.net/en_US/sdk.js';
      script.async = true;
      script.defer = true;
      script.crossOrigin = 'anonymous';
      script.id = 'facebook-jssdk';
      
      if (!document.getElementById('facebook-jssdk')) {
        const firstScript = document.getElementsByTagName('script')[0];
        firstScript?.parentNode?.insertBefore(script, firstScript);
      }
    } catch (error) {
      logger.error('Failed to initialize Facebook SDK:', error);
      reject(error);
    }
  });
};

export const connectFacebook = async () => {
  try {
    const response = await new Promise<fb.StatusResponse>((resolve) => {
      FB.login(resolve, {
        scope: 'public_profile,pages_show_list,pages_read_engagement',
        return_scopes: true
      });
    });

    if (response.status !== 'connected') {
      throw new Error('Facebook login failed');
    }

    const { authResponse } = response;
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) throw new Error('User not authenticated');

    // Store the connection in Supabase
    const { error } = await supabase
      .from('social_connections')
      .insert({
        user_id: user.id,
        platform: 'facebook',
        access_token: authResponse.accessToken,
        expires_at: new Date(Date.now() + authResponse.expiresIn * 1000).toISOString()
      });

    if (error) throw error;
    logger.debug('Facebook connection successful');
    return true;
  } catch (error) {
    logger.error('Facebook connection failed:', error);
    throw error;
  }
};