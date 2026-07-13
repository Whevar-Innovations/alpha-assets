import React from 'react';
import { Link } from 'react-router-dom';

import logoWhite from '../../assets/logos/white.png';

export const Footer: React.FC = () => {
  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    // Newsletter subscription mock action
    alert("Thank you for subscribing to our newsletter!");
  };

  return (
    <footer className="bg-brand-dark text-white pt-16 pb-8 border-t border-teal-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 pb-12 border-b border-teal-950">
          
          {/* Logo & Contact Info */}
          <div className="space-y-6">
            <Link to="/">
              <img 
                src={logoWhite} 
                alt="Alpha Asset Managers White Logo" 
                className="h-12 w-auto object-contain"
              />
            </Link>
            <div className="space-y-3 text-sm text-brand-grayText">
              <p>Regency Plaza, 30 Lugogo Bypass<br />Kampala, Uganda</p>
              <p className="hover:text-white transition-colors duration-150">
                <a href="tel:+256200911875">+256 200 911875</a>
              </p>
              <p className="hover:text-white transition-colors duration-150">
                <a href="mailto:invest@alphaeastafrica.com">invest@alphaeastafrica.com</a>
              </p>
            </div>
          </div>

          {/* Newsletter Subscribe */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold tracking-wider text-brand-grayText">Subscribe to our newsletter</h3>
            <form onSubmit={handleSubscribe} className="flex max-w-sm">
              <input
                type="email"
                required
                placeholder="Email"
                className="flex-grow px-4 py-2 text-sm bg-transparent border border-teal-800 rounded-l focus:outline-none focus:ring-1 focus:ring-brand-green text-white placeholder-teal-650"
              />
              <button
                type="submit"
                className="bg-brand-green text-brand-dark px-5 py-2 text-sm font-bold rounded-r hover:bg-opacity-90 transition-all duration-150 flex items-center gap-2"
              >
                Send
              </button>
            </form>
            
            {/* Social Icons */}
            <div className="flex space-x-4 pt-2">
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="p-2 bg-teal-950 rounded-full hover:bg-brand-accent transition-colors duration-150 text-brand-grayText hover:text-white"
                aria-label="Facebook"
              >
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M9 8H7v3h2v9h4v-9h3.6l.4-3H13V6c0-.5.5-1 1-1h3V1H13c-3.3 0-5 1.7-5 5v2z"/></svg>
              </a>
              <a 
                href="https://twitter.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="p-2 bg-teal-950 rounded-full hover:bg-brand-accent transition-colors duration-150 text-brand-grayText hover:text-white"
                aria-label="X (Twitter)"
              >
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M18.2 2.4h3.3L14.3 11l8.5 11.3H16.2L11 15.6 5 22.4H1.7l7.6-8.7L1.2 2.4h6.8l4.7 6.2 5.5-6.2zm-1.2 17.6h1.8L7.1 4.2H5.1l11.9 15.8z"/></svg>
              </a>
              <a 
                href="https://linkedin.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="p-2 bg-teal-950 rounded-full hover:bg-brand-accent transition-colors duration-150 text-brand-grayText hover:text-white"
                aria-label="LinkedIn"
              >
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.8 0-5 2.2-5 5v14c0 2.8 2.2 5 5 5h14c2.8 0 5-2.2 5-5v-14c0-2.8-2.2-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.3c-.9 0-1.7-.8-1.7-1.7s.8-1.7 1.7-1.7 1.7.8 1.7 1.7-.8 1.7-1.7 1.7zm13.5 12.3h-3v-5.6c0-3.4-4-3.1-4 0v5.6h-3v-11h3v1.8c1.4-2.6 7-2.8 7 2.5v6.7z"/></svg>
              </a>
            </div>
          </div>

          {/* Resources Links */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold tracking-wider uppercase text-brand-grayText">Resources</h3>
            <ul className="space-y-2 text-sm text-brand-grayText">
              <li><Link to="/news" className="hover:text-white transition-colors duration-150">Finance knowledge</Link></li>
              <li><Link to="/news" className="hover:text-white transition-colors duration-150">Market research</Link></li>
              <li><Link to="/news" className="hover:text-white transition-colors duration-150">Steps for 2026</Link></li>
              <li><Link to="/news" className="hover:text-white transition-colors duration-150">Risk advisory</Link></li>
            </ul>
          </div>

          {/* Company Links */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold tracking-wider uppercase text-brand-grayText">Company</h3>
            <ul className="space-y-2 text-sm text-brand-grayText">
              <li><Link to="/about" className="hover:text-white transition-colors duration-150">Investment Philosophy</Link></li>
              <li><Link to="/about" className="hover:text-white transition-colors duration-150">Our People</Link></li>
              <li><Link to="/about" className="hover:text-white transition-colors duration-150">Corporate Governance</Link></li>
              <li><Link to="/about" className="hover:text-white transition-colors duration-150">Macro Insights</Link></li>
            </ul>
          </div>

        </div>

        {/* Regulatory Info & Copyright */}
        <div className="flex flex-col md:flex-row justify-between items-center pt-8 text-xs text-brand-grayText text-center md:text-left gap-4">
          <p>Alpha Asset Managers is regulated by the Capital Markets Authority</p>
          <p>© 2026 Alpha Asset Managers, All Rights Reserved</p>
        </div>
      </div>
    </footer>
  );
};
