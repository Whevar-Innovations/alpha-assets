import React from 'react';

import { useParams, Link } from 'react-router-dom';
import { FooterCTA } from '../components/UI/FooterCTA';
import { SEO } from '../components/SEO';
import { PortableText } from '../components/UI/PortableText';
import investTablet from '../assets/images/invest_tablet.jpg';

import { useSanityPage } from '../sanity/hooks/useSanityPage';
import { ALL_SERVICES_QUERY, SERVICE_DETAIL_QUERY } from '../sanity/lib/queries';
import { resolveImage } from '../sanity/lib/image';
import { getServiceDefault } from '../sanity/defaults/services';

const getPlainText = (val: unknown): string => {
  if (typeof val === 'string') return val;
  if (Array.isArray(val)) {
    return val
      .map((block: { children?: { text?: string }[] }) =>
        block.children ? block.children.map((c) => c.text ?? '').join('') : ''
      )
      .join(' ');
  }
  return '';
};

export const InvestDetail: React.FC = () => {
  const { serviceId } = useParams<{ serviceId: string }>();

  const currentId = serviceId ?? 'unit-trusts';

  // Fetch all services for the sidebar
  const { data: allServices } = useSanityPage(ALL_SERVICES_QUERY, []);

  return <InvestDetailContent currentId={currentId} allServices={allServices} />;
};

