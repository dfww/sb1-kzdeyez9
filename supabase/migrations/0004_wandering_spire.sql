/*
  # Fix user creation trigger

  1. Changes
    - Drop existing trigger
    - Create improved trigger function with better error handling
    - Add trigger for both INSERT and UPDATE events
    - Add proper error logging
  
  2. Security
    - Maintain RLS policies
    - Use SECURITY DEFINER for elevated privileges
*/

-- Drop existing trigger and function
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
DROP FUNCTION IF EXISTS public.handle_new_user();

-- Create improved trigger function
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
SECURITY DEFINER
SET search_path = public
LANGUAGE plpgsql
AS $$
DECLARE
  profile_exists boolean;
BEGIN
  -- Check if profile already exists
  SELECT EXISTS (
    SELECT 1 FROM public.users WHERE id = NEW.id
  ) INTO profile_exists;

  -- Only create profile if it doesn't exist
  IF NOT profile_exists THEN
    INSERT INTO public.users (
      id,
      role,
      subscription_type,
      is_active,
      created_at,
      updated_at
    )
    VALUES (
      NEW.id,
      COALESCE(NEW.raw_user_meta_data->>'role', 'user'),
      COALESCE(NEW.raw_user_meta_data->>'subscription_type', 'free'),
      true,
      NOW(),
      NOW()
    );
  END IF;

  RETURN NEW;
EXCEPTION
  WHEN OTHERS THEN
    -- Log error details to PostgreSQL logs
    RAISE LOG 'Error in handle_new_user(): %', SQLERRM;
    RETURN NEW;
END;
$$;

-- Create new trigger for both INSERT and UPDATE
CREATE TRIGGER on_auth_user_created
  AFTER INSERT OR UPDATE ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();