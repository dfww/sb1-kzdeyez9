import { supabase } from '../supabase';
import { selectWinners as selectFacebookWinners } from '../social/facebook/winnerSelection';
import { logger } from '../utils/logger';
import type { DrawRequest } from './types';
import { validateDrawRequest } from './validation';

export const completeDraw = async (request: DrawRequest, pageAccessToken: string) => {
  try {
    const validationError = validateDrawRequest(request);
    if (validationError) {
      throw new Error(validationError);
    }

    // Get current user
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      throw new Error('User not authenticated');
    }

    // Select winners based on platform
    const winners = await (async () => {
      switch (request.platform) {
        case 'facebook':
          return selectFacebookWinners(request.postId, pageAccessToken, request.criteria);
        case 'instagram':
          throw new Error('Instagram draws not yet supported');
        default:
          throw new Error(`Unsupported platform: ${request.platform}`);
      }
    })();

    // Save draw with winners
    const { data, error } = await supabase
      .from('draws')
      .insert({
        user_id: user.id,
        name: request.name,
        type: request.type,
        platform: request.platform,
        page_id: request.pageId,
        page_name: request.pageName,
        post_id: request.postId,
        post_url: request.postUrl,
        criteria: request.criteria,
        winners,
        status: 'completed'
      })
      .select()
      .single();

    if (error) {
      logger.error('Failed to save draw:', error);
      throw new Error('Failed to save draw results');
    }

    return data;
  } catch (error) {
    logger.error('Draw completion failed:', error);
    throw error instanceof Error ? error : new Error('Failed to complete draw');
  }
};