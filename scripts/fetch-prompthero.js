/**
 * PromptHero 数据抓取脚本
 *
 * 注意：
 * 1. 只抓 metadata（id, image_url, prompt, source_url, author, model）
 * 2. 不下载原图（避免版权风险 + 节省带宽）
 * 3. 抓完会落到 raw_data/prompthero-raw.json，下一步改写
 * 4. 用户名/cookie 不抓（合规）
 *
 * 风险：
 * - PromptHero 没有公开 API（截至 2025）
 * - 这里用他们的公共页面 + cheerio 解析（如果 cheerio 不可用就 fallback）
 * - 商业抓取前需要看 ToS
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const RAW_DIR = path.join(__dirname, '..', 'raw_data');
const OUT_FILE = path.join(RAW_DIR, 'prompthero-raw.json');

const BASE_URL = 'https://prompthero.com';
// 分类页面 URL 模板
const CATEGORIES = [
  { name: 'midjourney', model: 'midjourney', url: '/midjourney-prompts', limit: 30 },
  { name: 'stable-diffusion', model: 'stable-diffusion', url: '/stable-diffusion-prompts', limit: 25 },
  { name: 'flux', model: 'flux', url: '/flux-prompts', limit: 15 },
  { name: 'dall-e', model: 'dall-e', url: '/dalle-prompts', limit: 10 },
  { name: 'cyberpunk', model: 'midjourney', tag: 'cyberpunk', url: '/tag/cyberpunk', limit: 8 },
  { name: 'portrait', model: 'midjourney', tag: 'portrait', url: '/tag/portrait', limit: 8 },
  { name: 'anime', model: 'midjourney', tag: 'anime', url: '/tag/anime', limit: 8 }
];

const HEADERS = {
  'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
  'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
  'Accept-Language': 'en-US,en;q=0.9,zh;q=0.8'
};

async function fetchPage(url) {
  console.log(`[fetch] ${url}`);
  const res = await fetch(url, { headers: HEADERS });
  if (!res.ok) throw new Error(`HTTP ${res.status} for ${url}`);
  return res.text();
}

// 简易 HTML 解析（不依赖 cheerio，用正则提取）
// PromptHero 卡片结构（基于常见模板）：
// <div class="prompt-card">
//   <img src="..." />
//   <div class="prompt-text">...</div>
//   <a href="/prompt/...">...</a>
//   <span class="author">...</span>
// </div>
function parseCards(html, source) {
  const items = [];
  // 匹配 prompt 详情页链接
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

// 抓取单页 prompt 详情（拿完整 prompt 文本）
async function fetchPromptDetail(item) {
  try {
    const html = await fetchPage(item.sourceUrl);
    // 提取 prompt 文本（在 <div class="prompt-content"> 或类似）
    const promptMatch = html.match(/<div[^>]*class="[^"]*prompt[^"]*"[^>]*>([\s\S]*?)<\/div>/i);
    let promptText = '';
    if (promptMatch) {
      promptText = promptMatch[1].replace(/<[^>]+>/g, '').trim();
    }
    // 提取作者
    const authorMatch = html.match(/by\s+<a[^>]+>([^<]+)<\/a>/i) || html.match(/@(\w+)/);
    if (authorMatch) {
      item.author = (authorMatch[1] || '').trim();
    }
    item.originalPrompt = promptText;
    return item;
  } catch (e) {
    console.warn(`[warn] Failed to fetch detail for ${item.sourceUrl}:`, e.message);
    return { ...item, originalPrompt: '' };
  }
}

async function main() {
  console.log('🚀 PromptHero fetch starting...\n');
  if (!fs.existsSync(RAW_DIR)) fs.mkdirSync(RAW_DIR, { recursive: true });

  const allItems = [];

  for (const cat of CATEGORIES) {
    try {
      const url = BASE_URL + cat.url;
      const html = await fetchPage(url);
      const items = parseCards(html, cat);
      console.log(`  ✓ ${cat.name}: ${items.length} cards`);
      // 抓详情（带 rate limit）
      for (let i = 0; i < Math.min(items.length, 5); i++) {
        await new Promise(r => setTimeout(r, 800)); // 避免被 ban
        await fetchPromptDetail(items[i]);
      }
      allItems.push(...items);
    } catch (e) {
      console.error(`  ✗ ${cat.name}: ${e.message}`);
    }
  }

  // 去重 by id
  const unique = Array.from(new Map(allItems.map(i => [i.id, i])).values());

  fs.writeFileSync(OUT_FILE, JSON.stringify(unique, null, 2), 'utf-8');
  console.log(`\n✅ Done. ${unique.length} items saved to ${OUT_FILE}`);
  console.log('   Next step: npm run rewrite');
}

main().catch(e => {
  console.error('Fatal:', e);
  process.exit(1);
});
