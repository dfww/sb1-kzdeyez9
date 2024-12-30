import { supabase } from '../../supabase';
import { logger } from '../../utils/logger';
import { ensureFBInitialized, fbApiCall } from './sdk';
import { facebookConfig } from './config';

const TOKEN_REFRESH_THRESHOLD = 24 * 60 * 60 * 1000; // 24 hours in ms

export const checkTokenExpiration = async (connectionId: string): Promise<boolean> => {
  try {
    const { data: connection } = await supabase
      .from('social_connections')
      .select('expires_at, updated_at')
      .eq('id', connectionId)
      .single();

    if (!connection?.expires_at) return true;

    const expiresAt = new Date(connection.expires_at).getTime();
    const now = Date.now();
    
    // Don't check again if we've checked in the last hour
    if (connection.updated_at) {
      const lastCheck = new Date(connection.updated_at).getTime();
      if (now - lastCheck < 60 * 60 * 1000) {
        return false;
      }
    }

    return expiresAt - now < TOKEN_REFRESH_THRESHOLD;
  } catch (error) {
    logger.error('Token expiration check failed:', error);
    return true; // Assume token needs refresh on error
  }
};

export const refreshFacebookToken = async (connectionId: string): Promise<boolean> => {
  try {
    await ensureFBInitialized();

    // Get current connection
    const { data: connection } = await supabase
      .from('social_connections')
      .select('access_token')
      .eq('id', connectionId)
      .single();

    if (!connection) throw new Error('Connection not found');

    // Exchange token for a long-lived token
    const response = await fbApiCall<{ access_token: string; expires_in: number }>('/oauth/access_token', {
      grant_type: 'fb_exchange_token',
      client_id: facebookConfig.appId,
      fb_exchange_token: connection.access_token
    });

    // Update token in database
    const { error } = await supabase
      .from('social_connections')
      .update({
        access_token: response.access_token,
        expires_at: new Date(Date.now() + response.expires_in * 1000).toISOString(),
        updated_at: new Date().toISOString()
      })
      .eq('id', connectionId);

    if (error) throw error;

    logger.debug('Facebook token refreshed successfully');
    return true;
  } catch (error) {
    logger.error('Failed to refresh Facebook token:', error);
    
    // If token is invalid, remove the connection
    if (error?.code === 190) {
      try {
        await supabase
          .from('social_connections')
          .delete()
          .eq('id', connectionId);
        logger.debug('Removed invalid Facebook connection');
      } catch (deleteError) {
        logger.error('Failed to remove invalid connection:', deleteError);
      }
    }
    
    return false;
  }
};