import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from './Button';

interface FooterCTAProps {
  text?: string;
  boldText?: string;
  buttonConfig?: {
    label: string;
    linkType: string;
    url: string;
    variant: string;
    isVisible: boolean;
  };
}

export const FooterCTA: React.FC<FooterCTAProps> = ({ 
  text = 'Ready to optimize your portfolio?',
  boldText = 'Start investing today',
  buttonConfig
}) => {
  const navigate = useNavigate();

  const handleCTA = () => {
    if (buttonConfig) {
      if (buttonConfig.linkType === 'external') window.open(buttonConfig.url, '_blank');
      else if (buttonConfig.linkType === 'internal') void navigate(buttonConfig.url);
    } else {
      void navigate('/invest');
    }
  };

  const showButton = buttonConfig ? buttonConfig.isVisible : true;
  const buttonLabel = buttonConfig ? buttonConfig.label : 'Speak to an Advisor';
  const buttonVariant = buttonConfig ? (buttonConfig.variant as 'primary' | 'secondary' | 'white' | 'outline') : 'primary';

  return (
    <section className="bg-white border-t border-b border-gray-100 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-lg md:text-[22px] font-light text-brand-primary text-center md:text-left leading-relaxed">
            {text}
            <span className="ml-2 font-bold text-brand-dark">{boldText}</span>
          </p>
          {showButton && (
          <Button
            variant={buttonVariant}
            size="lg"
            onClick={handleCTA}
            className="w-full sm:w-auto min-w-[200px]"
          >
            {buttonLabel}
          </Button>
        )}
        </div>
      </div>
    </section>

    
  );
};
