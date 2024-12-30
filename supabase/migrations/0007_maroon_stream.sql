/*
  # Reset Authentication Data

  This migration safely cleans up all authentication and user data by:
  1. Temporarily disabling triggers
  2. Truncating all related tables in the correct order
  3. Re-enabling triggers
*/

-- Disable trigger temporarily to avoid conflicts
ALTER TABLE auth.users DISABLE TRIGGER on_auth_user_created;

-- Clear data from dependent tables first (in correct order)
TRUNCATE public.account_users CASCADE;
TRUNCATE public.social_connections CASCADE;
TRUNCATE public.draws CASCADE;
TRUNCATE public.business_accounts CASCADE;
TRUNCATE public.users CASCADE;

-- Clear auth tables
DELETE FROM auth.users CASCADE;
DELETE FROM auth.sessions;
DELETE FROM auth.refresh_tokens;
DELETE FROM auth.mfa_factors;
DELETE FROM auth.mfa_challenges;
DELETE FROM auth.mfa_amr_claims;
DELETE FROM auth.flow_state;
DELETE FROM auth.identities;
DELETE FROM auth.instances;
DELETE FROM auth.saml_providers;
DELETE FROM auth.saml_relay_states;
DELETE FROM auth.sso_providers;
DELETE FROM auth.sso_domains;

-- Clear email queue if it exists
DO $$
BEGIN
  IF EXISTS (
    SELECT FROM pg_tables 
    WHERE schemaname = 'supabase_functions' 
    AND tablename = 'hooks'
  ) THEN
    DELETE FROM supabase_functions.hooks 
    WHERE hook_table_id IN (
      SELECT id FROM supabase_functions.hooks 
      WHERE hook_name LIKE '%auth%'
    );
  END IF;
END $$;

-- Re-enable trigger
ALTER TABLE auth.users ENABLE TRIGGER on_auth_user_created;