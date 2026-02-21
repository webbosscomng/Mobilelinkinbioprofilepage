import { supabase } from './supabase';
import type { Profile, Link, Product, Integration, PurchasedTemplate } from './supabase';

// ============================================
// PROFILE OPERATIONS
// ============================================

export async function getProfileByUsername(username: string) {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('username', username)
    .single();

  if (error) throw error;
  return data;
}

export async function getCurrentUserProfile() {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return null;

  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('user_id', user.id)
    .single();

  if (error) throw error;
  return data;
}

export async function updateProfile(profileId: string, updates: Partial<Profile>) {
  const { data, error } = await supabase
    .from('profiles')
    .update(updates)
    .eq('id', profileId)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function createProfile(profile: {
  user_id: string;
  username: string;
  full_name: string;
  email?: string;
}) {
  const { data, error } = await supabase
    .from('profiles')
    .insert(profile)
    .select()
    .single();

  if (error) throw error;
  return data;
}

// ============================================
// LINK OPERATIONS
// ============================================

export async function getLinks(profileId: string) {
  const { data, error } = await supabase
    .from('links')
    .select('*')
    .eq('profile_id', profileId)
    .order('order_index', { ascending: true });

  if (error) throw error;
  return data;
}

export async function createLink(link: {
  profile_id: string;
  title: string;
  url: string;
  icon?: string;
  order_index: number;
}) {
  const { data, error } = await supabase
    .from('links')
    .insert(link)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function updateLink(linkId: string, updates: Partial<Link>) {
  const { data, error } = await supabase
    .from('links')
    .update(updates)
    .eq('id', linkId)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function deleteLink(linkId: string) {
  const { error } = await supabase
    .from('links')
    .delete()
    .eq('id', linkId);

  if (error) throw error;
}

export async function reorderLinks(links: { id: string; order_index: number }[]) {
  const updates = links.map(link =>
    supabase
      .from('links')
      .update({ order_index: link.order_index })
      .eq('id', link.id)
  );

  await Promise.all(updates);
}

// ============================================
// PRODUCT OPERATIONS
// ============================================

export async function getProducts(profileId: string) {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('profile_id', profileId)
    .order('order_index', { ascending: true });

  if (error) throw error;
  return data;
}

export async function createProduct(product: {
  profile_id: string;
  name: string;
  description?: string;
  price: number;
  currency?: string;
  image_url?: string;
  stock_quantity?: number;
  category?: string;
  order_index: number;
}) {
  const { data, error } = await supabase
    .from('products')
    .insert(product)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function updateProduct(productId: string, updates: Partial<Product>) {
  const { data, error } = await supabase
    .from('products')
    .update(updates)
    .eq('id', productId)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function deleteProduct(productId: string) {
  const { error } = await supabase
    .from('products')
    .delete()
    .eq('id', productId);

  if (error) throw error;
}

export async function reorderProducts(products: { id: string; order_index: number }[]) {
  const updates = products.map(product =>
    supabase
      .from('products')
      .update({ order_index: product.order_index })
      .eq('id', product.id)
  );

  await Promise.all(updates);
}

// ============================================
// ANALYTICS OPERATIONS
// ============================================

export async function getPageViewStats(profileId: string, days: number = 30) {
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - days);

  const { data, error } = await supabase
    .from('page_views')
    .select('viewed_at')
    .eq('profile_id', profileId)
    .gte('viewed_at', startDate.toISOString());

  if (error) throw error;

  // Group by date
  const viewsByDate = (data || []).reduce((acc: any, view) => {
    const date = new Date(view.viewed_at).toISOString().split('T')[0];
    acc[date] = (acc[date] || 0) + 1;
    return acc;
  }, {});

  return Object.entries(viewsByDate).map(([date, count]) => ({
    date,
    views: count as number,
  }));
}

export async function getClickStats(profileId: string, days: number = 30) {
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - days);

  const { data, error } = await supabase
    .from('clicks')
    .select('link_id, product_id, clicked_at')
    .eq('profile_id', profileId)
    .gte('clicked_at', startDate.toISOString());

  if (error) throw error;
  return data || [];
}

export async function getLinkClickCount(linkId: string) {
  const { count, error } = await supabase
    .from('clicks')
    .select('*', { count: 'exact', head: true })
    .eq('link_id', linkId);

  if (error) throw error;
  return count || 0;
}

// ============================================
// TEMPLATE OPERATIONS
// ============================================

export async function getPurchasedTemplates(profileId: string) {
  const { data, error } = await supabase
    .from('purchased_templates')
    .select('*')
    .eq('profile_id', profileId);

  if (error) throw error;
  return data || [];
}

export async function purchaseTemplate(
  profileId: string,
  templateId: string,
  templateName: string,
  pricePaid: number
) {
  const { data, error } = await supabase
    .from('purchased_templates')
    .insert({
      profile_id: profileId,
      template_id: templateId,
      template_name: templateName,
      price_paid: pricePaid,
    })
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function hasTemplateBeenPurchased(profileId: string, templateId: string) {
  const { data, error } = await supabase
    .from('purchased_templates')
    .select('id')
    .eq('profile_id', profileId)
    .eq('template_id', templateId)
    .single();

  return !error && !!data;
}

// ============================================
// INTEGRATION OPERATIONS
// ============================================

export async function getIntegrations(profileId: string) {
  const { data, error } = await supabase
    .from('integrations')
    .select('*')
    .eq('profile_id', profileId);

  if (error) throw error;
  return data || [];
}

export async function saveIntegration(
  profileId: string,
  service: string,
  serviceData: any,
  isConnected: boolean
) {
  const { data, error } = await supabase
    .from('integrations')
    .upsert({
      profile_id: profileId,
      service,
      service_data: serviceData,
      is_connected: isConnected,
    })
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function deleteIntegration(integrationId: string) {
  const { error } = await supabase
    .from('integrations')
    .delete()
    .eq('id', integrationId);

  if (error) throw error;
}

// ============================================
// NOTIFICATION OPERATIONS
// ============================================

export async function getNotifications(profileId: string) {
  const { data, error } = await supabase
    .from('notifications')
    .select('*')
    .eq('profile_id', profileId)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data || [];
}

export async function markNotificationAsRead(notificationId: string) {
  const { error } = await supabase
    .from('notifications')
    .update({ is_read: true })
    .eq('id', notificationId);

  if (error) throw error;
}

export async function markAllNotificationsAsRead(profileId: string) {
  const { error } = await supabase
    .from('notifications')
    .update({ is_read: true })
    .eq('profile_id', profileId)
    .eq('is_read', false);

  if (error) throw error;
}

export async function deleteNotification(notificationId: string) {
  const { error } = await supabase
    .from('notifications')
    .delete()
    .eq('id', notificationId);

  if (error) throw error;
}

// ============================================
// CUSTOM DOMAIN OPERATIONS
// ============================================

export async function addCustomDomain(profileId: string, domain: string) {
  const verificationToken = Math.random().toString(36).substring(2, 15);

  const { data, error } = await supabase
    .from('custom_domains')
    .insert({
      profile_id: profileId,
      domain,
      verification_token: verificationToken,
      is_verified: false,
    })
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function verifyCustomDomain(domainId: string) {
  const { data, error } = await supabase
    .from('custom_domains')
    .update({ is_verified: true })
    .eq('id', domainId)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function deleteCustomDomain(domainId: string) {
  const { error } = await supabase
    .from('custom_domains')
    .delete()
    .eq('id', domainId);

  if (error) throw error;
}
