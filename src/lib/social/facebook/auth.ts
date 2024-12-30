import { supabase } from '../../supabase';
import { logger } from '../../utils/logger';
import { ensureFBInitialized } from './sdk';
import { facebookConfig } from './config';

export const connectFacebook = async () => {
  try {
    await ensureFBInitialized();

    // Get user info
    const userInfo = await new Promise<{ id: string; name: string; email?: string }>((resolve, reject) => {
      FB.api('/me', { fields: 'id,name,email' }, (response) => {
        if (response.error) reject(response.error);
        else resolve(response);
      });
    });

    // Get current auth session
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('User not authenticated');

    // Get Facebook auth response
    const authResponse = FB.getAuthResponse();
    if (!authResponse) throw new Error('No Facebook auth response');

    // Store connection in Supabase
    const { data: connection, error } = await supabase
      .from('social_connections')
      .insert({
        user_id: user.id,
        platform: 'facebook',
        access_token: authResponse.accessToken,
        expires_at: new Date(Date.now() + authResponse.expiresIn * 1000).toISOString(),
        connected_user_name: userInfo.name,
        connected_user_id: userInfo.id,
        connected_user_email: userInfo.email
      })
      .select()
      .single();

    if (error) throw error;
    if (!connection) throw new Error('Failed to create connection');

    logger.debug('Facebook connection successful', {
      userId: user.id,
      fbUserId: userInfo.id
    });

    return connection;
  } catch (error) {
    logger.error('Failed to connect Facebook:', error);
    throw error;
  }
};