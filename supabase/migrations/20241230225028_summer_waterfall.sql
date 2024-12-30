-- Drop existing policies
DROP POLICY IF EXISTS "Users can read own draws" ON public.draws;
DROP POLICY IF EXISTS "Users can create draws" ON public.draws;
DROP POLICY IF EXISTS "Users can update own draws" ON public.draws;
DROP POLICY IF EXISTS "Users can delete own draws" ON public.draws;

-- Enable RLS
ALTER TABLE public.draws ENABLE ROW LEVEL SECURITY;

-- Create more permissive policies for authenticated users
CREATE POLICY "Users can read own draws"
ON public.draws FOR SELECT
USING (
  auth.role() = 'authenticated' AND 
  auth.uid() = user_id
);

CREATE POLICY "Users can create draws"
ON public.draws FOR INSERT
WITH CHECK (
  auth.role() = 'authenticated' AND 
  auth.uid() = user_id
);

CREATE POLICY "Users can update own draws"
ON public.draws FOR UPDATE
USING (
  auth.role() = 'authenticated' AND 
  auth.uid() = user_id
);

CREATE POLICY "Users can delete own draws"
ON public.draws FOR DELETE
USING (
  auth.role() = 'authenticated' AND 
  auth.uid() = user_id
);