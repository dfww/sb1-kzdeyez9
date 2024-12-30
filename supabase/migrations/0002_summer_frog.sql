/*
  # Add trigger for automatic user creation

  1. Changes
    - Creates a trigger function to handle new user registration
    - Adds trigger to auth.users table to automatically create public.users records
    - Ensures user data consistency between auth and public schemas

  2. Security
    - Maintains existing RLS policies
    - Only triggers on INSERT to auth.users
*/

-- Create the trigger function
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.users (id, role, subscription_type)
  VALUES (
    NEW.id,
    'user',
    'free'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create the trigger
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();