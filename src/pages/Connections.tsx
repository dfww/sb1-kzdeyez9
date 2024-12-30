import React, { useState } from 'react';
import { useSubscriptionFeatures } from '../hooks/useSubscriptionFeatures';
import { ConnectionsLanding } from '../components/connections/ConnectionsLanding';
import { ConnectFacebookButton } from '../components/connections/ConnectFacebookButton';
import { ConnectionsList } from '../components/connections/ConnectionsList';
import { Card } from '../components/common/Card';
import { useSocialConnections } from '../hooks/useSocialConnections';
import { disconnectFacebook } from '../lib/social/facebook/disconnect';

export const Connections = () => {
  const { canSaveConnections } = useSubscriptionFeatures();
  const { connections, isLoading, error, mutate } = useSocialConnections();
  const [isDisconnecting, setIsDisconnecting] = useState(false);

  const handleDisconnect = async (connectionId: string) => {
    try {
      setIsDisconnecting(true);
      await disconnectFacebook(connectionId);
      await mutate(); // Refresh connections list
    } catch (error) {
      console.error('Failed to disconnect:', error);
    } finally {
      setIsDisconnecting(false);
    }
  };

  if (!canSaveConnections) {
    return <ConnectionsLanding />;
  }

  return (
    <div className="space-y-6">
      <Card>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          Social Media Connections
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          Connect your social media accounts to start running giveaways.
        </p>

        <div className="space-y-4">
          <ConnectFacebookButton 
            onSuccess={mutate}
          />
        </div>
      </Card>

      <ConnectionsList 
        connections={connections} 
        isLoading={isLoading} 
        onDisconnect={handleDisconnect}
        isDisconnecting={isDisconnecting}
      />
    </div>
  );
};