# AI Image Inspiration 部署脚本
# 用法: .\push.ps1 -Username "你的GitHub用户名" [-Token "ghp_xxx"] [-Ssh]

param(
    [Parameter(Mandatory=$true)]
    [string]$Username,

    [string]$Token,

    [switch]$Ssh
)

$ErrorActionPreference = 'Stop'
Set-Location $PSScriptRoot

Write-Host "🚀 AI Image Inspiration - Deploy to GitHub" -ForegroundColor Cyan
Write-Host "==========================================" -ForegroundColor Cyan

# 1. 确认 git 已 init
if (-not (Test-Path ".git")) {
    Write-Host "❌ .git not found. Run: git init" -ForegroundColor Red
    exit 1
}

# 2. 检查是否有 remote
$existingRemote = git remote get-url origin 2>$null
if ($existingRemote) {
    Write-Host "✓ Existing remote: $existingRemote" -ForegroundColor Yellow
    $confirm = Read-Host "  Replace? (y/N)"
    if ($confirm -eq "y") {
        git remote remove origin
    }
}

# 3. 配 remote
$repoUrl = if ($Ssh) {
    "git@github.com:${Username}/ai-inspiration.git"
} else {
    "https://github.com/${Username}/ai-inspiration.git"
}

git remote add origin $repoUrl
Write-Host "✓ Remote: $repoUrl" -ForegroundColor Green

# 4. Token 注入（HTTPS only）
if (-not $Ssh -and $Token) {
    $repoUrlWithToken = "https://${Token}@github.com/${Username}/ai-inspiration.git"
    git remote set-url origin $repoUrlWithToken
    Write-Host "✓ Token injected" -ForegroundColor Green
}

# 5. 状态检查
$status = git status --short
if ($status) {
    Write-Host ""
    Write-Host "Files to commit:" -ForegroundColor Cyan
    Write-Host $status
    Write-Host ""

    $confirm = Read-Host "Commit and push? (Y/n)"
    if ($confirm -eq "n") { exit 0 }

    git add -A
    git commit -m "Initial: AI image inspiration site

- Vue 3 + Vite 5 static site
- 7-language i18n (en/zh/ja/ko/fr/de/es)
- 4-facet filter (model/style/useCase/difficulty)
- Light/dark theme toggle
- Image gallery with masonry layout
- Detail page with prompt + tutorial + cross-model + FAQ
- SEO: sitemap index, hreflang, image schema
- Build pipeline: fetch → rewrite (LLM) → integrate → sitemap
- GitHub Actions auto-deploy"
    if ($LASTEXITCODE -ne 0) {
        Write-Host "❌ Commit failed" -ForegroundColor Red
        exit 1
    }
    Write-Host "✓ Committed" -ForegroundColor Green
}

# 6. 推送
Write-Host ""
Write-Host "Pushing to origin/main..." -ForegroundColor Cyan
git branch -M main
git push -u origin main

if ($LASTEXITCODE -eq 0) {
    Write-Host ""
    Write-Host "✅ Pushed successfully!" -ForegroundColor Green
    Write-Host ""
    Write-Host "Next steps:" -ForegroundColor Cyan
    Write-Host "  1. Go to https://github.com/$Username/ai-inspiration/settings/pages" -ForegroundColor White
    Write-Host "  2. Source: GitHub Actions" -ForegroundColor White
    Write-Host "  3. Wait for Actions to finish deploying" -ForegroundColor White
    Write-Host "  4. Your site: https://$Username.github.io/ai-inspiration/" -ForegroundColor Green
} else {
    Write-Host ""
    Write-Host "❌ Push failed" -ForegroundColor Red
    Write-Host "  Check your token / SSH key" -ForegroundColor Yellow
    if (-not $Ssh -and -not $Token) {
        Write-Host "  Try: .\push.ps1 -Username '$Username' -Token 'ghp_xxx'" -ForegroundColor Yellow
    }
}
