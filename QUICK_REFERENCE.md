# 🚀 Quick Reference: Real Data Integration

## 📋 Database Operations Cheat Sheet

### **Links**
```typescript
// Add Link
await supabase.from('links').insert({
  profile_id, title, url, icon, is_active, order_index
})

// Update Link
await supabase.from('links').update({
  title, url, icon, is_active
}).eq('id', linkId)

// Delete Link
await supabase.from('links').delete().eq('id', linkId)

// Get Links
await supabase.from('links')
  .select('*')
  .eq('profile_id', profileId)
  .order('order_index')
```

### **Products**
```typescript
// Add Product
await supabase.from('products').insert({
  profile_id, name, description, price, 
  currency, image_url, stock_quantity, is_active
})

// Update Product
await supabase.from('products').update({
  name, price, stock_quantity
}).eq('id', productId)

// Get Products
await supabase.from('products')
  .select('*')
  .eq('profile_id', profileId)
  .order('order_index')
```

### **Analytics**
```typescript
// Get Page Views (last 7 days)
const startDate = new Date();
startDate.setDate(startDate.getDate() - 7);

await supabase.from('page_views')
  .select('created_at, device_type, referrer, city')
  .eq('profile_id', profileId)
  .gte('created_at', startDate.toISOString())

// Get Link Clicks
await supabase.from('clicks')
  .select('link_id, created_at')
  .eq('profile_id', profileId)
  .gte('created_at', startDate.toISOString())

// Count Total Views
await supabase.from('page_views')
  .select('*', { count: 'exact', head: true })
  .eq('profile_id', profileId)
```

### **Profile**
```typescript
// Update Profile
await supabase.from('profiles').update({
  full_name, bio, location, email, phone,
  profile_image, custom_colors
}).eq('id', profileId)

// Get Profile
await supabase.from('profiles')
  .select('*')
  .eq('user_id', userId)
  .single()
```

### **Integrations**
```typescript
// Get Connected Integrations
await supabase.from('integrations')
  .select('service_name, config')
  .eq('user_id', userId)
  .eq('is_active', true)

// Add Integration
await supabase.from('integrations').insert({
  user_id, service_name, config, is_active: true
})
```

---

## 🎯 Context Methods

### **useWebBoss() Hook**
```typescript
const {
  // Data
  profile,      // { avatar, name, bio, location }
  socialLinks,  // { instagram, whatsapp, twitter, facebook }
  links,        // Link[]
  products,     // Product[]
  theme,        // { backgroundColor, cardColor, accentColor }
  
  // Methods
  updateProfile(data),
  addLink(link),
  updateLink(id, data),
  deleteLink(id),
  toggleLinkVisibility(id),
  reorderLinks(links),
  addProduct(product),
  updateProduct(id, data),
  deleteProduct(id),
  toggleProductVisibility(id),
  updateTheme(theme),
  
  // State
  loading,
  refreshData(),
} = useWebBoss();
```

### **useAuth() Hook**
```typescript
const {
  user,         // Supabase auth user
  profile,      // User's profile from database
  loading,
  signIn(email, password),
  signUp(email, password, fullName, username),
  signOut(),
} = useAuth();
```

---

## 📊 Data Flow

### **User Signup Flow**
```
1. User fills signup form
2. signUp() called
3. Check username availability
4. Create Supabase auth user
5. Create profile in profiles table
6. Auto-login user
7. Load user data
8. Redirect to /dashboard
```

### **Data Loading Flow**
```
1. User logs in
2. AuthContext loads user
3. Load profile from database
4. WebBossContext loads:
   - Links (ordered by order_index)
   - Products (ordered by order_index)
   - Theme from profile.custom_colors
5. Dashboard displays data
```

### **Analytics Flow**
```
1. User visits /dashboard/analytics
2. Load page_views for date range
3. Load clicks for date range
4. Process data into charts:
   - Daily views/clicks
   - Device breakdown
   - Traffic sources
   - Top locations
   - Hourly activity
   - Link performance
5. Display with Recharts
```

---

## 🔧 Common Tasks

