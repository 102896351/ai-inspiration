<template>
  <div class="home">
    <section class="hero">
      <div class="container">
        <h1 class="hero-title">{{ $t('home.hero.title') }}</h1>
        <p class="hero-sub">{{ $t('home.hero.sub') }}</p>
        <div class="hero-search">
          <input
            v-model="searchQuery"
            type="text"
            :placeholder="$t('home.hero.searchPlaceholder')"
            @keyup.enter="goSearch"
          />
          <button @click="goSearch">{{ $t('home.hero.searchBtn') }}</button>
        </div>
        <div class="hero-cta">
          <router-link to="/gallery" class="btn-primary">{{ $t('home.hero.exploreGallery') }}</router-link>
          <router-link to="/tutorials" class="btn-secondary">{{ $t('home.hero.startLearning') }}</router-link>
        </div>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <h2 class="section-title">{{ $t('home.models.title') }}</h2>
        <p class="section-sub">{{ $t('home.models.sub') }}</p>
        <div class="model-grid">
          <router-link
            v-for="m in models"
            :key="m.id"
            :to="`/gallery?model=${m.id}`"
            class="model-card"
            :style="{ '--accent': m.color }"
          >
            <div class="model-icon">{{ m.icon }}</div>
            <h3>{{ m.name }}</h3>
            <p>{{ m.desc }}</p>
            <span class="model-count">{{ m.count }} {{ $t('home.models.prompts') }}</span>
          </router-link>
        </div>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <h2 class="section-title">{{ $t('home.featured.title') }}</h2>
        <p class="section-sub">{{ $t('home.featured.sub') }}</p>
        <div v-if="loading" class="loading">{{ $t('common.loading') }}</div>
        <div v-else class="featured-grid">
          <ImageCard
            v-for="item in featured"
            :key="item.id"
            :item="item"
          />
        </div>
        <div class="section-cta">
          <router-link to="/gallery" class="btn-primary">{{ $t('home.featured.viewAll') }}</router-link>
        </div>
      </div>
    </section>

    <section class="section learn-section">
      <div class="container">
        <h2 class="section-title">{{ $t('home.learn.title') }}</h2>
        <div class="learn-grid">
          <div class="learn-card" v-for="(item, i) in learnItems" :key="i">
            <div class="learn-num">{{ i + 1 }}</div>
            <h3>{{ item.title }}</h3>
            <p>{{ item.desc }}</p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import ImageCard from '../components/ImageCard.vue';

const router = useRouter();
const searchQuery = ref('');
const featured = ref([]);
const loading = ref(true);

const models = [
  { id: 'midjourney', name: 'Midjourney', icon: '🌌', color: '#4f46e5', desc: 'Artistic, stylized, photorealistic', count: 120 },
  { id: 'stable-diffusion', name: 'Stable Diffusion', icon: '🌀', color: '#10b981', desc: 'Open-source, customizable', count: 85 },
  { id: 'flux', name: 'Flux', icon: '⚡', color: '#f59e0b', desc: 'Fast, accurate, photorealistic', count: 42 },
  { id: 'dall-e', name: 'DALL-E', icon: '🎭', color: '#ec4899', desc: 'Versatile, text-rendering', count: 30 },
  { id: 'ideogram', name: 'Ideogram', icon: '✨', color: '#8b5cf6', desc: 'Typography, design', count: 18 },
  { id: 'jimeng', name: '即梦 / Jimeng', icon: '🌟', color: '#ef4444', desc: '中文友好 / Chinese-friendly', count: 25 }
];

const learnItems = [
  { title: '选择模型', desc: '根据风格需求挑合适的 AI 模型' },
  { title: '写 prompt', desc: '掌握主体、风格、参数三层结构' },
  { title: '调参数', desc: 'aspect ratio / stylize / chaos / seed' },
  { title: '出图优化', desc: '放大、二次精修、变体生成' }
];

function goSearch() {
  if (searchQuery.value.trim()) {
    router.push({ path: '/gallery', query: { q: searchQuery.value.trim() } });
  }
}

onMounted(async () => {
  try {
    // 动态 import 站点数据（构建时打包）
    const data = await import('../data/gallery/index.json');
    featured.value = (data.default || data).slice(0, 8);
  } catch (e) {
    console.warn('Gallery data not loaded yet:', e);
    featured.value = [];
  } finally {
    loading.value = false;
  }
});
</script>

