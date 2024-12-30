import { getPostComments } from './api';
import { logger } from '../../utils/logger';
import type { Winner } from '../../../types/draw';

interface WinnerCriteria {
  requireLike: boolean;
  requireComment: boolean;
  requireFollow: boolean;
  commentMustInclude?: string;
  excludedAccounts: string[];
  winnerCount: number;
}

export const selectWinners = async (
  postId: string,
  accessToken: string,
  criteria: WinnerCriteria
): Promise<Winner[]> => {
  try {
    // Get post details to get creator ID
    const postResponse = await fetch(
      `https://graph.facebook.com/${postId}?fields=from&access_token=${accessToken}`
    );
    const postData = await postResponse.json();
    const postCreatorId = postData.from?.id;

    let allComments: any[] = [];
    let hasMore = true;
    let cursor: string | undefined;

    // Fetch all comments
    while (hasMore) {
      const response = await getPostComments(postId, accessToken, 100, cursor);
      allComments = [...allComments, ...response.comments];
      hasMore = response.hasMore;
      cursor = response.nextCursor;

      if (allComments.length >= 1000) {
        logger.warn('Reached comment fetch limit');
        break;
      }
    }

    logger.debug(`Fetched ${allComments.length} comments for post ${postId}`);

    if (allComments.length === 0) {
      throw new Error('No comments found on this post');
    }

    // Filter comments based on criteria
    let eligibleComments = allComments.filter(comment => {
      // Exclude post creator
      if (comment.from.id === postCreatorId) {
        return false;
      }

      // Exclude specified accounts
      if (criteria.excludedAccounts.includes(comment.from.id)) {
        return false;
      }

      // Check for required text if specified
      if (criteria.commentMustInclude) {
        const pattern = criteria.commentMustInclude
          .replace(/\*/g, '.*')
          .toLowerCase();
        const regex = new RegExp(pattern);
        if (!regex.test(comment.message.toLowerCase())) {
          return false;
        }
      }

      // Ensure comment has required fields
      return comment.from?.id && 
             comment.from?.name && 
             comment.message && 
             comment.id && 
             comment.permalink_url;
    });

    logger.debug(`Found ${eligibleComments.length} eligible comments after filtering`);

    if (eligibleComments.length === 0) {
      throw new Error('No eligible comments found. Try adjusting your criteria.');
    }

    // Shuffle comments using Fisher-Yates algorithm
    for (let i = eligibleComments.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [eligibleComments[i], eligibleComments[j]] = 
      [eligibleComments[j], eligibleComments[i]];
    }

    // Select winners
    const winners = eligibleComments
      .slice(0, Math.min(criteria.winnerCount, eligibleComments.length))
      .map(comment => ({
        id: comment.from.id,
        name: comment.from.name,
        comment: comment.message,
        commentId: comment.id,
        commentUrl: comment.permalink_url || `https://facebook.com/${comment.id}`
      }));

    logger.debug(`Selected ${winners.length} winners`);
    return winners;
  } catch (error) {
    logger.error('Failed to select winners:', error);
    throw error instanceof Error 
      ? error 
      : new Error('Failed to select winners');
  }
};