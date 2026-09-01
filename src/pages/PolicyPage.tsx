import React, { useEffect, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useSanityPage } from '../sanity/hooks/useSanityPage';
import { POLICY_PAGE_QUERY } from '../sanity/lib/queries';
import { getPolicyPageDefaults } from '../sanity/defaults/policyPage';
import { PortableText as PortableTextReact, type PortableTextProps } from '@portabletext/react';
import { defaultPortableTextComponents } from '../components/UI/PortableText';
import type { PolicyPageData } from '../types';

const typeLabels: Record<string, string> = {
  'privacy-policy': 'Privacy Policy',
  'terms-of-use': 'Terms of Use',
  'privacy-notice': 'Privacy Notice',
  'cookie-policy': 'Cookie Policy',
  'risk-disclosures': 'Risk Disclosures',
  'complaints-procedure': 'Complaints Procedure',
  'regulatory-information': 'Regulatory Information'
};

const slugify = (text: string) => text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

interface TOCItem {
  id: string;
  title: string;
}

export const PolicyPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  
  const defaults = getPolicyPageDefaults(slug);

  const { data, isLoading } = useSanityPage<PolicyPageData>(
    POLICY_PAGE_QUERY,
    defaults,
    { slug }
  );

  useEffect(() => {
    if (!isLoading && data.pageVisible === false) {
      void navigate('/404');
    }
  }, [isLoading, data.pageVisible, navigate]);

  // Extract TOC from the content blocks
  const tocItems = useMemo<TOCItem[]>(() => {
    interface Block {
      _type: string;
      style?: string;
      children?: { text: string }[];
    }
    const blocks = (data.content ?? defaults.content ?? []) as Block[];
    return blocks
      .filter((block) => block._type === 'block' && block.style === 'h2')
      .map((block) => {
        const text = block.children?.map((c) => c.text).join('') ?? '';
        return { id: slugify(text), title: text };
      });
  }, [data.content, defaults.content]);

  if (isLoading || data.pageVisible === false) {
    return (
      <div className="min-h-screen bg-[#fafbfa] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brand-primary"></div>
      </div>
    );
  }

  const title = typeLabels[slug ?? ''] ?? 'Policy Document';
  const content = data.content ?? defaults.content;
  const formattedDate = data.lastUpdated 
    ? new Date(data.lastUpdated).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })
    : '';

  const handleDownload = (e: React.MouseEvent) => {
    e.preventDefault();
    if (data.pdfDocument?.asset?.url) {
      window.open(data.pdfDocument.asset.url, '_blank');
    } else {
      window.print();
    }
  };

  return (
    <div className="bg-[#fafbfa] min-h-screen pb-20 pt-24 md:pt-32">
      <Helmet>
        <title>{title} | Alpha Asset Managers</title>
      </Helmet>

      <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Document Header */}
        <div className="py-10 border-b border-gray-200 flex flex-col md:flex-row justify-between items-start md:items-end gap-6 print:border-none print:py-4">
          <div>
            <h1 className="text-3xl md:text-[32px] font-serif text-brand-dark mb-2">
              {title}
            </h1>
            <div className="text-sm text-gray-500 font-light">
              Effective <b className="text-gray-800 font-semibold">{formattedDate}</b> &nbsp;·&nbsp; Alpha Asset Managers Limited
            </div>
          </div>
          
          <button 
            onClick={handleDownload}
            className="inline-flex items-center gap-2 border border-brand-primary text-brand-primary bg-white hover:bg-brand-primary hover:text-white transition-colors duration-150 text-sm font-semibold tracking-wide px-5 py-2.5 rounded shadow-sm whitespace-nowrap print:hidden"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
              <polyline points="7 10 12 15 17 10"/>
              <line x1="12" y1="15" x2="12" y2="3"/>
            </svg>
            Download PDF
          </button>
        </div>

        {/* Layout: TOC + Body */}
        <div className="grid grid-cols-1 md:grid-cols-[230px_1fr] gap-12 lg:gap-16 pt-10 pb-24 items-start">
          
          {/* Table of Contents */}
          <aside className="sticky top-28 hidden md:block print:hidden">
            <div className="text-[11px] tracking-widest text-gray-500 font-bold mb-4 uppercase">Contents</div>
            {tocItems.length > 0 ? (
              <ol className="list-none m-0 p-0 border-l border-gray-200">
                {tocItems.map((item, index) => (
                  <li key={index}>
                    <a 
                      href={`#${item.id}`}
                      className="block text-sm leading-relaxed text-gray-700 hover:text-brand-primary py-1.5 pl-4 border-l-2 border-transparent -ml-[1px] hover:border-brand-primary transition-colors"
                    >
                      {item.title}
                    </a>
                  </li>
                ))}
              </ol>
            ) : (
              <p className="text-xs text-gray-400">No sections found.</p>
            )}
          </aside>

          {/* Main Content */}
          <div className="prose prose-lg max-w-[700px] prose-headings:font-serif prose-headings:text-brand-dark prose-p:text-gray-700 prose-p:leading-relaxed prose-a:text-brand-primary hover:prose-a:text-brand-green prose-li:text-gray-700 print:max-w-none">
            <PortableTextReact 
              value={content as PortableTextProps['value']} 
              components={{ 
                ...defaultPortableTextComponents, 
                block: {
                  h2: ({ children, value }: import('@portabletext/react').PortableTextComponentProps<import('@portabletext/types').PortableTextBlock>) => {
                    const text = value?.children?.map((c) => (c as import('@portabletext/types').PortableTextSpan).text || '').join('') ?? '';
                    return <h2 id={slugify(text)} className="text-xl font-bold text-brand-dark mt-8 mb-4 scroll-mt-32 print:scroll-mt-0">{children}</h2>;
                  }
                } 
              }} 
            />
            
            <hr className="my-12 border-gray-200 print:hidden" />
            <p className="text-sm text-gray-500 print:hidden">
              Questions about this policy? Contact <a href="mailto:invest@alphaeastafrica.com" className="text-brand-primary">invest@alphaeastafrica.com</a>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
