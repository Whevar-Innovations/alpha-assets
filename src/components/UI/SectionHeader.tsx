import React from 'react';

interface SectionHeaderProps {
  subtitle: string;
  title: React.ReactNode;
  centered?: boolean;
  theme?: 'dark' | 'light';
  className?: string;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({ 
  subtitle, 
  title, 
  centered = true,
  theme = 'light',
  className = ''
}) => {
  return (
    <div className={`${centered ? 'text-center mx-auto' : ''} space-y-4 max-w-3xl ${className}`}>
      <span className={`text-xs font-semibold uppercase tracking-widest ${theme === 'dark' ? 'text-brand-grayText' : 'text-brand-gray'}`}>
        {subtitle}
      </span>
      <h2 className={`text-4xl sm:text-5xl lg:text-[56px] font-light leading-[1.1] tracking-tight ${theme === 'dark' ? 'text-brand-green' : 'text-brand-dark'}`}>
        {title}
      </h2>
    </div>
  );
};
