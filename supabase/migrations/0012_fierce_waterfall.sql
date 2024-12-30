/*
  # Add user info to social connections

  1. Changes
    - Add columns for connected user info to social_connections table
      - `connected_user_name` (text)
      - `connected_user_id` (text)
      - `connected_user_email` (text)

  2. Security
    - Maintain existing RLS policies
*/

ALTER TABLE public.social_connections
ADD COLUMN IF NOT EXISTS connected_user_name TEXT,
ADD COLUMN IF NOT EXISTS connected_user_id TEXT,
ADD COLUMN IF NOT EXISTS connected_user_email TEXT;