import React from 'react';
import { ServiceCard } from '../components/UI/ServiceCard';
import { FooterCTA } from '../components/UI/FooterCTA';
import heroBg from '../assets/images/hero_person_laptop.jpg';

export const Invest: React.FC = () => {
  const services = [
    {
      id: 'separately-managed-accounts',
      title: 'Separately Managed Accounts',
      description: 'Bespoke discretionary portfolios in UGX or USD, tailored to your objectives, liquidity profile, risk tolerance, and reporting requirements.',
      iconName: 'Sliders' as const,
    },
    {
      id: 'advisory-capital-solutions',
      title: 'Advisory & Capital Solutions',
      description: 'Strategic guidance for corporates, foundations, institutions, and sophisticated investors on portfolio strategy, asset allocation, manager selection, and investment structuring.',
      iconName: 'Users' as const,
    },
    {
      id: 'direct-lending-fund',
      title: 'Direct Lending Fund',
      description: 'Secured senior lending strategy for institutional and sophisticated investors seeking attractive risk-adjusted income.',
      iconName: 'Coins' as const,
    },
    {
      id: 'private-equity',
      title: 'Private Equity',
      description: 'Long-term growth capital through disciplined investment in promising businesses with active ownership approach.',
      iconName: 'Building2' as const,
    },
    {
      id: 'unit-trusts',
      title: 'Unit Trusts',
      description: 'Professionally managed unit trusts for liquidity, capital preservation, and disciplined income generation.',
      iconName: 'Layers' as const,
    },
    {
      id: 'pension-retirement',
      title: 'Pension & Retirement Mandates',
      description: 'Retirement-focused portfolio management with liability-aware construction for trustees and scheme sponsors.',
      iconName: 'PiggyBank' as const,
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">

      {/* Hero Banner */}
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-4 sm:mt-8 w-full">
        <section
          className="relative h-52 sm:h-64 md:h-72 flex items-center justify-center overflow-hidden rounded-2xl md:rounded-[28px]"
          style={{
            backgroundImage: `linear-gradient(rgba(0, 56, 46, 0.78), rgba(0, 56, 46, 0.78)), url(${heroBg})`,
            backgroundSize: 'cover',
            backgroundPositionX: 'center',
            backgroundPositionY: 'bottom',
          }}
        >
          <h1 className="text-4xl sm:text-5xl font-light text-white tracking-tight">
            Invest
          </h1>
        </section>
      </div>

      {/* Services Grid Section */}
      <section className="py-32 bg-white scroll-mt-32" id="services">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <span className="text-xs font-bold uppercase tracking-widest text-brand-primary">Our Services</span>
            <h2 className="text-4xl sm:text-5xl font-light text-brand-dark">
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
                isActive={false}
                bgClass="bg-brand-cardBg"
                activeBgClass="bg-brand-primary"
                iconBgClass="bg-brand-primary"
                activeIconBgClass="bg-white"
                iconColorClass="text-brand-green"
                activeIconColorClass="text-brand-primary"
                titleColorClass="text-brand-primary"
                activeTitleColorClass="text-brand-green"
                textColorClass="text-gray-500"
                activeTextColorClass="text-white/90"
                linkColorClass="text-brand-primary"
                activeLinkColorClass="text-brand-green"
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
