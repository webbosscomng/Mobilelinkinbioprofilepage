# 🧪 Testing Your Database-Connected App

## Quick Start Guide

### 1. Create Your First Account

1. **Go to Signup Page**
   ```
   http://localhost:5173/signup
   ```

2. **Fill in the form:**
   - Business Name: `My Fashion Store`
   - Username: `myfashion` (lowercase, no spaces)
   - Email: `you@example.com`
   - Password: `password123` (min 6 characters)

3. **Click "Create Account"**
   - ✅ User created in Supabase Auth
   - ✅ Profile created in `profiles` table
   - ✅ Auto-redirect to dashboard

---

### 2. Add Your First Link

1. **Go to Links Manager**
   ```
   /dashboard/links
   ```

2. **Click "Add New Link"**
   - Label: `Shop My Products`
   - URL: `https://shop.example.com`
   - Icon: `ShoppingBag`
   - Click Save

3. **Verify in Database:**
   - Go to Supabase → Tables → `links`
   - You should see your link!

---

### 3. Add Your First Product

1. **Go to Store Manager**
   ```
   /dashboard/store
   ```

2. **Click "Add New Product"**
   - Name: `Ankara Dress`
   - Price: `₦25,000`
   - Inventory: `10`
   - Description: `Beautiful handmade dress`
   - Click Save

3. **Verify in Database:**
   - Go to Supabase → Tables → `products`
   - You should see your product!

---

### 4. Update Your Profile

1. **Go to Appearance**
   ```
   /dashboard/appearance
   ```

2. **Edit Profile Info:**
   - Name: `Your Business Name`
   - Bio: `Your description here`
   - Location: `Lagos, Nigeria`
   - Click Save

3. **Verify in Database:**
   - Go to Supabase → Tables → `profiles`
   - Your profile is updated!

---

### 5. Check Your Analytics

1. **Go to Overview**
   ```
   /dashboard
   ```

2. **You should see:**
   - Total Views: 0 (no views yet)
   - Link Clicks: 0 (no clicks yet)
   - Top Link: N/A
   - Your profile URL

---

## 🧪 Database Verification

### Check Tables in Supabase:

1. **Open Supabase Dashboard**
   ```
   https://supabase.com/dashboard/project/tkjqwnpafqdivumldqzf/database/tables
   ```

2. **Verify These Tables Have Data:**
   - ✅ `profiles` - Your profile
   - ✅ `links` - Your links
   - ✅ `products` - Your products
   - ⏳ `page_views` - Will populate when someone visits your page
   - ⏳ `clicks` - Will populate when someone clicks your links

---

## 🔍 Testing Each Feature

### ✅ **Links Manager**

**Test Add:**
1. Add a link
2. Check Supabase `links` table
3. Should see new row with your data

**Test Edit:**
1. Click Edit on a link
2. Change the title
3. Save
4. Refresh page - changes persist!

**Test Delete:**
1. Click Delete on a link
2. Confirm deletion
3. Check Supabase - row deleted!

**Test Toggle Visibility:**
1. Click eye icon on a link
2. Link becomes disabled
3. Check database - `is_active` changed!

**Test Reorder:**
1. Drag a link to new position
2. Drop it
3. Check database - `order_index` updated!

---

### ✅ **Store Manager**

**Test Add Product:**
1. Add a product with inventory
2. Check Supabase `products` table
3. Price stored as numeric (not string)

**Test Edit Product:**
1. Edit product details
2. Update inventory
3. Changes persist to database

**Test Out of Stock:**
1. Set inventory to 0
2. Product shows "Out of Stock"
3. Database reflects stock level

---

### ✅ **Appearance**

**Test Profile Update:**
1. Change your name
2. Update bio
3. Add location
4. Check `profiles` table - updated!

**Test Theme Colors:**
1. Change accent color
2. Change background color
3. Check `profiles.custom_colors` - saved as JSON!

---

### ✅ **Overview**

**Test Stats:**
1. Log in
2. View dashboard
3. Stats load from database
4. Should show 0 for new account

**Test Copy URL:**
1. Click "Copy URL"
2. Toast shows "Link copied!"
3. Paste - should be your profile URL

---

## 🐛 Common Issues & Solutions

### Issue: "Failed to fetch"
**Solution:** 
- Check Supabase credentials in `.env`
- Verify project is active
- Check browser console for errors

### Issue: "Error loading data"
**Solution:**
- Check RLS policies are set
- Verify user is authenticated
- Check Supabase logs for errors

### Issue: "Username already taken"
**Solution:**
- Username must be unique
- Try a different username
- Check `profiles` table for existing usernames

### Issue: Data not saving
**Solution:**
- Check browser console for errors
- Verify Supabase connection
- Check table permissions (RLS)

### Issue: Authentication errors
**Solution:**
- Clear browser cache/cookies
- Try incognito mode
- Check Supabase Auth settings

---

## 🎯 Expected Behavior

### **On Signup:**
```
User fills form
→ Check username availability
→ Create Supabase auth user
→ Create profile in database
→ Auto-login
→ Redirect to /dashboard
```

### **On Login:**
```
User enters credentials
→ Supabase authenticates
→ Load user profile
→ Load user data (links, products)
→ Redirect to /dashboard
```

### **On Add Link:**
```
User fills form
→ Validate data
→ INSERT into links table
→ Fetch updated links
→ Show success toast
→ Close modal
```

### **On Edit Link:**
```
User changes data
→ Validate data
→ UPDATE links table
→ Update local state
→ Show success toast
→ Close modal
```

---

## 📊 Database Schema Reference

### **profiles Table**
```sql
- id (uuid, primary key)
- user_id (uuid, references auth.users)
- username (text, unique)
- full_name (text)
- bio (text)
- profile_image (text, nullable)
- email (text, nullable)
- phone (text, nullable)
- whatsapp (text, nullable)
- location (text, nullable)
- theme_id (text)
- custom_colors (jsonb)
- is_verified (boolean)
- plan (text: 'free', 'pro', 'business')
- custom_domain (text, nullable)
- created_at (timestamp)
- updated_at (timestamp)
```

### **links Table**
```sql
- id (uuid, primary key)
- profile_id (uuid, references profiles)
- title (text)
- url (text)
- icon (text, nullable)
- is_active (boolean)
- order_index (integer)
- clicks (integer)
- created_at (timestamp)
- updated_at (timestamp)
```

### **products Table**
```sql
- id (uuid, primary key)
- profile_id (uuid, references profiles)
- name (text)
- description (text)
- price (numeric)
- currency (text)
- image_url (text, nullable)
- stock_quantity (integer, nullable)
- is_active (boolean)
- category (text, nullable)
- sku (text, nullable)
- order_index (integer)
- created_at (timestamp)
- updated_at (timestamp)
```

---

## 🎉 Success Checklist

After testing, you should have:

- [ ] Created an account
- [ ] Logged in successfully
- [ ] Added 2-3 links
- [ ] Added 1-2 products
- [ ] Updated your profile
- [ ] Changed theme colors
- [ ] Edited a link
- [ ] Deleted a link
- [ ] Toggled link visibility
- [ ] Reordered links
- [ ] Verified all changes in Supabase dashboard

---

## 📱 Next: View Your Public Profile

Once you've added content:

1. **Get your username** from profile
2. **Visit:** `/profile/{your-username}`
3. **See your live page!**

---

## 🚀 You're Ready!

Your Web Boss app is now fully functional with:
- ✅ Real authentication
- ✅ Database persistence
- ✅ CRUD operations
- ✅ Analytics tracking
- ✅ Production-ready

**Go ahead and test everything!** 🎊
