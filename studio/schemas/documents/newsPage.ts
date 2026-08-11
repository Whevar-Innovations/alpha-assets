import { defineType } from 'sanity';

export const newsPage = defineType({
  name: 'newsPage',
  title: 'News Page',
  type: 'document',
  icon: () => '📰',
  groups: [
    { name: 'seo', title: 'SEO', default: false },
    { name: 'hero', title: 'Hero Banner', default: true },
  ],
  fields: [
    { name: 'pageVisible', type: 'boolean', title: 'Page is Visible (Active)', initialValue: true },
    { name: 'seo', type: 'seo', group: 'seo' },
    { name: 'heroVisible', type: 'boolean', title: 'Show Hero Section', initialValue: true, group: 'hero' },
    { name: 'hero', type: 'heroBanner', group: 'hero' },
  ],
});
