/*
  # Clear User Generated Content
  
  This migration clears all user-generated content while preserving database structure:
  1. User activities
  2. Social connections
  3. Draws
  4. Auth sessions and related data
  5. User profiles
  
  IMPORTANT: This preserves database structure and policies
*/

-- Disable auth trigger temporarily
ALTER TABLE auth.users DISABLE TRIGGER on_auth_user_created;

-- Clear data from dependent tables first (in correct order)
TRUNCATE public.user_activities CASCADE;
TRUNCATE public.social_connections CASCADE;
TRUNCATE public.draws CASCADE;
TRUNCATE public.users CASCADE;

-- Clear auth tables
DELETE FROM auth.sessions;
DELETE FROM auth.refresh_tokens;
DELETE FROM auth.mfa_factors;
DELETE FROM auth.mfa_challenges;
DELETE FROM auth.mfa_amr_claims;
DELETE FROM auth.flow_state;
DELETE FROM auth.identities;
DELETE FROM auth.users CASCADE;

-- Re-enable auth trigger
ALTER TABLE auth.users ENABLE TRIGGER on_auth_user_created;