<style scoped>
.hero {
  background: linear-gradient(135deg, var(--color-hero-from) 0%, var(--color-hero-via) 50%, var(--color-hero-to) 100%);
  padding: 80px 0;
  text-align: center;
  border-bottom: 1px solid var(--color-border);
}
.hero-title { font-size: 48px; font-weight: 800; margin-bottom: 16px; background: linear-gradient(135deg, #6366f1, #f59e0b); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
.hero-sub { font-size: 18px; color: var(--color-text-dim); margin-bottom: 32px; max-width: 720px; margin-left: auto; margin-right: auto; }
.hero-search { display: flex; max-width: 560px; margin: 0 auto 24px; gap: 8px; }
.hero-search input { flex: 1; padding: 14px 20px; font-size: 16px; background: var(--color-surface); color: var(--color-text); border: 1px solid var(--color-border); border-radius: var(--radius); }
.hero-search input:focus { outline: none; border-color: var(--color-primary); box-shadow: 0 0 0 3px color-mix(in srgb, var(--color-primary) 15%, transparent); }
.hero-search button { padding: 14px 28px; background: var(--color-primary); color: white; border: none; border-radius: var(--radius); font-weight: 600; cursor: pointer; }
.hero-search button:hover { background: var(--color-primary-hover); }
.hero-cta { display: flex; gap: 16px; justify-content: center; }
.btn-primary, .btn-secondary { padding: 12px 24px; border-radius: var(--radius); font-weight: 600; }
.btn-primary { background: var(--color-primary); color: white; }
.btn-primary:hover { background: var(--color-primary-hover); color: white; box-shadow: var(--shadow-md); }
.btn-secondary { background: var(--color-surface); color: var(--color-text); border: 1px solid var(--color-border); }
.btn-secondary:hover { border-color: var(--color-primary); color: var(--color-primary); }

.section { padding: 64px 0; }
.section-title { font-size: 32px; font-weight: 700; margin-bottom: 8px; text-align: center; color: var(--color-text-strong); }
.section-sub { font-size: 16px; color: var(--color-text-dim); text-align: center; margin-bottom: 40px; }
.section-cta { text-align: center; margin-top: 32px; }

.model-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 16px; }
.model-card {
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius);
  padding: 24px;
  text-align: center;
  transition: var(--transition);
  color: var(--color-text);
  box-shadow: var(--shadow-sm);
}
.model-card:hover { transform: translateY(-4px); border-color: var(--accent); box-shadow: var(--shadow-md); }
.model-icon { font-size: 36px; margin-bottom: 12px; }
.model-card h3 { font-size: 18px; margin-bottom: 4px; color: var(--color-text-strong); }
.model-card p { font-size: 13px; color: var(--color-text-dim); margin-bottom: 12px; }
.model-count { font-size: 12px; color: var(--accent); font-weight: 600; }

.featured-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(240px, 1fr)); gap: 16px; }
.loading { text-align: center; color: var(--color-text-dim); padding: 40px; }

.learn-section { background: var(--color-surface); }
.learn-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 16px; }
.learn-card { background: var(--color-bg); border: 1px solid var(--color-border); border-radius: var(--radius); padding: 24px; box-shadow: var(--shadow-sm); }
.learn-num { display: inline-block; width: 36px; height: 36px; line-height: 36px; text-align: center; background: var(--color-primary); color: white; border-radius: 50%; font-weight: 700; margin-bottom: 12px; }
.learn-card h3 { font-size: 18px; margin-bottom: 8px; color: var(--color-text-strong); }
.learn-card p { font-size: 14px; color: var(--color-text-dim); }

.section { padding: 64px 0; }
.section-title { font-size: 32px; font-weight: 700; margin-bottom: 8px; text-align: center; }
.section-sub { font-size: 16px; color: var(--color-text-dim); text-align: center; margin-bottom: 40px; }
.section-cta { text-align: center; margin-top: 32px; }

.model-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 16px; }
.model-card {
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius);
  padding: 24px;
  text-align: center;
  transition: var(--transition);
  color: var(--color-text);
}
.model-card:hover { transform: translateY(-4px); border-color: var(--accent); }
.model-icon { font-size: 36px; margin-bottom: 12px; }
.model-card h3 { font-size: 18px; margin-bottom: 4px; }
.model-card p { font-size: 13px; color: var(--color-text-dim); margin-bottom: 12px; }
.model-count { font-size: 12px; color: var(--accent); font-weight: 600; }

.featured-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(240px, 1fr)); gap: 16px; }
.loading { text-align: center; color: var(--color-text-dim); padding: 40px; }

.learn-section { background: var(--color-surface); }
.learn-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 16px; }
.learn-card { background: var(--color-bg); border: 1px solid var(--color-border); border-radius: var(--radius); padding: 24px; }
.learn-num { display: inline-block; width: 36px; height: 36px; line-height: 36px; text-align: center; background: var(--color-primary); color: white; border-radius: 50%; font-weight: 700; margin-bottom: 12px; }
.learn-card h3 { font-size: 18px; margin-bottom: 8px; }
.learn-card p { font-size: 14px; color: var(--color-text-dim); }

@media (max-width: 768px) {
  .hero-title { font-size: 32px; }
  .section-title { font-size: 24px; }
}
</style>
