import type { DrawRequest } from './types';

export const validateDrawRequest = (request: DrawRequest): string | null => {
  if (!request.name?.trim()) {
    return 'Draw name is required';
  }

  if (!request.pageId || !request.pageName) {
    return 'Page information is required';
  }

  if (!request.postId || !request.postUrl) {
    return 'Post information is required';
  }

  if (!request.criteria) {
    return 'Draw criteria is required';
  }

  if (request.criteria.winnerCount < 1) {
    return 'Winner count must be at least 1';
  }

  return null;
};