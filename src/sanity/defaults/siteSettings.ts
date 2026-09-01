import type { SiteSettingsData } from '../../types';

const createLinkBlock = (text: string, href: string, key: string) => ({
  _type: 'block',
  style: 'normal',
  children: [{ _type: 'span', text, marks: [key] }],
  markDefs: [{ _key: key, _type: 'link', href, blank: false }],
});

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
    phone: '+256 393 003 397',
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
  footerContent: [
    {
      title: 'Helpful Links',
      links: [
        createLinkBlock('Privacy Policy', '/legal/privacy-policy', 'link1'),
        createLinkBlock('Terms of Use', '/legal/terms-of-use', 'link2'),
        createLinkBlock('Cookie Policy', '/legal/cookie-policy', 'link3'),
        createLinkBlock('Risk Disclosures', '/legal/risk-disclosures', 'link4'),
        createLinkBlock('Complaints Procedure', '/legal/complaints-procedure', 'link5'),
      ]
    },
    {
      title: 'Resources',
      links: [
        createLinkBlock('Finance knowledge', '#', 'link6'),
        createLinkBlock('Market research', '#', 'link7'),
        createLinkBlock('Steps for 2026', '#', 'link8'),
        createLinkBlock('Risk advisory', '#', 'link9'),
      ]
    },
    {
      title: 'Company',
      links: [
        createLinkBlock('Investment Philosophy', '/about', 'link10'),
        createLinkBlock('Our People', '/about', 'link11'),
        createLinkBlock('Corporate Governance', '/about', 'link12'),
        createLinkBlock('Macro Insights', '/about', 'link13'),
      ]
    }
  ]
};
