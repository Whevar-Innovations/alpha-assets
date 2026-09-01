import { defineType } from 'sanity';

export const policyPage = defineType({
  name: 'policyPage',
  title: 'Policy Page',
  type: 'document',
  icon: () => '📄',
  fields: [
    { 
      name: 'title', 
      type: 'string', 
      title: 'Title',
      validation: (Rule) => Rule.required()
    },
    { 
      name: 'slug', 
      type: 'slug', 
      title: 'Slug', 
      options: { source: 'title' },
      validation: (Rule) => Rule.required()
    },
    { 
      name: 'lastUpdated', 
      type: 'date', 
      title: 'Last Updated Date',
      validation: (Rule) => Rule.required()
    },
    { 
      name: 'content', 
      type: 'richText', 
      title: 'Content',
      validation: (Rule) => Rule.required()
    },
  ],
});
