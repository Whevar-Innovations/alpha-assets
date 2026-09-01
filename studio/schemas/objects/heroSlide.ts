import { defineType } from 'sanity';

export const heroSlide = defineType({
  name: 'heroSlide',
  title: 'Hero Slide',
  type: 'object',
  fields: [
    { name: 'heading', type: 'text', title: 'Heading', rows: 2, description: 'Main headline (plain text, no highlight)' },
    { name: 'highlightText', type: 'string', title: 'Highlighted Text', description: 'Shown below heading in green accent' },
    { name: 'subtext', type: 'text', title: 'Subtext / Description', rows: 3 },
    { name: 'backgroundImage', type: 'imageWithAlt', title: 'Background Image' },
    {
      name: 'ctaButtons',
      type: 'array',
      title: 'CTA Buttons',
      of: [{ type: 'ctaButton' }],
      validation: (Rule) => Rule.max(2),
      description: 'Up to 2 buttons per slide',
    },
  ],
  preview: {
    select: {
      title: 'heading',
      subtitle: 'highlightText',
      media: 'backgroundImage.image',
    },
    prepare({ title, subtitle, media }) {
      return {
        title: title ?? 'Untitled Slide',
        subtitle: subtitle ?? '',
        media,
      };
    },
  },
});
