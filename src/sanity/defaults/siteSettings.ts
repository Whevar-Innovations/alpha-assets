import type { SiteSettingsData } from '../../types';

export const siteSettingsDefaults: SiteSettingsData = {
  navItems: [
    { label: 'Home', path: '/', isDisabled: false, order: 1, isVisible: true },
    { label: 'About', path: '/about', isDisabled: false, order: 2, isVisible: true },
    { label: 'Invest', path: '/invest', isDisabled: false, order: 3, isVisible: true },
    { label: 'News & Insights', path: '/news', isDisabled: false, order: 4, isVisible: true },
    { label: 'Contact', path: '/contact', isDisabled: false, order: 5, isVisible: true },
  ],
  contactInfo: {
    address: 'Regency Plaza, 30 Lugogo Bypass\nKampala, Uganda',
    phone: '+256 200 911875',
    email: 'invest@alphaeastafrica.com',
    officeHours: 'Monday - Friday: 8:00 AM - 5:00 PM\nClosed on Weekends & Public Holidays',
  },
  socialLinks: [
    { platform: 'Facebook', url: 'https://facebook.com', isVisible: true },
    { platform: 'X', url: 'https://twitter.com', isVisible: true },
    { platform: 'LinkedIn', url: 'https://linkedin.com', isVisible: true },
  ],
  regulatoryText: 'Licensed & Regulated by the Capital Markets Authority',
  copyrightText: '© 2026 Alpha Asset Managers, All Rights Reserved',
};
