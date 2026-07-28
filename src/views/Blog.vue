<template>
  <div class="blog">
    <div class="container">
      <header class="page-header">
        <h1>{{ $t('blog.title') }}</h1>
        <p>{{ $t('blog.sub') }}</p>
      </header>

      <div class="blog-grid">
        <article v-for="post in posts" :key="post.id" class="post-card">
          <router-link :to="`/blog/${post.slug}`" class="post-link">
            <div class="post-cover">
              <img :src="post.cover" :alt="post.title" loading="lazy" />
            </div>
            <div class="post-body">
              <div class="post-meta">
                <span class="cat-badge">{{ post.category }}</span>
                <span class="date">{{ post.date }}</span>
                <span class="read-time">{{ post.readTime }} min</span>
              </div>
              <h2>{{ post.title }}</h2>
              <p>{{ post.excerpt }}</p>
            </div>
          </router-link>
        </article>
      </div>
    </div>
  </div>
</template>

<script setup>
const posts = [
  { id: 1, slug: 'best-ai-image-generators-2025', title: 'Best AI Image Generators 2025: Complete Comparison', excerpt: 'Compare Midjourney, Stable Diffusion, Flux, DALL-E 3 side by side.', cover: '/images/blog/best-ai-generators-2025-hero.webp', category: 'Comparison', date: '2025-07-15', readTime: 12 },
  { id: 2, slug: 'midjourney-parameters-explained', title: 'Midjourney Parameters Explained: A Practical Guide', excerpt: 'Master --ar, --s, --c, --q, --v and more with examples.', cover: '/images/blog/mj-params-hero.webp', category: 'Tutorial', date: '2025-07-10', readTime: 15 },
  { id: 3, slug: 'cyberpunk-prompt-guide', title: 'Cyberpunk Prompt Guide: 30+ Examples That Work', excerpt: 'Recreate the neon-soaked cyberpunk aesthetic with copy-paste prompts.', cover: '/images/blog/cyberpunk-hero.webp', category: 'Style Guide', date: '2025-07-05', readTime: 10 },
  { id: 4, slug: 'ai-image-statistics-2025', title: 'AI Image Generation in 2025: Stats You Should Know', excerpt: 'The numbers behind the AI art revolution.', cover: '/images/blog/ai-stats-hero.webp', category: 'Data', date: '2025-06-28', readTime: 8 },
  { id: 5, slug: 'product-photography-ai', title: 'Product Photography with AI: Replace Stock Photos', excerpt: 'How to use AI for e-commerce hero shots and lifestyle imagery.', cover: '/images/blog/product-photo-hero.webp', category: 'Tutorial', date: '2025-06-20', readTime: 14 }
];
</script>

<style scoped>
.page-header { text-align: center; margin-bottom: 48px; }
.page-header h1 { font-size: 36px; margin-bottom: 8px; }
.page-header p { color: var(--color-text-dim); }

.blog-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); gap: 24px; }
.post-card { background: var(--color-surface); border: 1px solid var(--color-border); border-radius: var(--radius); overflow: hidden; transition: var(--transition); box-shadow: var(--shadow-sm); }
.post-card:hover { transform: translateY(-4px); border-color: var(--color-primary); box-shadow: var(--shadow-md); }
.post-link { color: var(--color-text); display: block; }
.post-link:hover { color: var(--color-text); }
.post-cover { aspect-ratio: 16/9; overflow: hidden; background: var(--color-bg); }
.post-cover img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.3s; }
.post-card:hover .post-cover img { transform: scale(1.05); }
.post-body { padding: 20px; }
.post-meta { display: flex; gap: 8px; font-size: 12px; color: var(--color-text-dim); margin-bottom: 12px; align-items: center; }
.cat-badge { padding: 3px 10px; background: var(--color-primary); color: white; border-radius: 12px; font-weight: 600; }
.post-body h2 { font-size: 18px; margin-bottom: 8px; line-height: 1.3; color: var(--color-text-strong); }
.post-body p { color: var(--color-text-dim); font-size: 14px; line-height: 1.5; }
</style>
