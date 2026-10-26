import { defineType } from 'sanity';

export const articleCategory = defineType({
  name: 'articleCategory',
  title: 'Article Category',
  type: 'document',
  icon: () => '🏷️',
  fields: [
    {
      name: 'isActive',
      type: 'boolean',
      title: 'Is Active?',
      description: 'Turn off to hide this category from filter tabs on the website.',
      initialValue: true,
    },
    {
      name: 'title',
      type: 'string',
      title: 'Category Name',
      description: 'e.g. "Market Update", "Investment Advice", "Company News"',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'slug',
      type: 'slug',
      title: 'Slug',
      options: { source: 'title', maxLength: 96 },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'description',
      type: 'text',
      title: 'Description (Optional)',
      rows: 2,
    },
    {
      name: 'order',
      type: 'number',
      title: 'Display Order',
      description: 'Controls the order of category filter buttons on the News & Insights page.',
      initialValue: 1,
    },
  ],
  orderings: [
    {
      title: 'Display Order',
      name: 'orderAsc',
      by: [
        { field: 'order', direction: 'asc' },
        { field: 'title', direction: 'asc' },
      ],
    },
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'description',
      isActive: 'isActive',
    },
    prepare({ title, subtitle, isActive }) {
      return {
        title: `${isActive !== false ? '🟢' : '🔴'} ${title ?? 'Untitled Category'}`,
        subtitle: subtitle ?? 'Article Category',
      };
    },
  },
});
