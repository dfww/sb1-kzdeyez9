import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../lib/supabase';
import type { SocialConnection } from '../types/social';
import { useAuthStore } from '../store/authStore';
import { logger } from '../lib/utils/logger';

export const useSocialConnections = () => {
  const [connections, setConnections] = useState<SocialConnection[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const user = useAuthStore((state) => state.user);

  const fetchConnections = useCallback(async () => {
    if (!user?.id) return;

    try {
      setIsLoading(true);
      const { data, error: fetchError } = await supabase
        .from('social_connections')
        .select('*')
        .eq('user_id', user.id);

      if (fetchError) throw fetchError;
      setConnections(data || []);
    } catch (err) {
      logger.error('Error fetching social connections:', err);
      setError('Failed to load social connections');
    } finally {
      setIsLoading(false);
    }
  }, [user?.id]);

  useEffect(() => {
    fetchConnections();
  }, [fetchConnections]);

  return { 
    connections, 
    isLoading, 
    error,
    mutate: fetchConnections
  };
};