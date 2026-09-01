import React, { useState, useEffect, useCallback, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from './Button';
import type { HeroSlide, CTAButton } from '../../types';
import { resolveImage } from '../../sanity/lib/image';
import { formatCMSLines } from '../../utils/formatText';
import heroMan from '../../assets/images/hero_man.jpg';

interface HeroCarouselProps {
  slides: HeroSlide[];
  onNavigate: (url: string, linkType: string) => void;
}

const AUTO_ADVANCE_MS = 5500;

export const HeroCarousel: React.FC<HeroCarouselProps> = ({ slides, onNavigate }) => {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const count = slides.length;

  const goTo = useCallback((index: number) => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrent((index + count) % count);
    setTimeout(() => { setIsAnimating(false); }, 600);
  }, [count, isAnimating]);

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

  const slide = slides[current];
  const bgImgUrl = resolveImage(slide.backgroundImage, heroMan);

  return (
    <div
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-4 sm:mt-8 w-full"
      role="region"
      aria-label="Hero carousel"
      onMouseEnter={() => { setIsPaused(true); }}
      onMouseLeave={() => { setIsPaused(false); }}
    >
      <section
        className="relative min-h-[500px] md:min-h-[640px] flex items-center bg-brand-dark overflow-hidden rounded-2xl md:rounded-[32px] shadow-sm"
        style={{
          backgroundImage: `linear-gradient(to right, rgba(0, 46, 46, 0.95) 0%, rgba(0, 46, 46, 0.85) 45%, rgba(0, 46, 46, 0.3) 100%), url(${bgImgUrl})`,
          backgroundSize: 'cover',
          backgroundPosition: 'right center',
          transition: 'background-image 0.6s ease-in-out',
        }}
      >
        {/* ── Slide Content ───────────────────────────────────── */}
        <div className="px-6 sm:px-12 lg:px-16 py-20 relative z-10 w-full">
          <div className="max-w-2xl text-white space-y-8">
            <h1
              key={`heading-${current}`}
              className="text-4xl sm:text-5xl lg:text-6xl font-light leading-tight sm:leading-none animate-hero-fade-up"
            >
              {slide.heading} <br />
              {slide.highlightText && (
                <span className="font-extrabold text-brand-green">
                  {slide.highlightText}
                </span>
              )}
            </h1>

            {slide.subtext && (
              <p
                key={`sub-${current}`}
                className="text-base sm:text-lg text-teal-50 leading-relaxed font-light whitespace-pre-line animate-hero-fade-up"
                style={{ animationDelay: '80ms' }}
              >
                {formatCMSLines(slide.subtext)}
              </p>
            )}

            {slide.ctaButtons && slide.ctaButtons.length > 0 && (
              <div
                key={`cta-${current}`}
                className="flex flex-col sm:flex-row gap-4 pt-4 animate-hero-fade-up"
                style={{ animationDelay: '160ms' }}
              >
                {slide.ctaButtons
                  .filter((btn: CTAButton) => btn.isVisible)
                  .map((btn: CTAButton, idx: number) => (
                    <Button
                      key={idx}
                      variant={btn.variant}
                      size="lg"
                      onClick={() => { onNavigate(btn.url, btn.linkType); }}
                    >
                      {btn.label}
                    </Button>
                  ))}
              </div>
            )}
          </div>
        </div>

        {/* ── Controls (only when multiple slides) ────────────── */}
        {count > 1 && (
          <>
            {/* Prev / Next arrows */}
            <button
              onClick={goPrev}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-black/20 hover:bg-black/40 text-white rounded-full p-2.5 transition-colors duration-150 backdrop-blur-sm"
              aria-label="Previous slide"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={goNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-black/20 hover:bg-black/40 text-white rounded-full p-2.5 transition-colors duration-150 backdrop-blur-sm"
              aria-label="Next slide"
            >
              <ChevronRight size={20} />
            </button>

            {/* Dot indicators */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2.5 z-20">
              {slides.map((_, i) => (
                <button
                  key={i}
                  onClick={() => { goTo(i); }}
                  aria-label={`Go to slide ${i + 1}`}
                  aria-current={i === current ? 'true' : undefined}
                  className={`rounded-full transition-all duration-300 ${
                    i === current
                      ? 'bg-brand-green w-7 h-2.5'
                      : 'bg-white/40 hover:bg-white/70 w-2.5 h-2.5'
                  }`}
                />
              ))}
            </div>

            {/* Progress bar */}
            {!isPaused && (
              <div
                key={`progress-${current}`}
                className="absolute bottom-0 left-0 h-0.5 bg-brand-green/70 animate-hero-progress rounded-full"
                style={{ animationDuration: `${AUTO_ADVANCE_MS}ms` }}
              />
            )}
          </>
        )}
      </section>
    </div>
  );
};
