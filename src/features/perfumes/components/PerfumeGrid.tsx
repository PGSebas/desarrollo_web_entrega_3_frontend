import React from 'react';
import { Perfume } from '../domain/perfume';
import { PerfumeCard } from './PerfumeCard';

interface PerfumeGridProps {
  perfumes: Perfume[];
  onSelect?: (perfume: Perfume) => void;
  onQuickOrder?: (perfume: Perfume) => void;
}

export function PerfumeGrid({ perfumes, onSelect, onQuickOrder }: PerfumeGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {perfumes.map((perfume) => (
        <PerfumeCard
          key={perfume.id}
          perfume={perfume}
          onSelect={onSelect}
          onQuickOrder={onQuickOrder}
        />
      ))}
    </div>
  );
}