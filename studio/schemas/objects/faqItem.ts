import { defineType } from 'sanity';

export const faqItem = defineType({
  name: 'faqItem',
  title: 'FAQ Item',
  type: 'object',
  fields: [
    { name: 'question', type: 'string', title: 'Question', validation: (Rule) => Rule.required() },
    { name: 'answer', type: 'text', title: 'Answer', rows: 4, validation: (Rule) => Rule.required() },
    { name: 'isVisible', type: 'boolean', title: 'Visible on Website', initialValue: true },
  ],
  preview: {
    select: { title: 'question', isVisible: 'isVisible' },
    prepare({ title, isVisible }) {
      return { title: `${isVisible !== false ? '🟢' : '🔴'} ${title ?? ''}` };
    }
  },
});
