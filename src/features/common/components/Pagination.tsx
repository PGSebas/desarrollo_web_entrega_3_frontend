'use client';

import React from 'react';
import Link from 'next/link';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  basePath?: string;
  onPageChange?: (page: number) => void;
}

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  basePath = '',
  onPageChange,
}) => {
  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  const renderItem = (p: number, label?: React.ReactNode, disabled?: boolean) => {
    const isCurrent = p === currentPage;
    const commonClass = `px-3 py-1.5 text-sm rounded border transition-colors ${
      isCurrent
        ? 'bg-[#8B0E1A] border-[#8B0E1A] text-white shadow-md font-semibold'
        : 'border-[var(--border-subtle)] hover:border-[#6A1B9A] hover:bg-[#6A1B9A]/10'
    } ${disabled ? 'opacity-40 pointer-events-none' : ''}`;

    if (onPageChange) {
      return (
        <button
          key={typeof label === 'string' ? `${label}-${p}` : p}
          type="button"
          onClick={() => onPageChange(p)}
          disabled={disabled}
          className={commonClass}
          aria-current={isCurrent ? 'page' : undefined}
        >
          {label ?? p}
        </button>
      );
    }

    return (
      <Link
        key={typeof label === 'string' ? `${label}-${p}` : p}
        href={`${basePath}?page=${p}`}
        className={commonClass}
        aria-current={isCurrent ? 'page' : undefined}
      >
        {label ?? p}
      </Link>
    );
  };

  return (
    <nav className="flex items-center justify-center gap-2 mt-8" aria-label="Navegación de páginas">
      {renderItem(Math.max(1, currentPage - 1), '← Anterior', currentPage === 1)}
      {pages.map((p) => renderItem(p))}
      {renderItem(Math.min(totalPages, currentPage + 1), 'Siguiente →', currentPage === totalPages)}
    </nav>
  );
};