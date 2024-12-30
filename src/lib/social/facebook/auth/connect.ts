import { supabase } from '../../../supabase';
import { logger } from '../../../utils/logger';
import { loginToFacebook } from './login';
import { getUserInfo } from '../api/user';

export const connectFacebook = async () => {
  try {
    // Login to Facebook
    const loginResponse = await loginToFacebook();
    if (!loginResponse.authResponse) {
      throw new Error('No auth response from Facebook');
    }

    // Get user info
    const userInfo = await getUserInfo();

    // Get current auth session
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('User not authenticated');

    // Store connection in Supabase
    const { data: connection, error } = await supabase
      .from('social_connections')
      .insert({
        user_id: user.id,
        platform: 'facebook',
        access_token: loginResponse.authResponse.accessToken,
        expires_at: new Date(Date.now() + loginResponse.authResponse.expiresIn * 1000).toISOString(),
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