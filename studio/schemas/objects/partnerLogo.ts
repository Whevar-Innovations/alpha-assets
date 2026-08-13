import { defineType } from 'sanity';

export const partnerLogo = defineType({
  name: 'partnerLogo',
  title: 'Partner Logo',
  type: 'object',
  fields: [
    { name: 'name', type: 'string', title: 'Partner Name', validation: (Rule) => Rule.required() },
    { name: 'logo', type: 'imageWithAlt', title: 'Logo Image' },
    { name: 'url', type: 'url', title: 'Website URL' },
    { name: 'isVisible', type: 'boolean', title: 'Visible on Website', initialValue: true },
  ],
  preview: {
    select: { title: 'name', media: 'logo.image', isVisible: 'isVisible' },
    prepare({ title, media, isVisible }) {
      return { title: `${isVisible !== false ? '🟢' : '🔴'} ${title ?? ''}`, media };
    }
  },
});
