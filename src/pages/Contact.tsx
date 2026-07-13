import React, { useState } from 'react';
import bannerBg from '../assets/images/banner_bg.jpg';
import { Phone, Mail, MapPin, Clock, CheckCircle } from 'lucide-react';

export const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: 'general',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Validate email & phone
    if (!formData.name || !formData.email || !formData.message) {
      alert("Please fill in all required fields.");
      return;
    }
    // Set success state
    setSubmitted(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="flex flex-col min-h-screen">
      
      {/* Hero Banner */}
      <section 
        className="relative h-48 sm:h-56 flex items-center bg-brand-dark"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 46, 46, 0.85), rgba(0, 46, 46, 0.85)), url(${bannerBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center w-full">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-wide">
            Contact Us
          </h1>
        </div>
      </section>

      {/* Main Two-Column Contact Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 max-w-6xl mx-auto">
            
            {/* Left Column: Contact details & Mock Map */}
            <div className="lg:col-span-5 space-y-10">
              
              <div className="space-y-6">
                <h2 className="text-2xl sm:text-3xl font-extrabold text-brand-dark leading-tight">
                  Get in touch with an Advisor
                </h2>
                <p className="text-sm sm:text-base text-teal-900 opacity-90 leading-relaxed font-light">
                  Have questions about our investment solutions or looking to register an account? Drop us a message or visit our office.
                </p>
              </div>

              {/* Contacts info list */}
              <div className="space-y-6">
                
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-brand-cardBg flex items-center justify-center shrink-0 text-brand-primary">
                    <MapPin size={18} />
                  </div>
                  <div>
                    <h3 className="text-sm font-extrabold text-brand-dark uppercase tracking-wider mb-1">Office Location</h3>
                    <p className="text-sm text-teal-900 opacity-90 font-light leading-relaxed">
                      Regency Plaza, 30 Lugogo Bypass<br />Kampala, Uganda
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-brand-cardBg flex items-center justify-center shrink-0 text-brand-primary">
                    <Phone size={18} />
                  </div>
                  <div>
                    <h3 className="text-sm font-extrabold text-brand-dark uppercase tracking-wider mb-1">Call Us</h3>
                    <p className="text-sm text-teal-900 opacity-90 font-light hover:text-brand-primary transition-colors duration-150">
                      <a href="tel:+256200911875">+256 200 911875</a>
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-brand-cardBg flex items-center justify-center shrink-0 text-brand-primary">
                    <Mail size={18} />
                  </div>
                  <div>
                    <h3 className="text-sm font-extrabold text-brand-dark uppercase tracking-wider mb-1">Email</h3>
                    <p className="text-sm text-teal-900 opacity-90 font-light hover:text-brand-primary transition-colors duration-150">
                      <a href="mailto:invest@alphaeastafrica.com">invest@alphaeastafrica.com</a>
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-brand-cardBg flex items-center justify-center shrink-0 text-brand-primary">
                    <Clock size={18} />
                  </div>
                  <div>
                    <h3 className="text-sm font-extrabold text-brand-dark uppercase tracking-wider mb-1">Office Hours</h3>
                    <p className="text-sm text-teal-900 opacity-90 font-light leading-relaxed">
                      Monday - Friday: 8:00 AM - 5:00 PM<br />Closed on Weekends & Public Holidays
                    </p>
                  </div>
                </div>

              </div>

              {/* Styled CSS Map representation */}
              <div className="relative w-full h-[220px] rounded-lg overflow-hidden border border-gray-150 bg-gray-50 flex items-center justify-center shadow-inner">
                {/* SVG mock map design */}
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
                
                {/* Visual Kampala Tag */}
                <div className="relative z-10 bg-white border border-brand-primary px-4 py-2.5 rounded shadow flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-brand-green animate-ping shrink-0" />
                  <div>
                    <p className="text-[10px] font-extrabold uppercase tracking-widest text-brand-primary">KAMPALA OFFICE</p>
                    <p className="text-xs font-bold text-brand-dark">Alpha Asset Managers Ltd.</p>
                  </div>
                </div>
              </div>

            </div>

            {/* Right Column: Interactive Form Card */}
            <div className="lg:col-span-7">
              <div className="bg-white border border-gray-150 rounded-lg p-8 sm:p-10 shadow-sm">
                
                {submitted ? (
                  // Success Message
                  <div className="text-center py-12 space-y-6 animate-fadeIn">
                    <div className="w-16 h-16 rounded-full bg-brand-faqBg text-brand-primary flex items-center justify-center mx-auto shadow-sm">
                      <CheckCircle size={36} className="stroke-[2.5]" />
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-2xl font-extrabold text-brand-dark">Message Sent Successfully!</h3>
                      <p className="text-sm text-teal-900 opacity-90 font-light max-w-sm mx-auto leading-relaxed">
                        Thank you for reaching out, {formData.name}. An investment advisor will contact you within the next 24 working hours.
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
                  // The Interactive Form
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                      <h3 className="text-xl font-bold text-brand-dark">Send a Message</h3>
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

          </div>
        </div>
      </section>

    </div>
  );
};
