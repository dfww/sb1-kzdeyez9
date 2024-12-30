import React from 'react';
import { Mail } from 'lucide-react';

interface VerificationMessageProps {
  email: string;
  onResend?: () => void;
  isResending?: boolean;
}

export const VerificationMessage: React.FC<VerificationMessageProps> = ({ 
  email, 
  onResend,
  isResending = false 
}) => (
  <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg shadow-sm">
    <div className="flex items-center space-x-3">
      <div className="flex-shrink-0">
        <Mail className="h-6 w-6 text-blue-600 dark:text-blue-400" />
      </div>
      <h3 className="text-lg font-medium text-blue-800 dark:text-blue-300">
        Verify your email
      </h3>
    </div>
    <div className="mt-4">
      <p className="text-sm text-blue-700 dark:text-blue-300">
        We've sent a verification link to <strong>{email}</strong>. 
        Please check your inbox and click the link to verify your account.
      </p>
    </div>
    {onResend && (
      <div className="mt-4">
        <button
          onClick={onResend}
          disabled={isResending}
          className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-500 dark:hover:text-blue-300 disabled:opacity-50"
        >
          {isResending ? 'Sending...' : 'Resend verification email'}
        </button>
      </div>
    )}
    <div className="mt-4 text-sm text-blue-600 dark:text-blue-400">
      <p>Didn't receive the email? Check your spam folder.</p>
    </div>
  </div>
);