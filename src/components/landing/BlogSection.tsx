import React from 'react';
import { Link } from 'react-router-dom';
import { Container } from '../common/Container';

const blogPosts = [
  {
    id: 1,
    title: '10 Tips for Running Successful Social Media Giveaways',
    excerpt: 'Learn the best practices for engaging your audience and running fair contests.',
    image: 'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 2,
    title: 'How to Grow Your Following with Strategic Giveaways',
    excerpt: 'Discover proven strategies to increase your social media presence through contests.',
    image: 'https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
  }
];

export const BlogSection = () => (
  <section className="bg-gray-50 dark:bg-gray-900 transition-colors">
    <Container className="py-24">
      <div className="text-center">
        <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">
          Latest from Our Blog
        </h2>
        <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-600 dark:text-gray-300">
          Tips, tricks, and insights about running successful social media giveaways
        </p>
      </div>
      <div className="mt-12 grid gap-8 lg:grid-cols-2">
        {blogPosts.map((post) => (
          <Link 
            key={post.id} 
            to="/blog" 
            className="flex flex-col rounded-lg shadow-lg overflow-hidden bg-white dark:bg-gray-800 hover:shadow-xl transition-shadow"
          >
            <div className="flex-shrink-0">
              <img className="h-48 w-full object-cover" src={post.image} alt={post.title} />
            </div>
            <div className="flex-1 p-6">
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  {post.title}
                </h3>
                <p className="mt-3 text-base text-gray-600 dark:text-gray-300">
                  {post.excerpt}
                </p>
              </div>
              <div className="mt-6">
                <span className="text-primary hover:text-primary-dark dark:hover:text-primary-light transition-colors">
                  Read more →
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
      <div className="mt-12 text-center">
        <Link
          to="/blog"
          className="inline-flex items-center px-6 py-3 border border-primary rounded-md text-base font-medium text-primary hover:bg-primary hover:text-white dark:text-primary-light dark:hover:text-white transition-colors"
        >
          View all posts
        </Link>
      </div>
    </Container>
  </section>
);