import { defineType } from 'sanity';

export const footerLink = defineType({
  name: 'footerLink',
  title: 'Footer Link',
  type: 'object',
  fields: [
    { name: 'label', type: 'string', title: 'Label', validation: (Rule) => Rule.required() },
    {
      name: 'linkType',
      type: 'string',
      title: 'Link Type',
      options: { 
        list: [
          { title: 'Internal Page', value: 'internal' },
          { title: 'Custom Path / Section Link', value: 'custom' },
          { title: 'Downloadable File (PDF / Document)', value: 'file' },
          { title: 'External URL', value: 'external' },
          { title: 'Text Only (Disabled / Coming Soon)', value: 'none' }
        ], 
        layout: 'radio' 
      },
      initialValue: 'internal',
    },
    {
      name: 'internalLink',
      type: 'reference',
      title: 'Internal Page',
      to: [
        { type: 'homePage' },
        { type: 'aboutPage' },
        { type: 'investPage' },
        { type: 'newsPage' },
        { type: 'contactPage' },
        { type: 'service' },
        { type: 'article' },
        { type: 'articleCategory' },
        { type: 'policyPage' },
        { type: 'careersPage' },
      ],
      hidden: ({ parent }) => parent?.linkType !== 'internal',
    },
    {
      name: 'sectionAnchor',
      type: 'string',
      title: 'Section Anchor or Query Filter (Optional)',
      description: 'e.g. #our-team or ?category=Market+Update#articles',
      hidden: ({ parent }) => parent?.linkType !== 'internal',
    },
    {
      name: 'file',
      type: 'file',
      title: 'Downloadable Resource File',
      description: 'Upload a PDF or document to open/download when clicked.',
      hidden: ({ parent }) => parent?.linkType !== 'file',
    },
    {
      name: 'externalUrl',
      type: 'url',
      title: 'External URL',
      hidden: ({ parent }) => parent?.linkType !== 'external',
      validation: (Rule) => Rule.uri({ scheme: ['http', 'https', 'mailto', 'tel'] }),
    },
    {
      name: 'customPath',
      type: 'string',
      title: 'Custom Path',
      description: 'e.g. /about#our-team or /news?category=Market+Update#articles',
      hidden: ({ parent }) => parent?.linkType !== 'custom',
    },
  ],
  preview: {
    select: {
      title: 'label',
      linkType: 'linkType',
      externalUrl: 'externalUrl',
      customPath: 'customPath',
      sectionAnchor: 'sectionAnchor',
    },
    prepare(selection) {
      const { title, linkType, externalUrl, customPath, sectionAnchor } = selection;
      let subtitle = '';
      if (linkType === 'internal') {
        subtitle = sectionAnchor ? `Internal reference (${sectionAnchor})` : 'Internal reference';
      } else if (linkType === 'file') {
        subtitle = 'Downloadable file';
      } else if (linkType === 'external') {
        subtitle = externalUrl;
      } else if (linkType === 'none') {
        subtitle = 'Disabled / Coming Soon';
      } else {
        subtitle = customPath;
      }
      return {
        title,
        subtitle
      };
    }
  }
});
