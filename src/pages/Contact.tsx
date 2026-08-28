import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import bannerBg from '../assets/images/banner_bg.jpg';
import { Phone, Mail, MapPin, Clock, CheckCircle } from 'lucide-react';
import { SEO } from '../components/SEO';
import { Button } from '../components/UI/Button';

import { useSanityPage } from '../sanity/hooks/useSanityPage';
import { CONTACT_QUERY, SITE_SETTINGS_QUERY } from '../sanity/lib/queries';
import { contactDefaults } from '../sanity/defaults/contact';
import { siteSettingsDefaults } from '../sanity/defaults/siteSettings';
import { resolveImage } from '../sanity/lib/image';

export const Contact: React.FC = () => {
  const navigate = useNavigate();
  const { data: pageData, isLoading: isPageLoading } = useSanityPage(CONTACT_QUERY, contactDefaults);
  const { data: siteSettings, isLoading: isSettingsLoading } = useSanityPage(SITE_SETTINGS_QUERY, siteSettingsDefaults);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: 'general',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);

  if (isPageLoading || isSettingsLoading) {
    return <ContactSkeleton />;
  }

  if (pageData.pageVisible === false) {
    void navigate('/404');
    return null;
  }

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      alert("Please fill in all required fields.");
      return;
    }
    setSubmitted(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const hero = pageData.hero ?? contactDefaults.hero;
  const heroVisible = pageData.heroVisible ?? true;
  const contactVisible = pageData.contactVisible ?? true;
  const formVisible = pageData.formVisible ?? true;

  const bgImgUrl = resolveImage(hero?.backgroundImage, bannerBg);

  // Use contact info from site settings unless overridden (we don't have overrides in this schema, so we just use siteSettings)
  const contactInfo = siteSettings.contactInfo;

  return (
    <div className="flex flex-col min-h-screen">
      <SEO title={pageData.seo?.metaTitle} description={pageData.seo?.metaDescription} ogImage={pageData.seo?.ogImage} />
      
      {/* Hero Banner — matches About / Invest style */}
      {heroVisible && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-4 sm:mt-8 w-full">
          <section
            className="relative h-52 sm:h-64 md:h-72 flex items-center justify-center overflow-hidden rounded-2xl md:rounded-[28px]"
            style={{
              backgroundImage: `linear-gradient(rgba(0, 56, 46, 0.78), rgba(0, 56, 46, 0.78)), url(${bgImgUrl})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
            <div className="flex flex-col items-center gap-6 text-center px-4">
              <h1 className="text-4xl sm:text-5xl font-light text-white tracking-tight">
                {hero?.heading}
              </h1>
              {hero?.ctaButton?.isVisible && hero.ctaButton.label && (
                <Button
                  variant={hero.ctaButton.variant}
                  onClick={() => {
                    const cta = hero.ctaButton;
                    if (cta) {
                      if (cta.linkType === 'external') {
                        window.open(cta.url, '_blank');
                      } else {
                        void navigate(cta.url);
                      }
                    }
                  }}
                >
                  {hero.ctaButton.label}
                </Button>
              )}
            </div>
          </section>
        </div>
      )}


      {/* Main Two-Column Contact Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 max-w-6xl mx-auto">
            
            {/* Left Column: Contact details & Mock Map */}
            {contactVisible && (
              <div className="lg:col-span-5 space-y-10">
                
                <div className="space-y-6">
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-brand-dark leading-tight whitespace-pre-line">
                    {pageData.contactHeading}
                  </h2>
                  <p className="text-sm sm:text-base text-teal-900 opacity-90 leading-relaxed font-light whitespace-pre-line">
                    {pageData.contactSubtext}
                  </p>
                </div>

                {/* Contacts info list */}
                <div className="space-y-6">
                  {contactInfo?.address && (
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-full bg-brand-cardBg flex items-center justify-center shrink-0 text-brand-primary">
                        <MapPin size={18} />
                      </div>
                      <div>
                        <h3 className="text-sm font-extrabold text-brand-dark uppercase tracking-wider mb-1">Office Location</h3>
                        <p className="text-sm text-teal-900 opacity-90 font-light leading-relaxed whitespace-pre-line">
                          {contactInfo.address}
                        </p>
                      </div>
                    </div>
                  )}

                  {contactInfo?.phone && (
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-full bg-brand-cardBg flex items-center justify-center shrink-0 text-brand-primary">
                        <Phone size={18} />
                      </div>
                      <div>
                        <h3 className="text-sm font-extrabold text-brand-dark uppercase tracking-wider mb-1">Call Us</h3>
                        <p className="text-sm text-teal-900 opacity-90 font-light hover:text-brand-primary transition-colors duration-150">
                          <a href={`tel:${contactInfo.phone.replace(/[^0-9+]/g, '')}`}>{contactInfo.phone}</a>
                        </p>
                      </div>
                    </div>
                  )}

                  {contactInfo?.email && (
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-full bg-brand-cardBg flex items-center justify-center shrink-0 text-brand-primary">
                        <Mail size={18} />
                      </div>
                      <div>
                        <h3 className="text-sm font-extrabold text-brand-dark uppercase tracking-wider mb-1">Email</h3>
                        <p className="text-sm text-teal-900 opacity-90 font-light hover:text-brand-primary transition-colors duration-150">
                          <a href={`mailto:${contactInfo.email}`}>{contactInfo.email}</a>
                        </p>
                      </div>
                    </div>
                  )}

                  {contactInfo?.officeHours && (
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-full bg-brand-cardBg flex items-center justify-center shrink-0 text-brand-primary">
                        <Clock size={18} />
                      </div>
                      <div>
                        <h3 className="text-sm font-extrabold text-brand-dark uppercase tracking-wider mb-1">Office Hours</h3>
                        <p className="text-sm text-teal-900 opacity-90 font-light leading-relaxed whitespace-pre-line">
                          {contactInfo.officeHours}
                        </p>
                      </div>
                    </div>
                  )}

                </div>

                {/* Styled CSS Map representation */}
                <div className="relative w-full h-[220px] rounded-lg overflow-hidden border border-gray-150 bg-gray-50 flex items-center justify-center shadow-inner">
                  <svg className="absolute inset-0 w-full h-full text-teal-900 opacity-5" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                      <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                        <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1" />
                      </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#grid)" />
                    <path d="M-50,110 C150,90 250,180 450,140" fill="none" stroke="currentColor" strokeWidth="6" />
                    <path d="M120,-50 C140,150 90,250 160,450" fill="none" stroke="currentColor" strokeWidth="4" />
                    <circle cx="130" cy="140" r="16" fill="#005b5c" />
                  </svg>
                  
                  <div className="relative z-10 bg-white border border-brand-primary px-4 py-2.5 rounded shadow flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-brand-green animate-ping shrink-0" />
                    <div>
                      <p className="text-[10px] font-extrabold uppercase tracking-widest text-brand-primary">KAMPALA OFFICE</p>
                      <p className="text-xs font-bold text-brand-dark">Alpha Asset Managers Ltd.</p>
                    </div>
                  </div>
                </div>

              </div>
            )}

            {/* Right Column: Interactive Form Card */}
            {formVisible && (
              <div className="lg:col-span-7">
                <div className="bg-white border border-gray-150 rounded-lg p-8 sm:p-10 shadow-sm">
                  
                  {submitted ? (
                    <div className="text-center py-12 space-y-6 animate-fadeIn">
                      <div className="w-16 h-16 rounded-full bg-brand-faqBg text-brand-primary flex items-center justify-center mx-auto shadow-sm">
                        <CheckCircle size={36} className="stroke-[2.5]" />
                      </div>
                      <div className="space-y-2">
                        <h3 className="text-2xl font-extrabold text-brand-dark">{pageData.formSuccessHeading}</h3>
                        <p className="text-sm text-teal-900 opacity-90 font-light max-w-sm mx-auto leading-relaxed">
                          {pageData.formSuccessMessage}
                        </p>
                      </div>
                      <button
                        onClick={() => {
                          setSubmitted(false);
                          setFormData({ name: '', email: '', phone: '', service: 'general', message: '' });
                        }}
                        className="text-xs font-bold uppercase tracking-wider text-brand-primary border border-brand-primary px-6 py-3 rounded hover:bg-brand-primary hover:text-white transition-colors duration-150"
                      >
                        Send another message
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="space-y-2">
                        <h3 className="text-xl font-bold text-brand-dark">{pageData.formHeading}</h3>
                        <p className="text-xs text-brand-gray font-medium">Fields marked with * are required.</p>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label htmlFor="name" className="block text-xs font-bold uppercase tracking-wider text-brand-dark">
                            Full Name *
                          </label>
                          <input
                            type="text"
                            id="name"
                            name="name"
                            required
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full px-4 py-2.5 text-sm bg-white border border-gray-250 rounded focus:outline-none focus:ring-1 focus:ring-brand-primary text-brand-dark placeholder-gray-400"
                            placeholder="e.g. John Doe"
                          />
                        </div>

                        <div className="space-y-2">
                          <label htmlFor="email" className="block text-xs font-bold uppercase tracking-wider text-brand-dark">
                            Email Address *
                          </label>
                          <input
                            type="email"
                            id="email"
                            name="email"
                            required
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full px-4 py-2.5 text-sm bg-white border border-gray-250 rounded focus:outline-none focus:ring-1 focus:ring-brand-primary text-brand-dark placeholder-gray-400"
                            placeholder="e.g. john@example.com"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label htmlFor="phone" className="block text-xs font-bold uppercase tracking-wider text-brand-dark">
                            Phone Number
                          </label>
                          <input
                            type="tel"
                            id="phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            className="w-full px-4 py-2.5 text-sm bg-white border border-gray-250 rounded focus:outline-none focus:ring-1 focus:ring-brand-primary text-brand-dark placeholder-gray-400"
                            placeholder="e.g. +256 700 000 000"
                          />
                        </div>

                        <div className="space-y-2">
                          <label htmlFor="service" className="block text-xs font-bold uppercase tracking-wider text-brand-dark">
                            Investment Service of Interest
                          </label>
                          <select
                            id="service"
                            name="service"
                            value={formData.service}
                            onChange={handleChange}
                            className="w-full px-4 py-2.5 text-sm bg-white border border-gray-250 rounded focus:outline-none focus:ring-1 focus:ring-brand-primary text-brand-dark"
                          >
                            <option value="general">General Enquiry</option>
                            <option value="separately-managed-accounts">Separately Managed Accounts</option>
                            <option value="advisory-capital-solutions">Advisory & Capital Solutions</option>
                            <option value="direct-lending-fund">Direct Lending Fund</option>
                            <option value="private-equity">Private Equity</option>
                            <option value="unit-trusts">Unit Trusts</option>
                            <option value="pension-retirement">Pension & Retirement Mandates</option>
                          </select>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label htmlFor="message" className="block text-xs font-bold uppercase tracking-wider text-brand-dark">
                          Message *
                        </label>
                        <textarea
                          id="message"
                          name="message"
                          required
                          rows={4}
                          value={formData.message}
                          onChange={handleChange}
                          className="w-full px-4 py-2.5 text-sm bg-white border border-gray-250 rounded focus:outline-none focus:ring-1 focus:ring-brand-primary text-brand-dark placeholder-gray-400"
                          placeholder="Write your message here..."
                        />
                      </div>

                      <button
                        type="submit"
                        className="w-full bg-brand-primary hover:bg-brand-dark text-white font-bold text-xs uppercase tracking-wider py-4 rounded transition-all duration-150 shadow focus:outline-none focus:ring-2 focus:ring-brand-primary focus:ring-offset-2"
                      >
                        Send Message
                      </button>
                    </form>
                  )}

                </div>
              </div>
            )}

          </div>
        </div>
      </section>

    </div>
  );
};

const ContactSkeleton: React.FC = () => (
  <div className="flex flex-col min-h-screen animate-pulse bg-white">
    {/* Hero Banner */}
    <div className="h-48 sm:h-56 bg-gray-200 w-full flex items-center justify-center">
       <div className="h-10 bg-gray-300 rounded w-1/3"></div>
    </div>

    {/* Main Two-Column Contact Section */}
    <div className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 max-w-6xl mx-auto">
          
          {/* Left Column: Contact details & Mock Map */}
          <div className="lg:col-span-5 space-y-10">
            <div className="space-y-6">
              <div className="h-8 bg-gray-200 rounded w-3/4"></div>
              <div className="h-4 bg-gray-100 rounded w-5/6"></div>
              <div className="h-4 bg-gray-100 rounded w-4/6"></div>
            </div>

            <div className="space-y-6">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-gray-200 shrink-0"></div>
                  <div className="space-y-2 w-full pt-1">
                    <div className="h-4 bg-gray-200 rounded w-1/3"></div>
                    <div className="h-3 bg-gray-100 rounded w-2/3"></div>
                  </div>
                </div>
              ))}
            </div>

            <div className="w-full h-[220px] rounded-lg bg-gray-100 border border-gray-150"></div>
          </div>

          {/* Right Column: Form */}
          <div className="lg:col-span-7">
            <div className="bg-white border border-gray-150 rounded-lg p-8 sm:p-10 shadow-sm space-y-6">
              <div className="space-y-2">
                <div className="h-6 bg-gray-200 rounded w-1/3"></div>
                <div className="h-3 bg-gray-100 rounded w-1/4"></div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6">
                <div className="space-y-2">
                  <div className="h-4 bg-gray-200 rounded w-1/3"></div>
                  <div className="h-10 bg-gray-100 rounded w-full"></div>
                </div>
                <div className="space-y-2">
                  <div className="h-4 bg-gray-200 rounded w-1/3"></div>
                  <div className="h-10 bg-gray-100 rounded w-full"></div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <div className="h-4 bg-gray-200 rounded w-1/3"></div>
                  <div className="h-10 bg-gray-100 rounded w-full"></div>
                </div>
                <div className="space-y-2">
                  <div className="h-4 bg-gray-200 rounded w-1/3"></div>
                  <div className="h-10 bg-gray-100 rounded w-full"></div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                <div className="h-32 bg-gray-100 rounded w-full"></div>
              </div>

              <div className="h-12 bg-gray-200 rounded w-full"></div>
            </div>
          </div>

        </div>
      </div>
    </div>
  </div>
);
