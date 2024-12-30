/*
  # Clear existing users
  
  1. Changes
    - Removes all existing users from auth.users and public.users
    - Preserves table structure and policies
    
  2. Notes
    - This is a one-time cleanup migration
    - All existing user data will be removed
*/

-- Drop the trigger temporarily to avoid conflicts
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;

-- Clear existing data
TRUNCATE auth.users CASCADE;

-- Recreate the trigger
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();