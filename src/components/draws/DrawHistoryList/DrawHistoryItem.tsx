import React from 'react';
import { format } from 'date-fns';
import { Facebook, Instagram, CheckCircle, XCircle, Clock, ExternalLink } from 'lucide-react';
import type { Draw } from '../../../types/draw';

interface DrawHistoryItemProps {
  draw: Draw;
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

export const DrawHistoryItem: React.FC<DrawHistoryItemProps> = ({ draw }) => (
  <div className="border dark:border-gray-700 rounded-lg p-4 hover:border-primary dark:hover:border-primary-light transition-colors">
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
        <div className="mt-1 flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
          <span>{draw.page_name}</span>
          <span>•</span>
          <span>{format(new Date(draw.created_at), 'PPP')}</span>
          <span>•</span>
          <a
            href={draw.post_url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center hover:text-primary dark:hover:text-primary-light transition-colors"
          >
            View Post <ExternalLink className="h-4 w-4 ml-1" />
          </a>
        </div>
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
              className="flex items-center justify-between text-sm"
            >
              <span className="text-gray-600 dark:text-gray-400">
                {winner.name}
              </span>
              <a
                href={winner.commentUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:text-primary-dark dark:hover:text-primary-light transition-colors"
              >
                View Comment <ExternalLink className="h-4 w-4 ml-1 inline" />
              </a>
            </div>
          ))}
        </div>
      </div>
    )}
  </div>
);