import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Calendar, Clock, User, ArrowLeft, ArrowRight, Share2 } from 'lucide-react';

import { FooterCTA } from '../components/UI/FooterCTA';
import { SEO } from '../components/SEO';
import { PortableText } from '../components/UI/PortableText';
import { ArticleShareBar } from '../components/UI/ArticleShareBar';
import { ArticleShareModal } from '../components/UI/ArticleShareModal';
import bannerBg from '../assets/images/banner_bg.jpg';

import { useSanityPage } from '../sanity/hooks/useSanityPage';
import { ARTICLE_DETAIL_QUERY, ARTICLES_QUERY } from '../sanity/lib/queries';
import { resolveImage } from '../sanity/lib/image';
import { SanityImage } from '../components/UI/SanityImage';
import type { ArticleItem } from '../types';

// ─── Fallback articles ────────────────────────────────────────────────────────
const fallbackArticles: ArticleItem[] = [
  {
    _id: 'seed-article-1',
    title: 'East African Macroeconomic Outlook for H2 2026',
    slug: { current: 'east-african-macroeconomic-outlook-h2-2026' },
    excerpt:
      'An in-depth analysis of monetary policy shifts, inflationary trends, and currency performance across Uganda, Kenya, and Tanzania.',
    category: 'Market Update',
    publishedAt: '2026-07-10T00:00:00Z',
    readTime: '6 min read',
  },
  {
    _id: 'seed-article-2',
    title: 'Building a Resilient Portfolio: The Case for Private Credit',
    slug: { current: 'building-resilient-portfolio-private-credit' },
    excerpt:
      'Discover why sophisticated investors are moving towards senior secured debt funds to secure yields in volatile markets.',
    category: 'Investment Advice',
    publishedAt: '2026-06-28T00:00:00Z',
    readTime: '4 min read',
  },
];

// ─── Root component ───────────────────────────────────────────────────────────
export const ArticleDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { data: allArticles } = useSanityPage<ArticleItem[]>(ARTICLES_QUERY, fallbackArticles);

  return <ArticleDetailContent slug={slug ?? ''} allArticles={allArticles} />;
};

// ─── Props ────────────────────────────────────────────────────────────────────
interface ArticleDetailContentProps {
  slug: string;
  allArticles: ArticleItem[];
}

