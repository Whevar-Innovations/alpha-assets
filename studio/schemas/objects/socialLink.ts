import { defineType } from 'sanity';

export const socialLink = defineType({
  name: 'socialLink',
  title: 'Social Link',
  type: 'object',
  fields: [
    { 
      name: 'platform', 
      type: 'string', 
      title: 'Platform',
      options: { list: ['Facebook', 'X', 'LinkedIn', 'Instagram', 'YouTube'] },
      validation: (Rule) => Rule.required()
    },
    { name: 'url', type: 'url', title: 'URL', validation: (Rule) => Rule.required() },
    { name: 'isVisible', type: 'boolean', title: 'Visible on Website', initialValue: true },
  ],
  preview: {
    select: { title: 'platform', subtitle: 'url', isVisible: 'isVisible' },
    prepare({ title, subtitle, isVisible }) {
      return { title: `${isVisible !== false ? '🟢' : '🔴'} ${title ?? ''}`, subtitle };
    }
  },
});
