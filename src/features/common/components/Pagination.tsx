'use client';

import React from 'react';
import Link from 'next/link';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  basePath?: string;
}

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  basePath = '',
}) => {
  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <nav className="flex items-center justify-center gap-2 mt-8" aria-label="Navegación de páginas">
      <Link
        href={`${basePath}?page=${Math.max(1, currentPage - 1)}`}
        className={`px-3 py-1.5 text-sm rounded border border-[var(--border-subtle)] transition-colors ${
          currentPage === 1 ? 'opacity-40 pointer-events-none' : 'hover:border-[#6A1B9A] hover:bg-[#6A1B9A]/10'
        }`}
        aria-label="Página anterior"
      >
        &larr; Anterior
      </Link>

      {pages.map((p) => (
        <Link
          key={p}
          href={`${basePath}?page=${p}`}
          className={`w-9 h-9 flex items-center justify-center text-sm rounded border font-semibold transition-all ${
            p === currentPage
              ? 'bg-[#8B0E1A] border-[#8B0E1A] text-white shadow-md'
              : 'border-[var(--border-subtle)] hover:border-[#6A1B9A] hover:bg-[#6A1B9A]/10'
          }`}
          aria-current={p === currentPage ? 'page' : undefined}
        >
          {p}
        </Link>
      ))}

      <Link
        href={`${basePath}?page=${Math.min(totalPages, currentPage + 1)}`}
        className={`px-3 py-1.5 text-sm rounded border border-[var(--border-subtle)] transition-colors ${
          currentPage === totalPages ? 'opacity-40 pointer-events-none' : 'hover:border-[#6A1B9A] hover:bg-[#6A1B9A]/10'
        }`}
        aria-label="Página siguiente"
      >
        Siguiente &rarr;
      </Link>
    </nav>
  );
};
