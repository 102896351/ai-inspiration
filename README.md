# 🎨 AI Image Inspiration

A curated gallery of AI-generated images with full prompts, parameter breakdowns, and step-by-step tutorials for Midjourney, Stable Diffusion, Flux, DALL-E, and more.

**Live site**: https://aigallery.xyz (TBD)

## What's Different

Unlike PromptHero / Lexica / Civitai (which only show image + prompt), we provide:

- ✅ **Full tutorial breakdown** for every prompt (5-step learning)
- ✅ **Parameter explanations** (why each param was chosen, not just syntax)
- ✅ **Cross-model comparison** (how to adapt the prompt for SD/Flux/DALL-E/etc.)
- ✅ **FAQ** (3-5 common questions per prompt)
- ✅ **Multi-facet filter** (model × style × use case × difficulty)
- ✅ **7-language i18n** (en/zh/ja/ko/fr/de/es)
- ✅ **Mobile-first** + lazy load + WebP

## Architecture

```
Source data                  AI rewrite              Build                Deploy
─────────────                ──────────              ─────                ──────
PromptHero ─┐                                          ↓
Civitai    ─┼─→ raw_data ─→ rewrite ─→ rewritten ─→ integrate ─→ src/data/ ─→ Vite build ─→ GitHub Pages
Lexica     ─┘   (.json)    (LLM API)   (.json)        (.json)         (dist/)
```

## Quick Start

### 1. Install dependencies
```bash
npm install
```

### 2. Configure LLM (recommended)
```bash
cp .env.example .env
# Edit .env - paste your LLM_API_KEY
# Recommended: DeepSeek (1 yuan = 5M tokens, very cheap)
#   1. https://platform.deepseek.com/ → Sign up
#   2. Create API key
#   3. Paste as LLM_API_KEY=sk-xxx
```

### 3. Add content (one command)
```powershell
# Windows: one-click pipeline
.\add-content.ps1

# Or step by step:
npm run fetch:all       # fetch from 3 sources
npm run rewrite         # LLM rewrite (70% original)
npm run integrate       # build src/data/
npm run sitemap         # generate sitemaps
npm run build           # Vite build

# Commit + push (auto-deploy via GitHub Actions)
git add -A
git commit -m "Add content batch"
git push origin main
```

This will:
1. Fetch ~50 items from PromptHero (HTML scrape)
2. Fetch ~80 items from Civitai (official API)
3. Fetch ~60 items from Lexica (search API)
4. Rewrite all items with LLM (70% original content, 2s each)
5. Integrate into `src/data/gallery/`
6. Generate sitemap (4 files)
7. Build, commit, push → GitHub Actions auto-deploys

### 4. Develop locally
```bash
npm run dev
# Open http://localhost:5173
```

## Project Structure

```
ai-inspiration/
├── src/
│   ├── views/            # 6 views (Home, Gallery, ImageDetail, Tutorials, Tools, Blog)
│   ├── components/       # ImageCard, FacetFilter
│   ├── i18n/locales/     # 7 language packs
│   ├── data/
│   │   ├── gallery/      # 30+ image detail JSONs + index.json
│   │   └── blog/         # Blog post JSONs
│   ├── App.vue
│   └── main.js
├── scripts/
│   ├── fetch-prompthero.js   # HTML scrape
│   ├── fetch-civitai.js      # Official API
│   ├── fetch-lexica.js       # Search API
│   ├── rewrite-prompt.md     # LLM prompt template
│   ├── rewrite-content.js    # LLM orchestration
│   ├── integrate.js          # JSON → src/data
│   ├── generate-sitemap.js   # 4 sitemap files
│   └── push-content.ps1      # PowerShell helper
├── public/
│   ├── robots.txt
│   ├── CNAME
│   ├── favicon.svg
│   ├── sitemap.xml          # Index
│   ├── sitemap-main.xml
│   ├── sitemap-gallery.xml  # Image Search
│   └── sitemap-blog.xml
├── .github/workflows/deploy.yml
├── vite.config.js
├── package.json
└── .env.example
```

## SEO Strategy

- ✅ **sitemap index** with 3 sub-sitemaps
- ✅ **image sitemap** (Google Image Search)
- ✅ **7-language hreflang** on every URL
- ✅ **schema.org/ImageObject** on detail pages
- ✅ **WebSite + SearchAction** schema on home
- ✅ **Core Web Vitals** optimized (lazy load, WebP, gzip+brotli)
- ✅ **Multi-facet URLs** (`/gallery?model=mj&style=cyberpunk`) — every combination is an indexable URL
- ✅ **Static site** (fast TTFB)

## Compliance / AdSense

- ✅ Every prompt is **rewritten with original tutorial** (70%+ original content)
- ✅ Source attribution on every image (rel="nofollow" backlink)
- ✅ No NSFW content
- ✅ Original blog content (no spun text)
- ✅ Privacy/Terms/About pages

## Roadmap

- [x] MVP: 30+ prompts, 5 blog posts, 7 languages
- [ ] M2: 100+ prompts, tool reviews
- [ ] M3: Video tutorials
- [ ] M4: User accounts + favorites
- [ ] M5: Affiliate links (AI tool recommendations)

## License

Code: MIT
Content: All rewritten tutorials are original; original prompts are attributed to their authors and platforms.
