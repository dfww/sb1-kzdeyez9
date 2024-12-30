import React from 'react';
import { ExternalLink } from 'lucide-react';
import type { Winner } from '../../types/draw';

interface WinnerDisplayProps {
  winners: Winner[];
  postUrl: string;
  onRedraw?: () => void;
  onConfirm?: () => void;
  isConfirming?: boolean;
}

export const WinnerDisplay: React.FC<WinnerDisplayProps> = ({ 
  winners, 
  postUrl,
  onRedraw,
  onConfirm,
  isConfirming = false
}) => {
  if (!winners.length) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500 dark:text-gray-400">
          No eligible winners found. Try adjusting your criteria.
        </p>
        {onRedraw && (
          <button
            onClick={onRedraw}
            className="mt-4 text-primary hover:text-primary-dark dark:hover:text-primary-light transition-colors"
          >
            Try Again
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white">
          🎉 Congratulations to {winners.length > 1 ? 'our winners' : winners[0].name}! 🎉
        </h3>
      </div>

      <div className="space-y-4">
        {winners.map((winner) => (
          <div
            key={winner.commentId}
            className="bg-white dark:bg-gray-700 border dark:border-gray-600 rounded-lg p-4 shadow-sm"
          >
            <div className="flex justify-between items-start">
              <div>
                <h4 className="font-medium text-gray-900 dark:text-white">
                  {winner.name}
                </h4>
                <p className="mt-1 text-gray-600 dark:text-gray-300">
                  {winner.comment}
                </p>
              </div>
              <a
                href={winner.commentUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:text-primary-dark dark:hover:text-primary-light transition-colors"
              >
                <ExternalLink className="h-5 w-5" />
              </a>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center space-x-4">
        <a
          href={postUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center text-sm text-primary hover:text-primary-dark dark:hover:text-primary-light transition-colors"
        >
          View Post
          <ExternalLink className="ml-1 h-4 w-4" />
        </a>
        {onRedraw && (
          <button
            onClick={onRedraw}
            className="text-sm text-primary hover:text-primary-dark dark:hover:text-primary-light transition-colors"
          >
            Pick New Winners
          </button>
        )}
      </div>

      {onConfirm && (
        <div className="flex justify-center mt-8">
          <button
            onClick={onConfirm}
            disabled={isConfirming}
            className="bg-primary hover:bg-primary-dark text-white px-6 py-2 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isConfirming ? 'Saving...' : 'Confirm Winners'}
          </button>
        </div>
      )}
    </div>
  );
};