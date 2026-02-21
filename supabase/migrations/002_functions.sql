-- ============================================
-- CUSTOM FUNCTIONS
-- ============================================

-- Function to increment link clicks atomically
CREATE OR REPLACE FUNCTION increment_link_clicks(link_id UUID)
RETURNS void AS $$
BEGIN
  UPDATE links
  SET clicks = clicks + 1
  WHERE id = link_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to get analytics summary for a profile
CREATE OR REPLACE FUNCTION get_analytics_summary(profile_id_param UUID, days_param INTEGER DEFAULT 30)
RETURNS TABLE(
  total_views BIGINT,
  total_clicks BIGINT,
  unique_visitors BIGINT,
  top_links JSONB,
  views_by_date JSONB
) AS $$
DECLARE
  start_date TIMESTAMP WITH TIME ZONE;
BEGIN
  start_date := NOW() - (days_param || ' days')::INTERVAL;

  -- Get total views
  SELECT COUNT(*) INTO total_views
  FROM page_views
  WHERE profile_id = profile_id_param
    AND viewed_at >= start_date;

  -- Get total clicks
  SELECT COUNT(*) INTO total_clicks
  FROM clicks
  WHERE profile_id = profile_id_param
    AND clicked_at >= start_date;

  -- Get approximate unique visitors (based on user agent + IP would be better)
  SELECT COUNT(DISTINCT user_agent) INTO unique_visitors
  FROM page_views
  WHERE profile_id = profile_id_param
    AND viewed_at >= start_date;

  -- Get top 5 links by clicks
  SELECT json_agg(row_to_json(t))::jsonb INTO top_links
  FROM (
    SELECT l.id, l.title, COUNT(c.id) as click_count
    FROM links l
    LEFT JOIN clicks c ON l.id = c.link_id
    WHERE l.profile_id = profile_id_param
      AND c.clicked_at >= start_date
    GROUP BY l.id, l.title
    ORDER BY click_count DESC
    LIMIT 5
  ) t;

  -- Get views by date
  SELECT json_agg(row_to_json(t))::jsonb INTO views_by_date
  FROM (
    SELECT DATE(viewed_at) as date, COUNT(*) as count
    FROM page_views
    WHERE profile_id = profile_id_param
      AND viewed_at >= start_date
    GROUP BY DATE(viewed_at)
    ORDER BY date ASC
  ) t;

  RETURN QUERY SELECT 
    total_views,
    total_clicks,
    unique_visitors,
    COALESCE(top_links, '[]'::jsonb),
    COALESCE(views_by_date, '[]'::jsonb);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to check if username is available
CREATE OR REPLACE FUNCTION is_username_available(username_param TEXT)
RETURNS BOOLEAN AS $$
BEGIN
  RETURN NOT EXISTS (
    SELECT 1 FROM profiles WHERE username = username_param
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to get profile stats
CREATE OR REPLACE FUNCTION get_profile_stats(profile_id_param UUID)
RETURNS TABLE(
  total_links INTEGER,
  total_products INTEGER,
  total_views BIGINT,
  total_clicks BIGINT,
  plan TEXT
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    (SELECT COUNT(*)::INTEGER FROM links WHERE profile_id = profile_id_param AND is_active = true) as total_links,
    (SELECT COUNT(*)::INTEGER FROM products WHERE profile_id = profile_id_param AND is_active = true) as total_products,
    (SELECT COUNT(*) FROM page_views WHERE profile_id = profile_id_param) as total_views,
    (SELECT COUNT(*) FROM clicks WHERE profile_id = profile_id_param) as total_clicks,
    (SELECT plan FROM profiles WHERE id = profile_id_param) as plan;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to clean up old analytics data (run periodically)
CREATE OR REPLACE FUNCTION cleanup_old_analytics(days_to_keep INTEGER DEFAULT 365)
RETURNS void AS $$
DECLARE
  cutoff_date TIMESTAMP WITH TIME ZONE;
BEGIN
  cutoff_date := NOW() - (days_to_keep || ' days')::INTERVAL;
  
  DELETE FROM page_views WHERE viewed_at < cutoff_date;
  DELETE FROM clicks WHERE clicked_at < cutoff_date;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to get popular profiles (for discovery/trending)
CREATE OR REPLACE FUNCTION get_popular_profiles(limit_param INTEGER DEFAULT 10)
RETURNS TABLE(
  profile_id UUID,
  username TEXT,
  full_name TEXT,
  profile_image TEXT,
  total_views BIGINT,
  total_clicks BIGINT
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    p.id as profile_id,
    p.username,
    p.full_name,
    p.profile_image,
    COALESCE(pv.view_count, 0) as total_views,
    COALESCE(c.click_count, 0) as total_clicks
  FROM profiles p
  LEFT JOIN (
    SELECT profile_id, COUNT(*) as view_count
    FROM page_views
    WHERE viewed_at >= NOW() - INTERVAL '30 days'
    GROUP BY profile_id
  ) pv ON p.id = pv.profile_id
  LEFT JOIN (
    SELECT profile_id, COUNT(*) as click_count
    FROM clicks
    WHERE clicked_at >= NOW() - INTERVAL '30 days'
    GROUP BY profile_id
  ) c ON p.id = c.profile_id
  WHERE p.is_verified = true
  ORDER BY (COALESCE(pv.view_count, 0) + COALESCE(c.click_count, 0)) DESC
  LIMIT limit_param;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to get revenue stats (for business dashboard)
CREATE OR REPLACE FUNCTION get_revenue_stats(profile_id_param UUID)
RETURNS TABLE(
  total_template_purchases BIGINT,
  total_revenue NUMERIC,
  revenue_by_month JSONB
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    COUNT(*) as total_template_purchases,
    SUM(price_paid) as total_revenue,
    (
      SELECT json_agg(row_to_json(t))::jsonb
      FROM (
        SELECT 
          DATE_TRUNC('month', purchased_at) as month,
          COUNT(*) as purchase_count,
          SUM(price_paid) as revenue
        FROM purchased_templates
        WHERE profile_id = profile_id_param
        GROUP BY DATE_TRUNC('month', purchased_at)
        ORDER BY month DESC
        LIMIT 12
      ) t
    ) as revenue_by_month
  FROM purchased_templates
  WHERE profile_id = profile_id_param;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ============================================
-- SCHEDULED JOBS (Optional - requires pg_cron extension)
-- ============================================

-- Note: Enable pg_cron extension first in Supabase dashboard
-- CREATE EXTENSION IF NOT EXISTS pg_cron;

-- Schedule cleanup of old analytics data (runs monthly)
-- SELECT cron.schedule(
--   'cleanup-old-analytics',
--   '0 0 1 * *',
--   'SELECT cleanup_old_analytics(365);'
-- );
