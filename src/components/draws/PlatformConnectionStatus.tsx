import React from 'react';
import { LogOut, RefreshCw } from 'lucide-react';
import { LoadingSpinner } from '../ui/LoadingSpinner';
import type { SocialConnection } from '../../types/social';

interface PlatformConnectionStatusProps {
  connection: SocialConnection;
  onDisconnect: () => Promise<void>;
  onRefresh: () => Promise<void>;
  isRefreshing?: boolean;
}

export const PlatformConnectionStatus: React.FC<PlatformConnectionStatusProps> = ({
  connection,
  onDisconnect,
  onRefresh,
  isRefreshing = false
}) => {
  return (
    <div className="flex items-center justify-between p-4 border dark:border-gray-700 rounded-lg">
      <div>
        <p className="font-medium text-gray-900 dark:text-white">
          Connected as {connection.connected_user_name}
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Connected on {new Date(connection.created_at).toLocaleDateString()}
        </p>
      </div>
      <div className="flex items-center space-x-2">
        {isRefreshing ? (
          <LoadingSpinner className="text-primary" />
        ) : (
          <button
            onClick={onRefresh}
            className="p-2 text-gray-500 hover:text-primary dark:text-gray-400 dark:hover:text-primary-light transition-colors"
            title="Refresh connection"
          >
            <RefreshCw className="h-5 w-5" />
          </button>
        )}
        <button
          onClick={onDisconnect}
          className="p-2 text-red-500 hover:text-red-600 dark:hover:text-red-400 transition-colors"
          title="Disconnect account"
        >
          <LogOut className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}