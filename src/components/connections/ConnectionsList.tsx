import React from 'react';
import { LoadingSpinner } from '../ui/LoadingSpinner';
import { FacebookConnection } from './FacebookConnection';
import type { SocialConnection } from '../../types/social';
import { Card } from '../common/Card';

interface ConnectionsListProps {
  connections: SocialConnection[];
  isLoading: boolean;
  onDisconnect: (connectionId: string) => Promise<void>;
  isDisconnecting?: boolean;
}

export const ConnectionsList: React.FC<ConnectionsListProps> = ({ 
  connections, 
  isLoading,
  onDisconnect,
  isDisconnecting
}) => {
  if (isLoading) {
    return (
      <Card>
        <div className="flex justify-center">
          <LoadingSpinner className="text-primary" />
        </div>
      </Card>
    );
  }

  if (connections.length === 0) {
    return (
      <Card>
        <p className="text-gray-500 dark:text-gray-400 text-center">
          No social media accounts connected yet.
        </p>
      </Card>
    );
  }

  return (
    <Card>
      <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
        Connected Accounts
      </h3>
      <div className="space-y-4">
        {connections.map((connection) => (
          <FacebookConnection
            key={connection.id}
            connection={connection}
            onDisconnect={() => onDisconnect(connection.id)}
            isDisconnecting={isDisconnecting}
          />
        ))}
      </div>
    </Card>
  );
};