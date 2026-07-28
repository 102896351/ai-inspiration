import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// GitHub Pages 部署在子路径时要用 /repo-name/
// Actions 注入 GITHUB_REPOSITORY（owner/repo），提取 repo name
function getBase() {
  if (process.env.GITHUB_ACTIONS && process.env.GITHUB_REPOSITORY) {
    const repo = process.env.GITHUB_REPOSITORY.split('/')[1];
    return `/${repo}/`;
  }
  if (process.env.SITE_BASE) return process.env.SITE_BASE;
  return '/';
}

// https://vitejs.dev/config/
export default defineConfig({
  root: __dirname,
  base: getBase(),
  plugins: [
    vue()
  ],
  build: {
    target: 'es2018',
    cssCodeSplit: true,
    minify: 'esbuild',
    rollupOptions: {
      output: {
        manualChunks: {
          'vue-vendor': ['vue', 'vue-router', 'vue-i18n']
        }
      }
    },
    chunkSizeWarningLimit: 600
  },
  resolve: {
    alias: {
      '@': '/src'
    }
  }
});
