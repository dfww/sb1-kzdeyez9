/*
  # Add User Activities Table

  1. New Tables
    - `user_activities`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references users.id)
      - `type` (text, activity type)
      - `details` (text, optional additional information)
      - `created_at` (timestamptz)

  2. Security
    - Enable RLS on `user_activities` table
    - Add policy for users to read their own activities
    - Add policy for system to create activities
*/

-- Create user activities table
CREATE TABLE IF NOT EXISTS public.user_activities (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.users(id),
  type TEXT NOT NULL CHECK (type IN ('facebook_connect', 'facebook_disconnect', 'account_linked', 'account_unlinked')),
  details TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.user_activities ENABLE ROW LEVEL SECURITY;

-- Users can read their own activities
CREATE POLICY "Users can read own activities"
  ON public.user_activities
  FOR SELECT
  USING (auth.uid() = user_id);

-- System can create activities
CREATE POLICY "System can create activities"
  ON public.user_activities
  FOR INSERT
  WITH CHECK (
    -- Allow creation by authenticated users for their own activities
    auth.uid() = user_id
    OR
    -- Allow creation by service role
    current_setting('role') = 'service_role'
  );

-- Create trigger function to log social connection activities
CREATE OR REPLACE FUNCTION public.handle_social_connection_change()
RETURNS TRIGGER
SECURITY DEFINER
SET search_path = public
LANGUAGE plpgsql
AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    -- New connection added
    INSERT INTO public.user_activities (user_id, type, details)
    VALUES (
      NEW.user_id,
      CASE NEW.platform
        WHEN 'facebook' THEN 'facebook_connect'
        ELSE NEW.platform || '_connect'
      END,
      'Connected ' || NEW.platform || ' account'
    );
    RETURN NEW;
  ELSIF TG_OP = 'DELETE' THEN
    -- Connection removed
    INSERT INTO public.user_activities (user_id, type, details)
    VALUES (
      OLD.user_id,
      CASE OLD.platform
        WHEN 'facebook' THEN 'facebook_disconnect'
        ELSE OLD.platform || '_disconnect'
      END,
      'Disconnected ' || OLD.platform || ' account'
    );
    RETURN OLD;
  END IF;
  RETURN NULL;
END;
$$;

-- Create triggers for social connections
CREATE TRIGGER on_social_connection_added
  AFTER INSERT ON public.social_connections
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_social_connection_change();

CREATE TRIGGER on_social_connection_removed
  AFTER DELETE ON public.social_connections
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_social_connection_change();