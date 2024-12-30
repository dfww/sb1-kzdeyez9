import React from 'react';
import { useAuthStore } from '../../../store/authStore';
import { DraftItem } from './DraftItem';
import { UpgradePrompt } from './UpgradePrompt';
import type { Draw } from '../../../types/draw';

interface DraftsListProps {
  drafts: Draw[];
  onContinue: (draftId: string) => void;
  onDelete: (draftId: string) => void;
}

export const DraftsList: React.FC<DraftsListProps> = ({ drafts, onContinue, onDelete }) => {
  const user = useAuthStore(state => state.user);
  const draftItems = drafts.filter(draw => draw.status === 'draft');

  if (draftItems.length === 0 && user?.subscription_type !== 'free') {
    return null;
  }

  return (
    <div className="mb-8">
      <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
        Draft Draws
      </h3>

      {user?.subscription_type === 'free' ? (
        <UpgradePrompt />
      ) : (
        <div className="grid gap-4 sm:grid-cols-2">
          {draftItems.map((draft) => (
            <DraftItem
              key={draft.id}
              draft={draft}
              onContinue={() => onContinue(draft.id)}
              onDelete={() => onDelete(draft.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
};