### **Add a New Link**
```typescript
import { useWebBoss } from '../context/WebBossContext';

const { addLink } = useWebBoss();

await addLink({
  label: 'My Website',
  url: 'https://example.com',
  icon: 'Globe',
  isVisible: true,
  category: 'custom',
});
```

### **Update Profile**
```typescript
import { useWebBoss } from '../context/WebBossContext';

const { updateProfile } = useWebBoss();

await updateProfile({
  name: 'New Business Name',
  bio: 'Updated bio',
  location: 'Lagos, Nigeria',
});
```

### **Track Page View**
```typescript
import { supabase } from '../../lib/supabase';

await supabase.from('page_views').insert({
  profile_id: profileId,
  device_type: 'mobile',
  referrer: document.referrer,
  city: 'Lagos',
  country: 'Nigeria',
});
```

### **Track Link Click**
```typescript
import { supabase } from '../../lib/supabase';

await supabase.from('clicks').insert({
  profile_id: profileId,
  link_id: linkId,
});

// Also increment link clicks
await supabase.rpc('increment_link_clicks', { link_id: linkId });
```

---

## 🎨 Theme Updates

### **Change Theme Colors**
```typescript
const { updateTheme } = useWebBoss();

await updateTheme({
  backgroundColor: '#0F172A',
  accentColor: '#22C55E',
});

// Saves to profiles.custom_colors as JSON
```

---

## 🔐 Security

All database operations are protected by Row Level Security (RLS):

```sql
-- Users can only see their own data
CREATE POLICY "Users can view own profile"
  ON profiles FOR SELECT
  USING (auth.uid() = user_id);

-- Users can only update their own data
CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  USING (auth.uid() = user_id);
```

---

## 📈 Analytics Data Processing

### **Daily Views/Clicks**
```typescript
const processDailyData = (views, clicks, days) => {
  const dailyMap = new Map();
  
  // Initialize last N days
  for (let i = days - 1; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    dailyMap.set(date.toISOString().split('T')[0], {
      date: date.toLocaleDateString(),
      views: 0,
      clicks: 0
    });
  }
  
  // Count views and clicks
  views.forEach(view => {
    const key = view.created_at.split('T')[0];
    if (dailyMap.has(key)) dailyMap.get(key).views++;
  });
  
  clicks.forEach(click => {
    const key = click.created_at.split('T')[0];
    if (dailyMap.has(key)) dailyMap.get(key).clicks++;
  });
  
  return Array.from(dailyMap.values());
};
```

---

## 🐛 Debugging Tips

### **Check Database Connection**
```typescript
// In browser console
const { data, error } = await supabase.from('profiles').select('*');
console.log('Profiles:', data, error);
```

### **View Context Data**
```typescript
// In any component
const context = useWebBoss();
console.log('Context:', context);
```

### **Check Auth State**
```typescript
// In browser console
const { data: { user } } = await supabase.auth.getUser();
console.log('User:', user);
```

### **Monitor Database Changes**
```typescript
// Real-time subscription
const subscription = supabase
  .channel('profile-changes')
  .on('postgres_changes', {
    event: '*',
    schema: 'public',
    table: 'profiles'
  }, (payload) => {
    console.log('Change:', payload);
  })
  .subscribe();
```

---

## ✅ Status Check

**All Systems:** 🟢 OPERATIONAL

- ✅ Authentication working
- ✅ Database connected
- ✅ CRUD operations functional
- ✅ Analytics processing data
- ✅ Real-time updates enabled
- ✅ Error handling in place
- ✅ Loading states implemented
- ✅ Toast notifications working

---

## 📞 Need Help?

**Common Issues:**
1. **"Failed to fetch"** → Check .env variables
2. **"Not authorized"** → Check RLS policies
3. **"Network error"** → Check Supabase project status
4. **Data not saving** → Check browser console for errors

**Debug Mode:**
```typescript
// Enable verbose logging
localStorage.setItem('supabase.debug', 'true');
```

---

**Last Updated:** February 21, 2026  
**Status:** Production Ready ✅
