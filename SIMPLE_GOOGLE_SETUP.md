# ✅ Simple Google OAuth Setup (10 Minutes)

## What This Does:
- Real Google login button
- Users automatically saved to Supabase Authentication
- Users visible in Supabase dashboard
- No fake modals, real OAuth flow

---

## Option 1: Quick Test (Skip Google Setup)

Just use email signup for now:
1. Go to http://localhost:3000/signup
2. Signup with email/password
3. User will be saved to Supabase Auth

The Google button will show an error message if clicked without setup.

---

## Option 2: Enable Real Google Login (10 min)

### Step 1: Get Google Credentials

1. Go to: https://console.cloud.google.com/
2. Create project: "BlockShop"
3. Go to **APIs & Services** → **Credentials**
4. Click **Create Credentials** → **OAuth client ID**
5. Configure consent screen (if needed):
   - App name: BlockShop
   - Your email
   - Save
6. Create OAuth Client:
   - Type: **Web application**
   - Name: BlockShop
   - Authorized redirect URIs:
     ```
     https://ddytpnlvtjcymlqekbda.supabase.co/auth/v1/callback
     ```
   - Click **Create**
7. Copy **Client ID** and **Client Secret**

### Step 2: Configure Supabase

1. Go to: https://supabase.com/dashboard/project/ddytpnlvtjcymlqekbda
2. Click **Authentication** → **Providers**
3. Find **Google**
4. Enable it
5. Paste Client ID
6. Paste Client Secret  
7. Click **Save**

### Step 3: Test

1. Go to http://localhost:3000/login
2. Click "Continue with Google"
3. Google popup appears
4. Login with Google
5. Redirected back to app
6. Check Supabase → Authentication → Users
7. Your Google account is there!

---

## ✅ What You Get:

- Real Google OAuth popup
- Users in Supabase Authentication table
- Users in custom users table
- Secure authentication
- Works in production

---

## 🎯 Current Status:

✅ Code is ready
✅ Google button works
✅ Auth callback handles Google login
✅ Users saved to Supabase
✅ Users saved to localStorage (backup)

Just need to configure Google OAuth in Supabase dashboard!

---

## 🚀 Or Just Use Email Signup:

Email signup already works and saves to Supabase Auth!

1. Go to http://localhost:3000/signup
2. Enter email/password
3. Click signup
4. User created in Supabase!

Check: Supabase → Authentication → Users

---

The code is ready. Google OAuth will work as soon as you configure it in Supabase!
