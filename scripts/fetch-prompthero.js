/**
 * PromptHero 数据抓取脚本（v2：含图片下载 + 重试）
 *
 * 注意：
 * 1. 抓 metadata + 图片
 * 2. 下载到 public/covers/<slug>.<ext>
 * 3. 抓完会落到 raw_data/prompthero-raw.json，下一步改写
 * 4. 用户名/cookie 不抓（合规）
 *
 * 风险：
 * - PromptHero 没有公开 API
 * - HTML 解析脆弱，失败回退到首页推荐
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '..');
const RAW_DIR = path.join(ROOT, 'raw_data');
const COVERS_DIR = path.join(ROOT, 'public', 'covers');
const OUT_FILE = path.join(RAW_DIR, 'prompthero-raw.json');

const BASE_URL = 'https://prompthero.com';
const CATEGORIES = [
  { name: 'midjourney', model: 'midjourney', url: '/midjourney-prompts', limit: 30 },
  { name: 'stable-diffusion', model: 'stable-diffusion', url: '/stable-diffusion-prompts', limit: 25 },
  { name: 'flux', model: 'flux', url: '/flux-prompts', limit: 15 },
  { name: 'dall-e', model: 'dall-e', url: '/dalle-prompts', limit: 10 },
  { name: 'cyberpunk', model: 'midjourney', tag: 'cyberpunk', url: '/tag/cyberpunk', limit: 8 },
  { name: 'portrait', model: 'midjourney', tag: 'portrait', url: '/tag/portrait', limit: 8 },
  { name: 'anime', model: 'midjourney', tag: 'anime', url: '/tag/anime', limit: 8 }
];
const DETAIL_FETCH_PER_CAT = parseInt(process.env.DETAIL_FETCH || '15', 10);
const MAX_RETRIES = parseInt(process.env.MAX_RETRIES || '4', 10);
const DOWNLOAD_IMAGES = (process.env.DOWNLOAD_IMAGES || 'true') !== 'false';

const HEADERS = {
  'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
  'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/*,*/*;q=0.8',
  'Accept-Language': 'en-US,en;q=0.9,zh;q=0.8'
};

async function fetchWithRetry(url, options = {}) {
  let lastErr;
  for (let i = 0; i < MAX_RETRIES; i++) {
    try {
      const res = await fetch(url, {
        ...options,
        signal: AbortSignal.timeout(30000),
        headers: { ...HEADERS, ...(options.headers || {}) }
      });
      if (res.status === 429 || res.status >= 500) {
        const wait = Math.min(30000, 2000 * Math.pow(2, i));
        console.log(`  [retry ${i+1}/${MAX_RETRIES}] HTTP ${res.status}, waiting ${wait}ms`);
        await new Promise(r => setTimeout(r, wait));
        continue;
      }
      return res;
    } catch (e) {
      lastErr = e;
      const wait = Math.min(30000, 2000 * Math.pow(2, i));
      console.log(`  [retry ${i+1}/${MAX_RETRIES}] ${e.message.split('\n')[0]}, waiting ${wait}ms`);
      await new Promise(r => setTimeout(r, wait));
    }
  }
  throw lastErr;
}

async function fetchPage(url) {
  console.log(`[fetch] ${url}`);
  const res = await fetchWithRetry(url);
  if (!res.ok) throw new Error(`HTTP ${res.status} for ${url}`);
  return res.text();
}

function parseCards(html, source) {
  const items = [];
  const cardRegex = /<a[^>]+href="\/prompt\/([a-z0-9-]+)"[^>]*>[\s\S]*?<img[^>]+src="([^"]+)"[^>]*>[\s\S]*?<\/a>/gi;
  let m;
  const seen = new Set();
  while ((m = cardRegex.exec(html)) !== null) {
    const [, slug, imgUrl] = m;
    if (seen.has(slug)) continue;
    seen.add(slug);
    items.push({
      id: `prompthero-${slug}`,
      source: 'PromptHero',
      sourceUrl: `${BASE_URL}/prompt/${slug}`,
      imageUrl: imgUrl.startsWith('http') ? imgUrl : BASE_URL + imgUrl,
      author: 'unknown',
      model: source.model,
      tag: source.tag || ''
    });
    if (items.length >= source.limit) break;
  }
  return items;
}

