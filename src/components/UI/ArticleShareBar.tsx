import React, { useState } from 'react';
import { Mail, Link2, Check, Share2 } from 'lucide-react';
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

export interface ArticleShareBarProps {
  url: string;
  title: string;
  excerpt?: string;
}

export const ArticleShareBar: React.FC<ArticleShareBarProps> = ({ url, title, excerpt }) => {
  const [copied, setCopied] = useState(false);
  const isNativeShareAvailable = canUseNativeShare();

  const handleCopy = async () => {
    const success = await copyToClipboard(url);
    if (success) {
      setCopied(true);
      setTimeout(() => {
        setCopied(false);
      }, 2500);
    }
  };

  const handleNativeShare = async () => {
    await triggerNativeShare({ url, title, excerpt });
  };

  const openShareWindow = (shareUrl: string) => {
    window.open(shareUrl, '_blank', 'noopener,noreferrer,width=600,height=500');
  };

  return (
    <>
      {/* ── Desktop Floating Vertical Rail ────────────────────────────────── */}
      <aside
        aria-label="Share article on social media"
        className="hidden lg:flex fixed left-4 xl:left-8 top-1/2 -translate-y-1/2 z-40 flex-col items-center gap-2 bg-white/95 backdrop-blur-md border border-gray-200/90 shadow-xl rounded-2xl p-2.5 transition-all duration-300 print:hidden"
      >
        <span className="text-[10px] font-bold uppercase tracking-wider text-brand-gray m-1 flex items-center gap-1">
          <Share2 className="w-3 h-3 text-brand-primary" />
        </span>

        {/* LinkedIn */}
        <button
          type="button"
          onClick={() => {
            openShareWindow(getLinkedInShareUrl(url, title));
          }}
          className="group relative w-9 h-9 rounded-xl flex items-center justify-center text-gray-600 hover:text-white hover:bg-[#0077b5] transition-all duration-200"
          aria-label="Share on LinkedIn"
          title="Share on LinkedIn"
        >
          <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
          </svg>
          <span className="sr-only">Share on LinkedIn</span>
        </button>

        {/* WhatsApp */}
        <button
          type="button"
          onClick={() => {
            openShareWindow(getWhatsAppShareUrl(url, title));
          }}
          className="group relative w-9 h-9 rounded-xl flex items-center justify-center text-gray-600 hover:text-white hover:bg-[#25D366] transition-all duration-200"
          aria-label="Share on WhatsApp"
          title="Share on WhatsApp"
        >
          <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
          </svg>
          <span className="sr-only">Share on WhatsApp</span>
        </button>

        {/* X (Twitter) */}
        <button
          type="button"
          onClick={() => {
            openShareWindow(getXShareUrl(url, title));
          }}
          className="group relative w-9 h-9 rounded-xl flex items-center justify-center text-gray-600 hover:text-white hover:bg-black transition-all duration-200"
          aria-label="Share on X"
          title="Share on X"
        >
          <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
          </svg>
          <span className="sr-only">Share on X</span>
        </button>

        {/* Facebook */}
        <button
          type="button"
          onClick={() => {
            openShareWindow(getFacebookShareUrl(url));
          }}
          className="group relative w-9 h-9 rounded-xl flex items-center justify-center text-gray-600 hover:text-white hover:bg-[#1877F2] transition-all duration-200"
          aria-label="Share on Facebook"
          title="Share on Facebook"
        >
          <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
          </svg>
          <span className="sr-only">Share on Facebook</span>
        </button>

        {/* Email */}
        <a
          href={getEmailShareUrl(url, title, excerpt)}
          className="group relative w-9 h-9 rounded-xl flex items-center justify-center text-gray-600 hover:text-white hover:bg-brand-primary transition-all duration-200"
          aria-label="Share via Email"
          title="Share via Email"
        >
          <Mail className="w-4 h-4" />
          <span className="sr-only">Share via Email</span>
        </a>

        {/* Copy Link */}
        <div className="relative">
          <button
            type="button"
            onClick={() => {
              void handleCopy();
            }}
            className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-200 ${
              copied
                ? 'bg-brand-green text-brand-dark'
                : 'text-gray-600 hover:text-white hover:bg-brand-dark'
            }`}
            aria-label={copied ? 'Link copied to clipboard' : 'Copy link to article'}
            title={copied ? 'Copied!' : 'Copy link'}
          >
            {copied ? <Check className="w-4 h-4" /> : <Link2 className="w-4 h-4" />}
            <span className="sr-only">{copied ? 'Copied' : 'Copy Link'}</span>
          </button>

          {/* Copied tooltip popover */}
          {copied && (
            <div className="absolute left-full ml-3 top-1/2 -translate-y-1/2 px-2.5 py-1 bg-brand-dark text-white text-[11px] font-semibold rounded-lg shadow-lg whitespace-nowrap animate-fade-in pointer-events-none">
              Copied!
              <div className="absolute -left-1 top-1/2 -translate-y-1/2 border-4 border-transparent border-r-brand-dark" />
            </div>
          )}
        </div>
      </aside>

      {/* ── Mobile Floating Bottom Dock ─────────────────────────────────── */}
      <aside
        aria-label="Share article on social media"
        className="flex lg:hidden fixed bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 z-40 bg-[#002828] text-white border border-teal-400/30 shadow-[0_12px_40px_rgba(0,0,0,0.55)] backdrop-blur-md rounded-full px-3.5 sm:px-4 py-2 sm:py-2.5 items-center gap-2 sm:gap-2.5 transition-all duration-300 print:hidden max-w-[94vw]"
      >
        <span className="text-[11px] font-bold uppercase tracking-wider text-brand-green pr-0.5 flex items-center gap-1 shrink-0">
          <Share2 className="w-3.5 h-3.5" />
          {copied ? <span className="text-brand-green">Copied!</span> : <span>Share</span>}
        </span>

        {/* Native Share button if supported on mobile */}
        {isNativeShareAvailable && (
          <button
            type="button"
            onClick={() => {
              void handleNativeShare();
            }}
            className="w-8 h-8 rounded-full bg-teal-800/90 hover:bg-teal-700 text-white flex items-center justify-center transition-all shrink-0 shadow-sm active:scale-95"
            aria-label="Open system share sheet"
            title="Share via device"
          >
            <Share2 className="w-3.5 h-3.5" />
          </button>
        )}

        {/* WhatsApp */}
        <button
          type="button"
          onClick={() => {
            openShareWindow(getWhatsAppShareUrl(url, title));
          }}
          className="w-8 h-8 rounded-full bg-[#25D366] hover:bg-[#20ba5a] text-white flex items-center justify-center transition-all shrink-0 shadow-sm active:scale-95"
          aria-label="Share on WhatsApp"
        >
          <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
          </svg>
        </button>

        {/* LinkedIn */}
        <button
          type="button"
          onClick={() => {
            openShareWindow(getLinkedInShareUrl(url, title));
          }}
          className="w-8 h-8 rounded-full bg-[#0077b5] hover:bg-[#006097] text-white flex items-center justify-center transition-all shrink-0 shadow-sm active:scale-95"
          aria-label="Share on LinkedIn"
        >
          <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
          </svg>
        </button>

        {/* X */}
        <button
          type="button"
          onClick={() => {
            openShareWindow(getXShareUrl(url, title));
          }}
          className="w-8 h-8 rounded-full bg-black hover:bg-gray-900 text-white border border-white/25 flex items-center justify-center transition-all shrink-0 shadow-sm active:scale-95"
          aria-label="Share on X"
        >
          <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
          </svg>
        </button>

        {/* Copy Link */}
        <button
          type="button"
          onClick={() => {
            void handleCopy();
          }}
          className={`w-8 h-8 rounded-full flex items-center justify-center transition-all shrink-0 shadow-sm active:scale-95 ${
            copied
              ? 'bg-brand-green text-brand-dark font-bold'
              : 'bg-teal-800/90 hover:bg-teal-700 text-white'
          }`}
          aria-label={copied ? 'Link copied' : 'Copy link'}
        >
          {copied ? <Check className="w-3.5 h-3.5" /> : <Link2 className="w-3.5 h-3.5" />}
        </button>
      </aside>
    </>
  );
};
