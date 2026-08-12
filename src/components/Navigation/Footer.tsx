import React from 'react';
import { Link } from 'react-router-dom';
import logoWhite from '../../assets/logos/white.png';

import { useSanityPage } from '../../sanity/hooks/useSanityPage';
import { SITE_SETTINGS_QUERY } from '../../sanity/lib/queries';
import { siteSettingsDefaults } from '../../sanity/defaults/siteSettings';
import { resolveImage } from '../../sanity/lib/image';
import { PortableText } from '../UI/PortableText';

export const Footer: React.FC = () => {
  const { data } = useSanityPage(SITE_SETTINGS_QUERY, siteSettingsDefaults);

  const handleSubscribe = (e: React.SyntheticEvent) => {
    e.preventDefault();
    alert("Thank you for subscribing to our newsletter!");
  };

  const logoUrl = resolveImage(data.whiteLogo, logoWhite);
  const socialLinks = data.socialLinks?.length ? data.socialLinks : siteSettingsDefaults.socialLinks;
  const contactInfo = data.contactInfo ?? siteSettingsDefaults.contactInfo;

  return (
    <footer className="bg-gradient-to-br from-[#002e2e] to-[#005b5c] text-white pt-16 pb-12">
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
              <form onSubmit={handleSubscribe} className="flex gap-4">
                <input
                  type="email"
                  required
                  placeholder="Email"
                  className="flex-grow px-4 py-2.5 text-sm bg-transparent border border-teal-800 rounded-lg focus:outline-none focus:ring-1 focus:ring-brand-green text-white placeholder-teal-650"
                />
                <button
                  type="submit"
                  className="bg-brand-green hover:bg-opacity-95 text-brand-dark font-semibold text-sm px-6 py-2.5 rounded-lg transition-all duration-150 whitespace-nowrap shadow-sm"
                >
                  Send
                </button>
              </form>

              <div className="flex space-x-3 pt-4">
                {socialLinks?.filter((s: { isVisible?: boolean }) => s.isVisible !== false).map((social: { platform: string; url: string; isVisible?: boolean }, idx: number) => {
                  let iconPath = '';
                  if (social.platform === 'Facebook') iconPath = "M9 8H7v3h2v9h4v-9h3.6l.4-3H13V6c0-.5.5-1 1-1h3V1H13c-3.3 0-5 1.7-5 5v2z";
                  else if (social.platform === 'X') iconPath = "M18.2 2.4h3.3L14.3 11l8.5 11.3H16.2L11 15.6 5 22.4H1.7l7.6-8.7L1.2 2.4h6.8l4.7 6.2 5.5-6.2zm-1.2 17.6h1.8L7.1 4.2H5.1l11.9 15.8z";
                  else if (social.platform === 'LinkedIn') iconPath = "M19 0h-14c-2.8 0-5 2.2-5 5v14c0 2.8 2.2 5 5 5h14c2.8 0 5-2.2 5-5v-14c0-2.8-2.2-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.3c-.9 0-1.7-.8-1.7-1.7s.8-1.7 1.7-1.7 1.7.8 1.7 1.7-.8 1.7-1.7 1.7zm13.5 12.3h-3v-5.6c0-3.4-4-3.1-4 0v5.6h-3v-11h3v1.8c1.4-2.6 7-2.8 7 2.5v6.7z";
                  else if (social.platform === 'Instagram') iconPath = "M12 2.16c3.2 0 3.58.01 4.85.07 3.25.15 4.77 1.69 4.92 4.92.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.15 3.23-1.66 4.77-4.92 4.92-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-3.26-.15-4.77-1.7-4.92-4.92-.06-1.27-.07-1.65-.07-4.85s.01-3.58.07-4.85c.15-3.23 1.66-4.77 4.92-4.92 1.27-.06 1.65-.07 4.85-.07M12 0C8.74 0 8.33.01 7.05.07 2.69.27.27 2.69.07 7.05.01 8.33 0 8.74 0 12s.01 3.67.07 4.95c.2 4.36 2.62 6.78 6.98 6.98 1.28.06 1.69.07 4.95.07s3.67-.01 4.95-.07c4.36-.2 6.78-2.62 6.98-6.98.06-1.28.07-1.69.07-4.95s-.01-3.67-.07-4.95c-.2-4.36-2.62-6.78-6.98-6.98C15.67.01 15.26 0 12 0zm0 5.83a6.17 6.17 0 100 12.34 6.17 6.17 0 000-12.34zM12 16a4 4 0 110-8 4 4 0 010 8zm3.96-10.15a1.44 1.44 0 100-2.88 1.44 1.44 0 000 2.88z";
                  
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
            
            <div className="text-brand-gray-text text-sm font-light leading-loose">
              <p className="whitespace-pre-line">
                {contactInfo?.address}<br /><br />
                {contactInfo?.phone && <a href={`tel:${contactInfo.phone.replace(/[^0-9+]/g, '')}`} className="hover:text-white transition-colors block">{contactInfo.phone}</a>}
                {contactInfo?.email && <a href={`mailto:${contactInfo.email}`} className="hover:text-white transition-colors block">{contactInfo.email}</a>}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 lg:gap-16">
              {data.footerContent && data.footerContent.length > 0 ? (
                data.footerContent.map((column: { title: string; links?: unknown[] }, idx: number) => (
                  <div key={idx} className="space-y-4">
                    <h3 className="text-base font-semibold text-white">{column.title}</h3>
                    <div className="text-sm text-brand-gray-text font-light prose-a:text-brand-gray-text hover:prose-a:text-white prose-a:transition-colors prose-a:duration-150 prose-a:no-underline">
                      <PortableText value={column.links} />
                    </div>
                  </div>
                ))
              ) : (
                <>
                  <div className="space-y-4">
                    <h3 className="text-base font-semibold text-white">Resources</h3>
                    <ul className="space-y-2.5 text-sm text-brand-gray-text font-light">
                      <li><span className="opacity-60 cursor-not-allowed" title="Coming Soon">Finance knowledge</span></li>
                      <li><span className="opacity-60 cursor-not-allowed" title="Coming Soon">Market research</span></li>
                      <li><span className="opacity-60 cursor-not-allowed" title="Coming Soon">Steps for 2026</span></li>
                      <li><span className="opacity-60 cursor-not-allowed" title="Coming Soon">Risk advisory</span></li>
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
