export default {
  site: { name: 'AI Bild Inspiration' },
  nav: { home: 'Start', gallery: 'Galerie', tutorials: 'Tutorials', tools: 'Werkzeuge', blog: 'Blog' },
  home: {
    hero: {
      title: 'KI-Bildgenerierung Entdecken & Lernen',
      sub: 'Kuratierte Galerie mit vollständigen Prompts, Parameter-Erklärungen und Schritt-für-Schritt-Tutorials.',
      searchPlaceholder: 'Prompts, Stile, Modelle suchen...',
      searchBtn: 'Suchen',
      exploreGallery: 'Galerie erkunden',
      startLearning: 'Lernen starten'
    },
    models: { title: 'Nach Modell', sub: 'Jedes Modell hat Stärken.', prompts: 'Prompts' },
    featured: { title: 'Empfohlen', sub: 'Kuratierte Prompts.', viewAll: 'Alle ansehen →' },
    learn: { title: 'Wie benutzen' }
  },
  gallery: { title: 'Prompt-Galerie', sub: '{count} Prompts gefunden', empty: 'Keine Prompts gefunden.', resetFilter: 'Filter zurücksetzen' },
  filter: {
    searchPlaceholder: 'Stichwort suchen...',
    model: 'Modell', style: 'Stil', useCase: 'Verwendung', difficulty: 'Schwierigkeit', reset: 'Zurücksetzen',
    modelNames: {
      'midjourney': 'Midjourney', 'stable-diffusion': 'Stable Diffusion', 'flux': 'Flux',
      'dall-e': 'DALL-E', 'ideogram': 'Ideogram', 'jimeng': '即梦'
    },
    styleNames: {
      'realistic': 'Realistisch', 'illustration': 'Illustration', '3d': '3D', 'anime': 'Anime',
      'concept-art': 'Concept Art', 'poster': 'Poster', 'product': 'Produkt',
      'avatar': 'Avatar', 'wallpaper': 'Hintergrundbild', 'vintage': 'Vintage',
      'cyberpunk': 'Cyberpunk', 'photorealistic': 'Fotorealistisch',
      'minimalist': 'Minimalistisch', 'watercolor': 'Aquarell', 'oil-painting': 'Ölgemälde'
    },
    useCaseNames: {
      'ecommerce': 'E-Commerce', 'social-media': 'Social Media', 'blog-header': 'Blog-Header',
      'marketing': 'Marketing', 'avatar': 'Avatar', 'wallpaper': 'Hintergrundbild',
      'logo': 'Logo', 'product-shot': 'Produktfoto'
    }
  },
  detail: { sourceNote: 'Quelle: {site} · Autor {author}', prompt: 'Prompt', copy: 'Kopieren', tutorial: 'Tutorial', tips: 'Tipp', alternatives: 'Varianten', crossModel: 'Andere Modelle', faq: 'FAQ', related: 'Ähnlich' },
  tutorials: { title: 'Tutorials', sub: 'Schritt-für-Schritt-Anleitungen' },
  tools: { title: 'Werkzeugvergleich', sub: 'Vergleich der KI-Tools', col: { tool: 'Werkzeug', price: 'Preis', strength: 'Stärke', weakness: 'Schwäche', bestFor: 'Ideal für' } },
  blog: { title: 'Blog', sub: 'Artikel, Vergleiche, Anleitungen', backToList: 'Zurück zur Übersicht' },
  footer: { tagline: 'Kuratierte Galerie + Tutorial-Hub für KI-Bildgenerierung.', learn: 'Lernen', legal: 'Rechtliches', about: 'Über uns', privacy: 'Datenschutz', terms: 'AGB', disclaimer: 'Alle Prompts wurden mit Tutorials neu geschrieben.' },
  common: { loading: 'Lädt...' }
};
