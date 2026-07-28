/**
 * Civitai 数据抓取脚本
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
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const RAW_DIR = path.join(__dirname, '..', 'raw_data');
const OUT_FILE = path.join(RAW_DIR, 'civitai-raw.json');

const API_BASE = 'https://civitai.com/api/v1';
const TARGET_COUNT = 80;
const PER_PAGE = 100;

const FETCH_CONFIG = {
  sort: 'Most Reactions',
  period: 'Month',
  nsfw: 'None',         // 关键：只抓安全内容
  batchSize: PER_PAGE
};

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
  const res = await fetch(url, {
    headers: {
      'User-Agent': 'AIGallery-Fetcher/0.1 (educational; +https://aigallery.xyz/about)'
    }
  });
  if (!res.ok) {
    const body = await res.text();
    throw new Error(`HTTP ${res.status}: ${body.slice(0, 200)}`);
  }
  return res.json();
}

function normalize(item) {
  // 推断模型（基于 Civitai 返回的字段）
  let model = 'stable-diffusion';
  if (item.baseModel) {
    if (item.baseModel.toLowerCase().includes('flux')) model = 'flux';
    else if (item.baseModel.toLowerCase().includes('sdxl')) model = 'stable-diffusion';
    else if (item.baseModel.toLowerCase().includes('sd 1')) model = 'stable-diffusion';
    else if (item.baseModel.toLowerCase().includes('pony')) model = 'stable-diffusion';
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
    }
  };
}

async function main() {
  console.log('🚀 Civitai fetch starting (official API)...\n');
  if (!fs.existsSync(RAW_DIR)) fs.mkdirSync(RAW_DIR, { recursive: true });

  const allItems = [];
  let cursor = null;
  let page = 0;

  while (allItems.length < TARGET_COUNT) {
    page++;
    try {
      const data = await fetchPage(cursor);
      const items = (data.items || []).map(normalize).filter(i => i.originalPrompt);
      allItems.push(...items);
      console.log(`  page ${page}: +${items.length} (total ${allItems.length})`);

      // Civitai 分页：nextCursor 字段
      cursor = data.metadata?.nextCursor;
      if (!cursor) {
        console.log('  no more pages');
        break;
      }
      // Rate limit
      await new Promise(r => setTimeout(r, 1500));
    } catch (e) {
      console.error(`  ✗ page ${page}: ${e.message}`);
      break;
    }
  }

  // 截断到目标数
  const final = allItems.slice(0, TARGET_COUNT);
  fs.writeFileSync(OUT_FILE, JSON.stringify(final, null, 2), 'utf-8');
  console.log(`\n✅ Done. ${final.length} items saved to ${OUT_FILE}`);
  console.log('   Next step: npm run rewrite');
}

main().catch(e => {
  console.error('Fatal:', e);
  process.exit(1);
});
