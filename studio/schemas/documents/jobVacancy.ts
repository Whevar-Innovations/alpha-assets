import { defineType } from 'sanity';

export const jobVacancy = defineType({
  name: 'jobVacancy',
  title: 'Job Vacancy',
  type: 'document',
  icon: () => '💼',
  groups: [
    { name: 'settings', title: 'Settings', default: true },
    { name: 'content', title: 'Job Details' },
    { name: 'application', title: 'Application Method' },
    { name: 'seo', title: 'SEO' },
  ],
  fields: [
    // Settings & Status
    {
      name: 'status',
      type: 'string',
      title: 'Status',
      description: 'Only vacancies set to "Open" are visible on the website.',
      options: {
        list: [
          { title: 'Open', value: 'Open' },
          { title: 'Closed', value: 'Closed' },
          { title: 'Draft', value: 'Draft' },
        ],
        layout: 'radio',
      },
      initialValue: 'Open',
      group: 'settings',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'order',
      type: 'number',
      title: 'Display Order',
      description: 'Optional custom order number (vacancies are sorted by date posted by default).',
      group: 'settings',
    },

    // Job Details
    {
      name: 'title',
      type: 'string',
      title: 'Job Title',
      group: 'content',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'slug',
      type: 'slug',
      title: 'Slug',
      options: { source: 'title' },
      group: 'content',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'department',
      type: 'string',
      title: 'Department / Category',
      description: 'e.g. "Investment Management", "Operations & Risk", "Compliance", "Client Advisory"',
      group: 'content',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'location',
      type: 'string',
      title: 'Location',
      description: 'e.g. "Kampala, Uganda", "Remote", "Hybrid"',
      group: 'content',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'employmentType',
      type: 'string',
      title: 'Employment Type',
      options: {
        list: [
          { title: 'Full-time', value: 'Full-time' },
          { title: 'Part-time', value: 'Part-time' },
          { title: 'Contract', value: 'Contract' },
          { title: 'Internship', value: 'Internship' },
        ],
      },
      initialValue: 'Full-time',
      group: 'content',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'datePosted',
      type: 'date',
      title: 'Date Posted',
      initialValue: () => new Date().toISOString().split('T')[0],
      group: 'content',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'deadline',
      type: 'date',
      title: 'Application Deadline (Optional)',
      description: 'Optional date when applications close.',
      group: 'content',
    },
    {
      name: 'summary',
      type: 'text',
      title: 'Short Summary',
      rows: 3,
      description: 'A brief 2-3 sentence overview displayed on the listing card.',
      group: 'content',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'description',
      type: 'richText',
      title: 'Full Job Description',
      description: 'Role overview, responsibilities, key requirements, qualifications, and benefits.',
      group: 'content',
      validation: (Rule) => Rule.required(),
    },

    // Application Method
    {
      name: 'applicationType',
      type: 'string',
      title: 'Application Type',
      description: 'Choose whether candidates apply via email or an external link/portal.',
      options: {
        list: [
          { title: 'Email', value: 'Email' },
          { title: 'External Link', value: 'External Link' },
        ],
        layout: 'radio',
      },
      initialValue: 'Email',
      group: 'application',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'applicationEmail',
      type: 'string',
      title: 'Application Email',
      description: 'e.g. careers@alphaeastafrica.com',
      hidden: ({ parent }) => parent?.applicationType !== 'Email',
      group: 'application',
    },
    {
      name: 'applicationUrl',
      type: 'url',
      title: 'Application URL',
      description: 'External application portal or link (e.g. LinkedIn, recruitment portal).',
      hidden: ({ parent }) => parent?.applicationType !== 'External Link',
      validation: (Rule) => Rule.uri({ scheme: ['http', 'https'] }),
      group: 'application',
    },

    // SEO
    {
      name: 'seo',
      type: 'seo',
      group: 'seo',
    },
  ],
  orderings: [
    { title: 'Date Posted (Newest First)', name: 'datePostedDesc', by: [{ field: 'datePosted', direction: 'desc' }] },
    { title: 'Title A-Z', name: 'titleAsc', by: [{ field: 'title', direction: 'asc' }] },
  ],
  preview: {
    select: {
      title: 'title',
      department: 'department',
      location: 'location',
      status: 'status',
    },
    prepare({ title, department, location, status }) {
      const statusIcon = status === 'Open' ? '🟢' : status === 'Closed' ? '🔴' : '🟡';
      return {
        title: `${statusIcon} ${title || 'Untitled Vacancy'}`,
        subtitle: [department, location, status].filter(Boolean).join(' • '),
      };
    },
  },
});
