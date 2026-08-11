import type { ServiceItem } from '../../types';

export const serviceDefaultsMap: Record<string, ServiceItem> = {
  'advisory-capital-solutions': {
    _id: 'advisory-capital-solutions',
    title: 'Advisory & Capital Solutions',
    category: 'OUR SERVICES',
    description: [
      {
        _type: 'block',
        _key: 'b1',
        style: 'normal',
        children: [
          {
            _type: 'span',
            _key: 's1',
            text: 'Strategic guidance for corporates, foundations, institutions, and sophisticated investors on portfolio strategy, asset allocation, manager selection, and investment structuring.',
          },
        ],
      },
      {
        _type: 'block',
        _key: 'b2',
        style: 'normal',
        children: [
          {
            _type: 'span',
            _key: 's2',
            text: 'Alpha advises corporates, foundations, institutions, and sophisticated investors on portfolio strategy, asset allocation, manager selection, and investment structuring. We also support capital raising, transaction preparation, and financial modelling. Whether the mandate is treasury optimisation, investment policy design, capital mobilisation, or transaction readiness, Alpha acts as a trusted capital partner from strategy through execution.',
          },
        ],
      },
    ],
    featuresVisible: true,
    bulletsTitle: 'Comprehensive Advisory Services',
    bullets: [
      { _type: 'serviceFeatureItem', text: 'Portfolio Strategy & Asset Allocation', isVisible: true },
      { _type: 'serviceFeatureItem', text: 'Investment Structuring', isVisible: true },
      { _type: 'serviceFeatureItem', text: 'Manager Selection', isVisible: true },
      { _type: 'serviceFeatureItem', text: 'Capital Raising Support', isVisible: true },
      { _type: 'serviceFeatureItem', text: 'Financial Modelling', isVisible: true },
    ],
    isActive: true,
  },
  'direct-lending-fund': {
    _id: 'direct-lending-fund',
    title: 'Direct Lending Fund',
    category: 'OUR SERVICES',
    description: [
      {
        _type: 'block',
        _key: 'b1',
        style: 'normal',
        children: [
          {
            _type: 'span',
            _key: 's1',
            text: 'Secured senior lending strategy for institutional and sophisticated investors seeking attractive risk-adjusted income.',
          },
        ],
      },
      {
        _type: 'block',
        _key: 'b2',
        style: 'normal',
        children: [
          {
            _type: 'span',
            _key: 's2',
            text: 'Our Direct Lending Fund targets mid-market lending opportunities offering high cash yield and senior security protections. We perform rigorous credit assessments and structuring to ensure downside protection while maximizing yields. Investors gain exposure to a diversified portfolio of private credit assets uncorrelated with traditional public equities.',
          },
        ],
      },
    ],
    featuresVisible: true,
    bulletsTitle: 'Key Fund Characteristics',
    bullets: [
      { _type: 'serviceFeatureItem', text: 'Corporate Debt Financing', isVisible: true },
      { _type: 'serviceFeatureItem', text: 'Acquisition Finance Solutions', isVisible: true },
      { _type: 'serviceFeatureItem', text: 'Secured Term Loans & Collateral', isVisible: true },
      { _type: 'serviceFeatureItem', text: 'Capital Preservation & Strict Covenants', isVisible: true },
      { _type: 'serviceFeatureItem', text: 'Consistent Monthly Cash Distribution', isVisible: true },
    ],
    isActive: true,
  },
  'private-equity': {
    _id: 'private-equity',
    title: 'Private Equity',
    category: 'OUR SERVICES',
    description: [
      {
        _type: 'block',
        _key: 'b1',
        style: 'normal',
        children: [
          {
            _type: 'span',
            _key: 's1',
            text: 'Long-term growth capital through disciplined investment in promising businesses with active ownership approach.',
          },
        ],
      },
      {
        _type: 'block',
        _key: 'b2',
        style: 'normal',
        children: [
          {
            _type: 'span',
            _key: 's2',
            text: 'Alpha partners with high-potential businesses across East Africa to scale operations, upgrade management systems, and expand market footprints. We take an active, hands-on role in corporate governance, implementing strategic improvements and unlocking sustainable value for our portfolio companies and institutional investors alike.',
          },
        ],
      },
    ],
    featuresVisible: true,
    bulletsTitle: 'Investment Approach',
    bullets: [
      { _type: 'serviceFeatureItem', text: 'Mid-Market Growth Equity', isVisible: true },
      { _type: 'serviceFeatureItem', text: 'Strategic Expansion Support', isVisible: true },
      { _type: 'serviceFeatureItem', text: 'Active Board & Management Engagement', isVisible: true },
      { _type: 'serviceFeatureItem', text: 'Operational Value Creation Initiatives', isVisible: true },
      { _type: 'serviceFeatureItem', text: 'Clear Institutional Path to Exit', isVisible: true },
    ],
    isActive: true,
  },
  'separately-managed-accounts': {
    _id: 'separately-managed-accounts',
    title: 'Separately Managed Accounts',
    category: 'OUR SERVICES',
    description: [
      {
        _type: 'block',
        _key: 'b1',
        style: 'normal',
        children: [
          {
            _type: 'span',
            _key: 's1',
            text: 'Bespoke discretionary portfolios in UGX or USD, tailored to your objectives, liquidity profile, risk tolerance, and reporting requirements.',
          },
        ],
      },
      {
        _type: 'block',
        _key: 'b2',
        style: 'normal',
        children: [
          {
            _type: 'span',
            _key: 's2',
            text: 'For individuals and institutions requiring customized asset management, Separately Managed Accounts (SMAs) offer personalized allocations across bonds, equities, and cash equivalents. Assets are held directly in your custodian name, providing complete security, custom tax optimizations, and bespoke portfolio reporting frequencies.',
          },
        ],
      },
    ],
    featuresVisible: true,
    bulletsTitle: 'SMA Features & Customization',
    bullets: [
      { _type: 'serviceFeatureItem', text: 'Customized USD & UGX Asset Allocations', isVisible: true },
      { _type: 'serviceFeatureItem', text: 'Direct Ownership of Underlying Securities', isVisible: true },
      { _type: 'serviceFeatureItem', text: 'Tax-Optimized Portfolios & Liquidity Planning', isVisible: true },
      { _type: 'serviceFeatureItem', text: 'Tactical Adjustments by Dedicated Managers', isVisible: true },
      { _type: 'serviceFeatureItem', text: 'Real-time Access & Personalized Advisory', isVisible: true },
    ],
    isActive: true,
  },
  'unit-trusts': {
    _id: 'unit-trusts',
    title: 'Unit Trusts',
    category: 'OUR SERVICES',
    description: [
      {
        _type: 'block',
        _key: 'b1',
        style: 'normal',
        children: [
          {
            _type: 'span',
            _key: 's1',
            text: 'Professionally managed unit trusts for liquidity, capital preservation, and disciplined income generation.',
          },
        ],
      },
      {
        _type: 'block',
        _key: 'b2',
        style: 'normal',
        children: [
          {
            _type: 'span',
            _key: 's2',
            text: 'Our Unit Trusts consolidate funds from diverse investors into premium corporate paper, government treasury bonds, and high-yielding money market assets. Under active professional management, the fund offers daily liquidity, flexible top-ups, and compounding interest structures, making it an ideal vehicle for both short-term capital parking and long-term wealth accumulation.',
          },
        ],
      },
    ],
    featuresVisible: true,
    bulletsTitle: 'Comprehensive Advisory Services',
    bullets: [
      { _type: 'serviceFeatureItem', text: 'Portfolio Strategy & Asset Allocation', isVisible: true },
      { _type: 'serviceFeatureItem', text: 'Investment Structuring', isVisible: true },
      { _type: 'serviceFeatureItem', text: 'Manager Selection', isVisible: true },
      { _type: 'serviceFeatureItem', text: 'Capital Raising Support', isVisible: true },
      { _type: 'serviceFeatureItem', text: 'Financial Modelling', isVisible: true },
    ],
    isActive: true,
  },
  'pension-retirement': {
    _id: 'pension-retirement',
    title: 'Pension & Retirement Mandates',
    category: 'OUR SERVICES',
    description: [
      {
        _type: 'block',
        _key: 'b1',
        style: 'normal',
        children: [
          {
            _type: 'span',
            _key: 's1',
            text: 'Retirement-focused portfolio management with liability-aware construction for trustees and scheme sponsors.',
          },
        ],
      },
      {
        _type: 'block',
        _key: 'b2',
        style: 'normal',
        children: [
          {
            _type: 'span',
            _key: 's2',
            text: 'Alpha works closely with board of trustees and corporate scheme sponsors to design portfolios matching the long-term pension payment schedules. We employ robust asset-liability modeling (ALM) to ensure solvency, optimize capital returns under regulatory limits, and secure stable returns for retiring beneficiaries.',
          },
        ],
      },
    ],
    featuresVisible: true,
    bulletsTitle: 'Mandate Scopes',
    bullets: [
      { _type: 'serviceFeatureItem', text: 'Asset-Liability Matching (ALM) Strategy', isVisible: true },
      { _type: 'serviceFeatureItem', text: 'Trustee Investment Guidance & Policy Drafting', isVisible: true },
      { _type: 'serviceFeatureItem', text: 'Statutory & Regulatory Compliance Reports', isVisible: true },
      { _type: 'serviceFeatureItem', text: 'Capital Protection during Downside Markets', isVisible: true },
      { _type: 'serviceFeatureItem', text: 'Diversified Real Estate & Bond Allocation', isVisible: true },
    ],
    isActive: true,
  },
};

export const getServiceDefault = (slug: string): ServiceItem => {
  return serviceDefaultsMap[slug] ?? serviceDefaultsMap['unit-trusts'];
};
