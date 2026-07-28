/**
 * Sitemap 生成脚本
 *
 * 输出（Vite build 前生成到 public/，build 时复制到 dist/）：
 * 1. public/sitemap.xml          - sitemap index
 * 2. public/sitemap-main.xml     - 首页 + 静态页面
 * 3. public/sitemap-gallery.xml  - 所有图片详情页（最重要，Google Image Search 入口）
 * 4. public/sitemap-blog.xml     - 博客文章
 *
 * 每个 URL 含 7 个 hreflang（en/zh/ja/ko/fr/de/es + x-default）
 * 参考 toolbox168 多语言 sitemap 模式
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '..');
const PUBLIC_DIR = path.join(ROOT, 'public');
const GALLERY_DIR = path.join(ROOT, 'src', 'data', 'gallery');
const BLOG_DIR = path.join(ROOT, 'src', 'data', 'blog');

const SITE = 'https://aigallery.xyz';
const LANGS = ['en', 'zh', 'ja', 'ko', 'fr', 'de', 'es'];
const DEFAULT_LANG = 'en';

function today() {
  return new Date().toISOString().split('T')[0];
}

function urlEntry(loc, changefreq, priority, alternates = true) {
  let xml = '  <url>\n';
  xml += `    <loc>${loc}</loc>\n`;
  xml += `    <lastmod>${today()}</lastmod>\n`;
  xml += `    <changefreq>${changefreq}</changefreq>\n`;
  xml += `    <priority>${priority}</priority>\n`;
  if (alternates) {
    for (const lang of LANGS) {
      const altLoc = loc.replace(`/${DEFAULT_LANG}/`, `/${lang}/`);
      xml += `    <xhtml:link rel="alternate" hreflang="${lang}" href="${altLoc}" />\n`;
    }
    xml += `    <xhtml:link rel="alternate" hreflang="x-default" href="${loc}" />\n`;
  }
  xml += '  </url>\n';
  return xml;
}

function sitemapIndex(sitemaps) {
  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
  xml += '<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';
  for (const s of sitemaps) {
    xml += `  <sitemap>\n    <loc>${SITE}/${s}</loc>\n    <lastmod>${today()}</lastmod>\n  </sitemap>\n`;
  }
  xml += '</sitemapindex>\n';
  return xml;
}

function buildMainSitemap() {
  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
  xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n';
  xml += urlEntry(`${SITE}/#/${DEFAULT_LANG}/`, 'daily', '1.0');
  xml += urlEntry(`${SITE}/#/${DEFAULT_LANG}/gallery`, 'daily', '0.9');
  xml += urlEntry(`${SITE}/#/${DEFAULT_LANG}/tutorials`, 'weekly', '0.8');
  xml += urlEntry(`${SITE}/#/${DEFAULT_LANG}/tools`, 'weekly', '0.8');
  xml += urlEntry(`${SITE}/#/${DEFAULT_LANG}/blog`, 'weekly', '0.7');
  xml += '</urlset>\n';
  return xml;
}

function buildGallerySitemap() {
  if (!fs.existsSync(GALLERY_DIR)) return '<?xml version="1.0"?><urlset></urlset>';
  const files = fs.readdirSync(GALLERY_DIR).filter(f => f.endsWith('.json') && f !== 'index.json');

  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
  xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml"\n';
  xml += '        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">\n';

  for (const f of files) {
    const item = JSON.parse(fs.readFileSync(path.join(GALLERY_DIR, f), 'utf-8'));
    const slug = item.slug || f.replace('.json', '');
    const loc = `${SITE}/#/${DEFAULT_LANG}/gallery/${slug}`;
    xml += '  <url>\n';
    xml += `    <loc>${loc}</loc>\n`;
    xml += `    <lastmod>${today()}</lastmod>\n`;
    xml += '    <changefreq>monthly</changefreq>\n';
    xml += '    <priority>0.8</priority>\n';
    // ImageObject（Google Image Search 关键）
    if (item.cover) {
      xml += '    <image:image>\n';
      xml += `      <image:loc>${item.cover}</image:loc>\n`;
      xml += `      <image:title>${escapeXml(item.title || slug)}</image:title>\n`;
      xml += `      <image:caption>${escapeXml(item.description || '')}</image:caption>\n`;
      xml += '    </image:image>\n';
    }
    // hreflang
    for (const lang of LANGS) {
      const altLoc = loc.replace(`/${DEFAULT_LANG}/`, `/${lang}/`);
      xml += `    <xhtml:link rel="alternate" hreflang="${lang}" href="${altLoc}" />\n`;
    }
    xml += `    <xhtml:link rel="alternate" hreflang="x-default" href="${loc}" />\n`;
    xml += '  </url>\n';
  }
  xml += '</urlset>\n';
  return xml;
}

function buildBlogSitemap() {
  if (!fs.existsSync(BLOG_DIR)) return '<?xml version="1.0"?><urlset></urlset>';
  const files = fs.readdirSync(BLOG_DIR).filter(f => f.endsWith('.json'));

  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
  xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n';

  for (const f of files) {
    const slug = f.replace('.json', '');
    const loc = `${SITE}/#/${DEFAULT_LANG}/blog/${slug}`;
    xml += '  <url>\n';
    xml += `    <loc>${loc}</loc>\n`;
    xml += `    <lastmod>${today()}</lastmod>\n`;
    xml += '    <changefreq>monthly</changefreq>\n';
    xml += '    <priority>0.7</priority>\n';
    for (const lang of LANGS) {
      const altLoc = loc.replace(`/${DEFAULT_LANG}/`, `/${lang}/`);
      xml += `    <xhtml:link rel="alternate" hreflang="${lang}" href="${altLoc}" />\n`;
    }
    xml += `    <xhtml:link rel="alternate" hreflang="x-default" href="${loc}" />\n`;
    xml += '  </url>\n';
  }
  xml += '</urlset>\n';
  return xml;
}

function escapeXml(s) {
  return String(s).replace(/[<>&'"]/g, c => ({
    '<': '&lt;', '>': '&gt;', '&': '&amp;', "'": '&apos;', '"': '&quot;'
  }[c]));
}

function main() {
  console.log('🗺️  Generating sitemaps...\n');
  if (!fs.existsSync(PUBLIC_DIR)) fs.mkdirSync(PUBLIC_DIR, { recursive: true });

  // 4 个 sitemap 文件
  fs.writeFileSync(path.join(PUBLIC_DIR, 'sitemap.xml'), sitemapIndex(['sitemap-main.xml', 'sitemap-gallery.xml', 'sitemap-blog.xml']));
  console.log('  ✅ sitemap.xml (index)');

  fs.writeFileSync(path.join(PUBLIC_DIR, 'sitemap-main.xml'), buildMainSitemap());
  console.log('  ✅ sitemap-main.xml');

  const galleryXml = buildGallerySitemap();
  fs.writeFileSync(path.join(PUBLIC_DIR, 'sitemap-gallery.xml'), galleryXml);
  const galleryCount = (galleryXml.match(/<url>/g) || []).length;
  console.log(`  ✅ sitemap-gallery.xml (${galleryCount} URLs)`);

  const blogXml = buildBlogSitemap();
  fs.writeFileSync(path.join(PUBLIC_DIR, 'sitemap-blog.xml'), blogXml);
  const blogCount = (blogXml.match(/<url>/g) || []).length;
  console.log(`  ✅ sitemap-blog.xml (${blogCount} URLs)`);

  // robots.txt
  const robots = `User-agent: *\nAllow: /\n\nSitemap: ${SITE}/sitemap.xml\n`;
  fs.writeFileSync(path.join(PUBLIC_DIR, 'robots.txt'), robots);
  console.log('  ✅ robots.txt');

  console.log('\n🎉 All sitemaps generated');
}

main();
