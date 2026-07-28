<template>
  <div class="gallery">
    <div class="container">
      <header class="gallery-header">
        <h1>{{ $t('gallery.title') }}</h1>
        <p>{{ $t('gallery.sub', { count: filtered.length }) }}</p>
      </header>

      <FacetFilter
        v-model:model="filters.model"
        v-model:style="filters.style"
        v-model:useCase="filters.useCase"
        v-model:difficulty="filters.difficulty"
        v-model:q="filters.q"
        @reset="resetFilters"
      />

      <div v-if="loading" class="loading">{{ $t('common.loading') }}</div>
      <div v-else-if="filtered.length === 0" class="empty">
        <p>{{ $t('gallery.empty') }}</p>
        <button @click="resetFilters" class="btn-primary">{{ $t('gallery.resetFilter') }}</button>
      </div>
      <div v-else class="masonry">
        <ImageCard
          v-for="item in filtered"
          :key="item.id"
          :item="item"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import ImageCard from '../components/ImageCard.vue';
import FacetFilter from '../components/FacetFilter.vue';

const route = useRoute();
const router = useRouter();

const allItems = ref([]);
const loading = ref(true);

const filters = ref({
  model: route.query.model || '',
  style: route.query.style || '',
  useCase: route.query.useCase || '',
  difficulty: route.query.difficulty ? parseInt(route.query.difficulty) : '',
  q: route.query.q || ''
});

const filtered = computed(() => {
  let result = allItems.value;
  if (filters.value.model) result = result.filter(i => i.model === filters.value.model);
  if (filters.value.style) result = result.filter(i => i.styles?.includes(filters.value.style));
  if (filters.value.useCase) result = result.filter(i => i.useCases?.includes(filters.value.useCase));
  if (filters.value.difficulty) result = result.filter(i => i.difficulty === filters.value.difficulty);
  if (filters.value.q) {
    const q = filters.value.q.toLowerCase();
    result = result.filter(i =>
      i.title?.toLowerCase().includes(q) ||
      i.prompt?.main?.toLowerCase().includes(q) ||
      i.tags?.some(t => t.toLowerCase().includes(q))
    );
  }
  return result;
});

function resetFilters() {
  filters.value = { model: '', style: '', useCase: '', difficulty: '', q: '' };
  router.push({ path: '/gallery' });
}

// URL 同步（SEO 友好，每个 facet 都是可索引 URL）
watch(filters, (f) => {
  const q = {};
  if (f.model) q.model = f.model;
  if (f.style) q.style = f.style;
  if (f.useCase) q.useCase = f.useCase;
  if (f.difficulty) q.difficulty = f.difficulty;
  if (f.q) q.q = f.q;
  router.replace({ path: '/gallery', query: q });
}, { deep: true });

onMounted(async () => {
  try {
    const data = await import('../data/gallery/index.json');
    allItems.value = data.default || data;
  } catch (e) {
    console.warn('Gallery data missing:', e);
    allItems.value = [];
  } finally {
    loading.value = false;
  }
});
</script>

<style scoped>
.gallery-header { margin-bottom: 32px; text-align: center; }
.gallery-header h1 { font-size: 36px; margin-bottom: 8px; }
.gallery-header p { color: var(--color-text-dim); }

.masonry {
  column-count: 4;
  column-gap: 16px;
}
@media (max-width: 1100px) { .masonry { column-count: 3; } }
@media (max-width: 800px)  { .masonry { column-count: 2; } }
@media (max-width: 500px)  { .masonry { column-count: 1; } }

.masonry > * {
  break-inside: avoid;
  margin-bottom: 16px;
  display: block;
}

.loading, .empty { text-align: center; padding: 80px 0; color: var(--color-text-dim); }
.empty button { margin-top: 16px; padding: 10px 24px; background: var(--color-primary); color: white; border: none; border-radius: var(--radius); cursor: pointer; }
</style>
