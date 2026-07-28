/**
 * 图片 sitemap 单独生成（已包含在 generate-sitemap.js 里）
 * 这里保留 placeholder 以便扩展
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '..');

console.log('ℹ️  Image sitemap is part of sitemap-gallery.xml');
console.log('   Run: npm run sitemap');
