import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'white';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  className = '',
  ...props
}) => {
  const baseStyles = "inline-flex items-center justify-center font-bold uppercase tracking-wider rounded-full transition-all duration-200 whitespace-nowrap";
  
  const variants = {
    primary: "bg-brand-green text-brand-primary hover:bg-opacity-90",
    white: "bg-white text-brand-primary hover:bg-gray-100",
    secondary: "bg-brand-primary text-white hover:bg-opacity-90",
    outline: "bg-transparent border border-white text-white hover:bg-white hover:text-brand-primary"
  };
  
  const sizes = {
    sm: "px-4 py-2 text-[10px]",
    md: "px-6 py-3 text-[11px] sm:text-xs",
    lg: "px-8 py-4 text-xs sm:text-sm"
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${fullWidth ? 'w-full' : ''} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
