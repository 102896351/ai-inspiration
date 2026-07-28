/**
 * Generate SVG covers for all gallery entries.
 * Replaces fake civitai.com placeholder URLs with locally-generated SVG art.
 *
 * Each cover:
 * - 1200x630 (16:9 hero / og:image ratio)
 * - Model-themed gradient background
 * - Title text (wrapped to 2-3 lines)
 * - Model badge (top-left)
 * - Style tag badges (bottom-left)
 * - 4-7 decorative shapes (deterministic from slug hash)
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '..');
const GALLERY_DIR = path.join(ROOT, 'src', 'data', 'gallery');
const COVERS_DIR = path.join(ROOT, 'public', 'covers');

// Theme per model: gradient stops + accent color
const MODEL_THEMES = {
  midjourney:        { bg1: '#ff6b35', bg2: '#7b2cbf', accent: '#ffd60a', text: '#ffffff' },
  'stable-diffusion':{ bg1: '#0a2463', bg2: '#1e6091', accent: '#7fb069', text: '#ffffff' },
  flux:              { bg1: '#2d6a4f', bg2: '#74c69d', accent: '#f4a261', text: '#ffffff' },
  ideogram:          { bg1: '#7b2cbf', bg2: '#c77dff', accent: '#ffffff', text: '#ffffff' },
  'dall-e':          { bg1: '#d62828', bg2: '#f77f00', accent: '#fcbf49', text: '#ffffff' },
  jimeng:            { bg1: '#9d0208', bg2: '#ffba08', accent: '#ffffff', text: '#ffffff' }
};

function hashSlug(slug) {
  let h = 5381;
  for (let i = 0; i < slug.length; i++) h = ((h << 5) + h + slug.charCodeAt(i)) | 0;
  return Math.abs(h);
}

function escapeXml(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

// Wrap text into up to 3 lines, max ~26 chars per line
function wrapText(text, maxLen = 26) {
  const words = text.split(/\s+/);
  const lines = [];
  let cur = '';
  for (const w of words) {
    if (!cur) { cur = w; continue; }
    if ((cur + ' ' + w).length > maxLen) {
      lines.push(cur);
      cur = w;
    } else {
      cur = cur + ' ' + w;
    }
    if (lines.length >= 2 && cur.length > maxLen) break;
  }
  if (cur) lines.push(cur);
  return lines.slice(0, 3);
}

function buildSvg(item) {
  const theme = MODEL_THEMES[item.model] || MODEL_THEMES.midjourney;
  const h = hashSlug(item.slug);
  const gradAngle = (h % 4) * 45; // 0/45/90/135

  const titleLines = wrapText(item.title || item.slug, 26);
  const styles = (item.styles || []).slice(0, 3);

  // Decorative shapes (deterministic, no two covers identical)
  const shapes = [];

  // 4-6 floating circles
  for (let i = 0; i < 5; i++) {
    const cx = 80 + ((h >> (i * 4)) & 0x3ff) % 1040;
    const cy = 60 + ((h >> (i * 4 + 8)) & 0x1ff) % 510;
    const r = 18 + ((h >> (i * 4 + 16)) & 0x3f);
    const op = 0.05 + (((h >> (i * 4 + 24)) & 0xf) / 200);
    shapes.push(`<circle cx="${cx}" cy="${cy}" r="${r}" fill="${theme.accent}" opacity="${op.toFixed(2)}"/>`);
  }

  // 3 diagonal lines / strokes
  for (let i = 0; i < 3; i++) {
    const x1 = ((h >> (i * 3)) & 0xfff) % 1100 + 50;
    const y1 = ((h >> (i * 3 + 8)) & 0x3ff) % 530 + 50;
    const len = 80 + ((h >> (i * 3 + 16)) & 0x7f);
    const ang = ((h >> (i * 3 + 24)) & 0x3) * 30;
    const op = 0.12 + (((h >> (i * 3 + 32)) & 0x7) / 40);
    const x2 = x1 + Math.cos(ang * Math.PI / 180) * len;
    const y2 = y1 + Math.sin(ang * Math.PI / 180) * len;
    shapes.push(`<line x1="${x1.toFixed(0)}" y1="${y1.toFixed(0)}" x2="${x2.toFixed(0)}" y2="${y2.toFixed(0)}" stroke="${theme.accent}" stroke-width="2.5" opacity="${op.toFixed(2)}" stroke-linecap="round"/>`);
  }

  // Title (centered vertically, 2-3 lines)
  const lineHeight = 64;
  const totalH = titleLines.length * lineHeight;
  const startY = 315 - (totalH / 2) + 10; // center around y=315
  const titleSvg = titleLines.map((l, i) => {
    const y = startY + (i + 1) * lineHeight;
    const fontSize = l.length > 30 ? 44 : l.length > 22 ? 52 : 58;
    return `<text x="600" y="${y}" font-family="Inter, -apple-system, Segoe UI, sans-serif" font-size="${fontSize}" font-weight="800" fill="${theme.text}" text-anchor="middle" letter-spacing="-1">${escapeXml(l)}</text>`;
  }).join('\n  ');

  // Model badge (top-left)
  const modelLabel = item.model.replace('-', ' ').toUpperCase();
  const modelSvg = `
  <rect x="50" y="50" width="${10 + modelLabel.length * 11}" height="42" rx="21" fill="rgba(0,0,0,0.25)" stroke="${theme.accent}" stroke-width="1.5" opacity="0.95"/>
  <text x="${50 + (10 + modelLabel.length * 11) / 2}" y="78" font-family="Inter, sans-serif" font-size="15" font-weight="700" fill="${theme.text}" text-anchor="middle" letter-spacing="2.5">${escapeXml(modelLabel)}</text>`;

  // Difficulty stars (top-right)
  const stars = '★'.repeat(item.difficulty || 3) + '☆'.repeat(5 - (item.difficulty || 3));
  const starsSvg = `<text x="1150" y="80" font-family="Inter, sans-serif" font-size="22" font-weight="700" fill="${theme.accent}" text-anchor="end" letter-spacing="2">${escapeXml(stars)}</text>`;

  // Style tag badges (bottom-left)
  const badgeY = 545;
  let badgesX = 50;
  const badgesSvg = styles.map((s) => {
    const label = s.toUpperCase();
    const w = 18 + label.length * 9;
    const svg = `<rect x="${badgesX}" y="${badgeY}" width="${w}" height="34" rx="17" fill="rgba(255,255,255,0.12)" stroke="rgba(255,255,255,0.35)" stroke-width="1"/>
  <text x="${badgesX + w / 2}" y="${badgeY + 22}" font-family="Inter, sans-serif" font-size="12" font-weight="600" fill="${theme.text}" text-anchor="middle" letter-spacing="1.8">${escapeXml(label)}</text>`;
    badgesX += w + 12;
    return svg;
  }).join('\n  ');

  // Brand (bottom-right)
  const brandSvg = `<text x="1150" y="600" font-family="Inter, sans-serif" font-size="14" font-weight="500" fill="${theme.text}" opacity="0.55" text-anchor="end" letter-spacing="1.5">aigallery.xyz · ${escapeXml(item.modelVersion || 'v6.1')}</text>`;

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 630" width="1200" height="630">
  <defs>
    <linearGradient id="bg" gradientTransform="rotate(${gradAngle} 0.5 0.5)">
      <stop offset="0%" stop-color="${theme.bg1}"/>
      <stop offset="100%" stop-color="${theme.bg2}"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#bg)"/>
  ${shapes.join('\n  ')}
  ${modelSvg}
  ${starsSvg}
  ${titleSvg}
  ${badgesSvg}
  ${brandSvg}
</svg>`;
}

async function main() {
  if (!fs.existsSync(COVERS_DIR)) fs.mkdirSync(COVERS_DIR, { recursive: true });

  const indexPath = path.join(GALLERY_DIR, 'index.json');
  const index = JSON.parse(fs.readFileSync(indexPath, 'utf-8'));

  console.log(`🎨 Generating covers for ${index.length} entries...\n`);

  let count = 0;
  let updated = 0;
  for (const item of index) {
    const svg = buildSvg(item);
    const filename = `${item.slug}.svg`;
    fs.writeFileSync(path.join(COVERS_DIR, filename), svg, 'utf-8');
    count++;

    const newCover = `covers/${filename}`;

    // Update in index
    if (item.cover !== newCover) { item.cover = newCover; updated++; }

    // Update in detail JSON
    const detailPath = path.join(GALLERY_DIR, `${item.slug}.json`);
    if (fs.existsSync(detailPath)) {
      const detail = JSON.parse(fs.readFileSync(detailPath, 'utf-8'));
      if (detail.cover !== newCover) {
        detail.cover = newCover;
        fs.writeFileSync(detailPath, JSON.stringify(detail, null, 2), 'utf-8');
      }
    }
  }

  // Write back index
  fs.writeFileSync(indexPath, JSON.stringify(index, null, 2), 'utf-8');

  // Stats
  const totalSize = fs.readdirSync(COVERS_DIR).reduce((s, f) => s + fs.statSync(path.join(COVERS_DIR, f)).size, 0);

  console.log(`  ✅ ${count} SVG covers written to ${COVERS_DIR}`);
  console.log(`  ✅ ${updated} cover paths updated (rest already had local path)`);
  console.log(`  📦 Total size: ${(totalSize / 1024).toFixed(1)} KB (avg ${(totalSize / count / 1024).toFixed(1)} KB per cover)`);
}

main().catch((e) => { console.error(e); process.exit(1); });
