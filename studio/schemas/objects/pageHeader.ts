import { defineType } from 'sanity';

export const pageHeader = defineType({
  name: 'pageHeader',
  title: 'Page Header',
  type: 'object',
  fields: [
    { name: 'heading', type: 'string', title: 'Page Title' },
    { name: 'backgroundImage', type: 'imageWithAlt', title: 'Background Image' },
  ],
});
