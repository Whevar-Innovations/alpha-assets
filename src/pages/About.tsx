import React, { useState, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { useNavigate } from 'react-router-dom';
import { X } from 'lucide-react';
import { FooterCTA } from '../components/UI/FooterCTA';
import { DynamicIcon } from '../components/UI/DynamicIcon';
import { Button } from '../components/UI/Button';
import { PortableText } from '../components/UI/PortableText';
import { SEO } from '../components/SEO';
import bannerBg from '../assets/images/banner_bg.jpg';
import aboutWoman from '../assets/images/about_woman.jpg';
import aboutChart from '../assets/images/about_chart.jpg';

import { useSanityPage } from '../sanity/hooks/useSanityPage';
import { ABOUT_QUERY } from '../sanity/lib/queries';
import { aboutDefaults } from '../sanity/defaults/about';
import { resolveImage } from '../sanity/lib/image';

import type { AboutPageData, TeamMember } from '../types';

export const About: React.FC = () => {
  const navigate = useNavigate();
  const { data, isLoading } = useSanityPage<AboutPageData>(ABOUT_QUERY, aboutDefaults);
  
  const [activeTab, setActiveTab] = useState<'leadership' | 'board'>('board');
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);

  useEffect(() => {
    if (selectedMember) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [selectedMember]);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') setSelectedMember(null);
  }, []);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => { document.removeEventListener('keydown', handleKeyDown); };
  }, [handleKeyDown]);

  if (isLoading) {
    return <AboutSkeleton />;
  }

  if (data.pageVisible === false) {
    void navigate('/404');
    return null;
  }

  // Fallbacks
  const hero = data.hero ?? aboutDefaults.hero;
  const heroVisible = data.heroVisible ?? true;
  
  const introVisible = data.introVisible ?? true;
  const introHeading = data.introHeading ?? aboutDefaults.introHeading;
  const introParagraphs = data.introParagraphs ?? aboutDefaults.introParagraphs;
  
  const quoteVisible = data.quoteVisible ?? true;
  const quoteLeftImage  = resolveImage(data.quoteLeftImage,  aboutWoman);
  const quoteText = data.quoteText ?? aboutDefaults.quoteText;
  const quoteAuthor = data.quoteAuthor ?? aboutDefaults.quoteAuthor;
  const quoteAuthorTitle = data.quoteAuthorTitle ?? aboutDefaults.quoteAuthorTitle;
  const quoteRightImage = resolveImage(data.quoteRightImage, aboutChart);
  
  const coreValuesVisible = data.coreValuesVisible ?? true;
  const coreValuesSubtitle = data.coreValuesSubtitle ?? aboutDefaults.coreValuesSubtitle;
  const coreValuesHeading = data.coreValuesHeading ?? aboutDefaults.coreValuesHeading;
  const coreValues = data.coreValues?.length ? data.coreValues : aboutDefaults.coreValues;
  
  const committeeVisible = data.committeeVisible ?? true;
  const committeeHeading = data.committeeHeading ?? aboutDefaults.committeeHeading;
  const committeeText = data.committeeText ?? aboutDefaults.committeeText;
  
  const teamVisible = data.teamVisible ?? true;
  const teamSubtitle = data.teamSubtitle ?? aboutDefaults.teamSubtitle;
  const teamHeading = data.teamHeading ?? aboutDefaults.teamHeading;
  const team = data.teamMembers?.length ? data.teamMembers : aboutDefaults.teamMembers;

  const filteredTeam = team?.filter((m: TeamMember) => m.category === activeTab) ?? [];

  const handleMemberClick = (member: TeamMember) => {
    if (selectedMember?._id === member._id) {
      setSelectedMember(null);
    } else {
      setSelectedMember(member);
    }
  };

  const bgImgUrl = resolveImage(hero?.backgroundImage, bannerBg);

  return (
    <>
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
              backgroundPosition: 'center',
            }}
          >
            <div className="flex flex-col items-center gap-6 text-center">
              <h1 className="text-4xl sm:text-5xl font-light text-white tracking-tight">
                {hero?.heading}
              </h1>
              {hero?.ctaButton?.isVisible && hero.ctaButton.label && (
                <Button
                  variant={hero.ctaButton.variant}
                  onClick={() => {
                    const cta = hero.ctaButton;
                    if (cta) {
                      if (cta.linkType === 'external') {
                        window.open(cta.url, '_blank');
                      } else {
                        void navigate(cta.url);
                      }
                    }
                  }}
                >
                  {hero.ctaButton.label}
                </Button>
              )}
            </div>
          </section>
        </div>
      )}

      {/* Intro Section */}
      {introVisible && (
        <section className="py-20 bg-white">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center space-y-6">
            <h2 className="text-4xl sm:text-5xl font-light text-brand-primary leading-tight">
              {introHeading}
            </h2>
            <div className="space-y-4 text-[15px] sm:text-base leading-relaxed text-[#4a7060] font-light">
              <PortableText value={introParagraphs} />
            </div>
          </div>
        </section>
      )}

      {/* Quote Section */}
      {quoteVisible && (
        <section className="pb-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 items-stretch">

              {/* Left image */}
              <div className="rounded-2xl overflow-hidden h-[320px] lg:h-[420px]">
                <img
                  src={quoteLeftImage}
                  alt="Professional female executive talking on phone"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Center quote card */}
              <div className="bg-brand-primary rounded-2xl p-8 sm:p-10 flex flex-col justify-center shadow-md relative min-h-[320px] lg:min-h-0 overflow-hidden">
                <div
                  className="absolute bottom-4 right-6 text-[180px] font-serif leading-none select-none pointer-events-none"
                  style={{ color: 'rgba(255,255,255,0.08)', lineHeight: 1 }}
                  aria-hidden="true"
                >
                  "
                </div>
                <div className="relative z-10 space-y-6">
                  <p className="text-[17px] sm:text-lg leading-relaxed font-light text-white whitespace-pre-line">
                    {quoteText}
                  </p>
                  <div className="space-y-0.5">
                    <p className="text-sm font-bold text-brand-green">– {quoteAuthor},</p>
                    <p className="text-sm font-semibold text-brand-green"> {quoteAuthorTitle}</p>
                  </div>
                </div>
              </div>

              {/* Right image */}
              <div className="rounded-2xl overflow-hidden h-[320px] lg:h-[420px]">
                <img
                  src={quoteRightImage}
                  alt="Hands analyzing market trends during meeting"
                  className="w-full h-full object-cover"
                />
              </div>

            </div>
          </div>
        </section>
      )}

      {/* Core Values Section */}
      {coreValuesVisible && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 w-full">
          <section className="py-16 sm:py-20 bg-gradient-to-b from-brand-dark to-brand-primary rounded-3xl md:rounded-[40px] px-6 sm:px-12">
            <div className="text-center max-w-4xl mx-auto mb-14 space-y-3">
              <span className="text-xs font-semibold uppercase tracking-widest text-brand-grayText">
                {coreValuesSubtitle}
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-light text-brand-green leading-tight whitespace-pre-line">
                {coreValuesHeading}
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-5xl mx-auto">
              {coreValues?.filter(v => v.isVisible !== false).map((value: { icon?: { name?: string }; title: string; description: string; isVisible?: boolean }, index: number) => (
                <div
                  key={index}
                  className="bg-brand-cardBg rounded-2xl p-6 sm:p-8 flex gap-5 items-start"
                >
                  <div className="w-12 h-12 rounded-full bg-brand-primary shrink-0 flex items-center justify-center text-white" aria-hidden="true">
                    {value.icon?.name && <DynamicIcon name={value.icon.name} size={20} />}
                  </div>
                  <div className="space-y-1.5">
                    <h3 className="text-base font-bold text-brand-dark">{value.title}</h3>
                    <p className="text-sm leading-relaxed text-[#4a7060]">{value.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      )}

      {/* Investment Committee Section */}
      {committeeVisible && (
        <section className="py-20 bg-white">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center space-y-6">
            <h2 className="text-4xl sm:text-5xl font-light text-brand-primary leading-tight">
              {committeeHeading}
            </h2>
            <div className="space-y-4 text-[15px] sm:text-base leading-relaxed text-[#4a7060] font-light">
              <PortableText value={committeeText} />
            </div>
          </div>
        </section>
      )}

      {/* Our Team Section */}
      {teamVisible && (
        <section className="py-20 bg-brand-faqBg">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
              <span className="text-xs font-semibold uppercase tracking-widest text-brand-gray">
                {teamSubtitle}
              </span>
              <h2 className="text-4xl sm:text-5xl font-light text-brand-primary leading-tight whitespace-pre-line">
                {teamHeading}
              </h2>
            </div>

            <div className="flex justify-center mb-10">
              <div className="flex border-b border-gray-200">
                <button
                  onClick={() => { setActiveTab('board'); setSelectedMember(null); }}
                  aria-selected={activeTab === 'board'}
                  className={`py-3 px-8 text-xs uppercase tracking-wider font-semibold transition-all duration-150 border-b-2 ${
                    activeTab === 'board'
                      ? 'border-brand-dark text-brand-dark'
                      : 'border-transparent text-[#758E87] hover:text-brand-dark'
                  }`}
                >
                  Board
                </button>
                <button
                  onClick={() => { setActiveTab('leadership'); setSelectedMember(null); }}
                  aria-selected={activeTab === 'leadership'}
                  className={`py-3 px-8 text-xs uppercase tracking-wider font-semibold transition-all duration-150 border-b-2 ${
                    activeTab === 'leadership'
                      ? 'border-brand-primary text-brand-primary'
                      : 'border-transparent text-[#758E87] hover:text-brand-dark'
                  }`}
                >
                  Leadership
                </button>
                
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-5 max-w-5xl mx-auto">
              {filteredTeam.map((member: TeamMember) => {
                const isSelected = selectedMember?._id === member._id;
                const photoUrl = resolveImage(member.photo);
                return (
                  <button
                    key={member._id}
                    onClick={() => { handleMemberClick(member); }}
                    aria-expanded={isSelected}
                    className={`rounded-2xl flex flex-col overflow-hidden focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 group transition-colors duration-200 ${
                      isSelected ? 'bg-brand-dark' : 'bg-brand-primary'
                    }`}
                    style={{ aspectRatio: '9/13' }}
                  >
                    <div className="flex-1 min-h-0 bg-gray-200 w-full relative">
                      {photoUrl && (
                        <img
                          src={photoUrl}
                          alt={member.name}
                          className="w-full h-full object-cover object-top rounded-xl transition-transform duration-300 group-hover:scale-[1.01]"
                        />
                      )}
                    </div>
                    <div className="px-4 py-4 shrink-0 text-left">
                      <p className="text-white font-bold text-sm leading-tight">{member.name}</p>
                      <p className={`text-xs mt-1 font-normal ${isSelected ? 'text-brand-green' : 'text-[#9DD4C8]'}`}>
                        {member.role}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Footer CTA */}
      <FooterCTA />

    </div>

    {/* Bio Portal */}
    {selectedMember && createPortal(
      <>
        <div className="fixed inset-0 z-50 bg-black/40 animate-fade-in" onClick={() => { setSelectedMember(null); }} aria-hidden="true" />
        
        {/* Desktop */}
        <div role="dialog" className="hidden md:flex fixed inset-0 z-50 items-center justify-center p-6 pointer-events-none">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[85vh] flex flex-col pointer-events-auto relative animate-modal-in overflow-hidden">
            <button
              onClick={() => { setSelectedMember(null); }}
              className="absolute top-4 right-5 text-[#758E87] hover:text-brand-dark p-1.5 hover:bg-gray-100 rounded-full transition-all duration-150 z-10"
            >
              <X size={18} />
            </button>
            <div className="flex flex-row flex-1 overflow-hidden">
              <div className="w-56 shrink-0 px-8 py-10 border-r border-gray-100">
                <p className="text-[10px] font-bold uppercase tracking-widest text-brand-primary mb-3">
                  {selectedMember.name}
                </p>
                <h3 className="text-[13px] font-extrabold text-brand-dark uppercase leading-snug tracking-wide whitespace-pre-line">
                  {selectedMember.role}
                </h3>
              </div>
              <div className="flex-1 px-8 py-10 pr-14 overflow-y-auto space-y-4">
                {selectedMember.bio.split('\n\n').map((paragraph: string, i: number) => (
                  <p key={i} className="text-[13px] leading-relaxed text-[#4a7060] font-light">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Mobile */}
        <div role="dialog" className="md:hidden fixed bottom-0 left-0 right-0 z-50 animate-slide-up">
          <div className="bg-white rounded-t-3xl shadow-2xl flex flex-col" style={{ maxHeight: '75dvh' }}>
            <div className="flex justify-center pt-3 pb-1 shrink-0">
              <div className="w-10 h-1 rounded-full bg-gray-200" aria-hidden="true" />
            </div>
            <div className="flex items-start justify-between px-6 pt-3 pb-4 border-b border-gray-100 shrink-0">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-brand-primary mb-1">
                  {selectedMember.name}
                </p>
                <h3 className="text-[13px] font-extrabold text-brand-dark uppercase leading-snug tracking-wide">
                  {selectedMember.role}
                </h3>
              </div>
              <button
                onClick={() => { setSelectedMember(null); }}
                className="text-[#758E87] hover:text-brand-dark p-1.5 hover:bg-gray-100 rounded-full transition-all duration-150 shrink-0 ml-4 mt-0.5"
              >
                <X size={18} />
              </button>
            </div>
            <div className="overflow-y-auto px-6 py-5 space-y-4">
              {selectedMember.bio.split('\n\n').map((paragraph: string, i: number) => (
                <p key={i} className="text-[13px] leading-relaxed text-[#4a7060] font-light">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </div>
      </>,
      document.body
    )}
    </>
  );
};

const AboutSkeleton: React.FC = () => (
  <div className="flex flex-col min-h-screen animate-pulse bg-white">
    {/* Hero Banner */}
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-4 sm:mt-8 w-full">
      <div className="h-52 sm:h-64 md:h-72 bg-gray-200 rounded-2xl md:rounded-[28px] w-full"></div>
    </div>

    {/* Intro Section */}
    <div className="py-20 bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center space-y-6 flex flex-col items-center">
        <div className="h-12 bg-gray-200 rounded w-3/4"></div>
        <div className="space-y-4 w-full flex flex-col items-center">
          <div className="h-4 bg-gray-100 rounded w-full"></div>
          <div className="h-4 bg-gray-100 rounded w-5/6"></div>
          <div className="h-4 bg-gray-100 rounded w-4/6"></div>
        </div>
      </div>
    </div>

    {/* Quote Section */}
    <div className="pb-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 items-stretch">
          <div className="rounded-2xl bg-gray-200 h-[320px] lg:h-[420px]"></div>
          <div className="bg-gray-100 rounded-2xl p-8 sm:p-10 flex flex-col justify-center min-h-[320px] lg:min-h-0 space-y-6">
            <div className="h-4 bg-gray-200 rounded w-full"></div>
            <div className="h-4 bg-gray-200 rounded w-5/6"></div>
            <div className="h-4 bg-gray-200 rounded w-4/6"></div>
            <div className="space-y-2 mt-4">
              <div className="h-3 bg-gray-300 rounded w-1/3"></div>
              <div className="h-3 bg-gray-200 rounded w-1/4"></div>
            </div>
          </div>
          <div className="rounded-2xl bg-gray-200 h-[320px] lg:h-[420px]"></div>
        </div>
      </div>
    </div>

    {/* Core Values Section */}
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 w-full">
      <div className="py-16 sm:py-20 bg-gray-100 rounded-3xl md:rounded-[40px] px-6 sm:px-12">
        <div className="text-center max-w-4xl mx-auto mb-14 space-y-3 flex flex-col items-center">
          <div className="h-3 bg-gray-200 rounded w-24"></div>
          <div className="h-10 bg-gray-300 rounded w-1/2 mt-3"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-5xl mx-auto">
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="bg-white rounded-2xl p-6 sm:p-8 flex gap-5 items-start">
              <div className="w-12 h-12 rounded-full bg-gray-200 shrink-0"></div>
              <div className="space-y-2 w-full">
                <div className="h-5 bg-gray-200 rounded w-1/3"></div>
                <div className="h-3 bg-gray-100 rounded w-full"></div>
                <div className="h-3 bg-gray-100 rounded w-4/5"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>

    {/* Investment Committee Section */}
    <div className="py-20 bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center space-y-6 flex flex-col items-center">
        <div className="h-12 bg-gray-200 rounded w-3/4"></div>
        <div className="space-y-4 w-full flex flex-col items-center">
          <div className="h-4 bg-gray-100 rounded w-full"></div>
          <div className="h-4 bg-gray-100 rounded w-5/6"></div>
          <div className="h-4 bg-gray-100 rounded w-4/6"></div>
        </div>
      </div>
    </div>

    {/* Team Section */}
    <div className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3 flex flex-col items-center">
           <div className="h-3 bg-gray-200 rounded w-24"></div>
           <div className="h-10 bg-gray-300 rounded w-1/2"></div>
        </div>
        
        <div className="flex justify-center mb-10">
          <div className="flex gap-4">
             <div className="h-8 w-24 bg-gray-200 rounded"></div>
             <div className="h-8 w-24 bg-gray-200 rounded"></div>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-5 max-w-5xl mx-auto">
           {[1, 2, 3, 4, 5, 6, 7, 8].map(i => (
             <div key={i} className="rounded-2xl flex flex-col overflow-hidden bg-gray-100" style={{ aspectRatio: '9/13' }}>
                <div className="flex-1 bg-gray-200"></div>
                <div className="px-4 py-4 shrink-0 space-y-2">
                  <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                </div>
             </div>
           ))}
        </div>
      </div>
    </div>
  </div>
);
