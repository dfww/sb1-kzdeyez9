import React from 'react';
import { QuickDrawForm } from '../components/draws/QuickDrawForm';
import { DrawInstructions } from '../components/draws/DrawInstructions';
import { Card } from '../components/common/Card';

export const QuickDraw = () => {
  return (
    <div className="space-y-6">
      <Card>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          Quick Draw
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          Select a winner from your social media post instantly. Just name your draw, choose a platform, and set your criteria.
        </p>
        <QuickDrawForm />
      </Card>
      <DrawInstructions />
    </div>
  );
};