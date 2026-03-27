# 🚀 BlockShop - Email Authentication Setup

## ⚠️ CRITICAL FIX NEEDED

I can see from your screenshots that **"Confirm email" is ENABLED**. This is why users don't appear immediately!

---

## ✅ Step 1: Disable Email Confirmation (REQUIRED!)

1. Go to: https://supabase.com/dashboard/project/ddytpnlvtjcymlqekbda
2. Click **Authentication** → **Email** (in the left sidebar under NOTIFICATIONS)
3. Find **"Confirm sign up"** section
4. Click on it
5. **DISABLE** the "Confirm sign up" toggle (turn it OFF)
6. Click **Save**

**Why?** When enabled, users must click a confirmation link in their email before they appear in the Users table. For testing, we need this OFF.

---

## ✅ Step 2: Enable Sign Ups

1. Still in **Authentication** → **Sign In / Providers**
2. Find **"User Signups"** section at the top
3. Make sure **"Allow new users to sign up"** is **ENABLED** (ON)
4. Click **Save changes**

---

## ✅ Step 3: Test Signup

1. Go to: http://localhost:3000/signup
2. Use a **BRAND NEW EMAIL** (not one you tried before)
   - Example: test999@example.com
3. Fill in:
   - Name: Test User
   - Email: test999@example.com
   - Password: test123
   - Role: Buyer
4. Click "Create Account"
5. **Immediately check Supabase:**
   - Go to Authentication → Users
   - Your user should appear RIGHT AWAY!

---

## 📊 How to Verify It's Working:

### In Browser Console (F12):
When you signup, you should see:
```
✅ Supabase connected successfully
📝 REGISTER ATTEMPT: test999@example.com
✅ User saved to localStorage
💾 Attempting to save to Supabase...
✅ User created in Supabase Auth
✅ User saved to Supabase users table
```

### In Supabase Dashboard:
1. Authentication → Users
2. You should see: test999@example.com
3. Status: Should show as confirmed (green checkmark)

---

## 🎯 Current Status:

- ✅ Email provider: ENABLED
- ❌ Confirm email: MUST BE DISABLED
- ✅ Allow signups: ENABLED
- ✅ Code is ready
- ✅ Server running: http://localhost:3000

---

## 🔧 If Still Not Working:

1. Make sure "Confirm sign up" is **OFF**
2. Use a completely new email
3. Check browser console for errors
4. Wait 10 minutes if you got rate limited

---

**The main issue is the email confirmation setting. Disable it and users will appear immediately!** 🚀
