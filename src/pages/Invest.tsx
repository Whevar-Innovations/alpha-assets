import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ServiceCard } from '../components/UI/ServiceCard';
import { FooterCTA } from '../components/UI/FooterCTA';
import { SEO } from '../components/SEO';
import type { ServiceItem } from '../types';
import heroBg from '../assets/images/hero_person_laptop.jpg';

import { useSanityPage } from '../sanity/hooks/useSanityPage';
import { INVEST_QUERY } from '../sanity/lib/queries';
import { investDefaults } from '../sanity/defaults/invest';
import { resolveImage } from '../sanity/lib/image';

export const Invest: React.FC = () => {
  const navigate = useNavigate();
  const { data, isLoading } = useSanityPage(INVEST_QUERY, investDefaults);

  if (isLoading) {
    return <InvestSkeleton />;
  }

  if (data.pageVisible === false) {
    void navigate('/404');
    return null;
  }

  const hero = data.hero ?? investDefaults.hero;
  const heroVisible = data.heroVisible ?? true;
  
  const servicesVisible = data.servicesVisible ?? true;
  const servicesSubtitle = data.servicesSubtitle ?? investDefaults.servicesSubtitle;
  const servicesHeading = data.servicesHeading ?? investDefaults.servicesHeading;
  const services = data.servicesList?.length ? data.servicesList : investDefaults.servicesList;

  const bgImgUrl = resolveImage(hero?.backgroundImage, heroBg);

  return (
    <div className="flex flex-col min-h-screen">
      <SEO title={data.seo?.metaTitle} description={data.seo?.metaDescription} ogImage={data.seo?.ogImage} />

      {/* Hero Banner */}
      {heroVisible && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-4 sm:mt-8 w-full">
          <section
            className="relative h-52 sm:h-64 md:h-72 flex items-center justify-center overflow-hidden rounded-2xl md:rounded-[28px]"
            style={{
              backgroundImage: `linear-gradient(rgba(0, 56, 46, 0.78), rgba(0, 56, 46, 0.78)), url(${bgImgUrl})`,
              backgroundSize: 'cover',
              backgroundPositionX: 'center',
              backgroundPositionY: 'bottom',
            }}
          >
            <div className="flex flex-col items-center gap-6 text-center">
              <h1 className="text-4xl sm:text-5xl font-light text-white tracking-tight">
                {hero?.heading}
              </h1>
              
              {hero?.ctaButtons && hero.ctaButtons.length > 0 && hero.ctaButtons[0].isVisible && (
                <a
                  href={hero.ctaButtons[0].url}
                  className="inline-flex items-center gap-2 bg-white text-brand-dark font-bold text-xs uppercase tracking-wider px-8 py-3.5 rounded-full transition-all duration-150 shadow-sm hover:bg-brand-green focus:outline-none focus:ring-2 focus:ring-brand-green focus:ring-offset-2"
                >
                  {hero.ctaButtons[0].label}
                </a>
              )}
            </div>
          </section>
        </div>
      )}

      {/* Services Grid Section */}
      {servicesVisible && (
        <section className="py-32 bg-white scroll-mt-32" id="services">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
              <span className="text-xs font-bold uppercase tracking-widest text-brand-primary">{servicesSubtitle}</span>
              <h2 className="text-4xl sm:text-5xl font-light text-brand-dark whitespace-pre-line">
                {servicesHeading}
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services?.map((service: ServiceItem) => (
                <ServiceCard
                  key={service._id || service.slug?.current}
                  id={service.slug?.current ?? service._id}
                  title={service.title}
                  description={service.shortDescription ?? ''}
                  iconName={service.iconName ?? 'Briefcase'}
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
      )}

      {/* Footer CTA */}
      <FooterCTA />

    </div>
  );
};

const InvestSkeleton: React.FC = () => (
  <div className="flex flex-col min-h-screen animate-pulse bg-white">
    {/* Hero Banner */}
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-4 sm:mt-8 w-full">
      <div className="h-52 sm:h-64 md:h-72 bg-gray-200 rounded-2xl md:rounded-[28px] w-full flex flex-col items-center justify-center gap-6">
         <div className="h-10 bg-gray-300 rounded w-1/3"></div>
         <div className="h-12 bg-gray-300 rounded-full w-40"></div>
      </div>
    </div>

    {/* Services Grid Section */}
    <div className="py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4 flex flex-col items-center">
          <div className="h-4 bg-gray-200 rounded w-24"></div>
          <div className="h-10 bg-gray-300 rounded w-1/2 mt-2"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3, 4, 5, 6].map(i => (
            <div key={i} className="h-[280px] bg-gray-100 rounded-3xl"></div>
          ))}
        </div>
      </div>
    </div>
  </div>
);
