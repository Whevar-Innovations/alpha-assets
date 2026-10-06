import React from 'react';
import { SEO } from '../components/SEO';
import { PensionCalculator } from '../components/Calculator/PensionCalculator';
import { FooterCTA } from '../components/UI/FooterCTA';
import { Accordion } from '../components/UI/Accordion';
import { Sparkles, Shield, TrendingUp, Landmark } from 'lucide-react';

export const PensionCalculatorPage: React.FC = () => {
  const faqItems = [
    {
      id: 'faq-1',
      question: 'How do employer and employee contributions work under the Umbrella Pension Scheme?',
      answer:
        'Under an Umbrella Scheme, your employer can set a structured matching percentage (for instance, 5% contributed by the employee matched with 10% by the employer). Both portions are deposited directly into your segregated individual retirement account and invested in high-yielding asset classes according to URBRA regulations.',
    },
    {
      id: 'faq-2',
      question: 'Can I make voluntary additional top-ups to my pension fund?',
      answer:
        'Yes! You can make ad-hoc or recurring voluntary top-up contributions at any time without penalty. Voluntary contributions compound alongside your mandatory contributions, accelerating your journey toward retirement freedom.',
    },
    {
      id: 'faq-3',
      question: 'How is my estimated monthly retirement income calculated?',
      answer:
        'Our calculator estimates your monthly pension payout assuming a 20-year post-retirement drawdown using standard annuity actuarial factors at a conservative annual yield of 8.5% p.a. You can also opt for a lump-sum payout upon reaching statutory retirement age.',
    },
    {
      id: 'faq-4',
      question: 'How are pension assets safeguarded and regulated in Uganda?',
      answer:
        'Alpha Asset Managers Ltd is licensed and regulated by the Capital Markets Authority (CMA) and operates under the strict oversight of the Uganda Retirement Benefits Regulatory Authority (URBRA). All assets are held by independent licensed custodians, guaranteeing fiduciary safety and transparency.',
    },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <SEO
        title="Pension & Retirement Calculator | Alpha Asset Managers"
        description="Simulate your pension nest egg and retirement monthly income. Calculate compound growth, employer matching, and retirement goals with Alpha Asset Managers."
      />

      {/* ── Hero Banner ─────────────────────────────────────────── */}
      <section className="pt-8 sm:pt-12 pb-6 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="text-xs font-bold uppercase tracking-widest text-brand-primary">
            GROWTH & RETIREMENT CALCULATOR
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-light text-brand-dark tracking-tight">
            See what your money could become
          </h1>
          <p className="text-sm sm:text-base text-brand-gray/80 max-w-2xl mx-auto font-light leading-relaxed">
            Choose a pension scheme, type your numbers and watch the projection respond in real time.
          </p>
        </div>
      </section>

      {/* ── Main Calculator Interactive Section ─────────────────── */}
      <section className="py-6 sm:py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <PensionCalculator />
      </section>

      {/* ── Key Advantages & Institutional Features ─────────────── */}
      <section className="py-16 sm:py-24 bg-brand-faqBg/40 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 space-y-3">
            <span className="text-xs font-bold uppercase tracking-widest text-brand-primary">
              INSTITUTIONAL RIGOUR
            </span>
            <h2 className="text-3xl sm:text-4xl font-light text-brand-dark">
              Why Structure Your Retirement with Alpha
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-brand-cardBg flex items-center justify-center text-brand-primary mb-4">
                  <Landmark className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-brand-dark mb-2">Asset-Liability Matching</h3>
                <p className="text-xs sm:text-sm text-brand-gray/80 font-light leading-relaxed">
                  We construct portfolios explicitly tailored to retirement cash-flow commitments, protecting against market drawdowns.
                </p>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-brand-cardBg flex items-center justify-center text-brand-primary mb-4">
                  <TrendingUp className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-brand-dark mb-2">Compounding Power</h3>
                <p className="text-xs sm:text-sm text-brand-gray/80 font-light leading-relaxed">
                  Disciplined monthly contributions and reinvested yields compound exponentially over long-term investment horizons.
                </p>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-brand-cardBg flex items-center justify-center text-brand-primary mb-4">
                  <Sparkles className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-brand-dark mb-2">Tax Efficiency</h3>
                <p className="text-xs sm:text-sm text-brand-gray/80 font-light leading-relaxed">
                  Take full advantage of statutory tax-exempt contributions for registered occupational and umbrella schemes in Uganda.
                </p>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-brand-cardBg flex items-center justify-center text-brand-primary mb-4">
                  <Shield className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-brand-dark mb-2">Fiduciary Governance</h3>
                <p className="text-xs sm:text-sm text-brand-gray/80 font-light leading-relaxed">
                  Independent custodian segregation, regular URBRA statutory filings, and comprehensive trustee reporting.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ Section ─────────────────────────────────────────── */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 space-y-3">
            <span className="text-xs font-bold uppercase tracking-widest text-brand-primary">
              FREQUENTLY ASKED QUESTIONS
            </span>
            <h2 className="text-3xl sm:text-4xl font-light text-brand-dark">
              Retirement & Pension FAQs
            </h2>
          </div>

          <Accordion items={faqItems} />
        </div>
      </section>

      {/* ── Footer CTA ──────────────────────────────────────────── */}
      <FooterCTA />
    </div>
  );
};
