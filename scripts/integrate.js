/**
 * 集成脚本
 *
 * 把 rewritten_data/ 下的内容集成到 src/data/gallery/
 * 生成：
 * 1. src/data/gallery/index.json    - 所有图片元数据（前端用）
 * 2. src/data/gallery/{id}.json      - 单图详情
 * 3. src/data/blog/*.json            - 博客文章
 *
 * 数据 schema 统一为前端期望的格式
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '..');
const REWRITTEN_DIR = path.join(ROOT, 'rewritten_data');
const GALLERY_DIR = path.join(ROOT, 'src', 'data', 'gallery');
const BLOG_DIR = path.join(ROOT, 'src', 'data', 'blog');
const INDEX_FILE = path.join(GALLERY_DIR, 'index.json');

const SITE_BASE = 'https://aigallery.xyz';

function ensureDir(d) {
  if (!fs.existsSync(d)) fs.mkdirSync(d, { recursive: true });
}

function pickCover(item) {
  // 优先用原图（外链），降级用本地 placeholder
  return item.imageUrl || '/images/placeholder.webp';
}

function normalizeItem(item) {
  return {
    id: item.id,
    slug: item.slug || slugify(item.title || item.id),
    title: item.title || 'Untitled',
    description: item.description || '',
    cover: pickCover(item),
    model: item.model || 'midjourney',
    modelVersion: item.modelVersion || '',
    styles: item.styles || [],
    useCases: item.useCases || [],
    difficulty: typeof item.difficulty === 'number' ? item.difficulty : 3,
    tags: item.tags || [],

    // 完整 prompt 信息
    prompt: {
      main: item.rewrite_prompt || item.originalPrompt || '',
      negative: item.rewrite_negative || item.originalNegativePrompt || '',
      params: item.originalParams || '',
      explained: item.params_explained || []
    },

    // 教程
    tutorial: item.tutorial || null,

    // 跨模型
    crossModel: item.cross_model || null,

    // FAQ
    faq: item.faq || [],

    // 来源（合规标注）
    source: {
      site: item.source || '',
      url: item.sourceUrl || '',
      author: item.author || 'unknown'
    },

    // 时间戳
    createdAt: new Date().toISOString()
  };
}

function slugify(s) {
  return String(s)
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 60);
}

function loadAllRewritten() {
  if (!fs.existsSync(REWRITTEN_DIR)) {
    console.log('❌ rewritten_data/ not found. Run: npm run rewrite first');
    return [];
  }
  const files = fs.readdirSync(REWRITTEN_DIR).filter(f => f.endsWith('-rewritten.json'));
  const all = [];
  for (const f of files) {
    const items = JSON.parse(fs.readFileSync(path.join(REWRITTEN_DIR, f), 'utf-8'));
    all.push(...items);
  }
  return all;
}

function main() {
  console.log('🔧 Integrating content to src/data/...\n');
  ensureDir(GALLERY_DIR);
  ensureDir(BLOG_DIR);

  const raw = loadAllRewritten();
  if (raw.length === 0) {
    console.log('No rewritten data. Exiting.');
    return;
  }

  const items = raw.map(normalizeItem);

  // 1. 写 index.json
  const indexData = items.map(it => ({
    id: it.id,
    slug: it.slug,
    title: it.title,
    cover: it.cover,
    model: it.model,
    styles: it.styles,
    useCases: it.useCases,
    difficulty: it.difficulty,
    tags: it.tags,
    description: it.description
  }));
  fs.writeFileSync(INDEX_FILE, JSON.stringify(indexData, null, 2), 'utf-8');
  console.log(`  ✅ index.json: ${indexData.length} items`);

  // 2. 写每个详情文件
  for (const it of items) {
    const detailPath = path.join(GALLERY_DIR, `${it.slug}.json`);
    fs.writeFileSync(detailPath, JSON.stringify(it, null, 2), 'utf-8');
  }
  console.log(`  ✅ ${items.length} detail JSONs in src/data/gallery/`);

  // 3. 简单统计
  const stats = {
    byModel: {},
    byStyle: {},
    byDifficulty: {}
  };
  for (const it of items) {
    stats.byModel[it.model] = (stats.byModel[it.model] || 0) + 1;
    for (const s of it.styles) {
      stats.byStyle[s] = (stats.byStyle[s] || 0) + 1;
    }
    stats.byDifficulty[it.difficulty] = (stats.byDifficulty[it.difficulty] || 0) + 1;
  }
  console.log('\n📊 Stats:');
  console.log('  Models:', JSON.stringify(stats.byModel));
  console.log('  Top 5 styles:', JSON.stringify(Object.entries(stats.byStyle).sort((a, b) => b[1] - a[1]).slice(0, 5)));
  console.log('  Difficulty:', JSON.stringify(stats.byDifficulty));

  console.log('\n✅ Integration done. Next: npm run sitemap && npm run build');
}

main();
