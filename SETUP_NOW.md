# 🚀 URGENT: Run Database Migrations

Your Supabase is now connected, but you need to create the database tables!

## ⚡ Quick Setup (5 minutes)

### Step 1: Open Supabase SQL Editor
Go to: https://supabase.com/dashboard/project/tkjqwnpafqdivumldqzf/sql/new

### Step 2: Run Migration 1 (Core Tables)
1. Copy ALL content from `/supabase/migrations/001_initial_schema.sql`
2. Paste into SQL Editor
3. Click **RUN** button (bottom right)
4. Wait for "Success. No rows returned" ✅

### Step 3: Run Migration 2 (Functions)
1. Copy ALL content from `/supabase/migrations/002_functions.sql`
2. Paste into SQL Editor (new query)
3. Click **RUN** button
4. Wait for "Success. No rows returned" ✅

### Step 4: Verify Tables Created
Run this query to check:

```sql
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public'
ORDER BY table_name;
```

You should see 9 tables:
- ✅ clicks
- ✅ custom_domains
- ✅ integrations
- ✅ kv_store_730fc62a (already exists)
- ✅ links
- ✅ notifications
- ✅ page_views
- ✅ products
- ✅ profiles
- ✅ purchased_templates

## 🎉 Done!

Once migrations are complete, your app will work with:
- ✅ User authentication
- ✅ Profile management
- ✅ Link-in-bio functionality
- ✅ Product catalog
- ✅ Analytics tracking
- ✅ Premium templates
- ✅ All dashboard features

## 🆘 Troubleshooting

### Error: "relation already exists"
**Solution:** Table already created, skip that table or drop it first

### Error: "permission denied"
**Solution:** Make sure you're using the SQL Editor in Supabase dashboard

### Error: "syntax error"
**Solution:** Make sure you copied the ENTIRE migration file, including first and last lines

---

## 📱 Direct Links:

- **SQL Editor:** https://supabase.com/dashboard/project/tkjqwnpafqdivumldqzf/sql/new
- **Database Tables:** https://supabase.com/dashboard/project/tkjqwnpafqdivumldqzf/database/tables
- **API Settings:** https://supabase.com/dashboard/project/tkjqwnpafqdivumldqzf/settings/api

---

**Your Credentials Are Already Configured! ✅**
- Project ID: `tkjqwnpafqdivumldqzf`
- URL: `https://tkjqwnpafqdivumldqzf.supabase.co`
- Anon Key: Configured in `.env`

**Just run the migrations and you're done!** 🚀
