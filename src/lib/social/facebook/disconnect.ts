import { supabase } from '../../supabase';
import { logger } from '../../utils/logger';

export const disconnectFacebook = async (connectionId: string): Promise<void> => {
  try {
    // Delete the connection from database
    const { error } = await supabase
      .from('social_connections')
      .delete()
      .eq('id', connectionId);

    if (error) throw error;

    // Revoke Facebook permissions if FB SDK is available
    if (window.FB) {
      await new Promise<void>((resolve) => {
        FB.api('/me/permissions', 'delete', () => resolve());
      });
    }

    logger.debug('Facebook disconnected successfully');
  } catch (error) {
    logger.error('Failed to disconnect Facebook:', error);
    throw error;
  }
};