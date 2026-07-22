import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as Icons from 'lucide-react';

export interface ServiceCardProps {
  id: string;
  title: string;
  description: string;
  iconName: keyof typeof Icons;
  isActive?: boolean;
  
  // Customization Props
  bgClass?: string;               // Base background class (default: bg-brand-cardBg)
  activeBgClass?: string;         // Active/Hover background class (default: bg-brand-dark)
  
  iconBgClass?: string;           // Base icon background class (default: bg-brand-dark)
  activeIconBgClass?: string;     // Active icon background class (default: bg-white)
  
  iconColorClass?: string;        // Base icon text/color class (default: text-brand-green)
  activeIconColorClass?: string;  // Active icon text/color class (default: text-brand-dark)
  
  titleColorClass?: string;       // Base title text color class (default: text-brand-dark)
  activeTitleColorClass?: string; // Active title text color class (default: text-brand-green)
  
  textColorClass?: string;        // Base description text color class (default: text-brand-dark/80)
  activeTextColorClass?: string;  // Active description text color class (default: text-teal-50/90)
  
  linkColorClass?: string;        // Base link text color class (default: text-brand-primary)
  activeLinkColorClass?: string;  // Active link text color class (default: text-white)
  
  enableHoverEffect?: boolean;    // Whether to toggle active styles on hover (default: true)
  className?: string;             // Extra classes to append to the card container
}

export const ServiceCard: React.FC<ServiceCardProps> = ({
  id,
  title,
  description,
  iconName,
  isActive = false,
  bgClass = 'bg-brand-cardBg',
  activeBgClass = 'bg-brand-dark',
  iconBgClass = 'bg-brand-primary',
  activeIconBgClass = 'bg-white',
  iconColorClass = 'text-brand-green',
  activeIconColorClass = 'text-brand-dark',
  titleColorClass = 'text-brand-dark',
  activeTitleColorClass = 'text-brand-green',
  textColorClass = 'text-brand-dark/80',
  activeTextColorClass = 'text-teal-50/90',
  linkColorClass = 'text-brand-primary',
  activeLinkColorClass = 'text-white',
  enableHoverEffect = true,
  className = '',
}) => {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);

  // Dynamically resolve the Lucide icon, fallback to Briefcase if not found
  const IconComponent = (Icons[iconName] || Icons.Briefcase) as React.ComponentType<{ className?: string; size?: number }>;

  const isCardActive = isActive || (enableHoverEffect && isHovered);

  // Compute dynamic styling classes
  const currentBg = isCardActive ? activeBgClass : bgClass;
  const currentIconBg = isCardActive ? activeIconBgClass : iconBgClass;
  const currentIconColor = isCardActive ? activeIconColorClass : iconColorClass;
  const currentTitleColor = isCardActive ? activeTitleColorClass : titleColorClass;
  const currentTextColor = isCardActive ? activeTextColorClass : textColorClass;
  const currentLinkColor = isCardActive ? activeLinkColorClass : linkColorClass;

  const handleClick = () => {
    navigate(`/invest/${id}`);
  };

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={handleClick}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleClick();
        }
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`rounded-[32px] p-8 lg:p-9 flex flex-col justify-between h-full shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 ease-out cursor-pointer select-none outline-none focus-visible:ring-2 focus-visible:ring-brand-primary ${currentBg} ${className}`}
    >
      <div>
        {/* Icon Circle Container (Bigger size per requirements) */}
        <div className={`w-20 h-20 rounded-full flex items-center justify-center mb-8 transition-colors duration-300 ${currentIconBg}`}>
          {IconComponent && (
            <IconComponent 
              className={`transition-colors duration-300 ${currentIconColor}`} 
              size={36} 
            />
          )}
        </div>

        {/* Title */}
        <h3 className={`text-2xl font-bold tracking-tight mb-4 transition-colors duration-300 ${currentTitleColor}`}>
          {title}
        </h3>

        {/* Description */}
        <p className={`text-[15px] leading-relaxed font-normal mb-10 transition-colors duration-300 ${currentTextColor}`}>
          {description}
        </p>
      </div>

      {/* Link (Visual presentation at the bottom) */}
      <span
        className={`inline-flex items-center text-sm font-bold uppercase tracking-wider gap-2 transition-colors duration-300 ${currentLinkColor}`}
      >
        Learn More
        <span className="transform translate-x-0 group-hover:translate-x-1.5 transition-transform duration-200">
          &gt;
        </span>
      </span>
    </div>
  );
};
