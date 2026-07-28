/**
 * Seed Mock Data
 *
 * 沙箱不能联网抓取，所以直接灌 12 条高质量 mock 数据
 * 每条都包含：完整 prompt + 教程 + 跨模型对照 + FAQ
 *
 * 用户本地跑 `node scripts/seed-mock-data.js` 后
 * 直接 `npm run integrate && npm run dev` 就能看到效果
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const REWRITTEN_DIR = path.join(__dirname, '..', 'rewritten_data');

const MOCK_DATA = [
  // ===== Midjourney - Cyberpunk =====
  {
    id: 'seed-cyberpunk-street-mj',
    source: 'Civitai',
    sourceUrl: 'https://civitai.com/images/cyberpunk-street-mj',
    imageUrl: 'https://image.civitai.com/xG1nkqbyTM5Gq8cqwU6wmG3skAcQ/width=1024/sample.webp',
    author: 'aigallery_demo',
    model: 'midjourney',
    originalPrompt: 'cyberpunk street at night, neon signs, rain, asian woman, futuristic --ar 16:9 --v 6.1',
    originalNegativePrompt: '',
    originalParams: '--ar 16:9 --v 6.1 --s 750',

    title: '赛博朋克雨夜街角：完整 prompt 拆解',
    slug: 'cyberpunk-rain-street-tutorial',
    description: '本教程用 Midjourney v6.1 拆解一张经典赛博朋克街景图。从关键词分层、参数选择到跨模型移植，让你掌握赛博朋克风的核心写法。',

    rewrite_prompt: 'cinematic cyberpunk street corner at night, heavy rain reflections on wet asphalt, glowing neon signs in japanese and chinese, young woman with cybernetic jacket looking back, blade runner 2049 atmosphere, shallow depth of field, anamorphic lens flare --ar 16:9 --s 750 --v 6.1',
    rewrite_negative: '--no blurry, low quality, deformed, watermark, text errors',

    params_explained: [
      { param: '--ar 16:9', why: '横版构图适合视频封面 / banner / 博客头图。MJ 默认 1:1，用 16:9 显式指定' },
      { param: '--s 750', why: '高 stylize 让 MJ 自由发挥艺术风格（默认 100）。适合艺术化场景' },
      { param: '--v 6.1', why: 'v6.1 写实但保留艺术性。比 v5 文字理解更好，比 v7 更稳定' }
    ],

    tutorial: {
      intro: '赛博朋克是 MJ 的强项，但要写出"电影感"而非"塑料感"，需要分层叠加关键词 + 选对参数。',
      steps: [
        '【主体层】cyberpunk street corner at night — 锁定场景 + 时间 + 空间（街角 + 夜晚）',
        '【氛围层】heavy rain reflections + glowing neon signs in japanese and chinese — 雨 + 霓虹 + 多语言招牌是赛博朋克视觉标配',
        '【人物层】young woman with cybernetic jacket looking back — 一个回头人物加故事感，不要写"a woman"太泛',
        '【风格层】blade runner 2049 atmosphere + cinematic + anamorphic lens flare — 锚定到具体电影 + 镜头术语',
        '【参数层】--ar 16:9 横版 + --s 750 高 stylize + --v 6.1 最新稳定版。这三参数组合适合艺术化场景'
      ],
      tips: '关键技巧：把"cinematic / anamorphic / 35mm" 等镜头术语塞进 prompt，比"beautiful / amazing" 有效 10 倍。MJ 见过太多 "beautiful cyberpunk girl" 了。'
    },

    cross_model: {
      midjourney: '原 prompt 直接用，--s 750 是核心参数',
      stable_diffusion: '正向用上面英文 prompt，negative 加: blurry, lowres, watermark, text artifacts\n推荐模型：SDXL + JuggernautXL\nCFG 7, Steps 30, Sampler DPM++ 2M Karras',
      flux: 'Flux 喜欢更详细的描述，可以加: "shot on Sony Venice, color graded teal and orange, shallow DOF f/1.4"\nFlux 对英文 prompt 理解力强，不用 negative prompt',
      dall_e: 'DALL-E 3 适合自然语言: "A cinematic cyberpunk street scene at night with heavy rain, glowing Japanese neon signs, a young woman in a cybernetic jacket looking back, in the style of Blade Runner 2049"',
      jimeng_zh: '赛博朋克风格，雨夜，霓虹灯，年轻女性回头看，赛博夹克，浅景深，电影感。 --ar 16:9'
    },

    styles: ['写实', '夜景', 'sci-fi', 'cyberpunk'],
    useCases: ['博客封面', '社交媒体', '视频缩略图', '游戏概念'],
    difficulty: 3,
    tags: ['cyberpunk', 'neon', 'rain', 'asian-portrait', 'cinematic', 'blade-runner'],
    faq: [
      { q: '为什么我的赛博朋克图总是塑料感？', a: '通常 stylize 太低（默认 100）。试 --s 750 或更高，MJ 才有"电影感"的发挥空间。' },
      { q: '怎么让 MJ 准确生成"雨"？', a: '加 "heavy rain reflections on wet asphalt" 比单独写 "rain" 强 5 倍。MJ 对反射/倒影理解很好。' },
      { q: 'MJ v6 和 v6.1 区别大吗？', a: 'v6.1 在文字渲染 + 一致性上更好。v6 创意更发散，看场景选。' },
      { q: '参数 --chaos 0-100 怎么用？', a: '--chaos 20 让结果更多样（适合探索）。0-10 太死板，30+ 太随机。' }
    ]
  },

  // ===== SDXL - Photorealistic Portrait =====
  {
    id: 'seed-portrait-sdxl-juggernaut',
    source: 'Civitai',
    sourceUrl: 'https://civitai.com/images/portrait-sdxl-demo',
    imageUrl: 'https://image.civitai.com/xG1nkqbyTM5Gq8cqwU6wmG3skAcQ/width=1024/portrait-sample.webp',
    author: 'aigallery_demo',
    model: 'stable-diffusion',
    originalPrompt: 'portrait photo of a young woman, natural light, 85mm lens, bokeh',
    originalNegativePrompt: 'blurry, lowres, deformed face',
    originalParams: 'SDXL + JuggernautXL, Steps 30, CFG 7',

    title: 'SDXL 写真人像：参数与模型选择完全指南',
    slug: 'sdxl-photorealistic-portrait-guide',
    description: '用 SDXL 跑商业级写真人像的关键不是 prompt，是 checkpoint + 采样参数 + ControlNet。本教程给完整配置。',

    rewrite_prompt: 'professional portrait photograph of a young woman in her 20s, natural soft window light from left, subtle smile, looking slightly off-camera, 85mm f/1.4 lens, shallow depth of field, bokeh, natural skin texture, magazine cover quality, kodak portra 400 film emulation',
    rewrite_negative: 'blurry, lowres, deformed face, extra fingers, mutated hands, watermark, text, bad anatomy, plastic skin, oversaturated',

    params_explained: [
      { param: 'Checkpoint: JuggernautXL v9', why: '写真人像目前最强 SDXL 模型，写实度 + 皮肤质感都顶。RealVisXL / epiCRealism 备选' },
      { param: 'Steps 30, CFG 7', why: '写实类推荐 Steps 25-35 + CFG 6-8。CFG 太高会过饱和' },
      { param: 'Sampler: DPM++ 2M Karras', why: '收敛快 + 细节好，是写实类的标配采样器' },
      { param: 'VAE: sdxl_vae.safetensors', why: '默认 VAE 会偏灰，换这个色彩更准' }
    ],

    tutorial: {
      intro: 'SDXL 写真人像的关键是：模型 > prompt > 参数。先选对 checkpoint，再谈 prompt。',
      steps: [
        '【选模型】下载 JuggernautXL v9 或 RealVisXL V5.1，写真人像天花板。不要用 SDXL base 裸跑。',
        '【基础 prompt】锁定主体 + 镜头 + 光线 + 风格: "85mm f/1.4" 比 "DSLR photo" 强 100 倍',
        '【Negative prompt】写实类必备: deformed, extra fingers, mutated hands, bad anatomy, plastic skin',
        '【采样参数】Steps 30, CFG 7, Sampler DPM++ 2M Karras, Size 832x1216 (竖版人像)',
        '【后期】用 ADetailer 修复面部 / 跑 hires-fix 2x 提升细节 / Topaz Gigapixel 二次放大'
      ],
      tips: '皮肤质感是写实和 AI 感的分水岭。加 "natural skin texture, pores visible" 强制 SD 渲染皮肤细节，比任何 LoRA 都有效。'
    },

    cross_model: {
      midjourney: 'MJ v6.1 写实比 SDXL 默认强，但 SDXL + JuggernautXL 细节更丰富。MJ prompt: "professional portrait photograph of a young woman, 85mm lens, bokeh, kodak portra --ar 2:3 --v 6.1"',
      stable_diffusion: '原 prompt + 上面 4 步配置，直接出图',
      flux: 'Flux 写实比 SD 强，prompt 改自然语言: "A professional portrait of a young woman in her 20s with soft window light, 85mm lens, shallow depth of field"',
      dall_e: 'DALL-E 3 写实不错但皮肤质感偏"商业修图"，不如 SD 真实',
      jimeng_zh: '专业人像摄影，年轻女性，85mm 镜头，浅景深，自然光，柯达克 Portra 400 胶片质感'
    },

    styles: ['写实', '人像', 'portrait'],
    useCases: ['头像', '社交媒体', '博客封面', '电商'],
    difficulty: 4,
    tags: ['sdxl', 'photorealistic', 'portrait', '85mm', 'kodak-portra', 'juggernaut'],
    faq: [
      { q: 'SDXL base 跑人像为什么不真实？', a: 'base 模型训练数据偏向通用。要写真人必须用 fine-tune 模型：JuggernautXL / RealVisXL / epiCRealism' },
      { q: 'CFG 多少合适？', a: '写实类 6-8，动漫类 7-10，概念类 9-12。CFG > 12 通常过饱和' },
      { q: 'Steps 30 vs 50 差别大吗？', a: 'DPM++ 2M Karras 在 25-30 步就收敛了。50 步只是更慢没明显更好' },
      { q: '如何修复手部？', a: '1) Negative prompt 写 hands 2) ADetailer 插件 3) inpaint 重画 4) 换 SVD 模型' }
    ]
  },

  // ===== MJ Anime =====
  {
    id: 'seed-anime-mj-niji',
    source: 'Civitai',
    sourceUrl: 'https://civitai.com/images/anime-mj-niji',
    imageUrl: 'https://image.civitai.com/xG1nkqbyTM5Gq8cqwU6wmG3skAcQ/width=1024/anime-sample.webp',
    author: 'aigallery_demo',
    model: 'midjourney',
    originalPrompt: 'anime girl, sakura petals, kimono, studio ghibli',
    originalParams: '--niji 6 --ar 3:4',

    title: '吉卜力风动漫人像：Niji 模式完全攻略',
    slug: 'ghibli-anime-style-mj-niji',
    description: 'MJ Niji 6 跑吉卜力风 / 新海诚风 / 鬼灭风的关键是锚定到具体作品 + 配色词 + 镜头词。',

    rewrite_prompt: 'anime girl in traditional japanese kimono with cherry blossom pattern, standing under a thousand-year sakura tree, petals falling in the wind, golden hour light filtering through branches, hayao miyazaki style, studio ghibli color palette, hand-painted texture, watercolor background, soft focus --niji 6 --ar 3:4',

    params_explained: [
      { param: '--niji 6', why: 'MJ 专门为动漫优化的模型。比 v6 动漫强 50%' },
      { param: '--ar 3:4', why: '竖版人像 / 海报标准比例' },
      { param: '指定"hayao miyazaki style"', why: '锚定到具体艺术家 > 写"anime style"。MJ 见过 1000 种 anime style，但 miyazaki 风格很独特' }
    ],

    tutorial: {
      intro: 'Niji 6 是 MJ 跑动漫的最佳模式。掌握"作品名 + 配色 + 镜头"三件套，跑出吉卜力 / 新海诚 / 鬼灭风。',
      steps: [
        '【作品锚定】写"hayao miyazaki style" / "makoto shinkai style" / "demon slayer style" 比"anime" 强 10 倍',
        '【主体层】anime girl in traditional japanese kimono with cherry blossom pattern — 主体 + 服装 + 图案',
        '【环境层】standing under a thousand-year sakura tree, petals falling in the wind — 场景 + 动态',
        '【光线层】golden hour light filtering through branches — 吉卜力最爱黄金时刻光',
        '【质感层】hand-painted texture, watercolor background, soft focus — 吉卜力手绘 + 水彩背景'
      ],
      tips: 'Niji 6 比 v6 优势在眼睛和头发细节。如果你想要"新海诚风"（超写实光影），反而用 v6 + "makoto shinkai" prompt 更好。'
    },

    cross_model: {
      midjourney: 'Niji 6 模式，--ar 3:4，--s 100 (低 stylize 保留原画感)',
      stable_diffusion: 'Anything V5 / Counterfeit V3 + "anime, masterpiece, best quality"\nNegative: "lowres, bad anatomy, bad hands"\n推荐用 AOM3 + 8steps CFG 11',
      flux: 'Flux 动漫还行但不如 SD 生态丰富。Prompt: "Anime girl in kimono under sakura tree, Ghibli style, hand-painted watercolor"',
      dall_e: 'DALL-E 3 动漫不如 MJ Niji 6 和 SD 生态',
      jimeng_zh: '动漫风格少女，和服，樱花树下，花瓣飘落，宫崎骏风格，水彩手绘感'
    },

    styles: ['动漫', '插画', 'anime', 'ghibli'],
    useCases: ['头像', '壁纸', '博客封面', '插画'],
    difficulty: 2,
    tags: ['anime', 'ghibli', 'miyazaki', 'kimono', 'sakura', 'niji'],
    faq: [
      { q: 'Niji 6 和 MJ v6 动漫谁强？', a: 'Niji 6 在纯动漫 + 二次元更强。v6 在新海诚/写实动漫融合场景更好。' },
      { q: '如何跑"新海诚风"？', a: '用 MJ v6 (不是 niji) + "makoto shinkai style" + "cinematic lighting, hyper detailed sky"' },
      { q: '为什么我跑不出吉卜力？', a: '必须写 "hayao miyazaki" 或 "studio ghibli"。光写 "anime" MJ 不知道你要哪个流派。' }
    ]
  },

  // ===== MJ 3D Pixar =====
  {
    id: 'seed-3d-pixar-character',
    source: 'Civitai',
    sourceUrl: 'https://civitai.com/images/3d-pixar-demo',
    imageUrl: 'https://image.civitai.com/xG1nkqbyTM5Gq8cqwU6wmG3skAcQ/width=1024/3d-sample.webp',
    author: 'aigallery_demo',
    model: 'midjourney',
    originalPrompt: '3d pixar character, cute robot --v 6.1',
    originalParams: '--v 6.1 --ar 1:1',

    title: '皮克斯 3D 角色：MJ 完全教程',
    slug: 'pixar-3d-character-tutorial',
    description: 'MJ v6.1 跑皮克斯 / 皮克斯风 3D 角色的关键词拆解 + 跨平台移植。',

    rewrite_prompt: 'adorable 3d character render of a small robot with big expressive eyes, sitting in a flower meadow, holding a tiny lantern, soft volumetric lighting, pixar style rendering, subsurface scattering, bokeh background, unreal engine 5, octane render --v 6.1 --ar 1:1 --s 600',

    params_explained: [
      { param: '--v 6.1', why: 'v6.1 在 3D 渲染风格理解上比 v5 强很多' },
      { param: '--s 600', why: '中高度 stylize 平衡创意 + 一致性' },
      { param: '指定渲染器', why: '"unreal engine 5" / "octane render" 比 "3d" 强 100 倍，MJ 知道这些渲染器的视觉特征' }
    ],

    tutorial: {
      intro: 'MJ v6.1 跑 3D 角色比 SDXL 强，但需要明确指定渲染器和风格。',
      steps: [
        '【渲染器锚定】写 "unreal engine 5" / "octane render" / "redshift" / "blender cycles" 比 "3d" 强 10 倍',
        '【风格锚定】"pixar" / "disney" / "dreamworks" 比 "3d cartoon" 强 5 倍',
        '【主体特征】adorable 3d character render of a small robot with big expressive eyes — 角色 + 体型 + 关键特征',
        '【场景】sitting in a flower meadow, holding a tiny lantern — 3D 角色一定要有场景衬托',
        '【技术参数】soft volumetric lighting + subsurface scattering + bokeh — 让 MJ 知道要 PBR 渲染质感'
      ],
      tips: '3D 风格最容易被误判为"AI 感"。加 "rendered in unreal engine 5, octane" 这种引擎锚定词，可以显著提升"专业感"。'
    },

    cross_model: {
      midjourney: '--v 6.1 --s 600 --ar 1:1',
      stable_diffusion: 'Checkpoint: DreamShaper XL / 3D Animation Diffusion\nPrompt: "3d character, pixar style, masterpiece"\nNegative: "2d, flat, anime, realistic"',
      flux: 'Flux 在 3D 风格上不如 MJ。Prompt: "3D rendered character in Pixar style with volumetric lighting, unreal engine"',
      dall_e: 'DALL-E 3 3D 角色不错，但风格偏"商业插画"而非"皮克斯动画"',
      jimeng_zh: '皮克斯风格 3D 角色，机器人，草地，花丛，灯笼，体积光，octane 渲染'
    },

    styles: ['3D', '插画', 'cartoon', '3d-render'],
    useCases: ['头像', '产品图', '营销海报', '博客封面'],
    difficulty: 2,
    tags: ['3d', 'pixar', 'character', 'unreal-engine', 'cute'],
    faq: [
      { q: '为什么我的 3D 角色很"AI 感"？', a: '通常没指定渲染器。加 "octane render" / "unreal engine 5" 立刻变专业。' },
      { q: 'MJ 跑 3D 角色和 SD 比？', a: 'MJ v6.1 速度快 + 风格准。SDXL 生态强 (LoRA 多) 但调参麻烦。' },
      { q: '如何保持角色一致性？', a: 'MJ 用 --cref + 角色图。SD 用 IP-Adapter + Face ID LoRA' }
    ]
  },

  // ===== Flux Product Photography =====
  {
    id: 'seed-flux-product-photo',
    source: 'Civitai',
    sourceUrl: 'https://civitai.com/images/flux-product',
    imageUrl: 'https://image.civitai.com/xG1nkqbyTM5Gq8cqwU6wmG3skAcQ/width=1024/product-sample.webp',
    author: 'aigallery_demo',
    model: 'flux',
    originalPrompt: 'luxury watch product photography, white background, studio lighting',
    originalParams: 'Flux.1 dev, 1024x1024',

    title: '电商产品图：Flux vs SDXL 完全对比',
    slug: 'product-photography-flux-vs-sdxl',
    description: '电商产品图（手表/化妆品/电子产品）用什么 AI 出图最稳？Flux vs SDXL 实战对比。',

    rewrite_prompt: 'professional product photograph of a luxury automatic watch on a black velvet display cushion, dramatic studio lighting with rim light from the right, soft fill light from the left, hyper detailed metal texture, visible screws and engravings, bokeh background of dark walnut wood, 8k commercial photography, advertising campaign quality',

    params_explained: [
      { param: 'Flux.1 dev', why: 'Flux 在产品图上比 SD 强 30%，尤其是金属/玻璃反光' },
      { param: '不指定 negative', why: 'Flux 没有 negative prompt，正向写全' },
      { param: '8k + commercial photography', why: '锚定到商业摄影标准' }
    ],

    tutorial: {
      intro: '产品图是 AI 最擅长的场景之一（少人物 + 明确主体）。Flux 在这个领域目前最强。',
      steps: [
        '【主体 + 材质】luxury automatic watch on a black velvet display cushion — 主体 + 支撑物',
        '【光线】dramatic studio lighting with rim light from the right, soft fill light from the left — 戏剧光 + 补光',
        '【细节锚定】hyper detailed metal texture, visible screws and engravings — 强制模型渲染微观细节',
        '【背景】bokeh background of dark walnut wood — 浅景深 + 暖色木质背景提升档次',
        '【质量词】8k commercial photography, advertising campaign quality — 商业级标准锚定'
      ],
      tips: '产品图最忌"AI 塑料感"。加 "hyper detailed metal texture, visible screws" 这种微观细节词，立刻从 AI 变商业。'
    },

    cross_model: {
      midjourney: 'MJ v6.1 商业产品图: "professional product photograph of a luxury watch, dramatic studio lighting, 8k --ar 1:1 --s 250 --v 6.1"',
      stable_diffusion: 'SDXL + JuggernautXL / RealVisXL\nSteps 30, CFG 7\n加 controlnet depth 模型固定手表位置',
      flux: '原 prompt 直接用，Flux 在产品图最强',
      dall_e: 'DALL-E 3 产品图不错但容易加"多余元素"',
      jimeng_zh: '专业产品摄影，奢侈手表，黑色天鹅绒底座，戏剧光，超细节金属质感，8K 商业级'
    },

    styles: ['写实', '产品', 'commercial', 'studio'],
    useCases: ['电商', '产品图', '营销海报', '广告'],
    difficulty: 3,
    tags: ['product', 'commercial', 'flux', 'studio', 'luxury'],
    faq: [
      { q: 'Flux vs SDXL 跑产品图？', a: 'Flux 金属/玻璃反光更强，SDXL 生态丰富（LoRA 多）。商业级推荐 Flux' },
      { q: '为什么产品图背景总是乱？', a: 'prompt 里没指定背景。加 "solid white background" 或具体背景描述' },
      { q: '电商产品图用哪个模型最稳？', a: 'Flux > SDXL+Juggernaut > MJ v6.1。MJ 偶尔会"创意"出意外元素' }
    ]
  },

  // ===== MJ - Vintage =====
  {
    id: 'seed-vintage-poster-mj',
    source: 'Civitai',
    sourceUrl: 'https://civitai.com/images/vintage-poster',
    imageUrl: 'https://image.civitai.com/xG1nkqbyTM5Gq8cqwU6wmG3skAcQ/width=1024/vintage-sample.webp',
    author: 'aigallery_demo',
    model: 'midjourney',
    originalPrompt: 'vintage travel poster, 1950s, paris',
    originalParams: '--niji 6 --ar 3:4',

    title: '复古海报：1950 巴黎旅游海报 prompt 拆解',
    slug: 'vintage-travel-poster-paris',
    description: '跑 1950s 复古旅游海报（巴黎/纽约/东京）的 prompt 写法 + 字体生成技巧。',

    rewrite_prompt: 'vintage 1950s travel poster of paris, art deco style, eiffel tower in the background, bold sans-serif typography saying "VISIT PARIS", warm sunset color palette with mustard yellow, burnt orange, and teal blue, screen print texture, halftone dots, slight aging and paper texture --niji 6 --ar 3:4',

    params_explained: [
      { param: '--niji 6', why: 'Niji 对复古插画/海报风理解比 v6 好' },
      { param: '--ar 3:4', why: '海报标准比例' },
      { param: 'art deco + 配色词', why: 'art deco 是 1950s 视觉风格的根，必须写' }
    ],

    tutorial: {
      intro: '复古海报的关键是：年代 + 风格运动 + 配色 + 印刷质感 + 字体锚定。',
      steps: [
        '【年代锚定】1950s / 1960s / 1970s — 必须写具体年代',
        '【风格运动】art deco / bauhaus / pop art / psychedelic — 锚定设计史',
        '【具体内容】vintage travel poster of paris, eiffel tower — 海报类型 + 地点 + 主体',
        '【字体提示】bold sans-serif typography saying "VISIT PARIS" — MJ 现在能渲染英文文字了',
        '【配色】warm sunset color palette with mustard yellow, burnt orange, and teal blue — 1950s 标志色',
        '【印刷质感】screen print texture, halftone dots, slight aging — 区分"AI 完美"和"真实复古"'
      ],
      tips: 'MJ 在 v6/v6.1/niji 6 都能生成简单英文文字。如果你需要中文文字，用 Ideogram 2.0。'
    },

    cross_model: {
      midjourney: '--niji 6 --ar 3:4 --style raw (低 stylize 保留原画风)',
      stable_diffusion: 'SDXL + Dreamshaper 或 Proteus\nNegative: "modern, photorealistic, anime"',
      flux: 'Flux 复古风强: 加 "letterpress printing, vintage paper texture"',
      dall_e: 'DALL-E 3 复古风 OK 但风格不极致',
      jimeng_zh: '1950 年代复古海报，巴黎，埃菲尔铁塔，art deco 风格，丝网印刷质感，halftone 网点'
    },

    styles: ['复古', '海报', 'vintage', 'art-deco'],
    useCases: ['营销海报', '博客封面', '壁纸', 'T 恤设计'],
    difficulty: 3,
    tags: ['vintage', 'retro', '1950s', 'poster', 'art-deco', 'paris'],
    faq: [
      { q: 'MJ 能生成中文文字吗？', a: 'v6.1 简单中文可以但不准。推荐 Ideogram 2.0 专门跑中文海报' },
      { q: '如何让海报更"真"复古？', a: '加 "halftone dots, screen print texture, slight aging" 这些印刷工艺词' },
      { q: '为什么我的 1950s 风像 1980s？', a: '可能是配色用了霓虹。1950s 用 mustard yellow + teal，1980s 用 neon pink + cyan' }
    ]
  },

  // ===== Ideogram 2.0 - Typography =====
  {
    id: 'seed-ideogram-typography',
    source: 'Civitai',
    sourceUrl: 'https://civitai.com/images/ideogram-typography',
    imageUrl: 'https://image.civitai.com/xG1nkqbyTM5Gq8cqwU6wmG3skAcQ/width=1024/ideogram-sample.webp',
    author: 'aigallery_demo',
    model: 'ideogram',
    originalPrompt: 'cafe logo, modern minimal, "BREW LAB"',
    originalParams: 'Ideogram 2.0, 1:1',

    title: 'Ideogram 2.0 字体海报：logo 设计新选择',
    slug: 'ideogram-typography-logo-design',
    description: 'Ideogram 2.0 是目前 AI 字体渲染最准的模型。咖啡店 logo、活动海报、品牌设计都靠它。',

    rewrite_prompt: 'modern minimalist cafe logo design, geometric coffee bean icon, text "BREW LAB" in bold sans-serif typography below the icon, monochromatic black and white color scheme, vector graphic style, clean lines, professional branding',

    params_explained: [
      { param: 'Ideogram 2.0', why: '目前 AI 渲染文字最准的模型（远超 MJ/SD）' },
      { param: 'vector graphic style', why: '指定矢量风格，避免 AI 拍照感' }
    ],

    tutorial: {
      intro: 'Ideogram 2.0 是 logo / 海报 / 文字密集型设计的最佳 AI 工具。',
      steps: [
        '【用 Ideogram 2.0】专门跑文字设计，比 MJ/SD 文字准确率高 90%',
        '【文字必须引号】"BREW LAB" — 告诉模型这是要渲染的文字',
        '【风格锁定】modern minimalist / vintage / art deco / hand-lettered — 风格选一个',
        '【图标描述】geometric coffee bean icon — 即使是 logo 也要描述图标',
        '【配色】monochromatic black and white — 简洁配色让 AI 不会乱加颜色'
      ],
      tips: 'Ideogram 2.0 是目前唯一能稳定渲染中英文字体的 AI。中文 logo 直接写 "品牌名称" 就行。'
    },

    cross_model: {
      midjourney: 'MJ v6.1 文字渲染变好但仍经常错字。MJ: "logo design saying BREW LAB --v 6.1"',
      stable_diffusion: 'SD 不擅长文字，需要 inpaint 后期',
      flux: 'Flux 文字能力不错但不如 Ideogram',
      dall_e: 'DALL-E 3 文字还行',
      jimeng_zh: '即梦中文 logo 渲染不错: "现代简约咖啡店 logo, BREW LAB, 几何咖啡豆图标"'
    },

    styles: ['logo', 'minimalist', 'branding'],
    useCases: ['logo', '营销海报', 'T 恤设计', '品牌设计'],
    difficulty: 2,
    tags: ['ideogram', 'logo', 'typography', 'branding', 'minimalist'],
    faq: [
      { q: 'MJ 文字错字怎么解决？', a: '换 Ideogram 2.0。或者 inpaint 后期修复' },
      { q: 'logo 设计用哪个 AI？', a: 'Ideogram 2.0 > Flux > MJ v6.1。SD 适合有 LoRA 时' }
    ]
  },

  // ===== MJ Fantasy Landscape =====
  {
    id: 'seed-fantasy-landscape-mj',
    source: 'Civitai',
    sourceUrl: 'https://civitai.com/images/fantasy-landscape',
    imageUrl: 'https://image.civitai.com/xG1nkqbyTM5Gq8cqwU6wmG3skAcQ/width=1024/fantasy-sample.webp',
    author: 'aigallery_demo',
    model: 'midjourney',
    originalPrompt: 'fantasy landscape, floating islands, magical forest',
    originalParams: '--v 6.1 --ar 21:9',

    title: '奇幻风景：浮空岛 + 魔法森林 prompt 教程',
    slug: 'fantasy-floating-island-mj',
    description: 'MJ v6.1 跑史诗奇幻风景（浮空岛、魔法森林、发光湖泊）的核心技巧。',

    rewrite_prompt: 'epic fantasy landscape, three floating islands suspended above a glowing misty forest, waterfalls cascading from each island into the void below, ancient runes carved into the rocks, bioluminescent plants glowing blue and purple, ancient ruined temple on the largest island, dramatic golden hour sunlight breaking through storm clouds, hyper detailed, 8k, unreal engine 5, dnd concept art --v 6.1 --ar 21:9 --s 850',

    params_explained: [
      { param: '--ar 21:9', why: '超宽画幅，电影级 banner 比例' },
      { param: '--s 850', why: '极高 stylize 适合奇幻史诗场景' },
      { param: 'dnd concept art', why: '锚定到 DND 美术风格，MJ 知道这是高质量参考' }
    ],

    tutorial: {
      intro: '奇幻风景的关键：分层叠加（天空 + 主体 + 地面）+ 锚定到概念艺术家。',
      steps: [
        '【天空层】dramatic golden hour sunlight breaking through storm clouds — 光线 + 戏剧性天空',
        '【主体层】three floating islands suspended above a glowing misty forest — 多个浮空岛 + 数量 + 关系',
        '【动态层】waterfalls cascading from each island into the void below — 动态元素（瀑布）',
        '【细节层】ancient runes carved into the rocks, bioluminescent plants — 微观细节',
        '【故事层】ancient ruined temple on the largest island — 加一个建筑讲故事',
        '【风格锚定】dnd concept art + unreal engine 5 — 锚定到游戏概念艺术 + 渲染器'
      ],
      tips: '"floating islands" 单独写太单调。写"three floating islands" + "cascading waterfalls" + "ancient temple" 三件套，MJ 才有"史诗感"。'
    },

    cross_model: {
      midjourney: '--v 6.1 --ar 21:9 --s 850 --chaos 15 (小幅变化)',
      stable_diffusion: 'SDXL + Dreamshaper XL\nPrompt: "epic fantasy landscape, floating islands, magical forest, masterpiece"\nNegative: "modern, urban, anime"',
      flux: 'Flux 奇幻风强，加 "shot on Hasselblad, medium format, golden hour"',
      dall_e: 'DALL-E 3 奇幻 OK 但不如 MJ 史诗感',
      jimeng_zh: '史诗奇幻风景，浮空岛，魔法森林，瀑布，古代遗迹，金色阳光，8K'
    },

    styles: ['概念设计', '插画', 'fantasy', 'landscape'],
    useCases: ['壁纸', '博客封面', '游戏概念', '视频缩略图'],
    difficulty: 4,
    tags: ['fantasy', 'landscape', 'floating-island', 'epic', 'dnd', 'concept-art'],
    faq: [
      { q: '奇幻风景太"满"怎么办？', a: '删掉一半元素。少即是多。聚焦 1 个主体 + 1 个故事点' },
      { q: '如何让浮空岛悬浮感更强？', a: '加 "waterfalls cascading into the void below" — 瀑布消失在下方的虚无里，立刻有悬浮感' },
      { q: 'MJ vs SD 跑奇幻？', a: 'MJ 速度快 + 构图好。SD + Dreamshaper 风格多样。Flux 最稳' }
    ]
  },

  // ===== Flux Anime Style =====
  {
    id: 'seed-flux-soft-anime',
    source: 'Civitai',
    sourceUrl: 'https://civitai.com/images/flux-anime',
    imageUrl: 'https://image.civitai.com/xG1nkqbyTM5Gq8cqwU6wmG3skAcQ/width=1024/flux-anime-sample.webp',
    author: 'aigallery_demo',
    model: 'flux',
    originalPrompt: 'soft anime illustration, girl with cat ears, soft lighting',

    title: 'Flux 软萌动漫风：日系插画 prompt',
    slug: 'flux-soft-anime-illustration',
    description: 'Flux 跑日系软萌动漫的 prompt 写法 + 跨模型对比。',

    rewrite_prompt: 'soft anime illustration of a young girl with white cat ears and golden eyes, wearing a pastel pink hoodie, sitting on a windowsill at sunset, holding a small cup of tea, soft pink and orange color palette, gentle wind blowing her hair, detailed anime eyes, watercolor texture, makoto shinkai inspired lighting',

    params_explained: [
      { param: 'Flux.1 dev', why: 'Flux 软萌风比 SD 稳，色彩更通透' },
      { param: '不指定 negative', why: 'Flux 没 negative prompt，正向写全' }
    ],

    tutorial: {
      intro: 'Flux 跑日系软萌风有独特优势：色彩通透 + 头发/眼睛细节好。',
      steps: [
        '【角色】young girl with white cat ears and golden eyes — 萌系必备：兽耳 + 异色瞳',
        '【服装】pastel pink hoodie — 萌系配色 + 服装',
        '【场景】sitting on a windowsill at sunset, holding a small cup of tea — 治愈系场景',
        '【光线】gentle wind blowing her hair — 动态（风）+ 光线',
        '【配色】soft pink and orange color palette — 限定配色范围',
        '【风格锚定】makoto shinkai inspired lighting — 锚定新海诚光线'
      ],
      tips: 'Flux 跑动漫比 SD 慢但质量高。如果你需要快速出图，SD + AnythingV5 仍然是性价比首选。'
    },

    cross_model: {
      midjourney: 'MJ Niji 6: "soft anime illustration of a cat ear girl with golden eyes, pastel pink hoodie, windowsill, sunset --niji 6 --ar 3:4"',
      stable_diffusion: 'Anything V5 / Counterfeit V3 + 8steps CFG 11',
      flux: '原 prompt 直接用',
      dall_e: 'DALL-E 3 软萌风 OK',
      jimeng_zh: '日系软萌动漫少女，白色猫耳，金色眼睛，粉色卫衣，窗台，日落，茶杯，新海诚光线'
    },

    styles: ['动漫', '插画', 'anime', 'soft'],
    useCases: ['头像', '壁纸', '博客封面', '插画'],
    difficulty: 2,
    tags: ['anime', 'soft', 'cat-ear', 'pastel', 'shinkai', 'flux'],
    faq: [
      { q: 'Flux 跑动漫和 SD 比？', a: 'Flux 色彩更好但慢。SD 生态强 (LoRA) 但需要调参' },
      { q: '为什么软萌风总是"塑料感"？', a: '缺质感词。加 "watercolor texture" 或 "soft airbrush" 立刻有手绘感' }
    ]
  },

  // ===== MJ Logo =====
  {
    id: 'seed-mj-minimal-logo',
    source: 'Civitai',
    sourceUrl: 'https://civitai.com/images/mj-logo',
    imageUrl: 'https://image.civitai.com/xG1nkqbyTM5Gq8cqwU6wmG3skAcQ/width=1024/logo-sample.webp',
    author: 'aigallery_demo',
    model: 'midjourney',
    originalPrompt: 'minimal logo, mountain, vector',
    originalParams: '--v 6.1 --ar 1:1',

    title: 'MJ 极简 logo：品牌设计 prompt 教程',
    slug: 'mj-minimal-brand-logo',
    description: '用 MJ v6.1 跑极简 logo / 品牌符号的 prompt 技巧（虽然 Ideogram 文字更强，但 logo 符号 MJ 不差）。',

    rewrite_prompt: 'minimalist geometric logo design of a mountain peak inside a circle, vector graphic style, monochromatic black on white, clean lines, scalable from favicon to billboard, professional brand identity, bauhaus inspired, no text',

    params_explained: [
      { param: '--v 6.1', why: 'v6.1 logo 风格比 v5 干净' },
      { param: 'no text', why: 'MJ 文字经常错，明确说不加文字' }
    ],

    tutorial: {
      intro: 'MJ 跑 logo 适合"符号 + 图标"，不适合"文字 + 符号"组合。',
      steps: [
        '【明确用途】minimalist geometric logo design — 用途 + 风格',
        '【主体】mountain peak inside a circle — 简单主体 + 容器',
        '【风格】vector graphic style, bauhaus inspired — 矢量 + 设计运动',
        '【配色】monochromatic black on white — 限定单色',
        '【明确不要】no text — 避开 MJ 文字错字问题',
        '【可扩展性】scalable from favicon to billboard — 强调 logo 的可缩放性'
      ],
      tips: 'MJ 跑 logo 适合"探索灵感"，真正落地还是 Figma 二次调整。AI logo 100% 落地率不高。'
    },

    cross_model: {
      midjourney: '--v 6.1 --s 100 (低 stylize 保简洁) --no text',
      stable_diffusion: 'SDXL + 任何模型都行，加 "vector, logo, simple, minimal"',
      flux: 'Flux 几何 logo 强',
      dall_e: 'DALL-E 3 logo 不错',
      jimeng_zh: '极简几何 logo, 山峰, 圆形, 矢量风格, 单色黑白, 平面设计'
    },

    styles: ['logo', 'minimalist', 'vector'],
    useCases: ['logo', '品牌设计', 'T 恤设计'],
    difficulty: 2,
    tags: ['logo', 'minimalist', 'geometric', 'bauhaus', 'mountain'],
    faq: [
      { q: 'AI 生成的 logo 能商用吗？', a: '看 ToS。MJ 标准订阅商用 OK，Pro 订阅有更高商用权' },
      { q: '如何让 logo 更"专业"？', a: '加 bauhaus / swiss design / 国际主义风格 这些设计史锚定' }
    ]
  },

  // ===== SDXL Anime Landscape =====
  {
    id: 'seed-sd-anime-landscape',
    source: 'Civitai',
    sourceUrl: 'https://civitai.com/images/sd-anime-landscape',
    imageUrl: 'https://image.civitai.com/xG1nkqbyTM5Gq8cqwU6wmG3skAcQ/width=1024/sd-anime-landscape-sample.webp',
    author: 'aigallery_demo',
    model: 'stable-diffusion',
    originalPrompt: 'anime landscape, mountain, sunset, detailed',
    originalParams: 'SDXL + AnythingXL, Steps 25',

    title: 'SD 动漫风景：AnythingXL 实战',
    slug: 'sd-anythingxl-anime-landscape',
    description: 'SDXL + AnythingXL 跑动漫风景（山川/海洋/校园）的配置 + prompt 写法。',

    rewrite_prompt: 'beautiful anime landscape, vast mountain range at sunset, golden and pink clouds, a single sakura tree on a cliff overlooking the valley, soft wind blowing petals, masterpiece, best quality, highly detailed, 4k',

    params_explained: [
      { param: 'Checkpoint: AnythingXL', why: '动漫风景目前 SDXL 生态最强模型' },
      { param: 'Steps 25, CFG 7', why: 'Anything 系列对 CFG 敏感，6-8 最佳' }
    ],

    tutorial: {
      intro: 'SDXL 跑动漫风景用 AnythingXL 是性价比首选（免费 + 快 + 风格好）。',
      steps: [
        '【选模型】下载 AnythingXL（基于 SDXL 的动漫微调），跑动漫风景/角色都强',
        '【质量词】masterpiece, best quality, highly detailed — 任何 SD prompt 必备',
        '【主体】vast mountain range at sunset, golden and pink clouds — 风景 + 时间 + 配色',
        '【故事点】a single sakura tree on a cliff overlooking the valley — 单一主体提升焦点',
        '【动态】soft wind blowing petals — 加动态避免静止感'
      ],
      tips: 'AnythingXL 比 SDXL base 强很多但仍需要 LoRA 提升特定风格。civitai 上有几百个免费的 Anything LoRA。'
    },

    cross_model: {
      midjourney: 'MJ Niji 6: "anime landscape, vast mountain range at sunset, sakura tree on cliff --niji 6 --ar 16:9"',
      stable_diffusion: 'AnythingXL + Steps 25 + CFG 7',
      flux: 'Flux 动漫风景 OK，但不如 SD 生态丰富',
      dall_e: 'DALL-E 3 动漫风景一般',
      jimeng_zh: '动漫风格风景，山脉日落，樱花树，悬崖，4K 高细节'
    },

    styles: ['动漫', '插画', 'landscape', 'anime'],
    useCases: ['壁纸', '博客封面', '插画'],
    difficulty: 2,
    tags: ['anime', 'landscape', 'anythingxl', 'sunset', 'sakura'],
    faq: [
      { q: 'AnythingXL 是什么？', a: '基于 SDXL 的动漫微调模型，civitai 免费下载，跑动漫性价比最高' },
      { q: 'SD 跑动漫风景和 Flux 比？', a: 'SD 速度快 + LoRA 多。Flux 色彩好但慢。各有优势' }
    ]
  },

  // ===== MJ Watercolor Illustration =====
  {
    id: 'seed-mj-watercolor-illustration',
    source: 'Civitai',
    sourceUrl: 'https://civitai.com/images/mj-watercolor',
    imageUrl: 'https://image.civitai.com/xG1nkqbyTM5Gq8cqwU6wmG3skAcQ/width=1024/watercolor-sample.webp',
    author: 'aigallery_demo',
    model: 'midjourney',
    originalPrompt: 'watercolor illustration, flowers, soft, dreamy',
    originalParams: '--niji 6 --ar 1:1',

    title: '水彩插画：MJ Niji 6 治愈系 prompt',
    slug: 'watercolor-illustration-mj-niji',
    description: 'Niji 6 跑水彩风插画（治愈系、植物、手账素材）的 prompt 拆解。',

    rewrite_prompt: 'soft watercolor illustration of a wildflower meadow, daisies and lavender swaying in gentle breeze, soft watercolor bleeds, white paper texture visible, pastel color palette with soft pink, lavender, and sage green, hand-painted feel, gentle and dreamy mood, storybook illustration --niji 6 --ar 1:1 --s 200',

    params_explained: [
      { param: '--niji 6', why: 'Niji 跑水彩风比 v6 更有手绘感' },
      { param: '--s 200', why: '中低 stylize 保留手绘感' }
    ],

    tutorial: {
      intro: 'Niji 6 跑水彩插画的关键是"纸张质感 + 颜色渗透 + 手绘感"。',
      steps: [
        '【纸张】white paper texture visible — 强制 AI 留白纸张感',
        '【颜色渗透】soft watercolor bleeds — 水彩特有效果',
        '【配色限定】pastel color palette with soft pink, lavender, and sage green — 治愈系配色',
        '【手绘感】hand-painted feel, gentle and dreamy mood — 风格锚定',
        '【具体内容】wildflower meadow, daisies and lavender swaying in gentle breeze — 主体 + 动态',
        '【风格】storybook illustration — 锚定到绘本风格'
      ],
      tips: '水彩风最容易被 AI 出成"扁平插画"。加 "soft watercolor bleeds, white paper texture visible" 这两个词，立刻从 AI 变手绘。'
    },

    cross_model: {
      midjourney: '--niji 6 --ar 1:1 --s 200 --style raw',
      stable_diffusion: 'SDXL + Dreamshaper 或其他水彩 LoRA',
      flux: 'Flux 水彩 OK',
      dall_e: 'DALL-E 3 水彩一般',
      jimeng_zh: '水彩插画，野花田，雏菊薰衣草，柔和粉彩，纸张质感，手绘感'
    },

    styles: ['插画', '水彩', 'watercolor', 'soft'],
    useCases: ['博客封面', '壁纸', '插画', '手账素材'],
    difficulty: 2,
    tags: ['watercolor', 'illustration', 'soft', 'pastel', 'meadow', 'niji'],
    faq: [
      { q: '水彩风怎么避免"AI 感"？', a: '加 "watercolor bleeds, paper texture visible, hand-painted feel" 这三个词' },
      { q: 'MJ vs SD 跑水彩？', a: 'MJ 速度快 + 风格准。SD 生态丰富但需要 LoRA' }
    ]
  }
];

function main() {
  console.log('🌱 Seeding mock data (12 high-quality entries)...\n');
  if (!fs.existsSync(REWRITTEN_DIR)) fs.mkdirSync(REWRITTEN_DIR, { recursive: true });

  // 写入 rewritten_data/ 目录，integrate 脚本会读
  const outFile = path.join(REWRITTEN_DIR, 'mock-rewritten.json');
  fs.writeFileSync(outFile, JSON.stringify(MOCK_DATA, null, 2), 'utf-8');

  console.log(`  ✅ ${MOCK_DATA.length} items written to ${outFile}`);
  console.log('   Models covered:');
  const byModel = {};
  for (const it of MOCK_DATA) {
    byModel[it.model] = (byModel[it.model] || 0) + 1;
  }
  for (const [m, c] of Object.entries(byModel)) {
    console.log(`     - ${m}: ${c}`);
  }
  console.log('\n   Next steps:');
  console.log('     npm run integrate     # build src/data/');
  console.log('     npm run sitemap       # generate sitemaps');
  console.log('     npm run dev           # local preview');
}

main();
