import React from 'react';
import { Helmet } from 'react-helmet-async';
import type { SanityImage } from '../types';
import { resolveImage } from '../sanity/lib/image';

interface SEOProps {
  title?: string;
  description?: string;
  ogImage?: SanityImage;
}

export const SEO: React.FC<SEOProps> = ({ title, description, ogImage }) => {
  const siteName = 'Alpha Asset Managers';
  const fullTitle = title ? `${title} | ${siteName}` : siteName;
  const defaultDesc = 'Alpha Asset Managers provides professional investment management services, helping individuals and institutions grow and preserve their wealth.';
  
  const imgUrl = resolveImage(ogImage, undefined);

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description ?? defaultDesc} />
      {imgUrl && <meta property="og:image" content={imgUrl} />}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description ?? defaultDesc} />
      <meta name="twitter:card" content="summary_large_image" />
    </Helmet>
  );
};
