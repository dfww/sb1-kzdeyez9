import React from 'react';
import { Link } from 'react-router-dom';
import { Logo } from './Logo';
import { ThemeToggle } from '../common/ThemeToggle';
import { LanguageSwitcher } from '../common/LanguageSwitcher';

export const Header = () => (
  <header className="bg-bg-primary dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
    <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
      <div className="flex items-center">
        <Link to="/" className="flex items-center">
          <Logo />
          <span className="ml-2 text-xl font-display font-semibold text-gray-900 dark:text-white">
            The Lucky Potato
          </span>
        </Link>
      </div>
      <div className="flex items-center space-x-6">
        <LanguageSwitcher />
        <Link 
          to="/blog" 
          className="text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary-light transition-colors"
        >
          Blog
        </Link>
        <Link 
          to="/login" 
          className="text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary-light transition-colors"
        >
          Sign In
        </Link>
        <Link 
          to="/register" 
          className="bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-md transition-colors"
        >
          Get Started Free
        </Link>
        <ThemeToggle />
      </div>
    </nav>
  </header>
);