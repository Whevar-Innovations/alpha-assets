import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ServiceCard } from '../components/UI/ServiceCard';
import { Accordion } from '../components/UI/Accordion';
import { FooterCTA } from '../components/UI/FooterCTA';
import { SectionHeader } from '../components/UI/SectionHeader';
import { FeatureCard } from '../components/UI/FeatureCard';
import type { HomePageData, ServiceItem, CTAButton, HeroSlide } from '../types';
import { DynamicIcon } from '../components/UI/DynamicIcon';
import { SEO } from '../components/SEO';
import { HeroCarousel } from '../components/UI/HeroCarousel';

import { useSanityPage } from '../sanity/hooks/useSanityPage';
import { HOME_QUERY } from '../sanity/lib/queries';
import { homeDefaults } from '../sanity/defaults/home';
import { resolveImage } from '../sanity/lib/image';
import { formatCMSLines } from '../utils/formatText';


export const Home: React.FC = () => {
  const navigate = useNavigate();
  const { data, isLoading } = useSanityPage<HomePageData>(HOME_QUERY, homeDefaults);

  if (isLoading) {
    return <HomeSkeleton />;
  }

  if (data.pageVisible === false) {
    void navigate('/404');
    return null;
  }

  // Fallbacks
  // Prefer heroSlides from CMS; fall back to wrapping the legacy hero; last resort: seeded defaults
  const rawSlides = data.heroSlides?.length
    ? data.heroSlides
    : data.hero
      ? [data.hero as HeroSlide]
      : (homeDefaults.heroSlides ?? []);

  // Enforce hard max of 3 at runtime (mirrors Sanity validation)
  const heroSlides = rawSlides.slice(0, 3);

  const heroVisible = data.heroVisible ?? true;

  const servicesVisible = data.servicesVisible ?? true;
  const servicesHeading = data.servicesHeading ?? homeDefaults.servicesHeading;
  const servicesSubtext = data.servicesSubtext ?? homeDefaults.servicesSubtext;
  const services = data.servicesList?.length ? data.servicesList : homeDefaults.servicesList;
  
  const howWeWorkVisible = data.howWeWorkVisible ?? true;
  const howWeWorkSubtitle = data.howWeWorkSubtitle ?? homeDefaults.howWeWorkSubtitle;
  const howWeWorkHeading = data.howWeWorkHeading ?? homeDefaults.howWeWorkHeading;
  const howWeWorkItems = data.howWeWorkItems?.length ? data.howWeWorkItems : homeDefaults.howWeWorkItems;
  
  const partnersVisible = data.partnersVisible ?? false;
  const partnersHeading = data.partnersHeading ?? homeDefaults.partnersHeading;
  const partnerLogos = data.partnerLogos?.length ? data.partnerLogos : homeDefaults.partnerLogos;
  
  const faqVisible = data.faqVisible ?? true;
  const faqHeading = data.faqHeading ?? homeDefaults.faqHeading;
  const faqSubtext = data.faqSubtext ?? homeDefaults.faqSubtext;
  const faqs = data.faqItems?.length ? data.faqItems : homeDefaults.faqItems;


  return (
    <div className="flex flex-col min-h-screen">
      <SEO title={data.seo?.metaTitle} description={data.seo?.metaDescription} ogImage={data.seo?.ogImage} />

      {/* Hero Carousel */}
      {heroVisible && heroSlides.length > 0 && (
        <HeroCarousel
          slides={heroSlides}
          onNavigate={(url, linkType) => {
            if (linkType === 'external') window.open(url, '_blank');
            else void navigate(url);
          }}
        />
      )}

      {/* Services Section */}
      {servicesVisible && (
        <section className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-light text-brand-primary text-center leading-tight whitespace-pre-line">
                {formatCMSLines(servicesHeading)}
              </h2>
              <p className="text-base text-teal-900 opacity-80 leading-relaxed whitespace-pre-line">
                {formatCMSLines(servicesSubtext)}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services?.map((service: ServiceItem) => (
                <ServiceCard
                  key={service._id || service.slug?.current}
                  id={service.slug?.current ?? service._id}
                  title={service.title}
                  description={service.shortDescription ?? ''}
                  icon={service.icon}
                  isActive={false} // Home page doesn't highlight one by default
                  activeBgClass="bg-brand-primary"
                  activeTitleColorClass="text-brand-green"
                  titleColorClass="text-brand-primary"
                  textColorClass="text-gray-500"
                  activeTextColorClass="text-white/90"
                  linkColorClass="text-brand-primary"
                  activeLinkColorClass="text-brand-green"
                  iconBgClass="bg-brand-primary"
                  activeIconBgClass="bg-white"
                  activeIconColorClass="text-brand-dark"
                />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Delivering Long-Term Value (How We Work) */}
      {howWeWorkVisible && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
          <section className="py-20 sm:py-24 bg-gradient-to-b from-brand-dark to-brand-primary rounded-3xl md:rounded-[40px] px-4 sm:px-8">
            <SectionHeader 
              subtitle={howWeWorkSubtitle ?? ''} 
              title={formatCMSLines(howWeWorkHeading)}
              theme="dark"
              className="mb-16 sm:mb-20"
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 max-w-6xl mx-auto">
              {howWeWorkItems?.filter(item => item.isVisible !== false).map((item: { title: string; description: string; icon?: { name?: string }; isVisible?: boolean }, index: number) => {
                // FeatureCard expects an Icon component, so we wrap DynamicIcon
                const IconComponent = (props: React.SVGProps<SVGSVGElement>) => <DynamicIcon name={item.icon?.name ?? ''} {...props} />;
                return (
                  <FeatureCard 
                    key={index}
                    title={item.title}
                    description={item.description}
                    Icon={IconComponent}
                  />
                );
              })}
            </div>
          </section>
        </div>
      )}

      {/* Trust & Partners */}
      {partnersVisible && (
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col items-center">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-light text-brand-primary text-center leading-tight whitespace-pre-line">
                {formatCMSLines(partnersHeading)}
              </h2>
              <div className="flex flex-wrap justify-center items-center gap-10 md:gap-16 mt-12">
                {partnerLogos?.filter(p => p.isVisible !== false).map((partner: { name: string; logo: unknown; url?: string; isVisible?: boolean }, idx: number) => {
                  const partnerLogo = partner.logo as { image?: unknown; alt?: string } | undefined;
                  return (
                  <a key={idx} href={partner.url} target="_blank" rel="noopener noreferrer">
                    <img 
                      src={resolveImage(partnerLogo)} 
                      alt={partnerLogo?.alt ?? partner.name} 
                      className="h-12 md:h-16 w-auto object-contain" 
                    />
                  </a>
                )})}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* FAQ Section */}
      {faqVisible && (
        <section className="py-24 bg-brand-faqBg">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-14 space-y-4">
              <h2 className="text-[32px] sm:text-[44px] font-light text-[#0D382D] whitespace-pre-line">
                {formatCMSLines(faqHeading)}
              </h2>
              <p className="text-[15px] sm:text-base text-[#758E87] font-light whitespace-pre-line">
                {formatCMSLines(faqSubtext)}
              </p>
            </div>

            <Accordion items={(faqs ?? []).filter(f => f.isVisible !== false).map((f: { question: string; answer: string; isVisible?: boolean }, i: number) => ({ id: `faq-${String(i)}`, question: f.question, answer: f.answer }))} />
          </div>
        </section>
      )}

      {/* Footer CTA */}
      {data.footerCtaVisible !== false && (
        <FooterCTA 
          text={data.footerCtaText} 
          boldText={data.footerCtaBoldText} 
          buttonConfig={data.footerCtaButton as CTAButton | undefined} 
        />
      )}
      
    </div>
  );
};

const HomeSkeleton: React.FC = () => (
  <div className="flex flex-col min-h-screen animate-pulse bg-white">
    {/* Hero Skeleton */}
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-4 sm:mt-8 w-full">
      <div className="min-h-[500px] md:min-h-[640px] bg-gray-200 rounded-2xl md:rounded-[32px] w-full"></div>
    </div>
    
    {/* Services Skeleton */}
    <div className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4 flex flex-col items-center">
          <div className="h-10 bg-gray-200 rounded w-1/2"></div>
          <div className="h-4 bg-gray-100 rounded w-3/4"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3].map(i => (
            <div key={i} className="h-[280px] bg-gray-100 rounded-3xl"></div>
          ))}
        </div>
      </div>
    </div>

    {/* How We Work Skeleton */}
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
      <div className="py-20 sm:py-24 bg-gray-100 rounded-3xl md:rounded-[40px] px-4 sm:px-8">
        <div className="flex justify-center mb-16">
           <div className="h-10 bg-gray-200 rounded w-1/3"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 max-w-6xl mx-auto">
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="h-40 bg-gray-200 rounded-3xl"></div>
          ))}
        </div>
      </div>
    </div>
  </div>
);
