# Supabase Setup Guide for Web Boss

This guide will help you set up Supabase for your Web Boss Link-in-Bio platform.

## 📋 Prerequisites

- A Supabase account (sign up at [supabase.com](https://supabase.com))
- Your Supabase project created

## 🚀 Step-by-Step Setup

### 1. Create a Supabase Project

1. Go to [app.supabase.com](https://app.supabase.com)
2. Click "New Project"
3. Fill in your project details:
   - **Name**: Web Boss
   - **Database Password**: Choose a strong password
   - **Region**: Choose closest to Nigeria (e.g., Europe West)
4. Click "Create new project"
5. Wait for the project to be provisioned (~2 minutes)

### 2. Get Your API Keys

1. In your Supabase project dashboard, go to **Settings** → **API**
2. Copy the following values:
   - **Project URL** (e.g., `https://xxxxx.supabase.co`)
   - **Anon/Public Key** (starts with `eyJ...`)

### 3. Configure Environment Variables

1. Create a `.env` file in your project root (copy from `.env.example`)
2. Add your Supabase credentials:

```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
VITE_APP_URL=http://localhost:5173
```

### 4. Run Database Migrations

#### Option A: Using Supabase SQL Editor (Recommended)

1. Go to **SQL Editor** in your Supabase dashboard
2. Click **New Query**
3. Copy the contents of `/supabase/migrations/001_initial_schema.sql`
4. Paste into the SQL editor
5. Click **Run** (bottom right)
6. Wait for success message ✅
7. Repeat for `/supabase/migrations/002_functions.sql`

#### Option B: Using Supabase CLI (Advanced)

```bash
# Install Supabase CLI
npm install -g supabase

# Login to Supabase
supabase login

# Link your project
supabase link --project-ref your-project-ref

# Run migrations
supabase db push
```

### 5. Enable Row Level Security (RLS)

The migrations automatically enable RLS on all tables. Verify:

1. Go to **Database** → **Tables**
2. Click on any table (e.g., `profiles`)
3. Click **RLS Policies** tab
4. Ensure policies are listed

### 6. Enable Email Authentication (Optional)

1. Go to **Authentication** → **Providers**
2. Enable **Email** provider
3. Configure email templates if desired

### 7. Configure Storage (For Profile Images - Optional)

1. Go to **Storage** → **Create Bucket**
2. Create bucket named: `profile-images`
3. Set to **Public** bucket
4. Add policy for uploads:

```sql
-- Allow users to upload their own profile images
CREATE POLICY "Users can upload profile images"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'profile-images' AND auth.uid()::text = (storage.foldername(name))[1]);

-- Allow anyone to view profile images
CREATE POLICY "Profile images are publicly accessible"
ON storage.objects FOR SELECT
USING (bucket_id = 'profile-images');
```

## 📊 Database Schema Overview

Your Web Boss database includes these tables:

### Core Tables
- **profiles** - User profiles with bio, links, theme settings
- **links** - Individual links on each profile
- **products** - Products for the mini-store feature

### Analytics Tables
- **clicks** - Click tracking for links and products
- **page_views** - Page view analytics

### Business Tables
- **purchased_templates** - Track premium template purchases
- **integrations** - Third-party service integrations
- **custom_domains** - Custom domain management
- **notifications** - User notifications

## 🔧 Key Features

### Automatic Features
- ✅ Row Level Security (RLS) enabled on all tables
- ✅ Automatic `updated_at` timestamps
- ✅ Indexes for fast queries
- ✅ UUID primary keys
- ✅ Foreign key relationships

### Custom Functions
- `increment_link_clicks()` - Atomic click counter
- `get_analytics_summary()` - Get analytics data
- `is_username_available()` - Check username availability
- `get_profile_stats()` - Get profile statistics
- `get_popular_profiles()` - Get trending profiles

## 🧪 Test Your Setup

Run this query in SQL Editor to verify everything works:

```sql
-- Check if all tables exist
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public'
ORDER BY table_name;

-- Should return:
-- clicks
-- custom_domains
-- integrations
-- links
-- notifications
-- page_views
-- products
-- profiles
-- purchased_templates
```

## 🔐 Security Checklist

- ✅ RLS enabled on all tables
- ✅ Policies created for user data access
- ✅ Anon key used (never service key in frontend)
- ✅ Environment variables kept secure
- ✅ HTTPS enforced (automatic with Supabase)

## 📱 Next Steps

After setup is complete:

1. **Test Authentication**
   - Try signing up a new user
   - Check if profile is created

2. **Test Data Operations**
   - Create a link
   - Create a product
   - View analytics

3. **Test RLS Policies**
   - Ensure users can only modify their own data
   - Public profiles should be viewable by all

4. **Deploy Your App**
   - Update `VITE_APP_URL` for production
   - Add production domain to Supabase allowed origins

## 🆘 Troubleshooting

### Issue: "relation does not exist"
**Solution**: Run the migration SQL files in order (001, then 002)

### Issue: "RLS policy violation"
**Solution**: Check that RLS policies are created correctly

### Issue: "Authentication errors"
**Solution**: Verify your `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`

### Issue: "CORS errors"
**Solution**: Add your domain to **Settings** → **API** → **URL Configuration**

## 📚 Resources

- [Supabase Documentation](https://supabase.com/docs)
- [Row Level Security Guide](https://supabase.com/docs/guides/auth/row-level-security)
- [Supabase JavaScript Client](https://supabase.com/docs/reference/javascript/introduction)

## 💡 Pro Tips

1. **Use Supabase Studio** for visual database management
2. **Enable Database Webhooks** for real-time notifications
3. **Set up Database Backups** in project settings
4. **Monitor Database Performance** in the dashboard
5. **Use Realtime subscriptions** for live updates

## 🎉 You're Ready!

Your Supabase database is now configured for Web Boss. Start building! 🚀

---

**Need Help?** Check the [Supabase Discord](https://discord.supabase.com) for community support.
