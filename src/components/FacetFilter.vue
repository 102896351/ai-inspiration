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
            {{ m.icon }} {{ $t('filter.modelNames.' + m.id) }}
          </button>
        </div>
      </div>

      <div class="facet-group">
        <label class="facet-label">{{ $t('filter.style') }}</label>
        <div class="facet-options">
          <button
            v-for="s in styleOptions"
            :key="s"
            :class="['facet-chip', { active: style === s }]"
            @click="$emit('update:style', style === s ? '' : s)"
          >
            {{ $t('filter.styleNames.' + s) }}
          </button>
        </div>
      </div>

      <div class="facet-group">
        <label class="facet-label">{{ $t('filter.useCase') }}</label>
        <div class="facet-options">
          <button
            v-for="u in useCaseOptions"
            :key="u"
            :class="['facet-chip', { active: useCase === u }]"
            @click="$emit('update:useCase', useCase === u ? '' : u)"
          >
            {{ $t('filter.useCaseNames.' + u) }}
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
  { id: 'midjourney', icon: '🌌' },
  { id: 'stable-diffusion', icon: '🌀' },
  { id: 'flux', icon: '⚡' },
  { id: 'dall-e', icon: '🎭' },
  { id: 'ideogram', icon: '✨' },
  { id: 'jimeng', icon: '🌟' }
];

// Facet 标签 key — i18n 文件里找 filter.styleNames.{key} / filter.useCaseNames.{key}
const styleOptions = [
  'realistic', 'illustration', '3d', 'anime', 'concept-art',
  'poster', 'product', 'avatar', 'wallpaper', 'vintage',
  'cyberpunk', 'photorealistic', 'minimalist', 'watercolor', 'oil-painting'
];

const useCaseOptions = [
  'ecommerce', 'social-media', 'blog-header', 'marketing', 'avatar', 'wallpaper', 'logo', 'product-shot'
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
