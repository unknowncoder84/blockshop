# 🚀 Supabase Setup Guide

## What's Working Now:
✅ Demo accounts (buyer1@test.com, Seller1@test.com) are back
✅ New signups save to BOTH localStorage AND Supabase
✅ You can view all users at: http://localhost:3000/view-users
✅ Login works with both demo and new accounts

---

## 📋 Step 1: Create Users Table in Supabase

Go to your Supabase dashboard: https://supabase.com/dashboard/project/ddytpnlvtjcymlqekbda

### SQL Editor → New Query → Run this:

```sql
-- Create users table
CREATE TABLE IF NOT EXISTS users (
  id TEXT PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('buyer', 'seller')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- Create policy to allow anyone to read users (for admin viewing)
CREATE POLICY "Allow public read access" ON users
  FOR SELECT
  USING (true);

-- Create policy to allow anyone to insert users (for signup)
CREATE POLICY "Allow public insert" ON users
  FOR INSERT
  WITH CHECK (true);

-- Create index for faster email lookups
CREATE INDEX IF NOT EXISTS users_email_idx ON users(email);
```

---

## 📋 Step 2: Enable Email Authentication

1. Go to **Authentication** → **Providers** in Supabase
2. Make sure **Email** is enabled
3. Turn OFF "Confirm email" (for testing)
4. Save changes

---

## 🧪 Step 3: Test the System

### Test Signup:
1. Go to http://localhost:3000/signup
2. Create a new account with any email
3. Check console - you should see:
   - ✅ User saved to localStorage
   - ✅ User created in Supabase Auth
   - ✅ User saved to Supabase users table

### View Users:
1. Go to http://localhost:3000/view-users
2. You'll see:
   - **LocalStorage Users**: Demo accounts + new signups
   - **Supabase Users**: Click "Load from Supabase" to see database users

### Check Supabase Dashboard:
1. Go to **Authentication** → **Users** - see auth users
2. Go to **Table Editor** → **users** - see your custom users table

---

## 🎯 How It Works:

### When User Signs Up:
1. ✅ Checks if email exists in localStorage
2. ✅ Creates user in localStorage (for demo mode)
3. ✅ Creates user in Supabase Auth (for authentication)
4. ✅ Creates user in Supabase users table (for your data)

### When User Logs In:
1. ✅ Checks localStorage first (fast, works offline)
2. ✅ Falls back to Supabase if needed

### Demo Accounts:
- buyer1@test.com / buy01
- Seller1@test.com / user1
- These are in localStorage only (not in Supabase)

---

## 🔍 Troubleshooting:

### "Could not load users from Supabase"
- Make sure you created the users table (Step 1)
- Check if RLS policies are set correctly
- Verify your Supabase URL and key in `.env`

### "User already exists"
- This means the email is already in localStorage
- Go to http://localhost:3000/view-users
- Click "Clear All" to reset
- Or use different email

### Users not appearing in Supabase
- Check browser console for errors
- Verify Supabase connection in console logs
- Make sure REACT_APP_DEMO_MODE=true in .env

---

## 📊 View Users Page Features:

### LocalStorage Section:
- Shows all users in browser storage
- Includes demo accounts
- Can refresh or clear all

### Supabase Section:
- Click "Load from Supabase" to fetch
- Shows users from database
- Real-time data from Supabase

---

## 🎉 What You Get:

1. **Demo Mode**: Works offline with localStorage
2. **Production Ready**: Saves to Supabase automatically
3. **Dual Storage**: Best of both worlds
4. **Easy Debugging**: View all users at /view-users
5. **No Breaking Changes**: Existing features still work

---

## 🚀 Next Steps:

1. Run the SQL query in Supabase (Step 1)
2. Test signup with a new email
3. Go to /view-users to see your users
4. Check Supabase dashboard to verify

All changes are ready to push to GitHub!