// ─── Content component ────────────────────────────────────────────────────────
const ArticleDetailContent: React.FC<ArticleDetailContentProps> = ({ slug, allArticles }) => {
  const navigate = useNavigate();
  const [shareModalArticle, setShareModalArticle] = useState<ArticleItem | null>(null);

  const fallbackArticle: ArticleItem =
    fallbackArticles.find((a) => a.slug?.current === slug) ?? {
      _id: '',
      title: '',
      slug: { current: slug },
    };

  const { data: article, isLoading } = useSanityPage<ArticleItem>(
    ARTICLE_DETAIL_QUERY,
    fallbackArticle,
    { slug },
  );

  if (isLoading) {
    return <ArticleDetailSkeleton />;
  }

  if (!article.title) {
    void navigate('/news');
    return null;
  }

  const formattedDate = article.publishedAt
    ? new Date(article.publishedAt).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : null;

  const coverUrl = resolveImage(article.coverImage, bannerBg);
  const hasBody = Array.isArray(article.body) && article.body.length > 0;
  const currentOrigin = typeof window !== 'undefined' ? window.location.origin : '';
  const currentArticleUrl = `${currentOrigin}/news/${slug}`;

  // Previous & Next navigation
  const currentIndex = allArticles.findIndex((a) => a.slug?.current === slug);
  const prevArticle = currentIndex > 0 ? allArticles[currentIndex - 1] : null;
  const nextArticle =
    currentIndex >= 0 && currentIndex < allArticles.length - 1
      ? allArticles[currentIndex + 1]
      : null;

  // Recent articles (top 3 excluding current article)
  const recentArticles = allArticles.filter((a) => a.slug?.current !== slug).slice(0, 3);

  return (
    <div className="flex flex-col min-h-screen">
      <SEO
        title={article.title}
        description={article.excerpt}
        ogImage={article.coverImage}
        preloadImage={coverUrl}
      />

      {/* ── Social Floating Share Bar (Desktop & Mobile) ─────────────── */}
      <ArticleShareBar
        url={currentArticleUrl}
        title={article.title}
        excerpt={article.excerpt}
      />

      {/* ── Hero Banner ─────────────────────────────────────────────────── */}
      <div className="pt-6 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <section className="relative min-h-[14rem] sm:min-h-[16rem] md:min-h-[18rem] py-8 sm:py-12 md:py-16 px-4 sm:px-6 flex flex-col items-center justify-center rounded-2xl md:rounded-[28px] bg-gradient-to-br from-[#005b5c] to-[#002e2e] shadow-sm">
          <div className="text-center w-full max-w-4xl mx-auto flex flex-col items-center">
            {/* Breadcrumb Navigation */}
            <nav
              aria-label="Breadcrumb"
              className="flex items-center justify-center gap-2 text-[11px] sm:text-xs text-white/75 mb-3 sm:mb-4 font-medium flex-wrap"
            >
              <Link to="/" className="hover:text-white transition-colors">
                Home
              </Link>
              <span className="text-white/40">/</span>
              <Link to="/news" className="hover:text-white transition-colors">
                News
              </Link>
              <span className="text-white/40">/</span>
              <span className="text-brand-green font-bold uppercase tracking-wider">
                {article.category ?? 'Insights'}
              </span>
            </nav>

            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-light text-white tracking-normal sm:tracking-wide leading-snug sm:leading-tight break-words">
              {article.title}
            </h1>
          </div>
        </section>
      </div>

      {/* ── Main Full-Page Article Content ─────────────────────────────── */}
      <section className="py-12 sm:py-16 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          {/* Cover image */}
          <div className="rounded-2xl md:rounded-[28px] overflow-hidden h-[320px] sm:h-[440px] md:h-[500px] shadow-sm bg-brand-dark">
            <SanityImage
              image={article.coverImage}
              fallback={bannerBg}
              priority={true}
              sizes="(min-width: 1024px) 896px, 100vw"
              alt={article.coverImage?.alt ?? article.title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Meta row */}
          <div className="flex flex-wrap items-center gap-5 text-xs text-brand-gray font-medium border-b border-gray-100 pb-6">
            {formattedDate && (
              <span className="flex items-center gap-1.5">
                <Calendar size={13} />
                {formattedDate}
              </span>
            )}
            {article.readTime && (
              <span className="flex items-center gap-1.5">
                <Clock size={13} />
                {String(article.readTime)}
              </span>
            )}
            {article.author?.name && (
              <span className="flex items-center gap-1.5">
                <User size={13} />
                {article.author.name}
                {article.author.role && (
                  <span className="font-light text-gray-400">· {article.author.role}</span>
                )}
              </span>
            )}
          </div>

          {/* Excerpt / lead */}
          {article.excerpt && (
            <p className="text-base sm:text-lg text-teal-900 font-light leading-relaxed border-l-4 border-brand-primary pl-5">
              {article.excerpt}
            </p>
          )}

          {/* Rich text body */}
          {hasBody && (
            <div className="text-gray-500 text-base sm:text-lg leading-relaxed space-y-6 font-light">
              <PortableText value={article.body} />
            </div>
          )}

          {/* Author card */}
          {article.author?.name && (
            <div className="border-t border-gray-100 pt-8 flex items-start gap-4">
              {article.author.photo && (
                <SanityImage
                  image={article.author.photo}
                  sizes="128px"
                  alt={article.author.name}
                  className="w-14 h-14 rounded-full object-cover shrink-0"
                />
              )}
              <div>
                <p className="text-sm font-extrabold text-brand-dark">{article.author.name}</p>
                {article.author.role && (
                  <p className="text-xs text-brand-gray font-light">{article.author.role}</p>
                )}
                {article.author.bio && (
                  <p className="text-xs text-gray-500 font-light mt-1 leading-relaxed">
                    {article.author.bio}
                  </p>
                )}
              </div>
            </div>
          )}

          {/* ── Previous / Next Article Navigation ──────────────────────── */}
          {(prevArticle ?? nextArticle) && (
            <div className="pt-10 border-t border-gray-100">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                {prevArticle ? (
                  <Link
                    to={`/news/${prevArticle.slug?.current ?? ''}`}
                    className="group border border-gray-200 hover:border-brand-primary rounded-xl p-4 sm:p-5 flex items-center gap-4 transition-all duration-200 bg-white shadow-sm hover:shadow-md"
                  >
                    <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-lg overflow-hidden shrink-0 bg-brand-dark">
                      {prevArticle.coverImage ? (
                        <SanityImage
                          image={prevArticle.coverImage}
                          fallback={bannerBg}
                          sizes="80px"
                          alt={prevArticle.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-brand-dark to-brand-primary opacity-80" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-brand-primary flex items-center gap-1 mb-1">
                        <ArrowLeft size={12} />
                        Previous Article
                      </span>
                      <h4 className="text-sm sm:text-base font-bold text-brand-dark group-hover:text-brand-primary line-clamp-2 transition-colors">
                        {prevArticle.title}
                      </h4>
                    </div>
                  </Link>
                ) : (
                  <div className="hidden sm:block" />
                )}

                {nextArticle ? (
                  <Link
                    to={`/news/${nextArticle.slug?.current ?? ''}`}
                    className="group border border-gray-200 hover:border-brand-primary rounded-xl p-4 sm:p-5 flex items-center gap-4 transition-all duration-200 bg-white shadow-sm hover:shadow-md sm:text-right"
                  >
                    <div className="flex-1 min-w-0 sm:order-1">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-brand-primary flex items-center sm:justify-end gap-1 mb-1">
                        Next Article
                        <ArrowRight size={12} />
                      </span>
                      <h4 className="text-sm sm:text-base font-bold text-brand-dark group-hover:text-brand-primary line-clamp-2 transition-colors">
                        {nextArticle.title}
                      </h4>
                    </div>
                    <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-lg overflow-hidden shrink-0 bg-brand-dark sm:order-2">
                      {nextArticle.coverImage ? (
                        <SanityImage
                          image={nextArticle.coverImage}
                          fallback={bannerBg}
                          sizes="80px"
                          alt={nextArticle.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-brand-dark to-brand-primary opacity-80" />
                      )}
                    </div>
                  </Link>
                ) : (
                  <div className="hidden sm:block" />
                )}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ── Recent Articles Slot ────────────────────────────────────────── */}
      {recentArticles.length > 0 && (
        <section className="py-16 sm:py-20 bg-gray-50/50 border-t border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 sm:mb-10 gap-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-brand-green block mb-2">
                  News & Insights
                </span>
                <h2 className="text-2xl sm:text-3xl font-light text-brand-dark">
                  Recent Articles
                </h2>
              </div>
              <Link
                to="/news"
                className="text-xs font-bold uppercase tracking-wider text-brand-primary hover:text-brand-dark inline-flex items-center gap-1.5 transition-colors"
              >
                View All News
                <ArrowRight size={13} />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {recentArticles.map((item) => {
                const itemDate = item.publishedAt
                  ? new Date(item.publishedAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric',
                    })
                  : null;

                return (
                  <article
                    key={item._id}
                    className="bg-white border border-gray-150 rounded-xl overflow-hidden shadow-sm flex flex-col hover:shadow-md hover:border-brand-primary transition-all duration-200 group"
                  >
                    <div className="w-full h-48 sm:h-44 lg:h-48 overflow-hidden bg-brand-dark shrink-0">
                      {item.coverImage ? (
                        <SanityImage
                          image={item.coverImage}
                          fallback={bannerBg}
                          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                          alt={item.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-brand-dark to-brand-primary opacity-80" />
                      )}
                    </div>

                    <div className="p-5 sm:p-6 flex flex-col flex-grow">
                      <div className="flex-grow">
                        {item.category && (
                          <span className="text-[10px] font-extrabold uppercase tracking-widest text-brand-primary bg-teal-50 px-2.5 py-1 rounded">
                            {item.category}
                          </span>
                        )}
                        <h3 className="text-base sm:text-lg font-extrabold text-brand-dark mt-3 mb-2 leading-snug line-clamp-2">
                          {item.title}
                        </h3>
                        {item.excerpt && (
                          <p className="text-sm text-teal-900 opacity-80 leading-relaxed font-light line-clamp-3">
                            {item.excerpt}
                          </p>
                        )}
                      </div>

                      <div className="mt-5 pt-4 border-t border-gray-100">
                        <div className="flex items-center gap-4 text-xs text-brand-gray font-medium mb-4">
                          {itemDate && (
                            <span className="flex items-center gap-1.5">
                              <Calendar size={12} />
                              {itemDate}
                            </span>
                          )}
                          {item.readTime && (
                            <span className="flex items-center gap-1.5">
                              <Clock size={12} />
                              {String(item.readTime)}
                            </span>
                          )}
                        </div>

                        <div className="flex items-center justify-between">
                          <Link
                            to={`/news/${item.slug?.current ?? ''}`}
                            className="text-xs font-bold uppercase tracking-wider text-brand-primary hover:text-brand-dark inline-flex items-center gap-2 group/btn"
                          >
                            Read Article
                            <ArrowRight
                              size={13}
                              className="transform translate-x-0 group-hover/btn:translate-x-1 transition-transform duration-150"
                            />
                          </Link>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.preventDefault();
                              setShareModalArticle(item);
                            }}
                            className="p-1.5 rounded-lg text-brand-gray hover:text-brand-primary hover:bg-teal-50 transition-colors flex items-center gap-1 text-xs"
                            aria-label={`Share ${item.title}`}
                            title="Share article"
                          >
                            <Share2 size={13} />
                            <span className="text-[11px] font-medium hidden sm:inline">Share</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* ── Card Share Modal ────────────────────────────────────────────── */}
      <ArticleShareModal
        isOpen={Boolean(shareModalArticle)}
        onClose={() => {
          setShareModalArticle(null);
        }}
        article={shareModalArticle}
      />

      <FooterCTA />
    </div>
  );
};

// ─── Loading skeleton ─────────────────────────────────────────────────────────
const ArticleDetailSkeleton: React.FC = () => (
  <div className="flex flex-col min-h-screen animate-pulse bg-white">
    {/* Hero skeleton */}
    <div className="pt-6 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
      <section className="relative h-52 sm:h-64 md:h-72 flex items-center justify-center overflow-hidden rounded-2xl md:rounded-[28px] bg-gray-200">
        <div className="text-center w-full px-4 space-y-4 flex flex-col items-center">
          <div className="h-4 bg-gray-300 rounded w-32" />
          <div className="h-10 sm:h-12 bg-gray-300 rounded w-3/4 max-w-lg" />
        </div>
      </section>
    </div>

    {/* Full-page article content skeleton */}
    <section className="py-12 sm:py-16 lg:py-20 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Cover image skeleton */}
        <div className="rounded-2xl md:rounded-[28px] bg-gray-200 h-[320px] sm:h-[440px] md:h-[500px]" />

        {/* Meta row skeleton */}
        <div className="flex gap-5 border-b border-gray-100 pb-6">
          <div className="h-4 bg-gray-200 rounded w-28" />
          <div className="h-4 bg-gray-200 rounded w-20" />
        </div>

        {/* Excerpt skeleton */}
        <div className="border-l-4 border-gray-200 pl-5 space-y-2">
          <div className="h-4 bg-gray-200 rounded w-full" />
          <div className="h-4 bg-gray-200 rounded w-5/6" />
        </div>

        {/* Body skeleton */}
        <div className="space-y-4">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div
              key={i}
              className={`h-4 bg-gray-100 rounded ${i % 3 === 0 ? 'w-4/6' : 'w-full'}`}
            />
          ))}
        </div>

        {/* Prev / Next skeleton */}
        <div className="pt-10 border-t border-gray-100">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            <div className="border border-gray-100 rounded-xl p-5 flex items-center gap-4">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-lg bg-gray-200 shrink-0" />
              <div className="flex-1 space-y-2">
                <div className="h-3 bg-gray-200 rounded w-24" />
                <div className="h-4 bg-gray-100 rounded w-full" />
              </div>
            </div>
            <div className="border border-gray-100 rounded-xl p-5 flex items-center gap-4">
              <div className="flex-1 space-y-2">
                <div className="h-3 bg-gray-200 rounded w-24 sm:ml-auto" />
                <div className="h-4 bg-gray-100 rounded w-full" />
              </div>
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-lg bg-gray-200 shrink-0" />
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* Recent articles skeleton */}
    <section className="py-16 sm:py-20 bg-gray-50/50 border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="h-8 bg-gray-200 rounded w-48 mb-8" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="bg-white border border-gray-100 rounded-xl overflow-hidden flex flex-col"
            >
              <div className="h-48 sm:h-44 lg:h-48 bg-gray-200 w-full" />
              <div className="p-5 sm:p-6 space-y-4">
                <div className="h-4 bg-gray-200 rounded w-1/4" />
                <div className="h-5 bg-gray-200 rounded w-3/4" />
                <div className="space-y-2">
                  <div className="h-3.5 bg-gray-100 rounded w-full" />
                  <div className="h-3.5 bg-gray-100 rounded w-5/6" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  </div>
);
