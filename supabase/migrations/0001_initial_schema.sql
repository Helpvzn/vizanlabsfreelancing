-- VizanLabs Phase 1: Core schema
-- Run in Supabase SQL Editor or via: supabase db push

-- Profiles (extends auth.users)
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('client', 'freelancer', 'admin')),
  first_name TEXT,
  last_name TEXT,
  username TEXT UNIQUE,
  avatar_url TEXT,
  bio TEXT,
  phone TEXT,
  location TEXT,
  country TEXT,
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'suspended', 'pending_verification')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_profiles_email ON public.profiles(email);
CREATE INDEX IF NOT EXISTS idx_profiles_username ON public.profiles(username);
CREATE INDEX IF NOT EXISTS idx_profiles_role ON public.profiles(role);

-- Categories (seeded in Phase 2, table created now)
CREATE TABLE IF NOT EXISTS public.categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL UNIQUE,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  icon TEXT,
  status TEXT NOT NULL DEFAULT 'active',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Auto-create profile on signup (role from metadata — fixed at signup)
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  user_role TEXT;
BEGIN
  user_role := COALESCE(NEW.raw_user_meta_data->>'role', 'client');

  IF user_role NOT IN ('client', 'freelancer') THEN
    user_role := 'client';
  END IF;

  INSERT INTO public.profiles (id, email, role, first_name, last_name, username)
  VALUES (
    NEW.id,
    NEW.email,
    user_role,
    NEW.raw_user_meta_data->>'first_name',
    NEW.raw_user_meta_data->>'last_name',
    NEW.raw_user_meta_data->>'username'
  );

  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Prevent role changes after signup
CREATE OR REPLACE FUNCTION public.prevent_role_change()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
  IF OLD.role IS DISTINCT FROM NEW.role AND OLD.role IS NOT NULL THEN
    RAISE EXCEPTION 'Role cannot be changed after signup';
  END IF;
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS profiles_prevent_role_change ON public.profiles;
CREATE TRIGGER profiles_prevent_role_change
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.prevent_role_change();

-- Row Level Security
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;

-- Profiles: public read for active users, own write (except role)
CREATE POLICY "Public profiles are viewable"
  ON public.profiles FOR SELECT
  USING (status = 'active');

CREATE POLICY "Users can update own profile"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can insert own profile"
  ON public.profiles FOR INSERT
  WITH CHECK (auth.uid() = id);

-- Categories: public read
CREATE POLICY "Categories are public"
  ON public.categories FOR SELECT
  USING (status = 'active');

-- Seed categories
INSERT INTO public.categories (name, slug, description, icon) VALUES
  ('Web Development', 'web-development', 'Websites, web apps, and APIs', 'globe'),
  ('Mobile Development', 'mobile-development', 'iOS, Android, and cross-platform apps', 'smartphone'),
  ('Design', 'design', 'UI/UX, graphics, and branding', 'palette'),
  ('Writing', 'writing', 'Content, copywriting, and blogs', 'pen-tool'),
  ('Marketing', 'marketing', 'Digital marketing and social media', 'megaphone'),
  ('SEO', 'seo', 'Search engine optimization', 'search'),
  ('Video Editing', 'video-editing', 'Video production and editing', 'video'),
  ('Data Entry', 'data-entry', 'Data processing and admin tasks', 'database'),
  ('AI Services', 'ai-services', 'AI integration and automation', 'cpu'),
  ('Business', 'business', 'Consulting and business services', 'briefcase'),
  ('Translation', 'translation', 'Language translation services', 'languages'),
  ('Virtual Assistance', 'virtual-assistance', 'Remote admin and support', 'headphones')
ON CONFLICT (slug) DO NOTHING;
