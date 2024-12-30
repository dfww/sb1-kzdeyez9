import { supabase } from '../../supabase';
import { selectWinners } from './winnerSelection';
import { logger } from '../../utils/logger';
import type { Draw } from '../../types/draw';

export const completeDraw = async (draw: Partial<Draw>): Promise<Draw> => {
  try {
    // Use the page access token that was passed during page selection
    if (!draw.page_id) {
      throw new Error('Page ID is required');
    }

    // Select winners using the page access token
    const winners = await selectWinners(
      draw.post_id!,
      draw.page_access_token!, // Use page token
      draw.criteria!
    );

    // Save the draw with winners
    const { data, error } = await supabase
      .from('draws')
      .insert([{
        ...draw,
        winners,
        status: 'completed'
      }])
      .select()
      .single();

    if (error) throw error;
    if (!data) throw new Error('Failed to save draw');

    logger.debug('Draw completed successfully', { drawId: data.id });
    return data;
  } catch (error) {
    logger.error('Failed to complete draw:', error);
    throw error;
  }
};