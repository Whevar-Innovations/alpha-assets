import { defineType } from 'sanity';

const policyTypes = [
  { title: 'Privacy Policy', value: 'privacy-policy' },
  { title: 'Terms of Use', value: 'terms-of-use' },
  { title: 'Privacy Notice', value: 'privacy-notice' },
  { title: 'Cookie Policy', value: 'cookie-policy' },
  { title: 'Risk Disclosures', value: 'risk-disclosures' },
  { title: 'Complaints Procedure', value: 'complaints-procedure' },
  { title: 'Regulatory Information', value: 'regulatory-information' },
];

export const policyPage = defineType({
  name: 'policyPage',
  title: 'Policy Page',
  type: 'document',
  icon: () => '📄',
  groups: [
    { name: 'content', title: 'Content', default: true },
    { name: 'settings', title: 'Settings' },
  ],
  fields: [
    {
      name: 'pageVisible',
      type: 'boolean',
      title: 'Page Visible',
      description: 'Toggle to show or hide this policy page on the live site.',
      initialValue: true,
      group: 'settings'
    },
    { 
      name: 'policyType', 
      type: 'string', 
      title: 'Policy Type',
      description: 'Select the type of policy. This will determine the page title and the URL (e.g. /legal/privacy-policy)',
      options: {
        list: policyTypes,
        layout: 'dropdown'
      },
      validation: (Rule) => Rule.required(),
      group: 'content'
    },
    { 
      name: 'lastUpdated', 
      type: 'date', 
      title: 'Last Updated Date',
      validation: (Rule) => Rule.required(),
      group: 'content'
    },
    {
      name: 'pdfDocument',
      type: 'file',
      title: 'PDF Document (Optional)',
      description: 'Upload a pre-formatted PDF version of this policy. If omitted, the "Download PDF" button will generate a clean print view of the page.',
      group: 'content'
    },
    { 
      name: 'content', 
      type: 'richText', 
      title: 'Content',
      validation: (Rule) => Rule.required(),
      group: 'content'
    },
  ],
  preview: {
    select: {
      policyType: 'policyType',
      lastUpdated: 'lastUpdated'
    },
    prepare({ policyType, lastUpdated }) {
      const typeOption = policyTypes.find(t => t.value === policyType);
      return {
        title: typeOption ? typeOption.title : 'Unknown Policy',
        subtitle: lastUpdated ? `Updated: ${lastUpdated}` : 'No date set'
      };
    }
  }
});
