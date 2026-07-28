/**
 * Lexica.art 数据抓取脚本
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
const RAW_DIR = path.join(__dirname, '..', 'raw_data');
const OUT_FILE = path.join(RAW_DIR, 'lexica-raw.json');

const API_BASE = 'https://lexica.art/api/v1/search';
const SEARCH_QUERIES = [
  'cyberpunk', 'portrait', 'anime girl', 'landscape',
  'product photography', 'logo', '3d render', 'watercolor',
  'minimalist', 'fantasy', 'sci-fi', 'street photography'
];
const PER_QUERY = 10;
const TARGET_COUNT = 60;

const HEADERS = {
  'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36',
  'Accept': 'application/json'
};

async function search(q) {
  const url = `${API_BASE}?q=${encodeURIComponent(q)}`;
  console.log(`[search] ${q}`);
  const res = await fetch(url, { headers: HEADERS });
  if (!res.ok) throw new Error(`HTTP ${res.status} for ${q}`);
  return res.json();
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
    height: item.height
  };
}

async function main() {
  console.log('🚀 Lexica fetch starting...\n');
  if (!fs.existsSync(RAW_DIR)) fs.mkdirSync(RAW_DIR, { recursive: true });

  const allItems = [];

  for (const q of SEARCH_QUERIES) {
    if (allItems.length >= TARGET_COUNT) break;
    try {
      const data = await search(q);
      const items = (Array.isArray(data) ? data : [])
        .filter(i => i.prompt && i.id)
        .slice(0, PER_QUERY)
        .map(i => normalize(i, q));
      allItems.push(...items);
      console.log(`  ✓ "${q}": ${items.length} (total ${allItems.length})`);
      await new Promise(r => setTimeout(r, 1000));
    } catch (e) {
      console.warn(`  ✗ "${q}": ${e.message}`);
    }
  }

  // 去重 by id
  const unique = Array.from(new Map(allItems.map(i => [i.id, i])).values());
  const final = unique.slice(0, TARGET_COUNT);

  fs.writeFileSync(OUT_FILE, JSON.stringify(final, null, 2), 'utf-8');
  console.log(`\n✅ Done. ${final.length} items saved to ${OUT_FILE}`);
  console.log('   Next step: npm run rewrite');
}

main().catch(e => {
  console.error('Fatal:', e);
  process.exit(1);
});
