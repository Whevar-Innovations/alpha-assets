import React, { useState, useCallback, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, Play } from 'lucide-react';
import type { VideoFeatureItem } from '../../types';
import { resolveImage } from '../../sanity/lib/image';

interface VideoFeatureSectionProps {
  items: VideoFeatureItem[];
}

// ── YouTube helpers ────────────────────────────────────────────────────────────
function extractYouTubeId(url: string): string | null {
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([A-Za-z0-9_-]{11})/,
  ];
  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match) return match[1];
  }
  return null;
}

function getYouTubeThumbnail(videoId: string): string {
  return `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
}

// ── Single slide ──────────────────────────────────────────────────────────────
interface SlideProps {
  item: VideoFeatureItem;
}

const VideoSlide: React.FC<SlideProps> = ({ item }) => {
  const [playing, setPlaying] = useState(false);
  const videoId = extractYouTubeId(item.youtubeUrl);
  const customThumb = resolveImage(item.thumbnail);
  const thumbUrl = customThumb || (videoId ? getYouTubeThumbnail(videoId) : '');
  const speakerPhotoUrl = resolveImage(item.speakerPhoto);

  const handlePlay = () => {
    if (videoId) setPlaying(true);
  };

  return (
    <div className="flex flex-col lg:flex-row w-full">

      {/* ── Left: Video panel ──────────────────────────────────────────── */}
      <div className="relative w-full lg:w-1/2 aspect-video lg:aspect-auto lg:min-h-[480px] bg-brand-dark overflow-hidden flex-shrink-0">
        {!playing ? (
          <>
            {/* Thumbnail */}
            {thumbUrl && (
              <img
                src={thumbUrl}
                alt={item.speakerName ? `${item.speakerName} video` : 'Video thumbnail'}
                className="absolute inset-0 w-full h-full object-cover"
              />
            )}
            {/* Dark overlay */}
            <div className="absolute inset-0 bg-brand-dark/50" />

            {/* Play button + label */}
            <button
              onClick={handlePlay}
              className="absolute inset-0 flex flex-col items-center justify-center gap-2.5 sm:gap-3 group focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-green"
              aria-label="Play video"
            >
              <span className="flex items-center justify-center w-14 h-14 sm:w-18 sm:h-18 md:w-20 md:h-20 rounded-full border-2 border-white bg-white/10 backdrop-blur-sm group-hover:bg-white/25 group-hover:scale-105 transition-all duration-200 shadow-lg">
                <Play
                  size={24}
                  className="text-white fill-white translate-x-0.5 sm:w-7 sm:h-7"
                />
              </span>
              <span className="text-white text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.2em]">
                {item.watchLabel ?? 'Watch Video'}
              </span>
            </button>
          </>
        ) : (
          /* Embedded iframe */
          <iframe
            className="absolute inset-0 w-full h-full"
            src={`https://www.youtube.com/embed/${videoId ?? ''}?autoplay=1&rel=0`}
            title={item.speakerName ?? 'Video'}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        )}
      </div>

      {/* ── Right: Quote panel ────────────────────────────────────────── */}
      <div className="w-full lg:w-1/2 bg-brand-dark flex flex-col justify-center px-6 sm:px-10 lg:px-14 py-8 sm:py-12 lg:py-16">

        {/* Speaker avatar */}
        {speakerPhotoUrl && (
          <div className="mb-4 sm:mb-6 lg:mb-8">
            <img
              src={speakerPhotoUrl}
              alt={item.speakerName ?? 'Speaker'}
              className="w-16 h-16 sm:w-22 sm:h-22 md:w-26 md:h-26 rounded-full object-cover border-2 sm:border-3 border-brand-green/50 shadow-md"
            />
          </div>
        )}

        {/* Quote text */}
        {item.quoteText && (
          <blockquote className="text-white text-lg sm:text-2xl md:text-3xl lg:text-[32px] font-light leading-snug sm:leading-relaxed mb-6 sm:mb-8 lg:mb-10 relative">
            <span className="text-brand-green text-3xl sm:text-5xl lg:text-6xl font-serif leading-none absolute -top-2 sm:-top-3 -left-1 sm:-left-2 select-none opacity-90">
              "
            </span>
            <span className="pl-4 sm:pl-6 lg:pl-7 block">{item.quoteText}"</span>
          </blockquote>
        )}

        {/* Speaker name + title */}
        {(item.speakerName ?? item.speakerTitle) && (
          <div className="border-t border-white/15 pt-4 sm:pt-5 lg:pt-6">
            {item.speakerName && (
              <p className="text-brand-green text-xs sm:text-sm font-extrabold uppercase tracking-[0.2em]">
                {item.speakerName}
              </p>
            )}
            {item.speakerTitle && (
              <p className="text-white/60 text-[10px] sm:text-xs font-medium uppercase tracking-widest mt-0.5 sm:mt-1">
                {item.speakerTitle}
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

// ── Main section ──────────────────────────────────────────────────────────────
export const VideoFeatureSection: React.FC<VideoFeatureSectionProps> = ({ items }) => {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const count = items.length;
  const isCarousel = count > 1;
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const goTo = useCallback((index: number) => {
    setCurrent((index + count) % count);
  }, [count]);

  const goNext = useCallback(() => { goTo(current + 1); }, [current, goTo]);
  const goPrev = useCallback(() => { goTo(current - 1); }, [current, goTo]);

  // Auto-advance only for carousel
  useEffect(() => {
    if (!isCarousel || isPaused) return;
    intervalRef.current = setInterval(goNext, 7000);
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [isCarousel, isPaused, goNext]);

  if (count === 0) return null;

  return (
    <div
      className="relative w-full overflow-hidden"
      onMouseEnter={() => { setIsPaused(true); }}
      onMouseLeave={() => { setIsPaused(false); }}
      aria-label="Video features"
      role="region"
    >
      {/* Slide */}
      <VideoSlide item={items[current]} />

      {/* Carousel controls */}
      {isCarousel && (
        <>
          {/* Prev arrow */}
          <button
            onClick={goPrev}
            className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-20 bg-black/40 sm:bg-white/10 hover:bg-black/60 sm:hover:bg-white/25 text-white rounded-full p-2 sm:p-2.5 backdrop-blur-sm transition-colors duration-150"
            aria-label="Previous video"
          >
            <ChevronLeft size={18} className="sm:w-5 sm:h-5" />
          </button>

          {/* Next arrow */}
          <button
            onClick={goNext}
            className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-20 bg-black/40 sm:bg-white/10 hover:bg-black/60 sm:hover:bg-white/25 text-white rounded-full p-2 sm:p-2.5 backdrop-blur-sm transition-colors duration-150"
            aria-label="Next video"
          >
            <ChevronRight size={18} className="sm:w-5 sm:h-5" />
          </button>

          {/* Dot indicators — bottom centered across panel on mobile, right panel on desktop */}
          <div className="absolute bottom-3 sm:bottom-5 inset-x-0 lg:left-auto lg:right-0 lg:w-1/2 flex justify-center gap-2 z-20">
            {items.map((_, i) => (
              <button
                key={i}
                onClick={() => { goTo(i); }}
                aria-label={`Go to video ${i + 1}`}
                aria-current={i === current ? 'true' : undefined}
                className={`rounded-full transition-all duration-300 ${
                  i === current
                    ? 'bg-brand-green w-5 sm:w-6 h-1.5 sm:h-2'
                    : 'bg-white/30 hover:bg-white/60 w-1.5 sm:w-2 h-1.5 sm:h-2'
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};
