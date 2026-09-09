import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Briefcase, MapPin, Calendar, Mail, ExternalLink } from 'lucide-react';
import { SEO } from '../components/SEO';
import { PortableText } from '../components/UI/PortableText';
import { Button } from '../components/UI/Button';
import bannerBg from '../assets/images/banner_bg.jpg';

import { useSanityPage } from '../sanity/hooks/useSanityPage';
import { JOB_VACANCY_DETAIL_QUERY, JOB_VACANCIES_QUERY } from '../sanity/lib/queries';
import { fallbackJobVacancies } from '../sanity/defaults/careers';
import type { JobVacancyItem } from '../types';

export const CareerDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();

  const fallbackVacancy =
    fallbackJobVacancies.find((v) => v.slug?.current === slug || v._id === slug) ??
    fallbackJobVacancies[0];

  const { data: vacancy, isLoading } = useSanityPage<JobVacancyItem>(
    JOB_VACANCY_DETAIL_QUERY,
    fallbackVacancy,
    { slug }
  );

  // Fetch all open vacancies for the sidebar list
  const { data: allVacancies } = useSanityPage<JobVacancyItem[]>(
    JOB_VACANCIES_QUERY,
    fallbackJobVacancies
  );

  if (isLoading) {
    return <CareerDetailSkeleton />;
  }

  if (vacancy.status !== 'Open') {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
        <h2 className="text-3xl font-light text-brand-dark mb-3">Vacancy Not Found</h2>
        <p className="text-gray-500 mb-6 max-w-md">
          This position may have closed or is no longer available.
        </p>
        <Button variant="primary" onClick={() => { void navigate('/careers'); }}>
          Browse All Open Positions
        </Button>
      </div>
    );
  }

  const formattedDate = vacancy.datePosted
    ? new Date(vacancy.datePosted).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      })
    : null;

  const otherVacancies = allVacancies
    .filter((v) => v.status === 'Open' && v._id !== vacancy._id)
    .slice(0, 3);

  const isEmailApp = vacancy.applicationType === 'Email' || (!vacancy.applicationType && !!vacancy.applicationEmail);
  const applicationEmail = vacancy.applicationEmail ?? 'careers@alphaeastafrica.com';
  const mailtoHref = `mailto:${applicationEmail}?subject=Application for ${encodeURIComponent(vacancy.title)}`;
  const externalHref = vacancy.applicationUrl ?? '#';

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <SEO
        title={`${vacancy.title} | Careers at Alpha Asset Managers`}
        description={vacancy.summary}
      />

      {/* Hero Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-4 sm:mt-8 w-full">
        <section
          className="relative min-h-[220px] sm:min-h-[260px] flex items-center justify-center overflow-hidden rounded-2xl md:rounded-[28px] py-10 px-4 sm:px-10"
          style={{
            backgroundImage: `linear-gradient(rgba(0, 56, 46, 0.85), rgba(0, 56, 46, 0.85)), url(${bannerBg})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className="flex flex-col items-center text-center max-w-3xl mx-auto space-y-3 sm:space-y-4">
            <h1 className="text-2xl sm:text-4xl md:text-5xl font-light text-white tracking-tight leading-tight">
              {vacancy.title}
            </h1>

            {/* Meta Tags */}
            <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 text-xs text-teal-100 font-light pt-1">
              {vacancy.department && (
                <span className="bg-white/15 px-3 py-1 rounded-full text-white font-medium text-[11px] sm:text-xs">
                  {vacancy.department}
                </span>
              )}
              {vacancy.location && (
                <span className="flex items-center gap-1 text-[11px] sm:text-xs">
                  <MapPin size={13} className="text-brand-green" />
                  {vacancy.location}
                </span>
              )}
              {vacancy.employmentType && (
                <span className="flex items-center gap-1 text-[11px] sm:text-xs">
                  <Briefcase size={13} className="text-brand-green" />
                  {vacancy.employmentType}
                </span>
              )}
              {formattedDate && (
                <span className="flex items-center gap-1 text-[11px] sm:text-xs">
                  <Calendar size={13} className="text-brand-green" />
                  Posted: {formattedDate}
                </span>
              )}
            </div>
          </div>
        </section>
      </div>

      {/* Main Content Layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-16 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-start">
          
          {/* Main Description Column */}
          <main className="lg:col-span-8 space-y-6 sm:space-y-8">
            
            {/* Summary Highlight Box */}
            {vacancy.summary && (
              <div className="bg-brand-cardBg border border-teal-100 rounded-2xl p-5 sm:p-7">
                <h2 className="text-[11px] sm:text-xs font-bold uppercase tracking-widest text-brand-primary mb-2">
                  Role Summary
                </h2>
                <p className="text-sm sm:text-lg text-brand-dark font-light leading-relaxed">
                  {vacancy.summary}
                </p>
              </div>
            )}

            {/* Full Rich Text Description */}
            <div className="pt-2 text-sm sm:text-base">
              <PortableText value={vacancy.description} />
            </div>

            {/* Bottom Apply Action Box */}
            <div className="bg-brand-dark text-white rounded-2xl p-6 sm:p-10 shadow-sm mt-8 sm:mt-12 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
              <div>
                <h3 className="text-xl sm:text-2xl font-light text-white mb-2">
                  Interested in this position?
                </h3>
                <p className="text-xs sm:text-sm text-teal-100/80 font-light max-w-md">
                  {isEmailApp
                    ? `Send your CV and a brief cover letter to ${applicationEmail}.`
                    : 'Submit your application through our online recruitment portal.'}
                </p>
              </div>

              {isEmailApp ? (
                <a
                  href={mailtoHref}
                  className="w-full sm:w-auto px-6 sm:px-8 py-3.5 bg-brand-green text-brand-dark font-semibold text-xs sm:text-sm rounded-xl hover:bg-opacity-90 transition-all shadow-sm flex items-center justify-center gap-2 whitespace-nowrap text-center"
                >
                  <Mail size={16} />
                  Apply via Email
                </a>
              ) : (
                <a
                  href={externalHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto px-6 sm:px-8 py-3.5 bg-brand-green text-brand-dark font-semibold text-xs sm:text-sm rounded-xl hover:bg-opacity-90 transition-all shadow-sm flex items-center justify-center gap-2 whitespace-nowrap text-center"
                >
                  Apply Now <ExternalLink size={16} />
                </a>
              )}
            </div>
          </main>

          {/* Sidebar Column */}
          <aside className="lg:col-span-4 space-y-8">
            
            {/* Job Overview Card */}
            <div className="bg-white border border-gray-200 rounded-2xl p-6 sm:p-7 shadow-sm space-y-5">
              <h3 className="text-base font-bold text-brand-dark border-b border-gray-100 pb-3">
                Job Overview
              </h3>

              <div className="space-y-4 text-sm">
                <div>
                  <span className="text-xs text-gray-400 block uppercase tracking-wider mb-1">Department</span>
                  <span className="font-medium text-brand-dark">{vacancy.department ?? 'General'}</span>
                </div>
                <div>
                  <span className="text-xs text-gray-400 block uppercase tracking-wider mb-1">Location</span>
                  <span className="font-medium text-brand-dark">{vacancy.location ?? 'Kampala, Uganda'}</span>
                </div>
                <div>
                  <span className="text-xs text-gray-400 block uppercase tracking-wider mb-1">Employment Type</span>
                  <span className="font-medium text-brand-dark">{vacancy.employmentType ?? 'Full-time'}</span>
                </div>
                {vacancy.deadline && (
                  <div>
                    <span className="text-xs text-gray-400 block uppercase tracking-wider mb-1">Deadline</span>
                    <span className="font-medium text-brand-primary">
                      {new Date(vacancy.deadline).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </span>
                  </div>
                )}
              </div>

              <div className="pt-3 border-t border-gray-100">
                {isEmailApp ? (
                  <a
                    href={mailtoHref}
                    className="w-full py-3 bg-brand-primary hover:bg-opacity-95 text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all shadow-sm flex items-center justify-center gap-2"
                  >
                    <Mail size={15} /> Apply via Email
                  </a>
                ) : (
                  <a
                    href={externalHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3 bg-brand-primary hover:bg-opacity-95 text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all shadow-sm flex items-center justify-center gap-2"
                  >
                    Apply on Portal <ExternalLink size={15} />
                  </a>
                )}
              </div>
            </div>

            {/* Other Open Positions */}
            {otherVacancies.length > 0 && (
              <div className="bg-brand-cardBg border border-teal-100 rounded-2xl p-6 shadow-sm">
                <h3 className="text-sm font-bold uppercase tracking-wider text-brand-dark mb-4">
                  Other Open Roles
                </h3>
                <div className="space-y-4">
                  {otherVacancies.map((other) => (
                    <Link
                      key={other._id}
                      to={`/careers/${other.slug?.current ?? other._id}`}
                      className="block group"
                    >
                      <h4 className="text-sm font-semibold text-brand-dark group-hover:text-brand-primary transition-colors">
                        {other.title}
                      </h4>
                      <p className="text-xs text-gray-500 font-light mt-0.5">
                        {other.department} • {other.location}
                      </p>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </aside>
        </div>
      </div>
    </div>
  );
};

const CareerDetailSkeleton: React.FC = () => (
  <div className="flex flex-col min-h-screen bg-white animate-pulse">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-4 sm:mt-8 w-full">
      <div className="h-64 bg-gray-200 rounded-2xl md:rounded-[28px]" />
    </div>
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 w-full grid grid-cols-1 lg:grid-cols-12 gap-12">
      <div className="lg:col-span-8 space-y-6">
        <div className="h-28 bg-gray-100 rounded-2xl" />
        <div className="h-6 bg-gray-200 rounded w-1/3" />
        <div className="h-4 bg-gray-100 rounded w-full" />
        <div className="h-4 bg-gray-100 rounded w-4/5" />
      </div>
      <div className="lg:col-span-4 h-80 bg-gray-100 rounded-2xl" />
    </div>
  </div>
);
