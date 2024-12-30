import { ensureFBInitialized } from '../sdk';
import { facebookConfig } from '../config';
import { logger } from '../../../utils/logger';
import type { FacebookLoginResponse } from '../types';

export const loginToFacebook = async (): Promise<FacebookLoginResponse> => {
  try {
    await ensureFBInitialized();

    const response = await new Promise<FacebookLoginResponse>((resolve) => {
      FB.login(resolve, {
        scope: [...facebookConfig.permissions.basic, ...facebookConfig.permissions.pages].join(','),
        return_scopes: true,
        enable_profile_selector: true,
        auth_type: 'rerequest'
      });
    });

    if (response.status !== 'connected') {
      throw new Error('Facebook login failed');
    }

    logger.debug('Facebook login successful');
    return response;
  } catch (error) {
    logger.error('Facebook login failed:', error);
    throw error;
  }
};