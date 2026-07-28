<template>
  <div class="blog-post">
    <div class="container">
      <article v-if="post" class="post-content">
        <header class="post-header">
          <div class="post-meta">
            <span class="cat-badge">{{ post.category }}</span>
            <span class="date">{{ post.date }}</span>
            <span class="read-time">{{ post.readTime }} min read</span>
          </div>
          <h1>{{ post.title }}</h1>
          <p class="post-excerpt">{{ post.excerpt }}</p>
        </header>

        <div v-if="post.cover" class="post-hero-image">
          <img :src="post.cover" :alt="post.title" />
        </div>

        <div class="post-body" v-html="post.content || '<p>Content coming soon. Run scripts/integrate.js to populate.</p>'"></div>

        <footer class="post-footer">
          <router-link to="/blog" class="back-link">← {{ $t('blog.backToList') }}</router-link>
        </footer>
      </article>
      <div v-else class="loading">{{ $t('common.loading') }}</div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const post = ref(null);

async function load(slug) {
  try {
    const data = await import(`../data/blog/${slug}.json`);
    post.value = data.default || data;
    document.title = `${post.value.title} | AI Image Inspiration`;
  } catch (e) {
    console.warn('Post not found:', slug);
    post.value = null;
  }
}

onMounted(() => load(route.params.slug));
watch(() => route.params.slug, (s) => { if (s) load(s); });
</script>

<style scoped>
.post-content { max-width: 760px; margin: 0 auto; }
.post-header { text-align: center; margin: 32px 0; }
.post-meta { display: flex; gap: 12px; justify-content: center; align-items: center; font-size: 13px; color: var(--color-text-dim); margin-bottom: 16px; }
.cat-badge { padding: 4px 12px; background: var(--color-primary); color: white; border-radius: 12px; font-weight: 600; }
.post-header h1 { font-size: 40px; margin-bottom: 12px; line-height: 1.2; }
.post-excerpt { color: var(--color-text-dim); font-size: 18px; line-height: 1.6; }

.post-hero-image { margin: 32px 0; border-radius: var(--radius); overflow: hidden; }
.post-hero-image img { width: 100%; }

.post-body { font-size: 17px; line-height: 1.8; color: var(--color-text); }
.post-body :deep(h2) { font-size: 28px; margin: 40px 0 16px; padding-top: 16px; border-top: 1px solid var(--color-border); color: var(--color-text-strong); }
.post-body :deep(h3) { font-size: 22px; margin: 32px 0 12px; color: var(--color-text-strong); }
.post-body :deep(p) { margin-bottom: 16px; }
.post-body :deep(ul), .post-body :deep(ol) { margin: 16px 0 16px 24px; }
.post-body :deep(li) { margin-bottom: 8px; }
.post-body :deep(code) { background: var(--color-code-bg); color: var(--color-code-text); padding: 2px 6px; border-radius: 4px; font-family: 'Consolas', monospace; font-size: 14px; }
.post-body :deep(pre) { background: var(--color-code-bg); color: var(--color-text); padding: 16px; border-radius: var(--radius); overflow-x: auto; margin: 16px 0; }
.post-body :deep(blockquote) { border-left: 3px solid var(--color-primary); padding: 12px 20px; background: var(--color-surface); margin: 16px 0; color: var(--color-text-dim); border-radius: 0 var(--radius) var(--radius) 0; }
.post-body :deep(img) { max-width: 100%; border-radius: var(--radius); margin: 16px 0; }

.post-footer { margin: 48px 0; text-align: center; }
.back-link { color: var(--color-primary); }

.loading { text-align: center; padding: 80px 0; }
</style>
