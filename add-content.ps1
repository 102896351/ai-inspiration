# Add Content Pipeline
# 一键加内容：抓数据 → LLM 改写 → 集成 → sitemap → build → commit → push
# 用法: .\add-content.ps1 [-BatchName "batch-1"] [-MaxCount 100] [-SkipPush]

param(
    [string]$BatchName = "content-batch-$(Get-Date -Format 'yyyyMMdd-HHmm')",
    [int]$MaxCount = 100,
    [switch]$SkipPush
)

$ErrorActionPreference = 'Stop'
Set-Location $PSScriptRoot

Write-Host ""
Write-Host "╔════════════════════════════════════════════════════════╗" -ForegroundColor Cyan
Write-Host "║  AI Image Inspiration - Add Content Pipeline            ║" -ForegroundColor Cyan
Write-Host "╚════════════════════════════════════════════════════════╝" -ForegroundColor Cyan
Write-Host ""
Write-Host "  Batch:    $BatchName" -ForegroundColor White
Write-Host "  Max:      $MaxCount items" -ForegroundColor White
Write-Host "  Push:     $(if ($SkipPush) {'NO (manual)'} else {'YES (auto)'})" -ForegroundColor White
Write-Host ""

$startTime = Get-Date

# ===== Step 0: 检查环境 =====
Write-Host "━━━ [0/6] Checking environment ━━━" -ForegroundColor Yellow

if (-not (Test-Path "node_modules")) {
    Write-Host "  Installing dependencies..." -ForegroundColor Gray
    npm install
    if ($LASTEXITCODE -ne 0) { throw "npm install failed" }
}

if (-not (Test-Path ".env")) {
    Write-Host "  ⚠️  .env not found" -ForegroundColor Red
    Write-Host "  Copying .env.example -> .env" -ForegroundColor Yellow
    Copy-Item .env.example .env
    Write-Host ""
    Write-Host "  ❌ Please edit .env and add your LLM_API_KEY, then run again." -ForegroundColor Red
    Write-Host ""
    Write-Host "  Quickest: DeepSeek (1 yuan per million tokens, almost free)" -ForegroundColor White
    Write-Host "    1. Go to https://platform.deepseek.com/" -ForegroundColor White
    Write-Host "    2. Sign up, create API key" -ForegroundColor White
    Write-Host "    3. Paste into .env as LLM_API_KEY=sk-xxx" -ForegroundColor White
    Write-Host "    4. Run this script again" -ForegroundColor White
    Write-Host ""
    exit 1
}

# 读 LLM key
$envContent = Get-Content .env -Raw
$hasLLMKey = $envContent -match 'LLM_API_KEY=[\s\S]+?\S' -and $envContent -notmatch 'LLM_API_KEY=\s*$'
if ($hasLLMKey) {
    Write-Host "  ✓ .env found with LLM_API_KEY" -ForegroundColor Green
} else {
    Write-Host "  ⚠️  LLM_API_KEY not set - will use MOCK mode (lower quality)" -ForegroundColor Yellow
}

Write-Host ""

# ===== Step 1: 抓数据 =====
Write-Host "━━━ [1/6] Fetching from sources ━━━" -ForegroundColor Yellow

$fetchCount = [Math]::Max([Math]::Ceiling($MaxCount * 0.5), 50)
Write-Host "  Target: ~$fetchCount items" -ForegroundColor Gray
Write-Host ""

# Civitai (官方 API，最稳)
Write-Host "  → Civitai (official API)..." -ForegroundColor White
npm run fetch:civitai 2>&1 | Select-Object -Last 5
if ($LASTEXITCODE -ne 0) { Write-Host "  ⚠️  Civitai fetch failed" -ForegroundColor Yellow }
Write-Host ""

# Lexica (搜索 API)
Write-Host "  → Lexica (search API)..." -ForegroundColor White
npm run fetch:lexica 2>&1 | Select-Object -Last 5
Write-Host ""

# PromptHero (HTML 解析，可能失败)
Write-Host "  → PromptHero (HTML parse)..." -ForegroundColor White
npm run fetch:prompthero 2>&1 | Select-Object -Last 5
Write-Host ""

# 统计
$rawFiles = Get-ChildItem raw_data -Filter '*-raw.json' -ErrorAction SilentlyContinue
$rawCount = 0
foreach ($f in $rawFiles) {
    $data = Get-Content $f.FullName -Raw | ConvertFrom-Json
    $rawCount += $data.Count
}
Write-Host "  ✓ Total raw items: $rawCount" -ForegroundColor Green
Write-Host ""

