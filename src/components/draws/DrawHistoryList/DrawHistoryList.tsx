import React from 'react';
import { DrawHistoryItem } from './DrawHistoryItem';
import type { Draw } from '../../../types/draw';

interface DrawHistoryListProps {
  draws: Draw[];
}

export const DrawHistoryList: React.FC<DrawHistoryListProps> = ({ draws }) => {
  if (draws.length === 0) {
    return (
      <p className="text-gray-500 dark:text-gray-400 text-center py-8">
        No draws found. Start by creating a quick draw or scheduling one.
      </p>
    );
  }

  return (
    <div className="space-y-4">
      {draws.map((draw) => (
        <DrawHistoryItem key={draw.id} draw={draw} />
      ))}
    </div>
  );
};