@echo off
echo ============================================
echo   PUSH TO GITHUB - SUPER SIMPLE
echo ============================================
echo.
echo This will push your code to:
echo https://github.com/unknowncoder84/raunak
echo.
echo IMPORTANT: You need a GitHub token!
echo.
echo If you don't have one:
echo 1. Press Ctrl+C to stop
echo 2. Go to: https://github.com/settings/tokens
echo 3. Click "Generate new token (classic)"
echo 4. Check the "repo" box
echo 5. Copy the token
echo 6. Run this file again
echo.
pause
echo.
echo Starting push...
echo.
git push -u origin main
echo.
if %errorlevel% equ 0 (
    echo ============================================
    echo   SUCCESS! Code is on GitHub!
    echo ============================================
    echo.
    echo Visit: https://github.com/unknowncoder84/raunak
    echo.
    echo Next: Deploy to Netlify
    echo Go to: https://app.netlify.com/
    echo.
) else (
    echo ============================================
    echo   PUSH FAILED
    echo ============================================
    echo.
    echo Common problems:
    echo 1. Wrong token - Make sure you copied it correctly
    echo 2. Token needs "repo" permission
    echo 3. Repository doesn't exist - Create it at https://github.com/new
    echo.
    echo Try again with a new token!
    echo.
)
pause
