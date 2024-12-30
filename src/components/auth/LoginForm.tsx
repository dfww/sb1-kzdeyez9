import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import { Input } from '../common/Input';
import { PasswordInput } from './PasswordInput';
import { AuthButton } from './AuthButton';
import { VerificationMessage } from './VerificationMessage';
import { UnverifiedMessage } from './UnverifiedMessage';
import { RememberMeCheckbox } from './RememberMeCheckbox';
import { AuthBenefits } from './AuthBenefits';
import { resendVerificationEmail } from '../../lib/auth/verification';

export const LoginForm = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [lastAttemptedEmail, setLastAttemptedEmail] = useState('');
  const [showUnverifiedMessage, setShowUnverifiedMessage] = useState(false);
  const { signIn, signUp, error, clearError, verification } = useAuthStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    clearError();
    setIsLoading(true);
    setShowUnverifiedMessage(false);
    
    try {
      if (isRegistering) {
        await signUp(email, password, rememberMe);
      } else {
        setLastAttemptedEmail(email);
        await signIn(email, password, rememberMe);
        navigate('/app');
      }
    } catch (error: any) {
      if (error.message?.includes('verify your email')) {
        setShowUnverifiedMessage(true);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendVerification = async () => {
    setIsResending(true);
    try {
      await resendVerificationEmail(lastAttemptedEmail || email);
    } catch (error) {
      console.error('Failed to resend verification email:', error);
    } finally {
      setIsResending(false);
    }
  };

  const toggleMode = () => {
    setIsRegistering(!isRegistering);
    clearError();
    setShowUnverifiedMessage(false);
  };

  const handleCreateAccountWithEmail = () => {
    setIsRegistering(true);
    clearError();
    setShowUnverifiedMessage(false);
  };

  // Show verification message if needed
  if (verification.isPending && verification.email) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full p-6">
          <VerificationMessage 
            email={verification.email}
            onResend={handleResendVerification}
            isResending={isResending}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex bg-gray-50 dark:bg-gray-900">
      <div className="flex-1 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8 bg-white dark:bg-gray-800 p-8 rounded-lg shadow-sm">
          <div>
            <h2 className="text-center text-3xl font-extrabold text-gray-900 dark:text-white">
              {isRegistering ? 'Create your account' : 'Sign in to your account'}
            </h2>
          </div>
          
          {showUnverifiedMessage && (
            <UnverifiedMessage
              email={lastAttemptedEmail}
              onResend={handleResendVerification}
              isResending={isResending}
            />
          )}
          {error && !showUnverifiedMessage && (
            <div className="space-y-4">
              <div className="bg-red-50 dark:bg-red-900/20 border-l-4 border-red-400 p-4">
                <p className="text-sm text-red-700 dark:text-red-400">{error}</p>
              </div>
              {!isRegistering && lastAttemptedEmail && (
                <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800 rounded-md p-4">
                  <p className="text-sm text-blue-700 dark:text-blue-300">
                    Don't have an account yet?{' '}
                    <button
                      onClick={handleCreateAccountWithEmail}
                      className="font-medium text-blue-600 dark:text-blue-400 hover:text-blue-500 dark:hover:text-blue-300"
                    >
                      Create an account with {lastAttemptedEmail}
                    </button>
                  </p>
                </div>
              )}
            </div>
          )}

          <form onSubmit={handleSubmit} className="mt-8 space-y-6">
            <div className="rounded-md shadow-sm -space-y-px">
              <Input
                id="email"
                type="email"
                required
                disabled={isLoading}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email address"
                className="rounded-t-md rounded-b-none"
              />
              <PasswordInput
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isLoading}
                className="rounded-t-none rounded-b-md"
              />
            </div>

            <div className="flex items-center justify-between">
              <RememberMeCheckbox
                checked={rememberMe}
                onChange={setRememberMe}
                disabled={isLoading}
              />
            </div>

            <div>
              <AuthButton isLoading={isLoading}>
                {isRegistering ? 'Create Account' : 'Sign in'}
              </AuthButton>
            </div>
          </form>
          
          <div className="text-center">
            <button
              type="button"
              onClick={toggleMode}
              disabled={isLoading}
              className="text-sm text-primary hover:text-primary-dark dark:text-primary-light dark:hover:text-primary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isRegistering 
                ? 'Already have an account? Sign in' 
                : 'Need an account? Create one'}
            </button>
          </div>
        </div>
      </div>
      <AuthBenefits isRegistering={isRegistering} />
    </div>
  );
};