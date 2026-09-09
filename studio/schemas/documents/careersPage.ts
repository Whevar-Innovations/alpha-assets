import { defineType } from 'sanity';

export const careersPage = defineType({
  name: 'careersPage',
  title: 'Careers Page',
  type: 'document',
  icon: () => '💼',
  preview: {
    prepare() {
      return {
        title: 'Careers Page Settings',
      };
    },
  },
  groups: [
    { name: 'seo', title: 'SEO', default: false },
    { name: 'hero', title: 'Page Header', default: true },
    { name: 'intro', title: 'Intro & Settings' },
  ],
  fields: [
    { name: 'pageVisible', type: 'boolean', title: 'Page is Visible (Active)', initialValue: true },
    { name: 'seo', type: 'seo', group: 'seo' },

    // Page Header (Hero Banner)
    { name: 'heroVisible', type: 'boolean', title: 'Show Page Header', initialValue: true, group: 'hero' },
    { name: 'hero', type: 'pageHeader', title: 'Page Header', group: 'hero' },

    // Intro & Content Settings
    {
      name: 'introHeading',
      type: 'string',
      title: 'Intro Subheading / Tagline',
      initialValue: 'Join Our Team',
      group: 'intro',
    },
    {
      name: 'introDescription',
      type: 'text',
      title: 'Intro Description Text',
      rows: 3,
      initialValue: 'We are always looking for ambitious, disciplined, and forward-thinking individuals to contribute to institutional asset management in East Africa.',
      group: 'intro',
    },
    {
      name: 'noVacanciesTitle',
      type: 'string',
      title: 'No Vacancies Heading',
      initialValue: 'No Open Vacancies Currently',
      group: 'intro',
    },
    {
      name: 'noVacanciesMessage',
      type: 'text',
      title: 'No Vacancies Message',
      rows: 3,
      initialValue: 'There are currently no active job openings at Alpha Asset Managers. However, we welcome spontaneous applications from exceptional candidates.',
      group: 'intro',
    },
  ],
});
