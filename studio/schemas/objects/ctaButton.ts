import { defineType } from 'sanity';

export const ctaButton = defineType({
  name: 'ctaButton',
  title: 'CTA Button',
  type: 'object',
  fields: [
    { name: 'label', type: 'string', title: 'Button Text' },
    {
      name: 'linkType',
      type: 'string',
      title: 'Link Type',
      options: { list: ['internal', 'external', 'none'], layout: 'radio' },
      initialValue: 'internal',
    },
    { name: 'url', type: 'string', title: 'URL / Path', description: 'e.g. /contact or https://...' },
    {
      name: 'variant',
      type: 'string',
      title: 'Style',
      options: { list: ['primary', 'white', 'secondary', 'outline'] },
      initialValue: 'primary',
    },
    { name: 'isVisible', type: 'boolean', title: 'Show Button', initialValue: true },
  ],
  preview: {
    select: { title: 'label', subtitle: 'variant' },
  },
});
