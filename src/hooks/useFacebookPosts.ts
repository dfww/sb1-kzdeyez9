import { useState, useEffect, useCallback } from 'react';
import { getPagePosts } from '../lib/social/facebook/api';

export const useFacebookPosts = (pageId: string, accessToken: string) => {
  const [posts, setPosts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(false);
  const [nextCursor, setNextCursor] = useState<string | undefined>();
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const fetchPosts = useCallback(async (cursor?: string) => {
    try {
      const { posts: newPosts, hasMore: more, nextCursor: next } = 
        await getPagePosts(pageId, accessToken, 10, cursor);
      
      setPosts(prev => cursor ? [...prev, ...newPosts] : newPosts);
      setHasMore(more);
      setNextCursor(next);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch posts');
    }
  }, [pageId, accessToken]);

  useEffect(() => {
    setIsLoading(true);
    fetchPosts()
      .finally(() => setIsLoading(false));
  }, [fetchPosts]);

  const loadMore = useCallback(async () => {
    if (!hasMore || isLoadingMore) return;
    
    setIsLoadingMore(true);
    await fetchPosts(nextCursor);
    setIsLoadingMore(false);
  }, [hasMore, isLoadingMore, nextCursor, fetchPosts]);

  return { 
    posts, 
    isLoading, 
    error, 
    hasMore, 
    loadMore,
    isLoadingMore
  };
};