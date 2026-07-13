import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ServiceCard } from '../components/UI/ServiceCard';
import { Accordion } from '../components/UI/Accordion';
import { FooterCTA } from '../components/UI/FooterCTA';
import { Button } from '../components/UI/Button';
import { SectionHeader } from '../components/UI/SectionHeader';
import { FeatureCard } from '../components/UI/FeatureCard';
import heroMan from '../assets/images/hero_man.jpg';
import kcbLogo from '../assets/images/clients/KCB_Bank_Kenya_Limited_logo.png';
import absaLogo from '../assets/images/clients/absa_logo.png';
import { Compass, ShieldCheck, Eye, TrendingUp } from 'lucide-react';

export const Home: React.FC = () => {
  const navigate = useNavigate();

  const services = [
    {
      id: 'advisory-capital-solutions',
      title: 'Advisory & Capital Solutions',
      description: 'Strategic guidance for corporates, foundations, institutions, and sophisticated investors on portfolio strategy, asset allocation, manager selection, and investment structuring.',
      iconName: 'Briefcase' as const,
      isActive: false,
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
    {
      id: 'faq-5',
      question: 'Who can invest with Alpha Asset Managers?',
      answer: 'Our investment solutions are designed to accommodate a diverse range of clients, from local pension funds requiring liability-matched portfolios to private clients seeking long-term capital appreciation.',
    },
    {
      id: 'faq-6',
      question: 'How do you manage investment risk?',
      answer: 'We deploy a robust proprietary risk assessment framework that continuously monitors market volatility, liquidity risks, and macroeconomic indicators to adjust portfolio allocations defensively when necessary.',
    },
    {
      id: 'faq-7',
      question: 'How can I get started?',
      answer: 'Simply reach out to our team via the contact form or give us a call. Our advisory team will schedule an initial meeting to understand your financial goals and propose a tailored investment strategy.',
    },
    {
      id: 'faq-8',
      question: 'Who can invest with Alpha Asset Managers?',
      answer: 'Both domestic and international investors can participate in our funds. We ensure compliance with all relevant regulatory frameworks to provide secure and transparent investment vehicles for our clients.',
    },
    {
      id: 'faq-9',
      question: 'How do you manage investment risk?',
      answer: 'Beyond standard diversification, we utilize active monitoring and stress testing of our portfolios against various economic scenarios to ensure resilience and protect our clients\' capital during downturns.',
    },
    {
      id: 'faq-10',
      question: 'How can I get started?',
      answer: 'After an initial consultation, you will complete our straightforward onboarding process, which includes standard KYC documentation. Once approved, your account will be ready to fund and deploy.',
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-4 sm:mt-8 w-full">
        <section 
          className="relative min-h-[500px] md:min-h-[640px] flex items-center bg-brand-dark overflow-hidden rounded-2xl md:rounded-[32px] shadow-sm"
          style={{
            backgroundImage: `linear-gradient(to right, rgba(0, 46, 46, 0.95) 0%, rgba(0, 46, 46, 0.85) 45%, rgba(0, 46, 46, 0.3) 100%), url(${heroMan})`,
            backgroundSize: 'cover',
            backgroundPosition: 'right center'
          }}
        >
          <div className="px-6 sm:px-12 lg:px-16 py-20 relative z-10 w-full">
            <div className="max-w-2xl text-white space-y-8">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-light leading-tight sm:leading-none">
                Grow your capital with <br />
                <span className="font-extrabold text-brand-green">smarter investments</span>
              </h1>
              <p className="text-base sm:text-lg text-teal-50 leading-relaxed font-light">
                Watch your money and assets work harder: <br className="hidden sm:inline" />
                for today, for tomorrow and for generations
              </p>
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button
                  variant="primary"
                  size="lg"
                  onClick={() => navigate('/contact')}
                >
                  Speak to an Advisor
                </Button>
                <Button
                  variant="white"
                  size="lg"
                  onClick={() => navigate('/contact')}
                >
                  Sign Up/Login
                </Button>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Services Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-light text-brand-primary text-center leading-tight">
              Expert advisory for<br/> 
              maximum returns
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
                // Custom style overrides via reusable props
                activeBgClass={service.isActive ? 'bg-brand-dark' : 'bg-brand-primary'}
                activeTitleColorClass="text-brand-green"
                activeIconBgClass="bg-white"
                activeIconColorClass={service.isActive ? 'text-brand-dark' : 'text-brand-primary'}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Delivering Long-Term Value (How We Work) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
        <section className="py-20 sm:py-24 bg-gradient-to-b from-brand-dark to-brand-primary rounded-3xl md:rounded-[40px] px-4 sm:px-8">
          <SectionHeader 
            subtitle="How We Work" 
            title={<>Delivering Long-Term <br className="hidden sm:inline" />Value Through Investment</>} 
            theme="dark"
            className="mb-16 sm:mb-20"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 max-w-6xl mx-auto">
            {howWeWork.map((item, index) => (
              <FeatureCard 
                key={index}
                title={item.title}
                description={item.description}
                Icon={item.icon}
              />
            ))}
          </div>
        </section>
      </div>

      {/* Trust & Partners */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-light text-brand-primary text-center leading-tight">
              Building Strong Relationships <br />
              With Every Client We Serve
            </h2>
            <div className="flex flex-wrap justify-center items-center gap-10 md:gap-16 mt-12">
              <img 
                src={kcbLogo} 
                alt="KCB Bank Kenya Limited" 
                className="h-12 md:h-16 w-auto object-contain" 
              />
              <img 
                src={absaLogo} 
                alt="Absa Bank" 
                className="h-12 md:h-16 w-auto object-contain" 
              />
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 bg-brand-faqBg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14 space-y-4">
            <h2 className="text-[32px] sm:text-[44px] font-light text-[#0D382D]">
              Frequently Asked Questions
            </h2>
            <p className="text-[15px] sm:text-base text-[#758E87] font-light">
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
