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
