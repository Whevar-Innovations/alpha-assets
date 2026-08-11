import { defineType } from 'sanity';

export const heroBanner = defineType({
  name: 'heroBanner',
  title: 'Hero Banner',
  type: 'object',
  fields: [
    { name: 'heading', type: 'text', title: 'Heading', rows: 2 },
    { name: 'highlightText', type: 'string', title: 'Highlighted Text (green accent)' },
    { name: 'subtext', type: 'text', title: 'Subtext', rows: 2 },
    { name: 'backgroundImage', type: 'imageWithAlt', title: 'Background Image' },
    {
      name: 'ctaButtons',
      type: 'array',
      title: 'Call-to-Action Buttons',
      of: [{ type: 'ctaButton' }],
      validation: (Rule) => Rule.max(3),
    },
  ],
});
