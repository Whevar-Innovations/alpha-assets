import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from './Button';
import { useSanityPage } from '../../sanity/hooks/useSanityPage';
import { SITE_SETTINGS_QUERY } from '../../sanity/lib/queries';
import { siteSettingsDefaults } from '../../sanity/defaults/siteSettings';
import type { CTAButton } from '../../types';

export interface FooterCTAProps {
  isVisible?: boolean;
  text?: string;
  boldText?: string;
  buttonConfig?: CTAButton;
}

export const FooterCTA: React.FC<FooterCTAProps> = ({ 
  isVisible,
  text,
  boldText,
  buttonConfig
}) => {
  const navigate = useNavigate();
  const { data: siteSettings } = useSanityPage(SITE_SETTINGS_QUERY, siteSettingsDefaults);

  const isCtaVisible = isVisible ?? siteSettings.footerCtaVisible ?? true;
  if (!isCtaVisible) {
    return null;
  }

  const pageText = text?.trim();
  const pageBoldText = boldText?.trim();
  const hasPageTextOverride = Boolean(pageText) || Boolean(pageBoldText);

  const globalText = siteSettings.footerCtaText?.trim();
  const globalBoldText = siteSettings.footerCtaBoldText?.trim();

  const displayText = hasPageTextOverride
    ? (pageText ?? '')
    : (globalText && globalText.length > 0 ? globalText : 'Let us help you build a strategy that works for you');

  const displayBoldText = hasPageTextOverride
    ? (pageBoldText ?? '')
    : (globalBoldText && globalBoldText.length > 0 ? globalBoldText : 'Start investing today');

  const hasPageButton = Boolean(buttonConfig?.label.trim());
  const displayButton = hasPageButton ? buttonConfig : siteSettings.footerCtaButton;

  const showButton = displayButton ? displayButton.isVisible : true;
  const buttonLabel = displayButton?.label.trim() ? displayButton.label : 'Request your Confidential Portfolio Review';
  const buttonVariant = displayButton?.variant ?? 'primary';

  const handleCTA = () => {
    if (displayButton?.url) {
      if (displayButton.linkType === 'external') {
        window.open(displayButton.url, '_blank');
      } else {
        void navigate(displayButton.url);
      }
    } else {
      void navigate('/contact');
    }
  };

  return (
    <section className="bg-white border-t border-b border-gray-100 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-5 sm:gap-6">
          <p className="text-lg md:text-[22px] font-light text-brand-primary text-center lg:text-left leading-relaxed">
            {displayText}
            {displayBoldText && (
              <span className={`${displayText ? 'ml-2 ' : ''}font-bold text-brand-dark`}>
                {displayBoldText}
              </span>
            )}
          </p>
          {showButton && (
            <Button
              variant={buttonVariant}
              size="lg"
              onClick={handleCTA}
              className="w-full sm:w-auto shrink-0"
            >
              {buttonLabel}
            </Button>
          )}
        </div>
      </div>
    </section>
  );
};
