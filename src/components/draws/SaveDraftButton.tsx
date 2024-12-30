import React, { useState } from 'react';
import { Save } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';
import { UpgradePrompt } from './UpgradePrompt';

interface SaveDraftButtonProps {
  onSave: () => Promise<void>;
  disabled?: boolean;
}

export const SaveDraftButton: React.FC<SaveDraftButtonProps> = ({ onSave, disabled }) => {
  const [showUpgradePrompt, setShowUpgradePrompt] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const user = useAuthStore(state => state.user);

  const handleSaveClick = async () => {
    if (user?.subscription_type === 'free') {
      setShowUpgradePrompt(true);
      return;
    }

    setIsSaving(true);
    try {
      await onSave();
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <>
      <button
        onClick={handleSaveClick}
        disabled={disabled || isSaving}
        className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        <Save className="h-4 w-4 mr-2" />
        {isSaving ? 'Saving...' : 'Save Draft'}
      </button>

      {showUpgradePrompt && (
        <UpgradePrompt onClose={() => setShowUpgradePrompt(false)} />
      )}
    </>
  );
};