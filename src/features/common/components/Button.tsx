import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  className = '',
  disabled,
  ...props
}) => {
  const baseClasses = 'inline-flex items-center justify-center font-medium rounded transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none';

  const sizeClasses = {
    sm: 'px-3 py-1.5 text-xs',
    md: 'px-5 py-2.5 text-sm',
    lg: 'px-6 py-3 text-base',
  };

  const variantClasses = {
    primary: 'bg-[#8B0E1A] hover:bg-[#A81524] text-white shadow-md hover:shadow-lg hover:-translate-y-0.5',
    secondary: 'bg-transparent border border-[#E5C6F0] text-current hover:bg-[#6A1B9A]/20',
    danger: 'bg-red-800 hover:bg-red-700 text-white',
    outline: 'border border-current bg-transparent hover:bg-white/10',
    ghost: 'bg-transparent hover:bg-white/10 text-current',
  };

  return (
    <button
      className={`${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${className}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <span className="flex items-center gap-2">
          <svg className="animate-spin h-4 w-4 text-current" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
          </svg>
          Procesando...
        </span>
      ) : (
        children
      )}
    </button>
  );
};