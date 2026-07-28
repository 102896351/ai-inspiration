export default {
  site: { name: 'Inspiración de Imágenes IA' },
  nav: { home: 'Inicio', gallery: 'Galería', tutorials: 'Tutoriales', tools: 'Herramientas', blog: 'Blog' },
  home: {
    hero: {
      title: 'Descubre y Aprende Generación de Imágenes con IA',
      sub: 'Galería curada con prompts completos, análisis de parámetros y tutoriales paso a paso.',
      searchPlaceholder: 'Buscar prompts, estilos, modelos...',
      searchBtn: 'Buscar',
      exploreGallery: 'Explorar Galería',
      startLearning: 'Empezar a Aprender'
    },
    models: { title: 'Por Modelo', sub: 'Cada modelo tiene sus fortalezas.', prompts: 'prompts' },
    featured: { title: 'Destacados', sub: 'Prompts seleccionados.', viewAll: 'Ver todo →' },
    learn: { title: 'Cómo Usar' }
  },
  gallery: { title: 'Galería de Prompts', sub: '{count} prompts encontrados', empty: 'No se encontraron prompts.', resetFilter: 'Restablecer filtros' },
  filter: {
    searchPlaceholder: 'Buscar por palabra clave...',
    model: 'Modelo', style: 'Estilo', useCase: 'Uso', difficulty: 'Dificultad', reset: 'Restablecer',
    modelNames: {
      'midjourney': 'Midjourney', 'stable-diffusion': 'Stable Diffusion', 'flux': 'Flux',
      'dall-e': 'DALL-E', 'ideogram': 'Ideogram', 'jimeng': '即梦'
    },
    styleNames: {
      'realistic': 'Realista', 'illustration': 'Ilustración', '3d': '3D', 'anime': 'Anime',
      'concept-art': 'Concept Art', 'poster': 'Póster', 'product': 'Producto',
      'avatar': 'Avatar', 'wallpaper': 'Fondo de pantalla', 'vintage': 'Vintage',
      'cyberpunk': 'Cyberpunk', 'photorealistic': 'Fotorrealista',
      'minimalist': 'Minimalista', 'watercolor': 'Acuarela', 'oil-painting': 'Pintura al óleo'
    },
    useCaseNames: {
      'ecommerce': 'E-commerce', 'social-media': 'Redes sociales', 'blog-header': 'Cabecera de blog',
      'marketing': 'Marketing', 'avatar': 'Avatar', 'wallpaper': 'Fondo de pantalla',
      'logo': 'Logo', 'product-shot': 'Foto de producto'
    }
  },
  detail: { sourceNote: 'Fuente: {site} · Autor {author}', prompt: 'Prompt', copy: 'Copiar', tutorial: 'Tutorial', tips: 'Consejo', alternatives: 'Variantes', crossModel: 'Otros Modelos', faq: 'FAQ', related: 'Relacionados' },
  tutorials: { title: 'Tutoriales', sub: 'Guías paso a paso' },
  tools: { title: 'Comparación de Herramientas', sub: 'Comparación honesta', col: { tool: 'Herramienta', price: 'Precio', strength: 'Fortaleza', weakness: 'Debilidad', bestFor: 'Ideal Para' } },
  blog: { title: 'Blog', sub: 'Artículos, comparaciones, guías', backToList: 'Volver a artículos' },
  footer: { tagline: 'Galería curada + centro de tutoriales para generación de imágenes IA.', learn: 'Aprender', legal: 'Legal', about: 'Acerca de', privacy: 'Privacidad', terms: 'Términos', disclaimer: 'Todos los prompts han sido reescritos con tutoriales.' },
  common: { loading: 'Cargando...' }
};
