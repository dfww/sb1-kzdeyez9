import React from 'react';
import { Link } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { RecentActivity } from '../components/dashboard/RecentActivity';
import { Card } from '../components/common/Card';

export const Dashboard = () => {
  const user = useAuthStore((state) => state.user);

  return (
    <div className="space-y-6">
      <Card>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Welcome back!</h2>
        <p className="text-gray-600 dark:text-gray-300">
          Subscription: {user?.subscription_type}
        </p>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Quick Draw</h3>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            Pick a winner from any social media post instantly.
          </p>
          <Link 
            to="/app/quick-draw"
            className="btn-primary inline-block w-full text-center"
          >
            Start New Draw
          </Link>
        </Card>

        <Card>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Scheduled Draws</h3>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            Plan and automate your future giveaways.
          </p>
          <Link 
            to="/app/scheduled-draws"
            className="btn-primary inline-block w-full text-center"
          >
            Schedule Draw
          </Link>
        </Card>

        <Card>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Recent Activity</h3>
          <RecentActivity />
        </Card>
      </div>
    </div>
  );
};