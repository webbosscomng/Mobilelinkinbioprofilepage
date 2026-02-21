import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import type { 
  Profile, 
  Link, 
  Product, 
  Click, 
  PageView,
  PurchasedTemplate,
  Integration,
  Notification 
} from '../lib/supabase';

// Hook for fetching profile by username
export function useProfile(username: string) {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchProfile() {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('username', username)
          .single();

        if (error) throw error;
        setProfile(data);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    }

    if (username) {
      fetchProfile();
    }
  }, [username]);

  return { profile, loading, error };
}

// Hook for fetching links
export function useLinks(profileId: string) {
  const [links, setLinks] = useState<Link[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchLinks() {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('links')
          .select('*')
          .eq('profile_id', profileId)
          .eq('is_active', true)
          .order('order_index', { ascending: true });

        if (error) throw error;
        setLinks(data || []);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    }

    if (profileId) {
      fetchLinks();
    }
  }, [profileId]);

  return { links, loading, error, setLinks };
}

// Hook for fetching products
export function useProducts(profileId: string) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchProducts() {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('products')
          .select('*')
          .eq('profile_id', profileId)
          .eq('is_active', true)
          .order('order_index', { ascending: true });

        if (error) throw error;
        setProducts(data || []);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    }

    if (profileId) {
      fetchProducts();
    }
  }, [profileId]);

  return { products, loading, error, setProducts };
}

// Hook for tracking analytics
export function useAnalytics(profileId: string, dateRange?: { start: Date; end: Date }) {
  const [analytics, setAnalytics] = useState<{
    totalViews: number;
    totalClicks: number;
    clicksByLink: { link_id: string; clicks: number }[];
    viewsByDate: { date: string; views: number }[];
  }>({
    totalViews: 0,
    totalClicks: 0,
    clicksByLink: [],
    viewsByDate: [],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchAnalytics() {
      try {
        setLoading(true);

        // Fetch total page views
        const { count: viewCount } = await supabase
          .from('page_views')
          .select('*', { count: 'exact', head: true })
          .eq('profile_id', profileId);

        // Fetch total clicks
        const { count: clickCount } = await supabase
          .from('clicks')
          .select('*', { count: 'exact', head: true })
          .eq('profile_id', profileId);

        // Fetch clicks by link
        const { data: clickData } = await supabase
          .from('clicks')
          .select('link_id')
          .eq('profile_id', profileId)
          .not('link_id', 'is', null);

        const clicksByLink = (clickData || []).reduce((acc: any[], click) => {
          const existing = acc.find(item => item.link_id === click.link_id);
          if (existing) {
            existing.clicks++;
          } else {
            acc.push({ link_id: click.link_id, clicks: 1 });
          }
          return acc;
        }, []);

        setAnalytics({
          totalViews: viewCount || 0,
          totalClicks: clickCount || 0,
          clicksByLink,
          viewsByDate: [],
        });
      } catch (err) {
        console.error('Error fetching analytics:', err);
      } finally {
        setLoading(false);
      }
    }

    if (profileId) {
      fetchAnalytics();
    }
  }, [profileId, dateRange]);

  return { analytics, loading };
}

// Hook for purchased templates
export function usePurchasedTemplates(profileId: string) {
  const [templates, setTemplates] = useState<PurchasedTemplate[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTemplates() {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('purchased_templates')
          .select('*')
          .eq('profile_id', profileId);

        if (error) throw error;
        setTemplates(data || []);
      } catch (err) {
        console.error('Error fetching purchased templates:', err);
      } finally {
        setLoading(false);
      }
    }

    if (profileId) {
      fetchTemplates();
    }
  }, [profileId]);

  return { templates, loading, setTemplates };
}

// Hook for notifications
export function useNotifications(profileId: string) {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchNotifications() {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('notifications')
          .select('*')
          .eq('profile_id', profileId)
          .order('created_at', { ascending: false })
          .limit(50);

        if (error) throw error;
        setNotifications(data || []);
        setUnreadCount((data || []).filter(n => !n.is_read).length);
      } catch (err) {
        console.error('Error fetching notifications:', err);
      } finally {
        setLoading(false);
      }
    }

    if (profileId) {
      fetchNotifications();
    }
  }, [profileId]);

  return { notifications, unreadCount, loading, setNotifications };
}

// Helper function to track page view
export async function trackPageView(profileId: string, metadata?: {
  userAgent?: string;
  referrer?: string;
  country?: string;
  city?: string;
  deviceType?: string;
}) {
  try {
    await supabase.from('page_views').insert({
      profile_id: profileId,
      user_agent: metadata?.userAgent,
      referrer: metadata?.referrer,
      country: metadata?.country,
      city: metadata?.city,
      device_type: metadata?.deviceType,
    });
  } catch (err) {
    console.error('Error tracking page view:', err);
  }
}

// Helper function to track click
export async function trackClick(
  profileId: string,
  linkId?: string,
  productId?: string,
  metadata?: {
    userAgent?: string;
    referrer?: string;
    country?: string;
    city?: string;
    deviceType?: string;
  }
) {
  try {
    await supabase.from('clicks').insert({
      profile_id: profileId,
      link_id: linkId,
      product_id: productId,
      user_agent: metadata?.userAgent,
      referrer: metadata?.referrer,
      country: metadata?.country,
      city: metadata?.city,
      device_type: metadata?.deviceType,
    });

    // Also increment the click count on the link
    if (linkId) {
      await supabase.rpc('increment_link_clicks', { link_id: linkId });
    }
  } catch (err) {
    console.error('Error tracking click:', err);
  }
}
