import React from 'react';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useSanityPage } from '../sanity/hooks/useSanityPage';
import { POLICY_PAGE_QUERY } from '../sanity/lib/queries';
import { policyPageDefaults } from '../sanity/defaults/policyPage';
import { PortableText } from '../components/UI/PortableText';

export const PolicyPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  
  const { data, isLoading } = useSanityPage(
    POLICY_PAGE_QUERY,
    policyPageDefaults,
    { slug }
  );

  if (isLoading) {
    return (
      <div className="min-h-screen bg-brand-light flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brand-primary"></div>
      </div>
    );
  }

  const title = data.title || policyPageDefaults.title;
  const content = data.content || policyPageDefaults.content;
  const formattedDate = data.lastUpdated 
    ? new Date(data.lastUpdated).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })
    : '';

  return (
    <div className="bg-brand-light min-h-screen pb-20 pt-32">
      <Helmet>
        <title>{title} | Alpha Asset Managers</title>
      </Helmet>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12 border-b border-gray-200 pb-8">
          <h1 className="text-4xl lg:text-5xl font-serif text-brand-dark mb-4">
            {title}
          </h1>
          {formattedDate && (
            <p className="text-brand-gray-text text-sm">
              Last updated: {formattedDate}
            </p>
          )}
        </div>

        <div className="prose prose-lg max-w-none prose-headings:font-serif prose-headings:text-brand-dark prose-p:text-gray-600 prose-a:text-brand-primary hover:prose-a:text-brand-green">
          <PortableText value={content} />
        </div>
      </div>
    </div>
  );
};
