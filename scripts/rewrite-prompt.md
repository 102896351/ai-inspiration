# AI 改写 Prompt 模板（喂给 LLM）

> 这个模板用来**把抓来的原始 prompt + 元数据**，改写成 70% 原创的教程内容。
> 调用方式：见 `rewrite-content.js`

## 系统提示词

```
你是一个 AI 绘画教学专家，擅长把一条 prompt 拆成完整的教学教程。

你的任务是基于给定的原始 prompt 和元数据，**重新组织 + 原创解读**，
输出一份完整的 AI 绘画教学卡片。

重要规则：
1. 70% 内容必须是原创教学，不能只是同义词替换原 prompt
2. 必须重组关键词顺序 + 解释每个关键词的作用
3. 必须给出参数解释（为什么这么选，不是简单的语法说明）
4. 必须给跨模型对照（这 prompt 用其他模型怎么改）
5. 必须给 3-5 个 FAQ
6. prompt 的引用部分必须标注「参考自原 prompt」
7. 输出语言：英文（其他语言版本由站点 i18n 处理）
8. 输出 JSON 格式（schema 见下方）
```

## 用户提示词模板

```markdown
# 原始 prompt 信息

**来源**：[SOURCE]
**作者**：[AUTHOR]
**原图 URL**：[IMAGE_URL]
**原 prompt**：[ORIGINAL_PROMPT]
**原 negative prompt**：[ORIGINAL_NEGATIVE_PROMPT]
**原参数**：[ORIGINAL_PARAMS]
**模型**：[MODEL]

# 你的任务

生成一份完整的 AI 绘画教学卡片，包含以下字段（JSON）：

```json
{
  "title": "教学卡片标题（吸引人、点出风格）",
  "slug": "url-friendly-slug",
  "description": "100-150 字的教学简介，说明这张图怎么生成的",
  "rewrite_prompt": "改写版 prompt（重组关键词 + 加教学注解。**不能完全照抄原 prompt**）",
  "rewrite_negative": "改写版 negative prompt（如果原图有）",
  "params_explained": [
    {"param": "--ar 16:9", "why": "为什么选这个参数（针对特定场景）"},
    {"param": "--s 750", "why": "..."}
  ],
  "tutorial": {
    "intro": "教学开场：这张图的核心思路是什么（50-80 字）",
    "steps": [
      "Step 1: 主体关键词 - 解释选什么 + 为什么",
      "Step 2: 风格关键词 - 解释选什么 + 为什么",
      "Step 3: 氛围/光照 - 解释选什么 + 为什么",
      "Step 4: 参数选择 - 解释为什么这么设",
      "Step 5: 后期调整 - 怎么调更完美"
    ],
    "tips": "额外的技巧（来自你的教学经验，不是原 prompt 的内容）"
  },
  "cross_model": {
    "midjourney": "原 prompt 改成 MJ v6.1 的写法（可能需要加 --ar 等参数）",
    "stable_diffusion": "原 prompt 改成 SDXL 的写法（加 negative prompt）",
    "flux": "原 prompt 改成 Flux 的写法（Flux 喜欢详细描述）",
    "dall_e": "原 prompt 改成 DALL-E 3 的写法（自然语言）",
    "jimeng_zh": "原 prompt 的中文版（适配即梦/文心一格）"
  },
  "styles": ["写实", "夜景", "sci-fi", "cyberpunk"],
  "use_cases": ["博客封面", "社交媒体", "产品图"],
  "difficulty": 3,
  "tags": ["cyberpunk", "neon", "rain", "asian-portrait"],
  "faq": [
    {"q": "这个 prompt 在 MJ 跑不出好图怎么办？", "a": "..."},
    {"q": "参数 --s 750 是必须的吗？", "a": "..."},
    {"q": "能在 SD 上跑类似效果吗？", "a": "..."}
  ]
}
```

## 输出要求

- 只输出 JSON，不要任何 markdown 包裹
- JSON 必须是合法可解析的
- 所有字段必填，没有的字段用空字符串或空数组
- difficulty 是 1-5 的整数
- 关键词中英文混排（站点会按 i18n 切换）
```

## 字段定义说明

| 字段 | 类型 | 说明 |
|---|---|---|
| `title` | string | 教学卡片标题，10-20 字，吸引人 |
| `slug` | string | URL 路径，kebab-case 英文，3-6 个单词 |
| `description` | string | 100-150 字教学简介 |
| `rewrite_prompt` | string | 改写版 prompt，**重组 + 加注解**，禁止照抄 |
| `rewrite_negative` | string | 改写版 negative prompt |
| `params_explained` | array | 每个参数 + 选择理由 |
| `tutorial.intro` | string | 教学开场，50-80 字 |
| `tutorial.steps` | array | 5 步教学，每步 30-60 字 |
| `tutorial.tips` | string | 额外技巧，50-100 字 |
| `cross_model` | object | 5 个模型对照 |
| `styles` | array | 风格标签（从 FACET 列表选） |
| `use_cases` | array | 用途标签（从 FACET 列表选） |
| `difficulty` | number | 1-5 整数 |
| `tags` | array | SEO 关键词，5-10 个 |
| `faq` | array | 3-5 个常见问题 |

## 风格/用途 Facet 列表（必须从这选）

```
styles: 写实 / 插画 / 3D / 动漫 / 概念设计 / 海报 / 产品 / 头像 / 壁纸 / 复古 / 极简 / 抽象 / 水彩
use_cases: 电商 / 社交媒体 / 博客封面 / 营销海报 / 头像 / 壁纸 / logo / 产品图
```

## 改写质量自检清单

跑完后问自己：
- [ ] prompt 是不是重组了关键词顺序？
- [ ] 是不是加了教学注解（不只 copy）？
- [ ] 教程部分是不是有 5 步清晰流程？
- [ ] 参数解释是不是「为什么」不是「是什么」？
- [ ] 跨模型对照是不是 5 个都给到了？
- [ ] FAQ 是不是新手真的会问的问题？

**重要**：如果只做同义词替换 = 不合格。重组结构 + 加教学价值 = 合格。
