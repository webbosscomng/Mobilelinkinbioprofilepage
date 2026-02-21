import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://tkjqwnpafqdivumldqzf.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRranF3bnBhZnFkaXZ1bWxkcXpmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzE3MDYwMTUsImV4cCI6MjA4NzI4MjAxNX0.SyHLzbNObQcu7Nfif752_KFiNsSHGuLonOsWn7GckfQ';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Database Types
export interface Profile {
  id: string;
  user_id: string;
  username: string;
  full_name: string;
  bio: string;
  profile_image?: string;
  email?: string;
  phone?: string;
  whatsapp?: string;
  location?: string;
  theme_id: string;
  custom_colors?: {
    primary?: string;
    secondary?: string;
    accent?: string;
    background?: string;
  };
  is_verified: boolean;
  plan: 'free' | 'pro' | 'business';
  custom_domain?: string;
  created_at: string;
  updated_at: string;
}

export interface Link {
  id: string;
  profile_id: string;
  title: string;
  url: string;
  icon?: string;
  is_active: boolean;
  order_index: number;
  clicks: number;
  created_at: string;
  updated_at: string;
}

export interface Product {
  id: string;
  profile_id: string;
  name: string;
  description: string;
  price: number;
  currency: string;
  image_url?: string;
  stock_quantity?: number;
  is_active: boolean;
  category?: string;
  sku?: string;
  order_index: number;
  created_at: string;
  updated_at: string;
}

export interface Click {
  id: string;
  link_id?: string;
  product_id?: string;
  profile_id: string;
  clicked_at: string;
  user_agent?: string;
  referrer?: string;
  country?: string;
  city?: string;
  device_type?: string;
}

export interface PageView {
  id: string;
  profile_id: string;
  viewed_at: string;
  user_agent?: string;
  referrer?: string;
  country?: string;
  city?: string;
  device_type?: string;
}

export interface PurchasedTemplate {
  id: string;
  profile_id: string;
  template_id: string;
  template_name: string;
  price_paid: number;
  purchased_at: string;
}

export interface Integration {
  id: string;
  profile_id: string;
  service: string;
  service_data: any;
  is_connected: boolean;
  created_at: string;
  updated_at: string;
}

export interface CustomDomain {
  id: string;
  profile_id: string;
  domain: string;
  is_verified: boolean;
  verification_token?: string;
  created_at: string;
  updated_at: string;
}

export interface Notification {
  id: string;
  profile_id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  is_read: boolean;
  created_at: string;
}