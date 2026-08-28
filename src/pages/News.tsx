import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FooterCTA } from '../components/UI/FooterCTA';
import { SEO } from '../components/SEO';
import type { ArticleItem } from '../types';
import bannerBg from '../assets/images/banner_bg.jpg';
import { Button } from '../components/UI/Button';
import { Calendar, Clock, ArrowRight } from 'lucide-react';

import { useSanityPage } from '../sanity/hooks/useSanityPage';
import { NEWS_QUERY, ARTICLES_QUERY } from '../sanity/lib/queries';
import { newsDefaults } from '../sanity/defaults/news';
import { resolveImage } from '../sanity/lib/image';

// Fallback articles if none in Sanity
const fallbackArticles: ArticleItem[] = [
  {
    _id: 'seed-article-1',
    title: 'East African Macroeconomic Outlook for H2 2026',
    slug: { current: 'east-african-macroeconomic-outlook-h2-2026' },
    excerpt: 'An in-depth analysis of monetary policy shifts, inflationary trends, and currency performance across Uganda, Kenya, and Tanzania.',
    category: 'Market Update',
    publishedAt: '2026-07-10T00:00:00Z',
    readTime: '6 min read',
  },
  {
    _id: 'seed-article-2',
    title: 'Building a Resilient Portfolio: The Case for Private Credit',
    slug: { current: 'building-resilient-portfolio-private-credit' },
    excerpt: 'Discover why sophisticated investors are moving towards senior secured debt funds to secure yields in volatile markets.',
    category: 'Investment Advice',
    publishedAt: '2026-06-28T00:00:00Z',
    readTime: '4 min read',
  },
];

