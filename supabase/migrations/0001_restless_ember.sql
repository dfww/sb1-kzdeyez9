/*
  # Initial Schema Setup

  1. Tables
    - users
      - Custom user data and preferences
    - business_accounts
      - Business account information
    - account_users
      - Mapping between users and business accounts
    - social_connections
      - Social media platform connections
    - draws
      - Draw history and scheduled draws

  2. Security
    - Enable RLS on all tables
    - Add policies for data access
*/

-- Users table extension (extends auth.users)
CREATE TABLE public.users (
  id UUID PRIMARY KEY REFERENCES auth.users(id),
  role TEXT NOT NULL DEFAULT 'user' CHECK (role IN ('admin', 'user')),
  subscription_type TEXT NOT NULL DEFAULT 'free' CHECK (subscription_type IN ('free', 'agent', 'studio')),
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Business accounts
CREATE TABLE public.business_accounts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  owner_id UUID NOT NULL REFERENCES public.users(id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Account users (many-to-many relationship)
CREATE TABLE public.account_users (
  business_account_id UUID REFERENCES public.business_accounts(id),
  user_id UUID REFERENCES public.users(id),
  role TEXT NOT NULL CHECK (role IN ('admin', 'user')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  PRIMARY KEY (business_account_id, user_id)
);

-- Social media connections
CREATE TABLE public.social_connections (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.users(id),
  platform TEXT NOT NULL CHECK (platform IN ('facebook', 'instagram')),
  access_token TEXT NOT NULL,
  refresh_token TEXT,
  expires_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Draws
CREATE TABLE public.draws (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.users(id),
  business_account_id UUID REFERENCES public.business_accounts(id),
  platform TEXT NOT NULL CHECK (platform IN ('facebook', 'instagram')),
  post_id TEXT NOT NULL,
  winner_comment_id TEXT,
  filters JSONB,
  scheduled_at TIMESTAMPTZ,
  executed_at TIMESTAMPTZ,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'completed', 'failed')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.business_accounts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.account_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.social_connections ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.draws ENABLE ROW LEVEL SECURITY;

-- RLS Policies

-- Users can read their own data
CREATE POLICY "Users can read own data" ON public.users
  FOR SELECT USING (auth.uid() = id);

-- Business account owners can manage their accounts
CREATE POLICY "Owners can manage business accounts" ON public.business_accounts
  FOR ALL USING (auth.uid() = owner_id);

-- Users can read business accounts they belong to
CREATE POLICY "Users can read associated business accounts" ON public.business_accounts
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.account_users
      WHERE business_account_id = id
      AND user_id = auth.uid()
    )
  );

-- Users can manage their social connections
CREATE POLICY "Users can manage their social connections" ON public.social_connections
  FOR ALL USING (auth.uid() = user_id);

-- Users can manage their draws
CREATE POLICY "Users can manage their draws" ON public.draws
  FOR ALL USING (auth.uid() = user_id);

-- Account users can read draws for their business accounts
CREATE POLICY "Account users can read business draws" ON public.draws
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.account_users
      WHERE business_account_id = draws.business_account_id
      AND user_id = auth.uid()
    )
  );