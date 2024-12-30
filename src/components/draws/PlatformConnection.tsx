import React, { useState } from 'react';
import { Facebook } from 'lucide-react';
import { loginToFacebook } from '../../lib/social/facebook/login';
import { connectFacebook } from '../../lib/social/facebook/auth';
import { LoadingSpinner } from '../ui/LoadingSpinner';
import type { Platform } from '../../types/draw';

interface PlatformConnectionProps {
  platform: Platform;
  onSuccess: () => void;
}

export const PlatformConnection: React.FC<PlatformConnectionProps> = ({
  platform,
  onSuccess
}) => {
  const [isConnecting, setIsConnecting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleConnect = async () => {
    setIsConnecting(true);
    setError(null);

    try {
      if (platform === 'facebook') {
        // First login to Facebook
        await loginToFacebook();
        // Then connect the account to our app
        await connectFacebook();
        onSuccess();
      } else {
        throw new Error('Instagram connection is not yet supported');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to connect platform');
    } finally {
      setIsConnecting(false);
    }
  };

  return (
    <div className="mt-6 text-center">
      <p className="text-gray-600 dark:text-gray-300 mb-4">
        Connect your {platform} account to continue
      </p>
      
      {error && (
        <p className="text-red-600 dark:text-red-400 text-sm mb-4">{error}</p>
      )}

      <button
        onClick={handleConnect}
        disabled={isConnecting}
        className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        {isConnecting ? (
          <LoadingSpinner className="text-white" />
        ) : (
          <>
            {platform === 'facebook' && <Facebook className="h-5 w-5 mr-2" />}
            Connect {platform}
          </>
        )}
      </button>
    </div>
  );
};