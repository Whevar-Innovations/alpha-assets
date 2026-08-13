import { defineType } from 'sanity';

export const contactInfo = defineType({
  name: 'contactInfo',
  title: 'Contact Information',
  type: 'object',
  fields: [
    { name: 'address', type: 'text', title: 'Office Address', rows: 3 },
    { name: 'phone', type: 'string', title: 'Phone Number' },
    { name: 'email', type: 'string', title: 'Email Address' },
    { name: 'officeHours', type: 'text', title: 'Office Hours', rows: 3 },
  ],
});
