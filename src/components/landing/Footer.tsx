import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram } from 'lucide-react';
import { Logo } from './Logo';
import { Container } from '../common/Container';

export const Footer = () => (
  <footer className="bg-bg-primary dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 transition-colors">
    <Container className="py-12">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="col-span-1">
          <div className="flex items-center">
            <Logo />
            <span className="ml-2 text-xl font-bold text-gray-900 dark:text-white">
              The Lucky Potato
            </span>
          </div>
          <p className="mt-4 text-gray-600 dark:text-gray-400">
            Your lucky charm for social media success.
          </p>
        </div>
        
        <div>
          <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 tracking-wider uppercase">
            Product
          </h3>
          <ul className="mt-4 space-y-4">
            <li>
              <Link 
                to="/features" 
                className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary-light transition-colors"
              >
                Features
              </Link>
            </li>
            <li>
              <Link 
                to="/pricing" 
                className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary-light transition-colors"
              >
                Pricing
              </Link>
            </li>
          </ul>
        </div>
        
        <div>
          <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 tracking-wider uppercase">
            Support
          </h3>
          <ul className="mt-4 space-y-4">
            <li>
              <Link 
                to="/help" 
                className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary-light transition-colors"
              >
                Help Center
              </Link>
            </li>
            <li>
              <Link 
                to="/contact" 
                className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary-light transition-colors"
              >
                Contact Us
              </Link>
            </li>
          </ul>
        </div>
        
        <div>
          <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 tracking-wider uppercase">
            Connect
          </h3>
          <div className="mt-4 flex space-x-6">
            <a 
              href="#" 
              className="text-gray-500 dark:text-gray-400 hover:text-primary dark:hover:text-primary-light transition-colors"
            >
              <Facebook className="h-6 w-6" />
            </a>
            <a 
              href="#" 
              className="text-gray-500 dark:text-gray-400 hover:text-primary dark:hover:text-primary-light transition-colors"
            >
              <Instagram className="h-6 w-6" />
            </a>
            <a 
              href="#" 
              className="text-gray-500 dark:text-gray-400 hover:text-primary dark:hover:text-primary-light transition-colors"
            >
              <Twitter className="h-6 w-6" />
            </a>
          </div>
        </div>
      </div>
      
      <div className="mt-8 border-t border-gray-200 dark:border-gray-800 pt-8">
        <p className="text-base text-gray-500 dark:text-gray-400 text-center">
          © {new Date().getFullYear()} The Lucky Potato. All rights reserved.
        </p>
      </div>
    </Container>
  </footer>
);