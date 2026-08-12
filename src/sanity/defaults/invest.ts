import { homeDefaults } from './home';

import type { InvestPageData } from '../../types';

export const investDefaults: InvestPageData = {
  seo: { metaTitle: '', metaDescription: '', ogImage: undefined },
  pageVisible: true,
  heroVisible: true,
  hero: {
    heading: 'Invest',
    ctaButton: {
      label: 'Sign Up / Login',
      linkType: 'external',
      url: '#',
      variant: 'white',
      isVisible: true
    }
  },
  servicesVisible: true,
  servicesSubtitle: 'Our Services',
  servicesHeading: 'Solutions designed to meet the evolving needs of individuals & institutional investors',
  servicesList: homeDefaults.servicesList,
};
