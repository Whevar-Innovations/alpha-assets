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
  const buttonLabel = buttonConfig ? buttonConfig.label : 'Open an Account';
  const buttonVariant = buttonConfig ? (buttonConfig.variant as 'primary' | 'secondary' | 'white' | 'outline') : 'white';

  return (
    <section className="bg-brand-primary py-24 sm:py-32 relative overflow-hidden flex-shrink-0">
      {/* Abstract Background Pattern */}
      <div 
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: 'radial-gradient(circle at 100% 100%, #ffffff 2px, transparent 2.5px), radial-gradient(circle at 0% 0%, #ffffff 2px, transparent 2.5px)',
          backgroundSize: '40px 40px',
        }}
        aria-hidden="true"
      />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-light text-white mb-10 leading-tight">
          {text} <br className="hidden sm:inline" />
          <span className="font-extrabold text-brand-green">{boldText}</span>
        </h2>
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
    </section>
  );
};
