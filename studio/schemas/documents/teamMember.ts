import { defineType } from 'sanity';

export const teamMember = defineType({
  name: 'teamMember',
  title: 'Team Member',
  type: 'document',
  icon: () => '👤',
  fields: [
    { name: 'isActive', type: 'boolean', title: 'Is Active?', description: 'Turn off to hide from the website.', initialValue: true },
    { name: 'name', type: 'string', validation: (Rule) => Rule.required() },
    { name: 'role', type: 'string' },
    {
      name: 'category',
      type: 'string',
      options: { list: [
        { title: 'Leadership', value: 'leadership' },
        { title: 'Board', value: 'board' },
      ], layout: 'radio' },
    },
    { name: 'photo', type: 'imageWithAlt' },
    { name: 'bio', type: 'text', rows: 10 },
    { name: 'order', type: 'number', title: 'Display Order' },
  ],
  orderings: [{ title: 'Display Order', name: 'order', by: [{ field: 'order', direction: 'asc' }] }],
  preview: {
    select: { title: 'name', subtitle: 'role', media: 'photo.image', isActive: 'isActive' },
    prepare({ title, subtitle, media, isActive }) {
      return { title: `${isActive ? '🟢' : '🔴'} ${title}`, subtitle, media };
    }
  },
});
