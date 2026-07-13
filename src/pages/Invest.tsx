import React from 'react';
import { ServiceCard } from '../components/UI/ServiceCard';
import { FooterCTA } from '../components/UI/FooterCTA';
import bannerBg from '../assets/images/banner_bg.jpg';

export const Invest: React.FC = () => {
  const services = [
    {
      id: 'advisory-capital-solutions',
      title: 'Advisory & Capital Solutions',
      description: 'Strategic guidance for corporates, foundations, institutions, and sophisticated investors on portfolio strategy, asset allocation, manager selection, and investment structuring.',
      iconName: 'Briefcase' as const,
      isActive: false, // Default state is normal card
    },
    {
      id: 'direct-lending-fund',
      title: 'Direct Lending Fund',
      description: 'Secured senior lending strategy for institutional and sophisticated investors seeking attractive risk-adjusted income.',
      iconName: 'Coins' as const,
      isActive: true, // Let's make this one active on this page for layout visual balance!
    },
    {
      id: 'private-equity',
      title: 'Private Equity',
      description: 'Long-term growth capital through disciplined investment in promising businesses with active ownership approach.',
      iconName: 'Building2' as const,
      isActive: false,
    },
    {
      id: 'separately-managed-accounts',
      title: 'Separately Managed Accounts',
      description: 'Bespoke discretionary portfolios in UGX or USD, tailored to your objectives, liquidity profile, risk tolerance, and reporting requirements.',
      iconName: 'Sliders' as const,
      isActive: false,
    },
    {
      id: 'unit-trusts',
      title: 'Unit Trusts',
      description: 'Professionally managed unit trusts for liquidity, capital preservation, and disciplined income generation.',
      iconName: 'Layers' as const,
      isActive: false,
    },
    {
      id: 'pension-retirement',
      title: 'Pension & Retirement Mandates',
      description: 'Retirement-focused portfolio management with liability-aware construction for trustees and scheme sponsors.',
      iconName: 'PiggyBank' as const,
      isActive: false,
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      
      {/* Hero Banner */}
      <section 
        className="relative h-48 sm:h-56 flex items-center bg-brand-dark"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 46, 46, 0.85), rgba(0, 46, 46, 0.85)), url(${bannerBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center w-full">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-wide">
            Invest
          </h1>
        </div>
      </section>

      {/* Services Grid Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <span className="text-xs font-bold uppercase tracking-widest text-brand-accent">Our Services</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-dark">
              Solutions designed to meet the evolving needs of individuals & institutional investors
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => (
              <ServiceCard
                key={service.id}
                id={service.id}
                title={service.title}
                description={service.description}
                iconName={service.iconName}
                isActive={service.isActive}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <FooterCTA />

    </div>
  );
};
