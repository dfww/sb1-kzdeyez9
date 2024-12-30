import React, { useState } from 'react';
import { X } from 'lucide-react';
import { Input } from '../common/Input';
import { LoadingSpinner } from '../ui/LoadingSpinner';

interface DrawCriteriaProps {
  onSubmit: (criteria: {
    requireLike: boolean;
    requireComment: boolean;
    requireFollow: boolean;
    commentMustInclude?: string;
    excludedAccounts: string[];
    winnerCount: number;
  }) => void;
  isLoading?: boolean;
}

export const DrawCriteria: React.FC<DrawCriteriaProps> = ({ 
  onSubmit,
  isLoading = false
}) => {
  const [requireLike, setRequireLike] = useState(false);
  const [requireComment, setRequireComment] = useState(true); // Default to true since we need comments
  const [requireFollow, setRequireFollow] = useState(false);
  const [commentMustInclude, setCommentMustInclude] = useState('');
  const [excludedAccount, setExcludedAccount] = useState('');
  const [excludedAccounts, setExcludedAccounts] = useState<string[]>([]);
  const [winnerCount, setWinnerCount] = useState(1);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      requireLike,
      requireComment: true, // Always true since we need comments
      requireFollow,
      commentMustInclude: commentMustInclude || undefined,
      excludedAccounts,
      winnerCount
    });
  };

  const handleAddExcludedAccount = () => {
    if (excludedAccount && !excludedAccounts.includes(excludedAccount)) {
      setExcludedAccounts([...excludedAccounts, excludedAccount]);
      setExcludedAccount('');
    }
  };

  const handleRemoveExcludedAccount = (account: string) => {
    setExcludedAccounts(excludedAccounts.filter(a => a !== account));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Winner Requirements
        </h3>
        <div className="space-y-2">
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={requireLike}
              onChange={(e) => setRequireLike(e.target.checked)}
              className="rounded border-gray-300 dark:border-gray-600 text-primary focus:ring-primary dark:focus:ring-primary-light"
            />
            <span className="ml-2 text-sm text-gray-600 dark:text-gray-300">
              Must like the post
            </span>
          </label>
          <label className="flex items-center opacity-50 cursor-not-allowed">
            <input
              type="checkbox"
              checked={true}
              disabled
              className="rounded border-gray-300 dark:border-gray-600 text-primary focus:ring-primary dark:focus:ring-primary-light"
            />
            <span className="ml-2 text-sm text-gray-600 dark:text-gray-300">
              Must comment on the post (Required)
            </span>
          </label>
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={requireFollow}
              onChange={(e) => setRequireFollow(e.target.checked)}
              className="rounded border-gray-300 dark:border-gray-600 text-primary focus:ring-primary dark:focus:ring-primary-light"
            />
            <span className="ml-2 text-sm text-gray-600 dark:text-gray-300">
              Must follow your account
            </span>
          </label>
        </div>
      </div>

      <div>
        <Input
          label="Comment must include (optional)"
          value={commentMustInclude}
          onChange={(e) => setCommentMustInclude(e.target.value)}
          placeholder="Use * for wildcards, e.g., 'pick*me'"
          disabled={isLoading}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Exclude accounts (optional)
        </label>
        <div className="mt-1 flex rounded-md shadow-sm">
          <input
            type="text"
            value={excludedAccount}
            onChange={(e) => setExcludedAccount(e.target.value)}
            placeholder="Enter Facebook profile URL or ID"
            disabled={isLoading}
            className="flex-1 rounded-l-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:border-primary focus:ring-primary dark:focus:ring-primary-light disabled:opacity-50"
          />
          <button
            type="button"
            onClick={handleAddExcludedAccount}
            disabled={isLoading || !excludedAccount}
            className="inline-flex items-center rounded-r-md border border-l-0 border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-600 px-3 text-gray-500 dark:text-gray-300 disabled:opacity-50"
          >
            Add
          </button>
        </div>
        {excludedAccounts.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-2">
            {excludedAccounts.map(account => (
              <span
                key={account}
                className="inline-flex items-center rounded-full bg-gray-100 dark:bg-gray-700 px-3 py-1 text-sm"
              >
                <span className="text-gray-600 dark:text-gray-300">{account}</span>
                <button
                  type="button"
                  onClick={() => handleRemoveExcludedAccount(account)}
                  disabled={isLoading}
                  className="ml-1 text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 disabled:opacity-50"
                >
                  <X className="h-4 w-4" />
                </button>
              </span>
            ))}
          </div>
        )}
      </div>

      <div>
        <label htmlFor="winners" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Number of Winners
        </label>
        <select
          id="winners"
          value={winnerCount}
          onChange={(e) => setWinnerCount(Number(e.target.value))}
          disabled={isLoading}
          className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm focus:border-primary focus:ring-primary dark:focus:ring-primary-light disabled:opacity-50"
        >
          {[1, 2, 3, 5, 10].map(num => (
            <option key={num} value={num}>
              {num} winner{num > 1 ? 's' : ''}
            </option>
          ))}
        </select>
      </div>

      <div>
        <button
          type="submit"
          disabled={isLoading}
          className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors disabled:opacity-50"
        >
          {isLoading ? (
            <LoadingSpinner className="text-white" />
          ) : (
            `Find the Lucky ${winnerCount > 1 ? 'Potatoes' : 'Potato'}`
          )}
        </button>
      </div>
    </form>
  );
};