<template>
  <div class="app">
    <header class="header">
      <div class="container header-inner">
        <router-link to="/" class="logo">
          <span class="logo-icon">🎨</span>
          <span class="logo-text">{{ $t('site.name') }}</span>
        </router-link>
        <nav class="nav">
          <router-link to="/gallery" class="nav-link">{{ $t('nav.gallery') }}</router-link>
          <router-link to="/tutorials" class="nav-link">{{ $t('nav.tutorials') }}</router-link>
          <router-link to="/tools" class="nav-link">{{ $t('nav.tools') }}</router-link>
          <router-link to="/blog" class="nav-link">{{ $t('nav.blog') }}</router-link>
        </nav>
        <div class="header-actions">
          <button class="theme-toggle" @click="toggleTheme" :title="theme === 'light' ? 'Switch to dark' : 'Switch to light'">
            {{ theme === 'light' ? '🌙' : '☀️' }}
          </button>
          <div class="lang-switcher">
            <select v-model="$i18n.locale" @change="onLangChange">
              <option v-for="lang in langs" :key="lang.code" :value="lang.code">
                {{ lang.label }}
              </option>
            </select>
          </div>
        </div>
      </div>
    </header>

    <main class="main">
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </main>

    <footer class="footer">
      <div class="container">
        <div class="footer-grid">
          <div>
            <h4>{{ $t('site.name') }}</h4>
            <p>{{ $t('footer.tagline') }}</p>
          </div>
          <div>
            <h4>{{ $t('nav.gallery') }}</h4>
            <ul>
              <li><router-link to="/gallery?model=midjourney">Midjourney</router-link></li>
              <li><router-link to="/gallery?model=stable-diffusion">Stable Diffusion</router-link></li>
              <li><router-link to="/gallery?model=flux">Flux</router-link></li>
              <li><router-link to="/gallery?model=dall-e">DALL-E</router-link></li>
            </ul>
          </div>
          <div>
            <h4>{{ $t('footer.learn') }}</h4>
            <ul>
              <li><router-link to="/tutorials">{{ $t('nav.tutorials') }}</router-link></li>
              <li><router-link to="/blog">{{ $t('nav.blog') }}</router-link></li>
            </ul>
          </div>
          <div>
            <h4>{{ $t('footer.legal') }}</h4>
            <ul>
              <li><a href="/about">{{ $t('footer.about') }}</a></li>
              <li><a href="/privacy">{{ $t('footer.privacy') }}</a></li>
              <li><a href="/terms">{{ $t('footer.terms') }}</a></li>
            </ul>
          </div>
        </div>
        <p class="footer-copy">© 2026 AI Image Inspiration · {{ $t('footer.disclaimer') }}</p>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router';
import { watch, ref, onMounted } from 'vue';

const langs = [
  { code: 'en', label: 'English' },
  { code: 'zh', label: '中文' },
  { code: 'ja', label: '日本語' },
  { code: 'ko', label: '한국어' },
  { code: 'fr', label: 'Français' },
  { code: 'de', label: 'Deutsch' },
  { code: 'es', label: 'Español' }
];

const theme = ref('light');

function applyTheme(t) {
  document.documentElement.setAttribute('data-theme', t);
  theme.value = t;
  try { localStorage.setItem('theme', t); } catch (e) {}
}

function toggleTheme() {
  applyTheme(theme.value === 'light' ? 'dark' : 'light');
}

onMounted(() => {
  // 读 localStorage
  try {
    const savedTheme = localStorage.getItem('theme') || 'light';
    applyTheme(savedTheme);
    const saved = localStorage.getItem('lang');
    if (saved && langs.find(l => l.code === saved)) {
      const select = document.querySelector('.lang-switcher select');
      if (select) select.value = saved;
    }
  } catch (e) {}
});

