import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// https://vitejs.dev/config/
export default defineConfig({
  root: __dirname,
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
