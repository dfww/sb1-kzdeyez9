/*
  # Update draws table schema

  1. Changes
    - Add criteria and winners columns as JSONB
    - Add proper constraints and defaults
    - Update existing data
  
  2. Security
    - Maintain existing RLS policies
*/

-- Drop existing table constraints
ALTER TABLE public.draws 
DROP CONSTRAINT IF EXISTS draws_status_check;

-- Update status enum to include all states
ALTER TABLE public.draws
ADD CONSTRAINT draws_status_check 
CHECK (status IN ('draft', 'pending', 'completed', 'failed'));

-- Add criteria and winners columns
ALTER TABLE public.draws
ADD COLUMN IF NOT EXISTS criteria JSONB,
ADD COLUMN IF NOT EXISTS winners JSONB;

-- Add validation check for criteria structure
ALTER TABLE public.draws
ADD CONSTRAINT draws_criteria_check
CHECK (
  (status = 'draft') OR -- Allow null criteria for drafts
  (criteria IS NULL) OR -- Allow null for backwards compatibility
  (
    criteria ? 'requireLike' AND
    criteria ? 'requireComment' AND
    criteria ? 'requireFollow' AND
    criteria ? 'winnerCount'
  )
);

-- Add validation check for winners structure
ALTER TABLE public.draws
ADD CONSTRAINT draws_winners_check
CHECK (
  (status IN ('draft', 'pending')) OR -- Allow null winners for drafts and pending
  (winners IS NULL) OR -- Allow null for backwards compatibility
  (
    jsonb_typeof(winners) = 'array' AND
    (
      jsonb_array_length(winners) = 0 OR
      (
        winners @> '[{"id": "", "name": "", "comment": ""}]'::jsonb
      )
    )
  )
);