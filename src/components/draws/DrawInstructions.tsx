import React from 'react';
import { Info } from 'lucide-react';

export const DrawInstructions = () => (
  <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6">
    <div className="flex items-start">
      <div className="flex-shrink-0">
        <Info className="h-6 w-6 text-blue-600 dark:text-blue-400" />
      </div>
      <div className="ml-3">
        <h3 className="text-sm font-medium text-blue-800 dark:text-blue-300">
          How it works
        </h3>
        <div className="mt-2 text-sm text-blue-700 dark:text-blue-300">
          <ol className="list-decimal list-inside space-y-1">
            <li>Name your giveaway draw for easy reference</li>
            <li>Choose between Facebook or Instagram platform</li>
            <li>Select one of your connected pages</li>
            <li>Pick the post you want to draw winners from</li>
            <li>Set your winner criteria (likes, comments, follows)</li>
            <li>Click "Find Winners" to randomly select from eligible participants</li>
          </ol>
          <p className="mt-3 text-sm text-blue-600 dark:text-blue-400">
            Note: Make sure you have connected your social media accounts in the Connections page first.
          </p>
        </div>
      </div>
    </div>
  </div>
);