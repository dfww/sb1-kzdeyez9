import React from 'react';
import { Input } from '../common/Input';
import { isFreeUser } from '../../utils/tierRestrictions';

interface DrawNameInputProps {
  value: string;
  onChange: (value: string) => void;
}

export const DrawNameInput: React.FC<DrawNameInputProps> = ({ value, onChange }) => {
  const userIsFree = isFreeUser();

  return (
    <div>
      <Input
        label="Draw Name"
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Free tier draws are automatically named"
        required
        disabled={userIsFree}
      />
      {userIsFree && (
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Free tier draws are automatically named with a timestamp
        </p>
      )}
    </div>
  );
};