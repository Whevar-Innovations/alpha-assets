import type { NewsPageData } from '../../types';

export const newsDefaults: NewsPageData = {
  seo: { metaTitle: '', metaDescription: '', ogImage: undefined },
  pageVisible: true,
  heroVisible: true,
  hero: {
    heading: 'News & Insights',
    highlightText: '',
    subtext: '',
  }
};
