import { fbApiCall } from './sdk';
import { logger } from '../../utils/logger';

interface FacebookPage {
  id: string;
  name: string;
  access_token: string;
  picture: {
    data: {
      url: string;
    };
  };
  tasks: string[];
}

export const getPages = async (accessToken: string): Promise<FacebookPage[]> => {
  try {
    const response = await fbApiCall<{ data: FacebookPage[] }>('/me/accounts', {
      access_token: accessToken,
      fields: 'id,name,access_token,picture,tasks'
    });

    return response.data || [];
  } catch (error) {
    logger.error('Failed to fetch Facebook pages:', error);
    throw new Error('Failed to fetch your Facebook pages');
  }
};

export const getPagePosts = async (
  pageId: string, 
  accessToken: string,
  limit = 10,
  after?: string
) => {
  try {
    const response = await fbApiCall<any>(`/${pageId}/posts`, {
      access_token: accessToken,
      fields: 'id,message,created_time,permalink_url,comments.limit(0).summary(true)',
      limit,
      after
    });

    const posts = response.data?.map((post: any) => ({
      ...post,
      comments_count: post.comments?.summary?.total_count || 0
    })) || [];

    return {
      posts,
      hasMore: !!response.paging?.next,
      nextCursor: response.paging?.cursors?.after
    };
  } catch (error) {
    logger.error('Failed to fetch page posts:', error);
    throw new Error('Failed to fetch posts');
  }
};

export const getPostComments = async (
  postId: string,
  accessToken: string,
  limit = 100,
  after?: string
) => {
  try {
    const response = await fbApiCall<any>(`/${postId}/comments`, {
      access_token: accessToken,
      fields: 'id,message,from{id,name},permalink_url,created_time',
      limit,
      after
    });

    if (!response.data) {
      throw new Error('No comments data returned');
    }

    return {
      comments: response.data,
      hasMore: !!response.paging?.next,
      nextCursor: response.paging?.cursors?.after
    };
  } catch (error) {
    logger.error('Failed to fetch post comments:', error);
    throw new Error('Failed to fetch comments');
  }
};