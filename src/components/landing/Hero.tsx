import React from 'react';
import { Link } from 'react-router-dom';
import { Gift, Award, Users } from 'lucide-react';

export const Hero = () => (
  <div className="bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 transition-colors">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <div className="text-center">
        <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white sm:text-5xl md:text-6xl">
          <span className="block">Your Lucky Charm for</span>
          <span className="block text-primary">Social Media Success</span>
        </h1>
        <p className="mt-3 max-w-md mx-auto text-base text-gray-600 dark:text-gray-300 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
          The Lucky Potato helps you run fair and transparent social media giveaways. Perfect for creators, brands, and businesses looking to engage their audience and grow their customer base.
        </p>
        <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
          <div className="rounded-md shadow">
            <Link
              to="/register"
              className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary hover:bg-primary-dark transition-colors md:py-4 md:text-lg md:px-10"
            >
              Get Started Free
            </Link>
          </div>
        </div>
      </div>
      
      <div className="mt-20 grid grid-cols-1 gap-8 sm:grid-cols-3">
        <div className="text-center">
          <div className="flex justify-center">
            <Gift className="h-12 w-12 text-primary" />
          </div>
          <h3 className="mt-4 text-lg font-medium text-gray-900 dark:text-white">Easy to Use</h3>
          <p className="mt-2 text-gray-600 dark:text-gray-300">Set up your giveaway in minutes with our intuitive interface.</p>
        </div>
        <div className="text-center">
          <div className="flex justify-center">
            <Award className="h-12 w-12 text-primary" />
          </div>
          <h3 className="mt-4 text-lg font-medium text-gray-900 dark:text-white">Fair Selection</h3>
          <p className="mt-2 text-gray-600 dark:text-gray-300">Transparent winner selection process that's completely random.</p>
        </div>
        <div className="text-center">
          <div className="flex justify-center">
            <Users className="h-12 w-12 text-primary" />
          </div>
          <h3 className="mt-4 text-lg font-medium text-gray-900 dark:text-white">Multiple Platforms</h3>
          <p className="mt-2 text-gray-600 dark:text-gray-300">Works with Instagram and Facebook comments and likes.</p>
        </div>
      </div>
    </div>
  </div>
);