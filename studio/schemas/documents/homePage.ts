import { defineType } from 'sanity';

export const homePage = defineType({
  name: 'homePage',
  title: 'Home Page',
  type: 'document',
  icon: () => '🏠',
  preview: {
    prepare() {
      return {
        title: 'Home Page',
      };
    },
  },
  groups: [
    { name: 'seo', title: 'SEO', default: false },
    { name: 'hero', title: 'Hero Banner', default: true },
    { name: 'services', title: 'Services' },
    { name: 'howWeWork', title: 'How We Work' },
    { name: 'partners', title: 'Trust & Partners' },
    { name: 'faq', title: 'FAQ' },
    { name: 'footerCta', title: 'Footer CTA' },
  ],
  fields: [
    { name: 'pageVisible', type: 'boolean', title: 'Page is Visible (Active)', initialValue: true },
    { name: 'seo', type: 'seo', group: 'seo' },
    { name: 'heroVisible', type: 'boolean', title: 'Show Hero Section', initialValue: true, group: 'hero' },
    { name: 'hero', type: 'heroBanner', group: 'hero' },
    { name: 'servicesVisible', type: 'boolean', title: 'Show Services Section', initialValue: true, group: 'services' },
    { name: 'servicesHeading', type: 'text', title: 'Section Heading', rows: 2, group: 'services' },
    { name: 'servicesSubtext', type: 'text', title: 'Section Subtext', rows: 2, group: 'services' },
    {
      name: 'servicesList',
      type: 'array',
      title: 'Services to Display',
      of: [{ type: 'reference', to: [{ type: 'service' }] }],
      group: 'services',
    },
    { name: 'howWeWorkVisible', type: 'boolean', title: 'Show Section', initialValue: true, group: 'howWeWork' },
    { name: 'howWeWorkSubtitle', type: 'string', title: 'Subtitle', group: 'howWeWork' },
    { name: 'howWeWorkHeading', type: 'text', title: 'Heading', rows: 2, group: 'howWeWork' },
    { name: 'howWeWorkItems', type: 'array', of: [{ type: 'featureItem' }], group: 'howWeWork' },
    { name: 'partnersVisible', type: 'boolean', title: 'Show Partners Section', initialValue: false, group: 'partners' },
    { name: 'partnersHeading', type: 'text', title: 'Heading', rows: 2, group: 'partners' },
    { name: 'partnerLogos', type: 'array', of: [{ type: 'partnerLogo' }], group: 'partners' },
    { name: 'faqVisible', type: 'boolean', title: 'Show FAQ Section', initialValue: true, group: 'faq' },
    { name: 'faqHeading', type: 'text', title: 'Heading', rows: 2, group: 'faq' },
    { name: 'faqSubtext', type: 'text', title: 'Subtext', rows: 2, group: 'faq' },
    { name: 'faqItems', type: 'array', of: [{ type: 'faqItem' }], group: 'faq' },
    { name: 'footerCtaVisible', type: 'boolean', title: 'Show Footer CTA', initialValue: true, group: 'footerCta' },
    { name: 'footerCtaText', type: 'string', title: 'CTA Text', group: 'footerCta' },
    { name: 'footerCtaBoldText', type: 'string', title: 'Bold Text', group: 'footerCta' },
    { name: 'footerCtaButton', type: 'ctaButton', group: 'footerCta' },
  ],
});
