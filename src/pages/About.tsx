import React, { useState, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { X, Users, Shield, Star, Heart, CheckCircle, Lightbulb } from 'lucide-react';
import { FooterCTA } from '../components/UI/FooterCTA';
import bannerBg from '../assets/images/banner_bg.jpg';
import aboutWoman from '../assets/images/about_woman.jpg';
import aboutChart from '../assets/images/about_chart.jpg';

// Team photos — 1 & 2 are female, 3 & 4 are male
import teamPhoto1 from '../assets/images/team/1.webp';
import teamPhoto2 from '../assets/images/team/2.webp';
import teamPhoto3 from '../assets/images/team/3.webp';
import teamPhoto4 from '../assets/images/team/4.webp';

interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  category: 'leadership' | 'board';
  photo: string;
}

export const About: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'leadership' | 'board'>('leadership');
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);

  const coreValues = [
    {
      title: 'Clients First',
      description: 'Invest in long-term relationships with our clients through independent and trusted advice.',
      icon: Users,
    },
    {
      title: 'Integrity',
      description: 'Adhere to the principle of doing the ethical thing at all times and in all circumstances.',
      icon: Shield,
    },
    {
      title: 'Excellence',
      description: 'Strive to achieve the highest standards of quality across all investment products and reports.',
      icon: Star,
    },
    {
      title: 'Respect',
      description: 'Treat all people with the utmost dignity, respect, and professional appreciation.',
      icon: Heart,
    },
    {
      title: 'Partnership & Collaboration',
      description: 'Promote a culture of openness, shared metrics, teamwork, and client accountability.',
      icon: CheckCircle,
    },
    {
      title: 'Investment in People',
      description: 'Attract the most talented people and inspire them to reach their highest potential.',
      icon: Lightbulb,
    },
  ];

  const team: TeamMember[] = [
    {
      id: 'robert-katuntu',
      name: 'Robert Anthony Katuntu',
      role: 'MD & Chief Investment Officer',
      category: 'leadership',
      photo: teamPhoto3,
      bio: 'Robert Anthony Katuntu is Founder, Managing Director and Chief Investment Officer of Alpha Asset Managers.\n\nMr. Katuntu began his investment banking career at Lehman Brothers, advancing to general partner in 1974. He was then nominated by President Carter and confirmed by the Senate as Assistant Secretary of the U.S. Treasury, serving in that position for four years.\n\nMr. Katuntu subsequently returned to Lehman, where he later became co-head of overall investment banking as well as a member of the management committee and board. He remained in those positions until Lehman was sold.\n\nIn 1987, Mr. Katuntu joined The Blackstone Group as vice chairman, head of advisory business, and investment committee member.\n\nMr. Katuntu was then nominated by the President and again confirmed by Parliament as Deputy Secretary of the Parish Development Model Fund. He served in that position for two years.\n\nThen in 1995, he formed Alpha Asset Managers. Today, Alpha Asset Managers is the fourth-largest investment banking advisory firm in the world.\n\nHe is a trustee of MIT, New York-Presbyterian Hospital and New Visions for Public Schools and a member of the Council on Foreign Relations.\n\nHe earned an A.B. from Georgetown University and an MBA from the University of Chicago.',
    },
    {
      id: 'joseph-bagabo',
      name: 'Joseph Lubaale Bagabo',
      role: 'Chief Operating Officer',
      category: 'leadership',
      photo: teamPhoto4,
      bio: 'Joseph Lubaale Bagabo manages the operational risk, IT infrastructure, and service delivery layers. With over 15 years in East African asset management operations, he ensures the portfolio setups align precisely with international compliance directives.',
    },
    {
      id: 'joshua-karamagi',
      name: 'Joshua Samuel Karamagi',
      role: 'Chief Financial Officer',
      category: 'leadership',
      photo: teamPhoto3,
      bio: 'Joshua Samuel Karamagi oversees the financial planning, reporting, and capital allocation of the firm. He possesses an extensive background in auditing top-tier commercial banks and managing regional private equity capital pools.',
    },
    {
      id: 'collins-ninsiima',
      name: 'Collins Ninsiima',
      role: 'Compliance Officer',
      category: 'leadership',
      photo: teamPhoto4,
      bio: 'Collins Ninsiima enforces the regulatory standards and client onboarding procedures. She coordinates with the Capital Markets Authority to ensure all product structures strictly maintain standard financial disclosures.',
    },
    {
      id: 'catherine-nakawuka',
      name: 'Catherine Nakawuka',
      role: 'Head of Portfolio Management',
      category: 'leadership',
      photo: teamPhoto1,
      bio: 'Catherine Nakawuka leads the portfolio selection and execution strategies. She specializes in fixed-income markets, structured capital advisory, and quantitative manager selection.',
    },
    {
      id: 'victoria-nambi',
      name: 'Victoria Nambi',
      role: 'Head of Fund Operations',
      category: 'leadership',
      photo: teamPhoto2,
      bio: 'Victoria Nambi coordinates the administrative processes, fund valuations, and reporting schedules. She has over 10 years of experience managing back-office unit trust operations.',
    },
    {
      id: 'jemimah-nassozi',
      name: 'Jemimah Nassozi',
      role: 'Portfolio Investment Analyst',
      category: 'leadership',
      photo: teamPhoto1,
      bio: 'Jemimah Nassozi conducts market research, valuations, and security tracking. She specializes in equities research and data-driven macro forecasting models.',
    },
    {
      id: 'eva-nakakande',
      name: 'Eva Nakakande',
      role: 'Head of Client Services',
      category: 'leadership',
      photo: teamPhoto2,
      bio: 'Eva Nakakande leads the advisor relations and retail client support systems. She focuses on maintaining premium customer experiences and expanding client advisory touchpoints.',
    },
    {
      id: 'board-member-1',
      name: 'Dr. Sarah Nabakooza',
      role: 'Independent Board Chairman',
      category: 'board',
      photo: teamPhoto1,
      bio: 'Dr. Sarah Nabakooza serves as the Independent Board Chairman, bringing 25+ years of corporate governance and economic policy experience in East Africa.',
    },
    {
      id: 'board-member-2',
      name: 'Patrick Mugisha',
      role: 'Non-Executive Director',
      category: 'board',
      photo: teamPhoto3,
      bio: 'Patrick Mugisha is a leading commercial attorney specializing in infrastructure financing and investment law across the sub-Saharan region.',
    },
  ];

  const filteredTeam = team.filter((m) => m.category === activeTab);

  const handleMemberClick = (member: TeamMember) => {
    if (selectedMember?.id === member.id) {
      setSelectedMember(null);
    } else {
      setSelectedMember(member);
    }
  };

  // Lock body scroll while any bio is open
  useEffect(() => {
    if (selectedMember) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [selectedMember]);

  // Dismiss on Escape key
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') setSelectedMember(null);
  }, []);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  return (
    <>
    <div className="flex flex-col min-h-screen">

      {/* ── Hero Banner ─────────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-4 sm:mt-8 w-full">
        <section
          className="relative h-52 sm:h-64 md:h-72 flex items-center justify-center overflow-hidden rounded-2xl md:rounded-[28px]"
          style={{
            backgroundImage: `linear-gradient(rgba(0, 56, 46, 0.78), rgba(0, 56, 46, 0.78)), url(${bannerBg})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <h1 className="text-4xl sm:text-5xl font-light text-white tracking-tight">
            Who We Are
          </h1>
        </section>
      </div>

      {/* ── Intro Section ───────────────────────────────────────────── */}
      <section className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center space-y-6">
          <h2 className="text-4xl sm:text-5xl font-light text-brand-primary leading-tight">
            For Those Who Want More
          </h2>
          <div className="space-y-4 text-[15px] sm:text-base leading-relaxed text-[#4a7060] font-light">
            <p>
              Alpha Asset Managers is an investment management firm dedicated to helping clients grow and
              preserve wealth through disciplined and well-structured financial strategies.
            </p>
            <p>
              We believe successful investing requires patience, discipline, and clarity. Our investment
              philosophy focuses on long-term value creation, guided by rigorous research, risk awareness,
              and strategic asset allocation.
            </p>
          </div>
        </div>
      </section>

      {/* ── Quote & Images Section ───────────────────────────────────── */}
      <section className="pb-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 items-stretch">

            {/* Left image */}
            <div className="rounded-2xl overflow-hidden h-[320px] lg:h-[420px]">
              <img
                src={aboutWoman}
                alt="Professional female executive talking on phone"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Center quote card */}
            <div className="bg-brand-primary rounded-2xl p-8 sm:p-10 flex flex-col justify-center shadow-md relative min-h-[320px] lg:min-h-0 overflow-hidden">
              {/* Decorative large quotation mark */}
              <div
                className="absolute bottom-4 right-6 text-[180px] font-serif leading-none select-none pointer-events-none"
                style={{ color: 'rgba(255,255,255,0.08)', lineHeight: 1 }}
                aria-hidden="true"
              >
                "
              </div>
              <div className="relative z-10 space-y-6">
                <p className="text-[17px] sm:text-lg leading-relaxed font-light text-white">
                  "We take a structured approach to investment management from understanding our
                  clients' objectives, developing tailored strategies to diversification across
                  asset classes."
                </p>
                <div className="space-y-0.5">
                  <p className="text-sm font-bold text-brand-green">– Robert Katuntu,</p>
                  <p className="text-sm font-semibold text-brand-green"> Chief Investment Officer</p>
                </div>
              </div>
            </div>

            {/* Right image */}
            <div className="rounded-2xl overflow-hidden h-[320px] lg:h-[420px]">
              <img
                src={aboutChart}
                alt="Hands analyzing market trends during meeting"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── Core Values Section ──────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 w-full">
        <section className="py-16 sm:py-20 bg-gradient-to-b from-brand-dark to-brand-primary rounded-3xl md:rounded-[40px] px-6 sm:px-12">
          <div className="text-center max-w-4xl mx-auto mb-14 space-y-3">
            <span className="text-xs font-semibold uppercase tracking-widest text-brand-grayText">
              Core Values
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-light text-brand-green leading-tight">
              Alpha's defining characteristic is its culture,{' '}
              <br className="hidden sm:inline" />
              which is shaped by our Core Values.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-5xl mx-auto">
            {coreValues.map((value, index) => (
              <div
                key={index}
                className="bg-brand-cardBg rounded-2xl p-6 sm:p-8 flex gap-5 items-start"
              >
                {/* Teal circle — no icon, matching the mockup's plain circle */}
                <div className="w-12 h-12 rounded-full bg-brand-primary shrink-0" aria-hidden="true" />
                <div className="space-y-1.5">
                  <h3 className="text-base font-bold text-brand-dark">{value.title}</h3>
                  <p className="text-sm leading-relaxed text-[#4a7060]">{value.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* ── Our Team Section ─────────────────────────────────────────── */}
      <section className="py-20 bg-brand-faqBg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Section header */}
          <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
            <span className="text-xs font-semibold uppercase tracking-widest text-brand-gray">
              Our Team
            </span>
            <h2 className="text-4xl sm:text-5xl font-light text-brand-primary leading-tight">
              Meet the Experts Behind <br />Our Investment Success
            </h2>
          </div>

          {/* Tab navigation */}
          <div className="flex justify-center mb-10">
            <div className="flex border-b border-gray-200">
              <button
                id="tab-leadership"
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
              <button
                id="tab-board"
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
            </div>
          </div>

          {/* Team photo card grid — 4 columns, 2 rows for leadership */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-5 max-w-5xl mx-auto">
            {filteredTeam.map((member) => {
              const isSelected = selectedMember?.id === member.id;
              return (
                <button
                  key={member.id}
                  id={`team-card-${member.id}`}
                  onClick={() => handleMemberClick(member)}
                  aria-expanded={isSelected}
                  aria-controls={`bio-panel-${member.id}`}
                  className={`rounded-2xl flex flex-col overflow-hidden focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 group transition-colors duration-200 ${
                    isSelected ? 'bg-brand-dark' : 'bg-brand-primary'
                  }`}
                  style={{ aspectRatio: '9/13' }}
                >
                  {/* Photo — inset with padding so teal card bg shows around edges;
                      rounded-xl on img clips all 4 corners → bottom inner-radius visible against teal */}
                  <div className="flex-1 min-h-0">
                    <img
                      src={member.photo}
                      alt={member.name}
                      className="w-full h-full object-cover object-top rounded-xl transition-transform duration-300 group-hover:scale-[1.01]"
                    />
                  </div>

                  {/* Name / role — sits naturally in the teal card body below the photo */}
                  <div className="px-4 py-4 shrink-0">
                    <p className="text-white font-bold text-sm leading-tight">{member.name}</p>
                    <p className={`text-xs mt-1 font-normal ${isSelected ? 'text-brand-green' : 'text-[#9DD4C8]'}`}>
                      {member.role}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Bio portal is rendered at document.body level — see portal below */}

        </div>
      </section>

      {/* ── Footer CTA ───────────────────────────────────────────────── */}
      <FooterCTA />

    </div>

    {/* ── Bio Portal — Desktop Modal + Mobile Bottom Sheet ───────── */}
    {selectedMember && createPortal(
      <>
        {/* Backdrop — closes on click */}
        <div
          className="fixed inset-0 z-50 bg-black/40 animate-fade-in"
          onClick={() => setSelectedMember(null)}
          aria-hidden="true"
        />

        {/* ── DESKTOP MODAL (md+) ─────────────────────────────────── */}
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="bio-modal-name"
          className="hidden md:flex fixed inset-0 z-50 items-center justify-center p-6 pointer-events-none"
        >
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[85vh] flex flex-col pointer-events-auto relative animate-modal-in overflow-hidden">

            {/* Close button */}
            <button
              onClick={() => setSelectedMember(null)}
              className="absolute top-4 right-5 text-[#758E87] hover:text-brand-dark p-1.5 hover:bg-gray-100 rounded-full transition-all duration-150 z-10"
              aria-label="Close bio"
            >
              <X size={18} />
            </button>

            {/* Two-column body */}
            <div className="flex flex-row flex-1 overflow-hidden">

              {/* Left col — Name & Role */}
              <div className="w-56 shrink-0 px-8 py-10 border-r border-gray-100">
                <p
                  id="bio-modal-name"
                  className="text-[10px] font-bold uppercase tracking-widest text-brand-primary mb-3"
                >
                  {selectedMember.name}
                </p>
                <h3 className="text-[13px] font-extrabold text-brand-dark uppercase leading-snug tracking-wide whitespace-pre-line">
                  {selectedMember.id === 'robert-katuntu'
                    ? 'Founder, Managing Director &\nChief Investment Officer'
                    : selectedMember.role}
                </h3>
              </div>

              {/* Right col — scrollable bio */}
              <div className="flex-1 px-8 py-10 pr-14 overflow-y-auto space-y-4">
                {selectedMember.bio.split('\n\n').map((paragraph, i) => (
                  <p key={i} className="text-[13px] leading-relaxed text-[#4a7060] font-light">
                    {paragraph}
                  </p>
                ))}
              </div>

            </div>
          </div>
        </div>

        {/* ── MOBILE BOTTOM SHEET (<md) ───────────────────────────── */}
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="bio-sheet-name"
          className="md:hidden fixed bottom-0 left-0 right-0 z-50 animate-slide-up"
        >
          <div className="bg-white rounded-t-3xl shadow-2xl flex flex-col" style={{ maxHeight: '75dvh' }}>

            {/* Drag handle */}
            <div className="flex justify-center pt-3 pb-1 shrink-0">
              <div className="w-10 h-1 rounded-full bg-gray-200" aria-hidden="true" />
            </div>

            {/* Header — Name, Role & close */}
            <div className="flex items-start justify-between px-6 pt-3 pb-4 border-b border-gray-100 shrink-0">
              <div>
                <p
                  id="bio-sheet-name"
                  className="text-[10px] font-bold uppercase tracking-widest text-brand-primary mb-1"
                >
                  {selectedMember.name}
                </p>
                <h3 className="text-[13px] font-extrabold text-brand-dark uppercase leading-snug tracking-wide">
                  {selectedMember.role}
                </h3>
              </div>
              <button
                onClick={() => setSelectedMember(null)}
                className="text-[#758E87] hover:text-brand-dark p-1.5 hover:bg-gray-100 rounded-full transition-all duration-150 shrink-0 ml-4 mt-0.5"
                aria-label="Close bio"
              >
                <X size={18} />
              </button>
            </div>

            {/* Bio text — scrollable */}
            <div className="overflow-y-auto px-6 py-5 space-y-4">
              {selectedMember.bio.split('\n\n').map((paragraph, i) => (
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
