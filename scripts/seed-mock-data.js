/**
 * Seed Mock Data — All English (international SEO friendly)
 * 12 high-quality entries covering 4 AI image models
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const REWRITTEN_DIR = path.join(__dirname, '..', 'rewritten_data');

const MOCK_DATA = [
  // ===== 1. Midjourney - Cyberpunk =====
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

    title: 'Cyberpunk Rain Street: Complete Prompt Breakdown',
    slug: 'cyberpunk-rain-street-tutorial',
    description: 'A step-by-step tutorial on crafting a cinematic cyberpunk street scene in Midjourney v6.1. From layered keywords to parameter choices and cross-model adaptation.',

    rewrite_prompt: 'cinematic cyberpunk street corner at night, heavy rain reflections on wet asphalt, glowing neon signs in japanese and chinese, young woman with cybernetic jacket looking back, blade runner 2049 atmosphere, shallow depth of field, anamorphic lens flare --ar 16:9 --s 750 --v 6.1',
    rewrite_negative: '--no blurry, low quality, deformed, watermark, text errors',

    params_explained: [
      { param: '--ar 16:9', why: 'Wide aspect ratio for video covers, banners, and blog headers. MJ defaults to 1:1, so 16:9 must be specified.' },
      { param: '--s 750', why: 'High stylize gives MJ room for artistic expression (default 100). Suited for stylized scenes.' },
      { param: '--v 6.1', why: 'v6.1 is photorealistic but keeps artistry. Better text understanding than v5, more stable than v7.' }
    ],

    tutorial: {
      intro: 'Cyberpunk is one of MJ\'s strengths, but writing "cinematic" rather than "plastic" requires layered keywords and the right parameters.',
      steps: [
        'Subject layer: cyberpunk street corner at night — lock the scene, time, and space (street corner + nighttime).',
        'Atmosphere layer: heavy rain reflections + glowing neon signs in japanese and chinese — rain + neon + multilingual signage are cyberpunk visual staples.',
        'Character layer: young woman with cybernetic jacket looking back — a single character looking back adds narrative; avoid generic "a woman".',
        'Style layer: blade runner 2049 atmosphere + cinematic + anamorphic lens flare — anchor to a specific film and use lens terminology.',
        'Parameter layer: --ar 16:9 widescreen + --s 750 high stylize + --v 6.1 latest stable. This trio works well for artistic scenes.'
      ],
      tips: 'Key trick: put lens terms like "cinematic / anamorphic / 35mm" into your prompt. They work 10x better than "beautiful / amazing". MJ has seen too many "beautiful cyberpunk girl" prompts.'
    },

    cross_model: {
      midjourney: 'Use the rewrite prompt directly. --s 750 is the core parameter.',
      stable_diffusion: 'Use the English prompt above; negative: blurry, lowres, watermark, text artifacts\nModel: SDXL + JuggernautXL\nCFG 7, Steps 30, Sampler DPM++ 2M Karras',
      flux: 'Flux prefers richer detail. Add: "shot on Sony Venice, color graded teal and orange, shallow DOF f/1.4"\nFlux understands English prompts well, no negative needed.',
      dall_e: 'DALL-E 3 prefers natural language: "A cinematic cyberpunk street scene at night with heavy rain, glowing Japanese neon signs, a young woman in a cybernetic jacket looking back, in the style of Blade Runner 2049"',
      jimeng_zh: '赛博朋克风格，雨夜，霓虹灯，年轻女性回头看，赛博夹克，浅景深，电影感。 --ar 16:9'
    },

    styles: ['realistic', 'concept-art', 'cyberpunk'],
    useCases: ['blog-header', 'social-media', 'marketing'],
    difficulty: 3,
    tags: ['cyberpunk', 'neon', 'rain', 'asian-portrait', 'cinematic', 'blade-runner'],
    faq: [
      { q: 'Why does my cyberpunk image always look "plastic"?', a: 'Usually stylize is too low (default 100). Try --s 750 or higher to give MJ cinematic room.' },
      { q: 'How do I get MJ to render rain accurately?', a: '"heavy rain reflections on wet asphalt" is 5x stronger than just "rain". MJ understands reflections very well.' },
      { q: 'Big difference between MJ v6 and v6.1?', a: 'v6.1 is better at text rendering and consistency. v6 is more creative and divergent. Pick by use case.' },
      { q: 'How to use --chaos 0-100?', a: '--chaos 20 gives more variety (good for exploration). 0-10 is too rigid, 30+ too random.' }
    ]
  },

  // ===== 2. SDXL - Photorealistic Portrait =====
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

    title: 'SDXL Photorealistic Portraits: The Complete Guide',
    slug: 'sdxl-photorealistic-portrait-guide',
    description: 'Generate commercial-grade photorealistic portraits with SDXL. The key is choosing the right checkpoint + sampler params + ControlNet, not the prompt itself.',

    rewrite_prompt: 'professional portrait photograph of a young woman in her 20s, natural soft window light from left, subtle smile, looking slightly off-camera, 85mm f/1.4 lens, shallow depth of field, bokeh, natural skin texture, magazine cover quality, kodak portra 400 film emulation',
    rewrite_negative: 'blurry, lowres, deformed face, extra fingers, mutated hands, watermark, text, bad anatomy, plastic skin, oversaturated',

    params_explained: [
      { param: 'Checkpoint: JuggernautXL v9', why: 'The strongest SDXL model for photorealistic portraits — top-tier realism and skin texture. Alternatives: RealVisXL / epiCRealism.' },
      { param: 'Steps 30, CFG 7', why: 'For photorealism, Steps 25-35 + CFG 6-8. Higher CFG causes oversaturation.' },
      { param: 'Sampler: DPM++ 2M Karras', why: 'Fast convergence + good detail. The go-to for photorealistic work.' },
      { param: 'VAE: sdxl_vae.safetensors', why: 'Default VAE looks washed out. This one gives accurate colors.' }
    ],

    tutorial: {
      intro: 'For SDXL photorealism, the order of importance is: model > prompt > parameters. Pick the right checkpoint first.',
      steps: [
        'Choose your model: download JuggernautXL v9 or RealVisXL V5.1. They are the current ceiling for photorealism. Avoid running SDXL base raw.',
        'Base prompt: lock subject + lens + lighting + style. "85mm f/1.4" is 100x stronger than "DSLR photo".',
        'Negative prompt: must-have for realism: deformed, extra fingers, mutated hands, bad anatomy, plastic skin.',
        'Sampler params: Steps 30, CFG 7, Sampler DPM++ 2M Karras, Size 832x1216 (portrait vertical).',
        'Post-processing: ADetailer for face fix, hires-fix 2x for detail, Topaz Gigapixel for final upscale.'
      ],
      tips: 'Skin texture is the line between "real" and "AI feel". Adding "natural skin texture, pores visible" forces SD to render skin detail — more effective than any LoRA.'
    },

    cross_model: {
      midjourney: 'MJ v6.1 realism is strong, but SDXL + JuggernautXL has more detail. MJ prompt: "professional portrait photograph of a young woman, 85mm lens, bokeh, kodak portra --ar 2:3 --v 6.1"',
      stable_diffusion: 'Use the rewrite prompt + the 5-step config above for direct generation.',
      flux: 'Flux realism beats SD. Rewrite in natural language: "A professional portrait of a young woman in her 20s with soft window light, 85mm lens, shallow depth of field"',
      dall_e: 'DALL-E 3 realism is good but skin texture feels "commercially retouched" — less authentic than SD.',
      jimeng_zh: '专业人像摄影，年轻女性，85mm 镜头，浅景深，自然光，柯达克 Portra 400 胶片质感'
    },

    styles: ['realistic', 'avatar', 'photorealistic'],
    useCases: ['avatar', 'social-media', 'blog-header', 'ecommerce'],
    difficulty: 4,
    tags: ['sdxl', 'photorealistic', 'portrait', '85mm', 'kodak-portra', 'juggernaut'],
    faq: [
      { q: 'Why does SDXL base look unrealistic for portraits?', a: 'Base model is trained on generic data. For portraits you need a fine-tune: JuggernautXL / RealVisXL / epiCRealism.' },
      { q: 'What CFG value is right?', a: 'Photorealism: 6-8. Anime: 7-10. Concept art: 9-12. CFG > 12 usually oversaturates.' },
      { q: 'Steps 30 vs 50 — big difference?', a: 'DPM++ 2M Karras converges by step 25-30. 50 just takes longer with no clear improvement.' },
      { q: 'How to fix hands?', a: '1) Add hands to negative prompt. 2) Use ADetailer extension. 3) Inpaint to redraw. 4) Try a SVD model.' }
    ]
  },

  // ===== 3. MJ Anime Ghibli =====
  {
    id: 'seed-anime-mj-niji',
    source: 'Civitai',
    sourceUrl: 'https://civitai.com/images/anime-mj-niji',
    imageUrl: 'https://image.civitai.com/xG1nkqbyTM5Gq8cqwU6wmG3skAcQ/width=1024/anime-sample.webp',
    author: 'aigallery_demo',
    model: 'midjourney',
    originalPrompt: 'anime girl, sakura petals, kimono, studio ghibli',
    originalParams: '--niji 6 --ar 3:4',

    title: 'Ghibli Anime Portrait: The Niji 6 Guide',
    slug: 'ghibli-anime-style-mj-niji',
    description: 'How to nail Ghibli / Shinkai / Demon Slayer style in MJ Niji 6. The secret: anchor to specific works + use color terms + lens terms.',

    rewrite_prompt: 'anime girl in traditional japanese kimono with cherry blossom pattern, standing under a thousand-year sakura tree, petals falling in the wind, golden hour light filtering through branches, hayao miyazaki style, studio ghibli color palette, hand-painted texture, watercolor background, soft focus --niji 6 --ar 3:4',

    params_explained: [
      { param: '--niji 6', why: 'MJ\'s anime-optimized model. ~50% better at anime than v6.' },
      { param: '--ar 3:4', why: 'Vertical aspect ratio for portraits and posters.' },
      { param: '"hayao miyazaki style"', why: 'Anchor to a specific artist. Beats generic "anime style" by a mile. MJ has a unique reading of miyazaki.' }
    ],

    tutorial: {
      intro: 'Niji 6 is MJ\'s best mode for anime. Master the "work name + color + lens" trio and you\'ll get Ghibli / Shinkai / Demon Slayer style reliably.',
      steps: [
        'Work anchor: "hayao miyazaki style" / "makoto shinkai style" / "demon slayer style" is 10x stronger than just "anime".',
        'Subject layer: anime girl in traditional japanese kimono with cherry blossom pattern — subject + clothing + pattern.',
        'Environment layer: standing under a thousand-year sakura tree, petals falling in the wind — scene + motion.',
        'Lighting layer: golden hour light filtering through branches — Ghibli\'s signature golden hour.',
        'Texture layer: hand-painted texture, watercolor background, soft focus — Ghibli\'s hand-painted + watercolor look.'
      ],
      tips: 'Niji 6 beats v6 on character and hair detail. For "Shinkai style" (hyperreal light), use v6 + "makoto shinkai" prompt instead — Niji softens it too much.'
    },

    cross_model: {
      midjourney: 'Niji 6 mode, --ar 3:4, --s 100 (low stylize preserves the painterly feel).',
      stable_diffusion: 'Anything V5 / Counterfeit V3 + 8steps CFG 11',
      flux: 'Flux anime is OK but the SD ecosystem is richer. Prompt: "Anime girl in kimono under sakura tree, Ghibli style, hand-painted watercolor"',
      dall_e: 'DALL-E 3 anime is weaker than MJ Niji 6 and SD ecosystem.',
      jimeng_zh: '日系软萌动漫少女，白色猫耳，金色眼睛，粉色卫衣，窗台，日落，茶杯，新海诚光线'
    },

    styles: ['anime', 'illustration', 'minimalist'],
    useCases: ['avatar', 'wallpaper', 'blog-header', 'illustration'],
    difficulty: 2,
    tags: ['anime', 'ghibli', 'miyazaki', 'kimono', 'sakura', 'niji'],
    faq: [
      { q: 'Niji 6 vs MJ v6 for anime?', a: 'Niji 6 wins on pure anime and 2D style. v6 is better for "Shinkai-style" hyperreal light scenarios.' },
      { q: 'How to nail "Shinkai style"?', a: 'Use MJ v6 (not niji) + "makoto shinkai style" + "cinematic lighting, hyper detailed sky".' },
      { q: 'Why can\'t I get a Ghibli look?', a: 'You must write "hayao miyazaki" or "studio ghibli" explicitly. "anime" alone is too vague — MJ doesn\'t know which sub-school you want.' }
    ]
  },

  // ===== 4. MJ 3D Pixar =====
  {
    id: 'seed-3d-pixar-character',
    source: 'Civitai',
    sourceUrl: 'https://civitai.com/images/3d-pixar-demo',
    imageUrl: 'https://image.civitai.com/xG1nkqbyTM5Gq8cqwU6wmG3skAcQ/width=1024/3d-sample.webp',
    author: 'aigallery_demo',
    model: 'midjourney',
    originalPrompt: '3d pixar character, cute robot --v 6.1',
    originalParams: '--v 6.1 --ar 1:1',

    title: 'Pixar 3D Characters: The MJ 6.1 Tutorial',
    slug: 'pixar-3d-character-tutorial',
    description: 'Keyword breakdown for Pixar / Disney-style 3D characters in MJ v6.1, plus cross-platform migration.',

    rewrite_prompt: 'adorable 3d character render of a small robot with big expressive eyes, sitting in a flower meadow, holding a tiny lantern, soft volumetric lighting, pixar style rendering, subsurface scattering, bokeh background, unreal engine 5, octane render --v 6.1 --ar 1:1 --s 600',

    params_explained: [
      { param: '--v 6.1', why: 'v6.1 understands 3D render style much better than v5.' },
      { param: '--s 600', why: 'Medium-high stylize balances creativity and consistency.' },
      { param: 'renderer anchor', why: '"unreal engine 5" / "octane render" is 100x stronger than "3d". MJ knows the visual signatures of these renderers.' }
    ],

    tutorial: {
      intro: 'MJ v6.1 makes great 3D characters, but you must specify the renderer and the style explicitly.',
      steps: [
        'Renderer anchor: write "unreal engine 5" / "octane render" / "redshift" / "blender cycles" — much stronger than just "3d".',
        'Style anchor: "pixar" / "disney" / "dreamworks" is 5x more specific than "3d cartoon".',
        'Subject features: adorable 3d character render of a small robot with big expressive eyes — character + body type + key feature.',
        'Scene: sitting in a flower meadow, holding a tiny lantern — 3D characters always need a setting for context.',
        'Technical params: soft volumetric lighting + subsurface scattering + bokeh — signals PBR render quality to MJ.'
      ],
      tips: '3D renders are the easiest place to slip into "AI feel". Adding "rendered in unreal engine 5, octane" renderer anchors gives an instant pro look.'
    },

    cross_model: {
      midjourney: '--v 6.1 --s 600 --ar 1:1',
      stable_diffusion: 'Checkpoint: DreamShaper XL / 3D Animation Diffusion\nPrompt: "3d character, pixar style, masterpiece"\nNegative: "2d, flat, anime, realistic"',
      flux: 'Flux is weaker on 3D style than MJ. Prompt: "3D rendered character in Pixar style with volumetric lighting, unreal engine"',
      dall_e: 'DALL-E 3 3D characters are decent but feel more "commercial illustration" than "Pixar animation".',
      jimeng_zh: '皮克斯风格 3D 角色，机器人，草地，花丛，灯笼，体积光，octane 渲染'
    },

    styles: ['3d', 'illustration', 'minimalist'],
    useCases: ['avatar', 'product-shot', 'marketing', 'blog-header'],
    difficulty: 2,
    tags: ['3d', 'pixar', 'character', 'unreal-engine', 'cute'],
    faq: [
      { q: 'Why do my 3D characters look "AI feel"?', a: 'Usually you forgot the renderer anchor. Add "octane render" / "unreal engine 5" for instant pro look.' },
      { q: 'MJ vs SD for 3D characters?', a: 'MJ v6.1 is fast + style-accurate. SDXL ecosystem has more LoRAs but needs more tuning.' },
      { q: 'How to keep character consistency?', a: 'MJ: use --cref with a reference image. SD: use IP-Adapter + Face ID LoRA.' }
    ]
  },

  // ===== 5. Flux Product Photography =====
  {
    id: 'seed-flux-product-photo',
    source: 'Civitai',
    sourceUrl: 'https://civitai.com/images/flux-product',
    imageUrl: 'https://image.civitai.com/xG1nkqbyTM5Gq8cqwU6wmG3skAcQ/width=1024/product-sample.webp',
    author: 'aigallery_demo',
    model: 'flux',
    originalPrompt: 'luxury watch product photography, white background, studio lighting',
    originalParams: 'Flux.1 dev, 1024x1024',

    title: 'E-commerce Product Photos: Flux vs SDXL',
    slug: 'product-photography-flux-vs-sdxl',
    description: 'What\'s the best AI for product shots (watches, cosmetics, electronics)? Flux vs SDXL head-to-head.',

    rewrite_prompt: 'professional product photograph of a luxury automatic watch on a black velvet display cushion, dramatic studio lighting with rim light from the right, soft fill light from the left, hyper detailed metal texture, visible screws and engravings, bokeh background of dark walnut wood, 8k commercial photography, advertising campaign quality',

    params_explained: [
      { param: 'Flux.1 dev', why: 'Flux beats SD by ~30% on products, especially for metallic/glass reflections.' },
      { param: 'no negative', why: 'Flux has no negative prompt — write positively.' },
      { param: '8k + commercial', why: 'Anchor to commercial photography standards.' }
    ],

    tutorial: {
      intro: 'Product shots are AI\'s sweet spot (no people, clear subject). Flux is currently the strongest here.',
      steps: [
        'Subject + support: luxury automatic watch on a black velvet display cushion — main subject + what it sits on.',
        'Lighting: dramatic studio lighting with rim light from the right, soft fill light from the left — key + fill setup.',
        'Detail anchor: hyper detailed metal texture, visible screws and engravings — forces model to render micro-detail.',
        'Background: bokeh background of dark walnut wood — shallow DOF + warm wood backdrop raises the perceived quality.',
        'Quality words: 8k commercial photography, advertising campaign quality — anchor to commercial standard.'
      ],
      tips: 'The biggest risk in product shots is "AI plastic feel". Adding "hyper detailed metal texture, visible screws" micro-detail words makes the AI image feel commercial in one shot.'
    },

    cross_model: {
      midjourney: 'MJ v6.1 commercial product: "professional product photograph of a luxury watch, dramatic studio lighting, 8k --ar 1:1 --s 250 --v 6.1"',
      stable_diffusion: 'SDXL + JuggernautXL / RealVisXL\nSteps 30, CFG 7\nAdd ControlNet depth model to lock the watch position',
      flux: 'Use the rewrite prompt directly. Flux is strongest for products.',
      dall_e: 'DALL-E 3 products are decent but often add "extra elements" you didn\'t ask for.',
      jimeng_zh: '专业产品摄影，奢侈手表，黑色天鹅绒底座，戏剧光，超细节金属质感，8K 商业级'
    },

    styles: ['realistic', 'product', 'photorealistic'],
    useCases: ['ecommerce', 'product-shot', 'marketing'],
    difficulty: 3,
    tags: ['product', 'commercial', 'flux', 'studio', 'luxury'],
    faq: [
      { q: 'Flux vs SDXL for product shots?', a: 'Flux wins on metal/glass reflections. SDXL has a richer LoRA ecosystem. Go Flux for commercial-grade out of the box.' },
      { q: 'Why is my product background always messy?', a: 'You didn\'t specify the background. Add "solid white background" or a specific backdrop description.' },
      { q: 'Which model is most stable for ecommerce?', a: 'Flux > SDXL+Juggernaut > MJ v6.1. MJ occasionally "creatively" adds unexpected elements.' }
    ]
  },

  // ===== 6. MJ Vintage Poster =====
  {
    id: 'seed-vintage-poster-mj',
    source: 'Civitai',
    sourceUrl: 'https://civitai.com/images/vintage-poster',
    imageUrl: 'https://image.civitai.com/xG1nkqbyTM5Gq8cqwU6wmG3skAcQ/width=1024/vintage-sample.webp',
    author: 'aigallery_demo',
    model: 'midjourney',
    originalParams: '--niji 6 --ar 3:4',

    title: 'Vintage Posters: 1950s Paris Travel Poster Prompts',
    slug: 'vintage-travel-poster-paris',
    description: 'How to write prompts for 1950s vintage travel posters (Paris / NYC / Tokyo), with typography tips.',

    rewrite_prompt: 'vintage 1950s travel poster of paris, art deco style, eiffel tower in the background, bold sans-serif typography saying "VISIT PARIS", warm sunset color palette with mustard yellow, burnt orange, and teal blue, screen print texture, halftone dots, slight aging and paper texture --niji 6 --ar 3:4',

    params_explained: [
      { param: '--niji 6', why: 'Niji has a better sense of vintage illustration and poster style than v6.' },
      { param: '--ar 3:4', why: 'Standard poster aspect ratio.' },
      { param: 'art deco + palette', why: 'art deco is the visual root of 1950s style — must write it.' }
    ],

    tutorial: {
      intro: 'Vintage posters live or die on: era + design movement + palette + print texture + type anchor.',
      steps: [
        'Era anchor: 1950s / 1960s / 1970s — be specific.',
        'Design movement: art deco / bauhaus / pop art / psychedelic — anchor to design history.',
        'Specific content: vintage travel poster of paris, eiffel tower — poster type + place + subject.',
        'Type: bold sans-serif typography saying "VISIT PARIS" — MJ can now render simple English text.',
        'Palette: warm sunset color palette with mustard yellow, burnt orange, and teal blue — 1950s signature colors.',
        'Print texture: screen print texture, halftone dots, slight aging — separates "AI perfect" from "real vintage".'
      ],
      tips: 'MJ v6/v6.1/niji 6 can all render simple English text. For Chinese text, use Ideogram 2.0 — it\'s currently the best for that.'
    },

    cross_model: {
      midjourney: '--niji 6 --ar 3:4 --style raw (low stylize preserves the original art feel).',
      stable_diffusion: 'SDXL + Dreamshaper or Proteus\nNegative: "modern, photorealistic, anime"',
      flux: 'Flux handles vintage well. Add: "letterpress printing, vintage paper texture"',
      dall_e: 'DALL-E 3 vintage is OK but rarely nails the style to the extreme.',
      jimeng_zh: '1950 年代复古海报，巴黎，埃菲尔铁塔，art deco 风格，丝网印刷质感，halftone 网点'
    },

    styles: ['vintage', 'poster', 'minimalist'],
    useCases: ['marketing', 'blog-header', 'wallpaper'],
    difficulty: 3,
    tags: ['vintage', 'retro', '1950s', 'poster', 'art-deco', 'paris'],
    faq: [
      { q: 'Can MJ render Chinese text?', a: 'v6.1 can do simple Chinese but accuracy is poor. Use Ideogram 2.0 for Chinese-heavy posters.' },
      { q: 'How to make posters look "really vintage"?', a: 'Add "halftone dots, screen print texture, slight aging" — these print-process words do the trick.' },
      { q: 'Why does my 1950s look like 1980s?', a: 'You probably used neon palette. 1950s = mustard yellow + teal. 1980s = neon pink + cyan.' }
    ]
  },

  // ===== 7. Ideogram 2.0 Typography =====
  {
    id: 'seed-ideogram-typography',
    source: 'Civitai',
    sourceUrl: 'https://civitai.com/images/ideogram-typography',
    imageUrl: 'https://image.civitai.com/xG1nkqbyTM5Gq8cqwU6wmG3skAcQ/width=1024/ideogram-sample.webp',
    author: 'aigallery_demo',
    model: 'ideogram',
    originalPrompt: 'cafe logo, modern minimal, "BREW LAB"',
    originalParams: 'Ideogram 2.0, 1:1',

    title: 'Ideogram 2.0: The New King of Typography',
    slug: 'ideogram-typography-logo-design',
    description: 'Ideogram 2.0 is currently the most accurate AI for rendering text. Great for cafe logos, event posters, and brand design.',

    rewrite_prompt: 'modern minimalist cafe logo design, geometric coffee bean icon, text "BREW LAB" in bold sans-serif typography below the icon, monochromatic black and white color scheme, vector graphic style, clean lines, professional branding',

    params_explained: [
      { param: 'Ideogram 2.0', why: 'Currently the most accurate model for rendering text (far better than MJ/SD).' },
      { param: 'vector graphic style', why: 'Specify vector style to avoid an AI "photo" feel.' }
    ],

    tutorial: {
      intro: 'Ideogram 2.0 is the best AI tool right now for logo / poster / text-heavy design.',
      steps: [
        'Use Ideogram 2.0: it renders text ~90% more accurately than MJ/SD.',
        'Wrap text in quotes: "BREW LAB" — tells the model this is text to render.',
        'Lock the style: modern minimalist / vintage / art deco / hand-lettered — pick one.',
        'Describe the icon: geometric coffee bean icon — even for logos, describe the icon.',
        'Lock the palette: monochromatic black and white — keep it simple to avoid color noise.'
      ],
      tips: 'Ideogram 2.0 is the only model that reliably renders Chinese and English text. For Chinese logos, just type the brand name in quotes.'
    },

    cross_model: {
      midjourney: 'MJ v6.1 text is better than before but still misspells. Try: "logo design saying BREW LAB --v 6.1"',
      stable_diffusion: 'SD struggles with text. Inpaint afterwards to fix.',
      flux: 'Flux text is OK but behind Ideogram.',
      dall_e: 'DALL-E 3 text is decent.',
      jimeng_zh: '即梦 Chinese logo rendering is solid: "现代简约咖啡店 logo, BREW LAB, 几何咖啡豆图标"'
    },

    styles: ['minimalist', 'vintage', 'poster'],
    useCases: ['logo', 'marketing'],
    difficulty: 2,
    tags: ['ideogram', 'logo', 'typography', 'branding', 'minimalist'],
    faq: [
      { q: 'How to fix MJ misspelling text?', a: 'Switch to Ideogram 2.0, or inpaint to fix the letters afterwards.' },
      { q: 'Which AI is best for logo design?', a: 'Ideogram 2.0 > Flux > MJ v6.1. SD is good if you have a tuned LoRA.' }
    ]
  },

  // ===== 8. MJ Fantasy Landscape =====
  {
    id: 'seed-fantasy-landscape-mj',
    source: 'Civitai',
    sourceUrl: 'https://civitai.com/images/fantasy-landscape',
    imageUrl: 'https://image.civitai.com/xG1nkqbyTM5Gq8cqwU6wmG3skAcQ/width=1024/fantasy-sample.webp',
    author: 'aigallery_demo',
    model: 'midjourney',
    originalPrompt: 'fantasy landscape, floating islands, magical forest',
    originalParams: '--v 6.1 --ar 21:9',

    title: 'Epic Fantasy Landscapes: Floating Islands Tutorial',
    slug: 'fantasy-floating-island-mj',
    description: 'How MJ v6.1 nails epic fantasy scenes — floating islands, magical forests, glowing lakes.',

    rewrite_prompt: 'epic fantasy landscape, three floating islands suspended above a glowing misty forest, waterfalls cascading from each island into the void below, ancient runes carved into the rocks, bioluminescent plants glowing blue and purple, ancient ruined temple on the largest island, dramatic golden hour sunlight breaking through storm clouds, hyper detailed, 8k, unreal engine 5, dnd concept art --v 6.1 --ar 21:9 --s 850',

    params_explained: [
      { param: '--ar 21:9', why: 'Ultra-wide cinematic banner ratio.' },
      { param: '--s 850', why: 'Very high stylize suits epic fantasy scenes.' },
      { param: 'dnd concept art', why: 'Anchoring to D&D concept art gives MJ a high-quality reference frame.' }
    ],

    tutorial: {
      intro: 'Fantasy landscapes need layered skies + subject + ground + a concept-art anchor.',
      steps: [
        'Sky layer: dramatic golden hour sunlight breaking through storm clouds — light + dramatic sky.',
        'Subject layer: three floating islands suspended above a glowing misty forest — multiple islands + quantity + relationship.',
        'Motion layer: waterfalls cascading from each island into the void below — dynamic element.',
        'Detail layer: ancient runes carved into the rocks, bioluminescent plants — micro details.',
        'Story layer: ancient ruined temple on the largest island — one building adds narrative.',
        'Style anchor: dnd concept art + unreal engine 5 — anchor to game concept art + a renderer.'
      ],
      tips: '"floating islands" alone feels flat. Add "three floating islands" + "cascading waterfalls" + "ancient temple" — the trio gives MJ the "epic" feel.'
    },

    cross_model: {
      midjourney: '--v 6.1 --ar 21:9 --s 850 --chaos 15 (small variation).',
      stable_diffusion: 'SDXL + Dreamshaper XL\nPrompt: "epic fantasy landscape, floating islands, magical forest, masterpiece"\nNegative: "modern, urban, anime"',
      flux: 'Flux handles fantasy strongly. Add: "shot on Hasselblad, medium format, golden hour"',
      dall_e: 'DALL-E 3 fantasy is OK but less "epic" than MJ.',
      jimeng_zh: '史诗奇幻风景，浮空岛，魔法森林，瀑布，古代遗迹，金色阳光，8K'
    },

    styles: ['concept-art', 'illustration', 'wallpaper'],
    useCases: ['wallpaper', 'blog-header', 'marketing'],
    difficulty: 4,
    tags: ['fantasy', 'landscape', 'floating-island', 'epic', 'dnd', 'concept-art'],
    faq: [
      { q: 'My fantasy scene feels too "busy" — what to do?', a: 'Cut half the elements. Less is more. Focus on 1 main subject + 1 story point.' },
      { q: 'How to make floating islands feel "floating"?', a: 'Add "waterfalls cascading into the void below" — waterfalls disappearing into nothingness below sells the floating feeling instantly.' },
      { q: 'MJ vs SD for fantasy?', a: 'MJ is fast + good composition. SD + Dreamshaper is more diverse. Flux is the most stable.' }
    ]
  },

  // ===== 9. Flux Soft Anime =====
  {
    id: 'seed-flux-soft-anime',
    source: 'Civitai',
    sourceUrl: 'https://civitai.com/images/flux-anime',
    imageUrl: 'https://image.civitai.com/xG1nkqbyTM5Gq8cqwU6wmG3skAcQ/width=1024/flux-anime-sample.webp',
    author: 'aigallery_demo',
    model: 'flux',
    originalPrompt: 'soft anime illustration, girl with cat ears, soft lighting',

    title: 'Soft Anime with Flux: Pastel & Healing Style',
    slug: 'flux-soft-anime-illustration',
    description: 'How Flux renders soft, pastel Japanese-illustration style — and how it compares to MJ Niji 6 and SD.',

    rewrite_prompt: 'soft anime illustration of a young girl with white cat ears and golden eyes, wearing a pastel pink hoodie, sitting on a windowsill at sunset, holding a small cup of tea, soft pink and orange color palette, gentle wind blowing her hair, detailed anime eyes, watercolor texture, makoto shinkai inspired lighting',

    params_explained: [
      { param: 'Flux.1 dev', why: 'Flux soft-anime style is cleaner than SD, with better color transparency.' },
      { param: 'no negative', why: 'Flux has no negative prompt — write positively and completely.' }
    ],

    tutorial: {
      intro: 'Flux has a unique strength in soft-anime style: transparent color, plus great hair and eye detail.',
      steps: [
        'Character: young girl with white cat ears and golden eyes — kawaii must-have: beast ears + heterochromia.',
        'Outfit: pastel pink hoodie — kawaii palette + clothing.',
        'Scene: sitting on a windowsill at sunset, holding a small cup of tea — healing-scene setting.',
        'Motion: gentle wind blowing her hair — motion (wind) + light.',
        'Palette: soft pink and orange color palette — lock the color range.',
        'Style anchor: makoto shinkai inspired lighting — anchor to Shinkai lighting.'
      ],
      tips: 'Flux is slower than SD for anime but the quality is higher. If you need fast iterations, SD + AnythingV5 is still the best price/performance pick.'
    },

    cross_model: {
      midjourney: 'MJ Niji 6: "soft anime illustration of a cat ear girl with golden eyes, pastel pink hoodie, windowsill, sunset --niji 6 --ar 3:4"',
      stable_diffusion: 'Anything V5 / Counterfeit V3 + 8steps CFG 11',
      flux: 'Use the rewrite prompt directly.',
      dall_e: 'DALL-E 3 soft-anime is OK.',
      jimeng_zh: '日系软萌动漫少女，白色猫耳，金色眼睛，粉色卫衣，窗台，日落，茶杯，新海诚光线'
    },

    styles: ['anime', 'illustration', 'minimalist'],
    useCases: ['avatar', 'wallpaper', 'blog-header', 'illustration'],
    difficulty: 2,
    tags: ['anime', 'soft', 'cat-ear', 'pastel', 'shinkai', 'flux'],
    faq: [
      { q: 'Flux vs SD for anime?', a: 'Flux has better color. SD ecosystem is stronger (LoRAs). Pick by use case.' },
      { q: 'Why does my soft-anime look "plastic"?', a: 'You\'re missing texture words. Add "watercolor texture" or "soft airbrush" for an instant hand-painted feel.' }
    ]
  },

  // ===== 10. MJ Minimal Logo =====
  {
    id: 'seed-mj-minimal-logo',
    source: 'Civitai',
    sourceUrl: 'https://civitai.com/images/mj-logo',
    imageUrl: 'https://image.civitai.com/xG1nkqbyTM5Gq8cqwU6wmG3skAcQ/width=1024/logo-sample.webp',
    author: 'aigallery_demo',
    model: 'midjourney',
    originalPrompt: 'minimal logo, mountain, vector',
    originalParams: '--v 6.1 --ar 1:1',

    title: 'Minimal Brand Logos in MJ: A Practical Guide',
    slug: 'mj-minimal-brand-logo',
    description: 'How to use MJ v6.1 for minimal logo / brand symbol design (symbols work better than text combos).',

    rewrite_prompt: 'minimalist geometric logo design of a mountain peak inside a circle, vector graphic style, monochromatic black on white, clean lines, scalable from favicon to billboard, professional brand identity, bauhaus inspired, no text',

    params_explained: [
      { param: '--v 6.1', why: 'v6.1 logo style is cleaner than v5.' },
      { param: 'no text', why: 'MJ often misspells text. Explicitly say "no text" to avoid the issue.' }
    ],

    tutorial: {
      intro: 'MJ works well for symbol/icon logos. For "text + symbol" combos, use Ideogram 2.0 instead.',
      steps: [
        'Purpose: minimalist geometric logo design — use case + style.',
        'Subject: mountain peak inside a circle — simple subject + container.',
        'Style: vector graphic style, bauhaus inspired — vector + design movement.',
        'Palette: monochromatic black on white — lock to one color.',
        'Explicit no: no text — sidesteps MJ\'s text mistakes.',
        'Scalability: scalable from favicon to billboard — emphasize logo scalability.'
      ],
      tips: 'MJ is best for "explore the vibe" on logos. Production logos still need Figma cleanup. 100% drop-in AI logos are rare.'
    },

    cross_model: {
      midjourney: '--v 6.1 --s 100 (low stylize keeps it clean) --no text',
      stable_diffusion: 'SDXL + any model works; add "vector, logo, simple, minimal" to the prompt.',
      flux: 'Flux handles geometric logos well.',
      dall_e: 'DALL-E 3 logos are decent.',
      jimeng_zh: '极简几何 logo, 山峰, 圆形, 矢量风格, 单色黑白, 平面设计'
    },

    styles: ['minimalist', 'vintage', 'poster'],
    useCases: ['logo', 'marketing'],
    difficulty: 2,
    tags: ['logo', 'minimalist', 'geometric', 'bauhaus', 'mountain'],
    faq: [
      { q: 'Can I use AI logos commercially?', a: 'Check ToS. MJ standard subscription allows commercial use, Pro gives you higher commercial rights.' },
      { q: 'How to make logos look "professional"?', a: 'Anchor to design movements: bauhaus / swiss design / international style.' }
    ]
  },

  // ===== 11. SDXL Anime Landscape =====
  {
    id: 'seed-sd-anime-landscape',
    source: 'Civitai',
    sourceUrl: 'https://civitai.com/images/sd-anime-landscape',
    imageUrl: 'https://image.civitai.com/xG1nkqbyTM5Gq8cqwU6wmG3skAcQ/width=1024/sd-anime-landscape-sample.webp',
    author: 'aigallery_demo',
    model: 'stable-diffusion',
    originalPrompt: 'anime landscape, mountain, sunset, detailed',
    originalParams: 'SDXL + AnythingXL, Steps 25',

    title: 'SDXL Anime Landscapes with AnythingXL',
    slug: 'sd-anythingxl-anime-landscape',
    description: 'How to set up AnythingXL on SDXL for anime landscapes (mountains / oceans / school scenes).',

    rewrite_prompt: 'beautiful anime landscape, vast mountain range at sunset, golden and pink clouds, a single sakura tree on a cliff overlooking the valley, soft wind blowing petals, masterpiece, best quality, highly detailed, 4k',

    params_explained: [
      { param: 'Checkpoint: AnythingXL', why: 'The strongest anime-tuned SDXL model — great for both anime landscapes and characters.' },
      { param: 'Steps 25, CFG 7', why: 'Anything family is sensitive to CFG; 6-8 is the sweet spot.' }
    ],

    tutorial: {
      intro: 'For SDXL anime landscapes, AnythingXL is the best price/performance pick (free, fast, great style).',
      steps: [
        'Pick the model: download AnythingXL (an anime fine-tune of SDXL). Great for landscapes and characters.',
        'Quality words: masterpiece, best quality, highly detailed — must-have for any SD prompt.',
        'Subject: vast mountain range at sunset, golden and pink clouds — landscape + time + palette.',
        'Story point: a single sakura tree on a cliff overlooking the valley — a single focus subject.',
        'Motion: soft wind blowing petals — motion avoids a static feel.'
      ],
      tips: 'AnythingXL beats SDXL base by a wide margin, but specific styles still need LoRAs. civitai has hundreds of free Anything LoRAs.'
    },

    cross_model: {
      midjourney: 'MJ Niji 6: "anime landscape, vast mountain range at sunset, sakura tree on cliff --niji 6 --ar 16:9"',
      stable_diffusion: 'AnythingXL + Steps 25 + CFG 7',
      flux: 'Flux anime landscapes are OK, but SD ecosystem is richer.',
      dall_e: 'DALL-E 3 anime landscapes are so-so.',
      jimeng_zh: '动漫风格风景，山脉日落，樱花树，悬崖，4K 高细节'
    },

    styles: ['anime', 'illustration', 'wallpaper'],
    useCases: ['wallpaper', 'blog-header', 'illustration'],
    difficulty: 2,
    tags: ['anime', 'landscape', 'anythingxl', 'sunset', 'sakura'],
    faq: [
      { q: 'What is AnythingXL?', a: 'An anime-tuned SDXL checkpoint, free on civitai. Best price/performance for anime on SDXL.' },
      { q: 'SD vs Flux for anime landscapes?', a: 'SD is fast + LoRAs are plentiful. Flux has better color. Pick by use case.' }
    ]
  },

  // ===== 12. MJ Watercolor =====
  {
    id: 'seed-mj-watercolor-illustration',
    source: 'Civitai',
    sourceUrl: 'https://civitai.com/images/mj-watercolor',
    imageUrl: 'https://image.civitai.com/xG1nkqbyTM5Gq8cqwU6wmG3skAcQ/width=1024/watercolor-sample.webp',
    author: 'aigallery_demo',
    model: 'midjourney',
    originalPrompt: 'watercolor illustration, flowers, soft, dreamy',
    originalParams: '--niji 6 --ar 1:1',

    title: 'Watercolor Healing Illustrations: Niji 6 Tutorial',
    slug: 'watercolor-illustration-mj-niji',
    description: 'How Niji 6 nails watercolor-style healing illustrations (botanical, journaling, sticker assets).',

    rewrite_prompt: 'soft watercolor illustration of a wildflower meadow, daisies and lavender swaying in gentle breeze, soft watercolor bleeds, white paper texture visible, pastel color palette with soft pink, lavender, and sage green, hand-painted feel, gentle and dreamy mood, storybook illustration --niji 6 --ar 1:1 --s 200',

    params_explained: [
      { param: '--niji 6', why: 'Niji runs watercolor style with more "hand-painted" feel than v6.' },
      { param: '--s 200', why: 'Low-medium stylize preserves the hand-painted feel.' }
    ],

    tutorial: {
      intro: 'Niji 6 nails watercolor when you add: paper texture + color bleeds + hand-painted feel.',
      steps: [
        'Paper: white paper texture visible — force the model to leave paper visible.',
        'Color bleeds: soft watercolor bleeds — the signature watercolor effect.',
        'Palette: pastel color palette with soft pink, lavender, and sage green — healing palette.',
        'Hand-painted feel: hand-painted feel, gentle and dreamy mood — style anchor.',
        'Content: wildflower meadow, daisies and lavender swaying in gentle breeze — subject + motion.',
        'Style: storybook illustration — anchor to picture-book style.'
      ],
      tips: 'Watercolor is the easiest style to fall into "AI flat illustration". Adding "watercolor bleeds, paper texture visible, hand-painted feel" instantly turns AI into hand-painted.'
    },

    cross_model: {
      midjourney: '--niji 6 --ar 1:1 --s 200 --style raw',
      stable_diffusion: 'SDXL + Dreamshaper or a watercolor LoRA',
      flux: 'Flux watercolor is OK.',
      dall_e: 'DALL-E 3 watercolor is average.',
      jimeng_zh: '水彩插画，野花田，雏菊薰衣草，柔和粉彩，纸张质感，手绘感'
    },

    styles: ['illustration', 'minimalist', 'watercolor'],
    useCases: ['blog-header', 'wallpaper', 'illustration'],
    difficulty: 2,
    tags: ['watercolor', 'illustration', 'soft', 'pastel', 'meadow', 'niji'],
    faq: [
      { q: 'How to avoid "AI feel" in watercolor?', a: 'Add "watercolor bleeds, paper texture visible, hand-painted feel" — these three words.' },
      { q: 'MJ vs SD for watercolor?', a: 'MJ is fast and style-accurate. SD is rich in LoRAs but needs tuning.' }
    ]
  }
];

function main() {
  console.log('🌱 Seeding mock data (12 high-quality English entries)...\n');
  if (!fs.existsSync(REWRITTEN_DIR)) fs.mkdirSync(REWRITTEN_DIR, { recursive: true });

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
