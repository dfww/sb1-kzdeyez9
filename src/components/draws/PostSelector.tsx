import React from 'react';
import { ExternalLink } from 'lucide-react';
import { LoadingSpinner } from '../ui/LoadingSpinner';
import { useFacebookPosts } from '../../hooks/useFacebookPosts';

interface PostSelectorProps {
  pageId: string;
  accessToken: string;
  onPostSelect: (postId: string, url: string) => void;
}

export const PostSelector: React.FC<PostSelectorProps> = ({
  pageId,
  accessToken,
  onPostSelect
}) => {
  const { 
    posts, 
    isLoading, 
    error, 
    hasMore, 
    loadMore, 
    isLoadingMore 
  } = useFacebookPosts(pageId, accessToken);

  if (isLoading) {
    return (
      <div className="flex justify-center py-4">
        <LoadingSpinner className="text-primary" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-600 dark:text-red-400 text-sm py-2">
        {error}
      </div>
    );
  }

  if (!posts?.length) {
    return (
      <div className="text-gray-600 dark:text-gray-300 text-sm py-2">
        No posts found for this page.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="grid gap-4 grid-cols-1">
        {posts.map((post) => (
          <button
            key={post.id}
            onClick={() => onPostSelect(post.id, post.permalink_url)}
            className="text-left p-4 border dark:border-gray-700 rounded-lg hover:border-primary dark:hover:border-primary-light transition-colors"
          >
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <p className="font-medium text-gray-900 dark:text-white mb-2">
                  {post.message || 'No message'}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Posted on {new Date(post.created_time).toLocaleDateString()}
                </p>
                {post.comments_count !== undefined && (
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    {post.comments_count} comments
                  </p>
                )}
              </div>
              <a
                href={post.permalink_url}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="ml-4 p-2 text-gray-500 hover:text-primary dark:text-gray-400 dark:hover:text-primary-light transition-colors"
                title="View post"
              >
                <ExternalLink className="h-5 w-5" />
              </a>
            </div>
          </button>
        ))}
      </div>

      {hasMore && (
        <div className="flex justify-center">
          <button
            onClick={loadMore}
            disabled={isLoadingMore}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-primary dark:text-primary-light bg-primary-50 dark:bg-primary-900/20 hover:bg-primary-100 dark:hover:bg-primary-900/30 disabled:opacity-50 transition-colors"
          >
            {isLoadingMore ? (
              <LoadingSpinner className="text-primary dark:text-primary-light" />
            ) : (
              'Load More Posts'
            )}
          </button>
        </div>
      )}
    </div>
  );
};