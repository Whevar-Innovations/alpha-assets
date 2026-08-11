import { defineType } from 'sanity';

export const aboutPage = defineType({
  name: 'aboutPage',
  title: 'About Page',
  type: 'document',
  icon: () => '📄',
  groups: [
    { name: 'seo', title: 'SEO', default: false },
    { name: 'hero', title: 'Hero Banner', default: true },
    { name: 'intro', title: 'Intro Section' },
    { name: 'quote', title: 'Quote Section' },
    { name: 'coreValues', title: 'Core Values' },
    { name: 'team', title: 'Team Section' },
  ],
  fields: [
    { name: 'pageVisible', type: 'boolean', title: 'Page is Visible (Active)', initialValue: true },
    { name: 'seo', type: 'seo', group: 'seo' },
    { name: 'heroVisible', type: 'boolean', title: 'Show Hero Section', initialValue: true, group: 'hero' },
    { name: 'hero', type: 'heroBanner', group: 'hero' },
    
    // Intro
    { name: 'introVisible', type: 'boolean', title: 'Show Intro Section', initialValue: true, group: 'intro' },
    { name: 'introHeading', type: 'text', title: 'Intro Heading', rows: 2, group: 'intro' },
    { name: 'introParagraphs', type: 'array', of: [{ type: 'block' }], title: 'Intro Paragraphs', group: 'intro' },
    
    // Quote
    { name: 'quoteVisible', type: 'boolean', title: 'Show Quote Section', initialValue: true, group: 'quote' },
    { name: 'quoteText', type: 'text', title: 'Quote Text', rows: 3, group: 'quote' },
    { name: 'quoteAuthor', type: 'string', title: 'Quote Author', group: 'quote' },
    { name: 'quoteAuthorTitle', type: 'string', title: 'Author Title', group: 'quote' },
    
    // Core Values
    { name: 'coreValuesVisible', type: 'boolean', title: 'Show Core Values', initialValue: true, group: 'coreValues' },
    { name: 'coreValuesSubtitle', type: 'string', title: 'Subtitle', group: 'coreValues' },
    { name: 'coreValuesHeading', type: 'text', title: 'Heading', rows: 2, group: 'coreValues' },
    { name: 'coreValues', type: 'array', of: [{ type: 'coreValueItem' }], title: 'Values', group: 'coreValues' },
    
    // Team
    { name: 'teamVisible', type: 'boolean', title: 'Show Team Section', initialValue: true, group: 'team' },
    { name: 'teamSubtitle', type: 'string', title: 'Subtitle', group: 'team' },
    { name: 'teamHeading', type: 'text', title: 'Heading', rows: 2, group: 'team' },
    {
      name: 'teamMembers',
      type: 'array',
      title: 'Team Members to Display',
      of: [{ type: 'reference', to: [{ type: 'teamMember' }] }],
      group: 'team',
    },
  ],
});
