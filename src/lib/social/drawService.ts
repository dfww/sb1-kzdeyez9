import { supabase } from '../supabase';
import { selectWinners } from './facebook/winnerSelection';
import { logger } from '../utils/logger';
import type { Draw } from '../../types/draw';

export const completeDraw = async (draw: Partial<Draw> & { page_access_token: string }): Promise<Draw> => {
  try {
    if (!draw.page_access_token) {
      throw new Error('Page access token is required');
    }

    // Select winners using the page access token
    const winners = await selectWinners(
      draw.post_id!,
      draw.page_access_token,
      draw.criteria!
    );

    // Save the draw without the page access token
    const { data, error } = await supabase
      .from('draws')
      .insert([{
        name: draw.name,
        type: draw.type,
        platform: draw.platform,
        page_id: draw.page_id,
        page_name: draw.page_name,
        post_id: draw.post_id,
        post_url: draw.post_url,
        criteria: draw.criteria,
        winners,
        status: 'completed'
      }])
      .select()
      .single();

    if (error) throw error;
    if (!data) throw new Error('Failed to save draw');

    logger.debug('Draw completed successfully', { 
      drawId: data.id,
      winnerCount: winners.length 
    });
    
    return data;
  } catch (error) {
    logger.error('Failed to complete draw:', error);
    throw error instanceof Error 
      ? error 
      : new Error('Failed to complete draw');
  }
};