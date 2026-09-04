import { defineType } from 'sanity';

export const strategyItem = defineType({
  name: 'strategyItem',
  title: 'Strategy Item',
  type: 'object',
  fields: [
    {
      name: 'title',
      type: 'string',
      title: 'Strategy Title',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'description',
      type: 'text',
      title: 'Strategy Description',
      rows: 5,
      validation: (Rule) => Rule.required(),
    },
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'description',
    },
  },
});
