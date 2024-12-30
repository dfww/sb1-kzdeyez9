import React from 'react';
import { Card } from '../components/common/Card';

export const ScheduledDraw = () => {
  return (
    <div className="space-y-6">
      <Card>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          Schedule a Draw
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          Coming soon! Schedule your giveaway draws in advance.
        </p>
      </Card>
    </div>
  );
};