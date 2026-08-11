import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FooterCTA } from '../components/UI/FooterCTA';
import { SEO } from '../components/SEO';
import type { ArticleItem } from '../types';
import bannerBg from '../assets/images/banner_bg.jpg';
import { Calendar, Clock, ArrowRight } from 'lucide-react';

import { useSanityPage } from '../sanity/hooks/useSanityPage';
import { NEWS_QUERY, ARTICLES_QUERY } from '../sanity/lib/queries';
import { newsDefaults } from '../sanity/defaults/news';
import { resolveImage } from '../sanity/lib/image';

// Fallback articles if none in Sanity
const fallbackArticles = [
  {
    _id: 'article-1',
    title: 'East African Macroeconomic Outlook for H2 2026',
    slug: { current: 'east-african-macroeconomic-outlook-h2-2026' },
    excerpt: 'An in-depth analysis of monetary policy shifts, inflationary trends, and currency performance across Uganda, Kenya, and Tanzania.',
    category: 'Market Update',
    publishedAt: '2026-07-10T00:00:00Z',
    readTime: '6 min read',
  },
  {
    _id: 'article-2',
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
  const { data: articles, isLoading: isArticlesLoading } = useSanityPage(ARTICLES_QUERY, fallbackArticles);

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

      {/* Hero Banner */}
      {heroVisible && (
        <section 
          className="relative h-48 sm:h-56 flex items-center bg-brand-dark"
          style={{
            backgroundImage: `linear-gradient(rgba(0, 46, 46, 0.85), rgba(0, 46, 46, 0.85)), url(${bgImgUrl})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center w-full">
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-wide">
              {hero?.heading}
            </h1>
          </div>
        </section>
      )}

      {/* Articles Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Category Filter Pills */}
          <div className="flex flex-wrap justify-center gap-3 mb-16 max-w-2xl mx-auto">
            {categories.map((cat: string) => (
              <button
                key={cat}
                onClick={() => { setFilter(cat); }}
                className={`px-5 py-2.5 rounded text-xs font-bold uppercase tracking-wider transition-all duration-150 border ${
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {filteredArticles.map((article: ArticleItem) => {
              const formattedDate = new Date(article.publishedAt ?? '').toLocaleDateString('en-US', {
                year: 'numeric', month: 'long', day: 'numeric'
              });
              const coverUrl = resolveImage(article.coverImage);

              return (
                <article 
                  key={article._id}
                  className="bg-white border border-gray-150 rounded-lg p-8 shadow-sm flex flex-col justify-between hover:shadow-md hover:border-brand-primary transition-all duration-200"
                >
                  <div>
                    {/* Category Tag */}
                    {article.category && (
                      <span className="text-[10px] font-extrabold uppercase tracking-widest text-brand-primary bg-teal-50 px-2.5 py-1 rounded">
                        {article.category}
                      </span>
                    )}
                    
                    {coverUrl && (
                      <div className="mt-4 -mx-4 overflow-hidden rounded-md">
                        <img src={coverUrl} alt={article.title} className="w-full h-40 object-cover" />
                      </div>
                    )}
                    
                    {/* Title */}
                    <h3 className="text-lg font-extrabold text-brand-dark mt-6 mb-3 leading-snug">
                      {article.title}
                    </h3>
                    
                    {/* Excerpt */}
                    <p className="text-sm text-teal-900 opacity-90 leading-relaxed font-light mb-8">
                      {article.excerpt}
                    </p>
                  </div>

                  <div>
                    {/* Article Metadata */}
                    <div className="flex items-center gap-4 text-xs text-brand-gray font-medium border-t border-gray-100 pt-6 mb-6">
                      <span className="flex items-center gap-1.5">
                        <Calendar size={14} />
                        {formattedDate}
                      </span>
                      {article.readTime && (
                        <span className="flex items-center gap-1.5">
                          <Clock size={14} />
                          {article.readTime}
                        </span>
                      )}
                    </div>

                    {/* Read Article Link */}
                    <button 
                      onClick={() => { void navigate(`/news/${article.slug?.current ?? ''}`); }}
                      className="text-xs font-bold uppercase tracking-wider text-brand-primary hover:text-brand-dark inline-flex items-center gap-2 group"
                    >
                      Read Article
                      <ArrowRight size={14} className="transform translate-x-0 group-hover:translate-x-1 transition-transform duration-150" />
                    </button>
                  </div>
                </article>
              );
            })}
          </div>

        </div>
      </section>

      {/* Footer CTA */}
      <FooterCTA />

    </div>
  );
};

const NewsSkeleton: React.FC = () => (
  <div className="flex flex-col min-h-screen animate-pulse bg-white">
    {/* Hero Banner */}
    <div className="h-48 sm:h-56 bg-gray-200 w-full flex items-center justify-center">
       <div className="h-10 bg-gray-300 rounded w-1/3"></div>
    </div>

    {/* Articles Section */}
    <div className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Category Filter Pills */}
        <div className="flex flex-wrap justify-center gap-3 mb-16 max-w-2xl mx-auto">
          {[1, 2, 3, 4].map(i => (
             <div key={i} className="h-10 bg-gray-200 rounded w-24"></div>
          ))}
        </div>

        {/* Grid Layout of Articles */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {[1, 2, 3, 4, 5, 6].map(i => (
             <div key={i} className="bg-white border border-gray-100 rounded-lg p-8 h-[400px] flex flex-col space-y-4">
                <div className="h-5 bg-gray-200 rounded w-1/4"></div>
                <div className="h-40 bg-gray-100 rounded-md w-[calc(100%+2rem)] -mx-4"></div>
                <div className="h-6 bg-gray-200 rounded w-3/4 mt-6"></div>
                <div className="h-4 bg-gray-100 rounded w-full"></div>
                <div className="h-4 bg-gray-100 rounded w-5/6"></div>
             </div>
          ))}
        </div>

      </div>
    </div>
  </div>
);
