import { defineType } from 'sanity';

export const featureItem = defineType({
  name: 'featureItem',
  title: 'Feature Item',
  type: 'object',
  fields: [
    { name: 'title', type: 'string', title: 'Title', validation: (Rule) => Rule.required() },
    { name: 'description', type: 'text', title: 'Description', rows: 3, validation: (Rule) => Rule.required() },
    { name: 'icon', type: 'iconPicker', title: 'Icon' },
    { name: 'isVisible', type: 'boolean', title: 'Visible on Website', initialValue: true },
  ],
  preview: {
    select: { title: 'title', subtitle: 'description', isVisible: 'isVisible' },
    prepare({ title, subtitle, isVisible }) {
      return { title: `${isVisible !== false ? '🟢' : '🔴'} ${title ?? ''}`, subtitle };
    }
  },
});
