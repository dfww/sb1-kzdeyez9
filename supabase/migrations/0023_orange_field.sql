/*
  # Remove page access token from draws table
  
  1. Changes
    - Remove page_access_token column
    - Update validation check
    
  2. Security
    - Removes sensitive token storage
    - Maintains required field validation
*/

-- Remove page_access_token column
ALTER TABLE public.draws
DROP COLUMN IF EXISTS page_access_token;

-- Update validation check without token
ALTER TABLE public.draws
DROP CONSTRAINT IF EXISTS draws_required_fields_check;

ALTER TABLE public.draws
ADD CONSTRAINT draws_required_fields_check
CHECK (
  (status = 'draft') OR
  (
    name IS NOT NULL AND
    platform IS NOT NULL AND
    page_id IS NOT NULL AND
    page_name IS NOT NULL AND
    post_id IS NOT NULL AND
    post_url IS NOT NULL
  )
);