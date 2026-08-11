import { defineType } from 'sanity';

export const seo = defineType({
  name: 'seo',
  title: 'SEO Settings',
  type: 'object',
  fields: [
    {
      name: 'metaTitle',
      type: 'string',
      title: 'Page Title',
      description: 'Appears in browser tab and search results (50-60 chars ideal)',
    },
    {
      name: 'metaDescription',
      type: 'text',
      title: 'Meta Description',
      rows: 3,
      description: 'Appears in search result snippets (max 160 chars)',
      validation: (Rule) => Rule.max(160),
    },
    {
      name: 'ogImage',
      type: 'image',
      title: 'Social Share Image',
      description: 'Image shown when shared on social media (1200×630 recommended)',
    },
  ],
});
