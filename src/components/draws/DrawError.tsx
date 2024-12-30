import React from 'react';
import { AlertTriangle } from 'lucide-react';

interface DrawErrorProps {
  message: string;
}

export const DrawError: React.FC<DrawErrorProps> = ({ message }) => (
  <div className="bg-red-50 dark:bg-red-900/20 border-l-4 border-red-400 p-4">
    <div className="flex">
      <div className="flex-shrink-0">
        <AlertTriangle className="h-5 w-5 text-red-400" />
      </div>
      <div className="ml-3">
        <p className="text-sm text-red-700 dark:text-red-400">{message}</p>
      </div>
    </div>
  </div>
);