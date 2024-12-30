import React from 'react';
import { Facebook, LogOut, RefreshCw } from 'lucide-react';
import { useFacebookToken } from '../../hooks/useFacebookToken';
import type { SocialConnection } from '../../types/social';
import { LoadingSpinner } from '../ui/LoadingSpinner';

interface FacebookConnectionProps {
  connection: SocialConnection;
  onDisconnect: () => Promise<void>;
  isDisconnecting?: boolean;
}

export const FacebookConnection: React.FC<FacebookConnectionProps> = ({
  connection,
  onDisconnect,
  isDisconnecting
}) => {
  const { isValid, isRefreshing, refreshToken } = useFacebookToken(connection.id);

  return (
    <div className="flex items-center justify-between p-4 border dark:border-gray-700 rounded-lg">
      <div className="flex items-center">
        <Facebook className="h-5 w-5 text-[#1877F2]" />
        <div className="ml-3">
          <p className="font-medium text-gray-900 dark:text-white">
            {connection.connected_user_name || 'Facebook User'}
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Connected on {new Date(connection.created_at).toLocaleDateString()}
          </p>
        </div>
      </div>
      
      <div className="flex items-center space-x-2">
        {isRefreshing ? (
          <LoadingSpinner className="text-primary" />
        ) : (
          <button
            onClick={() => refreshToken()}
            disabled={isDisconnecting}
            className="p-2 text-gray-500 hover:text-primary dark:text-gray-400 dark:hover:text-primary-light transition-colors disabled:opacity-50"
            title="Refresh connection"
          >
            <RefreshCw className="h-5 w-5" />
          </button>
        )}
        <button
          onClick={onDisconnect}
          disabled={isDisconnecting}
          className="p-2 text-red-500 hover:text-red-600 dark:hover:text-red-400 transition-colors disabled:opacity-50"
          title="Disconnect account"
        >
          {isDisconnecting ? (
            <LoadingSpinner className="text-red-500" />
          ) : (
            <LogOut className="h-5 w-5" />
          )}
        </button>
      </div>
    </div>
  );
};