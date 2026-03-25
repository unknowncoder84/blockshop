@echo off
echo ========================================
echo   Push to GitHub - unknowncoder84/raunak
echo ========================================
echo.

REM Check if git is installed
git --version >nul 2>&1
if errorlevel 1 (
    echo ERROR: Git is not installed!
    echo.
    echo Please install Git first:
    echo 1. Go to: https://git-scm.com/download/win
    echo 2. Download and install Git
    echo 3. Restart this script
    echo.
    pause
    exit /b 1
)

echo Git is installed! Proceeding...
echo.

REM Check if .git folder exists
if not exist ".git" (
    echo Initializing Git repository...
    git init
    echo.
)

REM Check if remote exists
git remote get-url origin >nul 2>&1
if errorlevel 1 (
    echo Adding GitHub remote...
    git remote add origin https://github.com/unknowncoder84/raunak.git
    echo.
)

echo Adding all files...
git add .
echo.

echo Creating commit...
set /p commit_message="Enter commit message (or press Enter for default): "
if "%commit_message%"=="" (
    set commit_message=Product image fix complete - all images match names
)
git commit -m "%commit_message%"
echo.

echo Pushing to GitHub...
git branch -M main
git push -u origin main
echo.

if errorlevel 1 (
    echo.
    echo ========================================
    echo   AUTHENTICATION REQUIRED
    echo ========================================
    echo.
    echo If you see an authentication error, you need a Personal Access Token:
    echo.
    echo 1. Go to: https://github.com/settings/tokens
    echo 2. Click "Generate new token (classic)"
    echo 3. Select 'repo' scope
    echo 4. Copy the token
    echo 5. When prompted for password, paste the token
    echo.
    echo Then run this script again.
    echo.
    pause
    exit /b 1
)

echo.
echo ========================================
echo   SUCCESS! Code pushed to GitHub
echo ========================================
echo.
echo Repository: https://github.com/unknowncoder84/raunak
echo.
echo Next steps:
echo 1. Go to: https://app.netlify.com/
echo 2. Click "Add new site" - "Import from Git"
echo 3. Select your GitHub repository
echo 4. Netlify will auto-detect settings from netlify.toml
echo 5. Click "Deploy site"
echo.
pause
