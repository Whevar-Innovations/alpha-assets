import { defineType } from 'sanity';

export const navItem = defineType({
  name: 'navItem',
  title: 'Navigation Item',
  type: 'object',
  fields: [
    { name: 'label', type: 'string', title: 'Label', validation: (Rule) => Rule.required() },
    { name: 'path', type: 'string', title: 'Path', description: 'e.g. /about', validation: (Rule) => Rule.required() },
    { name: 'isDisabled', type: 'boolean', title: 'Is Disabled (Coming Soon)', initialValue: false },
    { name: 'order', type: 'number', title: 'Display Order' },
  ],
  preview: {
    select: { title: 'label', subtitle: 'path' },
  },
});
