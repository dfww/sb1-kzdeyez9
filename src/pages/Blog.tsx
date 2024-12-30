import React from 'react';
import { Header } from '../components/landing/Header';
import { BlogGrid } from '../components/blog/BlogGrid';
import { BlogNewsletter } from '../components/blog/BlogNewsletter';
import { Footer } from '../components/landing/Footer';

export const Blog = () => (
  <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
    <Header />
    <main>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Latest from Our Blog
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300">
          Tips, tricks, and insights about running successful social media giveaways
        </p>
      </div>
      <BlogGrid />
      <BlogNewsletter />
    </main>
    <Footer />
  </div>
);