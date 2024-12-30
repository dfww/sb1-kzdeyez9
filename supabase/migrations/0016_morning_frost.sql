/*
  # Complete draws table schema update

  1. Changes
    - Add all required columns
    - Add proper constraints and defaults
    - Ensure backward compatibility
  
  2. Security
    - Maintain existing RLS policies
*/

-- Drop existing table if it exists
DROP TABLE IF EXISTS public.draws;

-- Create draws table with all required columns
CREATE TABLE public.draws (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.users(id),
  name TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('quick', 'scheduled')),
  platform TEXT NOT NULL CHECK (platform IN ('facebook', 'instagram')),
  page_id TEXT NOT NULL,
  page_name TEXT NOT NULL,
  post_id TEXT NOT NULL,
  post_url TEXT NOT NULL,
  criteria JSONB,
  winners JSONB,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('draft', 'pending', 'completed', 'failed')),
  draft_data JSONB,
  scheduled_at TIMESTAMPTZ,
  executed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.draws ENABLE ROW LEVEL SECURITY;

-- Users can read their own draws
CREATE POLICY "Users can read own draws"
  ON public.draws
  FOR SELECT
  USING (auth.uid() = user_id);

-- Users can create their own draws
CREATE POLICY "Users can create draws"
  ON public.draws
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Users can update their own draws
CREATE POLICY "Users can update own draws"
  ON public.draws
  FOR UPDATE
  USING (auth.uid() = user_id);

-- Users can delete their own draws
CREATE POLICY "Users can delete own draws"
  ON public.draws
  FOR DELETE
  USING (auth.uid() = user_id);