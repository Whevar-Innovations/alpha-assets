import { defineType } from 'sanity';

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  icon: () => '⚙️',
  preview: {
    prepare() {
      return {
        title: 'Site Settings',
      };
    },
  },
  groups: [
    { name: 'navigation', title: 'Navigation' },
    { name: 'footer', title: 'Footer' },
    { name: 'branding', title: 'Branding' },
  ],
  fields: [
    // Navigation
    { name: 'navItems', type: 'array', of: [{ type: 'navItem' }], title: 'Main Navigation', group: 'navigation' },
    
    // Footer
    { name: 'contactInfo', type: 'contactInfo', title: 'Global Contact Info', group: 'footer' },
    { name: 'socialLinks', type: 'array', of: [{ type: 'socialLink' }], title: 'Social Media Links', group: 'footer' },
    { name: 'regulatoryText', type: 'string', title: 'Regulatory Disclaimer', group: 'footer' },
    { name: 'copyrightText', type: 'string', title: 'Copyright Text', group: 'footer' },
    { 
      name: 'footerContent', 
      type: 'array', 
      title: 'Footer Link Columns', 
      group: 'footer',
      of: [
        {
          type: 'object',
          name: 'footerColumn',
          fields: [
            { 
              name: 'title', 
              type: 'string', 
              title: 'Column Title',
              options: { list: ['Helpful Links', 'Resources', 'Company'] }
            },
            { 
              name: 'links', 
              type: 'array', 
              title: 'Column Links',
              of: [{ type: 'footerLink' }]
            }
          ]
        }
      ]
    },
    
    // Branding
    { name: 'primaryLogo', type: 'imageWithAlt', title: 'Primary Logo (Dark)', group: 'branding' },
    { name: 'whiteLogo', type: 'imageWithAlt', title: 'White Logo', group: 'branding' },
  ],
});
