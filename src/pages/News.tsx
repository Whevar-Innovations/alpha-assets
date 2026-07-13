import React, { useState } from 'react';
import { FooterCTA } from '../components/UI/FooterCTA';
import bannerBg from '../assets/images/banner_bg.jpg';
import { Calendar, Clock, ArrowRight } from 'lucide-react';

interface Article {
  id: string;
  title: string;
  excerpt: string;
  category: 'Market Update' | 'Investment Advice' | 'Company News';
  date: string;
  readTime: string;
}

export const News: React.FC = () => {
  const [filter, setFilter] = useState<string>('All');

  const categories = ['All', 'Market Update', 'Investment Advice', 'Company News'];

  const articles: Article[] = [
    {
      id: 'article-1',
      title: 'East African Macroeconomic Outlook for H2 2026',
      excerpt: 'An in-depth analysis of monetary policy shifts, inflationary trends, and currency performance across Uganda, Kenya, and Tanzania.',
      category: 'Market Update',
      date: 'July 10, 2026',
      readTime: '6 min read',
    },
    {
      id: 'article-2',
      title: 'Building a Resilient Portfolio: The Case for Private Credit',
      excerpt: 'Discover why sophisticated investors are moving towards senior secured debt funds to secure yields in volatile markets.',
      category: 'Investment Advice',
      date: 'June 28, 2026',
      readTime: '4 min read',
    },
    {
      id: 'article-3',
      title: 'Alpha Asset Managers Receives Top Performance Rating',
      excerpt: 'We are proud to announce our Unit Trust funds have been ranked among the top-tier performing funds by regional evaluators.',
      category: 'Company News',
      date: 'June 15, 2026',
      readTime: '2 min read',
    },
    {
      id: 'article-4',
      title: 'Understanding Treasury Bonds and Bills in Uganda',
      excerpt: 'A basic guide for retail investors looking to diversify from cash accounts into risk-free government securities.',
      category: 'Investment Advice',
      date: 'May 30, 2026',
      readTime: '5 min read',
    },
    {
      id: 'article-5',
      title: 'Global Inflation Cycles and Local Fixed-Income Portfolios',
      excerpt: 'How changes in interest rates by major global central banks impact interest yield curves in emerging sub-Saharan financial markets.',
      category: 'Market Update',
      date: 'May 12, 2026',
      readTime: '8 min read',
    },
  ];

  const filteredArticles = filter === 'All' 
    ? articles 
    : articles.filter(a => a.category === filter);

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
            News & Insights
          </h1>
        </div>
      </section>

      {/* Articles Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Category Filter Pills */}
          <div className="flex flex-wrap justify-center gap-3 mb-16 max-w-2xl mx-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-5 py-2.5 rounded text-xs font-bold uppercase tracking-wider transition-all duration-150 border ${
                  filter === cat
                    ? 'bg-brand-primary text-white border-brand-primary shadow-sm'
                    : 'bg-white text-brand-dark border-gray-200 hover:border-brand-primary hover:text-brand-primary'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Grid Layout of Articles */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {filteredArticles.map((article) => (
              <article 
                key={article.id}
                className="bg-white border border-gray-150 rounded-lg p-8 shadow-sm flex flex-col justify-between hover:shadow-md hover:border-brand-primary transition-all duration-200"
              >
                <div>
                  {/* Category Tag */}
                  <span className="text-[10px] font-extrabold uppercase tracking-widest text-brand-primary bg-teal-50 px-2.5 py-1 rounded">
                    {article.category}
                  </span>
                  
                  {/* Title */}
                  <h3 className="text-lg font-extrabold text-brand-dark mt-6 mb-3 leading-snug">
                    {article.title}
                  </h3>
                  
                  {/* Excerpt */}
                  <p className="text-sm text-teal-900 opacity-90 leading-relaxed font-light mb-8">
                    {article.excerpt}
                  </p>
                </div>

                <div>
                  {/* Article Metadata */}
                  <div className="flex items-center gap-4 text-xs text-brand-gray font-medium border-t border-gray-100 pt-6 mb-6">
                    <span className="flex items-center gap-1.5">
                      <Calendar size={14} />
                      {article.date}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Clock size={14} />
                      {article.readTime}
                    </span>
                  </div>

                  {/* Read Article Link */}
                  <button 
                    onClick={() => alert(`Mock opening article: ${article.title}`)}
                    className="text-xs font-bold uppercase tracking-wider text-brand-primary hover:text-brand-dark inline-flex items-center gap-2 group"
                  >
                    Read Article
                    <ArrowRight size={14} className="transform translate-x-0 group-hover:translate-x-1 transition-transform duration-150" />
                  </button>
                </div>
              </article>
            ))}
          </div>

        </div>
      </section>

      {/* Footer CTA */}
      <FooterCTA />

    </div>
  );
};
