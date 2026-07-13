import React from 'react';
import { Link } from 'react-router-dom';
import * as Icons from 'lucide-react';

interface ServiceCardProps {
  id: string;
  title: string;
  description: string;
  iconName: keyof typeof Icons;
  isActive?: boolean;
}

export const ServiceCard: React.FC<ServiceCardProps> = ({
  id,
  title,
  description,
  iconName,
  isActive = false,
}) => {
  // Dynamically resolve the Lucide icon
  const IconComponent = Icons[iconName] as React.ComponentType<{ className?: string; size?: number }>;

  const baseStyles = "rounded-lg p-8 transition-all duration-300 flex flex-col justify-between h-full shadow-sm hover:shadow-md hover:-translate-y-1";
  
  const themeStyles = isActive
    ? "bg-brand-primary text-white"
    : "bg-brand-cardBg text-brand-dark";

  return (
    <div className={`${baseStyles} ${themeStyles}`}>
      <div>
        {/* Icon container */}
        <div className={`w-14 h-14 rounded-full flex items-center justify-center mb-6 ${
          isActive ? 'bg-teal-950 text-white' : 'bg-brand-primary text-white'
        }`}>
          {IconComponent && <IconComponent size={24} />}
        </div>

        {/* Title */}
        <h3 className="text-xl font-bold mb-4">{title}</h3>

        {/* Description */}
        <p className={`text-sm leading-relaxed mb-8 ${
          isActive ? 'text-teal-50' : 'text-teal-900 opacity-90'
        }`}>
          {description}
        </p>
      </div>

      {/* Link */}
      <Link 
        to={`/invest/${id}`}
        className={`inline-flex items-center text-xs font-bold uppercase tracking-wider gap-2 group focus:outline-none focus:underline ${
          isActive ? 'text-white hover:text-brand-green' : 'text-brand-primary hover:text-brand-dark'
        }`}
      >
        Learn More
        <span className="transform translate-x-0 group-hover:translate-x-1 transition-transform duration-150">&gt;</span>
      </Link>
    </div>
  );
};
