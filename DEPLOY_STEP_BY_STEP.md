# 🚀 Deploy to GitHub & Netlify - Step by Step Guide

## ⚠️ IMPORTANT: Install Git First

Before starting, you need Git installed on your computer.

### Install Git (5 minutes)

1. **Download Git:**
   - Open browser and go to: https://git-scm.com/download/win
   - Click the download link (it will auto-download)
   - File name will be like: `Git-2.43.0-64-bit.exe`

2. **Install Git:**
   - Run the downloaded file
   - Click "Next" through all screens (use default settings)
   - Click "Install"
   - Click "Finish"

3. **Verify Installation:**
   - Open a NEW PowerShell window
   - Type: `git --version`
   - You should see: `git version 2.x.x`
   - ✅ Git is installed!

---

## 🎯 Method 1: Easy Way (Using Batch Script)

### Step 1: Run the Batch Script

1. **Find the file:** `PUSH_TO_GITHUB.bat` in your project folder
2. **Double-click** it to run
3. **Follow the prompts:**
   - It will ask for a commit message (or press Enter for default)
   - It will push to GitHub automatically

### Step 2: If Authentication Fails

If you see an error about authentication:

1. **Go to GitHub:**
   - Open: https://github.com/settings/tokens
   - Click "Generate new token (classic)"
   - Name it: "Raunak Project"
   - Check the box: ✅ `repo` (Full control of private repositories)
   - Scroll down and click "Generate token"
   - **COPY THE TOKEN** (you won't see it again!)

2. **Run the script again:**
   - Double-click `PUSH_TO_GITHUB.bat`
   - When it asks for password, **paste the token** (not your GitHub password)
   - Press Enter

3. **Success!**
   - You'll see: "SUCCESS! Code pushed to GitHub"
   - Your code is now on GitHub!

---

## 🎯 Method 2: Manual Way (Using Commands)

### Step 1: Open PowerShell

1. Press `Windows Key + X`
2. Click "Windows PowerShell" or "Terminal"
3. Navigate to your project:
   ```powershell
   cd C:\Users\korde\Downloads\raunak-main
   ```

### Step 2: Initialize Git

```powershell
# Initialize repository
git init

# Add all files
git add .

# Create commit
git commit -m "Product image fix complete - all images match names"
```

### Step 3: Connect to GitHub

```powershell
# Add remote repository
git remote add origin https://github.com/unknowncoder84/raunak.git

# Rename branch to main
git branch -M main
```

### Step 4: Push to GitHub

```powershell
# Push code
git push -u origin main
```

**If authentication fails:**
- Follow the "Generate Personal Access Token" steps from Method 1
- Use the token as your password when prompted

---

## 🌐 Deploy to Netlify

### Option A: Deploy via GitHub (Recommended - Auto-deploys on every push)

#### Step 1: Login to Netlify

1. **Go to:** https://app.netlify.com/
2. **Click:** "Sign up" (if new) or "Log in"
3. **Choose:** "Sign up with GitHub" (easiest option)
4. **Authorize** Netlify to access your GitHub

#### Step 2: Create New Site

1. **Click:** "Add new site" button (top right)
2. **Select:** "Import an existing project"
3. **Choose:** "Deploy with GitHub"
4. **Authorize** Netlify (if asked)
5. **Search for:** `raunak` or `unknowncoder84/raunak`
6. **Click** on your repository

#### Step 3: Configure Build Settings

Netlify will auto-detect settings from `netlify.toml`, but verify:

```
Base directory: (leave empty or put "/")
Build command: (auto-detected from netlify.toml)
Publish directory: frontend/build
Branch to deploy: main
```

**Environment Variables** (should be auto-detected from netlify.toml):
- `REACT_APP_DEMO_MODE` = `true`
- `NODE_VERSION` = `20`
- `CI` = `false`

#### Step 4: Deploy!

1. **Click:** "Deploy site"
2. **Wait:** 2-3 minutes for build to complete
3. **Watch:** Build logs (you'll see npm install, npm build, etc.)
4. **Success:** You'll see "Site is live" with a URL

#### Step 5: Get Your URL

Your site will be at something like:
```
https://random-name-12345.netlify.app
```

**To customize the URL:**
1. Go to: Site settings → Domain management
2. Click: "Options" → "Edit site name"
3. Change to: `raunak-marketplace` (or any available name)
4. Your new URL: `https://raunak-marketplace.netlify.app`

---

### Option B: Deploy via Netlify CLI (For Advanced Users)

#### Step 1: Install Netlify CLI

```powershell
npm install -g netlify-cli
```

#### Step 2: Login

```powershell
netlify login
```
(This will open a browser window - click "Authorize")

#### Step 3: Deploy

```powershell
# Navigate to frontend
cd frontend

# Build the app
npm run build

# Deploy to Netlify
cd ..
netlify deploy --prod
```

Follow the prompts:
- Create new site? **Yes**
- Team: Select your team
- Site name: `raunak-marketplace` (or leave blank for random)
- Publish directory: `frontend/build`

---

### Option C: Manual Deploy (Drag & Drop)

#### Step 1: Build Locally

```powershell
cd frontend
npm run build
```

This creates a `frontend/build` folder with your production app.

#### Step 2: Deploy to Netlify

1. **Go to:** https://app.netlify.com/drop
2. **Drag** the `frontend/build` folder onto the page
3. **Wait** for upload (1-2 minutes)
4. **Done!** Your site is live

**Note:** This method doesn't auto-deploy on code changes. You need to rebuild and re-upload manually.

---

## ✅ Verify Deployment

After deployment, test your live site:

### 1. Homepage Loads
- Visit your Netlify URL
- Should see the BlockShop homepage
- ✅ No white screen

### 2. Login Works
**Seller Account:**
- Email: `Seller1@test.com`
- Password: `user1`
- Should redirect to seller dashboard

**Buyer Account:**
- Email: `buyer1@test.com`
- Password: `buy01`
- Should redirect to buyer homepage

### 3. Product Images Match Names
- Browse products
- Check that monitors show monitor images
- Check that keyboards show keyboard images
- Check that mice show mouse images
- ✅ All images match product names

### 4. All Routes Work
- Click around the site
- Refresh any page (should NOT get 404 error)
- ✅ React Router working correctly

### 5. Orders Work
- Login as buyer
- Add product to cart
- Place order
- Login as seller
- See the order
- ✅ Order flow working

### 6. Reviews Work
- Login as buyer
- Order a product
- Mark as delivered
- Leave a review
- ✅ Review system working

---

## 🔧 Troubleshooting

### Problem: Build fails on Netlify

**Check build logs:**
1. Go to: Deploys tab
2. Click on the failed deploy
3. Read the error message

**Common fixes:**
- Ensure Node version is 20 (set in netlify.toml)
- Check that all dependencies are in package.json
- Verify build command is correct

### Problem: White screen after deployment

**Solution:**
1. Open browser console (F12)
2. Check for errors
3. Verify environment variables:
   - Go to: Site settings → Environment variables
   - Ensure `REACT_APP_DEMO_MODE=true` is set

### Problem: 404 on page refresh

**Solution:**
- Verify `netlify.toml` is in root directory (it is!)
- Check that redirects are configured (they are!)
- This should work automatically

### Problem: "Git is not recognized"

**Solution:**
- Git is not installed
- Follow the "Install Git" steps at the top
- Restart PowerShell after installation

### Problem: Authentication failed

**Solution:**
- GitHub no longer accepts passwords
- You need a Personal Access Token
- Follow the token generation steps above
- Use token instead of password

---

## 📊 Expected Timeline

| Task | Time |
|------|------|
| Install Git | 5 minutes |
| Push to GitHub | 2 minutes |
| Setup Netlify | 3 minutes |
| Build & Deploy | 3 minutes |
| **Total** | **~15 minutes** |

---

## 🎉 Success Checklist

After completing all steps:

✅ Git is installed
✅ Code is pushed to GitHub: https://github.com/unknowncoder84/raunak
✅ Site is deployed to Netlify: https://your-site.netlify.app
✅ Homepage loads correctly
✅ Login works (both seller and buyer)
✅ Product images match names
✅ All routes work (no 404 errors)
✅ Orders can be created
✅ Reviews work properly

---

## 🔗 Important Links

- **Your GitHub Repo:** https://github.com/unknowncoder84/raunak
- **Netlify Dashboard:** https://app.netlify.com/
- **Git Download:** https://git-scm.com/download/win
- **GitHub Token Settings:** https://github.com/settings/tokens

---

## 📞 Need Help?

If you get stuck:

1. **Check the error message** - it usually tells you what's wrong
2. **Read the build logs** on Netlify
3. **Check browser console** (F12) for frontend errors
4. **Verify environment variables** are set correctly
5. **Test locally first** - if it works locally, it should work on Netlify

---

## 🚀 Next Steps After Deployment

1. **Share your live URL** with others
2. **Set up custom domain** (optional)
3. **Enable Supabase** for real database (optional)
4. **Add more products** or customize the app
5. **Monitor analytics** in Netlify dashboard

---

**Ready to deploy? Start with Method 1 (Easy Way) using the batch script!** 🎯
