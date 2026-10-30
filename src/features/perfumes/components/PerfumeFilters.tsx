'use client';

import React from 'react';
import { Input } from '@/features/common/components/Input';
import { Button } from '@/features/common/components/Button';

interface PerfumeFiltersProps {
  search: string;
  category: string;
  type: string;
  priceRange: string;
  onSearchChange: (value: string) => void;
  onCategoryChange: (category: string) => void;
  onTypeChange: (type: string) => void;
  onPriceRangeChange: (priceRange: string) => void;
  onReset: () => void;
}

export function PerfumeFilters({
  search,
  category,
  type,
  priceRange,
  onSearchChange,
  onCategoryChange,
  onTypeChange,
  onPriceRangeChange,
  onReset,
}: PerfumeFiltersProps) {
  const categories: { label: string; value: string }[] = [
    { label: 'Todos', value: '' },
    { label: 'Hombres', value: 'hombres' },
    { label: 'Mujeres', value: 'mujeres' },
    { label: 'Unisex', value: 'unisex' },
  ];

  const types: { label: string; value: string }[] = [
    { label: 'Todos los segmentos', value: '' },
    { label: 'Nicho Exclusivo', value: 'nicho' },
    { label: 'Diseñador', value: 'disenador' },
  ];

  const priceRanges: { label: string; value: string }[] = [
    { label: 'Cualquier precio', value: '' },
    { label: 'Menos de $1.000.000', value: 'under-1m' },
    { label: '$1.000.000 - $1.500.000', value: '1m-1.5m' },
    { label: 'Más de $1.500.000', value: 'over-1.5m' },
  ];

  const hasActiveFilters = Boolean(search || category || type || priceRange);

  return (
    <div className="bg-card/70 backdrop-blur-md border border-border/50 rounded-2xl p-4 sm:p-6 mb-8 shadow-sm space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
        {/* Búsqueda de texto */}
        <div>
          <Input
            id="perfume-search-input"
            label="Buscar fragancia o marca"
            placeholder="Ej: Aventus, Sauvage..."
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>

        {/* Categoría */}
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-foreground-muted mb-1.5">
            Colección
          </label>
          <div className="flex flex-wrap gap-1">
            {categories.map((c) => {
              const active = category === c.value;
              return (
                <button
                  key={c.value}
                  type="button"
                  onClick={() => onCategoryChange(c.value)}
                  className={`px-2.5 py-1 text-xs font-medium rounded-lg transition-colors border ${
                    active
                      ? 'bg-accent text-accent-foreground border-accent font-semibold shadow-xs'
                      : 'bg-secondary text-secondary-foreground border-border/40 hover:border-accent/40'
                  }`}
                >
                  {c.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Tipo / Segmento */}
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-foreground-muted mb-1.5">
            Segmento
          </label>
          <select
            value={type}
            onChange={(e) => onTypeChange(e.target.value)}
            className="w-full px-3 py-2 text-xs rounded-lg border border-border/50 bg-background text-foreground focus:outline-hidden focus:ring-1 focus:ring-accent transition-colors"
          >
            {types.map((t) => (
              <option key={t.value} value={t.value}>
                {t.label}
              </option>
            ))}
          </select>
        </div>

        {/* Rango de Precio (Bonus) */}
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-foreground-muted mb-1.5">
            Rango de Precio
          </label>
          <div className="flex items-center gap-2">
            <select
              value={priceRange}
              onChange={(e) => onPriceRangeChange(e.target.value)}
              className="w-full px-3 py-2 text-xs rounded-lg border border-border/50 bg-background text-foreground focus:outline-hidden focus:ring-1 focus:ring-accent transition-colors"
            >
              {priceRanges.map((pr) => (
                <option key={pr.value} value={pr.value}>
                  {pr.label}
                </option>
              ))}
            </select>

            {hasActiveFilters && (
              <Button
                variant="ghost"
                size="sm"
                onClick={onReset}
                className="text-xs text-foreground-muted hover:text-foreground shrink-0"
              >
                Limpiar
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}