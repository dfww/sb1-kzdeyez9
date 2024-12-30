import { useState, useEffect, useCallback } from 'react';
import { checkTokenExpiration, refreshFacebookToken } from '../lib/social/facebook/token';
import { logger } from '../lib/utils/logger';

export const useFacebookToken = (connectionId?: string) => {
  const [isValid, setIsValid] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [lastCheck, setLastCheck] = useState(0);

  const checkAndRefreshToken = useCallback(async () => {
    if (!connectionId) return;

    // Don't check more than once per minute
    const now = Date.now();
    if (now - lastCheck < 60 * 1000) return;

    try {
      const needsRefresh = await checkTokenExpiration(connectionId);
      if (needsRefresh) {
        setIsRefreshing(true);
        const success = await refreshFacebookToken(connectionId);
        setIsValid(success);
      }
    } catch (error) {
      logger.error('Token refresh failed:', error);
      setIsValid(false);
    } finally {
      setIsRefreshing(false);
      setLastCheck(now);
    }
  }, [connectionId, lastCheck]);

  useEffect(() => {
    checkAndRefreshToken();
    
    // Set up periodic check every 5 minutes
    const interval = setInterval(checkAndRefreshToken, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, [checkAndRefreshToken]);

  return { 
    isValid, 
    isRefreshing,
    refreshToken: checkAndRefreshToken 
  };
};