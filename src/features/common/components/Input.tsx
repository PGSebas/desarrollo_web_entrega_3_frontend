import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  required?: boolean;
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  required,
  id,
  className = '',
  ...props
}) => {
  const inputId = id || props.name || Math.random().toString(36).substring(7);

  return (
    <div className="flex flex-col gap-1.5 w-full">
      <label htmlFor={inputId} className="text-sm font-semibold flex items-center gap-1">
        {label}
        {required && <span className="text-[#8B0E1A]" aria-hidden="true">*</span>}
      </label>
      <input
        id={inputId}
        className={`w-full px-3.5 py-2.5 text-sm rounded bg-[var(--bg-main)] border ${
          error ? 'border-red-500 focus:ring-1 focus:ring-red-500' : 'border-[var(--border-subtle)] focus:border-[#8B0E1A]'
        } focus:outline-none transition-colors ${className}`}
        aria-invalid={error ? 'true' : undefined}
        {...props}
      />
      {error && (
        <span className="text-xs text-red-400 font-medium min-h-[1.1rem]" role="alert">
          {error}
        </span>
      )}
    </div>
  );
};
