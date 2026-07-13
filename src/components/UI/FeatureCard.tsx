import React from 'react';
import type { LucideIcon } from 'lucide-react';

interface FeatureCardProps {
  title: string;
  description: string;
  Icon: LucideIcon;
}

export const FeatureCard: React.FC<FeatureCardProps> = ({ title, description, Icon }) => {
  return (
    <div className="bg-white rounded-[24px] p-6 sm:p-8 md:p-10 flex gap-6 items-start shadow-sm transition-transform hover:-translate-y-1 duration-300">
      <div className="w-20 h-20 rounded-full bg-brand-primary flex items-center justify-center shrink-0 text-brand-green">
        <Icon size={36} strokeWidth={1.5} />
      </div>
      <div className="space-y-2 mt-1">
        <h3 className="text-xl sm:text-2xl font-semibold text-brand-primary">{title}</h3>
        <p className="text-[13px] sm:text-sm leading-relaxed text-brand-gray opacity-90">{description}</p>
      </div>
    </div>
  );
};
