import { defineType } from 'sanity';

export const service = defineType({
  name: 'service',
  title: 'Investment Service',
  type: 'document',
  icon: () => '💼',
  groups: [
    { name: 'settings', title: 'Settings', default: true },
    { name: 'card', title: 'Card Display' },
    { name: 'detail', title: 'Detail Page' },
  ],
  fields: [
    { name: 'isActive', type: 'boolean', title: 'Is Active?', description: 'Turn off to hide from the website.', initialValue: true, group: 'settings' },
    // Card fields
    { name: 'title', type: 'string', validation: (Rule) => Rule.required(), group: 'card' },
    { name: 'slug', type: 'slug', options: { source: 'title' }, validation: (Rule) => Rule.required(), group: 'card' },
    { name: 'shortDescription', type: 'text', title: 'Card Description', rows: 3, group: 'card' },
    { name: 'iconName', type: 'string', title: 'Lucide Icon Name', description: 'e.g. Sliders, Users, Coins, Building2, Layers, PiggyBank', group: 'card' },
    { name: 'order', type: 'number', title: 'Display Order', group: 'settings' },

    // Detail page fields
    { name: 'category', type: 'string', initialValue: 'OUR SERVICES', group: 'detail' },
    { name: 'detailHeading', type: 'string', title: 'Detail Page Heading', group: 'detail' },
    { name: 'description1', type: 'text', title: 'First Paragraph', rows: 4, group: 'detail' },
    { name: 'description2', type: 'text', title: 'Second Paragraph', rows: 6, group: 'detail' },
    { name: 'detailImage', type: 'imageWithAlt', title: 'Detail Page Image', group: 'detail' },
    { name: 'bulletsTitle', type: 'string', title: 'Bullet List Heading', group: 'detail' },
    { name: 'bullets', type: 'array', of: [{ type: 'string' }], title: 'Key Features', group: 'detail' },
    { name: 'factsheet', type: 'file', title: 'Factsheet PDF', group: 'detail' },
  ],
  orderings: [{ title: 'Display Order', name: 'order', by: [{ field: 'order', direction: 'asc' }] }],
  preview: {
    select: { title: 'title', subtitle: 'shortDescription', isActive: 'isActive' },
    prepare({ title, subtitle, isActive }) {
      return { title: `${isActive ? '🟢' : '🔴'} ${title}`, subtitle };
    }
  },
});
