# 🚀 Push to GitHub and Deploy to Netlify

## Prerequisites

You need to install Git first. Here's how:

### Install Git on Windows

1. **Download Git:**
   - Go to: https://git-scm.com/download/win
   - Download the installer
   - Run the installer (use default settings)

2. **Verify Installation:**
   - Open a new terminal/PowerShell
   - Type: `git --version`
   - You should see something like: `git version 2.x.x`

---

## Part 1: Push to GitHub

### Step 1: Initialize Git Repository

Open PowerShell in your project folder and run:

```bash
# Initialize git repository
git init

# Add all files
git add .

# Create first commit
git commit -m "Product image fix complete - all images now match product names"
```

### Step 2: Connect to GitHub Repository

```bash
# Add your GitHub repository as remote
git remote add origin https://github.com/unknowncoder84/raunak.git

# Check if remote was added
git remote -v
```

### Step 3: Push to GitHub

```bash
# Push to main branch
git push -u origin main
```

**If you get an error about 'main' branch not existing, try:**
```bash
# Rename branch to main
git branch -M main

# Push again
git push -u origin main
```

**If you get authentication error:**
- GitHub no longer accepts password authentication
- You need to use a Personal Access Token (PAT)
- Follow these steps:
  1. Go to GitHub.com → Settings → Developer settings → Personal access tokens → Tokens (classic)
  2. Click "Generate new token (classic)"
  3. Give it a name like "Raunak Project"
  4. Select scopes: `repo` (full control)
  5. Click "Generate token"
  6. Copy the token (you won't see it again!)
  7. When git asks for password, paste the token instead

---

## Part 2: Deploy to Netlify

### Option A: Deploy via GitHub (Recommended)

1. **Login to Netlify:**
   - Go to: https://app.netlify.com/
   - Sign up or login (use GitHub account for easier integration)

2. **Create New Site:**
   - Click "Add new site" → "Import an existing project"
   - Choose "Deploy with GitHub"
   - Authorize Netlify to access your GitHub
   - Select repository: `unknowncoder84/raunak`

3. **Configure Build Settings:**
   ```
   Base directory: frontend
   Build command: npm run build
   Publish directory: frontend/build
   ```

4. **Environment Variables:**
   Click "Show advanced" → "New variable" and add:
   ```
   REACT_APP_DEMO_MODE=true
   REACT_APP_SUPABASE_URL=https://your-project.supabase.co
   REACT_APP_SUPABASE_ANON_KEY=your-anon-key-here
   ```
   (Use demo mode values if you don't have Supabase set up)

5. **Deploy:**
   - Click "Deploy site"
   - Wait 2-3 minutes for build to complete
   - Your site will be live at: `https://random-name-12345.netlify.app`

6. **Custom Domain (Optional):**
   - Go to Site settings → Domain management
   - Click "Add custom domain"
   - Follow instructions

### Option B: Deploy via Netlify CLI

1. **Install Netlify CLI:**
   ```bash
   npm install -g netlify-cli
   ```

2. **Login to Netlify:**
   ```bash
   netlify login
   ```

3. **Initialize Netlify:**
   ```bash
   cd frontend
   netlify init
   ```

4. **Deploy:**
   ```bash
   # Build the app
   npm run build
   
   # Deploy to Netlify
   netlify deploy --prod
   ```

### Option C: Manual Deploy (Drag & Drop)

1. **Build the app locally:**
   ```bash
   cd frontend
   npm run build
   ```

2. **Go to Netlify:**
   - Visit: https://app.netlify.com/drop
   - Drag the `frontend/build` folder onto the page
   - Wait for upload to complete
   - Your site is live!

---

## Part 3: Configure Netlify for React Router

Since this is a React app with routing, you need to add a redirect rule:

### Method 1: Using netlify.toml (Already exists in your project)

The file `netlify.toml` in your root directory should contain:

```toml
[build]
  base = "frontend"
  command = "npm run build"
  publish = "build"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

This is already set up! ✅

### Method 2: Using _redirects file

If netlify.toml doesn't work, create `frontend/public/_redirects`:

```
/*    /index.html   200
```

---

## Part 4: Verify Deployment

After deployment, test these features:

1. **Homepage loads:** ✅
2. **Login works:** 
   - Seller: `Seller1@test.com` / `user1`
   - Buyer: `buyer1@test.com` / `buy01`
3. **Product images match names:** ✅
4. **All routes work:** (no 404 errors when refreshing)
5. **Orders can be created:** ✅
6. **Reviews work:** ✅

---

## Troubleshooting

### Problem: Build fails on Netlify

**Solution:** Check build logs and ensure:
- Node version is compatible (16.x or higher)
- All dependencies are in package.json
- Build command is correct: `npm run build`

### Problem: White screen after deployment

**Solution:** 
- Check browser console for errors
- Verify environment variables are set
- Check that `REACT_APP_DEMO_MODE=true` is set

### Problem: 404 on page refresh

**Solution:**
- Verify `netlify.toml` is in root directory
- Or add `_redirects` file to `frontend/public/`

### Problem: Images not loading

**Solution:**
- Images are from Unsplash (external URLs)
- Check browser console for CORS errors
- Verify internet connection

---

## Quick Commands Reference

```bash
# Git commands
git init
git add .
git commit -m "Your message"
git remote add origin https://github.com/unknowncoder84/raunak.git
git push -u origin main

# Build and test locally
cd frontend
npm install
npm run build
npm start

# Netlify CLI
npm install -g netlify-cli
netlify login
netlify init
netlify deploy --prod
```

---

## Environment Variables for Netlify

Add these in Netlify dashboard → Site settings → Environment variables:

```
REACT_APP_DEMO_MODE=true
REACT_APP_SUPABASE_URL=https://your-project.supabase.co
REACT_APP_SUPABASE_ANON_KEY=your-anon-key-here
```

For demo mode (no backend), just set:
```
REACT_APP_DEMO_MODE=true
```

---

## Expected Results

After successful deployment:

✅ Site is live at your Netlify URL
✅ All pages load correctly
✅ Login works with demo accounts
✅ Product images match their names
✅ Orders can be created and managed
✅ Reviews work properly
✅ No 404 errors on page refresh

---

## Next Steps

1. **Install Git** (if not already installed)
2. **Push to GitHub** using commands above
3. **Deploy to Netlify** using Option A (GitHub integration)
4. **Test the live site** with demo accounts
5. **Share the URL** with others!

---

## Support

If you encounter issues:
1. Check Netlify build logs
2. Check browser console for errors
3. Verify environment variables
4. Test locally first: `npm run build` then `npm start`

---

**Your repository:** https://github.com/unknowncoder84/raunak
**Netlify dashboard:** https://app.netlify.com/

Good luck! 🚀
