import { create } from 'zustand';
import type { User } from '../types/auth';
import type { AuthVerificationState } from '../lib/auth/types';
import { signInWithEmail, signUpWithEmail } from '../lib/auth/authService';
import { getInitialVerificationState } from '../lib/auth/verification';
import { supabase } from '../lib/supabase';
import { logger } from '../lib/utils/logger';

interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
  verification: AuthVerificationState;
  setUser: (user: User | null) => void;
  setVerification: (state: Partial<AuthVerificationState>) => void;
  signIn: (email: string, password: string, rememberMe?: boolean) => Promise<void>;
  signUp: (email: string, password: string, rememberMe?: boolean) => Promise<void>;
  signOut: () => Promise<void>;
  clearError: () => void;
  reset: () => void;
}

const initialState = {
  user: null,
  loading: false,
  error: null,
  verification: getInitialVerificationState(),
};

export const useAuthStore = create<AuthState>((set) => ({
  ...initialState,
  
  setUser: (user) => {
    set({ user });
    logger.debug('User state updated', { userId: user?.id });
  },
  
  setVerification: (state) => set((prev) => ({ 
    verification: { ...prev.verification, ...state } 
  })),
  
  clearError: () => set({ error: null }),
  
  reset: () => {
    set(initialState);
    logger.debug('Auth state reset');
  },
  
  signIn: async (email, password) => {
    try {
      set({ loading: true, error: null });
      const userData = await signInWithEmail(email, password);
      set({ user: userData, loading: false });
      logger.debug('Sign in successful', { userId: userData.id });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An error occurred';
      set({ error: errorMessage, loading: false });
      throw error;
    }
  },
  
  signUp: async (email, password) => {
    try {
      set({ loading: true, error: null });
      await signUpWithEmail(email, password);
      set({ 
        loading: false,
        verification: {
          isVerified: false,
          isPending: true,
          email
        }
      });
      logger.debug('Sign up successful, verification pending');
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An error occurred';
      set({ error: errorMessage, loading: false });
      throw error;
    }
  },
  
  signOut: async () => {
    try {
      await supabase.auth.signOut();
      set(initialState);
      logger.debug('Sign out successful');
    } catch (error) {
      logger.error('Sign out failed', error);
      set(initialState);
    }
  },
}));