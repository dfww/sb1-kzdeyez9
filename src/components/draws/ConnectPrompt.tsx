import React from 'react';
import { Link } from 'react-router-dom';
import { Share2 } from 'lucide-react';

export const ConnectPrompt = () => (
  <div className="text-center py-12">
    <Share2 className="mx-auto h-12 w-12 text-gray-400 dark:text-gray-600" />
    <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-white">
      No Facebook Page Connected
    </h3>
    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
      Connect your Facebook account and select a page to start picking winners.
    </p>
    <div className="mt-6">
      <Link
        to="/app/connections"
        className="inline-flex items-center rounded-md border border-transparent bg-primary hover:bg-primary-dark px-4 py-2 text-sm font-medium text-white shadow-sm transition-colors"
      >
        Connect Facebook
      </Link>
    </div>
  </div>
);