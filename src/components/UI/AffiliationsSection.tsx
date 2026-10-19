import React from 'react';
import type { PartnerLogoItem, SanityImage as SanityImageType } from '../../types';
import { SanityImage } from './SanityImage';
import { resolveImage } from '../../sanity/lib/image';
import { formatCMSLines } from '../../utils/formatText';
import cmaLogo from '../../assets/images/clients/cma-logo.png';
import kcbLogo from '../../assets/images/clients/KCB_Bank_Kenya_Limited_logo.png';
import absaLogo from '../../assets/images/clients/absa_logo.png';

export interface AffiliationsSectionProps {
  subtitle?: string;
  heading?: string;
  subtext?: string;
  partners?: PartnerLogoItem[];
}

const getFallbackLogoByName = (name: string): string => {
  const normalized = name.toLowerCase();
  if (normalized.includes('cma') || normalized.includes('capital markets')) return cmaLogo;
  if (normalized.includes('kcb')) return kcbLogo;
  if (normalized.includes('absa')) return absaLogo;
  return '';
};

interface PartnerLogoNodeProps {
  partner: PartnerLogoItem;
  isDuplicate?: boolean;
}

const PartnerLogoNode: React.FC<PartnerLogoNodeProps> = ({ partner, isDuplicate = false }) => {
  const fallbackSrc = getFallbackLogoByName(partner.name);
  const resolvedSrc = resolveImage(partner.logo, fallbackSrc);
  const isExternal = Boolean(partner.url);
  const imageObj: SanityImageType | undefined = partner.logo ?? (fallbackSrc ? { url: fallbackSrc, alt: `${partner.name} logo` } : undefined);

  const content = resolvedSrc ? (
    <SanityImage
      image={imageObj}
      fallback={fallbackSrc}
      sizes="(max-width: 640px) 130px, 160px"
      alt={isDuplicate ? '' : (partner.logo?.alt ?? `${partner.name} logo`)}
      className="h-8 sm:h-10 md:h-11 w-auto max-w-[120px] sm:max-w-[150px] object-contain grayscale opacity-75 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300"
    />
  ) : (
    <span className="text-sm sm:text-base font-semibold uppercase tracking-wider text-brand-primary/70 group-hover:text-brand-primary transition-colors duration-300">
      {partner.name}
    </span>
  );

  if (isExternal && partner.url) {
    return (
      <a
        href={partner.url}
        target="_blank"
        rel="noopener noreferrer"
        tabIndex={isDuplicate ? -1 : undefined}
        aria-hidden={isDuplicate ? 'true' : undefined}
        aria-label={isDuplicate ? undefined : `${partner.name} (opens in a new tab)`}
        className="group inline-flex items-center justify-center shrink-0 py-1 transition-transform duration-300 hover:scale-[1.03] focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary/40 focus-visible:ring-offset-4 rounded-sm"
      >
        {content}
      </a>
    );
  }

  return (
    <div
      aria-hidden={isDuplicate ? 'true' : undefined}
      title={partner.name}
      className="group inline-flex items-center justify-center shrink-0 py-1"
    >
      {content}
    </div>
  );
};

export const AffiliationsSection: React.FC<AffiliationsSectionProps> = ({
  subtitle,
  heading,
  subtext,
  partners = [],
}) => {
  const visiblePartners = partners.filter((p) => p.isVisible !== false);
  const hasSubtitle = Boolean(subtitle?.trim());
  const hasHeading = Boolean(heading?.trim());
  const hasSubtext = Boolean(subtext?.trim());

  if (!hasHeading && visiblePartners.length === 0) {
    return null;
  }

  const useMarquee = visiblePartners.length > 4;

  return (
    <section
      aria-labelledby={hasHeading ? 'affiliations-heading' : undefined}
      aria-label={!hasHeading ? 'Regulatory affiliations and institutional partners' : undefined}
      className="bg-white border-t border-b border-gray-100 py-10 sm:py-14 w-full"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8 lg:gap-12">
          {/* Left Column: Sleek Eyebrow & Regulatory Statement */}
          <div className="lg:max-w-md xl:max-w-lg shrink-0 text-center lg:text-left space-y-2">
            {hasSubtitle && subtitle && (
              <span className="block text-xs font-semibold uppercase tracking-widest text-brand-gray">
                {subtitle}
              </span>
            )}

            {hasHeading && heading && (
              <h2
                id="affiliations-heading"
                className="text-xl sm:text-2xl md:text-[26px] font-light text-brand-primary leading-snug tracking-tight whitespace-pre-line"
              >
                {formatCMSLines(heading)}
              </h2>
            )}

            {hasSubtext && subtext && (
              <p className="text-xs sm:text-sm text-brand-gray/75 font-light leading-relaxed max-w-md mx-auto lg:mx-0 pt-1 whitespace-pre-line">
                {formatCMSLines(subtext)}
              </p>
            )}
          </div>

          {/* Right Column: Frameless Partner Logos (Static Right-Aligned for <= 4, Smooth Marquee for 5+) */}
          {visiblePartners.length > 0 && (
            <div className="flex-1 min-w-0 w-full">
              {useMarquee ? (
                <div
                  role="region"
                  aria-label="Affiliated partners and regulatory institutions"
                  className="relative overflow-hidden w-full [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]"
                >
                  <div className="flex items-center gap-10 sm:gap-14 w-max animate-affiliations-marquee">
                    {visiblePartners.map((partner, idx) => (
                      <PartnerLogoNode
                        key={`primary-${partner.name}-${String(idx)}`}
                        partner={partner}
                      />
                    ))}
                    {visiblePartners.map((partner, idx) => (
                      <PartnerLogoNode
                        key={`clone-${partner.name}-${String(idx)}`}
                        partner={partner}
                        isDuplicate
                      />
                    ))}
                  </div>
                </div>
              ) : (
                <div
                  role="list"
                  aria-label="Affiliated partners and regulatory institutions"
                  className="flex flex-wrap items-center justify-center lg:justify-end gap-x-8 sm:gap-x-12 md:gap-x-14 gap-y-6"
                >
                  {visiblePartners.map((partner, idx) => (
                    <div role="listitem" key={`${partner.name}-${String(idx)}`} className="flex items-center">
                      <PartnerLogoNode partner={partner} />
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
