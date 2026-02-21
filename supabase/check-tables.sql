-- ============================================
-- QUICK SETUP - Run this if tables don't exist
-- ============================================

-- Check existing tables
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public' AND table_name != 'kv_store_730fc62a'
ORDER BY table_name;

-- If you see 0 rows (no tables except kv_store), you need to:
-- 1. Copy and run /supabase/migrations/001_initial_schema.sql
-- 2. Copy and run /supabase/migrations/002_functions.sql

-- After running migrations, run this again to verify:
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public'
ORDER BY table_name;

-- You should see these 10 tables:
-- 1. clicks
-- 2. custom_domains
-- 3. integrations
-- 4. kv_store_730fc62a
-- 5. links
-- 6. notifications
-- 7. page_views
-- 8. products
-- 9. profiles
-- 10. purchased_templates
