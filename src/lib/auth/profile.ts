import { supabase } from '../supabase';
import { logger } from '../utils/logger';
import type { User } from '../../types/auth';

export const getUserProfile = async (userId: string): Promise<User | null> => {
  try {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', userId)
      .maybeSingle();
    
    if (error) throw error;
    return data;
  } catch (error) {
    logger.error('Failed to fetch user profile', error);
    return null;
  }
};

export const createUserProfile = async (userId: string): Promise<User> => {
  try {
    const { data, error } = await supabase
      .from('users')
      .insert([{
        id: userId,
        role: 'user',
        subscription_type: 'free',
        is_active: true
      }])
      .select()
      .single();

    if (error) throw error;
    if (!data) throw new Error('Failed to create user profile');
    
    return data;
  } catch (error) {
    logger.error('Failed to create user profile', error);
    throw error;
  }
};