-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- PROFILES TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  username TEXT UNIQUE NOT NULL,
  full_name TEXT NOT NULL,
  bio TEXT,
  profile_image TEXT,
  email TEXT,
  phone TEXT,
  whatsapp TEXT,
  location TEXT,
  theme_id TEXT DEFAULT 'default',
  custom_colors JSONB DEFAULT '{}',
  is_verified BOOLEAN DEFAULT FALSE,
  plan TEXT DEFAULT 'free' CHECK (plan IN ('free', 'pro', 'business')),
  custom_domain TEXT UNIQUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- LINKS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS links (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  profile_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  url TEXT NOT NULL,
  icon TEXT,
  is_active BOOLEAN DEFAULT TRUE,
  order_index INTEGER DEFAULT 0,
  clicks INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- PRODUCTS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS products (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  profile_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  price DECIMAL(10, 2) NOT NULL,
  currency TEXT DEFAULT 'NGN',
  image_url TEXT,
  stock_quantity INTEGER,
  is_active BOOLEAN DEFAULT TRUE,
  category TEXT,
  sku TEXT,
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- CLICKS TABLE (Analytics)
-- ============================================
CREATE TABLE IF NOT EXISTS clicks (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  link_id UUID REFERENCES links(id) ON DELETE CASCADE,
  product_id UUID REFERENCES products(id) ON DELETE CASCADE,
  profile_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  clicked_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  user_agent TEXT,
  referrer TEXT,
  country TEXT,
  city TEXT,
  device_type TEXT,
  CHECK (link_id IS NOT NULL OR product_id IS NOT NULL)
);

-- ============================================
-- PAGE VIEWS TABLE (Analytics)
-- ============================================
CREATE TABLE IF NOT EXISTS page_views (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  profile_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  viewed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  user_agent TEXT,
  referrer TEXT,
  country TEXT,
  city TEXT,
  device_type TEXT
);

-- ============================================
-- PURCHASED TEMPLATES TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS purchased_templates (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  profile_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  template_id TEXT NOT NULL,
  template_name TEXT NOT NULL,
  price_paid DECIMAL(10, 2) NOT NULL,
  purchased_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(profile_id, template_id)
);

-- ============================================
-- INTEGRATIONS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS integrations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  profile_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  service TEXT NOT NULL,
  service_data JSONB DEFAULT '{}',
  is_connected BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(profile_id, service)
);

-- ============================================
-- CUSTOM DOMAINS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS custom_domains (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  profile_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  domain TEXT UNIQUE NOT NULL,
  is_verified BOOLEAN DEFAULT FALSE,
  verification_token TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- NOTIFICATIONS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS notifications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  profile_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  type TEXT DEFAULT 'info' CHECK (type IN ('info', 'success', 'warning', 'error')),
  is_read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- INDEXES FOR PERFORMANCE
-- ============================================
CREATE INDEX idx_profiles_user_id ON profiles(user_id);
CREATE INDEX idx_profiles_username ON profiles(username);
CREATE INDEX idx_links_profile_id ON links(profile_id);
CREATE INDEX idx_links_order_index ON links(order_index);
CREATE INDEX idx_products_profile_id ON products(profile_id);
CREATE INDEX idx_products_order_index ON products(order_index);
CREATE INDEX idx_clicks_link_id ON clicks(link_id);
CREATE INDEX idx_clicks_product_id ON clicks(product_id);
CREATE INDEX idx_clicks_profile_id ON clicks(profile_id);
CREATE INDEX idx_clicks_clicked_at ON clicks(clicked_at);
CREATE INDEX idx_page_views_profile_id ON page_views(profile_id);
CREATE INDEX idx_page_views_viewed_at ON page_views(viewed_at);
CREATE INDEX idx_purchased_templates_profile_id ON purchased_templates(profile_id);
CREATE INDEX idx_integrations_profile_id ON integrations(profile_id);
CREATE INDEX idx_custom_domains_profile_id ON custom_domains(profile_id);
CREATE INDEX idx_notifications_profile_id ON notifications(profile_id);
CREATE INDEX idx_notifications_is_read ON notifications(is_read);

-- ============================================
-- FUNCTIONS
-- ============================================

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- ============================================
-- TRIGGERS
-- ============================================

-- Auto-update updated_at for profiles
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON profiles
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Auto-update updated_at for links
CREATE TRIGGER update_links_updated_at
  BEFORE UPDATE ON links
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Auto-update updated_at for products
CREATE TRIGGER update_products_updated_at
  BEFORE UPDATE ON products
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Auto-update updated_at for integrations
CREATE TRIGGER update_integrations_updated_at
  BEFORE UPDATE ON integrations
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Auto-update updated_at for custom_domains
CREATE TRIGGER update_custom_domains_updated_at
  BEFORE UPDATE ON custom_domains
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- ROW LEVEL SECURITY (RLS)
-- ============================================

-- Enable RLS on all tables
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE links ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE clicks ENABLE ROW LEVEL SECURITY;
ALTER TABLE page_views ENABLE ROW LEVEL SECURITY;
ALTER TABLE purchased_templates ENABLE ROW LEVEL SECURITY;
ALTER TABLE integrations ENABLE ROW LEVEL SECURITY;
ALTER TABLE custom_domains ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;

-- ============================================
-- RLS POLICIES - PROFILES
-- ============================================

-- Anyone can view public profiles
CREATE POLICY "Public profiles are viewable by everyone"
  ON profiles FOR SELECT
  USING (true);

-- Users can insert their own profile
CREATE POLICY "Users can insert their own profile"
  ON profiles FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Users can update their own profile
CREATE POLICY "Users can update their own profile"
  ON profiles FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Users can delete their own profile
CREATE POLICY "Users can delete their own profile"
  ON profiles FOR DELETE
  USING (auth.uid() = user_id);

-- ============================================
-- RLS POLICIES - LINKS
-- ============================================

-- Anyone can view active links
CREATE POLICY "Active links are viewable by everyone"
  ON links FOR SELECT
  USING (is_active = true OR EXISTS (
    SELECT 1 FROM profiles WHERE profiles.id = links.profile_id AND profiles.user_id = auth.uid()
  ));

-- Users can insert links for their own profile
CREATE POLICY "Users can insert their own links"
  ON links FOR INSERT
  WITH CHECK (EXISTS (
    SELECT 1 FROM profiles WHERE profiles.id = profile_id AND profiles.user_id = auth.uid()
  ));

-- Users can update their own links
CREATE POLICY "Users can update their own links"
  ON links FOR UPDATE
  USING (EXISTS (
    SELECT 1 FROM profiles WHERE profiles.id = links.profile_id AND profiles.user_id = auth.uid()
  ));

-- Users can delete their own links
CREATE POLICY "Users can delete their own links"
  ON links FOR DELETE
  USING (EXISTS (
    SELECT 1 FROM profiles WHERE profiles.id = links.profile_id AND profiles.user_id = auth.uid()
  ));

-- ============================================
-- RLS POLICIES - PRODUCTS
-- ============================================

-- Anyone can view active products
CREATE POLICY "Active products are viewable by everyone"
  ON products FOR SELECT
  USING (is_active = true OR EXISTS (
    SELECT 1 FROM profiles WHERE profiles.id = products.profile_id AND profiles.user_id = auth.uid()
  ));

-- Users can insert products for their own profile
CREATE POLICY "Users can insert their own products"
  ON products FOR INSERT
  WITH CHECK (EXISTS (
    SELECT 1 FROM profiles WHERE profiles.id = profile_id AND profiles.user_id = auth.uid()
  ));

-- Users can update their own products
CREATE POLICY "Users can update their own products"
  ON products FOR UPDATE
  USING (EXISTS (
    SELECT 1 FROM profiles WHERE profiles.id = products.profile_id AND profiles.user_id = auth.uid()
  ));

-- Users can delete their own products
CREATE POLICY "Users can delete their own products"
  ON products FOR DELETE
  USING (EXISTS (
    SELECT 1 FROM profiles WHERE profiles.id = products.profile_id AND profiles.user_id = auth.uid()
  ));

-- ============================================
-- RLS POLICIES - CLICKS
-- ============================================

-- Anyone can insert clicks (for analytics)
CREATE POLICY "Anyone can record clicks"
  ON clicks FOR INSERT
  WITH CHECK (true);

-- Users can view their own analytics
CREATE POLICY "Users can view their own click analytics"
  ON clicks FOR SELECT
  USING (EXISTS (
    SELECT 1 FROM profiles WHERE profiles.id = clicks.profile_id AND profiles.user_id = auth.uid()
  ));

-- ============================================
-- RLS POLICIES - PAGE VIEWS
-- ============================================

-- Anyone can insert page views (for analytics)
CREATE POLICY "Anyone can record page views"
  ON page_views FOR INSERT
  WITH CHECK (true);

-- Users can view their own page views
CREATE POLICY "Users can view their own page view analytics"
  ON page_views FOR SELECT
  USING (EXISTS (
    SELECT 1 FROM profiles WHERE profiles.id = page_views.profile_id AND profiles.user_id = auth.uid()
  ));

-- ============================================
-- RLS POLICIES - PURCHASED TEMPLATES
-- ============================================

-- Users can view their own purchased templates
CREATE POLICY "Users can view their own purchased templates"
  ON purchased_templates FOR SELECT
  USING (EXISTS (
    SELECT 1 FROM profiles WHERE profiles.id = purchased_templates.profile_id AND profiles.user_id = auth.uid()
  ));

-- Users can purchase templates for their own profile
CREATE POLICY "Users can purchase templates"
  ON purchased_templates FOR INSERT
  WITH CHECK (EXISTS (
    SELECT 1 FROM profiles WHERE profiles.id = profile_id AND profiles.user_id = auth.uid()
  ));

-- ============================================
-- RLS POLICIES - INTEGRATIONS
-- ============================================

-- Users can view their own integrations
CREATE POLICY "Users can view their own integrations"
  ON integrations FOR SELECT
  USING (EXISTS (
    SELECT 1 FROM profiles WHERE profiles.id = integrations.profile_id AND profiles.user_id = auth.uid()
  ));

-- Users can insert their own integrations
CREATE POLICY "Users can insert their own integrations"
  ON integrations FOR INSERT
  WITH CHECK (EXISTS (
    SELECT 1 FROM profiles WHERE profiles.id = profile_id AND profiles.user_id = auth.uid()
  ));

-- Users can update their own integrations
CREATE POLICY "Users can update their own integrations"
  ON integrations FOR UPDATE
  USING (EXISTS (
    SELECT 1 FROM profiles WHERE profiles.id = integrations.profile_id AND profiles.user_id = auth.uid()
  ));

-- Users can delete their own integrations
CREATE POLICY "Users can delete their own integrations"
  ON integrations FOR DELETE
  USING (EXISTS (
    SELECT 1 FROM profiles WHERE profiles.id = integrations.profile_id AND profiles.user_id = auth.uid()
  ));

-- ============================================
-- RLS POLICIES - CUSTOM DOMAINS
-- ============================================

-- Users can view their own custom domains
CREATE POLICY "Users can view their own custom domains"
  ON custom_domains FOR SELECT
  USING (EXISTS (
    SELECT 1 FROM profiles WHERE profiles.id = custom_domains.profile_id AND profiles.user_id = auth.uid()
  ));

-- Users can insert their own custom domains
CREATE POLICY "Users can insert their own custom domains"
  ON custom_domains FOR INSERT
  WITH CHECK (EXISTS (
    SELECT 1 FROM profiles WHERE profiles.id = profile_id AND profiles.user_id = auth.uid()
  ));

-- Users can update their own custom domains
CREATE POLICY "Users can update their own custom domains"
  ON custom_domains FOR UPDATE
  USING (EXISTS (
    SELECT 1 FROM profiles WHERE profiles.id = custom_domains.profile_id AND profiles.user_id = auth.uid()
  ));

-- Users can delete their own custom domains
CREATE POLICY "Users can delete their own custom domains"
  ON custom_domains FOR DELETE
  USING (EXISTS (
    SELECT 1 FROM profiles WHERE profiles.id = custom_domains.profile_id AND profiles.user_id = auth.uid()
  ));

-- ============================================
-- RLS POLICIES - NOTIFICATIONS
-- ============================================

-- Users can view their own notifications
CREATE POLICY "Users can view their own notifications"
  ON notifications FOR SELECT
  USING (EXISTS (
    SELECT 1 FROM profiles WHERE profiles.id = notifications.profile_id AND profiles.user_id = auth.uid()
  ));

-- System can insert notifications
CREATE POLICY "System can insert notifications"
  ON notifications FOR INSERT
  WITH CHECK (true);

-- Users can update their own notifications (mark as read)
CREATE POLICY "Users can update their own notifications"
  ON notifications FOR UPDATE
  USING (EXISTS (
    SELECT 1 FROM profiles WHERE profiles.id = notifications.profile_id AND profiles.user_id = auth.uid()
  ));

-- Users can delete their own notifications
CREATE POLICY "Users can delete their own notifications"
  ON notifications FOR DELETE
  USING (EXISTS (
    SELECT 1 FROM profiles WHERE profiles.id = notifications.profile_id AND profiles.user_id = auth.uid()
  ));

-- ============================================
-- SEED DATA (Optional - for testing)
-- ============================================

-- You can add sample data here for testing
-- Example:
-- INSERT INTO profiles (user_id, username, full_name, bio) VALUES
--   ('00000000-0000-0000-0000-000000000000', 'testuser', 'Test User', 'This is a test bio');
