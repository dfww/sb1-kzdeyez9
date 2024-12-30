import React, { useState } from 'react';
import { Gift } from 'lucide-react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
}

export const Logo: React.FC<LogoProps> = ({ size = 'md' }) => {
  const [imageError, setImageError] = useState(false);
  
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12'
  };

  if (imageError) {
    return (
      <div className={`${sizeClasses[size]} bg-primary rounded-lg flex items-center justify-center group transition-colors`}>
        <Gift className="h-6 w-6 text-white dark:text-gray-100 group-hover:scale-110 transition-transform" />
      </div>
    );
  }

  return (
    <img
      src="/logo.png"
      alt="The Lucky Potato"
      className={`${sizeClasses[size]} object-contain`}
      onError={() => setImageError(true)}
    />
  );
};