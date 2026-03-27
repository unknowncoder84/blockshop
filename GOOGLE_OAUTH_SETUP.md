# 🚀 Setup Real Google OAuth Login

## Step 1: Enable Google OAuth in Supabase (5 minutes)

### 1.1 Go to Google Cloud Console
1. Go to: https://console.cloud.google.com/
2. Create a new project or select existing one
3. Name it: "BlockShop"

### 1.2 Enable Google+ API
1. Go to **APIs & Services** → **Library**
2. Search for "Google+ API"
3. Click **Enable**

### 1.3 Create OAuth Credentials
1. Go to **APIs & Services** → **Credentials**
2. Click **Create Credentials** → **OAuth client ID**
3. If prompted, configure consent screen:
   - User Type: **External**
   - App name: **BlockShop**
   - User support email: Your email
   - Developer contact: Your email
   - Click **Save and Continue**
   - Skip scopes, click **Save and Continue**
   - Add test users (your email)
   - Click **Save and Continue**

4. Create OAuth Client:
   - Application type: **Web application**
   - Name: **BlockShop Web**
   - Authorized JavaScript origins:
     - http://localhost:3000
     - https://ddytpnlvtjcymlqekbda.supabase.co
   - Authorized redirect URIs:
     - https://ddytpnlvtjcymlqekbda.supabase.co/auth/v1/callback
   - Click **Create**

5. Copy the **Client ID** and **Client Secret**

### 1.4 Configure Supabase
1. Go to: https://supabase.com/dashboard/project/ddytpnlvtjcymlqekbda
2. Click **Authentication** → **Providers**
3. Find **Google** provider
4. Enable it
5. Paste your **Client ID**
6. Paste your **Client Secret**
7. Click **Save**

---

## Step 2: I'll Update the Code

I'll now update the code to use REAL Google OAuth instead of the fake modal.

---

## What You'll Get:

✅ Real Google login popup
✅ Users automatically created in Supabase Auth
✅ Users visible in Authentication → Users
✅ No manual password needed
✅ Secure OAuth flow
✅ Works in production

---

## After Setup:

1. Click "Continue with Google" in your app
2. Google login popup appears
3. Select your Google account
4. User is created in Supabase automatically
5. Check Supabase → Authentication → Users
6. Your Google account will be there!

---

Let me know when you have the Google Client ID and Secret, or I can update the code to use real Google OAuth now!
