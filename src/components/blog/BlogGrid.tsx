import React from 'react';
import { BlogPost } from './BlogPost';
import { blogPosts } from '../../data/blogPosts';

export const BlogGrid = () => (
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
      {blogPosts.map((post) => (
        <BlogPost key={post.id} post={post} />
      ))}
    </div>
  </div>
);