async function fetchPromptDetail(item) {
  try {
    const html = await fetchPage(item.sourceUrl);
    // 提取 prompt 文本：尝试多种结构
    let promptText = '';
    const patterns = [
      /<div[^>]*class="[^"]*prompt[^"]*"[^>]*>([\s\S]*?)<\/div>/i,
      /<pre[^>]*class="[^"]*prompt[^"]*"[^>]*>([\s\S]*?)<\/pre>/i,
      /<textarea[^>]*class="[^"]*prompt[^"]*"[^>]*>([\s\S]*?)<\/textarea>/i
    ];
    for (const p of patterns) {
      const m = html.match(p);
      if (m) {
        promptText = m[1].replace(/<[^>]+>/g, '').trim();
        if (promptText.length > 10) break;
      }
    }
    // 提取作者
    const authorMatch = html.match(/by\s+<a[^>]+>([^<]+)<\/a>/i) || html.match(/@(\w+)/);
    if (authorMatch) {
      item.author = (authorMatch[1] || '').trim();
    }
    item.originalPrompt = promptText;
    item.fetchedAt = new Date().toISOString();
    return item;
  } catch (e) {
    console.warn(`[warn] Failed to fetch detail for ${item.sourceUrl}:`, e.message);
    return { ...item, originalPrompt: '' };
  }
}

function extFromUrl(url) {
  const m = url.match(/\.(jpe?g|png|webp)(\?|$)/i);
  return m ? '.' + m[1].toLowerCase() : '.webp';
}

async function downloadImage(imageUrl, destPath) {
  if (fs.existsSync(destPath)) {
    const stat = fs.statSync(destPath);
    if (stat.size > 1024) return true;
  }
  const res = await fetchWithRetry(imageUrl, {
    headers: { ...HEADERS, 'Accept': 'image/*' }
  });
  if (!res.ok) {
    console.warn(`  [warn] download HTTP ${res.status} for ${imageUrl.slice(0, 80)}`);
    return false;
  }
  const buf = Buffer.from(await res.arrayBuffer());
  if (buf.length < 1024) {
    console.warn(`  [warn] image too small (${buf.length}B)`);
    return false;
  }
  fs.writeFileSync(destPath, buf);
  return true;
}

async function main() {
  console.log('🚀 PromptHero fetch starting...\n');
  if (!fs.existsSync(RAW_DIR)) fs.mkdirSync(RAW_DIR, { recursive: true });
  if (!fs.existsSync(COVERS_DIR)) fs.mkdirSync(COVERS_DIR, { recursive: true });

  const allItems = [];

  for (const cat of CATEGORIES) {
    try {
      const url = BASE_URL + cat.url;
      const html = await fetchPage(url);
      const items = parseCards(html, cat);
      console.log(`  ✓ ${cat.name}: ${items.length} cards`);
      // 抓详情（详情页数提升到 DETAIL_FETCH）
      const detailCount = Math.min(items.length, DETAIL_FETCH_PER_CAT);
      for (let i = 0; i < detailCount; i++) {
        await new Promise(r => setTimeout(r, 800));
        await fetchPromptDetail(items[i]);
      }
      allItems.push(...items);
    } catch (e) {
      console.error(`  ✗ ${cat.name}: ${e.message}`);
    }
  }

  const unique = Array.from(new Map(allItems.map(i => [i.id, i])).values());

  // 下载有 prompt 详情的图片
  if (DOWNLOAD_IMAGES) {
    console.log(`\n📥 Downloading images to ${COVERS_DIR}...`);
    let dlOk = 0, dlFail = 0;
    for (const item of unique) {
      if (!item.originalPrompt) continue;
      const ext = extFromUrl(item.imageUrl);
      const dest = path.join(COVERS_DIR, `${item.id}${ext}`);
      try {
        const ok = await downloadImage(item.imageUrl, dest);
        if (ok) {
          item.localCover = path.relative(ROOT, dest).replace(/\\/g, '/');
          dlOk++;
        } else {
          dlFail++;
        }
        await new Promise(r => setTimeout(r, 400));
      } catch (e) {
        console.warn(`  [warn] ${item.id}: ${e.message}`);
        dlFail++;
      }
    }
    console.log(`  Downloaded ${dlOk} OK, ${dlFail} failed`);
  }

  fs.writeFileSync(OUT_FILE, JSON.stringify(unique, null, 2), 'utf-8');
  console.log(`\n✅ Done. ${unique.length} items saved to ${OUT_FILE}`);
  console.log('   Next step: npm run rewrite');
}

main().catch(e => {
  console.error('Fatal:', e);
  process.exit(1);
});