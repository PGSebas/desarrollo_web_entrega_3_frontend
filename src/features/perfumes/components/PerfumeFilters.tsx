'use client';

import React from 'react';
import { Input } from '@/features/common/components/Input';
import { Button } from '@/features/common/components/Button';

interface PerfumeFiltersProps {
  search: string;
  category: string;
  type: string;
  onSearchChange: (value: string) => void;
  onCategoryChange: (category: string) => void;
  onTypeChange: (type: string) => void;
  onReset: () => void;
}

export function PerfumeFilters({
  search,
  category,
  type,
  onSearchChange,
  onCategoryChange,
  onTypeChange,
  onReset,
}: PerfumeFiltersProps) {
  const categories: { label: string; value: string }[] = [
    { label: 'Todos', value: '' },
    { label: 'Hombres', value: 'hombres' },
    { label: 'Mujeres', value: 'mujeres' },
    { label: 'Unisex', value: 'unisex' },
  ];

  const types: { label: string; value: string }[] = [
    { label: 'Todos los tipos', value: '' },
    { label: 'Nicho Exclusivo', value: 'nicho' },
    { label: 'Diseñador', value: 'disenador' },
  ];

  const hasActiveFilters = Boolean(search || category || type);

  return (
    <div className="bg-card/70 backdrop-blur-md border border-border/50 rounded-2xl p-4 sm:p-6 mb-8 shadow-sm space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
        {/* Búsqueda de texto */}
        <div className="md:col-span-1">
          <Input
            id="perfume-search-input"
            label="Buscar fragancia o marca"
            placeholder="Ej: Aventus, Baccarat, Sauvage..."
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>

        {/* Categoría */}
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-foreground-muted mb-1.5">
            Colección
          </label>
          <div className="flex flex-wrap gap-1.5">
            {categories.map((c) => {
              const active = category === c.value;
              return (
                <button
                  key={c.value}
                  type="button"
                  onClick={() => onCategoryChange(c.value)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors border ${
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

        {/* Tipo y Reset */}
        <div className="flex items-center gap-2">
          <div className="flex-1">
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

          {hasActiveFilters && (
            <div className="pt-5">
              <Button
                variant="ghost"
                size="sm"
                onClick={onReset}
                className="text-xs text-foreground-muted hover:text-foreground"
              >
                Limpiar
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}