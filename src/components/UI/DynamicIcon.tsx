import React from 'react';
import * as LucideIcons from 'lucide-react';
import type { LucideProps } from 'lucide-react';

interface DynamicIconProps extends LucideProps {
  name: string;
}

export const DynamicIcon: React.FC<DynamicIconProps> = ({ name, ...props }) => {
  const IconComponent = (LucideIcons as unknown as Record<string, React.ElementType | undefined>)[name];

  if (!IconComponent) {
    // Fallback icon if the specified one is not found
    const FallbackIcon = LucideIcons.HelpCircle;
    return <FallbackIcon {...props} />;
  }

  return <IconComponent {...props} />;
};
