import React, { useState } from 'react';

export const BlogNewsletter = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Newsletter signup:', email);
  };

  return (
    <section className="bg-gray-100 dark:bg-gray-800 py-16 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
            Subscribe to our newsletter
          </h2>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
            Get the latest giveaway tips and strategies delivered to your inbox.
          </p>
          <form onSubmit={handleSubmit} className="mt-8 max-w-xl mx-auto">
            <div className="flex gap-4">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="flex-1 rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 shadow-sm focus:border-primary focus:ring-primary transition-colors"
                required
              />
              <button
                type="submit"
                className="btn-primary"
              >
                Subscribe
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};