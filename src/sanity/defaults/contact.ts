import type { ContactPageData } from '../../types';

export const contactDefaults: ContactPageData = {
  seo: { metaTitle: '', metaDescription: '', ogImage: undefined },
  pageVisible: true,
  heroVisible: true,
  hero: {
    heading: 'Contact Us',
    highlightText: '',
    subtext: '',
  },
  contactVisible: true,
  contactHeading: 'Get in touch with an Advisor',
  contactSubtext: 'Have questions about our investment solutions or looking to register an account? Drop us a message or visit our office.',
  formVisible: true,
  formHeading: 'Send a Message',
  formSuccessHeading: 'Message Sent Successfully!',
  formSuccessMessage: 'Thank you for reaching out. An investment advisor will contact you within the next 24 working hours.',
};
