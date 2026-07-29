/**
 * Lexica.art 数据抓取脚本（v2：含图片下载 + 重试）
 *
 * 优势：Lexica 有非官方但稳定的 API
 * Endpoint: https://lexica.art/api/v1/search?q=cyberpunk
 *
 * 注：Lexica 已经式微，主要抓 SD 时代的 prompt
 * 但作为补全 SD 方向的内容源还是有价值
 *
 * 合规：
 * - 标注 Lexica + 原作者
 * - 不抓 SD 模型 checkpoint 引用（避免复杂版权）
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '..');
const RAW_DIR = path.join(ROOT, 'raw_data');
const COVERS_DIR = path.join(ROOT, 'public', 'covers');
const OUT_FILE = path.join(RAW_DIR, 'lexica-raw.json');

const API_BASE = 'https://lexica.art/api/v1/search';
const SEARCH_QUERIES = [
  'cyberpunk', 'portrait', 'anime girl', 'landscape'
];
const PER_QUERY = parseInt(process.env.PER_QUERY || '10', 10);
const TARGET_COUNT = parseInt(process.env.LEXICA_TARGET || '10', 10);
const MAX_RETRIES = parseInt(process.env.MAX_RETRIES || '4', 10);
const RATE_LIMIT_MS = parseInt(process.env.RATE_LIMIT_MS || '1000', 10);
const DOWNLOAD_IMAGES = (process.env.DOWNLOAD_IMAGES || 'true') !== 'false';

const HEADERS = {
  'User-Agent': 'AIGallery-Fetcher/0.2 (educational; +https://aigallery.xyz/about)',
  'Accept': 'application/json,image/*'
};

async function fetchWithRetry(url, options = {}) {
  let lastErr;
  for (let i = 0; i < MAX_RETRIES; i++) {
    try {
      const res = await fetch(url, {
        ...options,
        signal: AbortSignal.timeout(30000)
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
  throw lastErr || new Error(`fetch failed after ${MAX_RETRIES} retries`);
}

async function search(q) {
  const url = `${API_BASE}?q=${encodeURIComponent(q)}`;
  console.log(`[search] ${q}`);
  const res = await fetchWithRetry(url, { headers: HEADERS });
  if (!res.ok) throw new Error(`HTTP ${res.status} for ${q}`);
  return res.json();
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

function normalize(item, query) {
  return {
    id: `lexica-${item.id}`,
    source: 'Lexica',
    sourceUrl: `https://lexica.art/prompt/${item.id}`,
    imageUrl: item.srcSmall || item.src || item.imageUrl,
    author: 'unknown',
    model: 'stable-diffusion',
    originalPrompt: item.prompt || '',
    originalNegativePrompt: '',
    originalParams: `seed:${item.seed || ''} width:${item.width || ''} height:${item.height || ''}`.trim(),
    query,
    width: item.width,
    height: item.height,
    fetchedAt: new Date().toISOString()
  };
}

async function main() {
  console.log('🚀 Lexica fetch starting...\n');
  if (!fs.existsSync(RAW_DIR)) fs.mkdirSync(RAW_DIR, { recursive: true });
  if (!fs.existsSync(COVERS_DIR)) fs.mkdirSync(COVERS_DIR, { recursive: true });

  const allItems = [];

  for (const q of SEARCH_QUERIES) {
    if (allItems.length >= TARGET_COUNT) {
      console.log(`  [skip "${q}"] already at target ${TARGET_COUNT}`);
      break;
    }
    try {
      const data = await search(q);
      const rawLen = Array.isArray(data) ? data.length : 0;
      const items = (Array.isArray(data) ? data : [])
        .filter(i => i.prompt && i.id)
        .slice(0, PER_QUERY)
        .map(i => normalize(i, q));
      allItems.push(...items);
      console.log(`  ✓ "${q}": ${items.length}/${rawLen} raw (total ${allItems.length})`);
      await new Promise(r => setTimeout(r, RATE_LIMIT_MS));
    } catch (e) {
      console.warn(`  ✗ "${q}": ${e.message}`);
    }
  }

  const unique = Array.from(new Map(allItems.map(i => [i.id, i])).values());
  const final = unique.slice(0, TARGET_COUNT);

  if (DOWNLOAD_IMAGES) {
    console.log(`\n📥 Downloading images to ${COVERS_DIR}...`);
    let dlOk = 0, dlFail = 0;
    for (const item of final) {
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
        await new Promise(r => setTimeout(r, 250));
      } catch (e) {
        console.warn(`  [warn] ${item.id}: ${e.message}`);
        dlFail++;
      }
    }
    console.log(`  Downloaded ${dlOk} OK, ${dlFail} failed`);
  }

  fs.writeFileSync(OUT_FILE, JSON.stringify(final, null, 2), 'utf-8');
  console.log(`\n✅ Done. ${final.length} items saved to ${OUT_FILE}`);
  console.log('   Next step: npm run rewrite');
}

main().catch(e => {
  console.error('Fatal:', e);
  process.exit(1);
});