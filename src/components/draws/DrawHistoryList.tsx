import React from 'react';
import { format } from 'date-fns';
import { Facebook, Instagram, CheckCircle, XCircle, Clock } from 'lucide-react';
import type { Draw } from '../../types/draw';

interface DrawHistoryListProps {
  draws: Draw[];
}

const PlatformIcon = ({ platform }: { platform: Draw['platform'] }) => {
  switch (platform) {
    case 'facebook':
      return <Facebook className="h-5 w-5 text-[#1877F2]" />;
    case 'instagram':
      return <Instagram className="h-5 w-5 text-[#E4405F]" />;
    default:
      return null;
  }
};

const StatusIcon = ({ status }: { status: Draw['status'] }) => {
  switch (status) {
    case 'completed':
      return <CheckCircle className="h-5 w-5 text-green-500" />;
    case 'failed':
      return <XCircle className="h-5 w-5 text-red-500" />;
    case 'pending':
      return <Clock className="h-5 w-5 text-yellow-500" />;
    default:
      return null;
  }
};

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
        <div 
          key={draw.id}
          className="border dark:border-gray-700 rounded-lg p-4 hover:border-primary dark:hover:border-primary-light transition-colors"
        >
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center space-x-2">
                <PlatformIcon platform={draw.platform} />
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                  {draw.name}
                </h3>
                <span className="px-2 py-1 text-xs rounded-full bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300">
                  {draw.type}
                </span>
              </div>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                {draw.page_name} • {format(new Date(draw.created_at), 'PPP')}
              </p>
            </div>
            <StatusIcon status={draw.status} />
          </div>
          
          {draw.winners && draw.winners.length > 0 && (
            <div className="mt-4">
              <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Winners
              </h4>
              <div className="space-y-2">
                {draw.winners.map((winner) => (
                  <div 
                    key={winner.id}
                    className="text-sm text-gray-600 dark:text-gray-400"
                  >
                    {winner.name}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};