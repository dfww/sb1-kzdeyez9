import React from 'react';
import { useAuthStore } from '../../store/authStore';
import { LogOut, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { ThemeToggle } from '../common/ThemeToggle';
import { LanguageSwitcher } from '../common/LanguageSwitcher';

export const Header = () => {
  const { user, signOut } = useAuthStore();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate('/login', { replace: true });
    } catch (error) {
      console.error('Failed to sign out:', error);
      navigate('/login', { replace: true });
    }
  };

  return (
    <header className="bg-bg-primary dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 px-4 py-3">
      <div className="flex justify-end items-center space-x-6">
        <LanguageSwitcher />
        <div className="flex items-center text-gray-600 dark:text-gray-300">
          <User className="h-5 w-5" />
          <span className="ml-2 text-sm">{user?.email}</span>
        </div>
        <button
          onClick={handleSignOut}
          className="flex items-center px-3 py-2 rounded-md text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200"
        >
          <LogOut className="h-5 w-5" />
          <span className="ml-2 text-sm font-medium">Sign Out</span>
        </button>
        <ThemeToggle />
      </div>
    </header>
  );
};