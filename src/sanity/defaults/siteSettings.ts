import type { SiteSettingsData } from '../../types';

export const siteSettingsDefaults: SiteSettingsData = {
  navItems: [
    { label: 'Home', path: '/', isDisabled: false, order: 1 },
    { label: 'About', path: '/about', isDisabled: false, order: 2 },
    { label: 'Invest', path: '/invest', isDisabled: false, order: 3 },
    { label: 'News & Insights', path: '/news', isDisabled: true, order: 4 },
    { label: 'Contact', path: '/contact', isDisabled: true, order: 5 },
  ],
  contactInfo: {
    address: 'Regency Plaza, 30 Lugogo Bypass\\nKampala, Uganda',
    phone: '+256 200 911875',
    email: 'invest@alphaeastafrica.com',
    officeHours: 'Monday - Friday: 8:00 AM - 5:00 PM\\nClosed on Weekends & Public Holidays',
  },
  socialLinks: [
    { platform: 'Facebook', url: 'https://facebook.com' },
    { platform: 'X', url: 'https://twitter.com' },
    { platform: 'LinkedIn', url: 'https://linkedin.com' },
  ],
  regulatoryText: 'Licensed & Regulated by the Capital Markets Authority',
  copyrightText: '© 2026 Alpha Asset Managers, All Rights Reserved',
};
