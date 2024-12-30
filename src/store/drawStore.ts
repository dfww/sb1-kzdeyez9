import { create } from 'zustand';
import { supabase } from '../lib/supabase';
import type { Draw, DrawDraft } from '../types/draw';
import { logger } from '../lib/utils/logger';

interface DrawState {
  draws: Draw[];
  isLoading: boolean;
  error: string | null;
  fetchDraws: () => Promise<void>;
  saveDraw: (draw: Omit<Draw, 'id' | 'user_id' | 'created_at'>) => Promise<Draw>;
  saveDraft: (draft: DrawDraft) => Promise<Draw>;
  updateDraft: (id: string, draft: Partial<DrawDraft>) => Promise<void>;
  deleteDraft: (id: string) => Promise<void>;
}

export const useDrawStore = create<DrawState>((set, get) => ({
  draws: [],
  isLoading: false,
  error: null,

  fetchDraws: async () => {
    try {
      set({ isLoading: true, error: null });
      
      const { data, error } = await supabase
        .from('draws')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      
      set({ draws: data || [] });
    } catch (error) {
      logger.error('Failed to fetch draws:', error);
      set({ error: 'Failed to load draws' });
    } finally {
      set({ isLoading: false });
    }
  },

  saveDraw: async (draw) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('User not authenticated');

      const { data, error } = await supabase
        .from('draws')
        .insert([{
          ...draw,
          user_id: user.id
        }])
        .select()
        .single();

      if (error) throw error;
      if (!data) throw new Error('No data returned from insert');

      // Update local state
      set(state => ({
        draws: [data, ...state.draws]
      }));

      return data;
    } catch (error) {
      logger.error('Failed to save draw:', error);
      throw new Error('Failed to save draw');
    }
  },

  saveDraft: async (draft) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('User not authenticated');

      const { data, error } = await supabase
        .from('draws')
        .insert([{
          user_id: user.id,
          status: 'draft',
          type: 'quick',
          draft_data: draft
        }])
        .select()
        .single();

      if (error) throw error;
      if (!data) throw new Error('No data returned from insert');

      // Update local state
      set(state => ({
        draws: [data, ...state.draws]
      }));

      return data;
    } catch (error) {
      logger.error('Failed to save draft:', error);
      throw new Error('Failed to save draft');
    }
  },

  updateDraft: async (id, draft) => {
    try {
      const { error } = await supabase
        .from('draws')
        .update({
          draft_data: draft
        })
        .eq('id', id)
        .eq('status', 'draft');

      if (error) throw error;

      // Update local state
      set(state => ({
        draws: state.draws.map(draw => 
          draw.id === id 
            ? { ...draw, draft_data: { ...draw.draft_data, ...draft } }
            : draw
        )
      }));
    } catch (error) {
      logger.error('Failed to update draft:', error);
      throw new Error('Failed to update draft');
    }
  },

  deleteDraft: async (id) => {
    try {
      const { error } = await supabase
        .from('draws')
        .delete()
        .eq('id', id)
        .eq('status', 'draft');

      if (error) throw error;

      // Update local state
      set(state => ({
        draws: state.draws.filter(draw => draw.id !== id)
      }));
    } catch (error) {
      logger.error('Failed to delete draft:', error);
      throw new Error('Failed to delete draft');
    }
  }
}));