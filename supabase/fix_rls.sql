-- 1. QUERY TO FIND ALL TABLES IN THE PUBLIC SCHEMA WITH RLS DISABLED:
-- Run this in the Supabase SQL Editor to check which tables are currently vulnerable.
-- Any table returning 'false' under rowsecurity needs RLS enabled.
--
-- SELECT tablename, rowsecurity FROM pg_tables WHERE schemaname = 'public';

-- 2. ENABLE ROW LEVEL SECURITY (RLS) ON ALL TABLES DEFINED IN THE PROJECT:
-- Run these commands in the Supabase SQL Editor to enable RLS on all core tables.

ALTER TABLE IF EXISTS public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.patients ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.test_results ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.clinical_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.clinical_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.ai_insights ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.test_assignments ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.patient_medications ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS public.vitals_logs ENABLE ROW LEVEL SECURITY;

-- 3. AUTO-ENABLE RLS FOR ALL CURRENT AND FUTURE TABLES IN PUBLIC SCHEMA (OPTIONAL DYNAMIC SCRIPT):
-- If you have other tables created manually or not listed above, run this block:
/*
DO $$
DECLARE
    r RECORD;
BEGIN
    FOR r IN 
        SELECT tablename 
        FROM pg_tables 
        WHERE schemaname = 'public'
    LOOP
        EXECUTE 'ALTER TABLE public.' || quote_ident(r.tablename) || ' ENABLE ROW LEVEL SECURITY;';
    END LOOP;
END $$;
*/
