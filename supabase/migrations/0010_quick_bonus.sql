-- Disable triggers temporarily to avoid conflicts
ALTER TABLE auth.users DISABLE TRIGGER on_auth_user_created;

-- Clear data from dependent tables first (in correct order)
TRUNCATE public.user_activities CASCADE;
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

-- Re-enable trigger
ALTER TABLE auth.users ENABLE TRIGGER on_auth_user_created;