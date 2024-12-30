import { useState, useEffect } from 'react';
import { useSocialConnections } from './useSocialConnections';
import { getPages } from '../lib/social/facebook/api';
import { logger } from '../lib/utils/logger';

export const useFacebookPages = () => {
  const { connections } = useSocialConnections();
  const [pages, setPages] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPages = async () => {
      try {
        const fbConnection = connections.find(c => c.platform === 'facebook');
        if (!fbConnection) {
          setError('No Facebook connection found');
          setIsLoading(false);
          return;
        }

        const pagesList = await getPages(fbConnection.access_token);
        setPages(pagesList);
        setError(null);
      } catch (err) {
        logger.error('Failed to fetch Facebook pages:', err);
        setError(err instanceof Error ? err.message : 'Failed to fetch pages');
      } finally {
        setIsLoading(false);
      }
    };

    if (connections.length > 0) {
      fetchPages();
    } else {
      setIsLoading(false);
    }
  }, [connections]);

  return { pages, isLoading, error };
};