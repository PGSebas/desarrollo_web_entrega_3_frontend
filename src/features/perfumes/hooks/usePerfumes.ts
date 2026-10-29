'use client';

import { useState, useEffect, useCallback } from 'react';
import { Perfume, PerfumeFilters, PaginatedPerfumes } from '../domain/perfume';
import { perfumeService } from '../services/perfumeService';

export function usePerfumes(initialFilters: PerfumeFilters = {}) {
  const [data, setData] = useState<PaginatedPerfumes | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<PerfumeFilters>(initialFilters);

  const fetchPerfumes = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await perfumeService.getAll(filters);
      setData(response);
    } catch (err: any) {
      setError(err?.message || 'No fue posible cargar el catálogo de fragancias.');
    } finally {
      setIsLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    fetchPerfumes();
  }, [fetchPerfumes]);

  const updateFilters = (newFilters: Partial<PerfumeFilters>) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
  };

  return {
    perfumes: data?.data || [],
    pagination: data?.pagination || { page: 1, limit: 8, total: 0, totalPages: 1 },
    isLoading,
    error,
    refetch: fetchPerfumes,
    filters,
    updateFilters,
  };
}
