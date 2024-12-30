import React from 'react';
import { ConnectFacebookButton } from './ConnectFacebookButton';
import { Card } from '../common/Card';

export const ConnectionsLanding = () => {
  return (
    <Card>
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
        Social Media Connections
      </h2>
      <p className="text-gray-600 dark:text-gray-300 mb-6">
        Connect your social media accounts to start running giveaways.
      </p>
      <ConnectFacebookButton />
    </Card>
  );
};