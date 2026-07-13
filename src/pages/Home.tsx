import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ServiceCard } from '../components/UI/ServiceCard';
import { Accordion } from '../components/UI/Accordion';
import { FooterCTA } from '../components/UI/FooterCTA';
import heroMan from '../assets/images/hero_man.jpg';
import { Compass, ShieldCheck, Eye, TrendingUp } from 'lucide-react';

export const Home: React.FC = () => {
  const navigate = useNavigate();

  const services = [
    {
      id: 'advisory-capital-solutions',
      title: 'Advisory & Capital Solutions',
      description: 'Strategic guidance for corporates, foundations, institutions, and sophisticated investors on portfolio strategy, asset allocation, manager selection, and investment structuring.',
      iconName: 'Briefcase' as const,
      isActive: true,
    },
    {
      id: 'direct-lending-fund',
      title: 'Direct Lending Fund',
      description: 'Secured senior lending strategy for institutional and sophisticated investors seeking attractive risk-adjusted income.',
      iconName: 'Coins' as const,
      isActive: false,
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

  const howWeWork = [
    {
      title: 'Strategic Investment',
      description: 'We align your capital with high-performing, researched assets tailored to deliver consistent yields across changing market cycles.',
      icon: Compass,
    },
    {
      title: 'Risk Management',
      description: 'Our proprietary risk screening processes prioritize capital preservation through deep sector analysis and active diversification.',
      icon: ShieldCheck,
    },
    {
      title: 'Transparent Process',
      description: 'We believe in full clarity, providing detailed regular performance reports and direct access to client management tools.',
      icon: Eye,
    },
    {
      title: 'Forecasting & Review',
      description: 'Continuous portfolio reviews and predictive macroeconomic mapping ensure your strategy shifts ahead of critical market changes.',
      icon: TrendingUp,
    },
  ];

  const faqs = [
    {
      id: 'faq-1',
      question: 'What does Alpha Asset Managers do?',
      answer: 'Alpha Asset Managers provides professional investment management services, helping individuals and institutions grow and preserve their wealth through carefully structured portfolios and strategic financial guidance.',
    },
    {
      id: 'faq-2',
      question: 'Who can invest with Alpha Asset Managers?',
      answer: 'We cater to institutional investors (corporates, pensions, foundations), high-net-worth individuals, family offices, and retail clients looking for disciplined and structured asset management services.',
    },
    {
      id: 'faq-3',
      question: 'How do you manage investment risk?',
      answer: 'Risk management is core to our philosophy. We diversify assets across sectors and currencies, perform deep fundamental research, and implement strict risk control limits to safeguard capital.',
    },
    {
      id: 'faq-4',
      question: 'How can I get started?',
      answer: 'You can get started by clicking the "Speak to an Advisor" button to set up a consultation with one of our investment managers. We will review your objectives and guide you through the registration process.',
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      
      {/* Hero Section */}
      <section 
        className="relative min-h-[600px] md:min-h-[700px] flex items-center bg-brand-dark overflow-hidden"
        style={{
          backgroundImage: `linear-gradient(to right, rgba(0, 46, 46, 0.95) 0%, rgba(0, 46, 46, 0.85) 45%, rgba(0, 46, 46, 0.3) 100%), url(${heroMan})`,
          backgroundSize: 'cover',
          backgroundPosition: 'right center'
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10 w-full">
          <div className="max-w-2xl text-white space-y-8">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-light leading-tight sm:leading-none">
              Grow your capital with <br />
              <span className="font-extrabold text-brand-green">smarter investments</span>
            </h1>
            <p className="text-base sm:text-lg text-teal-50 leading-relaxed font-light">
              Watch your money and assets work harder: <br className="hidden sm:inline" />
              for today, for tomorrow and for generations
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <button
                onClick={() => navigate('/contact')}
                className="bg-brand-green hover:bg-opacity-90 text-brand-dark text-xs uppercase tracking-wider font-extrabold px-6 py-4 rounded transition-all duration-150 text-center"
              >
                Speak to an Advisor
              </button>
              <button
                onClick={() => navigate('/contact')}
                className="bg-transparent border border-white hover:bg-white hover:text-brand-dark text-white text-xs uppercase tracking-wider font-bold px-6 py-4 rounded transition-all duration-150 text-center"
              >
                Sign Up / Login
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-dark">
              Expert advisory for maximum returns
            </h2>
            <p className="text-base text-teal-900 opacity-80 leading-relaxed">
              We don't just manage your assets; we empower you with clarity, control and confidence every step of the way
            </p>
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

      {/* Delivering Long-Term Value (How We Work) */}
      <section className="py-24 bg-brand-dark text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-20 space-y-3">
            <span className="text-xs font-bold uppercase tracking-widest text-brand-gold">How We Work</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold leading-tight">
              Delivering Long-Term Value Through Investment
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {howWeWork.map((item, index) => (
              <div 
                key={index} 
                className="bg-teal-950 bg-opacity-40 border border-teal-900 rounded-lg p-8 flex gap-6 items-start shadow-sm hover:border-brand-accent transition-colors duration-200"
              >
                <div className="w-12 h-12 rounded-full bg-brand-accent flex items-center justify-center shrink-0 text-white">
                  <item.icon size={20} />
                </div>
                <div className="space-y-3">
                  <h3 className="text-lg font-bold text-white">{item.title}</h3>
                  <p className="text-sm leading-relaxed text-teal-50 opacity-80">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust & Partners */}
      <section className="py-16 bg-gray-50 border-t border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center gap-8">
            <h2 className="text-xs font-bold uppercase tracking-widest text-brand-grayText text-center">
              Building Strong Relationships With Every Client We Serve
            </h2>
            <div className="flex flex-wrap justify-center items-center gap-12 sm:gap-20">
              {/* KCB Logo Badge */}
              <div className="bg-[#43A047] text-white px-8 py-3.5 rounded font-extrabold text-2xl tracking-tight flex items-center justify-center shadow-sm select-none">
                KCB
              </div>
              {/* ABSA Logo Badge */}
              <div className="bg-[#FF0000] text-white h-16 w-16 rounded-full font-bold text-lg flex items-center justify-center shadow-sm select-none">
                absa
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 bg-brand-faqBg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-dark">
              Frequently Asked Questions
            </h2>
            <p className="text-base text-teal-900 opacity-85">
              Got questions? Here are some quick answers to help you get the most out of Alpha Asset Managers.
            </p>
          </div>

          <Accordion items={faqs} />
        </div>
      </section>

      {/* Footer CTA */}
      <FooterCTA />
      
    </div>
  );
};
