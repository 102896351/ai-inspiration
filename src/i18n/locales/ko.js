export default {
  site: { name: 'AI 이미지 영감' },
  nav: { home: '홈', gallery: '갤러리', tutorials: '튜토리얼', tools: '도구', blog: '블로그' },
  home: {
    hero: {
      title: 'AI 이미지 생성 발견 및 학습',
      sub: '프롬프트, 매개변수 분석, 단계별 튜토리얼이 포함된 큐레이션 갤러리.',
      searchPlaceholder: '프롬프트, 스타일, 모델 검색...',
      searchBtn: '검색',
      exploreGallery: '갤러리 탐색',
      startLearning: '학습 시작'
    },
    models: { title: '모델별', sub: '각 모델에는 고유한 강점이 있습니다.', prompts: '개' },
    featured: { title: '추천', sub: '큐레이션된 프롬프트.', viewAll: '전체 보기 →' },
    learn: { title: '사용 방법' }
  },
  gallery: { title: '프롬프트 갤러리', sub: '{count}개 발견', empty: '일치하는 프롬프트가 없습니다.', resetFilter: '필터 재설정' },
  filter: {
    searchPlaceholder: '키워드 검색...',
    model: '모델', style: '스타일', useCase: '용도', difficulty: '난이도', reset: '재설정',
    modelNames: {
      'midjourney': 'Midjourney', 'stable-diffusion': 'Stable Diffusion', 'flux': 'Flux',
      'dall-e': 'DALL-E', 'ideogram': 'Ideogram', 'jimeng': '即梦'
    },
    styleNames: {
      'realistic': '사실적', 'illustration': '일러스트', '3d': '3D', 'anime': '애니메이션',
      'concept-art': '컨셉 아트', 'poster': '포스터', 'product': '제품',
      'avatar': '아바타', 'wallpaper': '배경화면', 'vintage': '빈티지',
      'cyberpunk': '사이버펑크', 'photorealistic': '포토리얼',
      'minimalist': '미니멀', 'watercolor': '수채화', 'oil-painting': '유화'
    },
    useCaseNames: {
      'ecommerce': '전자상거래', 'social-media': '소셜 미디어', 'blog-header': '블로그 헤더',
      'marketing': '마케팅', 'avatar': '아바타', 'wallpaper': '배경화면',
      'logo': '로고', 'product-shot': '제품 사진'
    }
  },
  detail: { sourceNote: '출처: {site} · 작성자 {author}', prompt: '프롬프트', copy: '복사', tutorial: '튜토리얼', tips: '팁', alternatives: '대안', crossModel: '다른 모델', faq: 'FAQ', related: '관련' },
  tutorials: { title: '튜토리얼', sub: '단계별 가이드' },
  tools: { title: '도구 비교', sub: '주요 AI 이미지 생성 도구 비교', col: { tool: '도구', price: '가격', strength: '강점', weakness: '약점', bestFor: '추천' } },
  blog: { title: '블로그', sub: '심층 기사, 비교, 가이드', backToList: '목록으로 돌아가기' },
  footer: { tagline: 'AI 이미지 생성을 위한 큐레이션 갤러리 + 튜토리얼 허브.', learn: '학습', legal: '법적', about: '소개', privacy: '개인정보', terms: '약관', disclaimer: '모든 프롬프트는 튜토리얼용으로 다시 작성되었습니다.' },
  common: { loading: '로딩 중...' }
};
