import React from 'react';
import type { LucideIcon } from 'lucide-react';

interface FeatureCardProps {
  title: string;
  description: string;
  Icon: LucideIcon;
}

export const FeatureCard: React.FC<FeatureCardProps> = ({ title, description, Icon }) => {
  return (
    <div className="bg-white rounded-[24px] p-8 md:p-10 flex flex-col lg:flex-row gap-6 lg:items-start shadow-sm transition-transform hover:-translate-y-1 duration-300">
      
      {/* Icon and Mobile Title Container */}
      <div className="flex gap-4 sm:gap-6 items-center lg:block">
        <div className="w-16 h-16 sm:w-20 sm:h-20 lg:w-20 lg:h-20 rounded-full bg-brand-primary flex items-center justify-center shrink-0 text-brand-green">
          <Icon className="w-8 h-8 sm:w-10 sm:h-10 lg:w-[36px] lg:h-[36px]" strokeWidth={1.5} />
        </div>
        <h3 className="text-xl sm:text-2xl font-bold text-brand-primary leading-tight lg:hidden">
          {title}
        </h3>
      </div>

      {/* Description and Desktop Title Container */}
      <div className="lg:space-y-2 lg:mt-1">
        <h3 className="hidden lg:block text-xl sm:text-2xl font-semibold text-brand-primary">
          {title}
        </h3>
        <p className="text-[14px] sm:text-[15px] lg:text-[13px] xl:text-sm leading-relaxed text-gray-500 lg:text-brand-gray lg:opacity-90 font-light lg:font-normal">
          {description}
        </p>
      </div>

    </div>
  );
};
