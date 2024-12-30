import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error(
    'Missing Supabase environment variables. Please click the "Connect to Supabase" button in the top right to set up your Supabase project.'
  );
}

export const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    persistSession: true, // Enable session persistence
    storageKey: 'sb-auth-token', // Key for storing auth data
    storage: localStorage, // Use localStorage for persistence
    autoRefreshToken: true, // Automatically refresh the token
    detectSessionInUrl: true // Detect auth redirects
  }
});