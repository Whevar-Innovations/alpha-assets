import type { PensionCalculatorPageData } from '../../types';

export const pensionCalculatorDefaults: PensionCalculatorPageData = {
  seo: {
    metaTitle: 'Pension & Retirement Calculator',
    metaDescription:
      'Simulate your pension nest egg and retirement monthly income. Calculate compound growth, employer matching, and retirement goals with Alpha Asset Managers.',
  },
  pageVisible: true,
  heroVisible: true,
  heroSubtitle: 'GROWTH & RETIREMENT CALCULATOR',
  heroHeading: 'See what your money could become',
  heroDescription:
    'Choose a pension scheme, type your numbers and watch the projection respond in real time.',
  advantagesVisible: true,
  advantagesSubtitle: 'INSTITUTIONAL RIGOUR',
  advantagesHeading: 'Why Structure Your Retirement with Alpha',
  advantagesItems: [
    {
      _key: 'adv-1',
      title: 'Asset-Liability Matching',
      description:
        'We construct portfolios explicitly tailored to retirement cash-flow commitments, protecting against market drawdowns.',
      icon: { name: 'Landmark' },
      isVisible: true,
    },
    {
      _key: 'adv-2',
      title: 'Compounding Power',
      description:
        'Disciplined monthly contributions and reinvested yields compound exponentially over long-term investment horizons.',
      icon: { name: 'TrendingUp' },
      isVisible: true,
    },
    {
      _key: 'adv-3',
      title: 'Tax Efficiency',
      description:
        'Take full advantage of statutory tax-exempt contributions for registered occupational and umbrella schemes in Uganda.',
      icon: { name: 'Sparkles' },
      isVisible: true,
    },
    {
      _key: 'adv-4',
      title: 'Fiduciary Governance',
      description:
        'Independent custodian segregation, regular URBRA statutory filings, and comprehensive trustee reporting.',
      icon: { name: 'Shield' },
      isVisible: true,
    },
  ],
  faqVisible: true,
  faqSubtitle: 'FREQUENTLY ASKED QUESTIONS',
  faqHeading: 'Retirement & Pension FAQs',
  faqItems: [
    {
      _key: 'faq-1',
      id: 'faq-1',
      question: 'How do employer and employee contributions work under the Umbrella Pension Scheme?',
      answer:
        'Under an Umbrella Scheme, your employer can set a structured matching percentage (for instance, 5% contributed by the employee matched with 10% by the employer). Both portions are deposited directly into your segregated individual retirement account and invested in high-yielding asset classes according to URBRA regulations.',
      isVisible: true,
    },
    {
      _key: 'faq-2',
      id: 'faq-2',
      question: 'Can I make voluntary additional top-ups to my pension fund?',
      answer:
        'Yes! You can make ad-hoc or recurring voluntary top-up contributions at any time without penalty. Voluntary contributions compound alongside your mandatory contributions, accelerating your journey toward retirement freedom.',
      isVisible: true,
    },
    {
      _key: 'faq-3',
      id: 'faq-3',
      question: 'How is my estimated monthly retirement income calculated?',
      answer:
        'Our calculator estimates your monthly pension payout assuming a 20-year post-retirement drawdown using standard annuity actuarial factors at a conservative annual yield of 8.5% p.a. You can also opt for a lump-sum payout upon reaching statutory retirement age.',
      isVisible: true,
    },
    {
      _key: 'faq-4',
      id: 'faq-4',
      question: 'How are pension assets safeguarded and regulated in Uganda?',
      answer:
        'Alpha Asset Managers Ltd is licensed and regulated by the Capital Markets Authority (CMA) and operates under the strict oversight of the Uganda Retirement Benefits Regulatory Authority (URBRA). All assets are held by independent licensed custodians, guaranteeing fiduciary safety and transparency.',
      isVisible: true,
    },
  ],
  footerCtaVisible: true,
};
