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
  },

  // ===== 13. MJ - Mountain Landscape =====
  {
    id: 'seed-mountain-landscape-mj',
    source: 'Original',
    sourceUrl: 'https://aigallery.xyz/gallery/mountain-landscape-tutorial',
    imageUrl: 'https://image.civitai.com/xG1nkqbyTM5Gq8cqwU6wmG3skAcQ/width=1024/mountain-sample.webp',
    author: 'aigallery_demo',
    model: 'midjourney',
    originalPrompt: 'epic mountain landscape at sunset, dramatic clouds, lake reflection',
    originalParams: '--v 6.1 --ar 16:9 --s 750',
    title: 'Epic Mountain Landscapes: Golden Hour Tutorial',
    slug: 'mountain-landscape-mj',
    description: 'Generate cinematic mountain landscapes with perfect golden hour lighting. From horizon to foreground details, this tutorial covers the full layering technique.',
    rewrite_prompt: 'epic mountain landscape, snow-capped peaks at golden hour, dramatic clouds breaking over ridges, mirror-perfect reflection in alpine lake, pine trees in foreground, atmospheric perspective, ansel adams inspired, kodak ektar 100 film, 8k landscape photography --v 6.1 --ar 16:9 --s 750',
    rewrite_negative: '--no blurry, oversaturated, text, watermark, low quality',
    params_explained: [
      { param: '--ar 16:9', why: 'Widescreen aspect ratio — perfect for landscape banners and desktop wallpapers.' },
      { param: '--s 750', why: 'High stylize lets MJ compose dramatic lighting and rich detail.' },
      { param: '--v 6.1', why: 'v6.1 is the most photorealistic MJ version — beats v5 on natural detail.' }
    ],
    tutorial: {
      intro: 'Great landscapes live on layered depth: sky, peaks, midground, foreground. MJ will fill each layer if you cue them.',
      steps: [
        'Sky layer: dramatic clouds breaking over ridges — anchors the lighting direction.',
        'Peak layer: snow-capped peaks at golden hour — main subject + time.',
        'Midground: mirror-perfect reflection in alpine lake — adds symmetry and depth.',
        'Foreground: pine trees in foreground — gives scale to the mountains.',
        'Style anchor: ansel adams inspired, kodak ektar 100 film — locks it to classic landscape photography.'
      ],
      tips: 'Photographers know: golden hour side-lighting is what makes mountains "epic". Use "golden hour" or "magic hour" instead of "sunset" for more dramatic results.'
    },
    cross_model: {
      midjourney: 'Use the rewrite prompt directly with --v 6.1 --s 750.',
      stable_diffusion: 'SDXL + RealisticVision v5.1\nPrompt: "epic mountain landscape, golden hour, alpine lake, ansel adams"\nNegative: "modern, urban, cartoon"\nSteps 30, CFG 7, Sampler DPM++ 2M Karras',
      flux: 'Flux handles landscapes strongly. Add: "shot on Hasselblad X2D, 21mm wide angle, f/8"',
      dall_e: 'DALL-E 3 landscapes are good. Try: "A panoramic photograph of snow-capped mountains at golden hour with reflections in a still alpine lake, in the style of Ansel Adams"',
      jimeng_zh: '史诗山脉风景，日落黄金时刻，云层破开山脊，倒影湖面，松树前景，ansel adams 风格'
    },
    styles: ['realistic', 'wallpaper', 'photorealistic'],
    useCases: ['wallpaper', 'blog-header', 'marketing'],
    difficulty: 2,
    tags: ['landscape', 'mountain', 'golden-hour', 'photography', 'nature'],
    faq: [
      { q: 'Why are my mountains flat?', a: 'You need foreground + midground + background layering. Add "pine trees in foreground" to give scale.' },
      { q: 'Best aspect for landscapes?', a: '--ar 16:9 for widescreen, 21:9 for ultra-wide cinematic. Avoid 1:1 — crops out the drama.' },
      { q: 'How to get reflection in the water?', a: 'Say "mirror-perfect reflection" or "still water reflection" — MJ understands reflection well.' }
    ]
  },

  // ===== 14. MJ - Food Photography =====
  {
    id: 'seed-food-photo-mj',
    source: 'Original',
    sourceUrl: 'https://aigallery.xyz/gallery/food-photography-tutorial',
    imageUrl: 'https://image.civitai.com/xG1nkqbyTM5Gq8cqwU6wmG3skAcQ/width=1024/food-sample.webp',
    author: 'aigallery_demo',
    model: 'midjourney',
    originalPrompt: 'ramen bowl, steam, dark wood table, restaurant photography',
    originalParams: '--v 6.1 --ar 4:5 --s 250',
    title: 'Restaurant Food Photography: Moody Lighting',
    slug: 'food-photography-moody',
    description: 'How to make AI food photos look like they came from a Michelin-star restaurant. Lighting and styling tips for commercial-grade output.',
    rewrite_prompt: 'professional food photography, artisan ramen bowl with rich tonkotsu broth, soft steam rising, soft-boiled egg cut in half, chashu pork belly, nori, scallions, dark moody restaurant table, dramatic side lighting from left, shallow depth of field, canon 100mm macro lens, 8k restaurant menu photography --v 6.1 --ar 4:5 --s 250',
    rewrite_negative: '--no blurry, plastic, artificial, text, watermark',
    params_explained: [
      { param: '--ar 4:5', why: 'Instagram-friendly vertical aspect for food posts.' },
      { param: '--s 250', why: 'Medium stylize — high enough for drama, low enough to keep food looking real.' },
      { param: 'canon 100mm macro', why: 'Specific lens anchor. Macro lens is what pros use for food.' }
    ],
    tutorial: {
      intro: 'Food photography is 80% lighting and 20% styling. AI can nail both if you cue them.',
      steps: [
        'Subject details: artisan ramen bowl with rich tonkotsu broth, soft-boiled egg cut in half, chashu pork belly, nori, scallions — list every visible ingredient for richness.',
        'Motion: soft steam rising — gives the dish life.',
        'Lighting: dramatic side lighting from left — defines texture and depth.',
        'Background: dark moody restaurant table — sets the upscale tone.',
        'Lens anchor: canon 100mm macro lens — pro food photography lens.'
      ],
      tips: 'List ingredients, not the dish. "ramen with egg and pork" is OK; "tonkotsu broth, soft-boiled egg cut in half, chashu pork belly, nori, scallions" makes MJ render a Michelin-quality bowl.'
    },
    cross_model: {
      midjourney: 'Use the rewrite prompt directly. --s 250 is the sweet spot.',
      stable_diffusion: 'SDXL + JuggernautXL\nPrompt: "professional food photography, ramen, dark moody, side lighting"\nNegative: "bright, cartoon, plastic"',
      flux: 'Flux handles food well. Add: "shot in Tokyo ramen shop, editorial style"',
      dall_e: 'DALL-E 3 food is decent. Try natural language.',
      jimeng_zh: '专业美食摄影，豚骨拉面，溏心蛋，叉烧，海苔，葱花，深色餐厅桌面，戏剧光'
    },
    styles: ['realistic', 'photorealistic'],
    useCases: ['social-media', 'marketing', 'ecommerce'],
    difficulty: 2,
    tags: ['food', 'photography', 'restaurant', 'moody', 'ramen'],
    faq: [
      { q: 'Why does my food look plastic?', a: 'You forgot the lighting. "Dramatic side lighting" is the difference between amateur and pro food shots.' },
      { q: 'Best lens for food?', a: '100mm macro or 50mm prime. Both are the standard for restaurant work.' },
      { q: 'How to add steam?', a: '"Soft steam rising" works. Adding "warm dish" or "just served" helps the model render heat.' }
    ]
  },

  // ===== 15. MJ - Anime Character Full Body =====
  {
    id: 'seed-anime-character-fullbody',
    source: 'Original',
    sourceUrl: 'https://aigallery.xyz/gallery/anime-character-fullbody',
    imageUrl: 'https://image.civitai.com/xG1nkqbyTM5Gq8cqwU6wmG3skAcQ/width=1024/anime-fullbody-sample.webp',
    author: 'aigallery_demo',
    model: 'midjourney',
    originalPrompt: 'anime girl full body, school uniform, classroom',
    originalParams: '--niji 6 --ar 2:3',
    title: 'Full-Body Anime Characters: Anatomy & Style',
    slug: 'anime-character-fullbody',
    description: 'How to design full-body anime characters in MJ Niji 6. Proportions, posing, and outfit details that survive AI generation.',
    rewrite_prompt: 'full body anime character design, teenage girl with long silver hair, wearing sailor school uniform with pleated skirt, standing pose with one hand on hip, dynamic angle, classroom background with windows, makoto shinkai style, detailed anime face, soft cel shading, full body visible from head to toe --niji 6 --ar 2:3',
    rewrite_negative: '--no cropped, cut off, lowres, bad anatomy, deformed',
    params_explained: [
      { param: '--niji 6', why: 'Niji handles full-body anime better than v6 — better proportions.' },
      { param: '--ar 2:3', why: 'Vertical aspect for full body. 1:1 always crops.' },
      { param: 'full body visible from head to toe', why: 'Explicitly prevents the model from cropping to a portrait.' }
    ],
    tutorial: {
      intro: 'Full-body anime is harder than portraits because AI defaults to cropping. You have to force it.',
      steps: [
        'Hair details: long silver hair — specific color + length avoids the "generic anime girl" look.',
        'Outfit: sailor school uniform with pleated skirt — be specific, not "school uniform".',
        'Pose: standing pose with one hand on hip — gives dynamism vs. stiff T-pose.',
        'Angle: dynamic angle — adds visual interest.',
        'Background: classroom background with windows — context, not empty void.',
        'Anti-crop: full body visible from head to toe — forces the full body.'
      ],
      tips: 'If MJ keeps cropping to portrait, add the literal phrase "full body visible from head to toe". It\'s a known trick that works on MJ, SD, and Flux.'
    },
    cross_model: {
      midjourney: 'Niji 6 mode, --ar 2:3, --s 100 (preserve character style).',
      stable_diffusion: 'Anything V5 / Counterfeit V3\nPrompt: "full body anime girl, school uniform, classroom, masterpiece"\nNegative: "cropped, bad anatomy"',
      flux: 'Flux is OK for anime full body. Less consistent than SD ecosystem.',
      dall_e: 'DALL-E 3 tends to crop. Specify "head to toe" in prompt.',
      jimeng_zh: '动漫全身像，女高中生，水手服，百褶裙，教室场景，新海诚风格，全身可见'
    },
    styles: ['anime', 'illustration'],
    useCases: ['avatar', 'illustration'],
    difficulty: 3,
    tags: ['anime', 'full-body', 'character-design', 'shinkai', 'uniform'],
    faq: [
      { q: 'Why is my full-body character always cropped?', a: 'You need to add "full body visible from head to toe" or use --ar 2:3 to force vertical space.' },
      { q: 'How to keep proportions right?', a: 'Anchor to a specific anime style like "shinkai style" or "trigger style" — the model knows their proportions.' },
      { q: 'Best aspect for full body?', a: '--ar 2:3 (vertical) gives the model room. 1:1 will always crop.' }
    ]
  },

  // ===== 16. MJ - 3D Isometric =====
  {
    id: 'seed-3d-isometric-mj',
    source: 'Original',
    sourceUrl: 'https://aigallery.xyz/gallery/3d-isometric-tutorial',
    imageUrl: 'https://image.civitai.com/xG1nkqbyTM5Gq8cqwU6wmG3skAcQ/width=1024/isometric-sample.webp',
    author: 'aigallery_demo',
    model: 'midjourney',
    originalPrompt: 'isometric 3d room, cozy bedroom, low poly',
    originalParams: '--v 6.1 --ar 1:1',
    title: 'Isometric 3D Scenes: Cozy Room Tutorial',
    slug: '3d-isometric-room',
    description: 'Build isometric 3D illustrations with MJ v6.1. Perfect for explainer videos, blog headers, and design portfolios.',
    rewrite_prompt: 'isometric 3d illustration of a cozy reading nook, low poly style, miniature diorama, soft pastel color palette with sage green, terracotta, and cream, a small bookshelf, plants in pots, warm window light, clean geometric shapes, blender render aesthetic, soft shadows --v 6.1 --ar 1:1 --s 600',
    rewrite_negative: '--no realistic, photograph, text, complex details',
    params_explained: [
      { param: '--v 6.1', why: 'v6.1 nails the clean geometric look better than v5.' },
      { param: '--ar 1:1', why: 'Square aspect is the standard for isometric dioramas.' },
      { param: 'low poly style', why: 'Tells MJ to use simple geometric shapes — not photo-real 3D.' }
    ],
    tutorial: {
      intro: 'Isometric 3D is the cleanest AI art style. The trick is "low poly" + "diorama" anchors.',
      steps: [
        'Anchor style: isometric 3d illustration of a cozy reading nook, low poly style — gives MJ the visual framework.',
        'Subject: a small bookshelf, plants in pots — populate the scene with simple objects.',
        'Palette: soft pastel color palette with sage green, terracotta, and cream — lock the colors.',
        'Lighting: warm window light, soft shadows — adds depth without complexity.',
        'Render anchor: blender render aesthetic — tells MJ to use clean geometry, not photoreal.'
      ],
      tips: 'Isometric is a great SEO niche. "isometric 3d" + "low poly" + "diorama" together = strong style lock. Try it for any small scene: kitchen, office, garden, server room.'
    },
    cross_model: {
      midjourney: 'Use the rewrite prompt with --v 6.1 --s 600.',
      stable_diffusion: 'SDXL + DreamShaper\nPrompt: "isometric 3d, low poly, cozy reading nook, diorama"\nNegative: "realistic, complex"',
      flux: 'Flux is decent for isometric.',
      dall_e: 'DALL-E 3 isometric is OK.',
      jimeng_zh: '等距 3D 插画，温馨阅读角，低多边形，微型立体场景，柔和粉彩'
    },
    styles: ['3d', 'minimalist', 'illustration'],
    useCases: ['blog-header', 'marketing', 'illustration'],
    difficulty: 2,
    tags: ['isometric', '3d', 'low-poly', 'diorama', 'cozy'],
    faq: [
      { q: 'Why is my isometric not actually isometric?', a: 'You forgot the word "isometric" + "low poly". Without these anchors, MJ may render "3d room" as a perspective shot.' },
      { q: 'Best color palette for isometric?', a: 'Pastel + 3 max colors works best. Bright palettes look cheap.' },
      { q: 'Where to use isometric?', a: 'Blog headers, explainer videos, app store screenshots, design portfolios.' }
    ]
  },

  // ===== 17. MJ - Architecture =====
  {
    id: 'seed-architecture-mj',
    source: 'Original',
    sourceUrl: 'https://aigallery.xyz/gallery/architecture-tutorial',
    imageUrl: 'https://image.civitai.com/xG1nkqbyTM5Gq8cqwU6wmG3skAcQ/width=1024/architecture-sample.webp',
    author: 'aigallery_demo',
    model: 'midjourney',
    originalPrompt: 'modern villa, glass and concrete, dusk',
    originalParams: '--v 6.1 --ar 16:9 --s 600',
    title: 'Modern Architecture: Glass & Concrete',
    slug: 'architecture-modern-mj',
    description: 'Generate stunning modern architectural visualizations in MJ v6.1. From Zaha Hadid to Tadao Ando styles.',
    rewrite_prompt: 'architectural visualization of a modern minimalist villa at dusk, cantilevered concrete and glass facade, infinity pool reflecting sunset, surrounded by pine forest, warm interior lighting visible through floor-to-ceiling windows, zaha hadid style, architectural digest cover quality, blue hour, dramatic up-lighting, 8k photoreal --v 6.1 --ar 16:9 --s 600',
    rewrite_negative: '--no people, text, watermark, cartoon, busy',
    params_explained: [
      { param: '--ar 16:9', why: 'Architectural photography standard aspect.' },
      { param: '--s 600', why: 'Medium stylize — high enough to compose drama, low enough to feel real.' },
      { param: 'zaha hadid style', why: 'Architect anchor — tells MJ this is high-end design, not generic.' }
    ],
    tutorial: {
      intro: 'Architectural visualization is 80% lighting and 20% material. The AI is great at both if you cue them.',
      steps: [
        'Building: cantilevered concrete and glass facade — specific modernist details.',
        'Setting: surrounded by pine forest, infinity pool reflecting sunset — gives the building context.',
        'Lighting (exterior): blue hour, dramatic up-lighting — architecture\'s signature time.',
        'Lighting (interior): warm interior lighting visible through floor-to-ceiling windows — sells the "lived in" feel.',
        'Style anchor: zaha hadid style, architectural digest cover quality — locks to high-end design photography.'
      ],
      tips: 'Architectural Digest quality comes from "blue hour" + "warm interior light" + "dramatic up-lighting". All three together = the "expensive building" look.'
    },
    cross_model: {
      midjourney: 'Use the rewrite prompt with --v 6.1 --s 600.',
      stable_diffusion: 'SDXL + JuggernautXL\nPrompt: "modern minimalist villa, dusk, infinity pool, zaha hadid style"\nNegative: "people, busy, cartoon"',
      flux: 'Flux handles architecture well. Add: "shot on tilt-shift lens, 24mm"',
      dall_e: 'DALL-E 3 architecture is good. Try natural language.',
      jimeng_zh: '现代极简别墅，悬挑混凝土玻璃立面，无边泳池日落，蓝色时刻，扎哈哈迪德风格'
    },
    styles: ['realistic', 'photorealistic'],
    useCases: ['marketing', 'blog-header', 'wallpaper'],
    difficulty: 3,
    tags: ['architecture', 'modern', 'villa', 'zaha-hadid', 'dusk'],
    faq: [
      { q: 'Why does my building look generic?', a: 'You forgot the architect anchor. "Zaha Hadid" / "Tadao Ando" / "Bjarke Ingels" instantly upgrades the style.' },
      { q: 'Best time for architecture shots?', a: 'Blue hour (just after sunset) — sky is blue, building lights are warm, contrast is gorgeous.' },
      { q: 'How to add people for scale?', a: 'Actually avoid people for clean shots. Use "no people" in negative to prevent AI from adding random figures.' }
    ]
  },

  // ===== 18. MJ - Cute Animal =====
  {
    id: 'seed-cute-animal-mj',
    source: 'Original',
    sourceUrl: 'https://aigallery.xyz/gallery/cute-animal-tutorial',
    imageUrl: 'https://image.civitai.com/xG1nkqbyTM5Gq8cqwU6wmG3skAcQ/width=1024/animal-sample.webp',
    author: 'aigallery_demo',
    model: 'midjourney',
    originalPrompt: 'cute golden retriever puppy, studio lighting, soft',
    originalParams: '--v 6.1 --ar 1:1 --s 400',
    title: 'Cute Animal Photography: Studio Style',
    slug: 'cute-animal-photography',
    description: 'Generate irresistible pet portraits with MJ v6.1. Studio lighting, eye contact, and personality.',
    rewrite_prompt: 'professional pet photography of a golden retriever puppy, sitting on a soft cream backdrop, big brown eyes looking directly at camera, fluffy fur with detailed texture, soft studio lighting with rim light, shallow depth of field, f/2.8, adorable expression, instagram pet influencer style --v 6.1 --ar 1:1 --s 400',
    rewrite_negative: '--no aggressive, blurry, text, multiple dogs, weird anatomy',
    params_explained: [
      { param: '--ar 1:1', why: 'Instagram square is the standard for pet portraits.' },
      { param: '--s 400', why: 'Medium stylize — keeps the puppy looking real.' },
      { param: 'f/2.8', why: 'Lens anchor for portrait work. Specific apertures give MJ correct depth cues.' }
    ],
    tutorial: {
      intro: 'Pet photography with AI works because pets are simple subjects. Focus on eyes, lighting, and expression.',
      steps: [
        'Subject: golden retriever puppy — specific breed + age sets the cuteness level.',
        'Eyes: big brown eyes looking directly at camera — eye contact is the #1 thing for pet portraits.',
        'Texture: fluffy fur with detailed texture — avoids the "AI plastic fur" look.',
        'Lighting: soft studio lighting with rim light — separates the pet from the background.',
        'Style anchor: instagram pet influencer style — locks the modern, social-media look.'
      ],
      tips: 'Eye contact + "looking directly at camera" is the single biggest cuteness multiplier. Don\'t skip it.'
    },
    cross_model: {
      midjourney: 'Use the rewrite prompt with --v 6.1 --s 400.',
      stable_diffusion: 'SDXL + JuggernautXL\nPrompt: "golden retriever puppy, studio lighting, looking at camera"\nNegative: "aggressive, blurry, multiple"',
      flux: 'Flux handles pets well.',
      dall_e: 'DALL-E 3 pets are decent.',
      jimeng_zh: '专业宠物摄影，金毛幼犬，奶油背景，棕色大眼睛，蓬松毛发，影棚柔光'
    },
    styles: ['realistic', 'photorealistic'],
    useCases: ['social-media', 'avatar', 'wallpaper'],
    difficulty: 2,
    tags: ['animal', 'puppy', 'pet', 'studio', 'cute'],
    faq: [
      { q: 'Why does my pet look creepy?', a: 'Eye contact missing. Always add "looking directly at camera" or "eye contact".' },
      { q: 'Why plastic fur?', a: 'You forgot "fluffy fur with detailed texture" — that micro-detail is what makes AI fur look real.' },
      { q: 'Best breed for AI cuteness?', a: 'Golden retrievers, corgis, huskies, and kittens. AI has the most training data on these.' }
    ]
  },

  // ===== 19. MJ - Surreal Composition =====
  {
    id: 'seed-surreal-mj',
    source: 'Original',
    sourceUrl: 'https://aigallery.xyz/gallery/surreal-composition-tutorial',
    imageUrl: 'https://image.civitai.com/xG1nkqbyTM5Gq8cqwU6wmG3skAcQ/width=1024/surreal-sample.webp',
    author: 'aigallery_demo',
    model: 'midjourney',
    originalPrompt: 'surreal composition, melting clocks, desert',
    originalParams: '--v 6.1 --ar 4:5 --s 850',
    title: 'Surrealist Compositions: Dali Meets AI',
    slug: 'surreal-composition-mj',
    description: 'How to make MJ generate gallery-worthy surrealism. Compositional rules, artist anchors, and dream logic.',
    rewrite_prompt: 'surrealist composition in the style of salvador dali, melting bronze clock draped over a desert cactus, distant floating elephant with skyscrapers growing from its back, golden hour light, hyperrealistic textures, vast empty desert plain, dreamscape, museum quality fine art photography --v 6.1 --ar 4:5 --s 850',
    rewrite_negative: '--no cartoon, simple, busy, text, watermark',
    params_explained: [
      { param: '--s 850', why: 'Very high stylize. Surrealism needs MJ to take creative risks.' },
      { param: 'in the style of salvador dali', why: 'Artist anchor — instantly locks to "museum surrealism" not "random weird".' },
      { param: 'museum quality fine art photography', why: 'Quality anchor — keeps it gallery-grade, not amateur weird.' }
    ],
    tutorial: {
      intro: 'Surrealism is about dream logic + symbolic contrast. MJ does this brilliantly with the right anchors.',
      steps: [
        'Artist anchor: in the style of salvador dali — instantly locks the dreamlike vibe.',
        'Symbolic contrast: melting bronze clock draped over a desert cactus — combine unrelated objects with meaning.',
        'Scale play: distant floating elephant with skyscrapers growing from its back — surrealism loves impossible scale.',
        'Setting: vast empty desert plain — Dali\'s signature empty space.',
        'Quality anchor: museum quality fine art photography — keeps it gallery-grade.'
      ],
      tips: 'Surrealism needs symbolic contrast. Pick two unrelated objects and combine them: "clock + cactus", "elephant + skyscrapers", "fish + umbrella".'
    },
    cross_model: {
      midjourney: 'Use the rewrite prompt with --s 850 for max creativity.',
      stable_diffusion: 'SDXL + Dreamshaper\nPrompt: "surreal, melting clock, dali style, desert"\nNegative: "cartoon, simple"',
      flux: 'Flux handles surreal well.',
      dall_e: 'DALL-E 3 surreal is OK.',
      jimeng_zh: '超现实主义，融化的青铜钟，沙漠仙人掌，漂浮大象，扎哈哈迪德风格，梦境'
    },
    styles: ['realistic', 'concept-art', 'photorealistic'],
    useCases: ['wallpaper', 'blog-header', 'marketing'],
    difficulty: 4,
    tags: ['surreal', 'dali', 'art', 'concept', 'fine-art'],
    faq: [
      { q: 'Why is my surreal image just "weird"?', a: 'You forgot the artist anchor. "Salvador Dali" / "Magritte" / "Beksinski" instantly adds meaning.' },
      { q: 'How weird is too weird?', a: 'Symbolic contrast works. Random mashup doesn\'t. Combine 2 objects with implied meaning.' },
      { q: 'Best stylize for surreal?', a: '--s 800+. High stylize = more creative risk = better surrealism.' }
    ]
  },

  // ===== 20. SDXL - Cute Pet =====
  {
    id: 'seed-cute-puppy-sdxl',
    source: 'Original',
    sourceUrl: 'https://aigallery.xyz/gallery/cute-puppy-sdxl',
    imageUrl: 'https://image.civitai.com/xG1nkqbyTM5Gq8cqwU6wmG3skAcQ/width=1024/puppy-sample.webp',
    author: 'aigallery_demo',
    model: 'stable-diffusion',
    originalPrompt: 'cute corgi puppy, sitting, park background',
    originalParams: 'SDXL + RealVisXL, Steps 28, CFG 7',
    title: 'Cute Puppies with SDXL + RealVisXL',
    slug: 'cute-puppy-sdxl',
    description: 'Generate photorealistic pet portraits with SDXL. Checkpoint choice matters more than the prompt.',
    rewrite_prompt: 'professional pet photograph of a fluffy corgi puppy, sitting on a park bench, big perky ears, smiling expression with tongue out, soft natural lighting, shallow depth of field with green park bokeh, kodak portra 400 film grain, masterpiece, best quality',
    rewrite_negative: 'blurry, lowres, deformed, extra legs, cropped, watermark, text',
    params_explained: [
      { param: 'Checkpoint: RealVisXL V5.1', why: 'RealVisXL is one of the strongest SDXL photorealistic models — great for animals and people.' },
      { param: 'Steps 28, CFG 7', why: 'Sweet spot for SDXL photorealism.' },
      { param: 'Sampler: DPM++ 2M Karras', why: 'The standard for SDXL realism.' }
    ],
    tutorial: {
      intro: 'SDXL pet portraits live or die on the checkpoint. RealVisXL is a strong choice.',
      steps: [
        'Pick the checkpoint: RealVisXL V5.1 (or JuggernautXL v9 for slightly different vibe).',
        'Subject: fluffy corgi puppy, sitting on a park bench — concrete subject + location.',
        'Cuteness cues: big perky ears, smiling expression with tongue out — corgi-specific charm.',
        'Lighting: soft natural lighting — outdoor scenes need natural light.',
        'Background: shallow depth of field with green park bokeh — bokeh is what makes it "professional".',
        'Film stock: kodak portra 400 film grain — adds analog warmth.'
      ],
      tips: 'For animals, the prompt mostly sets the "vibe" (studio, park, beach). The model and the lighting do 80% of the work.'
    },
    cross_model: {
      midjourney: 'MJ v6.1: "professional pet photograph, corgi puppy, park bench, kodak portra --ar 1:1 --v 6.1"',
      stable_diffusion: 'Use the rewrite prompt with RealVisXL V5.1.',
      flux: 'Flux handles pets well.',
      dall_e: 'DALL-E 3 is decent.',
      jimeng_zh: '专业宠物摄影，柯基幼犬，公园长椅，笑容伸舌头，自然光，浅景深'
    },
    styles: ['realistic', 'photorealistic'],
    useCases: ['social-media', 'wallpaper', 'avatar'],
    difficulty: 2,
    tags: ['puppy', 'corgi', 'pet', 'sdxl', 'park'],
    faq: [
      { q: 'Which SDXL model for pets?', a: 'RealVisXL V5.1 or JuggernautXL v9. Both are top-tier for photorealism.' },
      { q: 'Why does my corgi look weird?', a: 'Corgis have very specific proportions (short legs, long body). Add "perky ears, short legs" to anchor the model.' },
      { q: 'Best lighting for outdoor pet shots?', a: 'Golden hour or soft overcast. Avoid harsh midday sun — creates raccoon eyes.' }
    ]
  },

  // ===== 21. SD - Fashion Editorial =====
  {
    id: 'seed-fashion-editorial-sd',
    source: 'Original',
    sourceUrl: 'https://aigallery.xyz/gallery/fashion-editorial-sd',
    imageUrl: 'https://image.civitai.com/xG1nkqbyTM5Gq8cqwU6wmG3skAcQ/width=1024/fashion-sample.webp',
    author: 'aigallery_demo',
    model: 'stable-diffusion',
    originalPrompt: 'fashion editorial, model in red dress, urban',
    originalParams: 'SDXL + JuggernautXL, Steps 30, CFG 7',
    title: 'High Fashion Editorial with SDXL',
    slug: 'fashion-editorial-sd',
    description: 'How to generate Vogue-quality fashion editorials with SDXL. Pose, styling, and atmosphere cues that MJ misses.',
    rewrite_prompt: 'high fashion editorial photograph, full body shot of a female model wearing a dramatic red couture gown with a long train, walking confidently on a rain-soaked city street at night, motion blur on dress, neon reflections on wet asphalt, dramatic up-lighting, vogue magazine cover quality, shot by annie leibovitz, kodak portra 800',
    rewrite_negative: 'blurry face, deformed, bad anatomy, extra limbs, cropped, watermark, text, casual, low quality',
    params_explained: [
      { param: 'Checkpoint: JuggernautXL v9', why: 'JuggernautXL has the best skin texture + fabric rendering for fashion.' },
      { param: 'Steps 30, CFG 7', why: 'Standard SDXL fashion config.' },
      { param: 'Pose: walking confidently', why: 'Walking gives motion and life to fashion shots.' }
    ],
    tutorial: {
      intro: 'Fashion editorials need: pose + motion + atmosphere + signature style. SDXL handles all four if you cue them.',
      steps: [
        'Subject + outfit: full body shot of a female model wearing a dramatic red couture gown with a long train — specific garment, specific posture.',
        'Pose: walking confidently — fashion rarely stands still.',
        'Atmosphere: rain-soaked city street at night, neon reflections on wet asphalt — noir mood.',
        'Motion: motion blur on dress — separates editorial from snapshot.',
        'Photographer anchor: shot by annie leibovitz — Vogue/A-list fashion photographer.'
      ],
      tips: 'Fashion is "movement + drama + atmosphere". Combine all three for the "Vogue cover" look.'
    },
    cross_model: {
      midjourney: 'MJ v6.1: "high fashion editorial, red gown, rain-soaked street at night, vogue --ar 2:3 --v 6.1"',
      stable_diffusion: 'Use the rewrite prompt with JuggernautXL v9.',
      flux: 'Flux handles fashion well. Add: "shot on Mamiya RZ67, medium format"',
      dall_e: 'DALL-E 3 fashion is decent.',
      jimeng_zh: '高级时装编辑大片，红色高级定制礼服，雨夜城市街道，霓虹倒影，Vogue 杂志封面'
    },
    styles: ['realistic', 'photorealistic', 'concept-art'],
    useCases: ['marketing', 'social-media', 'wallpaper'],
    difficulty: 4,
    tags: ['fashion', 'editorial', 'vogue', 'couture', 'noir'],
    faq: [
      { q: 'Why does my fashion model look stiff?', a: 'Add motion. "Walking" or "running" or "spinning" — anything to break the T-pose.' },
      { q: 'Best SDXL checkpoint for fashion?', a: 'JuggernautXL v9. Its fabric and skin texture are unmatched.' },
      { q: 'How to get the "Vogue" feel?', a: 'Anchor to specific photographers: Annie Leibovitz, Mario Testino, Steven Meisel.' }
    ]
  },

  // ===== 22. SD - Concept Art Robot =====
  {
    id: 'seed-concept-art-robot-sd',
    source: 'Original',
    sourceUrl: 'https://aigallery.xyz/gallery/concept-art-robot-sd',
    imageUrl: 'https://image.civitai.com/xG1nkqbyTM5Gq8cqwU6wmG3skAcQ/width=1024/robot-sample.webp',
    author: 'aigallery_demo',
    model: 'stable-diffusion',
    originalPrompt: 'sci-fi robot, detailed mechanical, concept art',
    originalParams: 'SDXL + Dreamshaper XL, Steps 30, CFG 8',
    title: 'Sci-Fi Robot Concept Art in SDXL',
    slug: 'concept-art-robot-sd',
    description: 'Generate professional sci-fi concept art with SDXL + Dreamshaper. Mechanical detail + atmospheric settings.',
    rewrite_prompt: 'professional sci-fi concept art of a humanoid exploration robot, weathered metal surface with rust and battle damage, glowing cyan optics, detailed mechanical joints and servos, holding a futuristic rifle, standing in a foggy alien jungle, dramatic rim lighting, concept art for video game, artstation trending, 8k',
    rewrite_negative: 'cartoon, anime, simple, blurry, watermark, text, deformed',
    params_explained: [
      { param: 'Checkpoint: Dreamshaper XL', why: 'Dreamshaper is the king of concept art + fantasy on SDXL.' },
      { param: 'Steps 30, CFG 8', why: 'Concept art likes a slightly higher CFG (8 vs 7) for sharper detail.' },
      { param: 'artstation trending', why: 'Quality anchor — ArtStation is the pro concept art platform.' }
    ],
    tutorial: {
      intro: 'Concept art needs three things: detailed subject, atmospheric setting, and quality anchor.',
      steps: [
        'Subject details: weathered metal surface with rust and battle damage, glowing cyan optics, detailed mechanical joints and servos — the "story" comes from the details.',
        'Story prop: holding a futuristic rifle — gives the character a role.',
        'Setting: standing in a foggy alien jungle — atmosphere + context.',
        'Lighting: dramatic rim lighting — separates the robot from the background.',
        'Quality anchor: artstation trending — locks the pro concept art look.'
      ],
      tips: 'Concept art lives on details. "Glowing cyan optics" + "weathered metal" + "battle damage" tells the model: this character has been around.'
    },
    cross_model: {
      midjourney: 'MJ v6.1: "sci-fi concept art, exploration robot, alien jungle, artstation --ar 16:9 --v 6.1 --s 600"',
      stable_diffusion: 'Use the rewrite prompt with Dreamshaper XL.',
      flux: 'Flux handles concept art well.',
      dall_e: 'DALL-E 3 concept art is OK.',
      jimeng_zh: '科幻概念艺术，人形探索机器人，风化金属，蓝色发光光学，机械细节，异星丛林'
    },
    styles: ['concept-art', '3d', 'illustration'],
    useCases: ['wallpaper', 'blog-header', 'marketing'],
    difficulty: 3,
    tags: ['sci-fi', 'robot', 'concept-art', 'artstation', 'mecha'],
    faq: [
      { q: 'Best SDXL for concept art?', a: 'Dreamshaper XL. For darker / horror vibes, try Proteus.' },
      { q: 'Why does my robot look generic?', a: 'Add story details: "weathered", "battle damage", "glowing optics", "rust". Generic robots = no story.' },
      { q: 'How to get the "ArtStation" look?', a: 'Anchor with "artstation trending" or "artstation masterpiece" — the model knows the visual style.' }
    ]
  },

  // ===== 23. SD - Surreal Dreamscape =====
  {
    id: 'seed-surreal-dreamscape-sd',
    source: 'Original',
    sourceUrl: 'https://aigallery.xyz/gallery/surreal-dreamscape-sd',
    imageUrl: 'https://image.civitai.com/xG1nkqbyTM5Gq8cqwU6wmG3skAcQ/width=1024/dreamscape-sample.webp',
    author: 'aigallery_demo',
    model: 'stable-diffusion',
    originalPrompt: 'surreal landscape, floating rocks, dreamlike',
    originalParams: 'SDXL + Dreamshaper XL, Steps 35, CFG 9',
    title: 'Surreal Dreamscapes with SDXL',
    slug: 'surreal-dreamscape-sd',
    description: 'Generate Beksinski / Giger-style dreamscapes. High stylize + atmospheric details = the "wow" factor.',
    rewrite_prompt: 'surreal dreamscape in the style of zdzislaw beksinski, vast alien desert with floating obsidian monoliths, distant ruined cathedral, blood red sky with twin suns, fog rolling across the plain, hyper detailed textures, eerie silence, dark fantasy concept art, 8k masterpiece',
    rewrite_negative: 'cartoon, anime, simple, bright, cheerful, text, watermark',
    params_explained: [
      { param: 'Checkpoint: Dreamshaper XL', why: 'Dreamshaper is unmatched for dark, surreal fantasy.' },
      { param: 'Steps 35, CFG 9', why: 'Surrealism likes more steps + higher CFG for detail density.' },
      { param: 'zdzislaw beksinski', why: 'Polish surrealist painter — the king of dark dream imagery.' }
    ],
    tutorial: {
      intro: 'Beksinski-style dreamscapes work because the "vibe" is consistent: dark, vast, ancient, lonely.',
      steps: [
        'Artist anchor: in the style of zdzislaw beksinski — instantly locks the dark surreal vibe.',
        'Setting: vast alien desert with floating obsidian monoliths — vastness + mystery.',
        'Background story: distant ruined cathedral — adds a "lost civilization" feel.',
        'Sky: blood red sky with twin suns — otherworldly.',
        'Atmosphere: fog rolling across the plain, eerie silence — mood.'
      ],
      tips: 'Beksinski + Giger + Magritte are the three surrealist anchors that work best in AI. Each has a distinct visual signature the model recognizes.'
    },
    cross_model: {
      midjourney: 'MJ v6.1: "surreal dreamscape, beksinski style, floating monoliths, twin suns --ar 16:9 --v 6.1 --s 850"',
      stable_diffusion: 'Use the rewrite prompt with Dreamshaper XL.',
      flux: 'Flux is decent for surreal.',
      dall_e: 'DALL-E 3 surreal is OK.',
      jimeng_zh: '超现实梦境，贝克斯辛斯基风格，漂浮黑曜石，远处废墟大教堂，血红天空双日'
    },
    styles: ['concept-art', 'illustration', 'wallpaper'],
    useCases: ['wallpaper', 'marketing', 'illustration'],
    difficulty: 4,
    tags: ['surreal', 'dreamscape', 'beksinski', 'dark', 'concept-art'],
    faq: [
      { q: 'Why is my surreal scene "cheerful"?', a: 'You forgot the dark anchor. Add "dark", "eerie", "beksinski" to push it moody.' },
      { q: 'Best artist anchors for surrealism?', a: 'Beksinski, Magritte, Giger, Escher. Each gives a distinct style.' },
      { q: 'Higher CFG for more detail?', a: 'Yes — surrealism likes CFG 8-10 for detail density.' }
    ]
  },

  // ===== 24. SD - Manga Action =====
  {
    id: 'seed-manga-action-sd',
    source: 'Original',
    sourceUrl: 'https://aigallery.xyz/gallery/manga-action-sd',
    imageUrl: 'https://image.civitai.com/xG1nkqbyTM5Gq8cqwU6wmG3skAcQ/width=1024/manga-sample.webp',
    author: 'aigallery_demo',
    model: 'stable-diffusion',
    originalPrompt: 'manga action scene, sword slash, speed lines',
    originalParams: 'SDXL + AnythingXL, Steps 28, CFG 9',
    title: 'Manga Action Scenes: Speed & Drama',
    slug: 'manga-action-sd',
    description: 'How to generate dynamic manga action scenes with SDXL. Speed lines, motion blur, and dramatic posing.',
    rewrite_prompt: 'dynamic manga action scene, samurai mid sword slash, speed lines radiating from blade, motion blur on katana, dramatic wind blowing hair and clothing, debris floating in air, intense expression, in the style of demon slayer manga, full page splash composition, black and white with selective red accent, masterpiece, best quality',
    rewrite_negative: 'color, cute, peaceful, lowres, blurry, bad anatomy, deformed',
    params_explained: [
      { param: 'Checkpoint: AnythingXL', why: 'Best SDXL anime model for action scenes.' },
      { param: 'Steps 28, CFG 9', why: 'Higher CFG keeps the action dynamic and sharp.' },
      { param: 'demon slayer manga style', why: 'Anchor to a specific high-energy manga style.' }
    ],
    tutorial: {
      intro: 'Manga action scenes live on speed lines + motion blur + dramatic posing. AI does all three if you cue them.',
      steps: [
        'Action: samurai mid sword slash — the "frozen in time" pose is key.',
        'Speed lines: speed lines radiating from blade — manga\'s signature motion indicator.',
        'Motion blur: motion blur on katana, dramatic wind blowing hair and clothing — visual chaos.',
        'Atmosphere: debris floating in air — sells the impact.',
        'Style: in the style of demon slayer manga — high-energy, dramatic manga.',
        'Color: black and white with selective red accent — manga classic + drama highlight.'
      ],
      tips: 'Speed lines + motion blur + debris = the "fast action" trio. Skip any one and the scene feels slow.'
    },
    cross_model: {
      midjourney: 'MJ Niji 6: "manga action, samurai, speed lines, demon slayer style --niji 6 --ar 3:4"',
      stable_diffusion: 'Use the rewrite prompt with AnythingXL.',
      flux: 'Flux handles manga but SD ecosystem is richer.',
      dall_e: 'DALL-E 3 manga is weak.',
      jimeng_zh: '漫画动作场景，武士拔刀斩，速度线，运动模糊，鬼灭之刃风格，黑白配红色'
    },
    styles: ['anime', 'illustration'],
    useCases: ['wallpaper', 'illustration', 'blog-header'],
    difficulty: 4,
    tags: ['manga', 'action', 'samurai', 'speed-lines', 'demon-slayer'],
    faq: [
      { q: 'How to get speed lines?', a: 'Explicitly say "speed lines radiating from blade". AI defaults to "still pose" without the cue.' },
      { q: 'Why is my action pose stiff?', a: 'Add "mid slash" / "in motion" / "frozen in time" — AI does best with frozen action, not blurred action.' },
      { q: 'Best manga style anchor?', a: 'Demon Slayer / One Piece / Berserk. Each has a distinct visual energy.' }
    ]
  },

  // ===== 25. Flux - Beauty Portrait =====
  {
    id: 'seed-beauty-portrait-flux',
    source: 'Original',
    sourceUrl: 'https://aigallery.xyz/gallery/beauty-portrait-flux',
    imageUrl: 'https://image.civitai.com/xG1nkqbyTM5Gq8cqwU6wmG3skAcQ/width=1024/beauty-sample.webp',
    author: 'aigallery_demo',
    model: 'flux',
    originalPrompt: 'beauty portrait, soft light, neutral background',
    originalParams: 'Flux.1 dev, 1024x1536',
    title: 'Beauty Portraits: Skin & Light in Flux',
    slug: 'beauty-portrait-flux',
    description: 'Generate commercial beauty portraits with Flux. Skin texture and lighting are Flux\'s strengths.',
    rewrite_prompt: 'professional beauty portrait photograph, extreme close-up of a young woman with natural skin texture, visible pores and subtle freckles, soft natural window light from upper left, dewy skin finish, minimal makeup, neutral beige background, shot on hasselblad h6d, 100mm f/2.2 lens, kodak portra 400, fashion magazine quality',
    rewrite_negative: '',
    params_explained: [
      { param: 'Flux.1 dev', why: 'Flux handles skin micro-texture (pores, freckles) better than any other model.' },
      { param: '1024x1536', why: 'Vertical aspect for portrait.' },
      { param: 'hasselblad h6d', why: 'Medium format camera anchor — the "fashion magazine" lens.' }
    ],
    tutorial: {
      intro: 'Beauty portraits with Flux are special because Flux renders skin micro-texture (pores, fine lines) better than MJ or SD.',
      steps: [
        'Framing: extreme close-up — beauty is all about skin detail.',
        'Skin: natural skin texture, visible pores and subtle freckles — the "AI plastic" killer.',
        'Lighting: soft natural window light from upper left — beauty photographers\' default.',
        'Makeup: minimal makeup — less is more for skin showcase.',
        'Camera anchor: hasselblad h6d, 100mm f/2.2 lens — fashion magazine standard.'
      ],
      tips: 'Skin texture is the difference between "AI beauty" and "real beauty". Always add "natural skin texture, visible pores" to make Flux shine.'
    },
    cross_model: {
      midjourney: 'MJ v6.1: "beauty portrait, natural skin, soft window light, hasselblad --ar 2:3 --v 6.1"',
      stable_diffusion: 'SDXL + JuggernautXL\nPrompt: "beauty portrait, natural skin, freckles, soft light"',
      flux: 'Use the rewrite prompt directly. Flux shines for beauty.',
      dall_e: 'DALL-E 3 beauty is decent but skin texture is softer than Flux.',
      jimeng_zh: '专业美妆人像，皮肤质感，雀斑，柔和自然窗光，哈苏中画幅，时尚杂志'
    },
    styles: ['realistic', 'photorealistic'],
    useCases: ['social-media', 'avatar', 'marketing'],
    difficulty: 3,
    tags: ['beauty', 'portrait', 'flux', 'skin', 'fashion'],
    faq: [
      { q: 'Why does my beauty portrait look plastic?', a: 'You forgot the skin texture cues. Add "natural skin texture, visible pores, subtle freckles" — Flux needs these to shine.' },
      { q: 'Flux vs MJ for beauty?', a: 'Flux wins on micro skin detail. MJ has more dramatic style options.' },
      { q: 'Best lens for beauty?', a: '100mm f/2.2 is the standard. Medium format (Hasselblad) for fashion.' }
    ]
  },

  // ===== 26. Flux - Sci-Fi Vehicle =====
  {
    id: 'seed-scifi-vehicle-flux',
    source: 'Original',
    sourceUrl: 'https://aigallery.xyz/gallery/scifi-vehicle-flux',
    imageUrl: 'https://image.civitai.com/xG1nkqbyTM5Gq8cqwU6wmG3skAcQ/width=1024/vehicle-sample.webp',
    author: 'aigallery_demo',
    model: 'flux',
    originalPrompt: 'futuristic spaceship, detailed, hangar',
    originalParams: 'Flux.1 dev, 1280x720',
    title: 'Sci-Fi Vehicles: Concept Art with Flux',
    slug: 'scifi-vehicle-flux',
    description: 'Generate Star Wars / Cyberpunk-style vehicles in Flux. Industrial design + cinematic lighting.',
    rewrite_prompt: 'cinematic sci-fi vehicle concept art, sleek interstellar fighter spacecraft, weathered hull with neon cyan engine glow, detailed mechanical surface, sitting in a vast industrial hangar with workers, volumetric god rays from above, dust particles in air, 8k unreal engine 5 render, artstation trending, dnd concept art quality',
    rewrite_negative: '',
    params_explained: [
      { param: 'Flux.1 dev', why: 'Flux handles mechanical surfaces and complex compositions well.' },
      { param: '1280x720', why: 'Wide aspect for the cinematic feel.' },
      { param: 'unreal engine 5 render', why: 'Renderer anchor — tells Flux to use real-time 3D aesthetic.' }
    ],
    tutorial: {
      intro: 'Sci-fi vehicles need industrial design + atmospheric setting + cinematic lighting. Flux does all three.',
      steps: [
        'Vehicle details: sleek interstellar fighter spacecraft, weathered hull with neon cyan engine glow — specific style + "used" feel.',
        'Surface: detailed mechanical surface — sci-fi vehicles need visible complexity.',
        'Setting: sitting in a vast industrial hangar with workers — context + scale.',
        'Lighting: volumetric god rays from above, dust particles in air — Blade Runner 2049 lighting.',
        'Quality anchor: 8k unreal engine 5 render, artstation trending — pro concept art look.'
      ],
      tips: 'Sci-fi vehicles sell on "weathered" + "neon glow" + "atmospheric lighting". All three = "this ship has been to war".'
    },
    cross_model: {
      midjourney: 'MJ v6.1: "sci-fi vehicle, fighter spacecraft, neon glow, hangar --ar 16:9 --v 6.1 --s 750"',
      stable_diffusion: 'SDXL + Dreamshaper\nPrompt: "sci-fi spacecraft, hangar, god rays, concept art"',
      flux: 'Use the rewrite prompt directly. Flux shines for vehicles.',
      dall_e: 'DALL-E 3 is OK.',
      jimeng_zh: '科幻载具概念艺术，宇宙战斗机，霓虹青色引擎，工业机库，体积光'
    },
    styles: ['concept-art', '3d'],
    useCases: ['wallpaper', 'blog-header', 'marketing'],
    difficulty: 3,
    tags: ['sci-fi', 'vehicle', 'spaceship', 'concept-art', 'artstation'],
    faq: [
      { q: 'Why does my ship look cartoonish?', a: 'You forgot the industrial design cues. "Weathered hull", "mechanical surface", "used" all push it toward realism.' },
      { q: 'Best model for vehicles?', a: 'Flux is strong. SDXL + Dreamshaper is also good.' },
      { q: 'How to add people for scale?', a: 'Add "with workers in hangar" — small figures give massive scale to the ship.' }
    ]
  },

  // ===== 27. Flux - Interior Design =====
  {
    id: 'seed-interior-design-flux',
    source: 'Original',
    sourceUrl: 'https://aigallery.xyz/gallery/interior-design-flux',
    imageUrl: 'https://image.civitai.com/xG1nkqbyTM5Gq8cqwU6wmG3skAcQ/width=1024/interior-sample.webp',
    author: 'aigallery_demo',
    model: 'flux',
    originalPrompt: 'modern living room, japandi style, natural light',
    originalParams: 'Flux.1 dev, 1280x960',
    title: 'Japandi Interiors: Minimalism with Flux',
    slug: 'interior-design-flux',
    description: 'Generate calm, minimalist interior design renders with Flux. Material and lighting cues matter most.',
    rewrite_prompt: 'professional interior design photograph of a modern japandi living room, natural wood furniture, low profile sofa in beige linen, indoor plants, soft natural light from large windows, shoji screen divider, concrete and wood textures, minimalist composition, architectural digest quality, shot on canon 5d mark iv, 24mm wide angle',
    rewrite_negative: '',
    params_explained: [
      { param: 'Flux.1 dev', why: 'Flux renders interior materials and lighting accurately.' },
      { param: '1280x960', why: '4:3 aspect for interior photography.' },
      { param: 'japandi', why: 'Style anchor — Japanese + Scandinavian minimalism.' }
    ],
    tutorial: {
      intro: 'Interior design with AI works because rooms are simple compositions. Material and lighting do the work.',
      steps: [
        'Style anchor: modern japandi living room — locks Japanese + Scandinavian minimalism.',
        'Furniture: natural wood furniture, low profile sofa in beige linen — specific materials.',
        'Decor: indoor plants, shoji screen divider — character without clutter.',
        'Lighting: soft natural light from large windows — interior photography\'s friend.',
        'Materials: concrete and wood textures — texture cues make AI render feel real.',
        'Camera: shot on canon 5d mark iv, 24mm wide angle — architectural photography standard.'
      ],
      tips: 'Interiors live on material cues. "Wood", "linen", "concrete", "shoji" — each is a render keyword that AI knows.'
    },
    cross_model: {
      midjourney: 'MJ v6.1: "japandi living room, natural light, wood and concrete, architectural digest --ar 4:3 --v 6.1"',
      stable_diffusion: 'SDXL + RealVisXL\nPrompt: "japandi living room, natural wood, soft light"\nNegative: "cluttered, dark"',
      flux: 'Use the rewrite prompt directly.',
      dall_e: 'DALL-E 3 interiors are good.',
      jimeng_zh: '日式极简客厅，自然木材，亚麻沙发，室内植物，障子屏风，柔和自然光'
    },
    styles: ['realistic', 'photorealistic', 'minimalist'],
    useCases: ['marketing', 'blog-header', 'wallpaper'],
    difficulty: 2,
    tags: ['interior', 'japandi', 'minimalist', 'design', 'architecture'],
    faq: [
      { q: 'Why is my room "cold" or "empty"?', a: 'Add plants, art, or a person silhouette. Japandi = minimal, but never empty.' },
      { q: 'Best model for interiors?', a: 'Flux and SDXL+RealVisXL. Both are strong.' },
      { q: 'How to pick a style anchor?', a: 'Japandi / Wabi-Sabi / Mid-Century Modern / Industrial. Each gives distinct visual signature.' }
    ]
  },

  // ===== 28. Ideogram - Event Poster =====
  {
    id: 'seed-event-poster-ideogram',
    source: 'Original',
    sourceUrl: 'https://aigallery.xyz/gallery/event-poster-ideogram',
    imageUrl: 'https://image.civitai.com/xG1nkqbyTM5Gq8cqwU6wmG3skAcQ/width=1024/event-poster-sample.webp',
    author: 'aigallery_demo',
    model: 'ideogram',
    originalPrompt: 'jazz festival poster, retro typography, "BLUE NOTE FEST"',
    originalParams: 'Ideogram 2.0, 2:3',
    title: 'Music Festival Posters in Ideogram 2.0',
    slug: 'event-poster-ideogram',
    description: 'Generate sellable music festival posters with Ideogram 2.0. Type rendering + bold composition.',
    rewrite_prompt: 'modern jazz festival poster, bold geometric typography saying "BLUE NOTE FEST" as the main title, supporting text "JULY 15-17 / NEW ORLEANS" below, deep navy blue and warm gold color palette, art deco inspired geometric shapes, vintage jazz club atmosphere, halftone texture, vector graphic style',
    rewrite_negative: '',
    params_explained: [
      { param: 'Ideogram 2.0', why: 'The only model that reliably renders long text. Other models mangle "BLUE NOTE FEST".' },
      { param: '2:3 aspect', why: 'Standard poster ratio.' },
      { param: 'art deco geometric', why: 'Style anchor — jazz + art deco is a classic pairing.' }
    ],
    tutorial: {
      intro: 'Ideogram 2.0 is the only AI that can do real poster text. Use it for any text-heavy design.',
      steps: [
        'Title text: bold geometric typography saying "BLUE NOTE FEST" — wrap in quotes for accurate rendering.',
        'Supporting text: supporting text "JULY 15-17 / NEW ORLEANS" below — dates and locations in quotes.',
        'Palette: deep navy blue and warm gold color palette — jazz classic.',
        'Style: art deco inspired geometric shapes — era + style anchor.',
        'Texture: halftone texture, vector graphic style — print-poster cues.'
      ],
      tips: 'Wrap every piece of text in quotes. The model knows to render them. Without quotes, the model treats them as a description and you get gibberish.'
    },
    cross_model: {
      midjourney: 'MJ v6.1: "jazz festival poster, BLUE NOTE FEST, art deco, navy gold --ar 2:3 --v 6.1" (text may be misspelled)',
      stable_diffusion: 'SDXL: text rendering is weak. Inpaint to fix.',
      flux: 'Flux text is OK but behind Ideogram.',
      dall_e: 'DALL-E 3 text is decent.',
      jimeng_zh: '音乐节海报，BLUE NOTE FEST 标题文字，art deco 几何风格，深蓝金色'
    },
    styles: ['vintage', 'poster', 'minimalist'],
    useCases: ['marketing', 'blog-header'],
    difficulty: 2,
    tags: ['poster', 'ideogram', 'jazz', 'art-deco', 'typography'],
    faq: [
      { q: 'Why does my text look garbled?', a: 'Wrap text in quotes. Without quotes, AI treats text as description, not literal text to render.' },
      { q: 'How long can the text be?', a: 'Ideogram handles ~50 chars well. Longer is riskier.' },
      { q: 'Best for typography posters?', a: 'Ideogram 2.0 is current #1 for English. For Chinese, 即梦 is best.' }
    ]
  },

  // ===== 29. Ideogram - Restaurant Menu =====
  {
    id: 'seed-restaurant-menu-ideogram',
    source: 'Original',
    sourceUrl: 'https://aigallery.xyz/gallery/restaurant-menu-ideogram',
    imageUrl: 'https://image.civitai.com/xG1nkqbyTM5Gq8cqwU6wmG3skAcQ/width=1024/menu-sample.webp',
    author: 'aigallery_demo',
    model: 'ideogram',
    originalPrompt: 'cafe menu design, elegant, "MENU" header',
    originalParams: 'Ideogram 2.0, A4 vertical',
    title: 'Restaurant Menu Design in Ideogram 2.0',
    slug: 'restaurant-menu-ideogram',
    description: 'How to design a real restaurant menu with Ideogram 2.0. Multi-section layout, prices, descriptions.',
    rewrite_prompt: 'elegant cafe menu design, header text "MENU" in serif typography, three sections: "BREAKFAST" with items like "AVOCADO TOAST $14" and "EGGS BENEDICT $18", "LUNCH" with items like "CAESAR SALAD $16" and "GRILLED SALMON $28", "DESSERTS" with "CRÈME BRÛLÉE $12" and "TIRAMISU $11", cream paper background, olive green and gold color palette, minimalist layout, classic french bistro style',
    rewrite_negative: '',
    params_explained: [
      { param: 'Ideogram 2.0', why: 'The only model that renders multi-line menu text reliably.' },
      { param: 'A4 vertical', why: 'Standard menu size.' },
      { param: 'Classic French bistro', why: 'Style anchor — locks the "elegant restaurant" vibe.' }
    ],
    tutorial: {
      intro: 'Real menus have: header + multiple sections + items with prices. Ideogram 2.0 can do this in one prompt.',
      steps: [
        'Header: header text "MENU" in serif typography — the title is the most important text.',
        'Sections: three sections: "BREAKFAST" / "LUNCH" / "DESSERTS" — quote each section header.',
        'Items: list items with prices in quotes — "AVOCADO TOAST $14" etc.',
        'Palette: cream paper background, olive green and gold color palette — elegant bistro look.',
        'Style: classic french bistro style — locks the upscale cafe vibe.'
      ],
      tips: 'For real menus, you\'ll iterate 3-4 times to get prices and names right. The model is good but not perfect with multi-line text.'
    },
    cross_model: {
      midjourney: 'MJ v6.1: "cafe menu design, MENU, french bistro --ar 2:3 --v 6.1" (text will be wrong)',
      stable_diffusion: 'SDXL: weak text. Build menus in Figma or Illustrator.',
      flux: 'Flux text is OK but behind Ideogram.',
      dall_e: 'DALL-E 3 text is decent.',
      jimeng_zh: '咖啡店菜单设计，MENU 标题，早餐午餐甜点分类，经典法式小酒馆风格'
    },
    styles: ['vintage', 'minimalist', 'poster'],
    useCases: ['marketing'],
    difficulty: 3,
    tags: ['menu', 'ideogram', 'cafe', 'typography', 'bistro'],
    faq: [
      { q: 'Why is my menu text wrong?', a: 'Each section needs to be in quotes. Long menus may need 2-3 attempts to get all text right.' },
      { q: 'How to design a real menu?', a: 'Ideogram for layout, then export to Figma for final polish. AI is great for mockups, not production.' },
      { q: 'Best for menu design?', a: 'Ideogram 2.0. For high-volume production, design tools are still king.' }
    ]
  },

  // ===== 30. Jimeng - Chinese Landscape =====
  {
    id: 'seed-chinese-landscape-jimeng',
    source: 'Original',
    sourceUrl: 'https://aigallery.xyz/gallery/chinese-landscape-jimeng',
    imageUrl: 'https://image.civitai.com/xG1nkqbyTM5Gq8cqwU6wmG3skAcQ/width=1024/chinese-landscape-sample.webp',
    author: 'aigallery_demo',
    model: 'jimeng',
    originalPrompt: '中国风水墨画山水，留白意境',
    originalParams: '即梦 AI, 1024x1024',
    title: 'Chinese Ink Wash Landscapes: 即梦 (Jimeng) Tutorial',
    slug: 'chinese-landscape-jimeng',
    description: 'Generate authentic Chinese shanshui (mountain-water) paintings with 即梦. From Song Dynasty masters to modern ink art.',
    rewrite_prompt: '中国传统水墨山水画，远山近水，瀑布飞流，松树云雾，留白意境，宋代名家风格，淡墨渲染，宣纸质感，印章红泥，竖幅构图，意境悠远',
    rewrite_negative: '写实，照片，色彩，立体，3D',
    params_explained: [
      { param: '即梦 AI (Jimeng)', why: '即梦是中文语境最强的 AI 画图工具，汉字渲染和文化理解远超国外模型。' },
      { param: '竖幅构图', why: '中国传统山水画的标准构图是竖幅（高>宽）。' },
      { param: '宋代名家风格', why: '宋代是中国山水画的巅峰，锚定到宋代能立即锁住"正"的画风。' }
    ],
    tutorial: {
      intro: '即梦在中文场景里是王者，汉字渲染和中国文化理解远超国外 AI。',
      steps: [
        '主体：远山近水，瀑布飞流，松树云雾 — 山水的经典元素。',
        '意境：留白意境 — 中国画最核心的概念，比"细节"更重要。',
        '风格锚：宋代名家风格 — 宋代山水画水平最高。',
        '质感：淡墨渲染，宣纸质感，印章红泥 — 这些"画材"词是即梦擅长的。',
        '构图：竖幅构图 — 传统中国画是竖幅。'
      ],
      tips: '中国画的核心是"留白"。提示词里加"留白意境"，模型就会自动减少细节、加空白 — 这是中国画的味道。'
    },
    cross_model: {
      midjourney: 'MJ v6.1: "Chinese ink wash landscape, shanshui, song dynasty --ar 2:3 --v 6.1" (loses Chinese feel)',
      stable_diffusion: 'SDXL: not good for Chinese style. Use a dedicated LoRA.',
      flux: 'Flux understands Chinese art but lacks cultural depth.',
      dall_e: 'DALL-E 3 Chinese art is OK but stylistically inconsistent.',
      jimeng_zh: '用这个 prompt 直接跑。'
    },
    styles: ['illustration', 'vintage', 'watercolor'],
    useCases: ['wallpaper', 'marketing', 'blog-header'],
    difficulty: 3,
    tags: ['chinese', 'ink-wash', 'shanshui', 'jimeng', 'song-dynasty'],
    faq: [
      { q: '即梦 vs Midjourney for Chinese art?', a: '即梦完全碾压。即梦训练数据里中文艺术比重高，国外模型对"留白"和"意境"理解不到位。' },
      { q: 'How to get the "blank space" feel?', a: 'Add "留白意境" to the prompt. The model knows Chinese painting conventions.' },
      { q: 'Best for Chinese calligraphy?', a: '即梦 still struggles with character-by-character calligraphy. For real calligraphy, human + Photoshop is best.' }
    ]
  },

  // ===== 31. MJ - 80s Synthwave =====
  {
    id: 'seed-80s-synthwave-mj',
    source: 'Original',
    sourceUrl: 'https://aigallery.xyz/gallery/80s-synthwave-mj',
    imageUrl: 'https://image.civitai.com/xG1nkqbyTM5Gq8cqwU6wmG3skAcQ/width=1024/synthwave-sample.webp',
    author: 'aigallery_demo',
    model: 'midjourney',
    originalPrompt: '80s synthwave, neon grid, sunset, palm trees',
    originalParams: '--v 6.1 --ar 16:9 --s 850',
    title: '80s Synthwave: Neon Grid Aesthetic',
    slug: '80s-synthwave-mj',
    description: 'How to nail the synthwave aesthetic in MJ v6.1. Color palette + grid + sun are the keys.',
    rewrite_prompt: '80s synthwave aesthetic, retro-futuristic landscape, glowing neon grid stretching to horizon, magenta and cyan sunset with massive sun, silhouetted palm trees, chrome sports car driving on the grid, scanlines and chromatic aberration, vaporwave nostalgia, outrun style, 8k retro digital art --v 6.1 --ar 16:9 --s 850',
    rewrite_negative: '--no realistic, modern, daylight, dull colors',
    params_explained: [
      { param: '--s 850', why: 'High stylize is essential for the synthwave look — the more MJ plays, the better.' },
      { param: '--ar 16:9', why: 'Cinematic widescreen — synthwave\'s signature format.' },
      { param: 'outrun style', why: 'Outrun is the sub-genre name for synthwave landscape art.' }
    ],
    tutorial: {
      intro: 'Synthwave is one of the most consistent AI styles. The palette is unmistakable: magenta, cyan, neon grid.',
      steps: [
        'Style: 80s synthwave aesthetic, outrun style — instantly locks the look.',
        'Landscape: glowing neon grid stretching to horizon — the iconic element.',
        'Sky: magenta and cyan sunset with massive sun — the color anchor.',
        'Foreground: silhouetted palm trees, chrome sports car driving on the grid — adds nostalgia.',
        'Effects: scanlines and chromatic aberration — retro digital vibes.'
      ],
      tips: 'Synthwave is 90% color palette. If the magenta + cyan + grid are right, the model nails everything else.'
    },
    cross_model: {
      midjourney: 'Use the rewrite prompt with --s 850.',
      stable_diffusion: 'SDXL + Dreamshaper\nPrompt: "synthwave, outrun, neon grid, palm trees, magenta cyan"',
      flux: 'Flux handles synthwave well.',
      dall_e: 'DALL-E 3 synthwave is OK.',
      jimeng_zh: '80 年代合成波美学，霓虹网格，品红青色日落，棕榈树剪影，复古未来'
    },
    styles: ['3d', 'vintage', 'illustration'],
    useCases: ['wallpaper', 'blog-header', 'marketing'],
    difficulty: 2,
    tags: ['synthwave', '80s', 'neon', 'outrun', 'retro'],
    faq: [
      { q: 'How to get the "neon grid"?', a: 'Just write "glowing neon grid stretching to horizon". MJ knows this trope perfectly.' },
      { q: 'Why are my colors wrong?', a: 'You forgot the magenta + cyan combo. Always specify "magenta and cyan" together.' },
      { q: 'Best aspect for synthwave?', a: '--ar 16:9 or 21:9. Widescreen is the genre standard.' }
    ]
  },

  // ===== 32. MJ - Children Book Illustration =====
  {
    id: 'seed-children-book-mj',
    source: 'Original',
    sourceUrl: 'https://aigallery.xyz/gallery/children-book-mj',
    imageUrl: 'https://image.civitai.com/xG1nkqbyTM5Gq8cqwU6wmG3skAcQ/width=1024/children-book-sample.webp',
    author: 'aigallery_demo',
    model: 'midjourney',
    originalPrompt: 'children book illustration, cute dragon, forest',
    originalParams: '--niji 6 --ar 1:1 --s 400',
    title: 'Children Book Illustration: Cute Characters',
    slug: 'children-book-mj',
    description: 'Generate charming children book illustrations in MJ Niji 6. Cuteness + simplicity + warmth.',
    rewrite_prompt: 'children book illustration, adorable baby dragon with big round eyes and soft purple scales, sitting in a magical forest, friendly small fox and bunny companions, soft watercolor style, warm pastel color palette with mint green, peach, and sky blue, hand-painted texture, gentle expression, full body, storybook illustration --niji 6 --ar 1:1 --s 400',
    rewrite_negative: '--no scary, dark, realistic, complex, scary teeth',
    params_explained: [
      { param: '--niji 6', why: 'Niji handles cute, soft illustration styles better than v6.' },
      { param: '--s 400', why: 'Medium stylize — high enough to be charming, low enough to look hand-painted.' },
      { param: 'big round eyes', why: 'The single most important cuteness cue in children\'s illustration.' }
    ],
    tutorial: {
      intro: 'Children\'s book art lives on: cuteness cues + simple composition + warm palette. AI does all three.',
      steps: [
        'Character: adorable baby dragon with big round eyes and soft purple scales — specific creature + specific features.',
        'Cuteness cues: big round eyes — non-negotiable for kids\' books.',
        'Companions: friendly small fox and bunny companions — adds story.',
        'Setting: sitting in a magical forest — soft, safe atmosphere.',
        'Style: soft watercolor style, warm pastel color palette with mint green, peach, and sky blue — children\'s book palette.'
      ],
      tips: 'Big round eyes is the #1 cuteness multiplier. Always include it. Add "soft round shapes" to your prompt for extra cute.'
    },
    cross_model: {
      midjourney: 'Niji 6: use the rewrite prompt with --s 400.',
      stable_diffusion: 'SDXL + Dreamshaper\nPrompt: "children book illustration, baby dragon, magical forest, watercolor"',
      flux: 'Flux handles children\'s style.',
      dall_e: 'DALL-E 3 is OK for kids.',
      jimeng_zh: '儿童绘本插画，可爱小龙，大圆眼睛，紫色鳞片，魔法森林，温暖粉彩'
    },
    styles: ['illustration', 'watercolor', 'minimalist'],
    useCases: ['illustration', 'blog-header', 'wallpaper'],
    difficulty: 2,
    tags: ['children', 'book', 'illustration', 'cute', 'watercolor'],
    faq: [
      { q: 'Why is my dragon scary?', a: 'You forgot "soft scales" and "big round eyes". Add both — they push the dragon from "Smaug" to "toothpaste mascot".' },
      { q: 'Best model for kids book?', a: 'MJ Niji 6 is the king. SDXL + Dreamshaper is also good.' },
      { q: 'How to keep style consistent across pages?', a: 'Use the same seed + similar prompt structure. Or use SDXL with style LoRAs.' }
    ]
  },

  // ===== 33. MJ - Steampunk Airship =====
  {
    id: 'seed-steampunk-airship-mj',
    source: 'Civitai',
    sourceUrl: 'https://civitai.com/images/steampunk-airship',
    imageUrl: 'https://image.civitai.com/xG1nkqbyTM5Gq8cqwU6wmG3skAcQ/width=1024/steampunk-airship.webp',
    author: 'aigallery_demo',
    model: 'midjourney',
    originalPrompt: 'steampunk airship in the sky, brass details, sunset, clouds',
    originalNegativePrompt: 'modern, plastic, anime',
    originalParams: '--ar 16:9 --v 6.1 --s 800',

    title: 'Steampunk Airship Over the Clouds',
    slug: 'steampunk-airship-clouds',
    description: 'Build a Victorian-era airship scene with brass details, dramatic clouds, and golden hour lighting. Strong fit for book covers and fantasy game art.',

    rewrite_prompt: 'majestic victorian steampunk airship with brass propellers and copper boilers floating through dramatic golden hour clouds, intricate gear mechanisms visible, billowing smoke from twin smokestacks, detailed hull plating, oil painting atmosphere, howl\'s moving castle inspired --ar 16:9 --v 6.1 --s 800',
    rewrite_negative: '--no modern elements, plastic, anime, clean lines, minimalist',

    params_explained: [
      { param: '--s 800', why: 'High stylize lets MJ add intricate mechanical detail. Steampunk lives or dies on texture density.' },
      { param: '--v 6.1', why: 'v6.1 handles "brass/copper/gear" terminology much better than v5.2.' },
      { param: '--ar 16:9', why: 'Cinematic widescreen ratio suits sky-bound compositions. Use 1:1 for character-focused steampunk portraits.' }
    ],

    tutorial: {
      intro: 'Steampunk is detail-driven. Generic "steampunk" gets you Victorian boots; "brass propellers + copper boilers + gear mechanisms" gets you a real airship.',
      steps: [
        'Anchor subject: majestic victorian steampunk airship — name the era (victorian) and vehicle (airship).',
        'Add materials: brass propellers, copper boilers, detailed hull plating — these three push MJ from "balloon" to "steampunk vessel".',
        'Specify mechanics: intricate gear mechanisms visible, billowing smoke from twin smokestacks — mechanical cues sell the genre.',
        'Set atmosphere: dramatic golden hour clouds, oil painting atmosphere — natural lighting + painterly style = epic mood.',
        'Reference: howl\'s moving castle inspired — naming a specific Ghibli film gives MJ a visual target.'
      ],
      tips: 'Steampunk = brass + copper + gears + Victorian + steam. Without these five keywords, you get a balloon with random pipes.'
    },

    cross_model: {
      midjourney: 'Use rewrite prompt with --s 800. Add --chaos 15 for mechanical variation.',
      stable_diffusion: 'SDXL + Dreamshaper\nNegative: modern, plastic, clean\nCFG 7, Steps 35, Sampler DPM++ 2M Karras',
      flux: 'Flux needs the prompt slightly rephrased: "A massive Victorian airship made of brass and copper, with visible gear mechanisms and twin smokestacks, floating through golden hour clouds, oil painting style".',
      dall_e: 'DALL-E 3: "A detailed steampunk airship with brass and copper details, floating in golden hour clouds, in the style of Howl\'s Moving Castle".',
      jimeng_zh: '蒸汽朋克飞艇，维多利亚风格，黄铜螺旋桨，铜锅炉，齿轮机构，金色夕阳云层，吉卜力画风。'
    },

    styles: ['concept-art', 'realistic', 'vintage'],
    useCases: ['blog-header', 'social-media', 'marketing'],
    difficulty: 3,
    tags: ['steampunk', 'airship', 'victorian', 'fantasy', 'mechanical', 'ghibli'],
    faq: [
      { q: 'Why does my steampunk image look modern?', a: 'You forgot the "victorian" and "brass/copper" keywords. Without them, MJ defaults to "futuristic".' },
      { q: 'How to get more mechanical detail?', a: 'Raise --s to 800+ and add "intricate gear mechanisms, pipes, rivets". MJ v6.1 reads these terms well.' },
      { q: 'Best aspect ratio for cover art?', a: '16:9 for video/YouTube. 2:3 for book covers. 1:1 for thumbnails.' }
    ]
  },

  // ===== 34. MJ - Aurora Night Sky =====
  {
    id: 'seed-aurora-night-mj',
    source: 'Civitai',
    sourceUrl: 'https://civitai.com/images/aurora-night',
    imageUrl: 'https://image.civitai.com/xG1nkqbyTM5Gq8cqwU6wmG3skAcQ/width=1024/aurora-night.webp',
    author: 'aigallery_demo',
    model: 'midjourney',
    originalPrompt: 'aurora borealis, night sky, mountains, stars',
    originalNegativePrompt: 'daytime, urban, light pollution',
    originalParams: '--ar 21:9 --v 6.1 --s 600',

    title: 'Aurora Borealis Wallpaper at 21:9',
    slug: 'aurora-borealis-wallpaper',
    description: 'Ultra-wide 21:9 aurora landscape perfect for ultrawide monitors, presentation backgrounds, and desktop wallpapers.',

    rewrite_prompt: 'breathtaking aurora borealis dancing across a starry night sky, vibrant green and purple ribbons of light, snow-capped mountains in the distance, frozen lake reflecting the aurora, milky way visible, ultra wide cinematic composition, national geographic photography style --ar 21:9 --v 6.1 --s 600',
    rewrite_negative: '--no daytime, urban, light pollution, blurry, lowres',

    params_explained: [
      { param: '--ar 21:9', why: 'Ultrawide cinema ratio. Matches ultrawide monitors (3440x1440) and Letterboxd-style framing.' },
      { param: '--s 600', why: 'Mid-high stylize for natural-but-dramatic sky. Lower values get more documentary; higher get more painterly.' }
    ],

    tutorial: {
      intro: 'Aurora images fail when prompts are too short. The aurora needs verbs ("dancing"), colors ("vibrant green and purple"), and a reflection (frozen lake) to feel real.',
      steps: [
        'Aurora: breathtaking aurora borealis dancing across a starry night sky — "dancing" is the verb that makes it move.',
        'Color: vibrant green and purple ribbons of light — name two specific aurora colors.',
        'Foreground: snow-capped mountains in the distance + frozen lake reflecting the aurora — reflections double the impact.',
        'Bonus: milky way visible — adds cosmic scale.',
        'Format: ultra wide cinematic composition + national geographic photography style — gives MJ a reference target.'
      ],
      tips: '21:9 ratio is the secret sauce. The aurora needs horizontal space to "flow" across the image.'
    },

    cross_model: {
      midjourney: 'Use rewrite prompt. --ar 21:9 is supported natively.',
      stable_diffusion: 'SDXL + JuggernautXL\nPrompt as above, add "8k uhd, raw photo"\nNegative: cartoon, painting, anime',
      flux: 'Flux handles aurora very well. Use same prompt, no negative needed.',
      dall_e: 'DALL-E 3 supports wide ratios. Be specific: "A 21:9 ultrawide photograph of aurora borealis..."',
      jimeng_zh: '极光夜空，绿色紫色光带，雪山，倒影湖泊，银河，超宽幅电影感。'
    },

    styles: ['realistic', 'wallpaper', 'photorealistic'],
    useCases: ['wallpaper', 'blog-header', 'marketing'],
    difficulty: 2,
    tags: ['aurora', 'night-sky', 'landscape', 'ultrawide', 'wallpaper', 'nature'],
    faq: [
      { q: 'Why does my aurora look fake?', a: 'You forgot the reflection. "Frozen lake reflecting" doubles the believability — the sky has to mirror.' },
      { q: 'Best ratio for desktop wallpaper?', a: '21:9 for ultrawide, 16:9 for standard, 9:16 for phone.' },
      { q: 'How to avoid generic "stock photo" feel?', a: 'Add "national geographic photography style" or "shot on Sony A7R IV" to anchor the visual reference.' }
    ]
  },

  // ===== 35. MJ - Macro Insect Photography =====
  {
    id: 'seed-macro-insect-mj',
    source: 'Civitai',
    sourceUrl: 'https://civitai.com/images/macro-insect',
    imageUrl: 'https://image.civitai.com/xG1nkqbyTM5Gq8cqwU6wmG3skAcQ/width=1024/macro-insect.webp',
    author: 'aigallery_demo',
    model: 'midjourney',
    originalPrompt: 'macro photography of a beetle, dew drops, morning light',
    originalNegativePrompt: 'cartoon, illustration, blur',
    originalParams: '--ar 1:1 --v 6.1 --s 500',

    title: 'Macro Insect Photography with Dewdrops',
    slug: 'macro-insect-dewdrops',
    description: 'Close-up macro-style insect shots with dewdrops, suitable for biology textbooks, nature magazine covers, and stock photography.',

    rewrite_prompt: 'extreme close-up macro photograph of a jewel beetle on a wet leaf at sunrise, intricate iridescent green and copper shell, tiny dewdrops on antennae, golden morning backlight, shallow depth of field, focus stacking, canon MP-E 65mm f/2.8 macro lens --ar 1:1 --v 6.1 --s 500',
    rewrite_negative: '--no cartoon, illustration, blurry, plastic textures',

    params_explained: [
      { param: '--ar 1:1', why: 'Square ratio suits Instagram and product-style framing. Macro subjects are usually centered.' },
      { param: '--s 500', why: 'Balanced stylize for documentary + visual appeal. Pure photo (--style raw) also works well here.' }
    ],

    tutorial: {
      intro: 'Macro insect photography needs three things: real lens name, specific insect, specific lighting.',
      steps: [
        'Lens name: canon MP-E 65mm f/2.8 macro lens — naming a real lens is a cheat code for "real photo" feel.',
        'Insect: jewel beetle on a wet leaf — specific insect, specific surface.',
        'Detail cues: intricate iridescent green and copper shell — "iridescent" forces the metallic color shift.',
        'Scale cues: tiny dewdrops on antennae — micro details that make it feel real.',
        'Light: golden morning backlight, shallow depth of field, focus stacking — three professional photography terms.'
      ],
      tips: 'Always name a real lens. "Canon MP-E 65mm" or "Laowa 100mm" works 10x better than "macro lens".'
    },

    cross_model: {
      midjourney: 'Use rewrite prompt. Add --style raw for more documentary feel.',
      stable_diffusion: 'SDXL + JuggernautXL\nPrompt as above. CFG 6, Steps 30.',
      flux: 'Flux understands lens terminology natively. Use same prompt.',
      dall_e: 'DALL-E 3 is good for macro. "An extreme close-up photograph of a jewel beetle..." works well.',
      jimeng_zh: '微距摄影，甲虫，露珠，朝阳，背光，浅景深，金绿铜色光泽。'
    },

    styles: ['realistic', 'photorealistic'],
    useCases: ['blog-header', 'social-media', 'marketing'],
    difficulty: 3,
    tags: ['macro', 'insect', 'nature', 'photography', 'dewdrops'],
    faq: [
      { q: 'Why does my beetle look like a toy?', a: 'You forgot the lens name. "Canon MP-E 65mm" makes MJ render the textures photographically.' },
      { q: 'How to get iridescent colors?', a: 'Use "iridescent" + two color names (green and copper). "Iridescent" alone is too vague.' },
      { q: 'Best model for nature photography?', a: 'MJ v6.1 --style raw, or SDXL + JuggernautXL. Both handle nature realistically.' }
    ]
  },

  // ===== 36. MJ - Vintage Fashion Editorial =====
  {
    id: 'seed-vintage-fashion-mj',
    source: 'Civitai',
    sourceUrl: 'https://civitai.com/images/vintage-fashion',
    imageUrl: 'https://image.civitai.com/xG1nkqbyTM5Gq8cqwU6wmG3skAcQ/width=1024/vintage-fashion.webp',
    author: 'aigallery_demo',
    model: 'midjourney',
    originalPrompt: 'vintage fashion editorial, 1960s, model, magazine',
    originalNegativePrompt: 'modern, casual, streetwear',
    originalParams: '--ar 2:3 --v 6.1 --s 750',

    title: '1960s Vintage Fashion Editorial',
    slug: 'vintage-fashion-editorial-1960s',
    description: 'High-fashion editorial photography in 1960s style. Perfect for fashion magazine layouts, mood boards, and vintage brand marketing.',

    rewrite_prompt: 'vogue paris 1965 fashion editorial photograph, elegant woman in tailored tweed suit and pillbox hat, dramatic studio lighting, contre-joupe pose, kodachrome color palette, rich saturated tones, art director richard avedon style --ar 2:3 --v 6.1 --s 750',
    rewrite_negative: '--no modern, casual, streetwear, instagram filter, flat lighting',

    params_explained: [
      { param: '--ar 2:3', why: 'Magazine vertical ratio. Matches Vogue/Harper\'s Bazaar print layouts.' },
      { param: '--s 750', why: 'High stylize adds editorial polish. Fashion images need MJ\'s aesthetic sense.' }
    ],

    tutorial: {
      intro: 'Vintage fashion needs named era + named magazine + named photographer. Generic "vintage fashion" gets you Pinterest clutter.',
      steps: [
        'Magazine + year: vogue paris 1965 — naming the magazine anchors the visual style.',
        'Outfit: tailored tweed suit and pillbox hat — era-specific clothing cues.',
        'Pose: contre-joupe pose — French fashion term for "contrapposto", gives the body language.',
        'Color: kodachrome color palette, rich saturated tones — film stock reference for color treatment.',
        'Photographer: art director richard avedon style — name a specific fashion photographer.'
      ],
      tips: 'Vintage = named era + named film + named photographer. Three named references = authentic vintage.'
    },

    cross_model: {
      midjourney: 'Use rewrite prompt. --s 800 if you want more drama.',
      stable_diffusion: 'SDXL + epiCRealism\nAdd: "vogue cover, editorial layout"',
      flux: 'Flux handles fashion very well. Same prompt.',
      dall_e: 'DALL-E 3: "A 1965 Vogue Paris fashion editorial photograph of a woman in a tweed suit and pillbox hat, in the style of Richard Avedon".',
      jimeng_zh: '1965 年法国 Vogue 时装大片，定制花呢西装，帽子，戏剧棚拍，复古胶片色调。'
    },

    styles: ['realistic', 'vintage', 'photorealistic'],
    useCases: ['marketing', 'social-media', 'blog-header'],
    difficulty: 3,
    tags: ['fashion', 'editorial', 'vintage', '1960s', 'magazine', 'vogue'],
    faq: [
      { q: 'Why does my vintage look like costume party?', a: 'You forgot the photographer name. "Richard Avedon" or "Irving Penn" forces authentic period styling.' },
      { q: 'How to get rich vintage color?', a: 'Name a film stock: "kodachrome" for warm reds, "fujifilm velvia" for saturated landscapes, "ilford hp5" for B&W.' },
      { q: 'Best ratio for magazine cover?', a: '2:3 vertical is industry standard. Use 1:1 for Instagram reposts.' }
    ]
  },

  // ===== 37. MJ - Cozy Coffee Shop Interior =====
  {
    id: 'seed-coffee-shop-mj',
    source: 'Civitai',
    sourceUrl: 'https://civitai.com/images/coffee-shop',
    imageUrl: 'https://image.civitai.com/xG1nkqbyTM5Gq8cqwU6wmG3skAcQ/width=1024/coffee-shop.webp',
    author: 'aigallery_demo',
    model: 'midjourney',
    originalPrompt: 'cozy coffee shop interior, warm lighting, books, plants',
    originalNegativePrompt: 'cold, sterile, industrial',
    originalParams: '--ar 16:9 --v 6.1 --s 700',

    title: 'Cozy Coffee Shop Interior for Lifestyle Branding',
    slug: 'cozy-coffee-shop-interior',
    description: 'Warm, inviting coffee shop scenes for cafe branding, lifestyle blog headers, and travel content. Reads as "third place" instantly.',

    rewrite_prompt: 'cozy independent coffee shop interior, exposed brick walls, warm Edison bulb lighting, wooden tables with steaming latte art, shelves of vintage books and trailing pothos plants, rain visible through large window, late autumn afternoon, lifestyle photography by door #1 coffee --ar 16:9 --v 6.1 --s 700',
    rewrite_negative: '--no cold, sterile, industrial, fluorescent lighting, empty',

    params_explained: [
      { param: '--ar 16:9', why: 'Wide ratio for lifestyle banners and blog headers. The space needs to breathe horizontally.' },
      { param: '--s 700', why: 'High stylize adds warmth. Lower values give "stock photo" feel; higher adds painterly coziness.' }
    ],

    tutorial: {
      intro: '"Cozy" is not a style, it\'s a combination of: warm light + natural materials + lived-in clutter + human activity.',
      steps: [
        'Architecture: exposed brick walls — textural surface cues.',
        'Lighting: warm Edison bulb lighting — bulb type matters more than "warm light".',
        'Details: wooden tables with steaming latte art — vapor + cup = "happening now" energy.',
        'Lived-in clutter: shelves of vintage books and trailing pothos plants — books + plants = the "third place" code.',
        'Weather/mood: rain visible through large window, late autumn afternoon — weather + time of day anchor the season.'
      ],
      tips: 'Adding "real brand name" like "Door #1 Coffee" makes MJ render authentic cafe branding instead of generic mock-up.'
    },

    cross_model: {
      midjourney: 'Use rewrite prompt.',
      stable_diffusion: 'SDXL + RealisticVision\nAdd: "lifestyle photography, ambient light"',
      flux: 'Flux handles interiors very well. Same prompt.',
      dall_e: 'DALL-E 3: "Interior of a cozy independent coffee shop with exposed brick, Edison bulbs, wooden tables, latte art, books, and plants, rain outside".',
      jimeng_zh: '温馨咖啡馆，红砖墙，复古爱迪生灯，木桌拿铁，盆栽，雨天窗景。'
    },

    styles: ['realistic', 'photorealistic'],
    useCases: ['marketing', 'blog-header', 'social-media'],
    difficulty: 2,
    tags: ['coffee', 'interior', 'cozy', 'lifestyle', 'cafe', 'autumn'],
    faq: [
      { q: 'Why does my cafe look like a chain?', a: 'You forgot "independent" and "lived-in" details. "Exposed brick" + "vintage books" + "pothos plants" push it indie.' },
      { q: 'How to make it look lived-in?', a: 'Add "steaming coffee, half-read book, open laptop" — small human activity cues.' },
      { q: 'Best season for cozy feel?', a: 'Late autumn with rain visible through windows. Spring is too bright; summer feels wrong for coffee shop imagery.' }
    ]
  },

  // ===== 38. MJ - 90s Anime Screenshot =====
  {
    id: 'seed-90s-anime-mj',
    source: 'Civitai',
    sourceUrl: 'https://civitai.com/images/90s-anime',
    imageUrl: 'https://image.civitai.com/xG1nkqbyTM5Gq8cqwU6wmG3skAcQ/width=1024/90s-anime.webp',
    author: 'aigallery_demo',
    model: 'midjourney',
    originalPrompt: '90s anime screenshot, Evangelion style, character close-up',
    originalNegativePrompt: 'modern anime, moe, cute',
    originalParams: '--ar 4:3 --niji 6 --s 900',

    title: '90s Anime Screenshot (Evangelion Style)',
    slug: '90s-anime-screenshot-evangelion',
    description: 'Recreate the iconic 90s anime aesthetic — cel-shading, film grain, and emotional close-ups. Strong fit for retrospective content and nostalgia posts.',

    rewrite_prompt: '1995 anime cel animation screenshot, close-up of melancholic teenage boy with messy dark hair, school uniform, visible cel-shading lines, hand-painted background of tokyo cityscape at dusk, visible film grain and minor cel artifacts, gainax production style, neon genesis evangelion aesthetic --ar 4:3 --niji 6 --s 900',
    rewrite_negative: '--no modern anime, 3d, moe, kawaii, moeblob',

    params_explained: [
      { param: '--niji 6', why: 'Niji 6 is MJ\'s anime model. It handles 90s cel-shading better than v6.1.' },
      { param: '--s 900', why: 'Max stylize for full anime aesthetic. 90s anime is highly stylized.' }
    ],

    tutorial: {
      intro: '90s anime is not the same as modern anime. The key is cel-shading lines + film grain + hand-painted backgrounds + emotional close-ups.',
      steps: [
        'Year: 1995 anime cel animation screenshot — the year anchors the production style.',
        'Subject: close-up of melancholic teenage boy with messy dark hair, school uniform — emotional state + period-correct details.',
        'Style cues: visible cel-shading lines, hand-painted background of tokyo cityscape at dusk — "cel-shading" and "hand-painted" are the magic words.',
        'Imperfections: visible film grain and minor cel artifacts — imperfections make it feel real, not clean digital.',
        'Studio: gainax production style, neon genesis evangelion aesthetic — name the studio + show.'
      ],
      tips: '90s anime = "cel animation" + "film grain" + "hand-painted" + specific studio name. These four terms = authentic 90s.'
    },

    cross_model: {
      midjourney: 'Use --niji 6 with --s 900.',
      stable_diffusion: 'SDXL + AnythingV5\nAdd LoRA: "anime_90s_style"\nPrompt: "1990s anime screenshot, cel animation, evangelion style"',
      flux: 'Flux is OK for anime but not as good as Niji. Use as fallback.',
      dall_e: 'DALL-E 3: "A 1995 anime cel animation screenshot of a melancholic teenager in the style of Neon Genesis Evangelion".',
      jimeng_zh: '90 年代动漫，新世纪福音战士风格，赛璐璐动画，胶片颗粒，手绘背景。'
    },

    styles: ['anime', 'vintage', 'illustration'],
    useCases: ['illustration', 'blog-header', 'social-media'],
    difficulty: 3,
    tags: ['anime', '90s', 'evangelion', 'cel-animation', 'nostalgia', 'gainax'],
    faq: [
      { q: 'Why does my anime look modern?', a: 'You forgot the year. "1995" or "1990s" is non-negotiable for 90s aesthetic. Modern anime has clean digital lines.' },
      { q: 'How to get cel-shading?', a: 'Add "visible cel-shading lines" + "cel animation". Niji 6 + --s 900 reads these terms well.' },
      { q: 'Best aspect ratio?', a: '4:3 for 90s TV aspect. 16:9 for modern. The 4:3 box is a visual cue itself.' }
    ]
  },

  // ===== 39. MJ - Clay 3D Render =====
  {
    id: 'seed-clay-3d-mj',
    source: 'Civitai',
    sourceUrl: 'https://civitai.com/images/clay-3d',
    imageUrl: 'https://image.civitai.com/xG1nkqbyTM5Gq8cqwU6wmG3skAcQ/width=1024/clay-3d.webp',
    author: 'aigallery_demo',
    model: 'midjourney',
    originalPrompt: 'clay 3d render, character, soft lighting',
    originalNegativePrompt: 'real photo, harsh light',
    originalParams: '--ar 1:1 --v 6.1 --s 600',

    title: 'Clay 3D Render for Sticker and App Icon Style',
    slug: 'clay-3d-render-sticker',
    description: 'Soft, tactile clay 3D look perfect for app icons, stickers, mascots, and Instagram content. Feels handmade but renders clean.',

    rewrite_prompt: 'cute claymation style 3d render of a happy avocado character, soft pastel colors, visible fingerprint texture on the clay surface, soft diffused studio lighting, white seamless background, octane render, plasticine texture --ar 1:1 --v 6.1 --s 600',
    rewrite_negative: '--no realistic photo, harsh shadows, sharp edges, metallic',

    params_explained: [
      { param: '--ar 1:1', why: 'Square for app icons and Instagram. Clay characters work best centered.' },
      { param: '--s 600', why: 'Mid stylize keeps the clay aesthetic without going surreal.' }
    ],

    tutorial: {
      intro: 'Clay 3D = "claymation" + "fingerprint texture" + "soft diffused lighting". Without these three, you get generic 3D.',
      steps: [
        'Style: claymation style 3d render — "claymation" is the specific term MJ understands.',
        'Subject: happy avocado character — pick a specific food/object.',
        'Texture: visible fingerprint texture on the clay surface — "fingerprint" is the magic word for handmade feel.',
        'Lighting: soft diffused studio lighting, white seamless background — product-photography lighting style.',
        'Tech: octane render, plasticine texture — naming a renderer + clay type adds polish.'
      ],
      tips: '"Fingerprint texture" is the secret. Without it, clay 3D looks like smooth plastic.'
    },

    cross_model: {
      midjourney: 'Use rewrite prompt.',
      stable_diffusion: 'SDXL + DreamShaper\nPrompt: "clay 3d render, plasticine, fingerprint texture"',
      flux: 'Flux handles 3D styles well. Same prompt.',
      dall_e: 'DALL-E 3: "A cute claymation 3D render of a happy avocado character with visible fingerprint textures".',
      jimeng_zh: '黏土 3D 渲染，塑料质感，指纹纹理，柔光，食品 IP 风格。'
    },

    styles: ['3d', 'illustration', 'minimalist'],
    useCases: ['avatar', 'social-media', 'marketing'],
    difficulty: 2,
    tags: ['clay', '3d', 'mascot', 'icon', 'claymation', 'cute'],
    faq: [
      { q: 'Why does my clay look like plastic?', a: 'You forgot "fingerprint texture" and "plasticine". These are the texture cues MJ needs.' },
      { q: 'Best for app icons?', a: 'Clay 3D reads well at small sizes. Use --ar 1:1 and stick to one character.' },
      { q: 'How to add brand colors?', a: 'Specify "soft pastel" + name the colors (mint, peach, sky blue). MJ keeps them muted.' }
    ]
  },

  // ===== 40. MJ - Glass Morphism Icon =====
  {
    id: 'seed-glass-morphism-mj',
    source: 'Civitai',
    sourceUrl: 'https://civitai.com/images/glass-morphism',
    imageUrl: 'https://image.civitai.com/xG1nkqbyTM5Gq8cqwU6wmG3skAcQ/width=1024/glass-morphism.webp',
    author: 'aigallery_demo',
    model: 'midjourney',
    originalPrompt: 'glass morphism icon, UI design, modern app',
    originalNegativePrompt: 'flat design, skeuomorphism, 3d',
    originalParams: '--ar 1:1 --v 6.1 --s 500',

    title: 'Glass Morphism UI Icon',
    slug: 'glass-morphism-ui-icon',
    description: 'Modern glassmorphism style UI icon for SaaS dashboards, iOS apps, and tech landing pages. Translucent, blurred, premium.',

    rewrite_prompt: 'glass morphism style app icon for a music player, translucent frosted glass square with rounded corners, soft pastel gradient background in pink to purple, subtle white border, soft drop shadow, modern UI design, dribbble featured --ar 1:1 --v 6.1 --s 500',
    rewrite_negative: '--no flat design, skeuomorphism, 3d, realistic photo',

    params_explained: [
      { param: '--ar 1:1', why: 'Square icons for iOS/Android and dashboard UI.' },
      { param: '--s 500', why: 'Mid stylize for clean modern look. Higher stylize adds unwanted decoration.' }
    ],

    tutorial: {
      intro: 'Glassmorphism = "frosted glass" + "soft gradient" + "rounded corners" + "subtle shadow". Skip any one and the illusion breaks.',
      steps: [
        'Material: translucent frosted glass square with rounded corners — material + shape.',
        'Background: soft pastel gradient background in pink to purple — gradient direction matters.',
        'Edge: subtle white border — the "edge highlight" is what sells the glass.',
        'Depth: soft drop shadow — without shadow, glass floats awkwardly.',
        'Reference: modern UI design, dribbble featured — Dribbble reference primes the right visual code.'
      ],
      tips: 'Without "soft drop shadow", the glass icon looks pasted. Without "subtle white border", the glass looks flat.'
    },

    cross_model: {
      midjourney: 'Use rewrite prompt.',
      stable_diffusion: 'SDXL + Proteus\nPrompt: "glassmorphism icon, frosted glass, gradient, UI design"',
      flux: 'Flux handles UI very well. Same prompt.',
      dall_e: 'DALL-E 3: "A glassmorphism style app icon for a music player with frosted glass, soft pink-purple gradient, and subtle shadow".',
      jimeng_zh: '玻璃拟态图标，毛玻璃，渐变色，圆角，柔和阴影，现代 UI 设计。'
    },

    styles: ['minimalist', '3d'],
    useCases: ['avatar', 'social-media', 'logo'],
    difficulty: 2,
    tags: ['glassmorphism', 'ui', 'icon', 'modern', 'glass', 'gradient'],
    faq: [
      { q: 'Why does my glass icon look flat?', a: 'You forgot "subtle white border" or "soft drop shadow". The edge highlight is non-negotiable for glassmorphism.' },
      { q: 'Best background color for glass?', a: 'Soft pastel gradients: pink to purple, blue to cyan, mint to sky. Avoid saturated pure colors.' },
      { q: 'How to make icons look premium?', a: 'Add "dribbble featured" or "behance curated" to your prompt. MJ treats these as quality signals.' }
    ]
  },

  // ===== 41. MJ - Vaporwave Aesthetic =====
  {
    id: 'seed-vaporwave-mj',
    source: 'Civitai',
    sourceUrl: 'https://civitai.com/images/vaporwave',
    imageUrl: 'https://image.civitai.com/xG1nkqbyTM5Gq8cqwU6wmG3skAcQ/width=1024/vaporwave.webp',
    author: 'aigallery_demo',
    model: 'midjourney',
    originalPrompt: 'vaporwave aesthetic, palm trees, grid, sunset',
    originalNegativePrompt: 'modern, bright, realistic',
    originalParams: '--ar 16:9 --v 6.1 --s 850',

    title: 'Vaporwave Aesthetic (Grid + Sunset + Palm Trees)',
    slug: 'vaporwave-aesthetic-grid-sunset',
    description: 'Iconic 80s/90s vaporwave with pink/purple gradients, perspective grid, and palm trees. Perfect for music album covers and nostalgic YouTube thumbnails.',

    rewrite_prompt: 'vaporwave aesthetic composition, magenta and cyan gradient sky with pixelated sun, neon pink palm trees silhouetted against the sunset, infinite perspective grid floor in classic vaporwave style, japanese text overlay, scanlines and VHS distortion --ar 16:9 --v 6.1 --s 850',
    rewrite_negative: '--no modern, bright natural colors, realistic photo',

    params_explained: [
      { param: '--ar 16:9', why: 'YouTube thumbnail and album cover ratio. Vaporwave lives at 16:9.' },
      { param: '--s 850', why: 'High stylize for full retro-futurist feel. Vaporwave is highly aestheticized.' }
    ],

    tutorial: {
      intro: 'Vaporwave = magenta + cyan + perspective grid + palm trees + Japanese text + scanlines. Six ingredients, that is it.',
      steps: [
        'Sky: magenta and cyan gradient sky with pixelated sun — two specific colors + pixelated sun.',
        'Subject: neon pink palm trees silhouetted against the sunset — palm trees are the genre icon.',
        'Floor: infinite perspective grid floor in classic vaporwave style — the grid is non-negotiable.',
        'Text: japanese text overlay — Japanese kana/kanji sells the "lost media" vibe.',
        'Texture: scanlines and VHS distortion — analog imperfections = authenticity.'
      ],
      tips: 'Vaporwave = magenta + cyan + grid + palm + scanlines. Skip the scanlines and it just looks like Miami Vice.'
    },

    cross_model: {
      midjourney: 'Use rewrite prompt. --s 900 for extra aesthetic.',
      stable_diffusion: 'SDXL + Dreamshaper\nPrompt: "vaporwave, retro aesthetic, perspective grid, palm trees, magenta cyan"',
      flux: 'Flux handles vaporwave but leans more "clean". Add more imperfection cues.',
      dall_e: 'DALL-E 3: "A vaporwave aesthetic image with magenta-cyan gradient sky, pixelated sun, neon palm trees, perspective grid floor, and VHS scanlines".',
      jimeng_zh: '蒸汽波美学，洋红青蓝渐变，霓虹棕榈树，透视网格，VHS 扫描线，80 年代。'
    },

    styles: ['vintage', 'illustration', 'cyberpunk'],
    useCases: ['social-media', 'blog-header', 'wallpaper'],
    difficulty: 2,
    tags: ['vaporwave', 'retro', '80s', 'synthwave', 'aesthetic', 'neon'],
    faq: [
      { q: 'Why does my vaporwave look like a generic sunset?', a: 'You forgot the perspective grid. The grid is THE vaporwave signature.' },
      { q: 'How to get VHS feel?', a: 'Add "scanlines, VHS distortion, tracking error" — these three terms trigger the analog aesthetic.' },
      { q: 'Best for music covers?', a: '16:9 ratio + 3000x3000px export. The aesthetic translates perfectly to Spotify covers.' }
    ]
  },

  // ===== 42. MJ - Origami Paper Craft =====
  {
    id: 'seed-origami-mj',
    source: 'Civitai',
    sourceUrl: 'https://civitai.com/images/origami',
    imageUrl: 'https://image.civitai.com/xG1nkqbyTM5Gq8cqwU6wmG3skAcQ/width=1024/origami.webp',
    author: 'aigallery_demo',
    model: 'midjourney',
    originalPrompt: 'origami paper crane, paper craft, soft lighting',
    originalNegativePrompt: 'real photo, plastic, 3d render',
    originalParams: '--ar 1:1 --v 6.1 --s 600',

    title: 'Origami Paper Crane (Wabi-Sabi Style)',
    slug: 'origami-paper-crane',
    description: 'Beautifully lit origami paper craft imagery. Works for craft tutorials, mindfulness content, and minimalist branding.',

    rewrite_prompt: 'intricate origami paper crane sitting on a white marble surface, soft natural window light from the left, subtle paper texture and crease lines visible, shallow depth of field, wabi-sabi minimalism, japanese aesthetic photography --ar 1:1 --v 6.1 --s 600',
    rewrite_negative: '--no 3d render, plastic, metallic, bright colors',

    params_explained: [
      { param: '--s 600', why: 'Balanced stylize for natural but aesthetic paper craft feel.' }
    ],

    tutorial: {
      intro: 'Origami aesthetic is about restraint. White surface, soft light, one subject, and visible paper texture.',
      steps: [
        'Subject: intricate origami paper crane — specific subject + "intricate" pushes detail.',
        'Surface: white marble surface — minimal + premium surface.',
        'Light: soft natural window light from the left — direction of light matters.',
        'Texture: subtle paper texture and crease lines visible — paper grain is key.',
        'Aesthetic: shallow depth of field, wabi-sabi minimalism, japanese aesthetic photography — Japanese aesthetic codes.'
      ],
      tips: 'Origami = "wabi-sabi" + "white marble" + "soft window light". These three create instant calm.'
    },

    cross_model: {
      midjourney: 'Use rewrite prompt.',
      stable_diffusion: 'SDXL + RealisticVision\nPrompt: "origami paper crane, white marble, wabi-sabi, soft light"',
      flux: 'Flux is excellent for this. Same prompt.',
      dall_e: 'DALL-E 3: "A delicate origami paper crane on a white marble surface with soft window light, in wabi-sabi Japanese aesthetic".',
      jimeng_zh: '折纸鹤，白色大理石，自然窗光，侘寂美学，日式极简，纸张纹理。'
    },

    styles: ['minimalist', 'realistic'],
    useCases: ['social-media', 'blog-header', 'wallpaper'],
    difficulty: 2,
    tags: ['origami', 'paper', 'wabi-sabi', 'japanese', 'minimalist', 'craft'],
    faq: [
      { q: 'Why does my origami look 3D-rendered?', a: 'You forgot the paper texture cues. "Visible paper texture and crease lines" forces the paper feel.' },
      { q: 'Best for mindfulness content?', a: 'Origami + wabi-sabi + white background = the trifecta for calm/meditation branding.' },
      { q: 'How to make it feel premium?', a: 'White marble surface + soft window light + shallow DOF. These three = "Apple keynote" feel.' }
    ]
  },

  // ===== 43. MJ - Snow Mountain Hiker =====
  {
    id: 'seed-snow-mountain-mj',
    source: 'Civitai',
    sourceUrl: 'https://civitai.com/images/snow-mountain-hiker',
    imageUrl: 'https://image.civitai.com/xG1nkqbyTM5Gq8cqwU6wmG3skAcQ/width=1024/snow-mountain.webp',
    author: 'aigallery_demo',
    model: 'midjourney',
    originalPrompt: 'snow mountain hiker, adventure, sunrise, landscape photo',
    originalNegativePrompt: 'cartoon, flat, indoor',
    originalParams: '--ar 16:9 --v 6.1 --s 500',

    title: 'Snow Mountain Hiker at Sunrise',
    slug: 'snow-mountain-hiker-sunrise',
    description: 'Adventure photography style of a solo hiker on a snow-capped peak. Strong fit for outdoor brand marketing, REI-style blog content, and travel magazines.',

    rewrite_prompt: 'lone hiker in red down jacket standing on a snow-covered mountain ridge at sunrise, vast alpine valley below filled with golden hour mist, jagged snow-capped peaks in the distance, dramatic clouds catching first light, patagonia advertising photography, canon EF 70-200mm f/2.8 --ar 16:9 --v 6.1 --s 500',
    rewrite_negative: '--no cartoon, flat illustration, indoor, sunny beach',

    params_explained: [
      { param: '--ar 16:9', why: 'Patagonia/National Geographic ad ratio. Widescreen for landscape scale.' },
      { param: '--s 500', why: 'Mid stylize for documentary-but-beautiful. Higher stylize loses the "real photo" feel.' }
    ],

    tutorial: {
      intro: 'Adventure photography works because of scale contrast. Tiny human + vast landscape = emotional impact.',
      steps: [
        'Human subject: lone hiker in red down jacket — red jacket is the visual anchor in a white/blue scene.',
        'Position: standing on a snow-covered mountain ridge — peak position = achievement.',
        'Mid-ground: vast alpine valley below filled with golden hour mist — mist adds depth.',
        'Background: jagged snow-capped peaks in the distance — multiple ridge layers create scale.',
        'Light + camera: dramatic clouds catching first light, canon EF 70-200mm f/2.8 — light + real lens name.'
      ],
      tips: 'Red jacket + white snow is the classic adventure photo color combo. Without red, the hiker disappears into the scene.'
    },

    cross_model: {
      midjourney: 'Use rewrite prompt.',
      stable_diffusion: 'SDXL + JuggernautXL\nPrompt: "adventure photography, hiker red jacket, mountain sunrise, golden mist"',
      flux: 'Flux handles landscape well. Same prompt.',
      dall_e: 'DALL-E 3: "A lone hiker in a red jacket standing on a snow-covered mountain ridge at sunrise, vast valley below, in the style of a Patagonia advertisement".',
      jimeng_zh: '雪山日出徒步者，红色冲锋衣，云海，金色光晕，巴塔哥尼亚广告摄影风。'
    },

    styles: ['realistic', 'photorealistic'],
    useCases: ['blog-header', 'marketing', 'social-media'],
    difficulty: 2,
    tags: ['mountain', 'hiking', 'adventure', 'sunrise', 'landscape', 'snow'],
    faq: [
      { q: 'Why does my hiker look like a plastic figure?', a: 'You forgot scale cues. "Vast alpine valley below" + "tiny human" makes the figure feel real in the landscape.' },
      { q: 'How to get the Patagonia look?', a: 'Add "patagonia advertising photography" + "canon EF 70-200mm f/2.8". Brand + lens = authentic outdoor aesthetic.' },
      { q: 'Best for outdoor brand marketing?', a: '16:9 ratio with red jacket + golden hour. Reads instantly as "adventure".' }
    ]
  },

  // ===== 44. MJ - Cosmic Galaxy Space =====
  {
    id: 'seed-cosmic-galaxy-mj',
    source: 'Civitai',
    sourceUrl: 'https://civitai.com/images/cosmic-galaxy',
    imageUrl: 'https://image.civitai.com/xG1nkqbyTM5Gq8cqwU6wmG3skAcQ/width=1024/cosmic-galaxy.webp',
    author: 'aigallery_demo',
    model: 'midjourney',
    originalPrompt: 'cosmic galaxy, nebula, stars, space',
    originalNegativePrompt: 'earth, ground, people',
    originalParams: '--ar 16:9 --v 6.1 --s 750',

    title: 'Cosmic Galaxy Nebula Wallpaper',
    slug: 'cosmic-galaxy-nebula-wallpaper',
    description: 'Deep space nebula imagery perfect for 4K wallpapers, science YouTube thumbnails, and meditation content backgrounds.',

    rewrite_prompt: 'spiral galaxy viewed from above with bright cyan and magenta nebula clouds, billions of stars, dark matter dust lanes, hubble space telescope photograph, ultra high resolution deep space imagery, 8k uhd --ar 16:9 --v 6.1 --s 750',
    rewrite_negative: '--no earth, ground, people, cartoon',

    params_explained: [
      { param: '--s 750', why: 'High stylize for vivid cosmic colors. Lower values look washed out.' }
    ],

    tutorial: {
      intro: 'Galaxy imagery needs specific colors + specific reference. "Hubble telescope" + "cyan and magenta" = real-space feel.',
      steps: [
        'Subject: spiral galaxy viewed from above — specify view angle.',
        'Colors: bright cyan and magenta nebula clouds — name two specific nebula colors.',
        'Detail: billions of stars, dark matter dust lanes — scale + texture cues.',
        'Reference: hubble space telescope photograph — name the source telescope.',
        'Quality: ultra high resolution deep space imagery, 8k uhd — quality anchors.'
      ],
      tips: 'Hubble = real space colors. Without that reference, MJ defaults to fantasy purple.'
    },

    cross_model: {
      midjourney: 'Use rewrite prompt.',
      stable_diffusion: 'SDXL + JuggernautXL\nPrompt: "spiral galaxy, nebula, hubble telescope, deep space"',
      flux: 'Flux handles cosmic imagery very well.',
      dall_e: 'DALL-E 3: "A spiral galaxy with cyan and magenta nebula clouds, as photographed by the Hubble Space Telescope, 8K".',
      jimeng_zh: '宇宙星系，星云，哈勃望远镜，深空摄影，紫青色，高清 8K。'
    },

    styles: ['realistic', 'wallpaper', 'photorealistic'],
    useCases: ['wallpaper', 'blog-header', 'social-media'],
    difficulty: 2,
    tags: ['galaxy', 'space', 'nebula', 'hubble', 'cosmic', 'wallpaper'],
    faq: [
      { q: 'Why does my galaxy look like a video game?', a: 'You forgot the Hubble reference. "Hubble space telescope photograph" forces real-photo treatment.' },
      { q: 'Best for 4K wallpapers?', a: 'Use 16:9 or 21:9. Generate at high resolution; MJ v6.1 supports 2K+.' },
      { q: 'How to get vivid nebula colors?', a: 'Name the colors directly: "cyan and magenta" or "orange and blue". Vague "colorful" fails.' }
    ]
  },

  // ===== 45. MJ - Botanical Watercolor =====
  {
    id: 'seed-botanical-watercolor-mj',
    source: 'Civitai',
    sourceUrl: 'https://civitai.com/images/botanical-watercolor',
    imageUrl: 'https://image.civitai.com/xG1nkqbyTM5Gq8cqwU6wmG3skAcQ/width=1024/botanical-watercolor.webp',
    author: 'aigallery_demo',
    model: 'midjourney',
    originalPrompt: 'botanical watercolor painting, flowers, leaves, vintage',
    originalNegativePrompt: 'photo, 3d, digital',
    originalParams: '--ar 2:3 --v 6.1 --s 800',

    title: 'Botanical Watercolor Painting',
    slug: 'botanical-watercolor-painting',
    description: 'Hand-painted watercolor botanical illustration in vintage scientific style. Perfect for wedding stationery, herbal tea packaging, and Pinterest content.',

    rewrite_prompt: 'vintage botanical watercolor illustration of wild roses and eucalyptus, hand-painted in 19th century scientific illustration style, soft watercolor washes on aged paper, delicate pencil linework, muted earthy palette of sage green and dusty rose --ar 2:3 --v 6.1 --s 800',
    rewrite_negative: '--no photo, 3d, digital, harsh colors',

    params_explained: [
      { param: '--ar 2:3', why: 'Vertical for botanical print tradition. Matches vintage book plate format.' },
      { param: '--s 800', why: 'High stylize for painterly feel. Lower values get too photographic.' }
    ],

    tutorial: {
      intro: 'Botanical watercolor = 19th century reference + specific plants + muted palette + paper texture.',
      steps: [
        'Era + style: vintage botanical watercolor illustration, 19th century scientific illustration style — period + purpose.',
        'Subject: wild roses and eucalyptus — specific plants (not "flowers").',
        'Paint: soft watercolor washes on aged paper — paint medium + surface.',
        'Line: delicate pencil linework — the underdrawing matters for botanical.',
        'Color: muted earthy palette of sage green and dusty rose — three named muted colors.'
      ],
      tips: 'Botanical watercolor = "19th century" + "scientific" + named plant + muted palette. Skip any one and it goes generic.'
    },

    cross_model: {
      midjourney: 'Use rewrite prompt.',
      stable_diffusion: 'SDXL + Proteus\nPrompt: "botanical watercolor, vintage scientific illustration, wild roses"',
      flux: 'Flux handles this style well.',
      dall_e: 'DALL-E 3: "A vintage botanical watercolor illustration of wild roses and eucalyptus in 19th century scientific style".',
      jimeng_zh: '植物水彩画，19 世纪科学插画风格，野生玫瑰，桉树叶，褪色纸面。'
    },

    styles: ['illustration', 'watercolor', 'vintage'],
    useCases: ['illustration', 'blog-header', 'marketing'],
    difficulty: 3,
    tags: ['botanical', 'watercolor', 'vintage', 'flowers', 'illustration', 'wedding'],
    faq: [
      { q: 'Why does my botanical look modern?', a: 'You forgot the era. "19th century scientific illustration" forces period authenticity.' },
      { q: 'Best for wedding stationery?', a: '2:3 ratio + soft palette + named plants. Wedding planners love this aesthetic.' },
      { q: 'How to keep colors muted?', a: 'Use "muted earthy palette" + name 2-3 specific muted colors (sage, dusty rose, ochre).' }
    ]
  },

  // ===== 46. MJ - Brutalist Architecture =====
  {
    id: 'seed-brutalist-mj',
    source: 'Civitai',
    sourceUrl: 'https://civitai.com/images/brutalist-architecture',
    imageUrl: 'https://image.civitai.com/xG1nkqbyTM5Gq8cqwU6wmG3skAcQ/width=1024/brutalist.webp',
    author: 'aigallery_demo',
    model: 'midjourney',
    originalPrompt: 'brutalist architecture, concrete, geometric, dramatic',
    originalNegativePrompt: 'ornate, classic, decorative',
    originalParams: '--ar 9:16 --v 6.1 --s 600',

    title: 'Brutalist Concrete Architecture',
    slug: 'brutalist-concrete-architecture',
    description: 'Monolithic brutalist concrete architecture with dramatic light and shadow. Strong fit for architecture blog content, design magazines, and mood boards.',

    rewrite_prompt: 'massive brutalist concrete building photographed from ground looking up, raw board-formed concrete with dramatic shadow lines, single sharp cloud in blue sky, hard light midday sun creating deep shadow contrast, le corbusier unite d\'habitation style, architectural photography --ar 9:16 --v 6.1 --s 600',
    rewrite_negative: '--no ornate, classic, decorative, colorful',

    params_explained: [
      { param: '--ar 9:16', why: 'Vertical phone/Instagram ratio. Brutalist looks best from ground-up vertical view.' },
      { param: '--s 600', why: 'Mid stylize for architectural precision. Higher stylize distorts geometry.' }
    ],

    tutorial: {
      intro: 'Brutalist = raw concrete + dramatic shadow + named architect + ground-up perspective.',
      steps: [
        'Perspective: massive brutalist concrete building photographed from ground looking up — upward angle is non-negotiable.',
        'Material: raw board-formed concrete with dramatic shadow lines — "board-formed" gives the wood-grain concrete texture.',
        'Sky: single sharp cloud in blue sky — minimal sky for maximum contrast.',
        'Light: hard light midday sun creating deep shadow contrast — light direction creates the drama.',
        'Reference: le corbusier unite d\'habitation style — name the architect + building.'
      ],
      tips: 'Brutalist = "raw concrete" + "dramatic shadow" + named architect. The shadow lines ARE the visual story.'
    },

    cross_model: {
      midjourney: 'Use rewrite prompt.',
      stable_diffusion: 'SDXL + RealisticVision\nPrompt: "brutalist architecture, concrete, dramatic shadow, le corbusier"',
      flux: 'Flux handles architecture well.',
      dall_e: 'DALL-E 3: "A massive brutalist concrete building photographed from ground up, raw concrete texture, single cloud, hard light, in the style of Le Corbusier".',
      jimeng_zh: '粗野主义建筑，混凝土，戏剧阴影，勒柯布西耶，垂直仰拍。'
    },

    styles: ['realistic', 'minimalist'],
    useCases: ['blog-header', 'social-media', 'wallpaper'],
    difficulty: 3,
    tags: ['brutalist', 'architecture', 'concrete', 'geometric', 'minimalist'],
    faq: [
      { q: 'Why does my brutalist look like generic modern?', a: 'You forgot the shadow lines. "Board-formed concrete with dramatic shadow lines" forces the brutalist texture.' },
      { q: 'How to get the right mood?', a: 'Upward perspective + hard midday light + minimal sky. The drama comes from the angle, not the building.' },
      { q: 'Best for Instagram?', a: '9:16 vertical works perfectly for mobile feeds. Brutalist vertical is rare and eye-catching.' }
    ]
  },

  // ===== 47. MJ - 80s Retro Future =====
  {
    id: 'seed-80s-retro-mj',
    source: 'Civitai',
    sourceUrl: 'https://civitai.com/images/80s-retro-future',
    imageUrl: 'https://image.civitai.com/xG1nkqbyTM5Gq8cqwU6wmG3skAcQ/width=1024/80s-retro.webp',
    author: 'aigallery_demo',
    model: 'midjourney',
    originalPrompt: '80s retro future, chrome, neon, grid, vector',
    originalNegativePrompt: 'modern, photorealistic, organic',
    originalParams: '--ar 16:9 --v 6.1 --s 900',

    title: '80s Retro-Future Vector Aesthetic',
    slug: '80s-retro-future-vector',
    description: 'Pure 1980s retro-futurism with chrome, neon grids, and vector suns. Perfect for synthwave music covers, retro-tech branding, and Y2K aesthetic content.',

    rewrite_prompt: '1980s retro-future vector illustration, chrome geometric sports car driving through neon grid landscape, giant purple sun on horizon with horizontal lines, magenta and cyan color palette, vector flat illustration with chrome reflections, syd mead tron aesthetic --ar 16:9 --v 6.1 --s 900',
    rewrite_negative: '--no modern, photorealistic, organic, rounded',

    params_explained: [
      { param: '--s 900', why: 'Max stylize for full 80s aesthetic. Without it, MJ defaults to "clean" modern.' }
    ],

    tutorial: {
      intro: '80s retro-future = "chrome" + "neon grid" + "vector" + "horizontal-lined sun" + named 80s reference (Syd Mead/Tron).',
      steps: [
        'Era: 1980s retro-future vector illustration — year + style + medium.',
        'Subject: chrome geometric sports car driving through neon grid landscape — chrome vehicle + grid floor.',
        'Sun: giant purple sun on horizon with horizontal lines — the "lined sun" is the icon.',
        'Palette: magenta and cyan color palette — name two specific 80s colors.',
        'Reference: syd mead tron aesthetic — name the artist (Syd Mead designed Tron and Blade Runner).'
      ],
      tips: 'The "horizontal-lined sun" is the secret sauce. Without it, retro-future looks like generic synthwave.'
    },

    cross_model: {
      midjourney: 'Use rewrite prompt.',
      stable_diffusion: 'SDXL + Dreamshaper\nPrompt: "1980s retro-future, chrome car, neon grid, vector, syd mead"',
      flux: 'Flux is OK for this; Niji 6 also works.',
      dall_e: 'DALL-E 3: "A 1980s retro-future vector illustration of a chrome sports car on a neon grid with a giant purple lined sun, Syd Mead aesthetic".',
      jimeng_zh: '80 年代复古未来，铬合金跑车，霓虹网格，紫日横线，西德米德。'
    },

    styles: ['vintage', 'illustration', 'cyberpunk'],
    useCases: ['social-media', 'blog-header', 'marketing'],
    difficulty: 3,
    tags: ['80s', 'retro', 'synthwave', 'chrome', 'vector', 'syd-mead'],
    faq: [
      { q: 'Why does my retro look like vaporwave?', a: 'Vaporwave is 90s (post-internet). 80s retro-future = "chrome" + "vector" + "lined sun". Different decade, different cues.' },
      { q: 'How to get the chrome look?', a: 'Use "chrome reflections" + "geometric". Avoid "metallic" alone — that gets you generic silver.' },
      { q: 'Best for synthwave music covers?', a: '16:9 ratio + magenta/cyan + lined sun. Reads as "synthwave" instantly.' }
    ]
  },

  // ===== 48. MJ - Pet Portrait Photography =====
  {
    id: 'seed-pet-portrait-mj',
    source: 'Civitai',
    sourceUrl: 'https://civitai.com/images/pet-portrait',
    imageUrl: 'https://image.civitai.com/xG1nkqbyTM5Gq8cqwU6wmG3skAcQ/width=1024/pet-portrait.webp',
    author: 'aigallery_demo',
    model: 'midjourney',
    originalPrompt: 'golden retriever portrait, studio lighting, soft background',
    originalNegativePrompt: 'cartoon, illustration, multiple dogs',
    originalParams: '--ar 1:1 --v 6.1 --s 500',

    title: 'Pet Portrait Photography (Studio Style)',
    slug: 'pet-portrait-photography',
    description: 'Professional pet portrait photography style. Use for pet brand marketing, vet clinic decor, and animal shelter promotional content.',

    rewrite_prompt: 'professional pet portrait photograph of a golden retriever sitting in a studio, soft seamless grey background, gentle catchlight in the eyes, shallow depth of field focused on the eyes, warm studio lighting, canon RF 85mm f/1.2 --ar 1:1 --v 6.1 --s 500',
    rewrite_negative: '--no cartoon, illustration, multiple dogs, leash, person',

    params_explained: [
      { param: '--s 500', why: 'Mid stylize balances realism and warmth. Too low = stock photo; too high = illustrated.' }
    ],

    tutorial: {
      intro: 'Pet portraits work because of eye focus + catchlight + soft background. Generic "dog photo" gets you 1000 stock results.',
      steps: [
        'Subject: golden retriever sitting in a studio — specific breed + pose.',
        'Background: soft seamless grey background — studio backdrop = professional look.',
        'Eyes: gentle catchlight in the eyes — the sparkle in the eyes is the soul of the photo.',
        'Focus: shallow depth of field focused on the eyes — the eye must be tack sharp.',
        'Camera: canon RF 85mm f/1.2 — real lens = real photo feel.'
      ],
      tips: 'Catchlight = the white sparkle in the eye. Without it, even good photos look "dead".'
    },

    cross_model: {
      midjourney: 'Use rewrite prompt.',
      stable_diffusion: 'SDXL + RealisticVision\nPrompt: "golden retriever portrait, studio, canon 85mm"',
      flux: 'Flux handles animals well.',
      dall_e: 'DALL-E 3: "A professional studio portrait of a golden retriever with a soft grey background, catchlight in the eyes, canon 85mm f/1.2 look".',
      jimeng_zh: '金毛犬专业肖像，影棚灰底，眼神光，浅景深，佳能 85mm 镜头。'
    },

    styles: ['realistic', 'photorealistic'],
    useCases: ['marketing', 'blog-header', 'social-media'],
    difficulty: 2,
    tags: ['pet', 'dog', 'portrait', 'photography', 'studio', 'golden-retriever'],
    faq: [
      { q: 'Why does my dog look photoshopped?', a: 'You forgot the catchlight. "Catchlight in the eyes" is the single most important word for animal portraits.' },
      { q: 'Best lens for pet portraits?', a: '85mm f/1.2 or f/1.4. These are the classic portrait lens focal lengths.' },
      { q: 'How to make it look professional?', a: 'Soft seamless background + studio lighting + catchlight. These three = "I paid a photographer".' }
    ]
  },

  // ===== 49. MJ - Forest Spirit =====
  {
    id: 'seed-forest-spirit-mj',
    source: 'Civitai',
    sourceUrl: 'https://civitai.com/images/forest-spirit',
    imageUrl: 'https://image.civitai.com/xG1nkqbyTM5Gq8cqwU6wmG3skAcQ/width=1024/forest-spirit.webp',
    author: 'aigallery_demo',
    model: 'midjourney',
    originalPrompt: 'forest spirit, fantasy, mystical, soft light',
    originalNegativePrompt: 'modern, urban, dark horror',
    originalParams: '--ar 2:3 --niji 6 --s 850',

    title: 'Mystical Forest Spirit (Anime Fantasy)',
    slug: 'forest-spirit-anime-fantasy',
    description: 'Studio Ghibli-style mystical forest spirit character. Works for fantasy book covers, RPG character art, and ethereal social media content.',

    rewrite_prompt: 'mystical forest spirit girl with long flowing silver hair, wearing a dress made of moss and wildflowers, gentle glowing antlers made of birch branches, surrounded by floating fireflies in an enchanted forest, studio ghibli atmosphere, hayao miyazaki style, soft pastel palette --ar 2:3 --niji 6 --s 850',
    rewrite_negative: '--no modern, urban, dark horror, weapons',

    params_explained: [
      { param: '--niji 6', why: 'Niji 6 is MJ\'s anime model. Ghibli-style needs Niji.' },
      { param: '--s 850', why: 'High stylize for the soft painterly Ghibli feel.' }
    ],

    tutorial: {
      intro: 'Ghibli forest spirit = "moss dress" + "antlers made of branches" + "fireflies" + "Hayao Miyazaki". Skip any one and it goes generic fantasy.',
      steps: [
        'Subject: mystical forest spirit girl with long flowing silver hair — spirit + character details.',
        'Outfit: dress made of moss and wildflowers — nature-as-clothing is the Ghibli signature.',
        'Signature: gentle glowing antlers made of birch branches — antlers = forest spirit visual cue.',
        'Atmosphere: surrounded by floating fireflies in an enchanted forest — fireflies = magic.',
        'Reference: studio ghibli atmosphere, hayao miyazaki style — name the studio + director.'
      ],
      tips: 'Niji 6 + "hayao miyazaki" is the magic combo for Ghibli aesthetic. Without Niji, MJ defaults to realistic.'
    },

    cross_model: {
      midjourney: 'Use --niji 6 + --s 850.',
      stable_diffusion: 'SDXL + CounterfeitXL\nLoRA: "ghibli_style"\nPrompt: "forest spirit, ghibli style, antlers, fireflies"',
      flux: 'Flux is OK but Niji is better for this.',
      dall_e: 'DALL-E 3: "A mystical forest spirit girl with a moss dress, antlers made of branches, surrounded by fireflies, in Studio Ghibli style".',
      jimeng_zh: '森林精灵少女，苔藓花朵裙子，鹿角，萤火虫，吉卜力风。'
    },

    styles: ['anime', 'illustration', 'concept-art'],
    useCases: ['illustration', 'blog-header', 'social-media'],
    difficulty: 3,
    tags: ['forest', 'spirit', 'fantasy', 'ghibli', 'anime', 'mystical'],
    faq: [
      { q: 'Why does my spirit look like a generic elf?', a: 'You forgot "antlers made of branches" + "moss dress". These transform an elf into a forest spirit.' },
      { q: 'How to get true Ghibli feel?', a: 'Use --niji 6 + name "hayao miyazaki" + specify "soft pastel palette". Without Niji, you get photorealistic.' },
      { q: 'Best for fantasy book covers?', a: '2:3 vertical ratio + character + atmospheric background. Vertical sells the "cover art" feel.' }
    ]
  },

  // ===== 50. MJ - Storm Chasing =====
  {
    id: 'seed-storm-chasing-mj',
    source: 'Civitai',
    sourceUrl: 'https://civitai.com/images/storm-chasing',
    imageUrl: 'https://image.civitai.com/xG1nkqbyTM5Gq8cqwU6wmG3skAcQ/width=1024/storm-chasing.webp',
    author: 'aigallery_demo',
    model: 'midjourney',
    originalPrompt: 'storm chasing, supercell, lightning, dramatic',
    originalNegativePrompt: 'sunny, calm, indoor',
    originalParams: '--ar 16:9 --v 6.1 --s 600',

    title: 'Storm Chasing: Supercell Photography',
    slug: 'storm-chasing-supercell',
    description: 'Dramatic supercell storm photography with lightning. Perfect for weather blog content, YouTube thumbnail, and storm chaser social media.',

    rewrite_prompt: 'massive supercell thunderstorm with dramatic rotating mesocyclone structure, multiple lightning bolts striking flat plains, golden hour light illuminating the storm base, lone farm house in foreground for scale, extreme weather photography by peony lim --ar 16:9 --v 6.1 --s 600',
    rewrite_negative: '--no sunny, calm, indoor, cartoon',

    params_explained: [
      { param: '--s 600', why: 'Mid stylize for dramatic-but-believable. Higher stylize makes storms look painted.' }
    ],

    tutorial: {
      intro: 'Storm photography needs scale + named photographer + specific storm structure. "Supercell" + "mesocyclone" = real weather knowledge.',
      steps: [
        'Storm structure: massive supercell thunderstorm with dramatic rotating mesocyclone structure — meteorology terms.',
        'Lightning: multiple lightning bolts striking flat plains — plural lightning = drama.',
        'Light: golden hour light illuminating the storm base — golden hour contrast with dark storm.',
        'Scale: lone farm house in foreground for scale — small human element = massive storm.',
        'Reference: extreme weather photography by peony lim — name a real storm photographer.'
      ],
      tips: 'Storm chaser photos = scale contrast + named photographer + "supercell" terminology. Generic "thunderstorm" gets you a cartoon cloud.'
    },

    cross_model: {
      midjourney: 'Use rewrite prompt.',
      stable_diffusion: 'SDXL + JuggernautXL\nPrompt: "supercell storm, mesocyclone, lightning, golden hour"',
      flux: 'Flux handles weather very well.',
      dall_e: 'DALL-E 3: "A massive supercell thunderstorm with lightning, lone farm house in foreground, golden hour light, in the style of storm photographer Peony Lim".',
      jimeng_zh: '超级单体雷暴，中气旋，闪电，金色光晕，孤独农舍，风暴摄影。'
    },

    styles: ['realistic', 'photorealistic'],
    useCases: ['blog-header', 'social-media', 'marketing'],
    difficulty: 3,
    tags: ['storm', 'supercell', 'lightning', 'weather', 'photography', 'extreme'],
    faq: [
      { q: 'Why does my storm look like a video game?', a: 'You forgot "supercell" + "mesocyclone". These meteorology terms trigger realistic storm rendering.' },
      { q: 'How to get real lightning?', a: 'Add "lightning bolts striking" + "branching lightning" + "exposure 1 second". MJ v6.1 handles these.' },
      { q: 'Best for YouTube thumbnails?', a: '16:9 with high contrast (dark storm + bright lightning) reads at thumbnail size.' }
    ]
  },

  // ===== 51. SDXL - Anime School Girl =====
  {
    id: 'seed-anime-schoolgirl-sdxl',
    source: 'Civitai',
    sourceUrl: 'https://civitai.com/images/anime-schoolgirl',
    imageUrl: 'https://image.civitai.com/xG1nkqbyTM5Gq8cqwU6wmG3skAcQ/width=1024/anime-schoolgirl.webp',
    author: 'aigallery_demo',
    model: 'stable-diffusion',
    originalPrompt: 'anime school girl, cherry blossoms, spring, jp style',
    originalNegativePrompt: 'real photo, 3d, western',
    originalParams: 'SDXL + AnythingV5, CFG 7, Steps 30',

    title: 'Anime School Girl in Spring (SDXL AnythingV5)',
    slug: 'anime-schoolgirl-spring-sdxl',
    description: 'Classic anime school girl portrait in cherry blossom season with SDXL + AnythingV5. Detailed LoRA + sampler settings included.',

    rewrite_prompt: 'masterpiece, best quality, anime school girl with long black hair and red ribbon, sailor uniform with pleated skirt, holding textbooks, standing under cherry blossom trees in full bloom, falling petals, soft spring sunlight, gentle smile, beautiful detailed eyes --ar 2:3',
    rewrite_negative: 'lowres, bad anatomy, bad hands, extra fingers, missing fingers, blurry, worst quality, low quality, 3d, realistic',

    params_explained: [
      { param: 'Model: AnythingV5', why: 'AnythingV5 is the gold standard for anime SDXL. Strong character work, stable colors.' },
      { param: 'CFG 7, Steps 30', why: 'CFG 7 is the sweet spot for Anything. CFG 5 = flat, CFG 10+ = artifacts. 30 steps is plenty.' },
      { param: 'Sampler: DPM++ 2M Karras', why: 'DPM++ 2M Karras gives clean anime lines. Avoid Euler a for character consistency.' }
    ],

    tutorial: {
      intro: 'Anime SDXL needs three things: right checkpoint (AnythingV5), right negative, and the magic "masterpiece, best quality" trigger.',
      steps: [
        'Checkpoint: SDXL + AnythingV5 (or AOM3, CounterfeitXL). AnythingV5 is the safe default.',
        'Trigger: start with "masterpiece, best quality," — AnythingV5 was trained on these as quality triggers.',
        'Subject: anime school girl with long black hair and red ribbon — specific details (ribbon color!).',
        'Outfit: sailor uniform with pleated skirt — sailor uniform is the anime school staple.',
        'Atmosphere: standing under cherry blossom trees in full bloom, falling petals, soft spring sunlight — cherry blossom season = spring anime.',
        'Negative: lowres, bad anatomy, bad hands, extra fingers, missing fingers, blurry — SDXL has hand problems; negative is essential.'
      ],
      tips: '"masterpiece, best quality" is the trigger phrase for AnythingV5. Don\'t skip it. For hands, always use "beautiful detailed hands" as a positive cue.'
    },

    cross_model: {
      midjourney: 'MJ Niji 6: "anime school girl, cherry blossoms, red ribbon, sailor uniform --ar 2:3 --niji 6 --s 700".',
      stable_diffusion: 'SDXL + AnythingV5, CFG 7, Steps 30, Sampler DPM++ 2M Karras.',
      flux: 'Flux handles anime but leans less "anime-style". Better for semi-realistic anime.',
      dall_e: 'DALL-E 3: "An anime-style illustration of a school girl with black hair and red ribbon under cherry blossom trees".',
      jimeng_zh: '动漫校园少女，黑色长发，红色蝴蝶结，水手服，樱花季，即梦二次元风。'
    },

    styles: ['anime', 'illustration'],
    useCases: ['avatar', 'social-media', 'illustration'],
    difficulty: 3,
    tags: ['anime', 'school-girl', 'sd-xl', 'anythingv5', 'cherry-blossom', 'sakura'],
    faq: [
      { q: 'Why does my anime girl have 6 fingers?', a: 'SDXL hand issues. Add "beautiful detailed hands, perfect fingers" to positive prompt AND "extra fingers, missing fingers" to negative.' },
      { q: 'Best SDXL checkpoint for anime?', a: 'AnythingV5 is the safe choice. For variety, try CounterfeitXL or AOM3.' },
      { q: 'How to get consistent character?', a: 'Use the same seed + same checkpoint + same CFG. Or train a LoRA on a specific character.' }
    ]
  },

  // ===== 52. SDXL - Oil Painting Master =====
  {
    id: 'seed-oil-painting-sdxl',
    source: 'Civitai',
    sourceUrl: 'https://civitai.com/images/oil-painting-master',
    imageUrl: 'https://image.civitai.com/xG1nkqbyTM5Gq8cqwU6wmG3skAcQ/width=1024/oil-painting.webp',
    author: 'aigallery_demo',
    model: 'stable-diffusion',
    originalPrompt: 'oil painting portrait, classical, renaissance',
    originalNegativePrompt: 'photo, 3d, anime, modern',
    originalParams: 'SDXL + epiCRealism, CFG 6, Steps 35',

    title: 'Classical Oil Painting Portrait (SDXL)',
    slug: 'oil-painting-portrait-sdxl',
    description: 'Renaissance-style oil painting portrait with SDXL. Detailed brushwork and chiaroscuro lighting. Use for art history content and classical aesthetics.',

    rewrite_prompt: 'masterpiece oil painting portrait of a noblewoman in renaissance attire, soft chiaroscuro lighting, visible brushstrokes and impasto texture, rich dark palette with deep reds and gold leaf, single candle light source from the left, rembrandt inspired, painted on aged canvas --ar 2:3',
    rewrite_negative: 'photo, 3d, anime, modern, clean lines, smooth surface',

    params_explained: [
      { param: 'Model: epiCRealism', why: 'epiCRealism handles classical painting style well. JuggernautXL also works.' },
      { param: 'CFG 6, Steps 35', why: 'Lower CFG (6) lets SDXL breathe with painterly styles. Higher CFG loses the brushwork.' }
    ],

    tutorial: {
      intro: 'Classical oil painting needs named artist + lighting term + texture cues. "Chiaroscuro" + "impasto" = art history knowledge.',
      steps: [
        'Trigger: masterpiece oil painting portrait — "masterpiece" is the SDXL quality anchor.',
        'Subject: noblewoman in renaissance attire — specific era + class.',
        'Light: soft chiaroscuro lighting, single candle light source from the left — chiaroscuro = strong light/dark contrast.',
        'Texture: visible brushstrokes and impasto texture — "impasto" forces thick paint.',
        'Palette: rich dark palette with deep reds and gold leaf — period color cues.',
        'Reference: rembrandt inspired, painted on aged canvas — named artist + surface.'
      ],
      tips: 'Chiaroscuro = strong light/dark contrast (Italian for "light-dark"). Without it, classical paintings look flat.'
    },

    cross_model: {
      midjourney: 'MJ v6.1: "renaissance oil painting portrait, chiaroscuro, rembrandt --ar 2:3 --v 6.1 --s 800".',
      stable_diffusion: 'SDXL + epiCRealism, CFG 6, Steps 35, Sampler DPM++ 2M Karras.',
      flux: 'Flux handles classical style very well. Same prompt.',
      dall_e: 'DALL-E 3: "A renaissance oil painting portrait of a noblewoman with chiaroscuro lighting, in the style of Rembrandt".',
      jimeng_zh: '文艺复兴油画肖像，贵族女性，明暗对比，金箔装饰，伦勃朗风格。'
    },

    styles: ['oil-painting', 'vintage'],
    useCases: ['illustration', 'blog-header', 'marketing'],
    difficulty: 4,
    tags: ['oil-painting', 'renaissance', 'classical', 'chiaroscuro', 'rembrandt', 'sd-xl'],
    faq: [
      { q: 'Why does my painting look digital?', a: 'You forgot "impasto" + "visible brushstrokes" + "painted on aged canvas". These force the painterly texture.' },
      { q: 'How to get chiaroscuro?', a: 'Name it explicitly: "chiaroscuro lighting" or "single light source from the left".' },
      { q: 'Best for art history content?', a: 'SDXL + epiCRealism + Renaissance references. Renders at 1024x1536 for high quality.' }
    ]
  },

  // ===== 53. SDXL - Cyber Mech =====
  {
    id: 'seed-cyber-mech-sdxl',
    source: 'Civitai',
    sourceUrl: 'https://civitai.com/images/cyber-mech',
    imageUrl: 'https://image.civitai.com/xG1nkqbyTM5Gq8cqwU6wmG3skAcQ/width=1024/cyber-mech.webp',
    author: 'aigallery_demo',
    model: 'stable-diffusion',
    originalPrompt: 'cyber mech robot, futuristic, sci-fi, detailed',
    originalNegativePrompt: 'cartoon, organic, simple',
    originalParams: 'SDXL + JuggernautXL, CFG 7, Steps 35',

    title: 'Cyber Mech Character Design (SDXL)',
    slug: 'cyber-mech-character-sdxl',
    description: 'Hard-surface cyber mech robot character design. Detailed mechanical breakdown, render style, and LoRA recommendations included.',

    rewrite_prompt: 'masterpiece cyber mech robot character design, full body standing pose, intricate mechanical detail with visible pistons and cables, matte gunmetal and orange accent paint scheme, blueprint overlay in corner, concept art, hard surface render, houdini and keyshot --ar 2:3',
    rewrite_negative: 'lowres, blurry, organic, soft, cartoon, simple, deformed',

    params_explained: [
      { param: 'Model: JuggernautXL', why: 'JuggernautXL handles hard surface + mechanical detail better than AnythingV5.' },
      { param: 'CFG 7, Steps 35', why: 'Standard 7/35 for mechanical detail. Higher CFG (8-9) sharpens the metal.' },
      { param: 'Sampler: DPM++ 2M Karras', why: 'DPM++ 2M Karras handles clean mechanical edges well.' }
    ],

    tutorial: {
      intro: 'Mech design needs "hard surface" + named software + paint scheme. Generic "robot" gets you 1000 stock robots.',
      steps: [
        'Trigger: masterpiece cyber mech robot character design — "masterpiece" anchors quality.',
        'Pose: full body standing pose, blueprint overlay in corner — design sheet style.',
        'Detail: intricate mechanical detail with visible pistons and cables — mechanical breakdown cues.',
        'Paint: matte gunmetal and orange accent paint scheme — two named colors + finish.',
        'Render: hard surface render, houdini and keyshot — name real 3D software (Houdini + KeyShot).'
      ],
      tips: 'Naming real software (Houdini, KeyShot, Blender) makes SDXL render "real 3D artist" look, not "AI".'
    },

    cross_model: {
      midjourney: 'MJ v6.1: "mech robot character design, hard surface, blueprint, houdini style --ar 2:3 --v 6.1 --s 700".',
      stable_diffusion: 'SDXL + JuggernautXL, CFG 7, Steps 35, Sampler DPM++ 2M Karras.',
      flux: 'Flux handles mechanical design well. Same prompt.',
      dall_e: 'DALL-E 3: "A cyber mech robot character design with hard surface render and blueprint overlay".',
      jimeng_zh: '赛博机甲角色设计，硬表面渲染，蓝图叠加，机械细节，3D 概念图。'
    },

    styles: ['concept-art', 'realistic', '3d'],
    useCases: ['illustration', 'blog-header', 'marketing'],
    difficulty: 4,
    tags: ['mech', 'robot', 'cyber', 'character-design', 'sci-fi', 'sd-xl'],
    faq: [
      { q: 'Why does my mech look like a transformer?', a: 'You forgot "hard surface" + "blueprint". Transformers are "soft surface toys"; mechs are technical designs.' },
      { q: 'How to get the paint job right?', a: 'Name two specific colors + finish: "matte gunmetal and orange accent".' },
      { q: 'Best for concept art portfolio?', a: '2:3 + "blueprint overlay in corner" = the "design sheet" format that concept art directors expect.' }
    ]
  },

  // ===== 54. SDXL - Vintage Comic Book =====
  {
    id: 'seed-vintage-comic-sdxl',
    source: 'Civitai',
    sourceUrl: 'https://civitai.com/images/vintage-comic',
    imageUrl: 'https://image.civitai.com/xG1nkqbyTM5Gq8cqwU6wmG3skAcQ/width=1024/vintage-comic.webp',
    author: 'aigallery_demo',
    model: 'stable-diffusion',
    originalPrompt: 'vintage comic book panel, superhero, 1960s marvel',
    originalNegativePrompt: 'modern comic, manga, photo',
    originalParams: 'SDXL + Dreamshaper, CFG 7, Steps 30',

    title: 'Vintage Comic Book Panel (SDXL)',
    slug: 'vintage-comic-book-panel-sdxl',
    description: 'Silver Age comic book panel with halftone dots, hand-lettered fonts, and dynamic action poses.',

    rewrite_prompt: 'vintage 1963 marvel comic book panel, dynamic action shot of superhero leaping between buildings, bold black ink outlines, ben day dots and halftone shading, primary color palette of red yellow and blue, hand-lettered SFX like BAM and POW, jack kirby art style --ar 3:4',
    rewrite_negative: 'photo, 3d, modern, manga, anime, photorealistic',

    params_explained: [
      { param: 'Model: Dreamshaper', why: 'Dreamshaper handles comic/painterly styles better than Juggernaut.' },
      { param: 'Sampler: DPM++ SDE', why: 'SDE samplers add organic variation suited to comic art.' }
    ],

    tutorial: {
      intro: 'Vintage comic = "halftone" + "ben day dots" + "hand-lettered" + named artist. Without these, MJ/SDXL make modern comic.',
      steps: [
        'Year + publisher: vintage 1963 marvel comic book panel — year + publisher = period.',
        'Action: dynamic action shot of superhero leaping between buildings — verb + action.',
        'Ink: bold black ink outlines — comic linework.',
        'Color: ben day dots and halftone shading, primary color palette of red yellow and blue — printing technique + period palette.',
        'Text: hand-lettered SFX like BAM and POW — sound effect letters are part of the look.',
        'Reference: jack kirby art style — name the artist (co-creator of most Marvel heroes).'
      ],
      tips: '"Ben day dots" is the secret. Without it, vintage comic looks like modern vector art.'
    },

    cross_model: {
      midjourney: 'MJ Niji 6: "vintage 1963 comic panel, halftone, jack kirby --ar 3:4 --niji 6 --s 850".',
      stable_diffusion: 'SDXL + Dreamshaper, CFG 7, Steps 30, Sampler DPM++ SDE Karras.',
      flux: 'Flux is OK; MJ Niji tends to be better for comic style.',
      dall_e: 'DALL-E 3: "A vintage 1963 Marvel comic book panel of a superhero leaping, with halftone dots and bold ink lines, in Jack Kirby style".',
      jimeng_zh: '复古 1963 漫威漫画，半色调点，复古印染，红黄蓝三色，杰克·科比风格。'
    },

    styles: ['illustration', 'vintage', 'concept-art'],
    useCases: ['illustration', 'blog-header', 'social-media'],
    difficulty: 3,
    tags: ['comic', 'vintage', 'marvel', '1960s', 'jack-kirby', 'halftone'],
    faq: [
      { q: 'Why does my comic look like manga?', a: 'You forgot "jack kirby" or "silver age marvel". Without period reference, models default to Japanese comic style.' },
      { q: 'How to get the halftone texture?', a: 'Add "ben day dots and halftone shading". These printing terms trigger the period texture.' },
      { q: 'Best for fan art content?', a: '3:4 ratio matches single comic panel. Use multiple panels in a grid for full page.' }
    ]
  },

  // ===== 55. SDXL - Hyper Realistic Food =====
  {
    id: 'seed-hyper-food-sdxl',
    source: 'Civitai',
    sourceUrl: 'https://civitai.com/images/hyper-food',
    imageUrl: 'https://image.civitai.com/xG1nkqbyTM5Gq8cqwU6wmG3skAcQ/width=1024/hyper-food.webp',
    author: 'aigallery_demo',
    model: 'stable-diffusion',
    originalPrompt: 'hyper realistic food photography, sushi, restaurant',
    originalNegativePrompt: 'cartoon, 3d, drawing',
    originalParams: 'SDXL + JuggernautXL, CFG 6, Steps 30',

    title: 'Hyper Realistic Food Photography (SDXL)',
    slug: 'hyper-realistic-food-sdxl',
    description: 'Restaurant-quality food photography for menus, cookbooks, and food blog hero images. Detailed lighting and styling cues.',

    rewrite_prompt: 'hyper realistic food photography, omakase sushi set on handmade ceramic plate, glistening fresh salmon and tuna, wasabi and pickled ginger, soft directional window light from the left, shallow depth of field, visible rice texture, dark wood background, food styling by prop stylist --ar 4:5',
    rewrite_negative: 'cartoon, 3d, drawing, blurry, plastic food',

    params_explained: [
      { param: 'CFG 6', why: 'Lower CFG (6) for natural food photography. Higher CFG looks overcooked.' }
    ],

    tutorial: {
      intro: 'Hyper realistic food = named dish + named plate + specific lighting + "food styling" reference.',
      steps: [
        'Trigger: hyper realistic food photography — quality anchor.',
        'Dish: omakase sushi set on handmade ceramic plate — specific dish + specific plate material.',
        'Detail: glistening fresh salmon and tuna, wasabi and pickled ginger — detail cues that sell freshness.',
        'Lighting: soft directional window light from the left, shallow depth of field — direction + DOF.',
        'Styling: dark wood background, food styling by prop stylist — background + named profession.'
      ],
      tips: 'Food photography is about freshness cues: "glistening", "fresh", "visible rice texture". Without these, food looks like rubber.'
    },

    cross_model: {
      midjourney: 'MJ v6.1: "hyper realistic sushi, ceramic plate, food photography --ar 4:5 --v 6.1 --s 500 --style raw".',
      stable_diffusion: 'SDXL + JuggernautXL, CFG 6, Steps 30, Sampler DPM++ 2M Karras.',
      flux: 'Flux handles food very well. Same prompt.',
      dall_e: 'DALL-E 3: "Hyper realistic food photography of an omakase sushi set on a ceramic plate, soft window light".',
      jimeng_zh: '超写实美食摄影，寿司，陶瓷盘，自然光，浅景深，餐厅菜单级。'
    },

    styles: ['realistic', 'photorealistic'],
    useCases: ['marketing', 'blog-header', 'social-media'],
    difficulty: 2,
    tags: ['food', 'photography', 'sushi', 'restaurant', 'hyper-realistic', 'sd-xl'],
    faq: [
      { q: 'Why does my food look plastic?', a: 'You forgot "glistening" + "fresh" + specific ingredients. These cues trigger realistic food rendering.' },
      { q: 'Best aspect ratio for menu?', a: '4:5 is Instagram standard. 1:1 for thumbnails. 16:9 for blog hero.' },
      { q: 'How to make it look like a real restaurant?', a: 'Add "ceramic plate" + "dark wood background" + "food styling". These three = professional kitchen.' }
    ]
  },

  // ===== 56. SDXL - T-Shirt Design =====
  {
    id: 'seed-tshirt-design-sdxl',
    source: 'Civitai',
    sourceUrl: 'https://civitai.com/images/tshirt-design',
    imageUrl: 'https://image.civitai.com/xG1nkqbyTM5Gq8cqwU6wmG3skAcQ/width=1024/tshirt-design.webp',
    author: 'aigallery_demo',
    model: 'stable-diffusion',
    originalPrompt: 't-shirt design, graphic, vector, typography',
    originalNegativePrompt: 'photo, model wearing shirt, wrinkles',
    originalParams: 'SDXL + Proteus, CFG 7, Steps 25',

    title: 'Vector T-Shirt Graphic Design (SDXL)',
    slug: 'vector-tshirt-graphic-sdxl',
    description: 'Print-ready vector-style t-shirt graphic. Works for merch stores, Etsy shops, and print-on-demand businesses.',

    rewrite_prompt: 'vector t-shirt graphic design, cute kawaii cat holding coffee cup, flat colors with thick black outlines, limited 4-color palette of black white mint and coral, isolated on white background, no model, print ready 300 dpi --ar 1:1',
    rewrite_negative: 'photo, model wearing shirt, wrinkles, background, photo realistic',

    params_explained: [
      { param: 'Model: Proteus', why: 'Proteus handles vector and graphic design better than Juggernaut.' },
      { param: 'Steps 25', why: 'Fewer steps for cleaner vector look. 25 is enough for flat design.' }
    ],

    tutorial: {
      intro: 'T-shirt design = "vector" + "flat colors" + "thick outlines" + "no model" + specific palette size. Print-on-demand rules.',
      steps: [
        'Format: vector t-shirt graphic design, isolated on white background — design sheet format.',
        'Subject: cute kawaii cat holding coffee cup — specific subject for print.',
        'Style: flat colors with thick black outlines — vector design code.',
        'Palette: limited 4-color palette of black white mint and coral — name 4 colors max (screen printing limit).',
        'Print: print ready 300 dpi, no model — print-on-demand specs.'
      ],
      tips: 'Limited palette (4 colors max) is the screen printing rule. SDXL renders best with named color counts.'
    },

    cross_model: {
      midjourney: 'MJ v6.1: "vector t-shirt design, kawaii cat coffee, flat colors --ar 1:1 --v 6.1 --s 500".',
      stable_diffusion: 'SDXL + Proteus, CFG 7, Steps 25.',
      flux: 'Flux handles vector design well. Same prompt.',
      dall_e: 'DALL-E 3: "A vector t-shirt design of a kawaii cat holding a coffee cup, flat colors, thick outlines, limited palette".',
      jimeng_zh: 'T恤图案设计，卡通猫咖啡，扁平矢量，粗黑描边，4 色限制。'
    },

    styles: ['illustration', 'minimalist'],
    useCases: ['logo', 'marketing', 'social-media'],
    difficulty: 2,
    tags: ['tshirt', 'design', 'vector', 'kawaii', 'print', 'sd-xl'],
    faq: [
      { q: 'Why does my design include a model?', a: 'You forgot "no model" in negative prompt. SDXL often adds a "context" photo.' },
      { q: 'How many colors for screen printing?', a: '4-6 colors max for cost-effective screen printing. Each color = separate screen.' },
      { q: 'Best aspect for t-shirt design?', a: '1:1 for chest pocket or full back. Use vector format for scaling.' }
    ]
  },

  // ===== 57. SDXL - Stained Glass Window =====
  {
    id: 'seed-stained-glass-sdxl',
    source: 'Civitai',
    sourceUrl: 'https://civitai.com/images/stained-glass',
    imageUrl: 'https://image.civitai.com/xG1nkqbyTM5Gq8cqwU6wmG3skAcQ/width=1024/stained-glass.webp',
    author: 'aigallery_demo',
    model: 'stable-diffusion',
    originalPrompt: 'stained glass window, religious, gothic, colorful',
    originalNegativePrompt: 'photo, 3d, modern',
    originalParams: 'SDXL + Dreamshaper, CFG 7, Steps 30',

    title: 'Gothic Stained Glass Window (SDXL)',
    slug: 'gothic-stained-glass-sdxl',
    description: 'Medieval-style stained glass window imagery. Strong fit for church content, history blogs, and fantasy game UI.',

    rewrite_prompt: 'gothic stained glass window depicting a rose flower mandala, intricate black leading between colored glass, jewel-tone palette of ruby sapphire and emerald, backlit by golden hour light, detailed floral patterns, chartres cathedral inspired --ar 9:16',
    rewrite_negative: 'photo, 3d, modern, plain, simple',

    params_explained: [
      { param: 'Model: Dreamshaper', why: 'Dreamshaper\'s painterly handling suits stained glass art.' }
    ],

    tutorial: {
      intro: 'Stained glass = "leading" + "jewel tones" + "backlit" + named cathedral. The "leading" (the black lines) is what makes it glass.',
      steps: [
        'Subject: gothic stained glass window depicting a rose flower mandala — specific design.',
        'Material: intricate black leading between colored glass — leading = the metal strips between glass pieces.',
        'Color: jewel-tone palette of ruby sapphire and emerald — three named gem colors.',
        'Light: backlit by golden hour light — backlighting is what makes stained glass glow.',
        'Reference: chartres cathedral inspired — name the most famous stained glass cathedral.'
      ],
      tips: '"Black leading" is non-negotiable. Without it, you get colored glass, not stained glass.'
    },

    cross_model: {
      midjourney: 'MJ v6.1: "gothic stained glass window, rose mandala, backlit --ar 9:16 --v 6.1 --s 800".',
      stable_diffusion: 'SDXL + Dreamshaper, CFG 7, Steps 30, Sampler DPM++ 2M Karras.',
      flux: 'Flux handles this style well.',
      dall_e: 'DALL-E 3: "A gothic stained glass window depicting a rose flower mandala, backlit by golden light, Chartres cathedral inspired".',
      jimeng_zh: '哥特式彩色玻璃窗，玫瑰曼陀罗，宝石色调，背光渲染，沙特尔大教堂。'
    },

    styles: ['illustration', 'vintage', 'concept-art'],
    useCases: ['illustration', 'blog-header', 'wallpaper'],
    difficulty: 3,
    tags: ['stained-glass', 'gothic', 'church', 'medieval', 'chartres', 'sd-xl'],
    faq: [
      { q: 'Why does my glass look like a normal painting?', a: 'You forgot "black leading" + "backlit". The leading lines + backlight glow are the defining features.' },
      { q: 'Best for church/medieval content?', a: '9:16 vertical + chartres reference + jewel tones. Reads as "cathedral" instantly.' },
      { q: 'How to get the "glow" effect?', a: 'Always add "backlit" or "light passing through". Without backlighting, stained glass looks flat.' }
    ]
  },

  // ===== 58. SDXL - VHS Aesthetic =====
  {
    id: 'seed-vhs-aesthetic-sdxl',
    source: 'Civitai',
    sourceUrl: 'https://civitai.com/images/vhs-aesthetic',
    imageUrl: 'https://image.civitai.com/xG1nkqbyTM5Gq8cqwU6wmG3skAcQ/width=1024/vhs-aesthetic.webp',
    author: 'aigallery_demo',
    model: 'stable-diffusion',
    originalPrompt: 'VHS aesthetic, retro 80s, scanlines, glitch',
    originalNegativePrompt: 'modern, digital clean, hd',
    originalParams: 'SDXL + Dreamshaper, CFG 7, Steps 30',

    title: 'VHS Aesthetic Photo (SDXL)',
    slug: 'vhs-aesthetic-photo-sdxl',
    description: '1980s VHS home video aesthetic with scanlines, tracking errors, and color bleed. Perfect for nostalgic YouTube content and Y2K branding.',

    rewrite_prompt: 'vhs home video photograph from 1986, family backyard birthday party, visible scanlines, tracking errors and color bleed, slightly overexposed with red and cyan chromatic aberration, timecode burned in top right, kodak super 8 film grain --ar 4:3',
    rewrite_negative: 'modern, digital, hd, clean, sharp',

    params_explained: [
      { param: 'Model: Dreamshaper', why: 'Dreamshaper handles analog film aesthetics well.' }
    ],

    tutorial: {
      intro: 'VHS aesthetic = "scanlines" + "tracking errors" + "color bleed" + "chromatic aberration" + "timecode". Five imperfections = VHS.',
      steps: [
        'Format: vhs home video photograph from 1986, timecode burned in top right — format + era + timecode.',
        'Subject: family backyard birthday party — specific "home video" scenario.',
        'Imperfections: visible scanlines, tracking errors and color bleed — the VHS signature imperfections.',
        'Color: slightly overexposed with red and cyan chromatic aberration — period color + aberration.',
        'Film: kodak super 8 film grain — film stock reference.'
      ],
      tips: 'VHS needs imperfection. "Clean VHS" = modern digital. Always add tracking error + scanlines.'
    },

    cross_model: {
      midjourney: 'MJ v6.1: "VHS home video 1986, scanlines, tracking errors, family birthday --ar 4:3 --v 6.1 --s 700".',
      stable_diffusion: 'SDXL + Dreamshaper, CFG 7, Steps 30.',
      flux: 'Flux handles this but leans "clean". Add more imperfection cues.',
      dall_e: 'DALL-E 3: "A 1986 VHS home video of a family backyard birthday party with scanlines, tracking errors, and timecode".',
      jimeng_zh: 'VHS 录像带美学，1986 年家庭录像，扫描线，追踪错误，色差，即梦胶片。'
    },

    styles: ['vintage', 'realistic'],
    useCases: ['social-media', 'blog-header', 'marketing'],
    difficulty: 3,
    tags: ['vhs', '80s', 'retro', 'home-video', 'analog', 'sd-xl'],
    faq: [
      { q: 'Why does my VHS look too clean?', a: 'You forgot the imperfections: "scanlines, tracking errors, chromatic aberration, color bleed".' },
      { q: 'Best aspect ratio?', a: '4:3 matches 80s TV. 16:9 = modern. The 4:3 is itself a VHS signature.' },
      { q: 'How to get the timecode?', a: 'Add "timecode burned in top right" or "VCR overlay". MJ and SDXL both understand.' }
    ]
  },

  // ===== 59. SDXL - Toy Figurine =====
  {
    id: 'seed-toy-figurine-sdxl',
    source: 'Civitai',
    sourceUrl: 'https://civitai.com/images/toy-figurine',
    imageUrl: 'https://image.civitai.com/xG1nkqbyTM5Gq8cqwU6wmG3skAcQ/width=1024/toy-figurine.webp',
    author: 'aigallery_demo',
    model: 'stable-diffusion',
    originalPrompt: 'toy figurine, miniature, 3d print, chibi',
    originalNegativePrompt: 'real photo, life-size, realistic',
    originalParams: 'SDXL + Proteus, CFG 7, Steps 30',

    title: 'Cute Toy Figurine (SDXL)',
    slug: 'cute-toy-figurine-sdxl',
    description: 'Blind-box toy figurine aesthetic, popular for designer toy marketing, Funko-style product shots, and social media content.',

    rewrite_prompt: 'cute designer toy figurine of a cat astronaut, glossy vinyl material with matte finish on helmet, tiny detailed oxygen tank on back, standing on a small rotating display base, pop mart style, isolated on white background, product photography --ar 1:1',
    rewrite_negative: 'real photo, life-size, realistic, human',

    params_explained: [
      { param: 'Model: Proteus', why: 'Proteus handles 3D product style well.' }
    ],

    tutorial: {
      intro: 'Designer toy = "vinyl material" + "glossy + matte" + "display base" + named brand. Pop Mart / Funko is the reference.',
      steps: [
        'Subject: cute designer toy figurine of a cat astronaut — designer toy + specific character.',
        'Material: glossy vinyl material with matte finish on helmet — vinyl + dual finish (the toy code).',
        'Detail: tiny detailed oxygen tank on back — small detail = premium toy.',
        'Display: standing on a small rotating display base — base = collectible packaging.',
        'Reference: pop mart style, isolated on white background, product photography — name the brand + format.'
      ],
      tips: '"Pop Mart style" or "Funko Pop" instantly triggers the designer toy aesthetic. The "rotating display base" is the collector\'s tell.'
    },

    cross_model: {
      midjourney: 'MJ v6.1: "designer toy figurine, cat astronaut, pop mart style --ar 1:1 --v 6.1 --s 600".',
      stable_diffusion: 'SDXL + Proteus, CFG 7, Steps 30.',
      flux: 'Flux handles 3D product well.',
      dall_e: 'DALL-E 3: "A cute designer toy figurine of a cat astronaut in Pop Mart style, vinyl material, on a white background".',
      jimeng_zh: '盲盒潮玩，猫咪宇航员，搪胶材质，旋转底座，白底产品摄影。'
    },

    styles: ['3d', 'illustration', 'minimalist'],
    useCases: ['avatar', 'marketing', 'social-media'],
    difficulty: 2,
    tags: ['toy', 'figurine', 'pop-mart', 'vinyl', 'designer', 'sd-xl'],
    faq: [
      { q: 'Why does my toy look like a 3D render?', a: 'You forgot "vinyl material" + "matte + gloss". That combination is the designer toy material code.' },
      { q: 'How to make it look premium?', a: 'Tiny details (oxygen tank) + display base + "Pop Mart" reference. Details = premium toy pricing.' },
      { q: 'Best for social media?', a: '1:1 ratio with white background. Product shot format reads as "merch" instantly.' }
    ]
  },

  // ===== 60. SDXL - Pixel Art Sprite =====
  {
    id: 'seed-pixel-art-sdxl',
    source: 'Civitai',
    sourceUrl: 'https://civitai.com/images/pixel-art',
    imageUrl: 'https://image.civitai.com/xG1nkqbyTM5Gq8cqwU6wmG3skAcQ/width=1024/pixel-art.webp',
    author: 'aigallery_demo',
    model: 'stable-diffusion',
    originalPrompt: 'pixel art, 16-bit, retro game, sprite',
    originalNegativePrompt: 'hd, modern, 3d, smooth',
    originalParams: 'SDXL + Dreamshaper, CFG 9, Steps 25',

    title: '16-bit Pixel Art Sprite (SDXL)',
    slug: 'pixel-art-sprite-sdxl',
    description: 'SNES/Genesis-era 16-bit pixel art character sprite. Perfect for indie game dev content, retro gaming YouTube, and itch.io showcase.',

    rewrite_prompt: '16-bit pixel art character sprite, brave knight with sword and shield, side view, 4 frame walk animation strip, snes rpg style, limited 16 color palette, transparent background, 64x64 pixel grid, teraria inspired --ar 4:3',
    rewrite_negative: 'hd, modern, 3d, smooth, high resolution, anti-aliased',

    params_explained: [
      { param: 'Model: Dreamshaper', why: 'Dreamshaper + high CFG handles pixel art well.' },
      { param: 'CFG 9', why: 'Higher CFG (9) enforces pixel structure. Lower CFG blurs the pixel boundaries.' }
    ],

    tutorial: {
      intro: 'Pixel art = specific resolution + specific color limit + "transparent background" + named system.',
      steps: [
        'Format: 16-bit pixel art character sprite, 64x64 pixel grid, transparent background — resolution + format.',
        'Subject: brave knight with sword and shield, side view, 4 frame walk animation strip — character + animation strip.',
        'Style: snes rpg style, limited 16 color palette — system + color limit.',
        'Reference: teraria inspired — name a 16-bit-style game.'
      ],
      tips: 'High CFG (9) is essential for pixel art. Low CFG smooths the pixels into noise. Pixel art NEEDS hard edges.'
    },

    cross_model: {
      midjourney: 'MJ v6.1: "16-bit pixel art, knight sprite, snes style --ar 4:3 --v 6.1 --s 600".',
      stable_diffusion: 'SDXL + Dreamshaper, CFG 9, Steps 25.',
      flux: 'Flux struggles with pixel art. SDXL or MJ are better.',
      dall_e: 'DALL-E 3: "A 16-bit pixel art character sprite of a knight with sword and shield, SNES RPG style".',
      jimeng_zh: '16 位像素艺术，骑士角色，RPG 风格，4 帧动画条，64x64 像素网格。'
    },

    styles: ['illustration', 'vintage'],
    useCases: ['illustration', 'blog-header', 'social-media'],
    difficulty: 3,
    tags: ['pixel-art', '16bit', 'snes', 'retro', 'game-asset', 'sd-xl'],
    faq: [
      { q: 'Why does my pixel art look like a small photo?', a: 'You forgot the resolution. "64x64 pixel grid" + "limited color palette" forces pixel rendering.' },
      { q: 'How to keep the pixel grid clean?', a: 'High CFG (9) + DPM++ SDE sampler. Anti-aliasing ruins pixel art.' },
      { q: 'Best for indie game dev?', a: 'SDXL + Dreamshaper for sprites. Pixel art needs the "limited palette" cue.' }
    ]
  },

  // ===== 61. SDXL - Pencil Sketch =====
  {
    id: 'seed-pencil-sketch-sdxl',
    source: 'Civitai',
    sourceUrl: 'https://civitai.com/images/pencil-sketch',
    imageUrl: 'https://image.civitai.com/xG1nkqbyTM5Gq8cqwU6wmG3skAcQ/width=1024/pencil-sketch.webp',
    author: 'aigallery_demo',
    model: 'stable-diffusion',
    originalPrompt: 'pencil sketch, hand drawn, portrait, graphite',
    originalNegativePrompt: 'photo, color, 3d',
    originalParams: 'SDXL + Proteus, CFG 7, Steps 30',

    title: 'Graphite Pencil Sketch (SDXL)',
    slug: 'graphite-pencil-sketch-sdxl',
    description: 'Hand-drawn graphite pencil portrait sketch. Suitable for art education content, sketchbook inspiration, and character concept iteration.',

    rewrite_prompt: 'graphite pencil sketch of a thoughtful old man with beard, visible cross-hatching shading, paper texture visible, detailed wrinkles and skin pores, smudged graphite on edges, hand drawn on cream sketchbook paper, classical portrait composition --ar 2:3',
    rewrite_negative: 'photo, color, 3d, smooth, digital',

    params_explained: [
      { param: 'Model: Proteus', why: 'Proteus handles graphite texture well.' }
    ],

    tutorial: {
      intro: 'Pencil sketch = "graphite" + "cross-hatching" + "paper texture" + "smudged". Each cue forces the medium.',
      steps: [
        'Medium: graphite pencil sketch of a thoughtful old man with beard — medium + subject.',
        'Shading: visible cross-hatching shading — cross-hatching is the drawing technique.',
        'Surface: paper texture visible, hand drawn on cream sketchbook paper — paper grain + color.',
        'Detail: detailed wrinkles and skin pores — pencil can capture micro-detail.',
        'Imperfection: smudged graphite on edges — smudges = real hand-drawing.'
      ],
      tips: '"Cross-hatching" + "smudged graphite" + paper texture = real pencil sketch. Without these, it looks like a digital line art.'
    },

    cross_model: {
      midjourney: 'MJ v6.1: "graphite pencil sketch, old man, cross-hatching --ar 2:3 --v 6.1 --s 400 --style raw".',
      stable_diffusion: 'SDXL + Proteus, CFG 7, Steps 30.',
      flux: 'Flux handles sketch style well.',
      dall_e: 'DALL-E 3: "A graphite pencil sketch of a thoughtful old man with cross-hatching shading, on cream sketchbook paper".',
      jimeng_zh: '石墨铅笔素描，老人肖像，交叉影线，奶油色素描纸，手绘质感。'
    },

    styles: ['illustration', 'realistic'],
    useCases: ['illustration', 'blog-header', 'social-media'],
    difficulty: 2,
    tags: ['pencil', 'sketch', 'graphite', 'portrait', 'drawing', 'sd-xl'],
    faq: [
      { q: 'Why does my sketch look like line art?', a: 'You forgot "cross-hatching" + "smudged graphite". Shading is what separates sketch from line art.' },
      { q: 'How to make it look hand-drawn?', a: 'Add "paper texture visible" + "imperfect lines" + "smudged". Real drawings are imperfect.' },
      { q: 'Best for art tutorials?', a: 'SDXL + Proteus + cream paper reference. Renders well at 1024x1536 for detail.' }
    ]
  },

  // ===== 62. SDXL - Cinematic Movie Poster =====
  {
    id: 'seed-movie-poster-sdxl',
    source: 'Civitai',
    sourceUrl: 'https://civitai.com/images/movie-poster',
    imageUrl: 'https://image.civitai.com/xG1nkqbyTM5Gq8cqwU6wmG3skAcQ/width=1024/movie-poster.webp',
    author: 'aigallery_demo',
    model: 'stable-diffusion',
    originalPrompt: 'cinematic movie poster, thriller, character, dramatic',
    originalNegativePrompt: 'anime, cartoon, bright',
    originalParams: 'SDXL + JuggernautXL, CFG 7, Steps 35',

    title: 'Cinematic Movie Poster (SDXL)',
    slug: 'cinematic-movie-poster-sdxl',
    description: 'Hollywood-style movie poster for indie film marketing, fan-made art, and concept portfolio. Detailed lighting, typography placement, and color grading.',

    rewrite_prompt: 'cinematic thriller movie poster, lone detective in trench coat standing in rain, noir lighting with single backlight, dark teal and amber color grading, top right "COMING SOON" typography placeholder, billowing smoke background, theatrical release poster --ar 2:3',
    rewrite_negative: 'anime, cartoon, bright colors, daylight, smile',

    params_explained: [
      { param: 'Model: JuggernautXL', why: 'JuggernautXL handles cinematic photography best.' }
    ],

    tutorial: {
      intro: 'Movie poster = "theatrical release" + named genre + color grading terms + typography placeholder + "noir lighting".',
      steps: [
        'Format: cinematic thriller movie poster, theatrical release poster — format + genre + release status.',
        'Subject: lone detective in trench coat standing in rain — archetype + atmosphere.',
        'Light: noir lighting with single backlight — noir = high contrast dark.',
        'Color: dark teal and amber color grading — two named colors for the grade.',
        'Typography: top right "COMING SOON" typography placeholder — place the text cue.',
        'Atmosphere: billowing smoke background — atmospheric layer.'
      ],
      tips: 'Movie posters need color grading cues ("teal and amber"). Without grading terms, posters look like photos.'
    },

    cross_model: {
      midjourney: 'MJ v6.1: "cinematic movie poster, detective trench coat, noir lighting, teal amber --ar 2:3 --v 6.1 --s 750".',
      stable_diffusion: 'SDXL + JuggernautXL, CFG 7, Steps 35.',
      flux: 'Flux handles cinematic well. Same prompt.',
      dall_e: 'DALL-E 3: "A cinematic thriller movie poster of a lone detective in a trench coat in rain, noir lighting, teal and amber grade".',
      jimeng_zh: '电影海报，侦探，雨夜，青橙色调，黑色电影灯光，影院级。'
    },

    styles: ['realistic', 'concept-art'],
    useCases: ['marketing', 'blog-header', 'social-media'],
    difficulty: 3,
    tags: ['movie', 'poster', 'cinematic', 'thriller', 'noir', 'sd-xl'],
    faq: [
      { q: 'Why does my poster look like a stock photo?', a: 'You forgot "theatrical release poster" + color grading. Posters need specific genre + grade terms.' },
      { q: 'How to add text?', a: 'Use "typography placeholder" in prompt + add text in Photoshop/Canva afterward. SDXL/MJ struggle with readable text.' },
      { q: 'Best for indie film marketing?', a: '2:3 vertical + named genre + named color grade. Reads as "movie" instantly.' }
    ]
  },

  // ===== 63. Flux - Forest Cabin =====
  {
    id: 'seed-forest-cabin-flux',
    source: 'Civitai',
    sourceUrl: 'https://civitai.com/images/forest-cabin',
    imageUrl: 'https://image.civitai.com/xG1nkqbyTM5Gq8cqwU6wmG3skAcQ/width=1024/forest-cabin.webp',
    author: 'aigallery_demo',
    model: 'flux',
    originalPrompt: 'forest cabin, autumn, warm light, smoke from chimney',
    originalNegativePrompt: 'modern, urban, summer',
    originalParams: 'Flux.1 dev, guidance 3.5, steps 28',

    title: 'Cozy Forest Cabin in Autumn (Flux)',
    slug: 'cozy-forest-cabin-autumn-flux',
    description: 'Cozy autumn cabin scene in the forest with warm interior light and chimney smoke. Best for lifestyle, mindfulness, and outdoor brand content.',

    rewrite_prompt: 'cozy wooden log cabin deep in an autumn forest at dusk, warm golden light glowing from the windows, smoke gently rising from the stone chimney, fallen orange and red leaves on the ground, distant misty lake visible through the trees, peaceful and secluded, sony a7iv photography',
    rewrite_negative: 'modern building, urban, summer, snow',

    params_explained: [
      { param: 'Guidance 3.5', why: 'Flux uses lower guidance (vs SDXL). 3.5 is the sweet spot for natural scenes.' },
      { param: 'Steps 28', why: 'Flux converges faster than SDXL. 28 steps is enough.' }
    ],

    tutorial: {
      intro: 'Flux cabins work because of the warm/cool contrast. Warm window light + cool dusk exterior = emotional pull.',
      steps: [
        'Subject: cozy wooden log cabin deep in an autumn forest at dusk — material + setting + time.',
        'Light: warm golden light glowing from the windows — interior glow = "home" cue.',
        'Detail: smoke gently rising from the stone chimney — chimney smoke = "active home".',
        'Season: fallen orange and red leaves on the ground — autumn color cues.',
        'Depth: distant misty lake visible through the trees — adds depth + mystery.',
        'Camera: sony a7iv photography — modern camera = realistic photo.'
      ],
      tips: 'Flux understands "warm interior light + cool dusk exterior" naturally. Use this contrast for cozy scenes.'
    },

    cross_model: {
      midjourney: 'MJ v6.1: "cozy wooden cabin, autumn forest, warm light --ar 16:9 --v 6.1 --s 600".',
      stable_diffusion: 'SDXL + JuggernautXL, CFG 6, Steps 30. Flux prompt needs only minor adaptation.',
      flux: 'Flux.1 dev, guidance 3.5, steps 28.',
      dall_e: 'DALL-E 3: "A cozy wooden cabin deep in an autumn forest at dusk, warm window light, chimney smoke, sony camera photo".',
      jimeng_zh: '森林木屋，秋日黄昏，暖窗灯光，炊烟，索尼摄影。'
    },

    styles: ['realistic', 'photorealistic'],
    useCases: ['blog-header', 'wallpaper', 'marketing'],
    difficulty: 2,
    tags: ['cabin', 'forest', 'autumn', 'cozy', 'flux', 'lifestyle'],
    faq: [
      { q: 'Why does my cabin look like a generic house?', a: 'You forgot "log cabin" + "stone chimney" + "warm window light". These three = cozy cabin.' },
      { q: 'How to make it feel like home?', a: 'Add "warm window light" + "chimney smoke" + "distant misty lake". The combination = "lived-in".' },
      { q: 'Best for mindfulness/lifestyle content?', a: '16:9 with warm/cool contrast + autumn palette. Reads as "escape" instantly.' }
    ]
  },

  // ===== 64. Flux - Asian Street Food =====
  {
    id: 'seed-asian-streetfood-flux',
    source: 'Civitai',
    sourceUrl: 'https://civitai.com/images/asian-streetfood',
    imageUrl: 'https://image.civitai.com/xG1nkqbyTM5Gq8cqwU6wmG3skAcQ/width=1024/asian-streetfood.webp',
    author: 'aigallery_demo',
    model: 'flux',
    originalPrompt: 'asian street food stall, night market, neon, food',
    originalNegativePrompt: 'restaurant, clean, modern',
    originalParams: 'Flux.1 dev, guidance 4, steps 30',

    title: 'Asian Night Market Street Food (Flux)',
    slug: 'asian-night-market-street-food-flux',
    description: 'Vibrant Asian night market scene with food stalls and neon signs. Best for travel content, food blog heroes, and city guides.',

    rewrite_prompt: 'busy asian night market street food stall in taipei, steaming bamboo baskets of xiao long bao, hanging red lanterns, neon chinese signs, wok flame shooting up, vendor in white apron, soft rain on the street, shot on fujifilm xt5, 35mm f/1.4',
    rewrite_negative: 'empty, clean, modern, western restaurant',

    params_explained: [
      { param: 'Guidance 4', why: 'Slightly higher guidance for detailed market scenes.' }
    ],

    tutorial: {
      intro: 'Asian night market = named city + named food + neon + steam + named lens. Without these, you get generic "street food" stock.',
      steps: [
        'Location: busy asian night market street food stall in taipei — specific city.',
        'Food: steaming bamboo baskets of xiao long bao — specific food + specific material.',
        'Lights: hanging red lanterns, neon chinese signs — Asian signage cues.',
        'Action: wok flame shooting up, vendor in white apron — action + human element.',
        'Weather: soft rain on the street — wet streets reflect neon = magic.',
        'Camera: shot on fujifilm xt5, 35mm f/1.4 — real camera + real lens.'
      ],
      tips: 'Wet streets + neon = the magic. "Soft rain" makes the neon reflect and double the impact.'
    },

    cross_model: {
      midjourney: 'MJ v6.1: "taipei night market, xiao long bao, neon lanterns --ar 16:9 --v 6.1 --s 700".',
      stable_diffusion: 'SDXL + JuggernautXL, CFG 6, Steps 30. Flux prompt works with minor changes.',
      flux: 'Flux.1 dev, guidance 4, steps 30.',
      dall_e: 'DALL-E 3: "A Taipei night market with steaming xiao long bao, hanging red lanterns, neon Chinese signs, and wok flames".',
      jimeng_zh: '亚洲夜市，台北，小笼包蒸笼，红色灯笼，霓虹招牌，雨夜街景。'
    },

    styles: ['realistic', 'photorealistic'],
    useCases: ['blog-header', 'social-media', 'marketing'],
    difficulty: 3,
    tags: ['street-food', 'asia', 'night-market', 'taipei', 'neon', 'flux'],
    faq: [
      { q: 'Why does my market look like a generic festival?', a: 'You forgot the specific city + specific food. "Taipei" + "xiao long bao" = authentic Asian street food.' },
      { q: 'How to get the neon glow?', a: 'Add "soft rain on the street" — wet surfaces reflect neon, doubling the glow.' },
      { q: 'Best for travel content?', a: '16:9 + named city + named food. Travel readers crave specific landmarks.' }
    ]
  },

  // ===== 65. Flux - Glass Product Shot =====
  {
    id: 'seed-glass-product-flux',
    source: 'Civitai',
    sourceUrl: 'https://civitai.com/images/glass-product',
    imageUrl: 'https://image.civitai.com/xG1nkqbyTM5Gq8cqwU6wmG3skAcQ/width=1024/glass-product.webp',
    author: 'aigallery_demo',
    model: 'flux',
    originalPrompt: 'glass product photography, perfume bottle, clean background',
    originalNegativePrompt: 'lifestyle, casual, dirty',
    originalParams: 'Flux.1 dev, guidance 3, steps 25',

    title: 'Glass Product Photography (Flux)',
    slug: 'glass-product-photography-flux',
    description: 'Premium glass product photography for e-commerce, brand packaging, and luxury marketing. Detailed lighting and material cues.',

    rewrite_prompt: 'premium glass perfume bottle product photography, faceted crystal cut glass refracting rainbow light, single soft top light with rim light, soft shadow on white acrylic surface, condensation droplets on the glass, hero product shot, hasselblad h6d photography',
    rewrite_negative: 'lifestyle, casual, dirty, hand, person',

    params_explained: [
      { param: 'Guidance 3', why: 'Lower guidance (3) for clean product look. Higher guidance adds unwanted detail.' }
    ],

    tutorial: {
      intro: 'Glass product = "faceted" + "refracting" + "rim light" + named camera. Material science is the magic.',
      steps: [
        'Subject: premium glass perfume bottle product photography — premium + glass + product.',
        'Material: faceted crystal cut glass refracting rainbow light — faceted + refraction = the magic.',
        'Lighting: single soft top light with rim light — top + rim = luxury product formula.',
        'Surface: soft shadow on white acrylic surface — clean product surface.',
        'Detail: condensation droplets on the glass — droplets = fresh/premium.',
        'Camera: hasselblad h6d photography — named medium format = luxury cue.'
      ],
      tips: '"Refracting rainbow light" is the secret. Faceted glass + refracting = automatic visual interest.'
    },

    cross_model: {
      midjourney: 'MJ v6.1: "premium glass perfume bottle, faceted crystal, hasselblad --ar 1:1 --v 6.1 --s 500 --style raw".',
      stable_diffusion: 'SDXL + JuggernautXL, CFG 6, Steps 30.',
      flux: 'Flux.1 dev, guidance 3, steps 25.',
      dall_e: 'DALL-E 3: "A premium glass perfume bottle with faceted crystal refracting light, hasselblad product photography".',
      jimeng_zh: '玻璃香水产品摄影，刻面水晶，折射光，雨滴，哈苏中画幅。'
    },

    styles: ['realistic', 'photorealistic', 'minimalist'],
    useCases: ['ecommerce', 'marketing', 'blog-header'],
    difficulty: 3,
    tags: ['product', 'glass', 'photography', 'luxury', 'perfume', 'flux'],
    faq: [
      { q: 'Why does my glass look plastic?', a: 'You forgot "faceted" + "refracting" + "condensation droplets". These trigger glass rendering.' },
      { q: 'How to get the rainbow refraction?', a: 'Use "refracting rainbow light" or "prismatic light through". Glass needs light source to show off.' },
      { q: 'Best for e-commerce?', a: '1:1 with white background. Hasselblad reference = premium catalog quality.' }
    ]
  },

  // ===== 66. Flux - Pastel Dreamscape =====
  {
    id: 'seed-pastel-dreamscape-flux',
    source: 'Civitai',
    sourceUrl: 'https://civitai.com/images/pastel-dreamscape',
    imageUrl: 'https://image.civitai.com/xG1nkqbyTM5Gq8cqwU6wmG3skAcQ/width=1024/pastel-dreamscape.webp',
    author: 'aigallery_demo',
    model: 'flux',
    originalPrompt: 'pastel dreamscape, soft fantasy, ethereal, calm',
    originalNegativePrompt: 'dark, horror, sharp',
    originalParams: 'Flux.1 dev, guidance 3.5, steps 28',

    title: 'Pastel Dreamscape Fantasy (Flux)',
    slug: 'pastel-dreamscape-fantasy-flux',
    description: 'Soft pastel fantasy dreamscape perfect for meditation apps, ethereal branding, and Pinterest mood boards.',

    rewrite_prompt: 'soft pastel dreamscape with floating islands, gentle waterfalls falling into the clouds, giant pastel pink and lavender flowers, tiny deer with antlers made of crystal, soft golden hour light, dreamy ethereal atmosphere, studio ghibli inspired',
    rewrite_negative: 'dark, horror, sharp, saturated, modern',

    params_explained: [
      { param: 'Guidance 3.5', why: 'Mid-low guidance for dreamy softness. Higher guidance sharpens too much.' }
    ],

    tutorial: {
      intro: 'Pastel dreamscape = "floating islands" + "soft golden hour" + named color palette + Ghibli reference. Skip any one and it goes generic.',
      steps: [
        'Concept: soft pastel dreamscape with floating islands — the floating island is the dreamscape signature.',
        'Water: gentle waterfalls falling into the clouds — water + clouds = soft fantasy.',
        'Flora: giant pastel pink and lavender flowers — named pastel colors + scale.',
        'Character: tiny deer with antlers made of crystal — small character + crystal detail.',
        'Light: soft golden hour light, dreamy ethereal atmosphere — golden hour + dreamy.',
        'Reference: studio ghibli inspired — Ghibli = soft fantasy master.'
      ],
      tips: 'Flux handles "soft" cues well. "Soft" + named pastels = automatic Ghibli vibe.'
    },

    cross_model: {
      midjourney: 'MJ Niji 6: "pastel dreamscape, floating islands, ghibli --ar 16:9 --niji 6 --s 850".',
      stable_diffusion: 'SDXL + CounterfeitXL with LoRA: "ghibli_style".',
      flux: 'Flux.1 dev, guidance 3.5, steps 28.',
      dall_e: 'DALL-E 3: "A pastel dreamscape with floating islands, gentle waterfalls, giant pink flowers, and a tiny deer with crystal antlers, Ghibli inspired".',
      jimeng_zh: '柔和粉彩梦境，浮空岛，云中瀑布，水晶鹿角，治愈吉卜力风。'
    },

    styles: ['illustration', 'anime', 'concept-art'],
    useCases: ['wallpaper', 'blog-header', 'social-media'],
    difficulty: 2,
    tags: ['pastel', 'dreamscape', 'fantasy', 'ghibli', 'ethereal', 'flux'],
    faq: [
      { q: 'Why does my dreamscape look harsh?', a: 'You forgot "soft" + "dreamy ethereal" + pastel palette. Softness is the entire style.' },
      { q: 'How to get the Ghibli feel?', a: 'Use "studio ghibli inspired" + "soft golden hour" + scale contrast (tiny character + giant nature).' },
      { q: 'Best for meditation apps?', a: '16:9 with soft palette + gentle motion elements. Reads as "calm" instantly.' }
    ]
  },

  // ===== 67. Flux - Magazine Cover =====
  {
    id: 'seed-magazine-cover-flux',
    source: 'Civitai',
    sourceUrl: 'https://civitai.com/images/magazine-cover',
    imageUrl: 'https://image.civitai.com/xG1nkqbyTM5Gq8cqwU6wmG3skAcQ/width=1024/magazine-cover.webp',
    author: 'aigallery_demo',
    model: 'flux',
    originalPrompt: 'fashion magazine cover, model, bold typography',
    originalNegativePrompt: 'casual, amateur, snapshot',
    originalParams: 'Flux.1 dev, guidance 4, steps 30',

    title: 'Fashion Magazine Cover (Flux)',
    slug: 'fashion-magazine-cover-flux',
    description: 'Editorial magazine cover for fashion industry lookbooks, brand pitch decks, and stylist portfolios.',

    rewrite_prompt: 'vogue italia march 2024 cover, model in bold red dress against minimal white set, dramatic sharp lighting, serif masthead typography placeholder top, "SPRING FASHION" cover line, art directed by steven meisel, medium format film look',
    rewrite_negative: 'casual, amateur, snapshot, smile, busy background',

    params_explained: [
      { param: 'Guidance 4', why: 'Higher guidance for editorial precision. Lower makes it look soft.' }
    ],

    tutorial: {
      intro: 'Magazine cover = "named magazine + issue" + "masthead typography" + "cover line" + named art director.',
      steps: [
        'Issue: vogue italia march 2024 cover — magazine + month/year anchors the era.',
        'Subject: model in bold red dress against minimal white set — single color + minimal background.',
        'Lighting: dramatic sharp lighting — sharp light = editorial.',
        'Typography: serif masthead typography placeholder top, "SPRING FASHION" cover line — place masthead + cover line.',
        'Reference: art directed by steven meisel, medium format film look — named art director + film.'
      ],
      tips: 'Always include a cover line + masthead placeholder. Without typography cues, it looks like a fashion photo, not a cover.'
    },

    cross_model: {
      midjourney: 'MJ v6.1: "vogue italia cover, model red dress, serif masthead --ar 2:3 --v 6.1 --s 750".',
      stable_diffusion: 'SDXL + epiCRealism, CFG 6, Steps 30.',
      flux: 'Flux.1 dev, guidance 4, steps 30.',
      dall_e: 'DALL-E 3: "A Vogue Italia March 2024 magazine cover of a model in a red dress, serif masthead, art directed by Steven Meisel".',
      jimeng_zh: 'Vogue 杂志封面，红裙模特，衬线刊头，春夏时装，时尚大片。'
    },

    styles: ['realistic', 'vintage', 'photorealistic'],
    useCases: ['marketing', 'blog-header', 'social-media'],
    difficulty: 3,
    tags: ['magazine', 'cover', 'fashion', 'vogue', 'editorial', 'flux'],
    faq: [
      { q: 'Why does my cover look like a fashion photo?', a: 'You forgot "masthead typography" + "cover line". A cover needs text placement.' },
      { q: 'How to add real text?', a: 'Add text in Photoshop/Canva afterward. Flux/MJ render text but it\'s often misspelled.' },
      { q: 'Best for editorial portfolio?', a: '2:3 + named magazine + named art director. Reads as "editorial" instantly.' }
    ]
  },

  // ===== 68. Flux - Architectural Visualization =====
  {
    id: 'seed-architectural-viz-flux',
    source: 'Civitai',
    sourceUrl: 'https://civitai.com/images/architectural-viz',
    imageUrl: 'https://image.civitai.com/xG1nkqbyTM5Gq8cqwU6wmG3skAcQ/width=1024/architectural-viz.webp',
    author: 'aigallery_demo',
    model: 'flux',
    originalPrompt: 'modern villa, architecture, glass, pool, sunset',
    originalNegativePrompt: 'people, clutter, photo, sketch',
    originalParams: 'Flux.1 dev, guidance 3.5, steps 30',

    title: 'Modern Villa Architectural Visualization (Flux)',
    slug: 'modern-villa-architectural-viz-flux',
    description: 'Photorealistic architectural visualization for real estate marketing, architecture firm portfolios, and luxury home listings.',

    rewrite_prompt: 'ultra modern minimalist villa with floor-to-ceiling glass walls overlooking infinity pool, cantilevered concrete structure, golden hour sunset light, reflective water surface, distant mountains, soft natural materials of wood and stone, architectural digest photo, interior design magazine quality',
    rewrite_negative: 'people, clutter, traditional, photo snapshot',

    params_explained: [
      { param: 'Guidance 3.5', why: 'Mid guidance for clean architectural precision.' }
    ],

    tutorial: {
      intro: 'Architectural visualization = "cantilevered" + "floor-to-ceiling glass" + "infinity pool" + named magazine. Material + structure terms.',
      steps: [
        'Structure: ultra modern minimalist villa with floor-to-ceiling glass walls overlooking infinity pool — modern + glass + pool.',
        'Architecture: cantilevered concrete structure — engineering term that adds drama.',
        'Light: golden hour sunset light, reflective water surface — golden hour = luxury.',
        'Materials: soft natural materials of wood and stone — natural materials = warmth.',
        'Reference: architectural digest photo, interior design magazine quality — name the magazine.'
      ],
      tips: 'Cantilevered + floor-to-ceiling glass = the modern architecture code. Without these, you get generic house.'
    },

    cross_model: {
      midjourney: 'MJ v6.1: "modern villa, floor-to-ceiling glass, infinity pool --ar 16:9 --v 6.1 --s 600".',
      stable_diffusion: 'SDXL + JuggernautXL, CFG 6, Steps 30.',
      flux: 'Flux.1 dev, guidance 3.5, steps 30.',
      dall_e: 'DALL-E 3: "An ultra modern minimalist villa with floor-to-ceiling glass walls, infinity pool, sunset, architectural digest photo".',
      jimeng_zh: '现代极简别墅，落地玻璃，无边泳池，悬挑混凝土，金色夕阳。'
    },

    styles: ['realistic', 'minimalist', 'photorealistic'],
    useCases: ['marketing', 'blog-header', 'social-media'],
    difficulty: 3,
    tags: ['architecture', 'villa', 'modern', 'minimalist', 'visualization', 'flux'],
    faq: [
      { q: 'Why does my villa look like a generic house?', a: 'You forgot "cantilevered" + "floor-to-ceiling glass" + "infinity pool". These = modern architecture.' },
      { q: 'How to get Architectural Digest quality?', a: 'Add "architectural digest photo" + named materials (wood, stone, concrete).' },
      { q: 'Best for real estate marketing?', a: '16:9 + golden hour + infinity pool. Luxury listings = these three.' }
    ]
  },

  // ===== 69. Flux - Cosplay Character =====
  {
    id: 'seed-cosplay-flux',
    source: 'Civitai',
    sourceUrl: 'https://civitai.com/images/cosplay',
    imageUrl: 'https://image.civitai.com/xG1nkqbyTM5Gq8cqwU6wmG3skAcQ/width=1024/cosplay.webp',
    author: 'aigallery_demo',
    model: 'flux',
    originalPrompt: 'cosplay character, detailed costume, photo realistic',
    originalNegativePrompt: 'cartoon, anime, casual',
    originalParams: 'Flux.1 dev, guidance 4, steps 30',

    title: 'Cosplay Character Photography (Flux)',
    slug: 'cosplay-character-photography-flux',
    description: 'Photorealistic cosplay photography for costume designer portfolios, convention social media, and fandom content.',

    rewrite_prompt: 'cosplay character of wonder woman in full golden armor, detailed tiara and bullet-deflecting bracelets, holding lasso of truth, dramatic action pose mid-leap, soft diffused studio lighting, detailed leather and metal textures, comic con photo shoot quality',
    rewrite_negative: 'cartoon, anime, casual, low effort costume',

    params_explained: [
      { param: 'Guidance 4', why: 'Higher guidance for detailed costume rendering.' }
    ],

    tutorial: {
      intro: 'Cosplay = specific character + detailed costume pieces + "comic con photo shoot" + named materials. Specificity = authenticity.',
      steps: [
        'Character: cosplay character of wonder woman in full golden armor — name the character + armor color.',
        'Details: detailed tiara and bullet-deflecting bracelets, holding lasso of truth — three named accessories.',
        'Pose: dramatic action pose mid-leap — action pose shows off costume.',
        'Light: soft diffused studio lighting — even light for costume detail.',
        'Materials: detailed leather and metal textures — material specification.',
        'Reference: comic con photo shoot quality — convention standard.'
      ],
      tips: 'Name the specific character + 3+ specific accessories. Generic "superhero" gets you 1000 stock results.'
    },

    cross_model: {
      midjourney: 'MJ v6.1: "wonder woman cosplay, golden armor, lasso --ar 2:3 --v 6.1 --s 600".',
      stable_diffusion: 'SDXL + RealisticVision, CFG 6, Steps 30.',
      flux: 'Flux.1 dev, guidance 4, steps 30.',
      dall_e: 'DALL-E 3: "A Wonder Woman cosplay with golden armor, tiara, bracelets, and lasso of truth, comic con photo shoot".',
      jimeng_zh: '神奇女侠角色扮演，黄金盔甲，头冠，真言套索，漫展级 Cosplay。'
    },

    styles: ['realistic', 'photorealistic'],
    useCases: ['social-media', 'marketing', 'blog-header'],
    difficulty: 3,
    tags: ['cosplay', 'wonder-woman', 'costume', 'character', 'convention', 'flux'],
    faq: [
      { q: 'Why does my costume look like Halloween?', a: 'You forgot specific accessories + "comic con photo shoot". Convention quality = named items + reference.' },
      { q: 'How to make the costume look premium?', a: 'Name materials (leather, metal, silk) + 3+ specific items. Detail = premium cosplay.' },
      { q: 'Best for fandom content?', a: '2:3 vertical + character name + action pose. Reads as "cosplay" instantly.' }
    ]
  },

  // ===== 70. Flux - Sunset Beach =====
  {
    id: 'seed-sunset-beach-flux',
    source: 'Civitai',
    sourceUrl: 'https://civitai.com/images/sunset-beach',
    imageUrl: 'https://image.civitai.com/xG1nkqbyTM5Gq8cqwU6wmG3skAcQ/width=1024/sunset-beach.webp',
    author: 'aigallery_demo',
    model: 'flux',
    originalPrompt: 'sunset beach, palm trees, ocean, golden hour',
    originalNegativePrompt: 'urban, indoor, cold',
    originalParams: 'Flux.1 dev, guidance 3, steps 25',

    title: 'Tropical Sunset Beach Wallpaper (Flux)',
    slug: 'tropical-sunset-beach-wallpaper-flux',
    description: 'Tropical beach sunset perfect for travel agency content, vacation rental marketing, and desktop wallpapers.',

    rewrite_prompt: 'tropical sunset beach in bali, golden hour light over calm ocean, silhouetted palm trees on white sand, distant fishing boats, soft pink and orange sky reflected in wet sand, peaceful travel photography, nikon z9 24-70mm f/2.8',
    rewrite_negative: 'urban, indoor, cold, harsh, busy',

    params_explained: [
      { param: 'Guidance 3', why: 'Low guidance for natural sunset softness. Higher makes it overcooked.' }
    ],

    tutorial: {
      intro: 'Tropical sunset = named location + "golden hour" + "silhouetted palm" + "reflected in wet sand" + named lens.',
      steps: [
        'Location: tropical sunset beach in bali — specific location.',
        'Light: golden hour light over calm ocean — golden hour + calm water.',
        'Subject: silhouetted palm trees on white sand — silhouette + palm = tropical.',
        'Details: distant fishing boats, soft pink and orange sky reflected in wet sand — small details + reflection.',
        'Camera: nikon z9 24-70mm f/2.8 — real camera + lens.'
      ],
      tips: 'Wet sand + sunset = automatic reflection. "Reflected in wet sand" doubles the sky impact.'
    },

    cross_model: {
      midjourney: 'MJ v6.1: "bali sunset beach, palm trees, golden hour --ar 16:9 --v 6.1 --s 600".',
      stable_diffusion: 'SDXL + JuggernautXL, CFG 6, Steps 30.',
      flux: 'Flux.1 dev, guidance 3, steps 25.',
      dall_e: 'DALL-E 3: "A Bali tropical sunset beach with silhouetted palm trees, golden hour, nikon camera".',
      jimeng_zh: '巴厘岛日落海滩，棕榈树剪影，金色光晕，湿沙倒影，旅行摄影。'
    },

    styles: ['realistic', 'wallpaper', 'photorealistic'],
    useCases: ['wallpaper', 'blog-header', 'social-media'],
    difficulty: 2,
    tags: ['beach', 'sunset', 'tropical', 'bali', 'travel', 'flux'],
    faq: [
      { q: 'Why does my sunset look like every other sunset?', a: 'You forgot "silhouetted palm trees" + "reflected in wet sand". These two = tropical magic.' },
      { q: 'How to get the right golden hour?', a: 'Add "golden hour" + "soft pink and orange sky". Specify colors, not just "sunset".' },
      { q: 'Best for travel agency?', a: '16:9 + named location (Bali, Maldives, etc). Specific locations sell more than generic beaches.' }
    ]
  },

  // ===== 71. Ideogram - Quote Poster Minimalist =====
  {
    id: 'seed-quote-poster-ideogram',
    source: 'Civitai',
    sourceUrl: 'https://civitai.com/images/quote-poster',
    imageUrl: 'https://image.civitai.com/xG1nkqbyTM5Gq8cqwU6wmG3skAcQ/width=1024/quote-poster.webp',
    author: 'aigallery_demo',
    model: 'ideogram',
    originalPrompt: 'minimalist quote poster, typography, motivational',
    originalNegativePrompt: 'busy, decorative, photo',
    originalParams: 'Ideogram 2.0, style Typography',

    title: 'Minimalist Motivational Quote Poster (Ideogram)',
    slug: 'minimalist-motivational-quote-poster-ideogram',
    description: 'Clean typographic motivational poster for Instagram, office wall art, and print-on-demand stores. Ideogram 2.0 excels at readable text.',

    rewrite_prompt: 'minimalist motivational quote poster, large serif typography reading "STAY CURIOUS" in black, soft cream background, single small decorative line element below, generous white space, premium typographic poster design --ar 2:3',
    rewrite_negative: 'busy, decorative, photo, cluttered, low contrast',

    params_explained: [
      { param: 'Style: Typography', why: 'Ideogram\'s Typography style is purpose-built for text-heavy designs.' },
      { param: 'v2 model', why: 'Ideogram 2.0 has dramatically better text rendering than 1.0.' }
    ],

    tutorial: {
      intro: 'Ideogram\'s superpower is text. Generic "quote poster" fails. The magic: put the actual quote in quotes.',
      steps: [
        'Format: minimalist motivational quote poster — format + purpose.',
        'Typography: large serif typography reading "STAY CURIOUS" in black — the exact text in quotes.',
        'Background: soft cream background — off-white is more premium than pure white.',
        'Layout: generous white space, single small decorative line element below — minimal decoration.',
        'Quality: premium typographic poster design — quality reference.'
      ],
      tips: 'Ideogram is the BEST at text rendering. Always use the actual text you want, in quotes, capitalized.'
    },

    cross_model: {
      midjourney: 'MJ v6.1: "minimalist quote poster, STAY CURIOUS, serif typography --ar 2:3 --v 6.1 --s 400".',
      stable_diffusion: 'SDXL with controlnet. Ideogram is the only model that does text well out-of-the-box.',
      flux: 'Flux is OK with text but inconsistent. Ideogram is best.',
      dall_e: 'DALL-E 3: "A minimalist motivational poster with the text STAY CURIOUS in large serif typography on a cream background".',
      jimeng_zh: '极简励志海报，衬线大字，"保持好奇" 标题，奶白底色，大量留白。'
    },

    styles: ['minimalist', 'poster'],
    useCases: ['marketing', 'social-media', 'logo'],
    difficulty: 2,
    tags: ['poster', 'typography', 'quote', 'minimalist', 'ideogram', 'motivational'],
    faq: [
      { q: 'Why is my text misspelled?', a: 'Other models (MJ/SDXL/Flux) struggle with text. Use Ideogram for text-heavy designs.' },
      { q: 'Best font for quotes?', a: 'Serif (Times, Garamond) = classic. Sans (Helvetica) = modern. Both work in Ideogram.' },
      { q: 'Best for print-on-demand?', a: '2:3 ratio, cream background, high contrast. Reads as "premium poster" instantly.' }
    ]
  },

  // ===== 72. Ideogram - Book Cover Design =====
  {
    id: 'seed-book-cover-ideogram',
    source: 'Civitai',
    sourceUrl: 'https://civitai.com/images/book-cover',
    imageUrl: 'https://image.civitai.com/xG1nkqbyTM5Gq8cqwU6wmG3skAcQ/width=1024/book-cover.webp',
    author: 'aigallery_demo',
    model: 'ideogram',
    originalPrompt: 'book cover design, thriller, typography, dramatic',
    originalNegativePrompt: 'photo, busy, amateur',
    originalParams: 'Ideogram 2.0, style Design',

    title: 'Thriller Book Cover (Ideogram)',
    slug: 'thriller-book-cover-ideogram',
    description: 'Best-selling thriller book cover design with bold typography. Useful for self-publishing authors and design portfolios.',

    rewrite_prompt: 'professional thriller novel book cover, dark moody forest silhouette background, large bold title "THE LAST WITNESS" in white sans-serif at top, author name "Sarah Chen" at bottom in smaller text, single red accent color, atmospheric mystery book design --ar 2:3',
    rewrite_negative: 'photo, busy, amateur, childlike, cartoon',

    params_explained: [
      { param: 'Style: Design', why: 'Design style handles complex layouts better than Typography style.' }
    ],

    tutorial: {
      intro: 'Book covers need title + author + mood. Ideogram lets you put the actual book title.',
      steps: [
        'Format: professional thriller novel book cover — genre + format.',
        'Background: dark moody forest silhouette background — moody setting.',
        'Title: large bold title "THE LAST WITNESS" in white sans-serif at top — actual title in quotes.',
        'Author: author name "Sarah Chen" at bottom in smaller text — name + placement.',
        'Accent: single red accent color, atmospheric mystery book design — color pop + mood.'
      ],
      tips: 'Book cover formula: title (top, big) + author (bottom, small) + genre mood (background) + 1 accent color. Follow the rule.'
    },

    cross_model: {
      midjourney: 'MJ v6.1: "thriller book cover, forest silhouette, THE LAST WITNESS --ar 2:3 --v 6.1 --s 700". MJ text may be misspelled.',
      stable_diffusion: 'SDXL with controlnet for text. Use Ideogram for text accuracy.',
      flux: 'Flux is OK; Ideogram is better for text.',
      dall_e: 'DALL-E 3: "A thriller novel book cover with THE LAST WITNESS in large white text over a dark forest silhouette".',
      jimeng_zh: '惊悚小说封面，深色森林剪影，书名《最后的目击者》，红色点缀。'
    },

    styles: ['poster', 'minimalist', 'vintage'],
    useCases: ['marketing', 'blog-header', 'social-media'],
    difficulty: 3,
    tags: ['book', 'cover', 'thriller', 'typography', 'ideogram', 'design'],
    faq: [
      { q: 'Why is my title misspelled?', a: 'MJ/SDXL/Flux can\'t render text reliably. Use Ideogram for cover designs.' },
      { q: 'How to choose accent color?', a: 'One accent color only: red for thriller, blue for sci-fi, green for nature, gold for literary.' },
      { q: 'Best for self-publishing?', a: '2:3 + bold title + genre mood. Indie readers scan covers fast — must read in 2 seconds.' }
    ]
  },

  // ===== 73. Ideogram - Sports Team Logo =====
  {
    id: 'seed-sports-logo-ideogram',
    source: 'Civitai',
    sourceUrl: 'https://civitai.com/images/sports-logo',
    imageUrl: 'https://image.civitai.com/xG1nkqbyTM5Gq8cqwU6wmG3skAcQ/width=1024/sports-logo.webp',
    author: 'aigallery_demo',
    model: 'ideogram',
    originalPrompt: 'sports team logo, mascot, eagle, bold',
    originalNegativePrompt: 'photo, realistic, busy',
    originalParams: 'Ideogram 2.0, style Design',

    title: 'Sports Team Mascot Logo (Ideogram)',
    slug: 'sports-team-mascot-logo-ideogram',
    description: 'Bold sports team logo with mascot. Works for esports teams, school athletics, fantasy leagues, and merch design.',

    rewrite_prompt: 'bold sports team mascot logo, fierce eagle head with spread wings, vintage collegiate style, limited 3-color palette of navy gold and white, text "STORM HAWKS" curved below the mascot, vector flat illustration style, isolated on white --ar 1:1',
    rewrite_negative: 'photo, realistic, busy, gradient, 3d',

    params_explained: [
      { param: 'Style: Design', why: 'Design style for vector + logo work.' }
    ],

    tutorial: {
      intro: 'Sports logo = mascot + "limited 3-color palette" + "vintage collegiate" + curved text. School/team logos follow these rules.',
      steps: [
        'Mascot: fierce eagle head with spread wings — specific mascot + pose.',
        'Style: vintage collegiate style — period reference.',
        'Palette: limited 3-color palette of navy gold and white — name 3 colors max.',
        'Text: text "STORM HAWKS" curved below the mascot — actual name + curved placement.',
        'Format: vector flat illustration style, isolated on white — vector + flat + clean background.'
      ],
      tips: 'Real sports logos use 2-4 colors max (for embroidery and printing). Limit your palette in the prompt.'
    },

    cross_model: {
      midjourney: 'MJ v6.1: "sports logo, eagle mascot, STORM HAWKS --ar 1:1 --v 6.1 --s 500".',
      stable_diffusion: 'SDXL + Proteus, CFG 7, Steps 25. Use Ideogram for text accuracy.',
      flux: 'Flux is OK. Ideogram is better for text.',
      dall_e: 'DALL-E 3: "A bold sports team mascot logo of an eagle head with the text STORM HAWKS, vintage collegiate style, navy gold and white".',
      jimeng_zh: '运动队徽，鹰头吉祥物，文字 "Storm Hawks"，复古学院风，三色限制。'
    },

    styles: ['logo', 'minimalist', 'vintage'],
    useCases: ['logo', 'marketing', 'social-media'],
    difficulty: 3,
    tags: ['logo', 'sports', 'mascot', 'eagle', 'collegiate', 'ideogram'],
    faq: [
      { q: 'Why is my team name misspelled?', a: 'Other models struggle with text. Ideogram is the only reliable option for logo text.' },
      { q: 'How many colors for a real logo?', a: '2-4 colors max. Embroidery, screen printing, and embroidery patches can\'t do more.' },
      { q: 'Best for esports teams?', a: '1:1 with mascot + team name + limited palette. Esports logos are aggressive + bold.' }
    ]
  },

  // ===== 74. Ideogram - Wedding Invitation =====
  {
    id: 'seed-wedding-invitation-ideogram',
    source: 'Civitai',
    sourceUrl: 'https://civitai.com/images/wedding-invitation',
    imageUrl: 'https://image.civitai.com/xG1nkqbyTM5Gq8cqwU6wmG3skAcQ/width=1024/wedding-invitation.webp',
    author: 'aigallery_demo',
    model: 'ideogram',
    originalPrompt: 'wedding invitation, elegant, floral, typography',
    originalNegativePrompt: 'cheap, modern, busy',
    originalParams: 'Ideogram 2.0, style Design',

    title: 'Elegant Wedding Invitation (Ideogram)',
    slug: 'elegant-wedding-invitation-ideogram',
    description: 'Wedding invitation design with floral elements and elegant typography. Suitable for wedding planners and stationery designers.',

    rewrite_prompt: 'elegant wedding invitation card, soft watercolor eucalyptus wreath border, blush pink and sage green palette, central text reading "Emma & James" in elegant script, smaller text "June 15 2024" below, fine paper texture, save the date --ar 5:7',
    rewrite_negative: 'cheap, modern, busy, bright colors, cartoon',

    params_explained: [
      { param: 'Style: Design', why: 'Design style for stationery layouts.' }
    ],

    tutorial: {
      intro: 'Wedding invitations need names + date + script typography + soft palette + botanical accent. The five-element rule.',
      steps: [
        'Format: elegant wedding invitation card, save the date — format.',
        'Botanical: soft watercolor eucalyptus wreath border — single plant type + wreath layout.',
        'Palette: blush pink and sage green palette — two named muted colors.',
        'Names: central text reading "Emma & James" in elegant script — actual names in quotes.',
        'Date: smaller text "June 15 2024" below — date in quotes.',
        'Material: fine paper texture — paper grain cue.'
      ],
      tips: 'Wedding = soft palette + script + botanical + names in quotes. Ideogram renders the names perfectly.'
    },

    cross_model: {
      midjourney: 'MJ v6.1: "wedding invitation, Emma & James, eucalyptus wreath --ar 5:7 --v 6.1 --s 600".',
      stable_diffusion: 'SDXL with controlnet. Use Ideogram for text.',
      flux: 'Flux is OK. Ideogram best for text.',
      dall_e: 'DALL-E 3: "An elegant wedding invitation with the text Emma & James, June 15 2024, surrounded by a watercolor eucalyptus wreath".',
      jimeng_zh: '优雅婚礼请柬，水彩桉树叶花环，文字 "Emma & James"，2024 年 6 月 15 日。'
    },

    styles: ['illustration', 'minimalist', 'watercolor'],
    useCases: ['marketing', 'blog-header', 'social-media'],
    difficulty: 2,
    tags: ['wedding', 'invitation', 'typography', 'floral', 'elegant', 'ideogram'],
    faq: [
      { q: 'Why are my names misspelled?', a: 'Use Ideogram for wedding stationery. Other models ruin names with kerning errors.' },
      { q: 'Best paper finish cue?', a: '"Fine paper texture" + "soft watercolor" + muted palette. These three = premium stationery.' },
      { q: 'How to choose color palette?', a: 'Two soft colors only. Pink+green, blue+gold, lavender+cream. Avoid high contrast.' }
    ]
  },

  // ===== 75. Ideogram - Tech Conference Banner =====
  {
    id: 'seed-tech-conference-ideogram',
    source: 'Civitai',
    sourceUrl: 'https://civitai.com/images/tech-conference',
    imageUrl: 'https://image.civitai.com/xG1nkqbyTM5Gq8cqwU6wmG3skAcQ/width=1024/tech-conference.webp',
    author: 'aigallery_demo',
    model: 'ideogram',
    originalPrompt: 'tech conference banner, modern, blue, geometric',
    originalNegativePrompt: 'vintage, organic, photo',
    originalParams: 'Ideogram 2.0, style Design',

    title: 'Tech Conference Banner (Ideogram)',
    slug: 'tech-conference-banner-ideogram',
    description: 'Modern tech conference banner for event marketing, social media ads, and SaaS landing pages.',

    rewrite_prompt: 'modern tech conference banner, gradient blue and purple background with abstract geometric shapes, large bold text "AI SUMMIT 2025" in white sans-serif, smaller text "San Francisco | Oct 15-17" below, clean modern tech aesthetic, professional event marketing --ar 16:9',
    rewrite_negative: 'vintage, organic, photo, busy, hand drawn',

    params_explained: [
      { param: 'Style: Design', why: 'Design style for tech marketing layouts.' }
    ],

    tutorial: {
      intro: 'Tech conference banner = event name + date + location + gradient + geometric. Specific details sell event tickets.',
      steps: [
        'Background: gradient blue and purple background with abstract geometric shapes — gradient + geometry.',
        'Title: large bold text "AI SUMMIT 2025" in white sans-serif — actual event name.',
        'Date: smaller text "San Francisco | Oct 15-17" below — city + dates.',
        'Aesthetic: clean modern tech aesthetic, professional event marketing — quality reference.'
      ],
      tips: 'Tech events: name + city + dates. Without city + dates, you get a generic tech poster.'
    },

    cross_model: {
      midjourney: 'MJ v6.1: "tech conference banner, AI SUMMIT 2025, blue purple --ar 16:9 --v 6.1 --s 500".',
      stable_diffusion: 'SDXL with controlnet. Use Ideogram for text.',
      flux: 'Flux is OK.',
      dall_e: 'DALL-E 3: "A modern tech conference banner with the text AI SUMMIT 2025, San Francisco Oct 15-17, blue and purple gradient".',
      jimeng_zh: '科技大会横幅，文字 "AI SUMMIT 2025"，旧金山，蓝紫渐变，几何背景。'
    },

    styles: ['minimalist', 'concept-art'],
    useCases: ['marketing', 'social-media', 'blog-header'],
    difficulty: 2,
    tags: ['banner', 'tech', 'conference', 'event', 'modern', 'ideogram'],
    faq: [
      { q: 'Why is my event name misspelled?', a: 'Ideogram is the most reliable for text. Use it for all event marketing visuals.' },
      { q: 'Best aspect ratio for event banners?', a: '16:9 for Twitter/LinkedIn. 9:16 for Instagram Stories. 1:1 for square ads.' },
      { q: 'How to make it look premium?', a: 'Gradient + geometric + sans-serif + city + dates. Five elements = premium tech event.' }
    ]
  },

  // ===== 76. Ideogram - Restaurant Sign =====
  {
    id: 'seed-restaurant-sign-ideogram',
    source: 'Civitai',
    sourceUrl: 'https://civitai.com/images/restaurant-sign',
    imageUrl: 'https://image.civitai.com/xG1nkqbyTM5Gq8cqwU6wmG3skAcQ/width=1024/restaurant-sign.webp',
    author: 'aigallery_demo',
    model: 'ideogram',
    originalPrompt: 'restaurant sign, neon, vintage, italian',
    originalNegativePrompt: 'modern, minimal, photo',
    originalParams: 'Ideogram 2.0, style Design',

    title: 'Italian Restaurant Neon Sign (Ideogram)',
    slug: 'italian-restaurant-neon-sign-ideogram',
    description: 'Vintage Italian restaurant neon sign design for branding mood boards, pizzeria marketing, and small business logos.',

    rewrite_prompt: 'vintage italian restaurant neon sign, glowing red and white neon tubes forming the text "MAMA MIA", surrounded by illustrated pizza slice and basil leaves, dark brick wall background, retro 1950s american-italian restaurant aesthetic, signage design --ar 4:5',
    rewrite_negative: 'modern, minimal, photo, clean',

    params_explained: [
      { param: 'Style: Design', why: 'Design style for signage layouts.' }
    ],

    tutorial: {
      intro: 'Restaurant sign = brand name in quotes + neon tube style + era reference + supporting graphic. Specific = authentic.',
      steps: [
        'Format: vintage italian restaurant neon sign, signage design — format.',
        'Text: glowing red and white neon tubes forming the text "MAMA MIA" — text in quotes + tube medium.',
        'Graphics: surrounded by illustrated pizza slice and basil leaves — supporting food graphics.',
        'Background: dark brick wall background — brick = restaurant context.',
        'Era: retro 1950s american-italian restaurant aesthetic — period reference.'
      ],
      tips: 'Restaurant sign formula: brand name (neon) + era (1950s/60s) + food graphic + brick background. Follow the formula.'
    },

    cross_model: {
      midjourney: 'MJ v6.1: "italian restaurant neon sign, MAMA MIA, 1950s --ar 4:5 --v 6.1 --s 700".',
      stable_diffusion: 'SDXL with controlnet. Use Ideogram for text.',
      flux: 'Flux is OK.',
      dall_e: 'DALL-E 3: "A vintage Italian restaurant neon sign reading MAMA MIA in glowing red and white neon, dark brick wall, 1950s aesthetic".',
      jimeng_zh: '意大利餐厅霓虹灯招牌，文字 "MAMA MIA"，披萨罗勒叶，砖墙背景，50 年代风。'
    },

    styles: ['vintage', 'poster', 'logo'],
    useCases: ['logo', 'marketing', 'social-media'],
    difficulty: 3,
    tags: ['restaurant', 'neon', 'sign', 'vintage', 'italian', 'ideogram'],
    faq: [
      { q: 'Why is my brand name misspelled?', a: 'Use Ideogram. Neon text especially needs accurate rendering for branding.' },
      { q: 'Best for small business branding?', a: '4:5 with brand name in neon + supporting graphic. Reads as "shopfront" instantly.' },
      { q: 'How to choose color?', a: 'Red = Italian/Chinese. Yellow = American diner. Green = healthy/vegan. Color = cuisine.' }
    ]
  },

  // ===== 77. DALL-E - Watercolor Botanical =====
  {
    id: 'seed-watercolor-botanical-dalle',
    source: 'Civitai',
    sourceUrl: 'https://civitai.com/images/watercolor-botanical',
    imageUrl: 'https://image.civitai.com/xG1nkqbyTM5Gq8cqwU6wmG3skAcQ/width=1024/watercolor-botanical-dalle.webp',
    author: 'aigallery_demo',
    model: 'dall-e',
    originalPrompt: 'watercolor botanical, flowers, soft, painting',
    originalNegativePrompt: 'photo, 3d, digital',
    originalParams: 'DALL-E 3, style Natural',

    title: 'Soft Watercolor Botanical (DALL-E)',
    slug: 'soft-watercolor-botanical-dalle',
    description: 'Soft watercolor botanical illustration using DALL-E 3. Use for greeting cards, plant shop branding, and calming content.',

    rewrite_prompt: 'A delicate watercolor painting of fresh eucalyptus branches with small white baby\'s breath flowers, soft green and white palette on cream textured paper, loose wet-on-wet technique, gentle natural sunlight, minimalist botanical art for a greeting card',
    rewrite_negative: 'photograph, 3d, digital art, harsh, busy',

    params_explained: [
      { param: 'Style: Natural', why: 'DALL-E 3 Natural style is more painterly than Vivid. Perfect for watercolor.' }
    ],

    tutorial: {
      intro: 'DALL-E 3 excels at natural language. Write prompts as full sentences, not keyword lists. "A watercolor painting of..." works better than "watercolor, painting, soft".',
      steps: [
        'Format: A delicate watercolor painting of fresh eucalyptus branches — full sentence + specific plant.',
        'Details: small white baby\'s breath flowers — secondary plant.',
        'Palette: soft green and white palette on cream textured paper — named colors + paper.',
        'Technique: loose wet-on-wet technique — named watercolor technique.',
        'Light: gentle natural sunlight — soft lighting.',
        'Use: minimalist botanical art for a greeting card — final use case.'
      ],
      tips: 'DALL-E 3 loves natural language. Write as a sentence describing the art, not a list of keywords.'
    },

    cross_model: {
      midjourney: 'MJ v6.1: "watercolor eucalyptus baby\'s breath, cream paper, greeting card --ar 1:1 --v 6.1 --s 600".',
      stable_diffusion: 'SDXL + Proteus, CFG 7, Steps 30.',
      flux: 'Flux handles watercolor well.',
      dall_e: 'DALL-E 3, style Natural. Same prompt as written.',
      jimeng_zh: '水彩植物画，桉树叶，满天星，奶油色纸面，柔和自然光。'
    },

    styles: ['watercolor', 'illustration', 'minimalist'],
    useCases: ['illustration', 'blog-header', 'marketing'],
    difficulty: 1,
    tags: ['watercolor', 'botanical', 'eucalyptus', 'floral', 'dalle', 'painting'],
    faq: [
      { q: 'Why does DALL-E make everything vivid?', a: 'Use style "Natural" not "Vivid". Vivid is for marketing; Natural is for fine art.' },
      { q: 'How to write DALL-E prompts?', a: 'Full natural sentences. "A painting of X with Y" works better than "X, Y, painting".' },
      { q: 'Best for greeting cards?', a: '1:1 with soft palette + named plants + paper texture. Prints at 4x6" perfectly.' }
    ]
  },

  // ===== 78. DALL-E - Minimal Vector Logo =====
  {
    id: 'seed-minimal-vector-dalle',
    source: 'Civitai',
    sourceUrl: 'https://civitai.com/images/minimal-vector',
    imageUrl: 'https://image.civitai.com/xG1nkqbyTM5Gq8cqwU6wmG3skAcQ/width=1024/minimal-vector-dalle.webp',
    author: 'aigallery_demo',
    model: 'dall-e',
    originalPrompt: 'minimal vector logo, geometric, modern, brand',
    originalNegativePrompt: 'photo, 3d, busy',
    originalParams: 'DALL-E 3, style Vivid',

    title: 'Minimal Vector Logo (DALL-E)',
    slug: 'minimal-vector-logo-dalle',
    description: 'Clean minimal vector logo for startup branding, indie SaaS, and design portfolios. DALL-E 3 Vivid style for crisp design.',

    rewrite_prompt: 'A modern minimal vector logo for a tech startup called "AURA", featuring a stylized letter A combined with a soft circular gradient shape in indigo and teal, clean geometric design, suitable for app icon and business card, isolated on white background',
    rewrite_negative: 'photograph, 3d render, busy, hand drawn',

    params_explained: [
      { param: 'Style: Vivid', why: 'Vivid style for clean graphic design. Better than Natural for logos.' }
    ],

    tutorial: {
      intro: 'DALL-E 3 + Vivid style = clean modern logo. Write as natural language with the brand name in quotes.',
      steps: [
        'Format: A modern minimal vector logo for a tech startup called "AURA" — format + brand name.',
        'Design: featuring a stylized letter A combined with a soft circular gradient shape — mark concept.',
        'Color: indigo and teal — named colors.',
        'Use: suitable for app icon and business card — use cases.',
        'Background: isolated on white background — clean background.'
      ],
      tips: 'For logos: Vivid style + brand name in quotes + use case ("app icon"). DALL-E renders all three well.'
    },

    cross_model: {
      midjourney: 'MJ v6.1: "minimal vector logo, AURA tech, indigo teal --ar 1:1 --v 6.1 --s 400".',
      stable_diffusion: 'SDXL + Proteus, CFG 7, Steps 25. Use Ideogram for text accuracy.',
      flux: 'Flux is OK.',
      dall_e: 'DALL-E 3, style Vivid. Same prompt as written.',
      jimeng_zh: '极简矢量 logo，科技初创 "AURA"，靛蓝青绿渐变，几何字母 A。'
    },

    styles: ['logo', 'minimalist'],
    useCases: ['logo', 'marketing', 'social-media'],
    difficulty: 2,
    tags: ['logo', 'vector', 'minimalist', 'tech', 'startup', 'dalle'],
    faq: [
      { q: 'Why is my brand name misspelled?', a: 'DALL-E 3 is much better than MJ/SDXL for text, but still not perfect. Verify before using.' },
      { q: 'Best for startup branding?', a: '1:1 + Vivid style + simple letter mark + named use case. Reads as "professional logo" instantly.' },
      { q: 'How to ensure scalability?', a: 'Vector in prompt + simple shapes. SDXL + Proteus gives best vector output.' }
    ]
  },

  // ===== 79. DALL-E - Editorial Photo Realistic =====
  {
    id: 'seed-editorial-photo-dalle',
    source: 'Civitai',
    sourceUrl: 'https://civitai.com/images/editorial-photo',
    imageUrl: 'https://image.civitai.com/xG1nkqbyTM5Gq8cqwU6wmG3skAcQ/width=1024/editorial-photo-dalle.webp',
    author: 'aigallery_demo',
    model: 'dall-e',
    originalPrompt: 'editorial photo, fashion, dramatic, magazine',
    originalNegativePrompt: 'casual, snapshot, amateur',
    originalParams: 'DALL-E 3, style Natural',

    title: 'Editorial Fashion Photo (DALL-E)',
    slug: 'editorial-fashion-photo-dalle',
    description: 'Editorial-quality fashion photograph from DALL-E 3 Natural style. Great for mood boards, lookbook layouts, and brand presentations.',

    rewrite_prompt: 'A high fashion editorial photograph of a model walking down a rainy paris street at night, wearing an oversized red trench coat, reflection in wet cobblestones, warm streetlight glow, shot on contax 645 with 80mm lens, kodak portra 400 film grain, candid street style',
    rewrite_negative: 'casual, snapshot, amateur, smiling, indoor',

    params_explained: [
      { param: 'Style: Natural', why: 'Natural style for editorial realism. Vivid is too saturated for fashion.' }
    ],

    tutorial: {
      intro: 'DALL-E 3 + Natural style + film stock = editorial fashion photo. The Natural style mimics film photography.',
      steps: [
        'Format: A high fashion editorial photograph of a model — full sentence + editorial context.',
        'Setting: walking down a rainy paris street at night — specific city + weather + time.',
        'Outfit: wearing an oversized red trench coat — specific garment.',
        'Reflection: reflection in wet cobblestones — wet surface for reflection.',
        'Light: warm streetlight glow — warm practical light.',
        'Camera: shot on contax 645 with 80mm lens, kodak portra 400 film grain — medium format + lens + film stock.'
      ],
      tips: 'DALL-E Natural style + "kodak portra" + specific camera = looks like a real fashion editorial photo.'
    },

    cross_model: {
      midjourney: 'MJ v6.1: "editorial fashion, model red trench, paris rain --ar 2:3 --v 6.1 --s 600".',
      stable_diffusion: 'SDXL + RealisticVision, CFG 6, Steps 30.',
      flux: 'Flux handles fashion well.',
      dall_e: 'DALL-E 3, style Natural. Same prompt.',
      jimeng_zh: '巴黎雨夜街拍，超大红风衣，湿鹅卵石倒影，街灯暖光，胶片颗粒。'
    },

    styles: ['realistic', 'photorealistic', 'vintage'],
    useCases: ['marketing', 'blog-header', 'social-media'],
    difficulty: 2,
    tags: ['editorial', 'fashion', 'paris', 'street', 'film', 'dalle'],
    faq: [
      { q: 'Why does my fashion photo look plastic?', a: 'You forgot the camera + film stock. "Contax 645" + "kodak portra" = real photo feel.' },
      { q: 'Best for fashion blog?', a: '2:3 vertical + named city + film reference. Reads as "editorial" instantly.' },
      { q: 'DALL-E vs MJ for fashion?', a: 'DALL-E Natural = more film-like. MJ v6.1 = more polished. Both work; DALL-E is cheaper.' }
    ]
  },

  // ===== 80. DALL-E - Collage Surreal =====
  {
    id: 'seed-collage-surreal-dalle',
    source: 'Civitai',
    sourceUrl: 'https://civitai.com/images/collage-surreal',
    imageUrl: 'https://image.civitai.com/xG1nkqbyTM5Gq8cqwU6wmG3skAcQ/width=1024/collage-surreal-dalle.webp',
    author: 'aigallery_demo',
    model: 'dall-e',
    originalPrompt: 'surreal collage, vintage photos, mixed media',
    originalNegativePrompt: 'modern, digital, clean',
    originalParams: 'DALL-E 3, style Vivid',

    title: 'Surreal Vintage Collage (DALL-E)',
    slug: 'surreal-vintage-collage-dalle',
    description: 'Surrealist mixed-media collage using vintage imagery. Popular for art prints, music album covers, and avant-garde fashion content.',

    rewrite_prompt: 'A surrealist mixed-media collage on aged paper, featuring a giant hand holding a tiny vintage city, floating clouds cut from old encyclopedia pages, classical sculpture faces combined with modern skyscrapers, dreamy impossible composition, romantic poet style with cut-and-paste edges',
    rewrite_negative: 'modern, digital, clean, photograph, perfect',

    params_explained: [
      { param: 'Style: Vivid', why: 'Vivid style brings out the surreal color contrast.' }
    ],

    tutorial: {
      intro: 'DALL-E 3 + Vivid + "surrealist collage" + "aged paper" = automatic art school aesthetic. DALL-E handles the cut-and-paste feel well.',
      steps: [
        'Format: A surrealist mixed-media collage on aged paper — format + surface.',
        'Subject 1: giant hand holding a tiny vintage city — scale contrast.',
        'Subject 2: floating clouds cut from old encyclopedia pages — mixed media source.',
        'Subject 3: classical sculpture faces combined with modern skyscrapers — historical + modern contrast.',
        'Composition: dreamy impossible composition, romantic poet style with cut-and-paste edges — style + edge treatment.'
      ],
      tips: 'Collage = scale contrast + mixed sources + visible cut edges. DALL-E Vivid style brings this out naturally.'
    },

    cross_model: {
      midjourney: 'MJ v6.1: "surrealist collage, hand holding city, encyclopedia --ar 1:1 --v 6.1 --s 850".',
      stable_diffusion: 'SDXL + Dreamshaper, CFG 7, Steps 30.',
      flux: 'Flux is OK. MJ often best for collage.',
      dall_e: 'DALL-E 3, style Vivid. Same prompt.',
      jimeng_zh: '超现实拼贴艺术，巨手握城市，剪贴画边缘，古典雕塑现代建筑，浪漫诗风。'
    },

    styles: ['illustration', 'vintage', 'concept-art'],
    useCases: ['illustration', 'blog-header', 'social-media'],
    difficulty: 3,
    tags: ['collage', 'surreal', 'vintage', 'mixed-media', 'dalle', 'art'],
    faq: [
      { q: 'Why does my collage look digital?', a: 'You forgot "cut-and-paste edges" + "aged paper" + specific mixed sources (encyclopedia pages).' },
      { q: 'Best for art prints?', a: '1:1 with high contrast. Prints well at 16x20" or larger for art prints.' },
      { q: 'How to make it feel handmade?', a: 'Name the source materials (encyclopedia, vintage photos, classical art). DALL-E renders the cut edges.' }
    ]
  },

  // ===== 81. Jimeng - Chinese Style Portrait =====
  {
    id: 'seed-chinese-portrait-jimeng',
    source: 'Civitai',
    sourceUrl: 'https://civitai.com/images/chinese-portrait',
    imageUrl: 'https://image.civitai.com/xG1nkqbyTM5Gq8cqwU6wmG3skAcQ/width=1024/chinese-portrait.webp',
    author: 'aigallery_demo',
    model: 'jimeng',
    originalPrompt: '中国风人像，汉服，传统，古典美女',
    originalNegativePrompt: '现代，西方，卡通',
    originalParams: 'Jimeng 3.0, style 古风',

    title: 'Chinese Hanfu Portrait (Jimeng)',
    slug: 'chinese-hanfu-portrait-jimeng',
    description: 'Traditional Chinese hanfu portrait using Jimeng AI. Perfect for Chinese cultural content, hanfu photography, and Asian history blogs.',

    rewrite_prompt: '古风汉服美女肖像，红色丝绸汉服，精致发髻配金色步摇，江南庭院背景，手持团扇，柔和自然光，工笔重彩风格，水墨晕染背景，中国传统美学',
    rewrite_negative: '现代服饰，西方风格，卡通，3D，照片',

    params_explained: [
      { param: 'Model: Jimeng 3.0', why: 'Jimeng (即梦) by ByteDance understands Chinese aesthetics deeply.' },
      { param: 'Style: 古风', why: '古风 (ancient style) preset renders traditional Chinese aesthetics.' }
    ],

    tutorial: {
      intro: 'Jimeng (即梦) is built by ByteDance specifically for Chinese aesthetics. Use Chinese phrases + named historical periods.',
      steps: [
        'Format: 古风汉服美女肖像 — Chinese phrase + hanfu context.',
        'Outfit: 红色丝绸汉服 — specific color + material.',
        'Hair: 精致发髻配金色步摇 — traditional hair + accessory.',
        'Background: 江南庭院背景 — Jiangnan garden = traditional setting.',
        'Prop: 手持团扇 — holding a fan = classical pose.',
        'Style: 工笔重彩风格，水墨晕染背景 — gongbi painting style + ink wash background.'
      ],
      tips: 'Jimeng loves Chinese cultural keywords: 工笔 (gongbi), 写意 (xieyi), 水墨 (ink wash), 江南 (Jiangnan). Use them freely.'
    },

    cross_model: {
      midjourney: 'MJ v6.1: "chinese hanfu portrait, red silk, jiangnan garden --ar 2:3 --v 6.1 --s 800".',
      stable_diffusion: 'SDXL + Dreamshaper with Chinese LoRA. Jimeng is best for Chinese style.',
      flux: 'Flux is OK for general Chinese aesthetic but Jimeng is best for traditional.',
      dall_e: 'DALL-E 3: "A traditional Chinese hanfu portrait of a woman in red silk, Jiangnan garden background, holding a fan, gongbi painting style".',
      jimeng_zh: '古风汉服美女肖像，红色丝绸汉服，精致发髻配金色步摇，江南庭院背景，手持团扇，柔和自然光，工笔重彩风格，水墨晕染背景，中国传统美学。'
    },

    styles: ['illustration', 'vintage', 'minimalist'],
    useCases: ['illustration', 'blog-header', 'social-media'],
    difficulty: 2,
    tags: ['chinese', 'hanfu', 'traditional', 'jimeng', 'cultural', 'portrait'],
    faq: [
      { q: 'Why does my Chinese portrait look generic Asian?', a: 'You forgot the specific era + named setting (Jiangnan) + traditional prop (fan). Specificity = authenticity.' },
      { q: 'How to make it look like a painting?', a: 'Use "工笔重彩" (gongbi) or "水墨" (ink wash). These are the two main Chinese painting styles.' },
      { q: 'Best for Chinese cultural content?', a: 'Jimeng with 古风 preset + Jiangnan/silk references. Reads as "Chinese culture" instantly.' }
    ]
  },

  // ===== 82. Jimeng - Chinese Architecture =====
  {
    id: 'seed-chinese-architecture-jimeng',
    source: 'Civitai',
    sourceUrl: 'https://civitai.com/images/chinese-architecture',
    imageUrl: 'https://image.civitai.com/xG1nkqbyTM5Gq8cqwU6wmG3skAcQ/width=1024/chinese-architecture.webp',
    author: 'aigallery_demo',
    model: 'jimeng',
    originalPrompt: '中国古建筑，宫殿，红墙，飞檐',
    originalNegativePrompt: '现代建筑，西方建筑，卡通',
    originalParams: 'Jimeng 3.0, style 写实',

    title: 'Chinese Forbidden City Architecture (Jimeng)',
    slug: 'chinese-forbidden-city-architecture-jimeng',
    description: 'Traditional Chinese palace architecture using Jimeng. Strong fit for Chinese travel content, history blogs, and Asian cultural marketing.',

    rewrite_prompt: '北京故宫太和殿特写，红色宫墙金色琉璃瓦，飞檐翘角细节可见，晴朗蓝天白云，游客小人在前景展现建筑宏伟，工笔建筑画风格，传统中国建筑美学',
    rewrite_negative: '现代建筑，西方建筑，卡通，3D，模糊',

    params_explained: [
      { param: 'Style: 写实', why: '写实 (realistic) preset for architectural photography.' }
    ],

    tutorial: {
      intro: 'Chinese architecture = named building + color palette (red + gold) + "工笔建筑画" (architectural painting) style. Jimeng handles it natively.',
      steps: [
        'Building: 北京故宫太和殿特写 — name the building + specific angle.',
        'Material: 红色宫墙金色琉璃瓦 — red walls + gold tiles = Forbidden City signature.',
        'Detail: 飞檐翘角细节可见 — flying eaves = traditional Chinese roof.',
        'Sky: 晴朗蓝天白云 — clear sky for color contrast.',
        'Scale: 游客小人在前景展现建筑宏伟 — tiny person for scale.',
        'Style: 工笔建筑画风格 — gongbi architectural painting style.'
      ],
      tips: 'Forbidden City = red walls + gold tiles + flying eaves. These three together = "Imperial China".'
    },

    cross_model: {
      midjourney: 'MJ v6.1: "forbidden city, red walls, gold tiles, flying eaves --ar 16:9 --v 6.1 --s 700".',
      stable_diffusion: 'SDXL + RealisticVision. Jimeng is best for Chinese architecture.',
      flux: 'Flux is OK.',
      dall_e: 'DALL-E 3: "A close-up of the Forbidden City Hall of Supreme Harmony, red walls, gold tiles, flying eaves, clear blue sky".',
      jimeng_zh: '北京故宫太和殿特写，红色宫墙金色琉璃瓦，飞檐翘角细节可见，晴朗蓝天白云，游客小人在前景展现建筑宏伟，工笔建筑画风格，传统中国建筑美学。'
    },

    styles: ['realistic', 'vintage'],
    useCases: ['blog-header', 'wallpaper', 'marketing'],
    difficulty: 2,
    tags: ['chinese', 'architecture', 'forbidden-city', 'palace', 'jimeng', 'traditional'],
    faq: [
      { q: 'Why does my Chinese building look like a generic temple?', a: 'You forgot "red walls" + "gold tiles" + "flying eaves". These three = Forbidden City specifically.' },
      { q: 'How to show scale?', a: 'Add "tourist small figure in foreground". Tiny person + giant building = immediate scale.' },
      { q: 'Best for Chinese travel content?', a: '16:9 with clear sky + named building + tiny figure. Reads as "travel China" instantly.' }
    ]
  }
];

function main() {
  console.log(`🌱 Seeding mock data (${MOCK_DATA.length} high-quality English entries)...\n`);
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
