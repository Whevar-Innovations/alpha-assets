import { defineType } from 'sanity';

export const author = defineType({
  name: 'author',
  title: 'Author',
  type: 'document',
  icon: () => '✍️',
  fields: [
    { name: 'name', type: 'string', validation: (Rule) => Rule.required() },
    { name: 'role', type: 'string', title: 'Title / Role' },
    { name: 'photo', type: 'imageWithAlt' },
    { name: 'bio', type: 'text', rows: 4 },
  ],
  preview: {
    select: { title: 'name', subtitle: 'role', media: 'photo.image' },
  },
});
