/*
  # Add draw activity logging

  1. Changes
    - Add new draw activity types to user_activities table
    - Create trigger function for logging draw activities
    - Add trigger for draw status changes

  2. Security
    - Maintains existing RLS policies
    - System-level trigger runs with elevated permissions
*/

-- Add new activity types for draws
ALTER TABLE public.user_activities
DROP CONSTRAINT IF EXISTS user_activities_type_check;

ALTER TABLE public.user_activities
ADD CONSTRAINT user_activities_type_check
CHECK (type IN (
  'facebook_connect',
  'facebook_disconnect',
  'account_linked',
  'account_unlinked',
  'draw_completed',
  'draw_failed',
  'draw_scheduled'
));

-- Create trigger function for logging draw activities
CREATE OR REPLACE FUNCTION public.handle_draw_activity()
RETURNS TRIGGER
SECURITY DEFINER
SET search_path = public
LANGUAGE plpgsql
AS $$
DECLARE
  activity_type text;
  activity_details text;
BEGIN
  -- Only handle status changes
  IF (TG_OP = 'UPDATE' AND OLD.status != NEW.status) THEN
    -- Determine activity type based on new status
    activity_type := CASE NEW.status
      WHEN 'completed' THEN 'draw_completed'
      WHEN 'failed' THEN 'draw_failed'
      WHEN 'scheduled' THEN 'draw_scheduled'
      ELSE NULL
    END;

    -- Only proceed if we have a valid activity type
    IF activity_type IS NOT NULL THEN
      -- Create activity details as JSON
      activity_details := json_build_object(
        'draw_id', NEW.id,
        'draw_name', NEW.name,
        'platform', NEW.platform,
        'page_name', NEW.page_name,
        'winner_count', CASE 
          WHEN NEW.winners IS NOT NULL 
          THEN jsonb_array_length(NEW.winners)
          ELSE 0
        END
      )::text;

      -- Insert activity record
      INSERT INTO public.user_activities (
        user_id,
        type,
        details
      ) VALUES (
        NEW.user_id,
        activity_type,
        activity_details
      );
    END IF;
  END IF;

  RETURN NEW;
END;
$$;

-- Create trigger for draw status changes
DROP TRIGGER IF EXISTS on_draw_status_change ON public.draws;

CREATE TRIGGER on_draw_status_change
  AFTER UPDATE ON public.draws
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_draw_activity();