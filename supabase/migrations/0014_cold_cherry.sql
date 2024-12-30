/*
  # Add draft status to draws

  1. Changes
    - Add draft status to draws table
    - Add draft_data column for storing incomplete draw data
    - Update status enum to include 'draft'
  
  2. Security
    - Maintain existing RLS policies
*/

-- Add draft status to status enum
ALTER TABLE public.draws 
DROP CONSTRAINT IF EXISTS draws_status_check;

ALTER TABLE public.draws
ADD CONSTRAINT draws_status_check 
CHECK (status IN ('draft', 'pending', 'completed', 'failed'));

-- Add draft_data column for storing incomplete draw data
ALTER TABLE public.draws
ADD COLUMN IF NOT EXISTS draft_data JSONB;