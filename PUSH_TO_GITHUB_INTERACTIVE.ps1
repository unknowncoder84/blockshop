# Interactive GitHub Push Script
# This script will guide you through pushing your code to GitHub

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  Push to GitHub - Interactive Guide" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Check if git is installed
try {
    $gitVersion = git --version
    Write-Host "✅ Git is installed: $gitVersion" -ForegroundColor Green
    Write-Host ""
} catch {
    Write-Host "❌ Git is not installed!" -ForegroundColor Red
    Write-Host "Please install Git first from: https://git-scm.com/download/win" -ForegroundColor Yellow
    pause
    exit 1
}

# Check if repository is initialized
if (-not (Test-Path ".git")) {
    Write-Host "❌ Git repository not initialized!" -ForegroundColor Red
    Write-Host "Initializing now..." -ForegroundColor Yellow
    git init
    git add .
    git commit -m "Initial commit - Product image fix complete"
    git remote add origin https://github.com/unknowncoder84/raunak.git
    git branch -M main
    Write-Host "✅ Repository initialized!" -ForegroundColor Green
    Write-Host ""
}

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  GitHub Authentication Required" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "You need a GitHub Personal Access Token to push." -ForegroundColor Yellow
Write-Host ""
Write-Host "To get your token:" -ForegroundColor White
Write-Host "1. Open: https://github.com/settings/tokens" -ForegroundColor White
Write-Host "2. Click 'Generate new token (classic)'" -ForegroundColor White
Write-Host "3. Check the 'repo' scope" -ForegroundColor White
Write-Host "4. Click 'Generate token'" -ForegroundColor White
Write-Host "5. Copy the token (starts with ghp_)" -ForegroundColor White
Write-Host ""

$openBrowser = Read-Host "Do you want to open the token page in your browser? (Y/N)"
if ($openBrowser -eq "Y" -or $openBrowser -eq "y") {
    Start-Process "https://github.com/settings/tokens"
    Write-Host ""
    Write-Host "✅ Browser opened! Generate your token and come back here." -ForegroundColor Green
    Write-Host ""
}

Write-Host "Press any key when you have your token ready..." -ForegroundColor Yellow
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
Write-Host ""

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  Pushing to GitHub" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Repository: https://github.com/unknowncoder84/raunak" -ForegroundColor White
Write-Host "Branch: main" -ForegroundColor White
Write-Host ""
Write-Host "When prompted:" -ForegroundColor Yellow
Write-Host "  Username: unknowncoder84" -ForegroundColor White
Write-Host "  Password: [PASTE YOUR TOKEN]" -ForegroundColor White
Write-Host ""
Write-Host "Starting push..." -ForegroundColor Green
Write-Host ""

# Attempt to push
git push -u origin main

if ($LASTEXITCODE -eq 0) {
    Write-Host ""
    Write-Host "========================================" -ForegroundColor Green
    Write-Host "  ✅ SUCCESS! Code pushed to GitHub!" -ForegroundColor Green
    Write-Host "========================================" -ForegroundColor Green
    Write-Host ""
    Write-Host "Your code is now at: https://github.com/unknowncoder84/raunak" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "Next steps:" -ForegroundColor Yellow
    Write-Host "1. Visit: https://app.netlify.com/" -ForegroundColor White
    Write-Host "2. Sign up with GitHub" -ForegroundColor White
    Write-Host "3. Import your repository" -ForegroundColor White
    Write-Host "4. Deploy!" -ForegroundColor White
    Write-Host ""
    
    $openRepo = Read-Host "Do you want to open your GitHub repository? (Y/N)"
    if ($openRepo -eq "Y" -or $openRepo -eq "y") {
        Start-Process "https://github.com/unknowncoder84/raunak"
    }
    
    $openNetlify = Read-Host "Do you want to open Netlify to deploy? (Y/N)"
    if ($openNetlify -eq "Y" -or $openNetlify -eq "y") {
        Start-Process "https://app.netlify.com/"
    }
} else {
    Write-Host ""
    Write-Host "========================================" -ForegroundColor Red
    Write-Host "  ❌ Push Failed" -ForegroundColor Red
    Write-Host "========================================" -ForegroundColor Red
    Write-Host ""
    Write-Host "Common issues:" -ForegroundColor Yellow
    Write-Host "1. Wrong token - Make sure you copied the entire token" -ForegroundColor White
    Write-Host "2. Token needs 'repo' scope - Generate a new token with correct permissions" -ForegroundColor White
    Write-Host "3. Repository doesn't exist - Create it first at https://github.com/new" -ForegroundColor White
    Write-Host ""
    Write-Host "Try running this script again after fixing the issue." -ForegroundColor Yellow
}

Write-Host ""
Write-Host "Press any key to exit..." -ForegroundColor Gray
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
