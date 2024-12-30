import { supabase } from '../supabase';
import { logger } from '../utils/logger';
import { disconnectFacebook } from './facebook/disconnect';
import type { Platform } from '../../types/draw';

export const disconnectPlatform = async (platform: Platform, connectionId: string): Promise<void> => {
  try {
    switch (platform) {
      case 'facebook':
        await disconnectFacebook(connectionId);
        break;
      case 'instagram':
        throw new Error('Instagram disconnection not yet implemented');
      default:
        throw new Error(`Unknown platform: ${platform}`);
    }

    logger.debug(`${platform} disconnected successfully`);
  } catch (error) {
    logger.error(`Failed to disconnect ${platform}:`, error);
    throw error;
  }
};