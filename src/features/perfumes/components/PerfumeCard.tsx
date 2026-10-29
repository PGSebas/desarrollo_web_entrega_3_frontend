'use client';

import React from 'react';
import { Perfume } from '../domain/perfume';
import { Badge } from '@/features/common/components/Badge';
import { Button } from '@/features/common/components/Button';

interface PerfumeCardProps {
  perfume: Perfume;
  onSelect?: (perfume: Perfume) => void;
  onQuickOrder?: (perfume: Perfume) => void;
}

export function PerfumeCard({ perfume, onSelect, onQuickOrder }: PerfumeCardProps) {
  const formattedPrice = new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    maximumFractionDigits: 0,
  }).format(perfume.precio);

  const categoryLabel: Record<string, string> = {
    hombres: 'Hombre',
    mujeres: 'Mujer',
    unisex: 'Unisex',
  };

  const typeLabel: Record<string, string> = {
    nicho: 'Alta Gama Nicho',
    disenador: 'Diseñador',
  };

  return (
    <article className="group relative flex flex-col bg-card border border-border/50 rounded-xl overflow-hidden hover:border-accent/60 transition-all duration-300 hover:shadow-xl hover:shadow-accent/5">
      {/* Imagen del perfume */}
      <div className="relative w-full h-72 bg-muted/20 overflow-hidden">
        <img
          src={perfume.imagenUrl}
          alt={perfume.nombre}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
          loading="lazy"
        />
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
          <Badge variant={perfume.categoria === 'unisex' ? 'gold' : 'neutral'}>
            {categoryLabel[perfume.categoria] || perfume.categoria}
          </Badge>
          <Badge variant="outline">
            {typeLabel[perfume.tipo] || perfume.tipo}
          </Badge>
        </div>
        {perfume.stock <= 3 && perfume.stock > 0 && (
          <div className="absolute top-3 right-3">
            <Badge variant="danger">¡Últimas {perfume.stock} uds!</Badge>
          </div>
        )}
        {perfume.stock === 0 && (
          <div className="absolute inset-0 bg-background/80 backdrop-blur-xs flex items-center justify-center">
            <Badge variant="danger" className="text-sm px-3 py-1">Agotado</Badge>
          </div>
        )}
      </div>

      {/* Contenido de la tarjeta */}
      <div className="flex flex-col flex-1 p-5">
        <div className="mb-1">
          <span className="text-xs font-semibold tracking-wider text-accent uppercase">
            {perfume.marca}
          </span>
          <h3 className="font-serif text-lg font-bold text-foreground line-clamp-1 group-hover:text-accent transition-colors">
            {perfume.nombre}
          </h3>
        </div>

        <p className="text-xs text-foreground-muted line-clamp-2 mb-3 min-h-[2rem]">
          {perfume.descripcion}
        </p>

        {/* Notas Olfativas */}
        {perfume.notasOlfativas && perfume.notasOlfativas.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-4">
            {perfume.notasOlfativas.slice(0, 3).map((nota, idx) => (
              <span
                key={idx}
                className="text-[10px] bg-secondary text-secondary-foreground px-2 py-0.5 rounded-full border border-border/30"
              >
                {nota}
              </span>
            ))}
          </div>
        )}

        <div className="mt-auto pt-3 border-t border-border/40 flex items-center justify-between">
          <div>
            <span className="text-[11px] block text-foreground-muted uppercase tracking-wider">
              {perfume.volumenMl} ml · Extrait
            </span>
            <span className="font-serif text-base font-bold text-foreground">
              {formattedPrice}
            </span>
          </div>

          <Button
            size="sm"
            variant="primary"
            disabled={perfume.stock === 0}
            onClick={() => onQuickOrder ? onQuickOrder(perfume) : onSelect?.(perfume)}
            className="text-xs tracking-wide"
          >
            {perfume.stock === 0 ? 'Sin stock' : 'Ordenar'}
          </Button>
        </div>
      </div>
    </article>
  );
}