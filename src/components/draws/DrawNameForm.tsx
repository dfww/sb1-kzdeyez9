import React from 'react';
import { useDrawNaming } from '../../hooks/useDrawNaming';
import { isFreeUser } from '../../utils/tierRestrictions';

interface DrawNameFormProps {
  onSubmit: (e: React.FormEvent) => void;
}

export const DrawNameForm: React.FC<DrawNameFormProps> = ({ onSubmit }) => {
  const { drawName } = useDrawNaming();
  const userIsFree = isFreeUser();

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
          Start New Draw
        </h3>
        {userIsFree ? (
          <p className="text-sm text-gray-600 dark:text-gray-300">
            Your draw will be automatically named: {drawName}
          </p>
        ) : (
          <p className="text-sm text-gray-600 dark:text-gray-300">
            Draw name: {drawName}
          </p>
        )}
      </div>

      <button 
        type="submit"
        className="w-full btn-primary"
      >
        Continue
      </button>
    </form>
  );
};