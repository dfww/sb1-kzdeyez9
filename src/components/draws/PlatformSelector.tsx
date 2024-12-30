import React from 'react';
import { Facebook, Instagram } from 'lucide-react';
import type { Platform } from '../../types/draw';

interface PlatformSelectorProps {
  selectedPlatform: Platform | null;
  onSelect: (platform: Platform) => void;
}

export const PlatformSelector: React.FC<PlatformSelectorProps> = ({
  selectedPlatform,
  onSelect,
}) => {
  const platforms = [
    { id: 'facebook', name: 'Facebook', icon: Facebook },
    { id: 'instagram', name: 'Instagram', icon: Instagram }
  ] as const;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        {platforms.map((platform) => {
          const isSelected = selectedPlatform === platform.id;
          const Icon = platform.icon;

          return (
            <button
              key={platform.id}
              type="button"
              onClick={() => onSelect(platform.id)}
              className={`
                flex flex-col items-center justify-center p-6
                border-2 rounded-lg transition-all
                hover:border-primary dark:hover:border-primary-light cursor-pointer
                ${isSelected
                  ? 'border-primary dark:border-primary-light bg-primary/5 dark:bg-primary-light/5'
                  : 'border-gray-200 dark:border-gray-700'
                }
              `}
            >
              <Icon className={`
                h-8 w-8 mb-2
                ${platform.id === 'facebook' ? 'text-[#1877F2]' : 'text-[#E4405F]'}
              `} />
              <span className="text-sm font-medium text-gray-900 dark:text-white">
                {platform.name}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};