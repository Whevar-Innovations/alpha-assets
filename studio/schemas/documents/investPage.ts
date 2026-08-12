import { defineType } from 'sanity';

export const investPage = defineType({
  name: 'investPage',
  title: 'Invest Page',
  type: 'document',
  icon: () => '💼',
  groups: [
    { name: 'seo', title: 'SEO', default: false },
    { name: 'hero', title: 'Page Header', default: true },
    { name: 'services', title: 'Services Grid' },
  ],
  fields: [
    { name: 'pageVisible', type: 'boolean', title: 'Page is Visible (Active)', initialValue: true },
    { name: 'seo', type: 'seo', group: 'seo' },
    { name: 'heroVisible', type: 'boolean', title: 'Show Page Header', initialValue: true, group: 'hero' },
    { name: 'hero', type: 'pageHeader', title: 'Page Header', group: 'hero' },
    
    // Services
    { name: 'servicesVisible', type: 'boolean', title: 'Show Services Section', initialValue: true, group: 'services' },
    { name: 'servicesSubtitle', type: 'string', title: 'Section Subtitle', group: 'services' },
    { name: 'servicesHeading', type: 'text', title: 'Section Heading', rows: 2, group: 'services' },
    {
      name: 'servicesList',
      type: 'array',
      title: 'Services to Display',
      of: [{ type: 'reference', to: [{ type: 'service' }] }],
      group: 'services',
    },
  ],
});
