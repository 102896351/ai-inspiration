<template>
  <div class="image-detail">
    <div class="container" v-if="item">
      <nav class="breadcrumb">
        <router-link to="/">{{ $t('nav.home') }}</router-link>
        <span>/</span>
        <router-link to="/gallery">{{ $t('nav.gallery') }}</router-link>
        <span>/</span>
        <span>{{ item.title }}</span>
      </nav>

      <div class="detail-grid">
        <div class="image-side">
          <img :src="item.cover" :alt="item.title" class="hero-image" loading="lazy" />
          <div class="image-meta">
            <span class="badge">{{ item.model }}</span>
            <span v-for="s in item.styles" :key="s" class="badge badge-style">{{ s }}</span>
            <span class="badge badge-diff">{{ '★'.repeat(item.difficulty) }}{{ '☆'.repeat(5 - item.difficulty) }}</span>
          </div>
          <p class="source-note">
            {{ $t('detail.sourceNote', { site: item.source?.site, author: item.source?.author }) }}
          </p>
        </div>

        <div class="content-side">
          <h1 class="detail-title">{{ item.title }}</h1>
          <p class="detail-desc">{{ item.description }}</p>

          <section class="prompt-section">
            <div class="prompt-header">
              <h2>{{ $t('detail.prompt') }}</h2>
              <button class="copy-btn" @click="copyPrompt(item.prompt?.main)">
                {{ $t('detail.copy') }}
              </button>
            </div>
            <pre class="prompt-text">{{ item.prompt?.main }}</pre>
            <div v-if="item.prompt?.params" class="prompt-params">
              <code>{{ item.prompt.params }}</code>
            </div>
          </section>

          <section class="tutorial-section" v-if="item.tutorial">
            <h2>{{ $t('detail.tutorial') }}</h2>
            <p class="tutorial-intro">{{ item.tutorial.intro }}</p>
            <ol class="tutorial-steps">
              <li v-for="(step, i) in item.tutorial.steps" :key="i">{{ step }}</li>
            </ol>
            <div v-if="item.tutorial.tips" class="tutorial-tips">
              <strong>💡 {{ $t('detail.tips') }}：</strong> {{ item.tutorial.tips }}
            </div>
          </section>

          <section class="alt-section" v-if="item.tutorial?.alternatives">
            <h2>{{ $t('detail.alternatives') }}</h2>
            <p>{{ item.tutorial.alternatives }}</p>
          </section>

          <section class="cross-model" v-if="item.crossModel">
            <h2>{{ $t('detail.crossModel') }}</h2>
            <div v-for="(v, k) in item.crossModel" :key="k" class="cross-model-row">
              <strong>{{ k }}：</strong>
              <code>{{ v }}</code>
            </div>
          </section>

          <section class="faq-section" v-if="item.faq">
            <h2>{{ $t('detail.faq') }}</h2>
            <div v-for="(qa, i) in item.faq" :key="i" class="faq-item">
              <h3>{{ qa.q }}</h3>
              <p>{{ qa.a }}</p>
            </div>
          </section>
        </div>
      </div>

      <section class="related-section" v-if="related.length">
        <h2>{{ $t('detail.related') }}</h2>
        <div class="related-grid">
          <ImageCard v-for="r in related" :key="r.id" :item="r" />
        </div>
      </section>
    </div>
    <div v-else class="loading">{{ $t('common.loading') }}</div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue';
import { useRoute } from 'vue-router';
import ImageCard from '../components/ImageCard.vue';

const route = useRoute();
const allItems = ref([]);
const item = ref(null);
const related = ref([]);

async function loadItem(slug) {
  const data = await import('../data/gallery/index.json');
  allItems.value = data.default || data;
  item.value = allItems.value.find(i => i.slug === slug);
  if (item.value) {
    related.value = allItems.value
      .filter(i => i.id !== item.value.id && i.styles?.some(s => item.value.styles?.includes(s)))
      .slice(0, 4);
    // SEO
    document.title = `${item.value.title} - ${item.value.model} Tutorial | AI Image Inspiration`;
    // JSON-LD
    injectSchema(item.value);
  }
}

function injectSchema(it) {
  const existing = document.getElementById('detail-schema');
  if (existing) existing.remove();
  const script = document.createElement('script');
  script.id = 'detail-schema';
  script.type = 'application/ld+json';
  script.textContent = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'ImageObject',
    name: it.title,
    description: it.description,
    contentUrl: `https://aigallery.xyz${it.cover}`,
    keywords: it.styles?.join(', '),
    author: { '@type': 'Person', name: it.source?.author },
    sourceOrganization: { '@type': 'Organization', name: it.source?.site }
  });
  document.head.appendChild(script);
}

