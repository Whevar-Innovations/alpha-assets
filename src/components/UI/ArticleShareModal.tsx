import React, { useState, useEffect } from 'react';
import { X, Copy, Check, Share2, Mail } from 'lucide-react';
import { SanityImage } from './SanityImage';
import bannerBg from '../../assets/images/banner_bg.jpg';
import {
  getLinkedInShareUrl,
  getWhatsAppShareUrl,
  getXShareUrl,
  getFacebookShareUrl,
  getEmailShareUrl,
  copyToClipboard,
  canUseNativeShare,
  triggerNativeShare,
} from '../../utils/socialShare';
import type { ArticleItem } from '../../types';

export interface ArticleShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  article: Partial<ArticleItem> | null;
}

export const ArticleShareModal: React.FC<ArticleShareModalProps> = ({
  isOpen,
  onClose,
  article,
}) => {
  const [copied, setCopied] = useState(false);
  const isNativeShareAvailable = canUseNativeShare();

  // Close on Escape key press and lock background scroll
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !article) return null;

  const origin = typeof window !== 'undefined' ? window.location.origin : '';
  const articleUrl = `${origin}/news/${article.slug?.current ?? ''}`;
  const articleTitle = article.title ?? 'Alpha Asset Management Article';
  const articleExcerpt = article.excerpt;

  const handleCopyLink = async () => {
    const success = await copyToClipboard(articleUrl);
    if (success) {
      setCopied(true);
      setTimeout(() => {
        setCopied(false);
      }, 2500);
    }
  };

  const handleNativeShare = async () => {
    await triggerNativeShare({
      url: articleUrl,
      title: articleTitle,
      excerpt: articleExcerpt,
    });
  };

  const openShareWindow = (shareUrl: string) => {
    window.open(shareUrl, '_blank', 'noopener,noreferrer,width=600,height=500');
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="article-share-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-brand-dark/80 backdrop-blur-sm animate-fade-in print:hidden"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl p-6 sm:p-8 text-brand-dark animate-modal-in border border-gray-100"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-brand-dark/50 hover:text-brand-dark hover:bg-gray-100 transition-colors"
          aria-label="Close share dialog"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="space-y-1 mb-5">
          <div className="w-10 h-10 rounded-full bg-brand-cardBg flex items-center justify-center text-brand-primary mb-2">
            <Share2 className="w-5 h-5" />
          </div>
          <h3 id="article-share-title" className="text-xl sm:text-2xl font-light text-brand-dark">
            Share this Article
          </h3>
          <p className="text-xs sm:text-sm text-brand-gray/80 font-light">
            Spread the insights across your professional networks and channels.
          </p>
        </div>

        {/* Article Preview Box */}
        <div className="bg-brand-cardBg rounded-2xl p-3.5 sm:p-4 mb-6 border border-brand-primary/20 flex gap-3.5 items-center">
          <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl overflow-hidden bg-brand-dark shrink-0">
            {article.coverImage ? (
              <SanityImage
                image={article.coverImage}
                fallback={bannerBg}
                sizes="64px"
                alt={article.title ?? 'Article thumbnail'}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-brand-dark to-brand-primary opacity-80" />
            )}
          </div>
          <div className="min-w-0 flex-1">
            {article.category && (
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-brand-primary block mb-0.5">
                {article.category}
              </span>
            )}
            <h4 className="text-xs sm:text-sm font-bold text-brand-dark line-clamp-2 leading-snug">
              {article.title}
            </h4>
          </div>
        </div>

        {/* Direct Social Grid */}
        <div className="space-y-2 mb-6">
          <label className="block text-[11px] font-bold uppercase tracking-wider text-brand-gray">
            Share directly to
          </label>
          <div className="grid grid-cols-5 gap-2.5">
            {/* LinkedIn */}
            <button
              type="button"
              onClick={() => {
                openShareWindow(getLinkedInShareUrl(articleUrl, articleTitle));
              }}
              className="flex flex-col items-center justify-center gap-1.5 p-2.5 rounded-xl border border-gray-150 hover:border-[#0077b5] hover:bg-[#0077b5]/5 text-gray-700 hover:text-[#0077b5] transition-all group"
              aria-label="Share on LinkedIn"
            >
              <svg className="w-5 h-5 fill-[#0077b5] group-hover:scale-110 transition-transform" viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
              </svg>
              <span className="text-[10px] font-semibold text-brand-dark">LinkedIn</span>
            </button>

            {/* WhatsApp */}
            <button
              type="button"
              onClick={() => {
                openShareWindow(getWhatsAppShareUrl(articleUrl, articleTitle));
              }}
              className="flex flex-col items-center justify-center gap-1.5 p-2.5 rounded-xl border border-gray-150 hover:border-[#25D366] hover:bg-[#25D366]/5 text-gray-700 hover:text-[#25D366] transition-all group"
              aria-label="Share on WhatsApp"
            >
              <svg className="w-5 h-5 fill-[#25D366] group-hover:scale-110 transition-transform" viewBox="0 0 24 24">
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
              </svg>
              <span className="text-[10px] font-semibold text-brand-dark">WhatsApp</span>
            </button>

            {/* X */}
            <button
              type="button"
              onClick={() => {
                openShareWindow(getXShareUrl(articleUrl, articleTitle));
              }}
              className="flex flex-col items-center justify-center gap-1.5 p-2.5 rounded-xl border border-gray-150 hover:border-black hover:bg-black/5 text-gray-700 hover:text-black transition-all group"
              aria-label="Share on X"
            >
              <svg className="w-4 h-4 fill-black group-hover:scale-110 transition-transform my-0.5" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
              <span className="text-[10px] font-semibold text-brand-dark">X</span>
            </button>

            {/* Facebook */}
            <button
              type="button"
              onClick={() => {
                openShareWindow(getFacebookShareUrl(articleUrl));
              }}
              className="flex flex-col items-center justify-center gap-1.5 p-2.5 rounded-xl border border-gray-150 hover:border-[#1877F2] hover:bg-[#1877F2]/5 text-gray-700 hover:text-[#1877F2] transition-all group"
              aria-label="Share on Facebook"
            >
              <svg className="w-5 h-5 fill-[#1877F2] group-hover:scale-110 transition-transform" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
              <span className="text-[10px] font-semibold text-brand-dark">Facebook</span>
            </button>

            {/* Email */}
            <a
              href={getEmailShareUrl(articleUrl, articleTitle, articleExcerpt)}
              className="flex flex-col items-center justify-center gap-1.5 p-2.5 rounded-xl border border-gray-150 hover:border-brand-primary hover:bg-teal-50/50 text-gray-700 hover:text-brand-primary transition-all group"
              aria-label="Share via Email"
            >
              <Mail className="w-5 h-5 text-brand-primary group-hover:scale-110 transition-transform" />
              <span className="text-[10px] font-semibold text-brand-dark">Email</span>
            </a>
          </div>
        </div>

        {/* Copy Link Input Section */}
        <div className="space-y-2">
          <label htmlFor="article-share-link" className="block text-[11px] font-bold uppercase tracking-wider text-brand-gray">
            Copy Page Link
          </label>
          <div className="flex items-center gap-2">
            <input
              id="article-share-link"
              type="text"
              readOnly
              value={articleUrl}
              className="w-full px-3 py-2 text-xs bg-gray-50 rounded-xl border border-gray-200 text-gray-600 focus:outline-none select-all"
            />
            <button
              type="button"
              onClick={() => {
                void handleCopyLink();
              }}
              className="px-4 py-2 rounded-xl bg-brand-primary text-white text-xs font-semibold hover:bg-brand-dark transition-colors flex items-center gap-1.5 shrink-0"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-brand-green" />
                  <span>Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Native Web Share option if supported */}
        {isNativeShareAvailable && (
          <div className="pt-5 border-t border-gray-100 mt-6">
            <button
              type="button"
              onClick={() => {
                void handleNativeShare();
              }}
              className="w-full py-2.5 px-4 rounded-xl border border-gray-200 bg-gray-50 hover:bg-gray-100 text-xs font-semibold text-brand-dark transition-colors flex items-center justify-center gap-2"
            >
              <Share2 className="w-4 h-4 text-brand-primary" />
              <span>Share via device options</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
