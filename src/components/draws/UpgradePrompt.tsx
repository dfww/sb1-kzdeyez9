import React from 'react';
import { Link } from 'react-router-dom';
import { Crown } from 'lucide-react';

interface UpgradePromptProps {
  onClose: () => void;
}

export const UpgradePrompt: React.FC<UpgradePromptProps> = ({ onClose }) => (
  <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4 z-50">
    <div className="bg-white dark:bg-gray-800 rounded-lg max-w-md w-full p-6">
      <div className="flex justify-center mb-4">
        <Crown className="h-12 w-12 text-yellow-400" />
      </div>
      <h3 className="text-xl font-bold text-gray-900 dark:text-white text-center mb-2">
        Unlock Draft Saving
      </h3>
      <p className="text-gray-600 dark:text-gray-300 text-center mb-6">
        Save your progress and continue later by upgrading to Agent or Studio plan.
      </p>
      <div className="space-y-4">
        <Link
          to="/pricing"
          className="block w-full text-center bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-md transition-colors"
        >
          View Pricing Plans
        </Link>
        <button
          onClick={onClose}
          className="block w-full text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white px-4 py-2 rounded-md transition-colors"
        >
          Continue Without Saving
        </button>
      </div>
    </div>
  </div>
);