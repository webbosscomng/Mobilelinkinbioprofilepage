# Web Boss Database Reference

Quick reference guide for working with the Supabase database.

## 📊 Database Tables

### `profiles`
User profile information

```typescript
{
  id: UUID
  user_id: UUID (references auth.users)
  username: string (unique)
  full_name: string
  bio: string
  profile_image: string (optional)
  email: string (optional)
  phone: string (optional)
  whatsapp: string (optional)
  location: string (optional)
  theme_id: string (default: 'default')
  custom_colors: JSONB
  is_verified: boolean
  plan: 'free' | 'pro' | 'business'
  custom_domain: string (optional)
  created_at: timestamp
  updated_at: timestamp
}
```

### `links`
Individual links on profiles

```typescript
{
  id: UUID
  profile_id: UUID (references profiles)
  title: string
  url: string
  icon: string (optional)
  is_active: boolean
  order_index: integer
  clicks: integer
  created_at: timestamp
  updated_at: timestamp
}
```

### `products`
Products for the mini-store

```typescript
{
  id: UUID
  profile_id: UUID (references profiles)
  name: string
  description: string
  price: decimal
  currency: string (default: 'NGN')
  image_url: string (optional)
  stock_quantity: integer (optional)
  is_active: boolean
  category: string (optional)
  sku: string (optional)
  order_index: integer
  created_at: timestamp
  updated_at: timestamp
}
```

### `clicks`
Analytics - track link/product clicks

```typescript
{
  id: UUID
  link_id: UUID (optional, references links)
  product_id: UUID (optional, references products)
  profile_id: UUID (references profiles)
  clicked_at: timestamp
  user_agent: string (optional)
  referrer: string (optional)
  country: string (optional)
  city: string (optional)
  device_type: string (optional)
}
```

### `page_views`
Analytics - track page views

```typescript
{
  id: UUID
  profile_id: UUID (references profiles)
  viewed_at: timestamp
  user_agent: string (optional)
  referrer: string (optional)
  country: string (optional)
  city: string (optional)
  device_type: string (optional)
}
```

### `purchased_templates`
Premium templates purchased by users

```typescript
{
  id: UUID
  profile_id: UUID (references profiles)
  template_id: string
  template_name: string
  price_paid: decimal
  purchased_at: timestamp
}
```

### `integrations`
Third-party service integrations

```typescript
{
  id: UUID
  profile_id: UUID (references profiles)
  service: string
  service_data: JSONB
  is_connected: boolean
  created_at: timestamp
  updated_at: timestamp
}
```

### `custom_domains`
Custom domain management

```typescript
{
  id: UUID
  profile_id: UUID (references profiles)
  domain: string (unique)
  is_verified: boolean
  verification_token: string (optional)
  created_at: timestamp
  updated_at: timestamp
}
```

### `notifications`
User notifications

```typescript
{
  id: UUID
  profile_id: UUID (references profiles)
  title: string
  message: string
  type: 'info' | 'success' | 'warning' | 'error'
  is_read: boolean
  created_at: timestamp
}
```

## 🔧 Common Queries

### Get Profile by Username
```typescript
import { supabase } from './lib/supabase';

const { data, error } = await supabase
  .from('profiles')
  .select('*')
  .eq('username', 'johndoe')
  .single();
```

### Get User's Links
```typescript
const { data, error } = await supabase
  .from('links')
  .select('*')
  .eq('profile_id', profileId)
  .eq('is_active', true)
  .order('order_index', { ascending: true });
```

### Create New Link
```typescript
const { data, error } = await supabase
  .from('links')
  .insert({
    profile_id: profileId,
    title: 'My Website',
    url: 'https://example.com',
    order_index: 0,
  })
  .select()
  .single();
```

### Update Profile
```typescript
const { data, error } = await supabase
  .from('profiles')
  .update({ bio: 'New bio text' })
  .eq('id', profileId)
  .select()
  .single();
```

### Track Page View
```typescript
await supabase.from('page_views').insert({
  profile_id: profileId,
  user_agent: navigator.userAgent,
  referrer: document.referrer,
});
```

### Track Click
```typescript
await supabase.from('clicks').insert({
  profile_id: profileId,
  link_id: linkId,
  user_agent: navigator.userAgent,
});

// Also increment counter
await supabase.rpc('increment_link_clicks', { link_id: linkId });
```

