<template>
  <div class="tutorials">
    <div class="container">
      <header class="page-header">
        <h1>{{ $t('tutorials.title') }}</h1>
        <p>{{ $t('tutorials.sub') }}</p>
      </header>

      <div class="tutorial-categories">
        <section v-for="cat in categories" :key="cat.id" class="category-section">
          <h2>{{ cat.icon }} {{ cat.name }}</h2>
          <p class="cat-desc">{{ cat.desc }}</p>
          <div class="tutorial-grid">
            <router-link
              v-for="t in cat.tutorials"
              :key="t.id"
              :to="`/blog/${t.slug}`"
              class="tutorial-card"
            >
              <div class="tutorial-icon">{{ t.icon }}</div>
              <h3>{{ t.title }}</h3>
              <p>{{ t.desc }}</p>
              <div class="tutorial-meta">
                <span class="model-badge">{{ t.model }}</span>
                <span class="diff-badge">{{ '★'.repeat(t.difficulty) }}</span>
                <span class="time-badge">{{ t.time }} min</span>
              </div>
            </router-link>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<script setup>
const categories = [
  {
    id: 'getting-started',
    icon: '🚀',
    name: 'Getting Started',
    desc: 'Beginner-friendly tutorials to start your AI art journey',
    tutorials: [
      { id: 'midjourney-basics', slug: 'midjourney-prompt-basics', icon: '🌌', title: 'Midjourney Prompt Basics', desc: 'Learn the structure of a good prompt', model: 'MJ', difficulty: 1, time: 5 },
      { id: 'sd-install', slug: 'stable-diffusion-quickstart', icon: '🌀', title: 'Stable Diffusion Quickstart', desc: 'Install and run SD locally', model: 'SD', difficulty: 2, time: 15 },
      { id: 'flux-intro', slug: 'flux-prompt-introduction', icon: '⚡', title: 'Flux Prompt Introduction', desc: 'How to write Flux-style prompts', model: 'Flux', difficulty: 1, time: 8 }
    ]
  },
  {
    id: 'styles',
    icon: '🎨',
    name: 'Style Mastery',
    desc: 'Master different artistic styles and aesthetics',
    tutorials: [
      { id: 'cyberpunk', slug: 'cyberpunk-prompt-guide', icon: '🌃', title: 'Cyberpunk Style Guide', desc: 'Neon lights, rain, dark future', model: 'MJ/SD', difficulty: 3, time: 12 },
      { id: 'photorealistic', slug: 'photorealistic-prompt-tips', icon: '📷', title: 'Photorealistic Prompts', desc: 'Get DSLR-quality outputs', model: 'SDXL', difficulty: 4, time: 20 },
      { id: 'anime', slug: 'anime-prompt-anatomy', icon: '🌸', title: 'Anime Prompt Anatomy', desc: 'Character + scene + style', model: 'MJ/Niji', difficulty: 2, time: 10 }
    ]
  },
  {
    id: 'workflow',
    icon: '⚙️',
    name: 'Workflow & Production',
    desc: 'Production-grade workflows for serious creators',
    tutorials: [
      { id: 'params', slug: 'midjourney-parameters-explained', icon: '🎛️', title: 'All MJ Parameters Explained', desc: 'aspect ratio, stylize, chaos, seed', model: 'MJ', difficulty: 3, time: 15 },
      { id: 'consistency', slug: 'character-consistency-guide', icon: '👤', title: 'Character Consistency', desc: 'CREF, SREF, seed tricks', model: 'MJ', difficulty: 4, time: 25 },
      { id: 'upscale', slug: 'upscale-and-retouch', icon: '🔍', title: 'Upscale & Retouch', desc: 'Topaz, Photoshop, SD upscale', model: 'All', difficulty: 3, time: 18 }
    ]
  }
];
</script>

<style scoped>
.page-header { text-align: center; margin-bottom: 48px; }
.page-header h1 { font-size: 36px; margin-bottom: 8px; }
.page-header p { color: var(--color-text-dim); }

.category-section { margin-bottom: 48px; }
.category-section h2 { font-size: 24px; margin-bottom: 8px; }
.cat-desc { color: var(--color-text-dim); margin-bottom: 20px; }

.tutorial-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 16px; }
.tutorial-card {
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius);
  padding: 20px;
  transition: var(--transition);
  color: var(--color-text);
  box-shadow: var(--shadow-sm);
}
.tutorial-card:hover { transform: translateY(-2px); border-color: var(--color-primary); color: var(--color-text); box-shadow: var(--shadow-md); }
.tutorial-icon { font-size: 32px; margin-bottom: 12px; }
.tutorial-card h3 { font-size: 17px; margin-bottom: 8px; color: var(--color-text-strong); }
.tutorial-card p { color: var(--color-text-dim); font-size: 14px; margin-bottom: 12px; line-height: 1.5; }
.tutorial-meta { display: flex; gap: 6px; flex-wrap: wrap; }
.model-badge, .diff-badge, .time-badge {
  font-size: 11px;
  padding: 2px 8px;
  border-radius: 10px;
  background: var(--color-bg);
  color: var(--color-text-dim);
  border: 1px solid var(--color-border);
}
.model-badge { background: var(--color-primary); color: white; border-color: var(--color-primary); }
.diff-badge { color: var(--color-accent); }
.category-section h2 { color: var(--color-text-strong); }
</style>
