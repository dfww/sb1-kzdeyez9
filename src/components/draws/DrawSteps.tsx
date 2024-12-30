import React from 'react';
import { CheckCircle2, Circle } from 'lucide-react';
import type { DrawStep } from '../../types/draw';

interface DrawStepsProps {
  currentStep: DrawStep;
  showBackButton?: boolean;
}

const steps = [
  { id: 'platform', name: 'Select Platform' },
  { id: 'page', name: 'Select Page' },
  { id: 'post', name: 'Choose Post' },
  { id: 'criteria', name: 'Set Criteria' },
  { id: 'results', name: 'View Results' }
] as const;

export const DrawSteps: React.FC<DrawStepsProps> = ({ 
  currentStep,
  showBackButton = true
}) => {
  const getCurrentStepIndex = () => steps.findIndex(step => step.id === currentStep);
  const currentStepIndex = getCurrentStepIndex();

  return (
    <nav aria-label="Progress" className="px-4">
      <ol className="flex items-center">
        {steps.map((step, stepIdx) => {
          const isComplete = stepIdx < currentStepIndex;
          const isCurrent = step.id === currentStep;

          return (
            <li
              key={step.id}
              className={`relative ${stepIdx !== steps.length - 1 ? 'pr-8 sm:pr-20' : ''}`}
            >
              <div className="flex items-center">
                <div
                  className={`${
                    isComplete || isCurrent
                      ? 'border-primary'
                      : 'border-gray-300 dark:border-gray-600'
                  } relative flex h-8 w-8 items-center justify-center rounded-full border-2 bg-white dark:bg-gray-800`}
                >
                  {isComplete ? (
                    <CheckCircle2 className="h-5 w-5 text-primary" />
                  ) : isCurrent ? (
                    <div className="h-2.5 w-2.5 rounded-full bg-primary" />
                  ) : (
                    <Circle className="h-5 w-5 text-gray-300 dark:text-gray-600" />
                  )}
                </div>
                {stepIdx !== steps.length - 1 && (
                  <div
                    className={`${
                      isComplete ? 'bg-primary' : 'bg-gray-300 dark:bg-gray-600'
                    } absolute top-4 h-0.5 w-full`}
                  />
                )}
              </div>
              <span className="absolute -bottom-6 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-100">
                {step.name}
              </span>
            </li>
          );
        })}
      </ol>
    </nav>
  );
};