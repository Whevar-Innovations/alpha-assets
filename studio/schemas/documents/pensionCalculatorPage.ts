import { defineType } from 'sanity';

export const pensionCalculatorPage = defineType({
  name: 'pensionCalculatorPage',
  title: 'Pension Calculator Page',
  type: 'document',
  icon: () => '🧮',
  preview: {
    prepare() {
      return {
        title: 'Pension Calculator Page',
      };
    },
  },
  groups: [
    { name: 'seo', title: 'SEO', default: false },
    { name: 'hero', title: 'Header / Intro', default: true },
    { name: 'advantages', title: 'Key Advantages / Institutional Rigour' },
    { name: 'faq', title: 'Frequently Asked Questions' },
    { name: 'footerCta', title: 'Footer CTA' },
  ],
  fields: [
    { name: 'pageVisible', type: 'boolean', title: 'Page is Visible (Active)', initialValue: true },
    { name: 'seo', type: 'seo', group: 'seo' },

    // Header / Intro
    { name: 'heroVisible', type: 'boolean', title: 'Show Header Banner', initialValue: true, group: 'hero' },
    {
      name: 'heroSubtitle',
      type: 'string',
      title: 'Header Subtitle / Tag',
      initialValue: 'GROWTH & RETIREMENT CALCULATOR',
      group: 'hero',
    },
    {
      name: 'heroHeading',
      type: 'string',
      title: 'Header Heading',
      initialValue: 'See what your money could become',
      group: 'hero',
    },
    {
      name: 'heroDescription',
      type: 'text',
      title: 'Header Description',
      rows: 2,
      initialValue: 'Choose a pension scheme, type your numbers and watch the projection respond in real time.',
      group: 'hero',
    },

    // Key Advantages / Institutional Rigour
    {
      name: 'advantagesVisible',
      type: 'boolean',
      title: 'Show Advantages Section',
      initialValue: true,
      group: 'advantages',
    },
    {
      name: 'advantagesSubtitle',
      type: 'string',
      title: 'Advantages Subtitle / Tag',
      initialValue: 'INSTITUTIONAL RIGOUR',
      group: 'advantages',
    },
    {
      name: 'advantagesHeading',
      type: 'string',
      title: 'Advantages Heading',
      initialValue: 'Why Structure Your Retirement with Alpha',
      group: 'advantages',
    },
    {
      name: 'advantagesItems',
      type: 'array',
      title: 'Advantage Cards',
      description: 'Feature cards highlighting institutional strengths below the calculator.',
      of: [{ type: 'featureItem' }],
      group: 'advantages',
    },

    // FAQ Section
    {
      name: 'faqVisible',
      type: 'boolean',
      title: 'Show FAQ Section',
      initialValue: true,
      group: 'faq',
    },
    {
      name: 'faqSubtitle',
      type: 'string',
      title: 'FAQ Subtitle / Tag',
      initialValue: 'FREQUENTLY ASKED QUESTIONS',
      group: 'faq',
    },
    {
      name: 'faqHeading',
      type: 'string',
      title: 'FAQ Heading',
      initialValue: 'Retirement & Pension FAQs',
      group: 'faq',
    },
    {
      name: 'faqItems',
      type: 'array',
      title: 'FAQ Items',
      of: [{ type: 'faqItem' }],
      group: 'faq',
    },

    // Footer CTA
    { name: 'footerCtaVisible', type: 'boolean', title: 'Show Footer CTA', initialValue: true, group: 'footerCta' },
    { name: 'footerCtaText', type: 'string', title: 'CTA Text', group: 'footerCta' },
    { name: 'footerCtaBoldText', type: 'string', title: 'Bold Text', group: 'footerCta' },
    { name: 'footerCtaButton', type: 'ctaButton', group: 'footerCta' },
  ],
});
