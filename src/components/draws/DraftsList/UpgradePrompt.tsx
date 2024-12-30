import React from 'react';
import { Link } from 'react-router-dom';
import { Crown } from 'lucide-react';

export const UpgradePrompt = () => (
  <div className="relative border dark:border-gray-700 rounded-lg p-6 bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20">
    <div className="flex items-center space-x-4">
      <div className="flex-shrink-0">
        <Crown className="h-8 w-8 text-yellow-400" />
      </div>
      <div className="flex-1">
        <h4 className="text-lg font-medium text-gray-900 dark:text-white">
          Save Your Progress
        </h4>
        <p className="text-gray-600 dark:text-gray-300 mt-1">
          Upgrade to Agent or Studio plan to save drafts and continue your draws later.
        </p>
      </div>
      <div className="flex-shrink-0">
        <Link
          to="/pricing"
          className="inline-flex items-center px-4 py-2 bg-primary hover:bg-primary-dark text-white rounded-md transition-colors"
        >
          Upgrade Now
        </Link>
      </div>
    </div>
  </div>
);