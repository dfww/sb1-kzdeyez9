import React from 'react';
import { Link } from 'react-router-dom';
import { Crown } from 'lucide-react';

interface UpgradePromptProps {
  title: string;
  description: string;
  features?: string[];
}

export const UpgradePrompt: React.FC<UpgradePromptProps> = ({ 
  title, 
  description,
  features 
}) => (
  <div className="bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 rounded-lg p-6 border border-indigo-100 dark:border-indigo-800">
    <div className="flex items-start space-x-4">
      <div className="flex-shrink-0">
        <Crown className="h-8 w-8 text-yellow-400" />
      </div>
      <div className="flex-1">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          {title}
        </h3>
        <p className="mt-1 text-gray-600 dark:text-gray-300">
          {description}
        </p>
        {features && features.length > 0 && (
          <ul className="mt-4 space-y-2">
            {features.map((feature, index) => (
              <li key={index} className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                <span className="mr-2">•</span>
                {feature}
              </li>
            ))}
          </ul>
        )}
        <div className="mt-4">
          <Link
            to="/pricing"
            className="inline-flex items-center px-4 py-2 bg-primary hover:bg-primary-dark text-white rounded-md transition-colors"
          >
            Upgrade Now
          </Link>
        </div>
      </div>
    </div>
  </div>
);