import React from 'react';
import { Link } from 'react-router-dom';
import { Logo } from '../landing/Logo';

export const BlogHeader = () => (
  <header className="bg-white border-b border-gray-100">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between items-center h-16">
        <Link to="/" className="flex items-center">
          <Logo />
          <span className="ml-2 text-xl font-display font-semibold text-gray-900">The Lucky Potato</span>
        </Link>
        <nav className="flex space-x-8">
          <Link to="/login" className="text-gray-600 hover:text-primary-600 transition-colors">Sign In</Link>
          <Link to="/register" className="btn-primary">
            Get Started
          </Link>
        </nav>
      </div>
    </div>
  </header>
);