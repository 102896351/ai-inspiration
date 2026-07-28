import { createApp } from 'vue';
import { createRouter, createWebHashHistory } from 'vue-router';
import { createI18n } from 'vue-i18n';
import App from './App.vue';
import Home from './views/Home.vue';
import Gallery from './views/Gallery.vue';
import ImageDetail from './views/ImageDetail.vue';
import Tutorials from './views/Tutorials.vue';
import Tools from './views/Tools.vue';
import Blog from './views/Blog.vue';
import BlogPost from './views/BlogPost.vue';
import en from './i18n/locales/en.js';
import zh from './i18n/locales/zh.js';
import ja from './i18n/locales/ja.js';
import ko from './i18n/locales/ko.js';
import fr from './i18n/locales/fr.js';
import de from './i18n/locales/de.js';
import es from './i18n/locales/es.js';

const routes = [
  { path: '/', component: Home, name: 'home' },
  { path: '/gallery', component: Gallery, name: 'gallery' },
  { path: '/gallery/:slug', component: ImageDetail, name: 'image-detail' },
  { path: '/tutorials', component: Tutorials, name: 'tutorials' },
  { path: '/tools', component: Tools, name: 'tools' },
  { path: '/blog', component: Blog, name: 'blog' },
  { path: '/blog/:slug', component: BlogPost, name: 'blog-post' }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) return savedPosition;
    return { top: 0 };
  }
});

const i18n = createI18n({
  legacy: false,
  locale: 'en',
  fallbackLocale: 'en',
  messages: { en, zh, ja, ko, fr, de, es }
});

const app = createApp(App);
app.use(router);
app.use(i18n);
app.mount('#app');