function copyPrompt(text) {
  if (!text) return;
  navigator.clipboard.writeText(text).then(() => {
    alert('Copied!');
  }).catch(() => {
    // fallback
    const ta = document.createElement('textarea');
    ta.value = text;
    document.body.appendChild(ta);
    ta.select();
    document.execCommand('copy');
    ta.remove();
    alert('Copied!');
  });
}

onMounted(() => loadItem(route.params.slug));
watch(() => route.params.slug, (s) => { if (s) loadItem(s); });
</script>

<style scoped>
.breadcrumb { padding: 16px 0; color: var(--color-text-dim); font-size: 14px; }
.breadcrumb a { color: var(--color-text-dim); }
.breadcrumb a:hover { color: var(--color-primary); }
.breadcrumb span { margin: 0 8px; color: var(--color-text-dim); }

.detail-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 48px; margin: 24px 0 64px; }
@media (max-width: 900px) { .detail-grid { grid-template-columns: 1fr; gap: 24px; } }

.hero-image { width: 100%; border-radius: var(--radius); border: 1px solid var(--color-border); box-shadow: var(--shadow-md); }
.image-meta { display: flex; flex-wrap: wrap; gap: 8px; margin: 16px 0; }
.badge { padding: 4px 12px; background: var(--color-primary); color: white; border-radius: 12px; font-size: 12px; font-weight: 600; }
.badge-style { background: var(--color-surface); color: var(--color-text); border: 1px solid var(--color-border); }
.badge-diff { background: var(--color-accent); color: #000; }
.source-note { font-size: 13px; color: var(--color-text-dim); padding: 12px; background: var(--color-surface); border-radius: var(--radius); border-left: 3px solid var(--color-primary); }

.content-side h1.detail-title { font-size: 32px; margin-bottom: 12px; line-height: 1.2; color: var(--color-text-strong); }
.detail-desc { color: var(--color-text-dim); margin-bottom: 24px; line-height: 1.7; }

section { margin-bottom: 32px; }
section h2 { font-size: 22px; margin-bottom: 16px; padding-bottom: 8px; border-bottom: 1px solid var(--color-border); color: var(--color-text-strong); }

.prompt-section { background: var(--color-surface); padding: 20px; border-radius: var(--radius); border: 1px solid var(--color-border); }
.prompt-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px; }
.prompt-header h2 { font-size: 18px; margin: 0; padding: 0; border: none; }
.copy-btn { padding: 6px 16px; background: var(--color-primary); color: white; border: none; border-radius: var(--radius); cursor: pointer; font-size: 13px; transition: var(--transition); }
.copy-btn:hover { background: var(--color-primary-hover); }
.prompt-text { background: var(--color-code-bg); color: var(--color-text); padding: 16px; border-radius: var(--radius); white-space: pre-wrap; word-wrap: break-word; font-family: 'Consolas', 'Monaco', monospace; font-size: 14px; line-height: 1.6; border: 1px solid var(--color-border); }
.prompt-params { margin-top: 12px; padding: 10px 16px; background: var(--color-code-bg); border-radius: var(--radius); }
.prompt-params code { color: var(--color-code-text); font-family: 'Consolas', monospace; }

.tutorial-intro { color: var(--color-text-dim); margin-bottom: 16px; line-height: 1.7; }
.tutorial-steps { padding-left: 20px; line-height: 1.8; color: var(--color-text); }
.tutorial-steps li { margin-bottom: 8px; }
.tutorial-tips { margin-top: 16px; padding: 12px 16px; background: color-mix(in srgb, var(--color-accent) 10%, transparent); border-left: 3px solid var(--color-accent); border-radius: var(--radius); color: var(--color-text); }

.cross-model-row { padding: 12px; background: var(--color-surface); border-radius: var(--radius); margin-bottom: 8px; border: 1px solid var(--color-border); }
.cross-model-row code { background: var(--color-code-bg); color: var(--color-code-text); padding: 2px 8px; border-radius: 4px; font-family: 'Consolas', monospace; font-size: 13px; }

.faq-item { background: var(--color-surface); padding: 16px; border-radius: var(--radius); margin-bottom: 12px; border: 1px solid var(--color-border); }
.faq-item h3 { font-size: 15px; margin-bottom: 8px; color: var(--color-primary); }
.faq-item p { color: var(--color-text-dim); line-height: 1.7; }

.related-section h2 { font-size: 24px; margin: 48px 0 24px; }
.related-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); gap: 16px; }
.loading { text-align: center; padding: 80px 0; }
</style>
