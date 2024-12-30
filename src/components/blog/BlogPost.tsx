import React from 'react';
import { Link } from 'react-router-dom';
import type { BlogPost as BlogPostType } from '../../types/blog';

interface BlogPostProps {
  post: BlogPostType;
}

export const BlogPost: React.FC<BlogPostProps> = ({ post }) => (
  <article className="bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-md transition-shadow overflow-hidden border border-gray-100 dark:border-gray-700">
    <Link to={`/blog/${post.slug}`}>
      <img 
        className="w-full h-48 object-cover" 
        src={post.image} 
        alt={post.title} 
      />
    </Link>
    <div className="p-6">
      <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-2">
        <time dateTime={post.date}>{new Date(post.date).toLocaleDateString()}</time>
        <span className="mx-2">·</span>
        <span>{post.readTime} min read</span>
      </div>
      <h2 className="font-display text-xl font-semibold text-gray-900 dark:text-white mb-2">
        <Link 
          to={`/blog/${post.slug}`}
          className="hover:text-primary dark:hover:text-primary-light transition-colors"
        >
          {post.title}
        </Link>
      </h2>
      <p className="text-gray-600 dark:text-gray-300 mb-4">
        {post.excerpt}
      </p>
      <Link 
        to={`/blog/${post.slug}`}
        className="text-primary hover:text-primary-dark dark:text-primary-light dark:hover:text-primary font-medium inline-flex items-center"
      >
        Read more <span className="ml-1">→</span>
      </Link>
    </div>
  </article>
);