import React from 'react';
import { LoadingSpinner } from '../ui/LoadingSpinner';
import { useFacebookPages } from '../../hooks/useFacebookPages';

interface PageSelectorProps {
  onPageSelect: (pageId: string, pageName: string, accessToken: string) => void;
}

export const PageSelector: React.FC<PageSelectorProps> = ({ onPageSelect }) => {
  const { pages, isLoading, error } = useFacebookPages();

  if (isLoading) {
    return (
      <div className="flex justify-center py-4">
        <LoadingSpinner className="text-primary" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-600 dark:text-red-400 text-sm py-2">
        {error}
      </div>
    );
  }

  if (!pages?.length) {
    return (
      <div className="text-gray-600 dark:text-gray-300 text-sm py-2">
        No Facebook pages found. Make sure you have admin access to at least one page.
      </div>
    );
  }

  return (
    <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
      {pages.map((page) => (
        <button
          key={page.id}
          onClick={() => onPageSelect(page.id, page.name, page.access_token)}
          className="flex items-center p-4 border dark:border-gray-700 rounded-lg hover:border-primary dark:hover:border-primary-light transition-colors"
        >
          <img
            src={page.picture.data.url}
            alt={page.name}
            className="w-10 h-10 rounded-full"
          />
          <span className="ml-3 font-medium text-gray-900 dark:text-white">
            {page.name}
          </span>
        </button>
      ))}
    </div>
  );
};