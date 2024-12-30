/*
  # Fix Draws Table RLS Policies

  1. Changes
    - Drop existing RLS policies
    - Add new comprehensive RLS policies for all operations
    - Ensure proper user_id checks
  
  2. Security
    - Enable RLS
    - Add policies for SELECT, INSERT, UPDATE, DELETE
    - Restrict access to user's own draws
*/

-- Drop existing policies
DROP POLICY IF EXISTS "Users can read own draws" ON public.draws;
DROP POLICY IF EXISTS "Users can create draws" ON public.draws;
DROP POLICY IF EXISTS "Users can update own draws" ON public.draws;
DROP POLICY IF EXISTS "Users can delete own draws" ON public.draws;

-- Enable RLS
ALTER TABLE public.draws ENABLE ROW LEVEL SECURITY;

-- Create new policies
CREATE POLICY "Users can read own draws"
ON public.draws FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can create draws"
ON public.draws FOR INSERT
WITH CHECK (
  auth.uid() = user_id
);

CREATE POLICY "Users can update own draws"
ON public.draws FOR UPDATE
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own draws"
ON public.draws FOR DELETE
USING (auth.uid() = user_id);