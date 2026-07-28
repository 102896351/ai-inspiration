<template>
  <router-link :to="`/gallery/${item.slug}`" class="image-card" :style="{ aspectRatio: ratio }">
    <div class="image-wrap">
      <img
        :src="item.cover"
        :alt="item.title"
        loading="lazy"
        @load="onLoad"
      />
      <div class="overlay">
        <span class="badge-model">{{ item.model }}</span>
        <span class="badge-diff">{{ '★'.repeat(item.difficulty) }}</span>
      </div>
    </div>
    <div class="card-info">
      <h3>{{ item.title }}</h3>
      <div class="tags">
        <span v-for="tag in (item.styles || []).slice(0, 3)" :key="tag" class="tag">{{ tag }}</span>
      </div>
    </div>
  </router-link>
</template>

<script setup>
import { ref, computed } from 'vue';

const props = defineProps({
  item: { type: Object, required: true }
});

const loaded = ref(false);
const ratio = computed(() => {
  // 模拟瀑布流高度差异
  const ratios = ['1 / 1', '4 / 5', '3 / 4', '4 / 3', '16 / 9', '2 / 3'];
  const hash = (props.item.id || '').split('').reduce((a, c) => a + c.charCodeAt(0), 0);
  return ratios[hash % ratios.length];
});

function onLoad() { loaded.value = true; }
</script>

<style scoped>
.image-card {
  display: block;
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius);
  overflow: hidden;
  transition: var(--transition);
  color: var(--color-text);
  box-shadow: var(--shadow-sm);
}
.image-card:hover {
  transform: translateY(-2px);
  border-color: var(--color-primary);
  box-shadow: var(--shadow-md);
  color: var(--color-text);
}

.image-wrap {
  position: relative;
  width: 100%;
  background: var(--color-bg);
  overflow: hidden;
}
.image-wrap img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  transition: transform 0.3s ease;
}
.image-card:hover .image-wrap img { transform: scale(1.05); }

.overlay {
  position: absolute;
  top: 8px;
  left: 8px;
  right: 8px;
  display: flex;
  justify-content: space-between;
  opacity: 0;
  transition: var(--transition);
}
.image-card:hover .overlay { opacity: 1; }
.badge-model, .badge-diff {
  padding: 4px 10px;
  background: rgba(0,0,0,0.6);
  color: white;
  font-size: 11px;
  font-weight: 600;
  border-radius: 12px;
  backdrop-filter: blur(10px);
}
.badge-diff { color: var(--color-accent); }

.card-info { padding: 12px; }
.card-info h3 { font-size: 14px; margin-bottom: 8px; line-height: 1.3; color: var(--color-text-strong); }
.tags { display: flex; flex-wrap: wrap; gap: 4px; }
.tag {
  font-size: 11px;
  padding: 2px 8px;
  background: var(--color-bg);
  color: var(--color-text-dim);
  border-radius: 10px;
  border: 1px solid var(--color-border);
}
</style>
