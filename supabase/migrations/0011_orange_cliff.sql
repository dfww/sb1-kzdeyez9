/*
  # Create draws table

  1. New Tables
    - `draws`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references users)
      - `name` (text)
      - `type` (text: 'quick' or 'scheduled')
      - `platform` (text: 'facebook' or 'instagram')
      - `page_id` (text)
      - `page_name` (text)
      - `post_id` (text)
      - `post_url` (text)
      - `criteria` (jsonb)
      - `winners` (jsonb)
      - `status` (text: 'pending', 'completed', or 'failed')
      - `scheduled_at` (timestamptz, optional)
      - `executed_at` (timestamptz, optional)
      - `created_at` (timestamptz)

  2. Security
    - Enable RLS
    - Add policies for user access
*/

CREATE TABLE IF NOT EXISTS public.draws (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.users(id),
  name TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('quick', 'scheduled')),
  platform TEXT NOT NULL CHECK (platform IN ('facebook', 'instagram')),
  page_id TEXT NOT NULL,
  page_name TEXT NOT NULL,
  post_id TEXT NOT NULL,
  post_url TEXT NOT NULL,
  criteria JSONB NOT NULL,
  winners JSONB,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'completed', 'failed')),
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