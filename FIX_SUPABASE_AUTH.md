# 🔧 Fix Supabase Authentication Issue

## Problem: Users not appearing in Authentication table

This usually happens because of email confirmation settings.

---

## ✅ Solution - Disable Email Confirmation (For Testing)

### Step 1: Go to Supabase Dashboard
https://supabase.com/dashboard/project/ddytpnlvtjcymlqekbda

### Step 2: Disable Email Confirmation
1. Click **Authentication** (left sidebar)
2. Click **Providers**
3. Find **Email** provider
4. Click to expand it
5. Find **"Confirm email"** setting
6. **TURN IT OFF** (disable it)
7. Click **Save**

### Step 3: Enable Signups (if disabled)
While you're in the same page:
1. Make sure **"Enable email provider"** is ON
2. Make sure **"Enable sign ups"** is ON
3. Click **Save**

---

## 🧪 Test Using the Diagnostic Tool

1. Open `CHECK_SUPABASE_CONNECTION.html` in your browser
2. Click **"1️⃣ Test Connection"** - should show ✅
3. Click **"2️⃣ Check Auth Settings"** - follow instructions
4. Fill in the form:
   - Email: test123@example.com
   - Password: test123
   - Name: Test User
5. Click **"3️⃣ Test Signup"**
6. Check the results!

---

## 🔍 Common Issues & Solutions:

### Issue 1: "Email rate limit exceeded"
**Solution:** Wait 5-10 minutes before trying again. Supabase limits signup attempts.

### Issue 2: "User already registered"
**Solution:** Use a different email address or delete the user from Supabase dashboard.

### Issue 3: "Signups not allowed"
**Solution:** 
1. Go to Authentication → Providers
2. Enable "Email provider"
3. Enable "Sign ups"
4. Save

### Issue 4: "relation public.users does not exist"
**Solution:** Run the SQL query to create the users table:
```sql
CREATE TABLE IF NOT EXISTS users (
  id TEXT PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('buyer', 'seller')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE users ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public read access" ON users FOR SELECT USING (true);
CREATE POLICY "Allow public insert" ON users FOR INSERT WITH CHECK (true);
```

### Issue 5: Email confirmation required
**Solution:** Disable "Confirm email" in Authentication → Providers → Email

---

## 📋 Complete Checklist:

Go to Supabase Dashboard and verify:

- [ ] Authentication → Providers → Email is **ENABLED**
- [ ] "Enable sign ups" is **ON**
- [ ] "Confirm email" is **OFF** (for testing)
- [ ] SQL query has been run (users table exists)
- [ ] No rate limit errors (wait if needed)

---

## 🎯 After Fixing Settings:

1. Go to your app: http://localhost:3000/signup
2. Signup with a NEW email (not used before)
3. Check browser console (F12) for errors
4. Go to Supabase → Authentication → Users
5. You should see your user!

---

## 🔧 Alternative: Manual User Creation

If signup still doesn't work, create a user manually:

1. Go to Supabase → Authentication → Users
2. Click **"Add user"**
3. Enter email and password
4. Click **"Create user"**
5. User will appear immediately

---

## 📞 Still Not Working?

Check browser console (F12) and look for:
- Red error messages
- "Supabase" related errors
- Copy the error message

Common console errors:
- "Invalid API key" → Check .env file
- "Network error" → Check internet connection
- "Email confirmation required" → Disable in settings
- "Rate limit" → Wait 10 minutes

---

## ✅ Success Indicators:

When it works, you'll see:
- ✅ User appears in Authentication → Users
- ✅ User appears in Table Editor → users
- ✅ Console shows "User created in Supabase Auth"
- ✅ No error messages in console

Try the diagnostic tool first: `CHECK_SUPABASE_CONNECTION.html`
