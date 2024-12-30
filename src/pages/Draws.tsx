import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Gift, Calendar } from 'lucide-react';
import { useDrawStore } from '../store/drawStore';
import { Card } from '../components/common/Card';
import { DraftsList } from '../components/draws/DraftsList';

export const Draws = () => {
  const { draws, fetchDraws, deleteDraft } = useDrawStore();

  useEffect(() => {
    fetchDraws();
  }, [fetchDraws]);

  const handleContinueDraft = (draftId: string) => {
    // TODO: Implement draft continuation
    console.log('Continue draft:', draftId);
  };

  const handleDeleteDraft = async (draftId: string) => {
    try {
      await deleteDraft(draftId);
    } catch (error) {
      console.error('Failed to delete draft:', error);
    }
  };

  const drawTypes = [
    {
      id: 'quick',
      title: 'Quick Draw',
      description: 'Pick winners instantly from any social media post',
      icon: Gift,
      href: '/app/draws/quick'
    },
    {
      id: 'scheduled',
      title: 'Scheduled Draw',
      description: 'Plan and automate your future giveaways',
      icon: Calendar,
      href: '/app/draws/scheduled'
    }
  ];

  return (
    <div className="space-y-6">
      <Card>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          Create New Draw
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mb-8">
          Choose the type of draw you want to create
        </p>

        <div className="grid gap-6 md:grid-cols-2">
          {drawTypes.map((type) => (
            <Link
              key={type.id}
              to={type.href}
              className="flex flex-col items-center p-6 border dark:border-gray-700 rounded-lg hover:border-primary dark:hover:border-primary-light transition-colors"
            >
              <type.icon className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                {type.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-center">
                {type.description}
              </p>
            </Link>
          ))}
        </div>
      </Card>

      <Card>
        <DraftsList
          drafts={draws}
          onContinue={handleContinueDraft}
          onDelete={handleDeleteDraft}
        />
      </Card>
    </div>
  );
};