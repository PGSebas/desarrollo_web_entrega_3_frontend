import React from 'react';

export function PerfumeSkeleton() {
  return (
    <div className="bg-card border border-border/40 rounded-xl overflow-hidden shadow-sm animate-pulse">
      <div className="w-full h-72 bg-muted/30" />
      <div className="p-5 space-y-3">
        <div className="flex justify-between items-center">
          <div className="h-4 bg-muted/40 rounded w-24" />
          <div className="h-4 bg-muted/40 rounded w-16" />
        </div>
        <div className="h-6 bg-muted/50 rounded w-3/4" />
        <div className="h-4 bg-muted/30 rounded w-full" />
        <div className="flex gap-2 pt-2">
          <div className="h-5 bg-muted/30 rounded-full w-14" />
          <div className="h-5 bg-muted/30 rounded-full w-14" />
        </div>
        <div className="flex justify-between items-center pt-4 border-t border-border/20">
          <div className="h-6 bg-muted/50 rounded w-28" />
          <div className="h-9 bg-muted/40 rounded-lg w-24" />
        </div>
      </div>
    </div>
  );
}

export function PerfumeGridSkeleton({ count = 8 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <PerfumeSkeleton key={i} />
      ))}
    </div>
  );
}