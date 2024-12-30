import React from 'react';
import { Link } from 'react-router-dom';
import { Crown } from 'lucide-react';

export const UpgradeOverlay = () => (
  <div className="absolute inset-0 bg-gray-900/50 backdrop-blur-sm flex items-center justify-center rounded-lg">
    <div className="text-center p-6">
      <Crown className="h-12 w-12 text-yellow-400 mx-auto mb-4" />
      <h3 className="text-xl font-bold text-white mb-2">
        Upgrade to Save Drafts
      </h3>
      <p className="text-gray-200 mb-6 max-w-sm">
        Save your progress and continue later by upgrading to Agent or Studio plan.
      </p>
      <Link
        to="/pricing"
        className="inline-flex items-center px-6 py-2 bg-primary hover:bg-primary-dark text-white rounded-md transition-colors"
      >
        View Pricing Plans
      </Link>
    </div>
  </div>
);