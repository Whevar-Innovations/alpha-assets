import React from 'react';
import { useNavigate } from 'react-router-dom';

export const FooterCTA: React.FC = () => {
  const navigate = useNavigate();

  return (
    <section className="bg-white border-t border-b border-gray-100 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-lg md:text-xl font-medium text-brand-dark text-center md:text-left">
            Let us help you build a strategy that works for you.{' '}
            <span className="font-extrabold text-brand-primary">Speak to our team today.</span>
          </p>
          <button
            onClick={() => navigate('/contact')}
            className="bg-brand-green hover:bg-opacity-95 text-brand-dark font-bold text-xs uppercase tracking-wider px-6 py-3.5 rounded-full transition-all duration-150 shadow-sm shrink-0 whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-brand-primary focus:ring-offset-2"
          >
            Speak to an Advisor
          </button>
        </div>
      </div>
    </section>
  );
};
