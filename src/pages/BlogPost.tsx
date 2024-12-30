import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { blogPosts } from '../data/blogPosts';
import { Header } from '../components/landing/Header';
import { Footer } from '../components/landing/Footer';

export const BlogPost = () => {
  const { slug } = useParams();
  const post = blogPosts.find(p => p.slug === slug);

  if (!post) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
        <Header />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Post Not Found
            </h1>
            <Link 
              to="/blog"
              className="inline-flex items-center text-primary hover:text-primary-dark dark:hover:text-primary-light transition-colors"
            >
              <ArrowLeft className="h-5 w-5 mr-2" />
              Back to Blog
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      <Header />
      <main>
        <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <Link 
            to="/blog"
            className="inline-flex items-center text-primary hover:text-primary-dark dark:hover:text-primary-light transition-colors mb-8"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back to Blog
          </Link>

          <img
            src={post.image}
            alt={post.title}
            className="w-full h-96 object-cover rounded-lg mb-8"
          />

          <div className="flex items-center space-x-4 mb-8">
            <img
              src={post.author.avatar}
              alt={post.author.name}
              className="h-12 w-12 rounded-full"
            />
            <div>
              <p className="text-gray-900 dark:text-white font-medium">
                {post.author.name}
              </p>
              <p className="text-gray-500 dark:text-gray-400 text-sm">
                {new Date(post.date).toLocaleDateString()} • {post.readTime} min read
              </p>
            </div>
          </div>

          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            {post.title}
          </h1>

          <div className="prose prose-lg dark:prose-invert max-w-none">
            {post.content}
          </div>
        </article>
      </main>
      <Footer />
    </div>
  );
};