const InvestDetailContent = ({ currentId, allServices }: { currentId: string; allServices: { _id: string; title: string; slug?: { current: string } }[] }) => {
  const fallback = getServiceDefault(currentId);
  const { data, isLoading } = useSanityPage(SERVICE_DETAIL_QUERY, fallback, { slug: currentId });

  if (isLoading) {
    return <InvestDetailSkeleton allServices={allServices} currentId={currentId} />;
  }

  const handleDownload = (url: string, fileName: string) => {
    if (url) {
      window.open(url, '_blank');
    } else {
      alert(`Mock Downloading: ${fileName}`);
    }
  };

  const handleView = (url: string, fileName: string) => {
    if (url) {
      window.open(url, '_blank');
    } else {
      alert(`Mock Opening PDF Preview: ${fileName}`);
    }
  };

  const imageUrl = resolveImage(data.detailImage, investTablet);
  const factsheetUrl = data.factsheet?.asset?.url;
  const factsheetName = data.factsheet?.asset?.originalFilename ?? 'Factsheet.pdf';
  const seoDescription = getPlainText(data.description) || data.shortDescription;
  const bulletsList = (data.featuresVisible ?? true) && Array.isArray(data.bullets) ? data.bullets : [];

  return (
    <div className="flex flex-col min-h-screen">
      <SEO title={data.title} description={seoDescription} />
      
      {/* Hero Banner */}
      <div className="pt-6 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <section className="relative h-52 sm:h-64 md:h-72 flex items-center justify-center overflow-hidden rounded-2xl md:rounded-[28px] bg-gradient-to-br from-[#005b5c] to-[#002e2e]">
          <div className="text-center w-full px-4">
            <span className="text-xs font-bold uppercase tracking-widest text-brand-green mb-4 block">
              {data.category ?? 'OUR SERVICES'}
            </span>
            <h1 className="text-4xl sm:text-5xl font-light text-white tracking-wide">
              {data.title}
            </h1>
          </div>
        </section>
      </div>

      {/* Main Two-Column Content */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            {/* Left Sidebar Navigation */}
            <aside className="lg:col-span-4 space-y-6 order-2 lg:order-1">
              <div className="bg-white border border-brand-primary rounded-[1.5rem] p-6 sm:p-8">
                <h3 className="text-3xl font-light text-brand-primary mb-6">
                  Our Services
                </h3>
                <nav className="flex flex-col">
                  {allServices.map((item: { _id: string; title: string; slug?: { current: string } }) => {
                    const isActive = currentId === item.slug?.current;
                    return (
                      <div key={item._id} className="border-b border-brand-dark">
                        <Link
                          to={`/invest/${item.slug?.current ?? ''}`}
                          className="group transition-all duration-150 py-3 flex items-center gap-2 w-full"
                        >
                          <span className={`text-base ${isActive ? 'text-brand-primary font-bold' : 'text-gray-500 font-light group-hover:text-brand-primary'}`}>
                            •
                          </span>
                          <span className={`text-base ${isActive ? 'text-brand-primary font-bold' : 'text-gray-500 font-light group-hover:text-brand-primary'}`}>
                            {item.title}
                          </span>
                        </Link>
                      </div>
                    );
                  })}
                </nav>
              </div>
            </aside>

            {/* Right Detailed Content */}
            <article className="lg:col-span-8 space-y-10 order-1 lg:order-2">
              
              <div className="rounded-[1.5rem] overflow-hidden h-[300px] sm:h-[400px] shadow-sm">
                <img 
                  src={imageUrl} 
                  alt={data.detailImage?.alt ?? data.title} 
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="text-gray-500 text-sm sm:text-base leading-relaxed space-y-6 font-light">
                {typeof data.description === 'string' ? (
                  <p className="whitespace-pre-line">{data.description}</p>
                ) : (
                  <PortableText value={data.description} />
                )}
              </div>

              {bulletsList.length > 0 && (
                <div className="space-y-4 pt-2">
                  {data.bulletsTitle && (
                    <h3 className="text-2xl font-bold text-brand-primary">
                      {data.bulletsTitle}
                    </h3>
                  )}
                  <ul className="flex flex-col space-y-3">
                    {bulletsList
                      .filter((item) => item.isVisible !== false)
                      .map((item, index: number) => (
                        <li key={item._key ?? index} className="text-sm sm:text-base font-light text-gray-500 flex items-start gap-2">
                          <span className="text-brand-primary font-bold text-lg leading-none mt-[1px]">›</span>
                          <span>{item.text}</span>
                        </li>
                      ))}
                  </ul>
                </div>
              )}

              {/* Factsheet Download Section */}
              {(data.factsheetVisible ?? true) && factsheetUrl && (
                <div className="bg-[#e8f4e8] border border-brand-primary rounded-md px-5 py-4 flex flex-col sm:flex-row items-center justify-between gap-4 mt-6">
                  <div className="text-left">
                    <h4 className="text-sm font-bold text-gray-800">{factsheetName}</h4>
                  </div>
                  
                  <div className="flex items-center gap-6">
                    <button
                      onClick={() => { handleView(factsheetUrl, factsheetName); }}
                      className="text-brand-primary hover:text-brand-dark text-sm font-bold transition-colors"
                    >
                      View
                    </button>
                    <button
                      onClick={() => { handleDownload(factsheetUrl, factsheetName); }}
                      className="text-gray-500 hover:text-brand-dark text-sm font-light transition-colors"
                    >
                      Download
                    </button>
                  </div>
                </div>
              )}

            </article>

          </div>
        </div>
      </section>

      <FooterCTA />
    </div>
  );
};

const InvestDetailSkeleton = ({ allServices, currentId }: { allServices: { _id: string; title: string; slug?: { current: string } }[], currentId: string }) => {
  return (
    <div className="flex flex-col min-h-screen animate-pulse">
      {/* Hero Banner Skeleton */}
      <div className="pt-6 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <section className="relative h-52 sm:h-64 md:h-72 flex items-center justify-center overflow-hidden rounded-2xl md:rounded-[28px] bg-gray-200">
          <div className="text-center w-full px-4 space-y-4 flex flex-col items-center">
            <div className="h-4 bg-gray-300 rounded w-32"></div>
            <div className="h-10 sm:h-12 bg-gray-300 rounded w-3/4 max-w-lg"></div>
          </div>
        </section>
      </div>

      {/* Main Two-Column Content Skeleton */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            {/* Sidebar Skeleton */}
            <aside className="lg:col-span-4 space-y-6 order-2 lg:order-1">
              <div className="bg-white border border-gray-100 rounded-[1.5rem] p-6 sm:p-8">
                <div className="h-8 bg-gray-200 rounded w-1/2 mb-6"></div>
                <nav className="flex flex-col">
                  {allServices.map((item) => {
                    const isActive = currentId === item.slug?.current;
                    return (
                      <div key={item._id} className="border-b border-gray-100 py-3">
                        <div className={`h-5 rounded w-3/4 ${isActive ? 'bg-brand-primary/50' : 'bg-gray-100'}`}></div>
                      </div>
                    );
                  })}
                </nav>
              </div>
            </aside>

            {/* Right Detailed Content Skeleton */}
            <article className="lg:col-span-8 space-y-10 order-1 lg:order-2">
              <div className="rounded-[1.5rem] bg-gray-200 h-[300px] sm:h-[400px]"></div>
              
              <div className="space-y-3">
                <div className="h-4 bg-gray-200 rounded w-full"></div>
                <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                <div className="h-4 bg-gray-200 rounded w-4/6"></div>
              </div>

              <div className="space-y-4 pt-2">
                <div className="h-6 bg-gray-200 rounded w-1/3"></div>
                <div className="space-y-3">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="h-4 bg-gray-100 rounded w-2/3"></div>
                  ))}
                </div>
              </div>
            </article>

          </div>
        </div>
      </section>
    </div>
  );
};
