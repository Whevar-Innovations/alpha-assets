import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Loader2, CheckCircle, AlertCircle } from 'lucide-react';
import logoWhite from '../../assets/logos/white.png';

import { useSanityPage } from '../../sanity/hooks/useSanityPage';
import { SITE_SETTINGS_QUERY } from '../../sanity/lib/queries';
import { siteSettingsDefaults } from '../../sanity/defaults/siteSettings';
import { resolveImage } from '../../sanity/lib/image';
import { submitFormData } from '../../utils/formSubmission';
import type { FooterLink } from '../../types';

export const Footer: React.FC = () => {
  const { data } = useSanityPage(SITE_SETTINGS_QUERY, siteSettingsDefaults);
  const [email, setEmail] = useState('');
  const [honey, setHoney] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const contactInfo = data.contactInfo ?? siteSettingsDefaults.contactInfo;
  const targetEmail = contactInfo?.email ?? 'invest@alphaeastafrica.com';

  const handleSubscribe = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email.trim()) return;

    setIsSubmitting(true);
    setErrorMessage(null);

    const result = await submitFormData(targetEmail, {
      email: email.trim(),
      source: 'Website Footer Newsletter',
      _honey: honey,
      _subject: `New Newsletter Subscription: ${email.trim()}`,
    });

    if (result.success) {
      setIsSuccess(true);
      setEmail('');
    } else {
      setErrorMessage(result.message ?? 'Subscription failed. Please try again.');
    }
    setIsSubmitting(false);
  };

  const logoUrl = resolveImage(data.whiteLogo, logoWhite);
  const socialLinks = data.socialLinks?.length ? data.socialLinks : siteSettingsDefaults.socialLinks;

  return (
    <footer className="bg-gradient-to-br from-[#002e2e] to-[#005b5c] text-white pt-16 pb-12 print:hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-24">
          
          <div className="flex flex-col justify-between space-y-12">
            
            <div>
              <Link to="/">
                <img 
                  src={logoUrl} 
                  alt={data.whiteLogo?.alt ?? "Alpha Asset Managers White Logo"} 
                  className="h-16 lg:h-20 w-auto object-contain"
                />
              </Link>
            </div>

            <div className="space-y-4 max-w-md">
              <h3 className="text-sm font-semibold tracking-wider text-white">
                Subscribe to our newsletter
              </h3>

              {isSuccess ? (
                <div className="flex items-center gap-2 p-3 bg-white/10 border border-brand-green/50 rounded-lg text-brand-green text-sm">
                  <CheckCircle className="w-5 h-5 flex-shrink-0" />
                  <div className="flex-1">
                    <p className="font-medium">Thank you for subscribing!</p>
                    <p className="text-xs text-white/80">You will receive market updates and insights.</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => { setIsSuccess(false); }}
                    className="text-xs text-white/70 hover:text-white underline ml-2"
                  >
                    Reset
                  </button>
                </div>
              ) : (
                <form onSubmit={(e) => { void handleSubscribe(e); }} className="space-y-2">
                  <div className="hidden" aria-hidden="true">
                    <input
                      type="text"
                      name="_honey"
                      value={honey}
                      onChange={(e) => { setHoney(e.target.value); }}
                      tabIndex={-1}
                      autoComplete="off"
                    />
                  </div>

                  <div className="flex gap-3">
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        if (errorMessage) setErrorMessage(null);
                      }}
                      placeholder="Enter your email"
                      disabled={isSubmitting}
                      className="flex-grow px-4 py-2.5 text-sm bg-transparent border border-green-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-brand-green text-white placeholder-teal-100/70 disabled:opacity-50"
                    />
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="bg-brand-green hover:bg-opacity-95 text-brand-dark font-semibold text-sm px-6 py-2.5 rounded-lg transition-all duration-150 whitespace-nowrap shadow-sm flex items-center justify-center min-w-[90px] disabled:opacity-75 cursor-pointer"
                    >
                      {isSubmitting ? (
                        <Loader2 className="w-4 h-4 animate-spin text-brand-dark" />
                      ) : (
                        'Send'
                      )}
                    </button>
                  </div>

                  {errorMessage && (
                    <div className="flex items-center gap-1.5 text-xs text-red-300 mt-1">
                      <AlertCircle className="w-4 h-4 flex-shrink-0" />
                      <span>{errorMessage}</span>
                    </div>
                  )}
                </form>
              )}

              <div className="flex space-x-3 pt-4">
                {socialLinks?.filter((s) => s.isVisible !== false).map((social, idx: number) => {
                  const SOCIAL_ICONS: Record<string, string> = {
                    Facebook: "M9 8H7v3h2v9h4v-9h3.6l.4-3H13V6c0-.5.5-1 1-1h3V1H13c-3.3 0-5 1.7-5 5v2z",
                    X: "M18.2 2.4h3.3L14.3 11l8.5 11.3H16.2L11 15.6 5 22.4H1.7l7.6-8.7L1.2 2.4h6.8l4.7 6.2 5.5-6.2zm-1.2 17.6h1.8L7.1 4.2H5.1l11.9 15.8z",
                    LinkedIn: "M19 0h-14c-2.8 0-5 2.2-5 5v14c0 2.8 2.2 5 5 5h14c2.8 0 5-2.2 5-5v-14c0-2.8-2.2-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.3c-.9 0-1.7-.8-1.7-1.7s.8-1.7 1.7-1.7 1.7.8 1.7 1.7-.8 1.7-1.7 1.7zm13.5 12.3h-3v-5.6c0-3.4-4-3.1-4 0v5.6h-3v-11h3v1.8c1.4-2.6 7-2.8 7 2.5v6.7z",
                    Instagram: "M12 2.16c3.2 0 3.58.01 4.85.07 3.25.15 4.77 1.69 4.92 4.92.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.15 3.23-1.66 4.77-4.92 4.92-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-3.26-.15-4.77-1.7-4.92-4.92-.06-1.27-.07-1.65-.07-4.85s.01-3.58.07-4.85c.15-3.23 1.66-4.77 4.92-4.92 1.27-.06 1.65-.07 4.85-.07M12 0C8.74 0 8.33.01 7.05.07 2.69.27.27 2.69.07 7.05.01 8.33 0 8.74 0 12s.01 3.67.07 4.95c.2 4.36 2.62 6.78 6.98 6.98 1.28.06 1.69.07 4.95.07s3.67-.01 4.95-.07c4.36-.2 6.78-2.62 6.98-6.98.06-1.28.07-1.69.07-4.95s-.01-3.67-.07-4.95c-.2-4.36-2.62-6.78-6.98-6.98C15.67.01 15.26 0 12 0zm0 5.83a6.17 6.17 0 100 12.34 6.17 6.17 0 000-12.34zM12 16a4 4 0 110-8 4 4 0 010 8zm3.96-10.15a1.44 1.44 0 100-2.88 1.44 1.44 0 000 2.88z",
                    YouTube: "M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z",
                    TikTok: "M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.24 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z",
                  };
                  const iconPath = SOCIAL_ICONS[social.platform];
                  if (!iconPath) return null;
                  
                  return (
                    <a 
                      key={idx}
                      href={social.url} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="w-9 h-9 flex items-center justify-center bg-brand-primary rounded-full hover:bg-brand-green hover:text-brand-dark text-white transition-all duration-150"
                      aria-label={social.platform}
                    >
                      <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d={iconPath} />
                      </svg>
                    </a>
                  );
                })}
              </div>
            </div>

            <div className="pt-4 text-sm text-teal-200 hidden md:block font-normal">
              <p>
                <span className="font-semibold">{data.regulatoryText ?? siteSettingsDefaults.regulatoryText}</span> | {data.copyrightText ?? siteSettingsDefaults.copyrightText}
              </p>
            </div>

          </div>

          <div className="flex flex-col justify-between space-y-12 lg:space-y-16">
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 lg:gap-16">
              
              {data.footerContent && data.footerContent.length > 0 ? (
                data.footerContent.map((column: { title: string; links?: FooterLink[] }, idx: number) => (
                  <div key={idx} className="space-y-4">
                    <h3 className="text-base font-semibold text-white">{column.title}</h3>
                    <ul className="space-y-2.5 text-sm text-brand-grey-400 font-light">
                      {column.links?.map((link, linkIdx) => {
                        let href = '#';
                        if (link.linkType === 'custom' && link.customPath) {
                          href = link.customPath.startsWith('/') ? link.customPath : `/${link.customPath}`;
                        } else if (link.linkType === 'external' && link.externalUrl) {
                          href = link.externalUrl;
                        } else if (link.linkType === 'internal' && link.internalLink) {
                          const internal = link.internalLink;
                          if (internal.slug) href = `/${internal.slug}`;
                          else if (internal.policyType) href = `/legal/${internal.policyType}`;
                          else if (internal._type === 'homePage') href = '/';
                          else if (internal._type === 'aboutPage') href = '/about';
                          else if (internal._type === 'investPage') href = '/invest';
                          else if (internal._type === 'newsPage') href = '/news';
                          else if (internal._type === 'contactPage') href = '/contact';
                          else if (internal._type === 'careersPage') href = '/careers';
                        } else if (link.label.toLowerCase() === 'careers') {
                          href = '/careers';
                        }
                        
                        const isExternal = link.linkType === 'external';
                        const isDisabled = link.linkType === 'none';
                        
                        return (
                          <li key={linkIdx}>
                            {isDisabled ? (
                              <span 
                                className="opacity-60 cursor-not-allowed block" 
                                title="Coming Soon"
                              >
                                {link.label}
                              </span>
                            ) : isExternal ? (
                              <a 
                                href={href} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="hover:text-white transition-colors duration-150 block"
                              >
                                {link.label}
                              </a>
                            ) : (
                              <Link 
                                to={href} 
                                className="hover:text-white transition-colors duration-150 block"
                              >
                                {link.label}
                              </Link>
                            )}
                          </li>
                        );
                      })}
                      {column.title === 'Resources' && (
                        <li className="mt-2.5">
                          <a href="/studio" className="opacity-40 hover:opacity-100 hover:text-white transition-all duration-150 block">Studio</a>
                        </li>
                      )}
                    </ul>
                  </div>
                ))
              ) : (
                <>
                  <div className="space-y-4">
                    <h3 className="text-base font-semibold text-white">Helpful Links</h3>
                    <ul className="space-y-2.5 text-sm text-brand-gray-text font-light">
                      <li><Link to="/legal/privacy-policy" className="hover:text-white transition-colors duration-150">Privacy Policy</Link></li>
                      <li><Link to="/legal/terms-of-use" className="hover:text-white transition-colors duration-150">Terms of Use</Link></li>
                      <li><Link to="/legal/cookie-policy" className="hover:text-white transition-colors duration-150">Cookie Policy</Link></li>
                      <li><Link to="/careers" className="hover:text-white transition-colors duration-150">Careers</Link></li>
                    </ul>
                  </div>
                  <div className="space-y-4">
                    <h3 className="text-base font-semibold text-white">Resources</h3>
                    <ul className="space-y-2.5 text-sm text-brand-gray-text font-light">
                      <li><span className="opacity-60 cursor-not-allowed" title="Coming Soon">Finance knowledge</span></li>
                      <li><span className="opacity-60 cursor-not-allowed" title="Coming Soon">Market research</span></li>
                      <li><span className="opacity-60 cursor-not-allowed" title="Coming Soon">Steps for 2026</span></li>
                      <li><span className="opacity-60 cursor-not-allowed" title="Coming Soon">Risk advisory</span></li>
                      <li><a href="/studio" className="opacity-40 hover:opacity-100 hover:text-white transition-all duration-150">Studio</a></li>
                    </ul>
                  </div>
                  <div className="space-y-4">
                    <h3 className="text-base font-semibold text-white">Company</h3>
                    <ul className="space-y-2.5 text-sm text-brand-gray-text font-light">
                      <li><Link to="/about" className="hover:text-white transition-colors duration-150">Investment Philosophy</Link></li>
                      <li><Link to="/about" className="hover:text-white transition-colors duration-150">Our People</Link></li>
                      <li><Link to="/about" className="hover:text-white transition-colors duration-150">Corporate Governance</Link></li>
                      <li><Link to="/about" className="hover:text-white transition-colors duration-150">Macro Insights</Link></li>
                    </ul>
                  </div>
                </>
              )}

              <div className="text-brand-gray-text text-sm font-light leading-loose">
                <p className="whitespace-pre-line">
                  {contactInfo?.address}<br /><br />
                  {contactInfo?.phone && <a href={`tel:${contactInfo.phone.replace(/[^0-9+]/g, '')}`} className="hover:text-white transition-colors block">{contactInfo.phone}</a>}
                  {contactInfo?.email && <a href={`mailto:${contactInfo.email}`} className="hover:text-white transition-colors block">{contactInfo.email}</a>}
                </p>
              </div>
            </div>

            <div className="pt-4 text-sm text-teal-200 text-left md:hidden font-normal">
              <p>
                <span className="font-semibold">{data.regulatoryText ?? siteSettingsDefaults.regulatoryText}</span> | {data.copyrightText ?? siteSettingsDefaults.copyrightText}
              </p>
            </div>

          </div>
        </div>
      </div>
    </footer>
  );
};
