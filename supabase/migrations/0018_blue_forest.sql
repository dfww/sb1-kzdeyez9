/*
  # Fix activity logging for draws

  1. Changes
    - Fix syntax error in draw activity trigger function
    - Ensure proper activity logging for draw status changes

  2. Details
    - Removes problematic WHERE clause
    - Improves error handling
    - Adds better activity details formatting
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
BEGIN
  -- Only handle status changes
  IF (TG_OP = 'UPDATE' AND OLD.status != NEW.status) THEN
    -- Only log specific status changes
    IF NEW.status IN ('completed', 'failed', 'scheduled') THEN
      INSERT INTO public.user_activities (
        user_id,
        type,
        details
      )
      VALUES (
        NEW.user_id,
        CASE NEW.status
          WHEN 'completed' THEN 'draw_completed'
          WHEN 'failed' THEN 'draw_failed'
          WHEN 'scheduled' THEN 'draw_scheduled'
        END,
        json_build_object(
          'draw_id', NEW.id,
          'draw_name', NEW.name,
          'platform', NEW.platform,
          'page_name', NEW.page_name,
          'winner_count', CASE 
            WHEN NEW.winners IS NOT NULL 
            THEN jsonb_array_length(NEW.winners)
            ELSE 0
          END
        )::text
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