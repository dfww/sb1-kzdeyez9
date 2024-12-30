import React from 'react';
import { AlertTriangle } from 'lucide-react';

interface UnverifiedMessageProps {
  email: string;
  onResend: () => void;
  isResending: boolean;
}

export const UnverifiedMessage: React.FC<UnverifiedMessageProps> = ({
  email,
  onResend,
  isResending
}) => (
  <div className="bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-400 p-4">
    <div className="flex">
      <div className="flex-shrink-0">
        <AlertTriangle className="h-5 w-5 text-yellow-400" />
      </div>
      <div className="ml-3">
        <p className="text-sm text-yellow-700 dark:text-yellow-300">
          Please verify your email address ({email}) before signing in.
        </p>
        <div className="mt-2">
          <button
            onClick={onResend}
            disabled={isResending}
            className="text-sm text-yellow-600 dark:text-yellow-400 hover:text-yellow-500 dark:hover:text-yellow-300 disabled:opacity-50"
          >
            {isResending ? 'Sending verification email...' : 'Resend verification email'}
          </button>
        </div>
      </div>
    </div>
  </div>
);