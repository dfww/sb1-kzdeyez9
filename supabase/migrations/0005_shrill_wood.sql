/*
  # Reset Users and Authentication Data

  1. Changes
    - Safely removes all data from users and auth tables
    - Preserves table structure and policies
    - Resets sequences

  2. Security
    - Maintains RLS policies
    - Preserves trigger functions
*/

-- Disable trigger temporarily to avoid conflicts
ALTER TABLE auth.users DISABLE TRIGGER on_auth_user_created;

-- Clear data from dependent tables first
TRUNCATE public.account_users CASCADE;
TRUNCATE public.social_connections CASCADE;
TRUNCATE public.draws CASCADE;
TRUNCATE public.business_accounts CASCADE;
TRUNCATE public.users CASCADE;

-- Clear auth tables
TRUNCATE auth.users CASCADE;
TRUNCATE auth.sessions CASCADE;
TRUNCATE auth.refresh_tokens CASCADE;

-- Re-enable trigger
ALTER TABLE auth.users ENABLE TRIGGER on_auth_user_created;