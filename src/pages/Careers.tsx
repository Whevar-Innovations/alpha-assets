import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Briefcase, MapPin, Clock, Calendar, ArrowRight, Mail } from 'lucide-react';
import { Button } from '../components/UI/Button';
import { SEO } from '../components/SEO';
import bannerBg from '../assets/images/banner_bg.jpg';

import { useSanityPage } from '../sanity/hooks/useSanityPage';
import { CAREERS_PAGE_QUERY, JOB_VACANCIES_QUERY } from '../sanity/lib/queries';
import { careersDefaults, fallbackJobVacancies } from '../sanity/defaults/careers';
import { resolveImage } from '../sanity/lib/image';
import type { CareersPageData, JobVacancyItem } from '../types';

export const Careers: React.FC = () => {
  const navigate = useNavigate();
  const { data: pageData, isLoading: isPageLoading } = useSanityPage<CareersPageData>(
    CAREERS_PAGE_QUERY,
    careersDefaults
  );

  const { data: vacanciesData, isLoading: isVacanciesLoading } = useSanityPage<JobVacancyItem[]>(
    JOB_VACANCIES_QUERY,
    fallbackJobVacancies
  );

  const [selectedDepartment, setSelectedDepartment] = useState<string>('All');

  if (isPageLoading && isVacanciesLoading) {
    return <CareersSkeleton />;
  }

  if (pageData.pageVisible === false) {
    void navigate('/404');
    return null;
  }

  const hero = pageData.hero ?? careersDefaults.hero;
  const heroVisible = pageData.heroVisible ?? true;
  const bgImgUrl = resolveImage(hero?.backgroundImage, bannerBg);

  const vacancies = vacanciesData.length > 0 ? vacanciesData : fallbackJobVacancies;
  const openVacancies = vacancies.filter((v) => v.status === 'Open');

  // Extract distinct departments for filtering
  const departments = ['All', ...Array.from(new Set(openVacancies.map((v) => v.department).filter(Boolean))) as string[]];

  const filteredVacancies =
    selectedDepartment === 'All'
      ? openVacancies
      : openVacancies.filter((v) => v.department === selectedDepartment);

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <SEO
        title={pageData.seo?.metaTitle ?? careersDefaults.seo?.metaTitle}
        description={pageData.seo?.metaDescription ?? careersDefaults.seo?.metaDescription}
        ogImage={pageData.seo?.ogImage}
      />

      {/* Hero Banner */}
      {heroVisible && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-4 sm:mt-8 w-full">
          <section
            className="relative min-h-[220px] sm:h-64 md:h-72 flex items-center justify-center overflow-hidden rounded-2xl md:rounded-[28px] py-10 px-4"
            style={{
              backgroundImage: `linear-gradient(rgba(0, 56, 46, 0.78), rgba(0, 56, 46, 0.78)), url(${bgImgUrl})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
            <div className="flex flex-col items-center gap-4 sm:gap-6 text-center px-2">
              <h1 className="text-3xl sm:text-5xl font-light text-white tracking-tight">
                {hero?.heading ?? 'Careers'}
              </h1>
              {hero?.ctaButton?.isVisible && hero.ctaButton.label ? (
                <Button
                  variant={hero.ctaButton.variant}
                  onClick={() => {
                    const cta = hero.ctaButton;
                    if (cta) {
                      if (cta.url.startsWith('#')) {
                        const target = document.querySelector(cta.url);
                        target?.scrollIntoView({ behavior: 'smooth' });
                      } else if (cta.linkType === 'external') {
                        window.open(cta.url, '_blank');
                      } else {
                        void navigate(cta.url);
                      }
                    }
                  }}
                >
                  {hero.ctaButton.label}
                </Button>
              ) : null}
            </div>
          </section>
        </div>
      )}

      {/* Intro Section */}
      <section className="py-12 sm:py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center space-y-4 sm:space-y-5">
          <span className="text-[11px] sm:text-xs font-bold uppercase tracking-widest text-brand-primary">
            Careers at Alpha
          </span>
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-light text-brand-primary leading-tight">
            {pageData.introHeading ?? careersDefaults.introHeading}
          </h2>
          <p className="text-sm sm:text-lg leading-relaxed text-[#4a7060] font-light">
            {pageData.introDescription ?? careersDefaults.introDescription}
          </p>
        </div>
      </section>

      {/* Vacancies Section */}
      <section id="vacancies" className="pb-24 sm:pb-32 bg-white scroll-mt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Department Filter Pills (if multiple departments) */}
          {departments.length > 2 && (
            <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-10 sm:mb-12">
              {departments.map((dept) => (
                <button
                  key={dept}
                  onClick={() => { setSelectedDepartment(dept); }}
                  className={`px-4 sm:px-5 py-2 sm:py-2.5 rounded text-[11px] sm:text-xs font-bold uppercase tracking-wider transition-all duration-150 border ${
                    selectedDepartment === dept
                      ? 'bg-brand-primary text-white border-brand-primary shadow-sm'
                      : 'bg-white text-brand-dark border-gray-200 hover:border-brand-primary hover:text-brand-primary'
                  }`}
                >
                  {dept}
                </button>
              ))}
            </div>
          )}

          {/* Job Listings Grid / List */}
          {filteredVacancies.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto">
              {filteredVacancies.map((vacancy) => {
                const formattedDate = vacancy.datePosted
                  ? new Date(vacancy.datePosted).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric',
                    })
                  : null;

                return (
                  <article
                    key={vacancy._id}
                    className="bg-white border border-gray-200 rounded-2xl p-5 sm:p-7 flex flex-col justify-between shadow-sm hover:shadow-md hover:border-brand-primary transition-all duration-200 group"
                  >
                    <div>
                      {/* Top Badges */}
                      <div className="flex flex-wrap items-center gap-2 mb-3 sm:mb-4">
                        {vacancy.department && (
                          <span className="text-[10px] font-extrabold uppercase tracking-widest text-brand-primary bg-teal-50 px-2.5 py-1 rounded">
                            {vacancy.department}
                          </span>
                        )}
                        {vacancy.employmentType && (
                          <span className="text-[10px] font-semibold text-brand-dark bg-gray-100 px-2.5 py-1 rounded">
                            {vacancy.employmentType}
                          </span>
                        )}
                      </div>

                      {/* Title */}
                      <h3 className="text-lg sm:text-xl font-bold text-brand-dark leading-snug group-hover:text-brand-primary transition-colors">
                        {vacancy.title}
                      </h3>

                      {/* Location & Meta */}
                      <div className="flex flex-wrap items-center gap-3 text-xs text-gray-500 font-light mt-2 mb-4">
                        {vacancy.location && (
                          <span className="flex items-center gap-1">
                            <MapPin size={13} className="text-brand-primary" />
                            {vacancy.location}
                          </span>
                        )}
                        {formattedDate && (
                          <span className="flex items-center gap-1">
                            <Calendar size={13} />
                            {formattedDate}
                          </span>
                        )}
                      </div>

                      {/* Summary */}
                      <p className="text-xs sm:text-sm text-gray-600 leading-relaxed font-light line-clamp-3 mb-6">
                        {vacancy.summary}
                      </p>
                    </div>

                    {/* Card Footer with CTA */}
                    <div className="pt-4 border-t border-gray-100 flex flex-wrap items-center justify-between gap-3">
                      {vacancy.deadline ? (
                        <span className="text-[11px] text-gray-400 font-light flex items-center gap-1">
                          <Clock size={12} />
                          Closes: {new Date(vacancy.deadline).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                        </span>
                      ) : (
                        <span className="text-[11px] text-brand-green font-medium">Open Position</span>
                      )}

                      <button
                        onClick={() => {
                          const slug = vacancy.slug?.current ?? vacancy._id;
                          void navigate(`/careers/${slug}`);
                        }}
                        className="text-xs font-bold uppercase tracking-wider text-brand-primary hover:text-brand-dark inline-flex items-center gap-1.5 group/btn ml-auto sm:ml-0"
                      >
                        View Details
                        <ArrowRight
                          size={14}
                          className="transform translate-x-0 group-hover/btn:translate-x-1 transition-transform duration-150"
                        />
                      </button>
                    </div>
                  </article>
                );
              })}
            </div>
          ) : (
            /* Clean On-Brand Empty State */
            <div className="max-w-xl mx-auto text-center py-16 px-6 bg-brand-cardBg rounded-3xl border border-teal-100">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-5 shadow-sm text-brand-primary">
                <Briefcase size={28} />
              </div>
              <h3 className="text-2xl font-light text-brand-dark mb-3">
                {pageData.noVacanciesTitle ?? careersDefaults.noVacanciesTitle}
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed font-light mb-6">
                {pageData.noVacanciesMessage ?? careersDefaults.noVacanciesMessage}
              </p>
              <a
                href="mailto:careers@alphaeastafrica.com"
                className="inline-flex items-center gap-2 px-6 py-3 bg-brand-primary text-white text-xs font-bold uppercase tracking-wider rounded-xl hover:bg-opacity-95 transition-all shadow-sm"
              >
                <Mail size={16} />
                Send Spontaneous Application
              </a>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

const CareersSkeleton: React.FC = () => (
  <div className="flex flex-col min-h-screen bg-white animate-pulse">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-4 sm:mt-8 w-full">
      <div className="h-56 sm:h-64 md:h-72 bg-gray-200 rounded-2xl md:rounded-[28px]" />
    </div>
    <div className="max-w-3xl mx-auto px-4 py-16 text-center space-y-4">
      <div className="h-4 bg-gray-200 rounded w-1/4 mx-auto" />
      <div className="h-8 bg-gray-200 rounded w-2/3 mx-auto" />
      <div className="h-4 bg-gray-100 rounded w-4/5 mx-auto" />
    </div>
    <div className="max-w-6xl mx-auto px-4 pb-24 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {[1, 2, 3].map((i) => (
        <div key={i} className="h-72 bg-gray-100 rounded-2xl border border-gray-200" />
      ))}
    </div>
  </div>
);
