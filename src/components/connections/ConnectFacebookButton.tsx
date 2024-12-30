import React, { useState } from 'react';
import { Facebook } from 'lucide-react';
import { connectFacebook } from '../../lib/social/facebook/auth';
import { LoadingSpinner } from '../ui/LoadingSpinner';

interface ConnectFacebookButtonProps {
  disabled?: boolean;
  onSuccess?: () => void;
}

export const ConnectFacebookButton: React.FC<ConnectFacebookButtonProps> = ({ 
  disabled,
  onSuccess 
}) => {
  const [isConnecting, setIsConnecting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleConnect = async () => {
    setIsConnecting(true);
    setError(null);
    
    try {
      await connectFacebook();
      onSuccess?.();
    } catch (err) {
      setError('Failed to connect to Facebook. Please try again.');
      console.error('Facebook connection error:', err);
    } finally {
      setIsConnecting(false);
    }
  };

  return (
    <div>
      <button
        onClick={handleConnect}
        disabled={disabled || isConnecting}
        className={`
          flex items-center justify-center px-4 py-2 border border-transparent 
          rounded-md shadow-sm text-sm font-medium text-white w-full sm:w-auto
          transition-colors duration-200
          ${disabled || isConnecting
            ? 'bg-gray-400 dark:bg-gray-600 cursor-not-allowed' 
            : 'bg-[#1877F2] hover:bg-[#0C63D4]'
          }
        `}
      >
        {isConnecting ? (
          <LoadingSpinner className="text-white" />
        ) : (
          <>
            <Facebook className="h-5 w-5 mr-2" />
            Connect Facebook
          </>
        )}
      </button>
      {error && (
        <p className="mt-2 text-sm text-red-600 dark:text-red-400">{error}</p>
      )}
    </div>
  );
}