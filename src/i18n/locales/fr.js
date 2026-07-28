export default {
  site: { name: 'AI Image Inspiration' },
  nav: { home: 'Accueil', gallery: 'Galerie', tutorials: 'Tutoriels', tools: 'Outils', blog: 'Blog' },
  home: {
    hero: {
      title: 'Découvrez et Apprenez la Génération d\'Images IA',
      sub: 'Une galerie curated avec prompts complets, analyse des paramètres et tutoriels.',
      searchPlaceholder: 'Rechercher prompts, styles, modèles...',
      searchBtn: 'Rechercher',
      exploreGallery: 'Explorer la Galerie',
      startLearning: 'Commencer'
    },
    models: { title: 'Par Modèle', sub: 'Chaque modèle a ses forces.', prompts: 'prompts' },
    featured: { title: 'Sélection', sub: 'Prompts curated.', viewAll: 'Voir tout →' },
    learn: { title: 'Comment Utiliser' }
  },
  gallery: { title: 'Galerie de Prompts', sub: '{count} prompts trouvés', empty: 'Aucun prompt trouvé.', resetFilter: 'Réinitialiser' },
  filter: {
    searchPlaceholder: 'Recherche par mot-clé...',
    model: 'Modèle', style: 'Style', useCase: 'Usage', difficulty: 'Difficulté', reset: 'Réinitialiser',
    modelNames: {
      'midjourney': 'Midjourney', 'stable-diffusion': 'Stable Diffusion', 'flux': 'Flux',
      'dall-e': 'DALL-E', 'ideogram': 'Ideogram', 'jimeng': '即梦'
    },
    styleNames: {
      'realistic': 'Réaliste', 'illustration': 'Illustration', '3d': '3D', 'anime': 'Anime',
      'concept-art': 'Concept Art', 'poster': 'Affiche', 'product': 'Produit',
      'avatar': 'Avatar', 'wallpaper': 'Fond d\'écran', 'vintage': 'Vintage',
      'cyberpunk': 'Cyberpunk', 'photorealistic': 'Photoréaliste',
      'minimalist': 'Minimaliste', 'watercolor': 'Aquarelle', 'oil-painting': 'Peinture à l\'huile'
    },
    useCaseNames: {
      'ecommerce': 'E-commerce', 'social-media': 'Réseaux sociaux', 'blog-header': 'Bannière blog',
      'marketing': 'Marketing', 'avatar': 'Avatar', 'wallpaper': 'Fond d\'écran',
      'logo': 'Logo', 'product-shot': 'Photo produit'
    }
  },
  detail: { sourceNote: 'Source: {site} · Auteur {author}', prompt: 'Prompt', copy: 'Copier', tutorial: 'Tutoriel', tips: 'Astuce', alternatives: 'Variantes', crossModel: 'Autres Modèles', faq: 'FAQ', related: 'Similaires' },
  tutorials: { title: 'Tutoriels', sub: 'Guides étape par étape' },
  tools: { title: 'Comparaison d\'Outils', sub: 'Comparaison des outils', col: { tool: 'Outil', price: 'Prix', strength: 'Force', weakness: 'Faiblesse', bestFor: 'Idéal Pour' } },
  blog: { title: 'Blog', sub: 'Articles, comparaisons, guides', backToList: 'Retour aux articles' },
  footer: { tagline: 'Galerie et tutoriels pour la génération d\'images IA.', learn: 'Apprendre', legal: 'Légal', about: 'À propos', privacy: 'Confidentialité', terms: 'Conditions', disclaimer: 'Tous les prompts sont réécrits avec tutoriels.' },
  common: { loading: 'Chargement...' }
};
