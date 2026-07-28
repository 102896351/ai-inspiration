# PowerShell 部署辅助脚本
# 用法：.\scripts\push-content.ps1 -Message "Add 30 prompts batch 1"

param(
    [Parameter(Mandatory=$true)]
    [string]$Message
)

$ErrorActionPreference = 'Stop'

Write-Host "🚀 Deploy: $Message" -ForegroundColor Cyan

# 1. 检查 raw_data 和 rewritten_data 不被 commit
if (Test-Path "raw_data") {
    Write-Host "⚠️  raw_data/ exists but is gitignored (OK)" -ForegroundColor Yellow
}
if (Test-Path "rewritten_data") {
    Write-Host "⚠️  rewritten_data/ exists but is gitignored (OK)" -ForegroundColor Yellow
}

# 2. 重新跑内容流水线（可选，但建议）
# Write-Host "Running content pipeline..." -ForegroundColor Cyan
# npm run content:all

# 3. 跑 sitemap
Write-Host "Generating sitemaps..." -ForegroundColor Cyan
npm run sitemap

# 4. Build
Write-Host "Building..." -ForegroundColor Cyan
npm run build

# 5. Git
Write-Host "Committing..." -ForegroundColor Cyan
git add -A
git status --short
git commit -m $Message
if ($LASTEXITCODE -ne 0) {
    Write-Host "Nothing to commit" -ForegroundColor Yellow
    exit 0
}

# 6. Push
Write-Host "Pushing..." -ForegroundColor Cyan
git push origin main

if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Pushed. GitHub Actions will deploy." -ForegroundColor Green
    Write-Host "   Watch: https://github.com/$($env:GITHUB_REPOSITORY)/actions" -ForegroundColor Cyan
}
