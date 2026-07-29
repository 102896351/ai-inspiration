/**
 * Civitai 数据抓取脚本（v2：含图片下载 + 重试）
 *
 * 优势：Civitai 有官方 API（无需解析 HTML）
 * 文档：https://developer.civitai.com/docs/api/public-rest
 *
 * API endpoint:
 * GET https://civitai.com/api/v1/images?limit=100&sort=Most+Reactions&period=AllTime
 *
 * 字段：
 * - id, url, hash, width, height
 * - meta.prompt, meta.negativePrompt, meta.steps, meta.sampler, etc.
 * - modelVersionId, modelName
 * - creatorUsername
 * - nsfw (bool)
 *
 * 合规：
 * - 只抓 NSFW=false
 * - 标注 Civitai + author
 * - 商用遵守 Civitai ToS
 * - 图片下载到 public/covers/<slug>.<ext>
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '..');
const RAW_DIR = path.join(ROOT, 'raw_data');
const COVERS_DIR = path.join(ROOT, 'public', 'covers');
const OUT_FILE = path.join(RAW_DIR, 'civitai-raw.json');

const API_BASE = 'https://civitai.com/api/v1';
const TARGET_COUNT = parseInt(process.env.CIVITAI_TARGET || '10', 10);
const PER_PAGE = 100;
const MAX_RETRIES = parseInt(process.env.MAX_RETRIES || '3', 10);
const RATE_LIMIT_MS = parseInt(process.env.RATE_LIMIT_MS || '1500', 10);
const DOWNLOAD_IMAGES = (process.env.DOWNLOAD_IMAGES || 'true') !== 'false';
const MAX_PAGES = parseInt(process.env.MAX_PAGES || '10', 10);  // 硬上限：最多翻 10 页
const MAX_EMPTY_PAGES = parseInt(process.env.MAX_EMPTY_PAGES || '2', 10);  // 连续 2 页空就停

const FETCH_CONFIG = {
  sort: process.env.CIVITAI_SORT || 'Newest',  // Most Reactions 在 Month 窗口下曾返回空数组
  period: process.env.CIVITAI_PERIOD || 'AllTime',  // 默认 AllTime 更稳
  nsfw: 'None',         // 关键：只抓安全内容
  batchSize: PER_PAGE
};

// 指数退避的 fetch 包装
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
  throw lastErr || new Error(`fetch failed after ${MAX_RETRIES} retries: ${url}`);
}

async function fetchPage(cursor) {
  const params = new URLSearchParams({
    limit: PER_PAGE,
    sort: FETCH_CONFIG.sort,
    period: FETCH_CONFIG.period,
    nsfw: FETCH_CONFIG.nsfw,
    ...(cursor ? { cursor: String(cursor) } : {})
  });
  const url = `${API_BASE}/images?${params}`;
  console.log(`[fetch] ${url}`);
  const res = await fetchWithRetry(url, {
    headers: {
      'User-Agent': 'AIGallery-Fetcher/0.2 (educational; +https://aigallery.xyz/about)'
    }
  });
  if (!res.ok) {
    const body = await res.text();
    throw new Error(`HTTP ${res.status}: ${body.slice(0, 200)}`);
  }
  return res.json();
}

// 下载单张图片
async function downloadImage(imageUrl, destPath) {
  if (fs.existsSync(destPath)) {
    const stat = fs.statSync(destPath);
    if (stat.size > 1024) {
      console.log(`  [skip] ${path.basename(destPath)} already exists (${stat.size}B)`);
      return true;
    }
  }
  const res = await fetchWithRetry(imageUrl, {
    headers: {
      'User-Agent': 'AIGallery-Fetcher/0.2 (educational; +https://aigallery.xyz/about)',
      'Accept': 'image/webp,image/png,image/jpeg,image/*',
      'Referer': 'https://civitai.com/'
    }
  });
  if (!res.ok) {
    console.warn(`  [warn] download HTTP ${res.status} for ${imageUrl.slice(0, 80)}`);
    return false;
  }
  const buf = Buffer.from(await res.arrayBuffer());
  if (buf.length < 1024) {
    console.warn(`  [warn] image too small (${buf.length}B), likely invalid`);
    return false;
  }
  fs.writeFileSync(destPath, buf);
  return true;
}

// 从 URL 推断扩展名
function extFromUrl(url) {
  const m = url.match(/\.(jpe?g|png|webp|gif)(\?|$)/i);
  return m ? '.' + m[1].toLowerCase() : '.webp';
}

function normalize(item) {
  // 推断模型（基于 Civitai 返回的字段）
  let model = 'stable-diffusion';
  if (item.baseModel) {
    const bm = item.baseModel.toLowerCase();
    if (bm.includes('flux')) model = 'flux';
    else if (bm.includes('sdxl')) model = 'stable-diffusion';
    else if (bm.includes('sd 1')) model = 'stable-diffusion';
    else if (bm.includes('pony')) model = 'stable-diffusion';
  }

  // 推断 prompt 参数
  const params = [];
  if (item.meta?.steps) params.push(`--steps ${item.meta.steps}`);
  if (item.meta?.cfgScale) params.push(`--cfg ${item.meta.cfgScale}`);
  if (item.meta?.sampler) params.push(`--sampler ${item.meta.sampler}`);
  if (item.meta?.seed) params.push(`--seed ${item.meta.seed}`);
  if (item.width && item.height) {
    const ratio = item.width / item.height;
    if (Math.abs(ratio - 16/9) < 0.05) params.push('--ar 16:9');
    else if (Math.abs(ratio - 1) < 0.05) params.push('--ar 1:1');
    else if (Math.abs(ratio - 4/3) < 0.05) params.push('--ar 4:3');
  }

  return {
    id: `civitai-${item.id}`,
    source: 'Civitai',
    sourceUrl: `https://civitai.com/images/${item.id}`,
    imageUrl: item.url,
    author: item.creatorUsername || 'unknown',
    model,
    originalPrompt: item.meta?.prompt || '',
    originalNegativePrompt: item.meta?.negativePrompt || '',
    originalParams: params.join(' '),
    width: item.width,
    height: item.height,
    stats: {
      reactions: item.stats?.likeCount || 0,
      comments: item.stats?.commentCount || 0,
      downloads: item.stats?.downloadCount || 0
    },
    fetchedAt: new Date().toISOString()
  };
}

async function main() {
  console.log('🚀 Civitai fetch starting (official API)...\n');
  if (!fs.existsSync(RAW_DIR)) fs.mkdirSync(RAW_DIR, { recursive: true });
  if (!fs.existsSync(COVERS_DIR)) fs.mkdirSync(COVERS_DIR, { recursive: true });

  const allItems = [];
  let cursor = null;
  let page = 0;
  let emptyPages = 0;

  while (allItems.length < TARGET_COUNT) {
    page++;
    // 硬上限：避免 API 一直返回空数据导致死循环
    if (page > MAX_PAGES) {
      console.log(`  stop: hit MAX_PAGES=${MAX_PAGES}`);
      break;
    }
    try {
      const data = await fetchPage(cursor);
      const rawItems = data.items || [];
      const items = rawItems
        .map(normalize)
        .filter(i => i.originalPrompt && i.originalPrompt.length > 10);
      allItems.push(...items);
      console.log(`  page ${page}: +${items.length}/${rawItems.length} (total ${allItems.length})`);

      cursor = data.metadata?.nextCursor;
      // 检测：连续空页 / 总空页 / 已到底 → 退出
      if (rawItems.length === 0) {
        emptyPages++;
        console.log(`  empty page (${emptyPages}/${MAX_EMPTY_PAGES})`);
      } else {
        emptyPages = 0;
      }
      if (emptyPages >= MAX_EMPTY_PAGES) {
        console.log(`  stop: ${MAX_EMPTY_PAGES} consecutive empty pages`);
        break;
      }
      if (!cursor) {
        console.log('  stop: no more cursor (last page)');
        break;
      }
      await new Promise(r => setTimeout(r, RATE_LIMIT_MS));
    } catch (e) {
      console.error(`  ✗ page ${page}: ${e.message}`);
      break;
    }
  }

  const final = allItems.slice(0, TARGET_COUNT);

  // 下载图片（如果启用）
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
        await new Promise(r => setTimeout(r, 300));
      } catch (e) {
        console.warn(`  [warn] ${item.id}: ${e.message}`);
        dlFail++;
      }
    }
    console.log(`  Downloaded ${dlOk} OK, ${dlFail} failed`);
  }

  fs.writeFileSync(OUT_FILE, JSON.stringify(final, null, 2), 'utf-8');
  console.log(`\n✅ Done. ${final.length} items saved to ${OUT_FILE}`);
  if (DOWNLOAD_IMAGES) {
    console.log(`   Images in ${COVERS_DIR}/`);
  }
  console.log('   Next step: npm run rewrite');
}

main().catch(e => {
  console.error('Fatal:', e);
  process.exit(1);
});