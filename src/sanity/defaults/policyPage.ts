import type { PolicyPageData } from '../../types';

const createParagraph = (text: string) => ({
  _type: 'block',
  style: 'normal',
  children: [{ _type: 'span', text }],
});

const createHeading = (text: string) => ({
  _type: 'block',
  style: 'h2',
  children: [{ _type: 'span', text }],
});

const createListItem = (text: string) => ({
  _type: 'block',
  style: 'normal',
  listItem: 'bullet',
  children: [{ _type: 'span', text }],
});

const privacyPolicyBlocks = [
  createParagraph('Alpha Asset Managers Limited ("Alpha", "we", "us") respects your privacy. This policy explains what personal data we collect through our website and investor portals, why we collect it, who we share it with, and the choices and rights available to you.'),
  
  createHeading('1. Controller'),
  createParagraph('Alpha Asset Managers Limited, Regency Plaza, 30 Lugogo Bypass, Kampala, Uganda, is the data controller for personal data processed via this website and our investor portals. Contact: invest@alphaeastafrica.com.'),
  
  createHeading('2. Data we collect'),
  createListItem('Identification/contact: name, email, phone, employer, role, country.'),
  createListItem('Account/portal data: login IDs, access logs, documents you upload.'),
  createListItem('Marketing preferences and communications with us.'),
  createListItem('Technical data: IP address, device/browser info, cookies, analytics, and approximate location.'),
  createListItem('KYC/AML data (for investors): IDs, proof of address, tax IDs, source of funds, sanctions/PEP screening results.'),
  
  createHeading('3. How we use data and legal bases'),
  createListItem('Provide the website/portal, security, and troubleshooting (legitimate interests; contract for portal users).'),
  createListItem('Respond to inquiries and provide requested materials (consent/legitimate interests).'),
  createListItem('Conduct marketing with your consent; you can opt out anytime.'),
  createListItem('Perform client onboarding, KYC/AML, and regulatory reporting (legal obligations; public interest).'),
  createListItem('Manage investor relations, subscriptions, redemptions, capital calls/distributions, and reporting (contract).'),
  createListItem('Improve services and compile analytics (legitimate interests; consent where required).'),
  
  createHeading('4. Sharing'),
  createListItem('Service providers: IT hosting, administrators, custodians, payment and KYC/AML vendors, auditors, and professional advisers under contract and confidentiality.'),
  createListItem('Regulators and authorities where legally required (e.g., anti-money laundering, tax).'),
  createListItem('Affiliates and transaction counterparties as needed for services.'),
  createListItem('We do not sell personal data.'),
  
  createHeading('5. International transfers'),
  createParagraph('Your data may be transferred to countries without equivalent data protection. We use appropriate safeguards (e.g., contractual clauses) and will inform you where applicable.'),
  
  createHeading('6. Retention'),
  createParagraph('We keep data only as long as needed for the purposes above and to meet legal, tax, and regulatory requirements (e.g., KYC records typically 5–10 years after the relationship ends).'),
  
  createHeading('7. Your rights'),
  createParagraph('Subject to law, you may request access, correction, deletion, restriction, portability, and object to processing; you may withdraw consent at any time. To exercise rights, contact invest@alphaeastafrica.com. You can also complain to your local data protection authority.'),
  
  createHeading('8. Security'),
  createParagraph('We use technical and organizational measures to protect data (encryption in transit/at rest where appropriate, access controls, 2FA for portals, monitoring). No system is 100% secure.'),
  
  createHeading('9. Children'),
  createParagraph('Our services are not directed to children and we do not knowingly collect data from minors.'),
  
  createHeading('10. Marketing'),
  createParagraph('We send marketing only with consent or as permitted. Unsubscribe links are included in each message.'),
  
  createHeading('11. Cookies / trackers'),
  createParagraph('See our Cookie Policy. You can manage preferences via our banner.'),
  
  createHeading('12. Updates'),
  createParagraph('We may update this policy; material changes will be notified via the site or email.')
];

export const getPolicyPageDefaults = (slug?: string): PolicyPageData => {
  if (slug === 'privacy-policy') {
    return {
      pageVisible: true,
      policyType: 'privacy-policy',
      lastUpdated: '2026-08-15',
      content: privacyPolicyBlocks
    };
  }
  
  return {
    pageVisible: true,
    policyType: slug ?? 'unknown',
    lastUpdated: new Date().toISOString().split('T')[0],
    content: [
      createParagraph('Policy content is being updated.')
    ]
  };
};

export const policyPageDefaults = getPolicyPageDefaults();