const route = useRoute();
watch(() => route.path, () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

function onLangChange() {
  const select = document.querySelector('.lang-switcher select');
  if (select) localStorage.setItem('lang', select.value);
}
</script>

<style>
:root {
  --color-bg: #ffffff;
  --color-surface: #f8fafc;
  --color-border: #e5e7eb;
  --color-text: #1f2937;
  --color-text-dim: #6b7280;
  --color-text-strong: #111827;
  --color-primary: #6366f1;
  --color-primary-hover: #4f46e5;
  --color-accent: #f59e0b;
  --color-success: #10b981;
  --color-danger: #ef4444;
  --color-code-bg: #f1f5f9;
  --color-code-text: #be185d;
  --color-hero-from: #f5f3ff;
  --color-hero-via: #ede9fe;
  --color-hero-to: #dbeafe;
  --radius: 8px;
  --shadow-sm: 0 1px 3px rgba(0,0,0,0.06);
  --shadow-md: 0 4px 12px rgba(0,0,0,0.08);
  --shadow-lg: 0 10px 30px rgba(0,0,0,0.1);
  --transition: 0.2s ease;
}

[data-theme="dark"] {
  --color-bg: #0a0a0a;
  --color-surface: #141414;
  --color-border: #2a2a2a;
  --color-text: #e5e5e5;
  --color-text-dim: #999;
  --color-text-strong: #ffffff;
  --color-code-bg: #1e293b;
  --color-code-text: #f9a8d4;
  --color-hero-from: #0a0a0a;
  --color-hero-via: #1a1a2e;
  --color-hero-to: #16213e;
  --shadow-sm: 0 1px 3px rgba(0,0,0,0.3);
  --shadow-md: 0 4px 12px rgba(0,0,0,0.4);
  --shadow-lg: 0 10px 30px rgba(0,0,0,0.5);
}

* { box-sizing: border-box; margin: 0; padding: 0; }

html, body, #app {
  background: var(--color-bg);
  color: var(--color-text);
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'PingFang SC', 'Microsoft YaHei', sans-serif;
  line-height: 1.6;
  -webkit-font-smoothing: antialiased;
  transition: background 0.2s ease, color 0.2s ease;
}

a { color: var(--color-primary); text-decoration: none; transition: var(--transition); }
a:hover { color: var(--color-primary-hover); }

.container { max-width: 1280px; margin: 0 auto; padding: 0 20px; }

.header {
  position: sticky; top: 0; z-index: 100;
  background: color-mix(in srgb, var(--color-bg) 92%, transparent);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid var(--color-border);
}
.header-inner { display: flex; align-items: center; justify-content: space-between; height: 64px; gap: 16px; }
.logo { display: flex; align-items: center; gap: 8px; font-size: 18px; font-weight: 700; color: var(--color-text-strong); }
.logo-icon { font-size: 24px; }
.nav { display: flex; gap: 24px; }
.nav-link { color: var(--color-text-dim); font-weight: 500; }
.nav-link:hover { color: var(--color-primary); }
.nav-link.router-link-active { color: var(--color-primary); }

.header-actions { display: flex; align-items: center; gap: 8px; }
.theme-toggle {
  width: 36px; height: 36px;
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius);
  cursor: pointer;
  font-size: 16px;
  display: flex; align-items: center; justify-content: center;
  transition: var(--transition);
}
.theme-toggle:hover { border-color: var(--color-primary); transform: scale(1.05); }

.lang-switcher select {
  background: var(--color-surface);
  color: var(--color-text);
  border: 1px solid var(--color-border);
  border-radius: var(--radius);
  padding: 6px 12px;
  cursor: pointer;
  font-size: 14px;
}

.main { min-height: calc(100vh - 64px - 300px); padding: 32px 0; }

.footer { background: var(--color-surface); border-top: 1px solid var(--color-border); padding: 48px 0 24px; margin-top: 64px; }
.footer-grid { display: grid; grid-template-columns: 2fr 1fr 1fr 1fr; gap: 32px; margin-bottom: 32px; }
.footer h4 { font-size: 14px; margin-bottom: 12px; color: var(--color-text-strong); }
.footer ul { list-style: none; }
.footer ul li { margin-bottom: 8px; }
.footer ul li a { color: var(--color-text-dim); font-size: 14px; }
.footer ul li a:hover { color: var(--color-primary); }
.footer p { color: var(--color-text-dim); font-size: 14px; }
.footer-copy { text-align: center; padding-top: 24px; border-top: 1px solid var(--color-border); font-size: 13px; }

.fade-enter-active, .fade-leave-active { transition: opacity 0.2s; }
.fade-enter-from, .fade-leave-to { opacity: 0; }

@media (max-width: 768px) {
  .nav { display: none; }
  .footer-grid { grid-template-columns: 1fr 1fr; }
}
</style>
