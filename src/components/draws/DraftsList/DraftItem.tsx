import React from 'react';
import { Pencil, Trash2, Facebook, Instagram } from 'lucide-react';
import type { Draw } from '../../../types/draw';

interface DraftItemProps {
  draft: Draw;
  onContinue: () => void;
  onDelete: () => void;
}

export const DraftItem: React.FC<DraftItemProps> = ({ draft, onContinue, onDelete }) => {
  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirm('Are you sure you want to delete this draft?')) {
      onDelete();
    }
  };

  const PlatformIcon = draft.draft_data?.platform === 'facebook' ? Facebook : Instagram;

  return (
    <div 
      onClick={onContinue}
      className="p-4 border dark:border-gray-700 rounded-lg hover:border-primary dark:hover:border-primary-light transition-colors cursor-pointer"
    >
      <div className="flex justify-between items-start">
        <div className="flex items-start space-x-3">
          {draft.draft_data?.platform && (
            <PlatformIcon className={`h-5 w-5 ${
              draft.draft_data.platform === 'facebook' ? 'text-[#1877F2]' : 'text-[#E4405F]'
            }`} />
          )}
          <div>
            <h4 className="font-medium text-gray-900 dark:text-white">
              {draft.draft_data?.name || 'Untitled Draw'}
            </h4>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              Last modified: {new Date(draft.created_at).toLocaleDateString()}
            </p>
            {draft.draft_data?.pageName && (
              <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                {draft.draft_data.pageName}
              </p>
            )}
          </div>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onContinue();
            }}
            className="p-1 text-gray-500 hover:text-primary dark:text-gray-400 dark:hover:text-primary-light transition-colors"
            title="Continue editing"
          >
            <Pencil className="h-4 w-4" />
          </button>
          <button
            onClick={handleDelete}
            className="p-1 text-gray-500 hover:text-red-600 dark:text-gray-400 dark:hover:text-red-400 transition-colors"
            title="Delete draft"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
};