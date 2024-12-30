import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { completeDraw } from '../../lib/draws/service';
import { generateDrawName } from '../../utils/drawNaming';
import type { DrawRequest } from '../../lib/draws/types';
import { DrawSteps } from './DrawSteps';
import { PlatformSelector } from './PlatformSelector';
import { PageSelector } from './PageSelector';
import { PostSelector } from './PostSelector';
import { DrawCriteria } from './DrawCriteria';
import { WinnerDisplay } from './WinnerDisplay';
import { DrawError } from './DrawError';
import type { Platform } from '../../types/draw';

export const QuickDrawForm = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState<'platform' | 'page' | 'post' | 'criteria' | 'results'>('platform');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [drawData, setDrawData] = useState<Partial<DrawRequest>>({
    name: generateDrawName(),
    type: 'quick'
  });
  const [pageAccessToken, setPageAccessToken] = useState('');
  const [winners, setWinners] = useState<any[]>([]);

  const handlePlatformSelect = (platform: Platform) => {
    setDrawData(prev => ({ ...prev, platform }));
    setCurrentStep('page');
  };

  const handlePageSelect = (pageId: string, pageName: string, accessToken: string) => {
    setDrawData(prev => ({ ...prev, pageId, pageName }));
    setPageAccessToken(accessToken);
    setCurrentStep('post');
  };

  const handlePostSelect = (postId: string, url: string) => {
    setDrawData(prev => ({ ...prev, postId, postUrl: url }));
    setCurrentStep('criteria');
  };

  const handleCriteriaSubmit = async (criteria: any) => {
    try {
      setError(null);
      setIsLoading(true);

      const request = {
        ...drawData,
        criteria
      } as DrawRequest;

      const result = await completeDraw(request, pageAccessToken);
      setWinners(result.winners || []);
      setCurrentStep('results');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to complete draw');
    } finally {
      setIsLoading(false);
    }
  };

  const handleBack = () => {
    switch (currentStep) {
      case 'page':
        setDrawData(prev => ({ ...prev, platform: undefined }));
        setCurrentStep('platform');
        break;
      case 'post':
        setDrawData(prev => ({ ...prev, pageId: '', pageName: '' }));
        setPageAccessToken('');
        setCurrentStep('page');
        break;
      case 'criteria':
        setDrawData(prev => ({ ...prev, postId: '', postUrl: '' }));
        setCurrentStep('post');
        break;
      case 'results':
        setWinners([]);
        setCurrentStep('criteria');
        break;
    }
  };

  return (
    <div className="space-y-6">
      <DrawSteps 
        currentStep={currentStep}
        showBackButton={false} // Hide back button in steps
      />

      {error && <DrawError message={error} />}

      <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
        {currentStep === 'platform' && (
          <PlatformSelector
            selectedPlatform={drawData.platform}
            onSelect={handlePlatformSelect}
          />
        )}

        {currentStep === 'page' && drawData.platform && (
          <PageSelector onPageSelect={handlePageSelect} />
        )}

        {currentStep === 'post' && pageAccessToken && (
          <PostSelector
            pageId={drawData.pageId!}
            accessToken={pageAccessToken}
            onPostSelect={handlePostSelect}
          />
        )}

        {currentStep === 'criteria' && (
          <DrawCriteria 
            onSubmit={handleCriteriaSubmit}
            isLoading={isLoading}
          />
        )}

        {currentStep === 'results' && (
          <WinnerDisplay
            winners={winners}
            postUrl={drawData.postUrl!}
          />
        )}

        {/* Back link in lower left */}
        {currentStep !== 'platform' && (
          <button
            onClick={handleBack}
            className="mt-6 inline-flex items-center text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary-light transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back
          </button>
        )}
      </div>
    </div>
  );
};