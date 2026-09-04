import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Calendar, Clock, User } from 'lucide-react';

import { FooterCTA } from '../components/UI/FooterCTA';
import { SEO } from '../components/SEO';
import { PortableText } from '../components/UI/PortableText';
import bannerBg from '../assets/images/banner_bg.jpg';

import { useSanityPage } from '../sanity/hooks/useSanityPage';
import { ARTICLE_DETAIL_QUERY, ARTICLES_QUERY } from '../sanity/lib/queries';
import { resolveImage } from '../sanity/lib/image';
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
    return <ArticleDetailSkeleton allArticles={allArticles} />;
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
  const relatedArticles = allArticles.filter((a) => a.slug?.current !== slug);

  return (
    <div className="flex flex-col min-h-screen">
      <SEO
        title={article.title}
        description={article.excerpt}
        ogImage={article.coverImage}
      />

      {/* ── Hero — matches InvestDetail exactly ─────────────────────────── */}
      <div className="pt-6 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <section className="relative h-52 sm:h-64 md:h-72 flex items-center justify-center overflow-hidden rounded-2xl md:rounded-[28px] bg-gradient-to-br from-[#005b5c] to-[#002e2e]">
          <div className="text-center w-full px-4">
            <span className="text-xs font-bold uppercase tracking-widest text-brand-green mb-4 block">
              {article.category ?? 'News & Insights'}
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-light text-white tracking-wide max-w-3xl mx-auto leading-snug">
              {article.title}
            </h1>
          </div>
        </section>
      </div>

      {/* ── Main two-column content — matches InvestDetail exactly ────────── */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

            {/* ── Left sidebar — mirrors "Our Services" card ── */}
            <aside className="lg:col-span-4 space-y-6 order-2 lg:order-1">
              <div className="bg-white border border-brand-primary rounded-[1.5rem] p-6 sm:p-8">
                <h3 className="text-3xl font-light text-brand-primary mb-6">
                  More Articles
                </h3>
                <nav className="flex flex-col">
                  {relatedArticles.map((item) => {
                    const isActive = slug === item.slug?.current;
                    return (
                      <div key={item._id} className="border-b border-brand-dark last:border-b-0">
                        <Link
                          to={`/news/${item.slug?.current ?? ''}`}
                          className="group transition-all duration-150 py-3 flex items-start gap-2 w-full"
                        >
                          <span className={`text-base mt-0.5 shrink-0 ${isActive ? 'text-brand-primary font-bold' : 'text-gray-500 font-light group-hover:text-brand-primary'}`}>
                            •
                          </span>
                          <span className={`text-base leading-snug ${isActive ? 'text-brand-primary font-bold' : 'text-gray-500 font-light group-hover:text-brand-primary'}`}>
                            {item.title}
                          </span>
                        </Link>
                      </div>
                    );
                  })}
                  {relatedArticles.length === 0 && (
                    <p className="text-sm text-gray-400 font-light py-2">No other articles yet.</p>
                  )}
                </nav>
              </div>
            </aside>

            {/* ── Right article content — mirrors service detail ── */}
            <article className="lg:col-span-8 space-y-10 order-1 lg:order-2">

              {/* Cover image — matches the rounded service image */}
              <div className="rounded-[1.5rem] overflow-hidden h-[300px] sm:h-[400px] shadow-sm">
                <img
                  src={coverUrl}
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
                <div className="text-gray-500 text-sm sm:text-base leading-relaxed space-y-6 font-light">
                  <PortableText value={article.body} />
                </div>
              )}

              {/* Author card */}
              {article.author?.name && (
                <div className="border-t border-gray-100 pt-8 flex items-start gap-4">
                  {article.author.photo && (
                    <img
                      src={resolveImage(article.author.photo)}
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

            </article>

          </div>
        </div>
      </section>

      <FooterCTA />
    </div>
  );
};

// ─── Loading skeleton — mirrors InvestDetailSkeleton ─────────────────────────
interface ArticleDetailSkeletonProps {
  allArticles: ArticleItem[];
}

const ArticleDetailSkeleton: React.FC<ArticleDetailSkeletonProps> = ({ allArticles }) => (
  <div className="flex flex-col min-h-screen animate-pulse">

    {/* Hero skeleton */}
    <div className="pt-6 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
      <section className="relative h-52 sm:h-64 md:h-72 flex items-center justify-center overflow-hidden rounded-2xl md:rounded-[28px] bg-gray-200">
        <div className="text-center w-full px-4 space-y-4 flex flex-col items-center">
          <div className="h-4 bg-gray-300 rounded w-32" />
          <div className="h-10 sm:h-12 bg-gray-300 rounded w-3/4 max-w-lg" />
        </div>
      </section>
    </div>

    {/* Two-column skeleton */}
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

          {/* Sidebar skeleton */}
          <aside className="lg:col-span-4 space-y-6 order-2 lg:order-1">
            <div className="bg-white border border-gray-100 rounded-[1.5rem] p-6 sm:p-8">
              <div className="h-8 bg-gray-200 rounded w-1/2 mb-6" />
              <nav className="flex flex-col">
                {allArticles.map((item) => (
                  <div key={item._id} className="border-b border-gray-100 py-3">
                    <div className="h-5 rounded w-3/4 bg-gray-100" />
                  </div>
                ))}
              </nav>
            </div>
          </aside>

          {/* Article skeleton */}
          <article className="lg:col-span-8 space-y-10 order-1 lg:order-2">
            <div className="rounded-[1.5rem] bg-gray-200 h-[300px] sm:h-[400px]" />
            <div className="flex gap-5 border-b border-gray-100 pb-6">
              <div className="h-4 bg-gray-200 rounded w-28" />
              <div className="h-4 bg-gray-200 rounded w-20" />
            </div>
            <div className="border-l-4 border-gray-200 pl-5 space-y-2">
              <div className="h-4 bg-gray-200 rounded w-full" />
              <div className="h-4 bg-gray-200 rounded w-5/6" />
            </div>
            <div className="space-y-3">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className={`h-4 bg-gray-100 rounded ${i % 3 === 0 ? 'w-4/6' : 'w-full'}`} />
              ))}
            </div>
          </article>

        </div>
      </div>
    </section>
  </div>
);
