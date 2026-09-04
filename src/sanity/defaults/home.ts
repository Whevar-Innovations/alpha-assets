import type { HomePageData } from '../../types';

export const homeDefaults: HomePageData = {
  seo: { metaTitle: '', metaDescription: '', ogImage: undefined },
  pageVisible: true,
  heroVisible: true,
  heroSlides: [
    {
      heading: 'Institutional investment management,',
      highlightText: 'built for East Africa',
      subtext: 'We design transparent, risk-controlled portfolios for\ninstitutions, family offices and private clients.',
      ctaButtons: [
        {
          label: 'Explore Our Strategies',
          linkType: 'internal',
          url: '/invest',
          variant: 'white',
          isVisible: true,
        },
      ],
    },
  ],
  videoFeaturesVisible: true,
  videoFeatures: [
    {
      youtubeUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      watchLabel: 'WATCH VIDEO',
      quoteText:
        'We take a structured approach to investment management from understanding our clients’ objectives, developing tailored strategies to diversification across asset classes.',
      speakerName: 'ROBERT KATUNTU',
      speakerTitle: 'CEO & CHIEF INVESTMENT OFFICER',
    },
  ],
  hero: {
    heading: 'Grow your capital with',
    highlightText: 'smarter investments',
    subtext: 'Watch your money and assets work harder: \nfor today, for tomorrow and for generations',
    ctaButtons: [
      {
        label: 'Speak to an Advisor',
        linkType: 'internal',
        url: '/contact',
        variant: 'primary',
        isVisible: true
      }
    ]
  },
  servicesVisible: true,
  servicesHeading: 'Expert advisory for\nmaximum returns',
  servicesSubtext: "We don't just manage your assets; we empower you with clarity, control and confidence every step of the way",
  servicesList: [
    {
      _id: 'separately-managed-accounts',
      title: 'Separately Managed Accounts',
      slug: { current: 'separately-managed-accounts' },
      shortDescription: 'Bespoke discretionary portfolios in UGX or USD, tailored to your objectives, liquidity profile, risk tolerance, and reporting requirements.',
      icon: { name: 'Sliders' },
    },
    {
      _id: 'advisory-capital-solutions',
      title: 'Advisory & Capital Solutions',
      slug: { current: 'advisory-capital-solutions' },
      shortDescription: 'Strategic guidance for corporates, foundations, institutions, and sophisticated investors on portfolio strategy, asset allocation, manager selection, and investment structuring.',
      icon: { name: 'Users' },
    },
    {
      _id: 'direct-lending-fund',
      title: 'Direct Lending Fund',
      slug: { current: 'direct-lending-fund' },
      shortDescription: 'Secured senior lending strategy for institutional and sophisticated investors seeking attractive risk-adjusted income.',
      icon: { name: 'Coins' },
    },
    {
      _id: 'private-equity',
      title: 'Private Equity',
      slug: { current: 'private-equity' },
      shortDescription: 'Long-term growth capital through disciplined investment in promising businesses with active ownership approach.',
      icon: { name: 'Building2' },
    },
    {
      _id: 'unit-trusts',
      title: 'Unit Trusts',
      slug: { current: 'unit-trusts' },
      shortDescription: 'Professionally managed unit trusts for liquidity, capital preservation, and disciplined income generation.',
      icon: { name: 'Layers' },
    },
    {
      _id: 'pension-retirement',
      title: 'Pension & Retirement Mandates',
      slug: { current: 'pension-retirement' },
      shortDescription: 'Retirement-focused portfolio management with liability-aware construction for trustees and scheme sponsors.',
      icon: { name: 'PiggyBank' },
    },
  ],
  howWeWorkVisible: true,
  howWeWorkSubtitle: 'How We Work',
  howWeWorkHeading: 'Delivering Long-Term Value Through Investment',
  howWeWorkItems: [
    {
      title: 'Strategic Investment',
      description: 'We align your capital with high-performing, researched assets tailored to deliver consistent yields across changing market cycles.',
      icon: { name: 'Compass' },
      isVisible: true,
    },
    {
      title: 'Risk Management',
      description: 'Our proprietary risk screening processes prioritize capital preservation through deep sector analysis and active diversification.',
      icon: { name: 'ShieldCheck' },
      isVisible: true,
    },
    {
      title: 'Transparent Process',
      description: 'We believe in full clarity, providing detailed regular performance reports and direct access to client management tools.',
      icon: { name: 'Eye' },
      isVisible: true,
    },
    {
      title: 'Forecasting & Review',
      description: 'Continuous portfolio reviews and predictive macroeconomic mapping ensure your strategy shifts ahead of critical market changes.',
      icon: { name: 'TrendingUp' },
      isVisible: true,
    },
  ],
  partnersVisible: false,
  partnersHeading: 'Building Strong Relationships With Every Client We Serve',
  partnerLogos: [],
  faqVisible: true,
  faqHeading: 'Frequently Asked Questions',
  faqSubtext: 'Got questions? Here are some quick answers to help you get the most out of Alpha Asset Managers.',
  faqItems: [
    {
      question: 'What does Alpha Asset Managers do?',
      answer: 'Alpha Asset Managers provides professional investment management services, helping individuals and institutions grow and preserve their wealth through carefully structured portfolios and strategic financial guidance.',
      isVisible: true,
    },
    {
      question: 'Who can invest with Alpha Asset Managers?',
      answer: 'We cater to institutional investors (corporates, pensions, foundations), high-net-worth individuals, family offices, and retail clients looking for disciplined and structured asset management services.',
      isVisible: true,
    },
    {
      question: 'How do you manage investment risk?',
      answer: 'Risk management is core to our philosophy. We diversify assets across sectors and currencies, perform deep fundamental research, and implement strict risk control limits to safeguard capital.',
      isVisible: true,
    },
    {
      question: 'How can I get started?',
      answer: 'You can get started by clicking the "Speak to an Advisor" button to set up a consultation with one of our investment managers. We will review your objectives and guide you through the registration process.',
      isVisible: true,
    },
  ],
  footerCtaVisible: true,
  footerCtaText: 'Ready to optimize your portfolio?',
  footerCtaBoldText: 'Start investing today',
  footerCtaButton: {
    label: 'Open an Account',
    linkType: 'internal',
    url: '/invest',
    variant: 'white',
    isVisible: true,
  },
};
