<template>
  <div class="facet-filter">
    <div class="search-row">
      <input
        :value="q"
        @input="$emit('update:q', $event.target.value)"
        type="text"
        :placeholder="$t('filter.searchPlaceholder')"
        class="search-input"
      />
    </div>

    <div class="facet-tabs">
      <div class="facet-group">
        <label class="facet-label">{{ $t('filter.model') }}</label>
        <div class="facet-options">
          <button
            v-for="m in models"
            :key="m.id"
            :class="['facet-chip', { active: model === m.id }]"
            @click="$emit('update:model', model === m.id ? '' : m.id)"
          >
            {{ m.icon }} {{ m.name }}
          </button>
        </div>
      </div>

      <div class="facet-group">
        <label class="facet-label">{{ $t('filter.style') }}</label>
        <div class="facet-options">
          <button
            v-for="s in styles"
            :key="s"
            :class="['facet-chip', { active: style === s }]"
            @click="$emit('update:style', style === s ? '' : s)"
          >
            {{ s }}
          </button>
        </div>
      </div>

      <div class="facet-group">
        <label class="facet-label">{{ $t('filter.useCase') }}</label>
        <div class="facet-options">
          <button
            v-for="u in useCases"
            :key="u"
            :class="['facet-chip', { active: useCase === u }]"
            @click="$emit('update:useCase', useCase === u ? '' : u)"
          >
            {{ u }}
          </button>
        </div>
      </div>

      <div class="facet-group">
        <label class="facet-label">{{ $t('filter.difficulty') }}</label>
        <div class="facet-options">
          <button
            v-for="d in [1,2,3,4,5]"
            :key="d"
            :class="['facet-chip', { active: difficulty === d }]"
            @click="$emit('update:difficulty', difficulty === d ? '' : d)"
          >
            {{ '★'.repeat(d) }}
          </button>
        </div>
      </div>
    </div>

    <button class="reset-btn" @click="$emit('reset')">{{ $t('filter.reset') }}</button>
  </div>
</template>

<script setup>
defineProps({
  model: String,
  style: String,
  useCase: String,
  difficulty: [Number, String],
  q: String
});
defineEmits(['update:model', 'update:style', 'update:useCase', 'update:difficulty', 'update:q', 'reset']);

const models = [
  { id: 'midjourney', name: 'Midjourney', icon: '🌌' },
  { id: 'stable-diffusion', name: 'Stable Diffusion', icon: '🌀' },
  { id: 'flux', name: 'Flux', icon: '⚡' },
  { id: 'dall-e', name: 'DALL-E', icon: '🎭' },
  { id: 'ideogram', name: 'Ideogram', icon: '✨' },
  { id: 'jimeng', name: '即梦', icon: '🌟' }
];

const styles = [
  '写实', '插画', '3D', '动漫', '概念设计',
  '海报', '产品', '头像', '壁纸', '复古',
  'cyberpunk', 'anime', 'photorealistic', 'minimalist', 'watercolor'
];

const useCases = [
  '电商', '社交媒体', '博客封面', '营销海报', '头像', '壁纸', 'logo', '产品图'
];
</script>

<style scoped>
.facet-filter {
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius);
  padding: 20px;
  margin-bottom: 32px;
}

.search-row { margin-bottom: 16px; }
.search-input {
  width: 100%;
  padding: 12px 16px;
  background: var(--color-bg);
  color: var(--color-text);
  border: 1px solid var(--color-border);
  border-radius: var(--radius);
  font-size: 14px;
}
.search-input:focus { outline: none; border-color: var(--color-primary); }

.facet-tabs { display: flex; flex-direction: column; gap: 16px; }
.facet-group { display: flex; align-items: flex-start; gap: 12px; flex-wrap: wrap; }
.facet-label { min-width: 80px; font-size: 13px; color: var(--color-text-dim); padding-top: 6px; font-weight: 600; }
.facet-options { display: flex; flex-wrap: wrap; gap: 6px; flex: 1; }
.facet-chip {
  padding: 6px 12px;
  background: var(--color-bg);
  color: var(--color-text);
  border: 1px solid var(--color-border);
  border-radius: 16px;
  cursor: pointer;
  font-size: 13px;
  transition: var(--transition);
}
.facet-chip:hover { border-color: var(--color-primary); }
.facet-chip.active {
  background: var(--color-primary);
  color: white;
  border-color: var(--color-primary);
}

.reset-btn {
  margin-top: 16px;
  padding: 6px 16px;
  background: transparent;
  color: var(--color-text-dim);
  border: 1px solid var(--color-border);
  border-radius: var(--radius);
  cursor: pointer;
  font-size: 13px;
}
.reset-btn:hover { color: var(--color-primary); border-color: var(--color-primary); }
</style>
