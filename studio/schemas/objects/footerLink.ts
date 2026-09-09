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
          { title: 'External URL', value: 'external' },
          { title: 'Custom Path', value: 'custom' },
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
        { type: 'policyPage' },
        { type: 'careersPage' },
      ],
      hidden: ({ parent }) => parent?.linkType !== 'internal',
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
      description: 'e.g. /legal/privacy-policy',
      hidden: ({ parent }) => parent?.linkType !== 'custom',
    },
  ],
  preview: {
    select: {
      title: 'label',
      linkType: 'linkType',
      externalUrl: 'externalUrl',
      customPath: 'customPath'
    },
    prepare(selection) {
      const { title, linkType, externalUrl, customPath } = selection;
      let subtitle = '';
      if (linkType === 'internal') {
        subtitle = 'Internal reference';
      } else if (linkType === 'external') {
        subtitle = externalUrl;
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
