import React from 'react';
import { useNavigate } from 'react-router-dom';
import { SEO } from '../components/SEO';
import { PensionCalculator } from '../components/Calculator/PensionCalculator';
import { FooterCTA } from '../components/UI/FooterCTA';
import { Accordion } from '../components/UI/Accordion';
import { DynamicIcon } from '../components/UI/DynamicIcon';
import { useSanityPage } from '../sanity/hooks/useSanityPage';
import { PENSION_CALCULATOR_QUERY } from '../sanity/lib/queries';
import { pensionCalculatorDefaults } from '../sanity/defaults/pensionCalculator';
import type { PensionCalculatorPageData } from '../types';

export const PensionCalculatorPage: React.FC = () => {
  const navigate = useNavigate();
  const { data } = useSanityPage<PensionCalculatorPageData>(
    PENSION_CALCULATOR_QUERY,
    pensionCalculatorDefaults
  );

  if (data.pageVisible === false) {
    void navigate('/404');
    return null;
  }

  const heroVisible = data.heroVisible !== false;
  const heroSubtitle = data.heroSubtitle ?? pensionCalculatorDefaults.heroSubtitle;
  const heroHeading = data.heroHeading ?? pensionCalculatorDefaults.heroHeading;
  const heroDescription = data.heroDescription ?? pensionCalculatorDefaults.heroDescription;

  const advantagesVisible = data.advantagesVisible !== false;
  const advantagesSubtitle = data.advantagesSubtitle ?? pensionCalculatorDefaults.advantagesSubtitle;
  const advantagesHeading = data.advantagesHeading ?? pensionCalculatorDefaults.advantagesHeading;
  const rawAdvantages = data.advantagesItems ?? pensionCalculatorDefaults.advantagesItems;
  const visibleAdvantages = (rawAdvantages ?? []).filter((item) => item.isVisible !== false);

  const faqVisible = data.faqVisible !== false;
  const faqSubtitle = data.faqSubtitle ?? pensionCalculatorDefaults.faqSubtitle;
  const faqHeading = data.faqHeading ?? pensionCalculatorDefaults.faqHeading;
  const rawFaqs = data.faqItems ?? pensionCalculatorDefaults.faqItems;
  const visibleFaqs = (rawFaqs ?? []).filter((item) => item.isVisible !== false);

  const accordionItems = visibleFaqs.map((item, index) => ({
    id: item._key ?? item.id ?? `faq-${String(index)}`,
    question: item.question,
    answer: item.answer,
  }));

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <SEO
        title={data.seo?.metaTitle ?? pensionCalculatorDefaults.seo?.metaTitle}
        description={data.seo?.metaDescription ?? pensionCalculatorDefaults.seo?.metaDescription}
        ogImage={data.seo?.ogImage}
      />

      {/* ── Hero Banner ─────────────────────────────────────────── */}
      {heroVisible && (
        <section className="pt-8 sm:pt-12 pb-6 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            {heroSubtitle && (
              <span className="text-xs font-bold uppercase tracking-widest text-brand-primary">
                {heroSubtitle}
              </span>
            )}
            {heroHeading && (
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-medium text-brand-dark tracking-tight">
                {heroHeading}
              </h1>
            )}
            {heroDescription && (
              <p className="text-sm sm:text-base text-brand-gray/80 max-w-2xl mx-auto font-light leading-relaxed">
                {heroDescription}
              </p>
            )}
          </div>
        </section>
      )}

      {/* ── Main Calculator Interactive Section ─────────────────── */}
      <section className="py-6 sm:py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <PensionCalculator />
      </section>

      {/* ── Key Advantages & Institutional Features ─────────────── */}
      {advantagesVisible && visibleAdvantages.length > 0 && (
        <section className="py-16 sm:py-24 bg-brand-faqBg/40 mt-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 space-y-3">
              {advantagesSubtitle && (
                <span className="text-xs font-bold uppercase tracking-widest text-brand-primary">
                  {advantagesSubtitle}
                </span>
              )}
              {advantagesHeading && (
                <h2 className="text-3xl sm:text-4xl font-light text-brand-dark">
                  {advantagesHeading}
                </h2>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {visibleAdvantages.map((item, index) => {
                const iconName = item.icon?.name ?? 'Shield';
                return (
                  <div
                    key={item._key ?? `advantage-${String(index)}`}
                    className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col justify-between"
                  >
                    <div>
                      <div className="w-10 h-10 rounded-xl bg-brand-cardBg flex items-center justify-center text-brand-primary mb-4">
                        <DynamicIcon name={iconName} className="w-5 h-5" />
                      </div>
                      <h3 className="text-lg font-bold text-brand-dark mb-2">{item.title}</h3>
                      <p className="text-xs sm:text-sm text-brand-gray/80 font-light leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* ── FAQ Section ─────────────────────────────────────────── */}
      {faqVisible && accordionItems.length > 0 && (
        <section className="py-20 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12 space-y-3">
              {faqSubtitle && (
                <span className="text-xs font-bold uppercase tracking-widest text-brand-primary">
                  {faqSubtitle}
                </span>
              )}
              {faqHeading && (
                <h2 className="text-3xl sm:text-4xl font-light text-brand-dark">
                  {faqHeading}
                </h2>
              )}
            </div>

            <Accordion items={accordionItems} />
          </div>
        </section>
      )}

      {/* ── Footer CTA ──────────────────────────────────────────── */}
      <FooterCTA
        isVisible={data.footerCtaVisible}
        text={data.footerCtaText}
        boldText={data.footerCtaBoldText}
        buttonConfig={data.footerCtaButton}
      />
    </div>
  );
};
