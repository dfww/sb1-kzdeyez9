import { supabase } from '../supabase';
import { AUTH_CONFIG } from './config';
import { logger } from '../utils/logger';
import type { AuthVerificationState } from './types';

export const checkEmailVerification = async (userId: string): Promise<boolean> => {
  try {
    const { data: { user }, error } = await supabase.auth.getUser(userId);
    if (error) throw error;
    return user?.email_confirmed_at != null;
  } catch (error) {
    logger.error('Failed to check email verification', error);
    return false;
  }
};

export const getInitialVerificationState = (): AuthVerificationState => ({
  isVerified: false,
  isPending: false,
});

export const resendVerificationEmail = async (email: string): Promise<void> => {
  try {
    const { error } = await supabase.auth.resend({
      type: 'signup',
      email,
      options: {
        emailRedirectTo: AUTH_CONFIG.VERIFICATION.REDIRECT_URL,
      },
    });
    if (error) throw error;
  } catch (error) {
    logger.error('Failed to resend verification email', error);
    throw error;
  }
};