import React from 'react';

export type BadgeVariant =
  | 'nicho'
  | 'disenador'
  | 'status-pending'
  | 'status-confirmed'
  | 'status-cancelled'
  | 'admin'
  | 'user'
  | 'gold'
  | 'danger'
  | 'neutral'
  | 'outline';

interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({ children, variant = 'disenador', className = '' }) => {
  const variantStyles: Record<BadgeVariant, string> = {
    disenador: 'bg-black/60 border border-[var(--border-subtle)] text-white',
    nicho: 'bg-purple-950/70 border border-purple-500 text-purple-200',
    'status-pending': 'bg-amber-950/50 border border-amber-500 text-amber-200',
    'status-confirmed': 'bg-emerald-950/50 border border-emerald-500 text-emerald-200',
    'status-cancelled': 'bg-rose-950/50 border border-rose-500 text-rose-200',
    admin: 'bg-amber-500/10 border border-amber-500/40 text-amber-300 font-semibold',
    user: 'bg-blue-500/10 border border-blue-500/40 text-blue-300',
    gold: 'bg-accent/15 border border-accent/40 text-accent font-semibold',
    danger: 'bg-rose-500/15 border border-rose-500/40 text-rose-300 font-medium',
    neutral: 'bg-secondary text-secondary-foreground border border-border/40',
    outline: 'border border-border/60 text-foreground-muted bg-transparent',
  };

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded text-[11px] font-bold tracking-wider uppercase backdrop-blur-sm ${variantStyles[variant] || variantStyles.neutral} ${className}`}
    >
      {children}
    </span>
  );
};