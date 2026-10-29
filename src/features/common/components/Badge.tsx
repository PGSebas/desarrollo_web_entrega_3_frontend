import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'nicho' | 'disenador' | 'status-pending' | 'status-confirmed' | 'status-cancelled';
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({ children, variant = 'disenador', className = '' }) => {
  const variantStyles = {
    disenador: 'bg-black/60 border border-[var(--border-subtle)] text-white',
    nicho: 'bg-purple-950/70 border border-purple-500 text-purple-200',
    'status-pending': 'bg-amber-950/50 border border-amber-500 text-amber-200',
    'status-confirmed': 'bg-emerald-950/50 border border-emerald-500 text-emerald-200',
    'status-cancelled': 'bg-rose-950/50 border border-rose-500 text-rose-200',
  };

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded text-[11px] font-bold tracking-wider uppercase backdrop-blur-sm ${variantStyles[variant]} ${className}`}
    >
      {children}
    </span>
  );
};
