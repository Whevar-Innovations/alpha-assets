import React, { useState, useEffect, useCallback, useRef } from 'react';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import type { ArticleItem } from '../../types';
import { resolveImage } from '../../sanity/lib/image';

interface FeaturedBannerProps {
  articles: ArticleItem[];
  onNavigate: (slug: string) => void;
}

const AUTO_ADVANCE_MS = 6000;

export const FeaturedBanner: React.FC<FeaturedBannerProps> = ({ articles, onNavigate }) => {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const count = articles.length;

  const goTo = useCallback((index: number) => {
    setCurrent((index + count) % count);
  }, [count]);

  const goNext = useCallback(() => { goTo(current + 1); }, [current, goTo]);
  const goPrev = useCallback(() => { goTo(current - 1); }, [current, goTo]);

  // Auto-advance
  useEffect(() => {
    if (count <= 1 || isPaused) return;
    intervalRef.current = setInterval(goNext, AUTO_ADVANCE_MS);
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [count, isPaused, goNext]);

  // Keyboard navigation
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') goPrev();
      if (e.key === 'ArrowRight') goNext();
    };
    window.addEventListener('keydown', handleKey);
    return () => { window.removeEventListener('keydown', handleKey); };
  }, [goNext, goPrev]);

  if (count === 0) return null;

  const article = articles[current];
  const coverUrl = resolveImage(article.coverImage);
  const formattedDate = article.publishedAt
    ? new Date(article.publishedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
    : null;

  return (
    <div
      className="relative w-full rounded-xl overflow-hidden mb-10 sm:mb-14 shadow-lg"
      aria-label="Featured articles carousel"
      role="region"
      onMouseEnter={() => { setIsPaused(true); }}
      onMouseLeave={() => { setIsPaused(false); }}
    >
      {/* ─── Slide ─────────────────────────────────────────────────────── */}
      <div className="flex flex-col lg:flex-row min-h-[320px] sm:min-h-[380px] lg:min-h-[420px]">

        {/* Left — content panel */}
        <div className="relative flex flex-col justify-center bg-brand-dark px-8 sm:px-10 lg:px-14 py-10 lg:py-14 lg:w-[48%] shrink-0">

          {/* "Featured" ribbon — top-left */}
          <div
            className="absolute top-0 left-0 bg-brand-primary text-white text-[10px] font-extrabold uppercase tracking-[0.18em] px-4 py-1.5 rounded-br-lg"
            aria-label="Featured article"
          >
            ⭐ Featured
          </div>

          {/* Category tag */}
          {article.category && (
            <span className="inline-block self-start mt-4 mb-5 text-[10px] font-extrabold uppercase tracking-widest text-brand-primary bg-teal-950 px-3 py-1 rounded">
              {article.category}
            </span>
          )}

          {/* Title */}
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-light text-white leading-snug mb-4 tracking-tight">
            {article.title}
          </h2>

          {/* Excerpt */}
          {article.excerpt && (
            <p className="text-sm sm:text-base text-teal-200 leading-relaxed font-light line-clamp-3 mb-6">
              {article.excerpt}
            </p>
          )}

          {/* Meta */}
          {formattedDate && (
            <p className="text-xs text-teal-400 font-medium mb-8">{formattedDate}</p>
          )}

          {/* CTA */}
          <button
            onClick={() => { onNavigate(article.slug?.current ?? ''); }}
            className="self-start inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-white border border-white/40 hover:bg-white hover:text-brand-dark px-5 py-2.5 rounded transition-all duration-200 group/cta"
            aria-label={`Read featured article: ${article.title}`}
          >
            Read Article
            <ArrowRight size={13} className="transform translate-x-0 group-hover/cta:translate-x-1 transition-transform duration-150" />
          </button>
        </div>

        {/* Right — image panel */}
        <div className="relative flex-1 min-h-[220px] lg:min-h-0 bg-brand-dark overflow-hidden">
          {coverUrl ? (
            <img
              key={article._id}
              src={coverUrl}
              alt={article.title}
              className="w-full h-full object-cover absolute inset-0 transition-opacity duration-500"
            />
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-brand-dark to-brand-primary opacity-70" />
          )}
          {/* Subtle gradient bridge to left panel on desktop */}
          <div className="hidden lg:block absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-brand-dark to-transparent" />
        </div>
      </div>

      {/* ─── Controls (only when multiple slides) ─────────────────────── */}
      {count > 1 && (
        <>
          {/* Prev / Next arrow buttons */}
          <button
            onClick={goPrev}
            className="absolute left-3 top-1/2 -translate-y-1/2 z-10 bg-black/30 hover:bg-black/50 text-white rounded-full p-2 transition-colors duration-150"
            aria-label="Previous featured article"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            onClick={goNext}
            className="absolute right-3 top-1/2 -translate-y-1/2 z-10 bg-black/30 hover:bg-black/50 text-white rounded-full p-2 transition-colors duration-150"
            aria-label="Next featured article"
          >
            <ChevronRight size={18} />
          </button>

          {/* Dot navigation */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 z-10">
            {articles.map((a, i) => (
              <button
                key={a._id}
                onClick={() => { goTo(i); }}
                aria-label={`Go to slide ${i + 1}`}
                aria-current={i === current ? 'true' : undefined}
                className={`rounded-full transition-all duration-300 ${
                  i === current
                    ? 'bg-white w-6 h-2'
                    : 'bg-white/40 hover:bg-white/70 w-2 h-2'
                }`}
              />
            ))}
          </div>

          {/* Progress bar */}
          {!isPaused && (
            <div className="absolute bottom-0 left-0 h-0.5 bg-brand-primary/60 animate-featured-progress" style={{ animationDuration: `${AUTO_ADVANCE_MS}ms` }} />
          )}
        </>
      )}
    </div>
  );
};
