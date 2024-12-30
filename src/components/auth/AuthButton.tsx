import React from 'react';
import { LoadingSpinner } from '../ui/LoadingSpinner';

interface AuthButtonProps {
  isLoading: boolean;
  children: React.ReactNode;
}

export const AuthButton = ({ isLoading, children }: AuthButtonProps) => (
  <button
    type="submit"
    disabled={isLoading}
    className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
  >
    {isLoading ? (
      <LoadingSpinner className="text-white" />
    ) : (
      children
    )}
  </button>
);