### Get Analytics Summary
```typescript
const { data, error } = await supabase
  .rpc('get_analytics_summary', {
    profile_id_param: profileId,
    days_param: 30
  });

// Returns:
// {
//   total_views: 1234,
//   total_clicks: 567,
//   unique_visitors: 890,
//   top_links: [...],
//   views_by_date: [...]
// }
```

### Get Profile Stats
```typescript
const { data, error } = await supabase
  .rpc('get_profile_stats', {
    profile_id_param: profileId
  });

// Returns:
// {
//   total_links: 5,
//   total_products: 10,
//   total_views: 1234,
//   total_clicks: 567,
//   plan: 'pro'
// }
```

### Check Username Availability
```typescript
const { data, error } = await supabase
  .rpc('is_username_available', {
    username_param: 'johndoe'
  });

// Returns: true or false
```

### Purchase Template
```typescript
const { data, error } = await supabase
  .from('purchased_templates')
  .insert({
    profile_id: profileId,
    template_id: 'luxury-fashion',
    template_name: 'Luxury Fashion Pro',
    price_paid: 15000,
  })
  .select()
  .single();
```

### Get Purchased Templates
```typescript
const { data, error } = await supabase
  .from('purchased_templates')
  .select('*')
  .eq('profile_id', profileId);
```

## 🔐 Row Level Security (RLS)

All tables have RLS enabled. Key policies:

### Profiles
- ✅ Anyone can **view** public profiles
- ✅ Users can **create** their own profile
- ✅ Users can **update** their own profile
- ✅ Users can **delete** their own profile

### Links & Products
- ✅ Anyone can **view** active items
- ✅ Users can **manage** their own items (CRUD)

### Analytics (clicks, page_views)
- ✅ Anyone can **insert** (for tracking)
- ✅ Users can **view** their own analytics

### Purchased Templates
- ✅ Users can **view** their purchases
- ✅ Users can **purchase** templates

## 🎯 Best Practices

### 1. Always Use TypeScript Types
```typescript
import type { Profile, Link, Product } from './lib/supabase';
```

### 2. Handle Errors
```typescript
const { data, error } = await supabase
  .from('profiles')
  .select('*');

if (error) {
  console.error('Error:', error);
  return;
}
```

### 3. Use Single() for Unique Results
```typescript
// When expecting one result
.single()

// When expecting multiple
.select('*')
```

### 4. Optimize Queries with Select
```typescript
// Only select needed fields
.select('id, username, full_name')

// Instead of
.select('*')
```

### 5. Use Realtime Subscriptions
```typescript
const subscription = supabase
  .channel('profile-changes')
  .on(
    'postgres_changes',
    {
      event: '*',
      schema: 'public',
      table: 'profiles',
      filter: `id=eq.${profileId}`
    },
    (payload) => {
      console.log('Profile changed:', payload);
    }
  )
  .subscribe();

// Don't forget to unsubscribe
subscription.unsubscribe();
```

## 📦 Utility Functions

Use the pre-built helpers in `/src/lib/database.ts`:

```typescript
import {
  getProfileByUsername,
  createLink,
  updateLink,
  deleteLink,
  getProducts,
  trackPageView,
  trackClick,
  purchaseTemplate,
} from './lib/database';
```

## 🔄 Realtime Features

Enable realtime updates for collaborative features:

```typescript
const channel = supabase
  .channel('links-changes')
  .on(
    'postgres_changes',
    {
      event: 'INSERT',
      schema: 'public',
      table: 'links',
      filter: `profile_id=eq.${profileId}`
    },
    (payload) => {
      console.log('New link added:', payload.new);
    }
  )
  .subscribe();
```

## 🎨 Custom Functions Available

- `increment_link_clicks(link_id)` - Atomically increment click count
- `get_analytics_summary(profile_id, days)` - Get analytics overview
- `is_username_available(username)` - Check username availability
- `get_profile_stats(profile_id)` - Get profile statistics
- `get_popular_profiles(limit)` - Get trending profiles
- `get_revenue_stats(profile_id)` - Get revenue statistics

## 🚀 Performance Tips

1. **Index Usage**: All foreign keys are indexed
2. **Batch Operations**: Use `upsert()` for bulk updates
3. **Pagination**: Use `range()` for large datasets
4. **Caching**: Consider caching frequently accessed data
5. **Connection Pooling**: Supabase handles this automatically

## 📱 Mobile Considerations

- All timestamps are in UTC
- Use `device_type` in analytics for mobile/desktop tracking
- Consider offline-first approach with local storage

---

**Need Help?** Check `/SUPABASE_SETUP.md` for setup instructions.