export const News: React.FC = () => {
  const navigate = useNavigate();
  const { data: pageData, isLoading: isPageLoading } = useSanityPage(NEWS_QUERY, newsDefaults);
  const { data: articles, isLoading: isArticlesLoading } = useSanityPage<ArticleItem[]>(ARTICLES_QUERY, fallbackArticles);

  const [filter, setFilter] = useState<string>('All');

  if (isPageLoading || isArticlesLoading) {
    return <NewsSkeleton />;
  }

  if (pageData.pageVisible === false) {
    void navigate('/404');
    return null;
  }

  const hero = pageData.hero ?? newsDefaults.hero;
  const heroVisible = pageData.heroVisible ?? true;
  const bgImgUrl = resolveImage(hero?.backgroundImage, bannerBg);

  // Extract unique categories from articles
  const categories = ['All', ...Array.from(new Set(articles.map((a: ArticleItem) => a.category).filter(Boolean)))] as string[];
  const filteredArticles = filter === 'All'
    ? articles
    : articles.filter((a: ArticleItem) => a.category === filter);

  return (
    <div className="flex flex-col min-h-screen">
      <SEO title={pageData.seo?.metaTitle} description={pageData.seo?.metaDescription} ogImage={pageData.seo?.ogImage} />

      {/* Hero Banner — matches About / Invest style */}
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
            <div className="flex flex-col items-center gap-6 text-center px-4">
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

      {/* Articles Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Category Filter Pills */}
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-10 sm:mb-14">
            {categories.map((cat: string) => (
              <button
                key={cat}
                onClick={() => { setFilter(cat); }}
                className={`px-4 sm:px-5 py-2 sm:py-2.5 rounded text-[11px] sm:text-xs font-bold uppercase tracking-wider transition-all duration-150 border ${
                  filter === cat
                    ? 'bg-brand-primary text-white border-brand-primary shadow-sm'
                    : 'bg-white text-brand-dark border-gray-200 hover:border-brand-primary hover:text-brand-primary'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Grid Layout of Articles */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto">
            {filteredArticles.map((article: ArticleItem) => {
              const formattedDate = new Date(article.publishedAt ?? '').toLocaleDateString('en-US', {
                year: 'numeric', month: 'short', day: 'numeric',
              });
              const coverUrl = resolveImage(article.coverImage);

              return (
                <article
                  key={article._id}
                  className="bg-white border border-gray-150 rounded-xl overflow-hidden shadow-sm flex flex-col hover:shadow-md hover:border-brand-primary transition-all duration-200 group"
                >
                  {/* Cover image — always present, with brand-dark fallback */}
                  <div className="w-full h-48 sm:h-44 lg:h-48 overflow-hidden bg-brand-dark shrink-0">
                    {coverUrl ? (
                      <img
                        src={coverUrl}
                        alt={article.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-brand-dark to-brand-primary opacity-80" />
                    )}
                  </div>

                  {/* Card body */}
                  <div className="p-5 sm:p-6 flex flex-col flex-grow">
                    <div className="flex-grow">
                      {/* Category tag */}
                      {article.category && (
                        <span className="text-[10px] font-extrabold uppercase tracking-widest text-brand-primary bg-teal-50 px-2.5 py-1 rounded">
                          {article.category}
                        </span>
                      )}

                      {/* Title */}
                      <h3 className="text-base sm:text-lg font-extrabold text-brand-dark mt-3 mb-2 leading-snug">
                        {article.title}
                      </h3>

                      {/* Excerpt */}
                      <p className="text-sm text-teal-900 opacity-80 leading-relaxed font-light line-clamp-3">
                        {article.excerpt}
                      </p>
                    </div>

                    {/* Footer: meta + link */}
                    <div className="mt-5 pt-4 border-t border-gray-100">
                      <div className="flex items-center gap-4 text-xs text-brand-gray font-medium mb-4">
                        <span className="flex items-center gap-1.5">
                          <Calendar size={12} />
                          {formattedDate}
                        </span>
                        {article.readTime && (
                          <span className="flex items-center gap-1.5">
                            <Clock size={12} />
                            {String(article.readTime)}
                          </span>
                        )}
                      </div>

                      <button
                        onClick={() => { void navigate(`/news/${article.slug?.current ?? ''}`); }}
                        className="text-xs font-bold uppercase tracking-wider text-brand-primary hover:text-brand-dark inline-flex items-center gap-2 group/btn"
                      >
                        Read Article
                        <ArrowRight size={13} className="transform translate-x-0 group-hover/btn:translate-x-1 transition-transform duration-150" />
                      </button>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>

        </div>
      </section>

      <FooterCTA />
    </div>
  );
};

// ─── Skeleton ─────────────────────────────────────────────────────────────────
const NewsSkeleton: React.FC = () => (
  <div className="flex flex-col min-h-screen animate-pulse bg-white">
    {/* Hero */}
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-4 sm:mt-8 w-full">
      <div className="h-52 sm:h-64 md:h-72 bg-gray-200 rounded-2xl md:rounded-[28px] flex items-center justify-center">
        <div className="h-10 sm:h-12 bg-gray-300 rounded w-1/3" />
      </div>
    </div>

    {/* Articles */}
    <div className="py-12 sm:py-16 lg:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Filter pills */}
        <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-10 sm:mb-14">
          {[1, 2, 3].map(i => (
            <div key={i} className="h-9 bg-gray-200 rounded w-20 sm:w-24" />
          ))}
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto">
          {[1, 2, 3, 4, 5, 6].map(i => (
            <div key={i} className="bg-white border border-gray-100 rounded-xl overflow-hidden flex flex-col">
              <div className="h-48 sm:h-44 lg:h-48 bg-gray-200 w-full" />
              <div className="p-5 sm:p-6 space-y-4">
                <div className="h-4 bg-gray-200 rounded w-1/4" />
                <div className="h-5 bg-gray-200 rounded w-3/4" />
                <div className="space-y-2">
                  <div className="h-3.5 bg-gray-100 rounded w-full" />
                  <div className="h-3.5 bg-gray-100 rounded w-5/6" />
                </div>
                <div className="h-px bg-gray-100 mt-4" />
                <div className="flex gap-4">
                  <div className="h-3 bg-gray-100 rounded w-20" />
                  <div className="h-3 bg-gray-100 rounded w-16" />
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  </div>
);
