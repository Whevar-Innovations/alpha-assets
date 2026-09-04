import { defineType } from 'sanity';

export const aboutPage = defineType({
  name: 'aboutPage',
  title: 'About Page',
  type: 'document',
  icon: () => '📄',
  preview: {
    prepare() {
      return {
        title: 'About Page',
      };
    },
  },
  groups: [
    { name: 'seo', title: 'SEO', default: false },
    { name: 'hero', title: 'Page Header', default: true },
    { name: 'intro', title: 'Intro Section' },
    { name: 'videoFeatures', title: 'Video Features' },
    { name: 'quote', title: 'Quote Section' },
    { name: 'coreValues', title: 'Core Values' },
    { name: 'committee', title: 'Investment Committee' },
    { name: 'team', title: 'Team Section' },
  ],
  fields: [
    { name: 'pageVisible', type: 'boolean', title: 'Page is Visible (Active)', initialValue: true },
    { name: 'seo', type: 'seo', group: 'seo' },

    // Page Header
    { name: 'heroVisible', type: 'boolean', title: 'Show Page Header', initialValue: true, group: 'hero' },
    { name: 'hero', type: 'pageHeader', title: 'Page Header', group: 'hero' },

    // Intro
    { name: 'introVisible', type: 'boolean', title: 'Show Intro Section', initialValue: true, group: 'intro' },
    { name: 'introHeading', type: 'text', title: 'Intro Heading', rows: 2, group: 'intro' },
    { name: 'introParagraphs', type: 'array', of: [{ type: 'block' }], title: 'Intro Paragraphs', group: 'intro' },

    // Video Features (After Who We Are)
    { name: 'videoFeaturesVisible', type: 'boolean', title: 'Show Video Section', initialValue: true, group: 'videoFeatures' },
    {
      name: 'videoFeatures',
      type: 'array',
      title: 'Video Items',
      description: 'Add one or more videos for the About Us page. A single video renders as a featured panel; multiple entries become a carousel.',
      of: [{ type: 'videoFeature' }],
      group: 'videoFeatures',
    },

    // Quote
    { name: 'quoteVisible', type: 'boolean', title: 'Show Quote Section', initialValue: true, group: 'quote' },
    { name: 'quoteLeftImage', type: 'imageWithAlt', title: 'Left Image', group: 'quote' },
    { name: 'quoteText', type: 'text', title: 'Quote Text', rows: 3, group: 'quote' },
    { name: 'quoteAuthor', type: 'string', title: 'Quote Author', group: 'quote' },
    { name: 'quoteAuthorTitle', type: 'string', title: 'Author Title', group: 'quote' },
    { name: 'quoteRightImage', type: 'imageWithAlt', title: 'Right Image', group: 'quote' },

    // Core Values
    { name: 'coreValuesVisible', type: 'boolean', title: 'Show Core Values', initialValue: true, group: 'coreValues' },
    { name: 'coreValuesSubtitle', type: 'string', title: 'Subtitle', group: 'coreValues' },
    { name: 'coreValuesHeading', type: 'text', title: 'Heading', rows: 2, group: 'coreValues' },
    { name: 'coreValues', type: 'array', of: [{ type: 'coreValueItem' }], title: 'Values', group: 'coreValues' },

    // Investment Committee
    { name: 'committeeVisible', type: 'boolean', title: 'Show Investment Committee Section', initialValue: true, group: 'committee' },
    { name: 'committeeHeading', type: 'string', title: 'Heading', group: 'committee' },
    { name: 'committeeText', type: 'array', of: [{ type: 'block' }], title: 'Text', group: 'committee' },

    // Team
    { name: 'teamVisible', type: 'boolean', title: 'Show Team Section', initialValue: true, group: 'team' },
    { name: 'teamSubtitle', type: 'string', title: 'Subtitle', group: 'team' },
    { name: 'teamHeading', type: 'text', title: 'Heading', rows: 2, group: 'team' },
    {
      name: 'teamMembers',
      type: 'array',
      title: 'Team Members to Display',
      description: 'Add references to Team Member documents. Members with "Is Active?" turned off are automatically hidden.',
      of: [{ type: 'reference', to: [{ type: 'teamMember' }] }],
      group: 'team',
    },
  ],
});
