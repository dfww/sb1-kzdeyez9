import React from 'react';
import { useRecentActivity } from '../../hooks/useRecentActivity';
import { LoadingSpinner } from '../ui/LoadingSpinner';
import { ActivityItem } from './ActivityItem';

export const RecentActivity = () => {
  const { activities, isLoading, error } = useRecentActivity();

  if (error) {
    return (
      <div className="text-red-600 dark:text-red-400 text-center py-4">
        {error}
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex justify-center py-4">
        <LoadingSpinner className="text-primary" />
      </div>
    );
  }

  if (activities.length === 0) {
    return (
      <p className="text-gray-600 dark:text-gray-400 text-center py-4">
        No recent activity found.
      </p>
    );
  }

  return (
    <div className="flow-root">
      <ul className="-mb-8">
        {activities.map((activity, idx) => (
          <ActivityItem 
            key={activity.id}
            activity={activity}
            isLast={idx === activities.length - 1}
          />
        ))}
      </ul>
    </div>
  );
};