import { defineType } from 'sanity';

export const article = defineType({
  name: 'article',
  title: 'Article',
  type: 'document',
  icon: () => '📰',
  groups: [
    { name: 'settings', title: 'Settings' },
    { name: 'content', title: 'Content', default: true },
    { name: 'meta', title: 'Metadata' },
    { name: 'seo', title: 'SEO' },
  ],
  fields: [
    { name: 'isActive', type: 'boolean', title: 'Is Active?', description: 'Turn off to hide from the website.', initialValue: true, group: 'settings' },
    { name: 'isFeatured', type: 'boolean', title: '⭐ Featured Article', description: 'Show this article in the featured banner carousel on the News & Insights page.', initialValue: false, group: 'settings' },
    // Content
    { name: 'title', type: 'string', validation: (Rule) => Rule.required(), group: 'content' },
    { name: 'slug', type: 'slug', options: { source: 'title' }, validation: (Rule) => Rule.required(), group: 'content' },
    { name: 'excerpt', type: 'text', title: 'Excerpt / Summary', rows: 3, group: 'content',
      description: 'Short summary shown on article cards' },
    {
      name: 'coverImage',
      type: 'imageWithAlt',
      title: 'Cover Image',
      group: 'content',
    },
    {
      name: 'body',
      type: 'richText',
      title: 'Article Body',
      group: 'content',
    },

    // Metadata
    {
      name: 'author',
      type: 'reference',
      to: [{ type: 'author' }],
      group: 'meta',
    },
    {
      name: 'category',
      type: 'string',
      title: 'Category',
      options: {
        list: [
          { title: 'Market Update', value: 'Market Update' },
          { title: 'Investment Advice', value: 'Investment Advice' },
          { title: 'Company News', value: 'Company News' },
        ],
      },
      group: 'meta',
    },
    { name: 'publishedAt', type: 'datetime', title: 'Published Date', group: 'meta' },
    { name: 'readTime', type: 'string', title: 'Read Time', description: 'e.g. "6 min read"', group: 'meta' },

    // SEO
    { name: 'seo', type: 'seo', group: 'seo' },
  ],
  orderings: [
    { title: 'Published Date (Newest)', name: 'publishedDesc', by: [{ field: 'publishedAt', direction: 'desc' }] },
  ],
  preview: {
    select: { title: 'title', subtitle: 'category', media: 'coverImage.image', isActive: 'isActive' },
    prepare({ title, subtitle, media, isActive }) {
      return { title: `${isActive ? '🟢' : '🔴'} ${title}`, subtitle, media };
    }
  },
});
