/**
 * AI 改写脚本
 *
 * 工作流：
 * 1. 读取 raw_data/ 下所有 json（来自 fetch-*.js）
 * 2. 每个 item 调 LLM API 改写
 * 3. 输出到 rewritten_data/{source}-rewritten.json
 *
 * LLM 支持：
 * - OpenAI 兼容 API（OpenAI / 国产大模型 / Ollama）
 * - 配置在 .env 文件（LLM_BASE_URL, LLM_API_KEY, LLM_MODEL）
 *
 * 没有 API key 时：MOCK 模式（生成模板骨架，供手动填）
 *
 * 重要：
 * - 改写 prompt 模板在 rewrite-prompt.md
 * - 每条改写独立调用（不要 batch，否则质量会下降）
 * - 失败要重试 + 跳过（不能中断整批）
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const RAW_DIR = path.join(__dirname, '..', 'raw_data');
const REWRITTEN_DIR = path.join(__dirname, '..', 'rewritten_data');
const PROMPT_TEMPLATE_PATH = path.join(__dirname, 'rewrite-prompt.md');
const ENV_PATH = path.join(__dirname, '..', '.env');

// 读 .env
function loadEnv() {
  if (!fs.existsSync(ENV_PATH)) return {};
  const env = {};
  for (const line of fs.readFileSync(ENV_PATH, 'utf-8').split('\n')) {
    const m = line.match(/^([A-Z_]+)=(.+)$/);
    if (m) env[m[1]] = m[2].trim();
  }
  return env;
}

const ENV = loadEnv();
const LLM_CONFIG = {
  baseUrl: ENV.LLM_BASE_URL || 'https://api.openai.com/v1',
  apiKey: ENV.LLM_API_KEY || '',
  model: ENV.LLM_MODEL || 'gpt-4o-mini',
  maxTokens: 4000
};

const SYSTEM_PROMPT = `你是一个 AI 绘画教学专家，擅长把一条 prompt 拆成完整的教学教程。

重要规则：
1. 70% 内容必须是原创教学，不能只是同义词替换原 prompt
2. 必须重组关键词顺序 + 解释每个关键词的作用
3. 必须给出参数解释（为什么这么选，不是简单的语法说明）
4. 必须给跨模型对照（5 个模型：mj / sd / flux / dalle / jimeng_zh）
5. 必须给 3-5 个 FAQ
6. prompt 的引用部分必须标注「参考自原 prompt」
7. 输出英文 JSON（站点 i18n 会处理其他语言）
8. 只输出 JSON，不要任何 markdown 包裹或解释
9. difficulty 是 1-5 的整数
10. styles 从 [写实, 插画, 3D, 动漫, 概念设计, 海报, 产品, 头像, 壁纸, 复古, 极简, 抽象, 水彩, photorealistic, anime, cyberpunk, minimalist, watercolor, oil-painting] 中选
11. use_cases 从 [电商, 社交媒体, 博客封面, 营销海报, 头像, 壁纸, logo, 产品图, e-commerce, blog-header, social-media] 中选
12. tags 5-10 个，英文小写，连字符分隔`;

function buildUserPrompt(item) {
  return `# 原始 prompt 信息

**来源**：${item.source}
**作者**：${item.author}
**原图 URL**：${item.imageUrl}
**原 prompt**：${item.originalPrompt || '(无)'}
**原 negative prompt**：${item.originalNegativePrompt || '(无)'}
**原参数**：${item.originalParams || '(无)'}
**模型**：${item.model}

# 你的任务

生成一份完整的 AI 绘画教学卡片，输出合法 JSON：

{
  "title": "教学卡片标题（吸引人、点出风格）",
  "slug": "url-friendly-slug",
  "description": "100-150 字的教学简介",
  "rewrite_prompt": "改写版 prompt（重组关键词 + 加教学注解，**禁止照抄**）",
  "rewrite_negative": "改写版 negative prompt",
  "params_explained": [{"param": "--ar 16:9", "why": "为什么"}],
  "tutorial": {
    "intro": "教学开场（50-80 字）",
    "steps": ["Step 1: ...", "Step 2: ..."],
    "tips": "额外技巧"
  },
  "cross_model": {
    "midjourney": "...",
    "stable_diffusion": "...",
    "flux": "...",
    "dall_e": "...",
    "jimeng_zh": "..."
  },
  "styles": ["..."],
  "use_cases": ["..."],
  "difficulty": 3,
  "tags": ["..."],
  "faq": [{"q": "...", "a": "..."}]
}

只输出 JSON，不要 markdown。`;
}

async function callLLM(item) {
  if (!LLM_CONFIG.apiKey) {
    return mockRewrite(item);
  }

  const url = `${LLM_CONFIG.baseUrl}/chat/completions`;
  const body = {
    model: LLM_CONFIG.model,
    messages: [
      { role: 'system', content: SYSTEM_PROMPT },
      { role: 'user', content: buildUserPrompt(item) }
    ],
    max_tokens: LLM_CONFIG.maxTokens,
    temperature: 0.7,
    response_format: { type: 'json_object' }
  };

  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${LLM_CONFIG.apiKey}`
    },
    body: JSON.stringify(body)
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`LLM ${res.status}: ${err.slice(0, 200)}`);
  }

  const data = await res.json();
  const content = data.choices?.[0]?.message?.content;
  if (!content) throw new Error('No content in LLM response');
  return JSON.parse(content);
}

// Mock 改写：没有 API key 时生成模板骨架
function mockRewrite(item) {
  console.log('  [mock] No API key, generating template');
  return {
    title: item.title || `Sample ${item.model} prompt #${item.id}`,
    slug: `sample-${item.id}`,
    description: '(需要 LLM API key 才能生成教学内容) - 编辑这条记录填入教学',
    rewrite_prompt: item.originalPrompt || '(原 prompt)',
    rewrite_negative: item.originalNegativePrompt || '',
    params_explained: [],
    tutorial: {
      intro: '(待 LLM 改写)',
      steps: ['(待改写)', '(待改写)', '(待改写)'],
      tips: '(待改写)'
    },
    cross_model: {
      midjourney: '(待改写)',
      stable_diffusion: '(待改写)',
      flux: '(待改写)',
      dall_e: '(待改写)',
      jimeng_zh: '(待改写)'
    },
    styles: [],
    use_cases: [],
    difficulty: 3,
    tags: [],
    faq: []
  };
}

async function rewriteFile(inFile) {
  const source = path.basename(inFile, '-raw.json');
  const outFile = path.join(REWRITTEN_DIR, `${source}-rewritten.json`);
  const items = JSON.parse(fs.readFileSync(inFile, 'utf-8'));
  const results = [];

  console.log(`\n📝 Rewriting ${items.length} items from ${source}...`);

  for (let i = 0; i < items.length; i++) {
    const item = items[i];
    process.stdout.write(`  [${i + 1}/${items.length}] ${item.id} ... `);
    try {
      const rewritten = await callLLM(item);
      const merged = {
        // 原始元数据
        id: item.id,
        source: item.source,
        sourceUrl: item.sourceUrl,
        imageUrl: item.imageUrl,
        author: item.author,
        model: item.model,
        originalPrompt: item.originalPrompt,
        // LLM 改写
        ...rewritten
      };
      results.push(merged);
      console.log('✓');
    } catch (e) {
      console.log(`✗ ${e.message.slice(0, 60)}`);
    }

    // Rate limit（每分钟不超过 60 次，看 LLM provider 限制）
    if (LLM_CONFIG.apiKey) {
      await new Promise(r => setTimeout(r, 1000));
    }
  }

  fs.writeFileSync(outFile, JSON.stringify(results, null, 2), 'utf-8');
  console.log(`  ✅ ${results.length} rewritten → ${outFile}`);
  return outFile;
}

async function main() {
  console.log('🤖 AI Rewrite starting...\n');
  if (!fs.existsSync(REWRITTEN_DIR)) fs.mkdirSync(REWRITTEN_DIR, { recursive: true });

  if (!LLM_CONFIG.apiKey) {
    console.log('⚠️  No LLM_API_KEY in .env — running in MOCK mode.');
    console.log('   Create .env file:');
    console.log('   LLM_API_KEY=sk-xxx');
    console.log('   LLM_BASE_URL=https://api.openai.com/v1');
    console.log('   LLM_MODEL=gpt-4o-mini\n');
  } else {
    console.log(`🔌 LLM: ${LLM_CONFIG.model} @ ${LLM_CONFIG.baseUrl}\n`);
  }

  const files = fs.readdirSync(RAW_DIR).filter(f => f.endsWith('-raw.json'));
  if (files.length === 0) {
    console.log('❌ No raw data found. Run: npm run fetch:all first.');
    return;
  }

  for (const f of files) {
    await rewriteFile(path.join(RAW_DIR, f));
  }

  console.log('\n✅ All done. Next step: npm run integrate');
}

main().catch(e => {
  console.error('Fatal:', e);
  process.exit(1);
});
