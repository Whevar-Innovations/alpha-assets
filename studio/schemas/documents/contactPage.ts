import { defineType } from 'sanity';

export const contactPage = defineType({
  name: 'contactPage',
  title: 'Contact Page',
  type: 'document',
  icon: () => '📞',
  preview: {
    prepare() {
      return {
        title: 'Contact Page',
      };
    },
  },
  groups: [
    { name: 'seo', title: 'SEO', default: false },
    { name: 'hero', title: 'Page Header', default: true },
    { name: 'contact', title: 'Contact Details' },
    { name: 'form', title: 'Form Settings' },
  ],
  fields: [
    { name: 'pageVisible', type: 'boolean', title: 'Page is Visible (Active)', initialValue: true },
    { name: 'seo', type: 'seo', group: 'seo' },
    { name: 'heroVisible', type: 'boolean', title: 'Show Page Header', initialValue: true, group: 'hero' },
    { name: 'hero', type: 'pageHeader', title: 'Page Header', group: 'hero' },
    
    // Contact Info (overrides global if set)
    { name: 'contactVisible', type: 'boolean', title: 'Show Contact Details', initialValue: true, group: 'contact' },
    { name: 'contactHeading', type: 'text', title: 'Heading', rows: 2, group: 'contact' },
    { name: 'contactSubtext', type: 'text', title: 'Subtext', rows: 2, group: 'contact' },
    
    // Form Config
    { name: 'formVisible', type: 'boolean', title: 'Show Contact Form', initialValue: true, group: 'form' },
    { name: 'formHeading', type: 'text', title: 'Form Heading', rows: 2, group: 'form' },
    { name: 'formSuccessHeading', type: 'string', title: 'Success Heading', group: 'form' },
    { name: 'formSuccessMessage', type: 'text', title: 'Success Message', rows: 2, group: 'form' },
  ],
});
