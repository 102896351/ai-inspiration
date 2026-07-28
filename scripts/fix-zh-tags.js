/**
 * 把 src/data/gallery/*.json 里所有 styles / useCases 的中文标签
 * 换成英文 slug（与 i18n 的 styleNames key 对齐）
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const GALLERY_DIR = path.join(__dirname, '..', 'src', 'data', 'gallery');

const STYLE_MAP = {
  '写实': 'realistic', '夜景': 'realistic', '人物': 'realistic', '风景': 'realistic',
  '插画': 'illustration', '扁平': 'illustration', '商业': 'illustration',
  '3D': '3d', '黏土': '3d', '皮克斯风': '3d',
  '动漫': 'anime', '二次元': 'anime', '日本动漫': 'anime',
  '概念设计': 'concept-art', '角色': 'concept-art', '场景': 'concept-art', '道具': 'concept-art', '载具': 'concept-art',
  '海报': 'poster', '电影': 'poster', '音乐': 'poster', '展览': 'poster', '复古海报': 'poster',
  '产品': 'product', '白底': 'product', '场景': 'product', '悬浮': 'product', '分解': 'product',
  '头像': 'avatar', '写实头像': 'avatar', '卡通风': 'avatar', '拟人': 'avatar', '情侣': 'avatar',
  '壁纸': 'wallpaper', '赛博朋克风': 'wallpaper', '极简': 'wallpaper', '抽象': 'wallpaper', '风景壁纸': 'wallpaper',
  '复古': 'vintage', '80s': 'vintage', '90s': 'vintage', 'Y2K': 'vintage', '蒸汽波': 'vintage',
  '极简': 'minimalist', '抽象': 'minimalist',
  '水彩': 'watercolor',
  '油画': 'oil-painting',
  'sci-fi': 'concept-art',
  'cartoon': 'illustration',
  '3d-render': '3d',
  'photorealistic': 'photorealistic',
  'anime': 'anime',
  'cyberpunk': 'cyberpunk'
};

const USECASE_MAP = {
  '电商': 'ecommerce', 'social-media': 'social-media', '社交媒体': 'social-media',
  '博客封面': 'blog-header', '营销海报': 'marketing', 'marketing': 'marketing',
  '头像': 'avatar', '壁纸': 'wallpaper', 'logo': 'logo', '产品图': 'product-shot',
  'logo 设计': 'logo', '儿童读物': 'blog-header', '广告 banner': 'marketing',
  '视频缩略图': 'social-media', '游戏概念': 'blog-header'
};

function mapValues(arr, map) {
  if (!Array.isArray(arr)) return arr;
  const seen = new Set();
  const result = [];
  for (const v of arr) {
    const mapped = map[v] || v;
    if (!seen.has(mapped)) {
      seen.add(mapped);
      result.push(mapped);
    }
  }
  return result;
}

let total = 0;
const files = fs.readdirSync(GALLERY_DIR).filter(f => f.endsWith('.json') && f !== 'index.json');
for (const f of files) {
  const p = path.join(GALLERY_DIR, f);
  const data = JSON.parse(fs.readFileSync(p, 'utf-8'));
  if (data.styles) data.styles = mapValues(data.styles, STYLE_MAP);
  if (data.useCases) data.useCases = mapValues(data.useCases, USECASE_MAP);
  if (data.tags) data.tags = mapValues(data.tags, STYLE_MAP);
  fs.writeFileSync(p, JSON.stringify(data, null, 2), 'utf-8');
  total++;
}

// 同步改 index.json
const indexPath = path.join(GALLERY_DIR, 'index.json');
const idx = JSON.parse(fs.readFileSync(indexPath, 'utf-8'));
for (const item of idx) {
  if (item.styles) item.styles = mapValues(item.styles, STYLE_MAP);
  if (item.useCases) item.useCases = mapValues(item.useCases, USECASE_MAP);
  if (item.tags) item.tags = mapValues(item.tags, STYLE_MAP);
}
fs.writeFileSync(indexPath, JSON.stringify(idx, null, 2), 'utf-8');

console.log(`✅ Fixed ${total + 1} files (${files.length} details + 1 index)`);
