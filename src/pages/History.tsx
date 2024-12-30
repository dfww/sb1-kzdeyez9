import React, { useEffect } from 'react';
import { useDrawStore } from '../store/drawStore';
import { Card } from '../components/common/Card';
import { DrawHistoryList } from '../components/draws/DrawHistoryList';
import { LoadingSpinner } from '../components/ui/LoadingSpinner';

export const History = () => {
  const { draws, isLoading, error, fetchDraws } = useDrawStore();

  useEffect(() => {
    fetchDraws();
  }, [fetchDraws]);

  if (isLoading) {
    return (
      <div className="flex justify-center py-8">
        <LoadingSpinner className="text-primary" />
      </div>
    );
  }

  if (error) {
    return (
      <Card>
        <p className="text-red-600">{error}</p>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          Draw History
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          View all your past giveaway draws and their results.
        </p>
        <DrawHistoryList draws={draws} />
      </Card>
    </div>
  );
};