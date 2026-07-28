<template>
  <div class="tools">
    <div class="container">
      <header class="page-header">
        <h1>{{ $t('tools.title') }}</h1>
        <p>{{ $t('tools.sub') }}</p>
      </header>

      <div class="comparison-table">
        <table>
          <thead>
            <tr>
              <th>{{ $t('tools.col.tool') }}</th>
              <th>{{ $t('tools.col.price') }}</th>
              <th>{{ $t('tools.col.strength') }}</th>
              <th>{{ $t('tools.col.weakness') }}</th>
              <th>{{ $t('tools.col.bestFor') }}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="t in tools" :key="t.id" :class="{ highlight: t.highlight }">
              <td>
                <div class="tool-name">
                  <span class="tool-icon">{{ t.icon }}</span>
                  <div>
                    <strong>{{ t.name }}</strong>
                    <span class="tool-vendor">{{ t.vendor }}</span>
                  </div>
                </div>
              </td>
              <td><span :class="['price', t.priceClass]">{{ t.price }}</span></td>
              <td>{{ t.strength }}</td>
              <td>{{ t.weakness }}</td>
              <td>{{ t.bestFor }}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <section class="detailed-compare" v-for="pair in detailedCompares" :key="pair.id">
        <h2>{{ pair.title }}</h2>
        <p>{{ pair.desc }}</p>
        <div class="vs-grid">
          <div class="vs-card vs-a">
            <h3>{{ pair.a.name }}</h3>
            <div class="vs-pros"><strong>+</strong> {{ pair.a.pros }}</div>
            <div class="vs-cons"><strong>-</strong> {{ pair.a.cons }}</div>
            <div class="vs-sample">
              <strong>Sample output:</strong>
              <pre>{{ pair.a.sample }}</pre>
            </div>
          </div>
          <div class="vs-vs">VS</div>
          <div class="vs-card vs-b">
            <h3>{{ pair.b.name }}</h3>
            <div class="vs-pros"><strong>+</strong> {{ pair.b.pros }}</div>
            <div class="vs-cons"><strong>-</strong> {{ pair.b.cons }}</div>
            <div class="vs-sample">
              <strong>Sample output:</strong>
              <pre>{{ pair.b.sample }}</pre>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
const tools = [
  { id: 'mj', icon: '🌌', name: 'Midjourney', vendor: 'Midjourney Inc.', price: '$10-60/mo', priceClass: 'paid', strength: 'Artistic, stylized, photorealistic', weakness: 'No free tier, Discord-only historically', bestFor: 'Artistic creators, marketing', highlight: true },
  { id: 'sd', icon: '🌀', name: 'Stable Diffusion', vendor: 'Stability AI', price: 'Free (self-host)', priceClass: 'free', strength: 'Open-source, customizable, local', weakness: 'Requires GPU, setup complexity', bestFor: 'Developers, technical users' },
  { id: 'flux', icon: '⚡', name: 'Flux', vendor: 'Black Forest Labs', price: 'Free + paid API', priceClass: 'free', strength: 'Fast, accurate text rendering', weakness: 'Newer ecosystem', bestFor: 'Text-in-image, quick iteration' },
  { id: 'dalle', icon: '🎭', name: 'DALL-E 3', vendor: 'OpenAI', price: '$20/mo (Plus)', priceClass: 'paid', strength: 'Text understanding, ChatGPT integration', weakness: 'Less artistic, more constrained', bestFor: 'Quick concepts, ChatGPT users' },
  { id: 'ideogram', icon: '✨', name: 'Ideogram', vendor: 'Ideogram AI', price: 'Free + paid', priceClass: 'free', strength: 'Typography, posters, design', weakness: 'Smaller community', bestFor: 'Posters, typography' },
  { id: 'jimeng', icon: '🌟', name: '即梦 / Jimeng', vendor: '字节跳动', price: 'Free + paid', priceClass: 'free', strength: '中文友好, 抖音集成', weakness: 'CN region focus', bestFor: '中文创作者 / Chinese creators' }
];

const detailedCompares = [
  {
    id: 'mj-vs-sd',
    title: 'Midjourney vs Stable Diffusion',
    desc: 'The most common comparison. Choose MJ for ease and artistry, SD for control and free.',
    a: {
      name: 'Midjourney',
      pros: 'Beautiful out of the box, simple Discord/web UI, strong community',
      cons: 'Subscription, no local, no fine-tuning',
      sample: 'cyberpunk samurai, neon rain --ar 16:9 --v 6.1'
    },
    b: {
      name: 'Stable Diffusion',
      pros: 'Free, fine-tune models, ControlNet, inpainting',
      cons: 'Needs RTX 3060+ GPU, more technical',
      sample: 'cyberpunk samurai, neon rain, masterpiece\\nNegative: blurry, lowres'
    }
  }
];
</script>

<style scoped>
.page-header { text-align: center; margin-bottom: 48px; }
.page-header h1 { font-size: 36px; margin-bottom: 8px; }
.page-header p { color: var(--color-text-dim); }

.comparison-table { overflow-x: auto; margin-bottom: 64px; }
.comparison-table table { width: 100%; border-collapse: collapse; background: var(--color-surface); border-radius: var(--radius); overflow: hidden; box-shadow: var(--shadow-sm); }
.comparison-table th, .comparison-table td { padding: 14px 16px; text-align: left; border-bottom: 1px solid var(--color-border); font-size: 14px; color: var(--color-text); }
.comparison-table th { background: var(--color-bg); color: var(--color-text-dim); font-weight: 600; font-size: 13px; text-transform: uppercase; }
.comparison-table tr.highlight { background: color-mix(in srgb, var(--color-primary) 8%, transparent); }
.tool-name { display: flex; align-items: center; gap: 12px; }
.tool-icon { font-size: 24px; }
.tool-vendor { display: block; font-size: 12px; color: var(--color-text-dim); font-weight: 400; }
.price { padding: 4px 10px; border-radius: 12px; font-size: 12px; font-weight: 600; }
.price.free { background: color-mix(in srgb, var(--color-success) 15%, transparent); color: var(--color-success); }
.price.paid { background: color-mix(in srgb, var(--color-accent) 15%, transparent); color: var(--color-accent); }

.detailed-compare { margin-bottom: 48px; }
.detailed-compare h2 { font-size: 24px; margin-bottom: 8px; color: var(--color-text-strong); }
.detailed-compare > p { color: var(--color-text-dim); margin-bottom: 20px; }

.vs-grid { display: grid; grid-template-columns: 1fr auto 1fr; gap: 16px; align-items: stretch; }
@media (max-width: 768px) { .vs-grid { grid-template-columns: 1fr; } }
.vs-card { background: var(--color-surface); border: 1px solid var(--color-border); border-radius: var(--radius); padding: 20px; box-shadow: var(--shadow-sm); }
.vs-card h3 { font-size: 18px; margin-bottom: 12px; padding-bottom: 8px; border-bottom: 1px solid var(--color-border); color: var(--color-text-strong); }
.vs-pros { color: var(--color-success); margin-bottom: 8px; font-size: 14px; line-height: 1.5; }
.vs-cons { color: var(--color-danger); margin-bottom: 12px; font-size: 14px; line-height: 1.5; }
.vs-sample pre { background: var(--color-code-bg); color: var(--color-text); padding: 12px; border-radius: var(--radius); font-family: 'Consolas', monospace; font-size: 12px; white-space: pre-wrap; margin-top: 8px; }
.vs-vs { align-self: center; font-size: 24px; font-weight: 800; color: var(--color-primary); padding: 0 16px; }
</style>
