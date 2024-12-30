import { AuthError } from '@supabase/supabase-js';
import { supabase } from '../supabase';
import { getAuthErrorMessage } from './errors';
import { AUTH_CONFIG } from './config';
import { createUserProfile, getUserProfile } from './profile';
import type { User } from '../../types/auth';
import { logger } from '../utils/logger';

export const signInWithEmail = async (
  email: string, 
  password: string,
  rememberMe: boolean = false
): Promise<User> => {
  try {
    const { data: authData, error } = await supabase.auth.signInWithPassword({ 
      email, 
      password,
      options: {
        // Set session expiry based on remember me choice
        expiresIn: rememberMe ? 30 * 24 * 60 * 60 : 24 * 60 * 60 // 30 days or 1 day
      }
    });
    
    if (error) throw error;
    if (!authData.user) throw new Error('No user data returned');

    const profile = await getUserProfile(authData.user.id);
    if (!profile) {
      throw new Error('User profile not found');
    }

    logger.debug('Sign in successful', { 
      userId: profile.id,
      rememberMe,
      sessionExpiry: authData.session?.expires_at
    });

    return profile;
  } catch (error) {
    logger.error('Sign in failed', error);
    throw error;
  }
};

export const signUpWithEmail = async (
  email: string, 
  password: string,
  rememberMe: boolean = false
): Promise<void> => {
  try {
    const { data: authData, error: signUpError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: AUTH_CONFIG.VERIFICATION.REDIRECT_URL,
        data: {
          role: 'user',
          subscription_type: 'free',
          remember_me: rememberMe
        }
      }
    });

    if (signUpError) throw signUpError;
    if (!authData?.user) throw new Error('Registration failed - no user data returned');

    // If email confirmation is required
    if (!authData.user.email_confirmed_at) {
      logger.debug('Email verification required', { 
        email: authData.user.email,
        rememberMe 
      });
      throw new Error('Please check your email to verify your account');
    }
  } catch (error) {
    logger.error('Sign up failed', error);
    throw error;
  }
};