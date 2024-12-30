/*
  # Update RLS policies for user profiles

  1. Changes
    - Add policy to allow profile creation during signup
    - Update existing policies for better security
  
  2. Security
    - Enable RLS on users table
    - Add policies for profile creation and management
*/

-- Drop existing policies
DROP POLICY IF EXISTS "Users can read own data" ON public.users;
DROP POLICY IF EXISTS "Users can update own data" ON public.users;
DROP POLICY IF EXISTS "Service role can create profiles" ON public.users;

-- Enable RLS
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;

-- Allow users to read their own data
CREATE POLICY "Users can read own data" ON public.users
  FOR SELECT USING (auth.uid() = id);

-- Allow authenticated users to update their own data
CREATE POLICY "Users can update own data" ON public.users
  FOR UPDATE USING (auth.uid() = id);

-- Allow profile creation during signup and by service role
CREATE POLICY "Allow profile creation" ON public.users
  FOR INSERT WITH CHECK (
    -- Allow creation by authenticated users for their own profile
    auth.uid() = id
    OR
    -- Allow creation by service role (using role check)
    current_setting('role') = 'service_role'
  );