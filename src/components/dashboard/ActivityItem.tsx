import React from 'react';
import { Facebook, Gift, Calendar, AlertTriangle } from 'lucide-react';
import type { Activity, DrawActivityDetails } from '../../types/activity';
import { logger } from '../../lib/utils/logger';

interface ActivityItemProps {
  activity: Activity;
  isLast: boolean;
}

const getActivityIcon = (type: Activity['type']) => {
  switch (type) {
    case 'facebook_connect':
    case 'facebook_disconnect':
      return <Facebook className="h-5 w-5 text-[#1877F2]" />;
    case 'draw_completed':
      return <Gift className="h-5 w-5 text-green-500" />;
    case 'draw_scheduled':
      return <Calendar className="h-5 w-5 text-blue-500" />;
    case 'draw_failed':
      return <AlertTriangle className="h-5 w-5 text-red-500" />;
    default:
      return null;
  }
};

const parseActivityDetails = (details: string | undefined): DrawActivityDetails | null => {
  if (!details) return null;
  
  try {
    // Handle both string-encoded JSON and raw JSON objects
    const parsed = typeof details === 'string' ? JSON.parse(details) : details;
    return parsed as DrawActivityDetails;
  } catch (error) {
    return null;
  }
};

const getActivityMessage = (activity: Activity) => {
  const details = parseActivityDetails(activity.details);

  switch (activity.type) {
    case 'facebook_connect':
      return 'Connected Facebook account';
    case 'facebook_disconnect':
      return 'Disconnected Facebook account';
    case 'draw_completed':
      return details 
        ? `Completed draw "${details.draw_name}" with ${details.winner_count} winner${details.winner_count !== 1 ? 's' : ''}`
        : 'Completed a draw';
    case 'draw_failed':
      return details
        ? `Draw "${details.draw_name}" failed`
        : 'A draw failed';
    case 'draw_scheduled':
      return details
        ? `Scheduled draw "${details.draw_name}"`
        : 'Scheduled a draw';
    default:
      return 'Unknown activity';
  }
};

export const ActivityItem: React.FC<ActivityItemProps> = ({ activity, isLast }) => (
  <li>
    <div className="relative pb-8">
      {!isLast && (
        <span
          className="absolute left-4 top-4 -ml-px h-full w-0.5 bg-gray-200 dark:bg-gray-700"
          aria-hidden="true"
        />
      )}
      <div className="relative flex space-x-3">
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800">
          {getActivityIcon(activity.type)}
        </div>
        <div className="flex min-w-0 flex-1 justify-between space-x-4 pt-1.5">
          <div>
            <p className="text-sm text-gray-900 dark:text-white">
              {getActivityMessage(activity)}
            </p>
          </div>
          <div className="whitespace-nowrap text-right text-sm text-gray-500 dark:text-gray-400">
            {new Date(activity.created_at).toLocaleDateString()}
          </div>
        </div>
      </div>
    </div>
  </li>
);