if ($rawCount -eq 0) {
    Write-Host "  ❌ No data fetched. Check your internet connection." -ForegroundColor Red
    exit 1
}

# ===== Step 2: LLM 改写 =====
Write-Host "━━━ [2/6] Rewriting with LLM ━━━" -ForegroundColor Yellow
if ($hasLLMKey) {
    Write-Host "  Using your LLM_API_KEY..." -ForegroundColor Gray
    $rewriteEstimateMin = [Math]::Ceiling($rawCount * 2 / 60)
    Write-Host "  Estimated time: $rewriteEstimateMin minutes ($rawCount items × 2s each)" -ForegroundColor Gray
} else {
    Write-Host "  MOCK mode (no LLM key) - templates only, low quality" -ForegroundColor Yellow
    $rewriteEstimateMin = [Math]::Ceiling($rawCount / 30)
    Write-Host "  Estimated time: $rewriteEstimateMin seconds" -ForegroundColor Gray
}
Write-Host ""

npm run rewrite 2>&1 | Select-Object -Last 5
if ($LASTEXITCODE -ne 0) {
    Write-Host "  ⚠️  Rewrite had errors (check log)" -ForegroundColor Yellow
}
Write-Host ""

$rewrittenFiles = Get-ChildItem rewritten_data -Filter '*-rewritten.json' -ErrorAction SilentlyContinue
$rewrittenCount = 0
foreach ($f in $rewrittenFiles) {
    $data = Get-Content $f.FullName -Raw | ConvertFrom-Json
    $rewrittenCount += $data.Count
}
Write-Host "  ✓ Rewritten items: $rewrittenCount" -ForegroundColor Green
Write-Host ""

# ===== Step 3: 集成 =====
Write-Host "━━━ [3/6] Integrating to src/data/ ━━━" -ForegroundColor Yellow
npm run integrate 2>&1 | Select-Object -Last 5
Write-Host ""

# ===== Step 4: Sitemap =====
Write-Host "━━━ [4/6] Generating sitemaps ━━━" -ForegroundColor Yellow
npm run sitemap 2>&1 | Select-Object -Last 8
Write-Host ""

# ===== Step 5: Build =====
Write-Host "━━━ [5/6] Building site ━━━" -ForegroundColor Yellow
npm run build 2>&1 | Select-Object -Last 8
Write-Host ""

# ===== Step 6: Git push =====
if (-not $SkipPush) {
    Write-Host "━━━ [6/6] Committing & pushing ━━━" -ForegroundColor Yellow

    git add -A

    $commitMsg = "Add content: $BatchName ($rewrittenCount items)"
    git commit -m $commitMsg 2>&1 | Select-Object -Last 3

    if ($LASTEXITCODE -ne 0) {
        Write-Host "  ⚠️  Nothing to commit (all up to date?)" -ForegroundColor Yellow
    } else {
        git push origin main 2>&1 | Select-Object -Last 3
        Write-Host "  ✓ Pushed to GitHub" -ForegroundColor Green
    }
} else {
    Write-Host "━━━ [6/6] Skipped push (manual) ━━━" -ForegroundColor Yellow
}

# ===== 报告 =====
$elapsed = (Get-Date) - $startTime
Write-Host ""
Write-Host "╔════════════════════════════════════════════════════════╗" -ForegroundColor Green
Write-Host "║  ✓ Pipeline complete                                       ║" -ForegroundColor Green
Write-Host "╚════════════════════════════════════════════════════════╝" -ForegroundColor Green
Write-Host ""
Write-Host "  Total items:  $rewrittenCount" -ForegroundColor White
Write-Host "  Time:         $($elapsed.ToString('mm\:ss'))" -ForegroundColor White
Write-Host ""
if (-not $SkipPush) {
    Write-Host "  GitHub Actions is building & deploying (1-2 min)..." -ForegroundColor Cyan
    Write-Host "  Watch: https://github.com/102896351/ai-inspiration/actions" -ForegroundColor Cyan
    Write-Host ""
}
Write-Host "  Next steps:" -ForegroundColor Yellow
Write-Host "    • Wait 1-2 min, then visit https://102896351.github.io/ai-inspiration/" -ForegroundColor White
Write-Host "    • Run again later to add more:  .\add-content.ps1" -ForegroundColor White
Write-Host "    • Check stats:                  npm run build" -ForegroundColor White
Write-Host ""
