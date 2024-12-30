import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import { Input } from '../common/Input';
import { PasswordInput } from './PasswordInput';
import { AuthButton } from './AuthButton';
import { VerificationMessage } from './VerificationMessage';
import { RememberMeCheckbox } from './RememberMeCheckbox';
import { AuthBenefits } from './AuthBenefits';
import { logger } from '../../lib/utils/logger';

export const RegisterForm = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { signUp, error, clearError, verification } = useAuthStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    clearError();
    setIsLoading(true);
    
    try {
      await signUp(email, password, rememberMe);
      // Success - verification email sent
      logger.debug('Registration successful, verification email sent');
    } catch (error) {
      logger.error('Registration failed', {
        error,
        message: error instanceof Error ? error.message : 'Unknown error'
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (verification.isPending && verification.email) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full p-6">
          <VerificationMessage email={verification.email} />
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
              Create your account
            </h2>
          </div>
          
          {error && (
            <div className="bg-red-50 dark:bg-red-900/20 border-l-4 border-red-400 p-4">
              <p className="text-sm text-red-700 dark:text-red-400">{error}</p>
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
                Create Account
              </AuthButton>
            </div>
          </form>
          
          <div className="text-center">
            <button
              type="button"
              onClick={() => navigate('/login')}
              className="text-sm text-primary hover:text-primary-dark dark:text-primary-light dark:hover:text-primary"
            >
              Already have an account? Sign in
            </button>
          </div>
        </div>
      </div>
      <AuthBenefits isRegistering={true} />
    </div>
  );
};