import { defineType } from 'sanity';

export const featureItem = defineType({
  name: 'featureItem',
  title: 'Feature Item',
  type: 'object',
  fields: [
    { name: 'title', type: 'string', title: 'Title', validation: (Rule) => Rule.required() },
    { name: 'description', type: 'text', title: 'Description', rows: 3, validation: (Rule) => Rule.required() },
    { name: 'iconName', type: 'string', title: 'Lucide Icon Name', description: 'e.g. Compass, ShieldCheck, Eye' },
  ],
  preview: {
    select: { title: 'title', subtitle: 'description' },
  },
});
