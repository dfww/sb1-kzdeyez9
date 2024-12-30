import { supabase } from '../supabase';
import { useAuthStore } from '../../store/authStore';
import { getUserProfile } from './profile';
import { logger } from '../utils/logger';

export const initAuth = async () => {
  try {
    // Get existing session
    const { data: { session }, error } = await supabase.auth.getSession();
    
    if (error) {
      logger.error('Failed to get session:', error);
      useAuthStore.getState().reset();
      return;
    }
    
    if (session?.user) {
      const profile = await getUserProfile(session.user.id);
      if (profile) {
        useAuthStore.getState().setUser(profile);
        logger.debug('Auth initialized with existing session', { 
          userId: profile.id,
          expiresAt: session.expires_at,
          isExpired: new Date(session.expires_at!) < new Date()
        });
      }
    }

    // Set up auth state change listener
    supabase.auth.onAuthStateChange(async (event, session) => {
      logger.debug('Auth state changed', { event });
      
      switch (event) {
        case 'SIGNED_OUT':
        case 'USER_DELETED':
          useAuthStore.getState().reset();
          break;
          
        case 'SIGNED_IN':
          if (session?.user) {
            const profile = await getUserProfile(session.user.id);
            if (profile) {
              useAuthStore.getState().setUser(profile);
              logger.debug('User signed in', {
                userId: profile.id,
                expiresAt: session.expires_at
              });
            }
          }
          break;

        case 'TOKEN_REFRESHED':
          logger.debug('Session token refreshed', {
            expiresAt: session?.expires_at
          });
          break;
      }
    });
  } catch (error) {
    logger.error('Auth initialization failed:', error);
    useAuthStore.getState().reset();
  }
};