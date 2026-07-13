import React, { useState } from 'react';
import { FooterCTA } from '../components/UI/FooterCTA';
import bannerBg from '../assets/images/banner_bg.jpg';
import aboutWoman from '../assets/images/about_woman.jpg';
import aboutChart from '../assets/images/about_chart.jpg';
import { User, X, Shield, Star, Users, CheckCircle, Lightbulb, Heart } from 'lucide-react';

interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  category: 'leadership' | 'board';
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
      role: 'Founder, MD & Chief Investment Officer',
      category: 'leadership',
      bio: 'Robert Anthony Katuntu is Founder, Managing Director and Chief Investment Officer of Alpha Asset Managers. Mr. Katuntu began his investment banking career at Lehman Brothers, advancing to general partner in 1974. He was then nominated by President Carter and confirmed by the Senate as Assistant Secretary of the U.S. Treasury, serving in that position for four years. Mr. Katuntu subsequently returned to Lehman, where he later became co-head of overall investment banking as well as a member of the management committee and board. He remained in those positions until Lehman was sold. In 1987, Mr. Katuntu joined The Blackstone Group as vice chairman, head of advisory business, and investment committee member. Mr. Katuntu was then nominated by the President and again confirmed by Parliament as Deputy Secretary of the Parish Development Model Fund. He served in that position for two years. Then in 1995, he formed Alpha Asset Managers. Today, Alpha Asset Managers is the fourth-largest investment banking advisory firm in the world. He is a trustee of MIT, New York-Presbyterian Hospital and New Visions for Public Schools and a member of the Council on Foreign Relations. He earned an A.B. from Georgetown University and an MBA from the University of Chicago.',
    },
    {
      id: 'joseph-bagabo',
      name: 'Joseph Lubaale Bagabo',
      role: 'Chief Operating Officer',
      category: 'leadership',
      bio: 'Joseph Lubaale Bagabo manages the operational risk, IT infrastructure, and service delivery layers. With over 15 years in East African asset management operations, he ensures the portfolio setups align precisely with international compliance directives.',
    },
    {
      id: 'joshua-karamagi',
      name: 'Joshua Samuel Karamagi',
      role: 'Chief Financial Officer',
      category: 'leadership',
      bio: 'Joshua Samuel Karamagi oversees the financial planning, reporting, and capital allocation of the firm. He possesses an extensive background in auditing top-tier commercial banks and managing regional private equity capital pools.',
    },
    {
      id: 'collins-ninsiima',
      name: 'Collins Ninsiima',
      role: 'Compliance Officer',
      category: 'leadership',
      bio: 'Collins Ninsiima enforces the regulatory standards and client onboarding procedures. She coordinates with the Capital Markets Authority to ensure all product structures strictly maintain standard financial disclosures.',
    },
    {
      id: 'catherine-nakawuka',
      name: 'Catherine Nakawuka',
      role: 'Head of Portfolio Management',
      category: 'leadership',
      bio: 'Catherine Nakawuka leads the portfolio selection and execution strategies. She specializes in fixed-income markets, structured capital advisory, and quantitative manager selection.',
    },
    {
      id: 'victoria-nambi',
      name: 'Victoria Nambi',
      role: 'Head of Fund Operations',
      category: 'leadership',
      bio: 'Victoria Nambi coordinates the administrative processes, fund valuations, and reporting schedules. She has over 10 years of experience managing back-office unit trust operations.',
    },
    {
      id: 'jemimah-nassozi',
      name: 'Jemimah Nassozi',
      role: 'Portfolio Investment Analyst',
      category: 'leadership',
      bio: 'Jemimah Nassozi conducts market research, valuations, and security tracking. She specializes in equities research and data-driven macro forecasting models.',
    },
    {
      id: 'eva-nakakande',
      name: 'Eva Nakakande',
      role: 'Head of Client Services',
      category: 'leadership',
      bio: 'Eva Nakakande leads the advisor relations and retail client support systems. She focuses on maintaining premium customer experiences and expanding client advisory touchpoints.',
    },
    {
      id: 'board-member-1',
      name: 'Dr. Sarah Nabakooza',
      role: 'Independent Board Chairman',
      category: 'board',
      bio: 'Dr. Sarah Nabakooza serves as the Independent Board Chairman, bringing 25+ years of corporate governance and economic policy experience in East Africa.',
    },
    {
      id: 'board-member-2',
      name: 'Patrick Mugisha',
      role: 'Non-Executive Director',
      category: 'board',
      bio: 'Patrick Mugisha is a leading commercial attorney specializing in infrastructure financing and investment law across the sub-Saharan region.',
    },
  ];

  const filteredTeam = team.filter((m) => m.category === activeTab);

  const handleMemberClick = (member: TeamMember) => {
    if (selectedMember?.id === member.id) {
      setSelectedMember(null); // Toggle off if clicked again
    } else {
      setSelectedMember(member);
    }
  };

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
            Who We Are
          </h1>
        </div>
      </section>

      {/* Intro Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-8">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-dark">For Those Who Want More</h2>
          <div className="text-teal-900 opacity-90 text-base sm:text-lg leading-relaxed space-y-6 font-light">
            <p>
              Alpha Asset Managers is an investment management firm dedicated to helping clients grow and preserve wealth through disciplined and well-structured financial strategies.
            </p>
            <p>
              We believe successful investing requires patience, discipline, and clarity. Our investment philosophy focuses on long-term value creation, guided by rigorous research, risk awareness, and strategic asset allocation.
            </p>
          </div>
        </div>
      </section>

      {/* Quote & Images Section */}
      <section className="py-12 bg-white max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {/* Left image */}
          <div className="rounded-lg overflow-hidden h-[300px] lg:h-[420px]">
            <img 
              src={aboutWoman} 
              alt="Professional female executive talking on phone" 
              className="w-full h-full object-cover"
            />
          </div>
          
          {/* Center Quote */}
          <div className="bg-brand-primary text-white rounded-lg p-8 sm:p-10 flex flex-col justify-center items-center text-center shadow-md relative min-h-[300px] lg:min-h-0">
            <div className="text-5xl font-serif text-teal-350 leading-none absolute top-4 left-6">“</div>
            <p className="text-base sm:text-lg leading-relaxed font-light mb-6 relative z-10">
              We take a structured approach to investment management from understanding our clients' objectives, developing tailored strategies to diversification across asset classes.
            </p>
            <div className="space-y-1 z-10">
              <p className="font-extrabold text-sm text-brand-green">Robert Katuntu</p>
              <p className="text-xs text-teal-150 uppercase tracking-widest">Chief Investment Officer</p>
            </div>
          </div>
          
          {/* Right image */}
          <div className="rounded-lg overflow-hidden h-[300px] lg:h-[420px]">
            <img 
              src={aboutChart} 
              alt="Hands analyzing market trends during meeting" 
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="py-24 bg-brand-dark text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <span className="text-xs font-bold uppercase tracking-widest text-brand-gold">Core Values</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold">
              Alpha's defining characteristic is its culture, which is shaped by our Core Values
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {coreValues.map((value, index) => (
              <div 
                key={index} 
                className="bg-brand-cardBg text-brand-dark rounded-lg p-8 flex gap-6 items-start shadow-sm"
              >
                <div className="w-12 h-12 rounded-full bg-brand-primary text-white flex items-center justify-center shrink-0">
                  <value.icon size={20} />
                </div>
                <div className="space-y-2">
                  <h3 className="text-lg font-extrabold text-brand-dark">{value.title}</h3>
                  <p className="text-sm leading-relaxed text-teal-900 opacity-90">{value.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Team Section */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
            <span className="text-xs font-bold uppercase tracking-widest text-brand-primary">Our Team</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-dark">
              Meet the Experts Behind Our Investment Success
            </h2>
          </div>

          {/* Tab Filter Navigation */}
          <div className="flex justify-center border-b border-gray-200 mb-12 max-w-xs mx-auto">
            <button
              onClick={() => { setActiveTab('leadership'); setSelectedMember(null); }}
              className={`py-3 px-6 text-xs uppercase tracking-wider font-extrabold transition-all duration-150 border-b-2 ${
                activeTab === 'leadership'
                  ? 'border-brand-primary text-brand-primary'
                  : 'border-transparent text-brand-gray hover:text-brand-dark'
              }`}
            >
              Leadership
            </button>
            <button
              onClick={() => { setActiveTab('board'); setSelectedMember(null); }}
              className={`py-3 px-6 text-xs uppercase tracking-wider font-extrabold transition-all duration-150 border-b-2 ${
                activeTab === 'board'
                  ? 'border-brand-primary text-brand-primary'
                  : 'border-transparent text-brand-gray hover:text-brand-dark'
              }`}
            >
              Board
            </button>
          </div>

          {/* Profile Card Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {filteredTeam.map((member) => {
              const isSelected = selectedMember?.id === member.id;
              return (
                <button
                  key={member.id}
                  onClick={() => handleMemberClick(member)}
                  aria-expanded={isSelected}
                  className={`flex flex-col items-center bg-white rounded-lg p-6 text-center shadow-sm border transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-brand-primary ${
                    isSelected ? 'border-brand-primary scale-[1.02] bg-teal-50 bg-opacity-30' : 'border-gray-100 hover:border-brand-primary'
                  }`}
                >
                  <div className={`w-20 h-20 rounded-full flex items-center justify-center mb-4 transition-colors duration-150 ${
                    isSelected ? 'bg-brand-primary text-white' : 'bg-brand-cardBg text-brand-primary'
                  }`}>
                    <User size={36} />
                  </div>
                  <h3 className="text-sm sm:text-base font-extrabold text-brand-dark leading-tight mb-1">{member.name}</h3>
                  <p className="text-xs text-brand-gray font-medium">{member.role}</p>
                </button>
              );
            })}
          </div>

          {/* Expanded Dynamic Details Section */}
          {selectedMember && (
            <div className="mt-12 bg-white border border-brand-cardBg rounded-lg p-8 sm:p-10 shadow-sm max-w-5xl mx-auto relative animate-fadeIn">
              {/* Close trigger */}
              <button
                onClick={() => setSelectedMember(null)}
                className="absolute top-4 right-4 text-brand-gray hover:text-brand-dark p-2 hover:bg-gray-100 rounded-full transition-all duration-150"
                aria-label="Close details"
              >
                <X size={20} />
              </button>
              
              <div className="space-y-6">
                <div className="space-y-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-brand-primary">
                    {selectedMember.role}
                  </span>
                  <h3 className="text-xl sm:text-2xl font-extrabold text-brand-dark">
                    {selectedMember.name}
                  </h3>
                </div>
                <div className="h-[1px] bg-gray-150 w-full" />
                <p className="text-sm sm:text-base leading-relaxed text-teal-900 opacity-90 whitespace-pre-line font-light">
                  {selectedMember.bio}
                </p>
              </div>
            </div>
          )}

        </div>
      </section>

      {/* Footer CTA */}
      <FooterCTA />

    </div>
  );
};
