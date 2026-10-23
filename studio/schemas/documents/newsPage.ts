import { defineType } from 'sanity';

export const newsPage = defineType({
  name: 'newsPage',
  title: 'News Page',
  type: 'document',
  icon: () => '📰',
  preview: {
    prepare() {
      return {
        title: 'News & Insights',
      };
    },
  },
  groups: [
    { name: 'seo', title: 'SEO', default: false },
    { name: 'hero', title: 'Page Header', default: true },
    { name: 'footerCta', title: 'Footer CTA' },
  ],
  fields: [
    { name: 'pageVisible', type: 'boolean', title: 'Page is Visible (Active)', initialValue: true },
    { name: 'seo', type: 'seo', group: 'seo' },
    { name: 'heroVisible', type: 'boolean', title: 'Show Page Header', initialValue: true, group: 'hero' },
    { name: 'hero', type: 'pageHeader', title: 'Page Header', group: 'hero' },

    // Footer CTA
    { name: 'footerCtaVisible', type: 'boolean', title: 'Show Footer CTA', initialValue: true, group: 'footerCta' },
    { name: 'footerCtaText', type: 'string', title: 'CTA Text', group: 'footerCta' },
    { name: 'footerCtaBoldText', type: 'string', title: 'Bold Text', group: 'footerCta' },
    { name: 'footerCtaButton', type: 'ctaButton', group: 'footerCta' },
  ],
});
