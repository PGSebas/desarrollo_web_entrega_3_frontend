'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Navbar } from '@/features/common/components/Navbar';
import { Hero } from '@/features/common/components/Hero';
import { Footer } from '@/features/common/components/Footer';
import { PerfumeFilters } from '@/features/perfumes/components/PerfumeFilters';
import { PerfumeGrid } from '@/features/perfumes/components/PerfumeGrid';
import { PerfumeGridSkeleton } from '@/features/perfumes/components/PerfumeSkeleton';
import { Pagination } from '@/features/common/components/Pagination';
import { Button } from '@/features/common/components/Button';
import { usePerfumes } from '@/features/perfumes/hooks/usePerfumes';
import { Perfume } from '@/features/perfumes/domain/perfume';

function CatalogContent() {
  const searchParams = useSearchParams();
  const catParam = searchParams.get('cat') || '';

  const [search, setSearch] = useState('');
  const [category, setCategory] = useState(catParam);
  const [type, setType] = useState('');
  const [page, setPage] = useState(1);
  const limit = 8;

  // Actualizar categoría si cambia en URL
  useEffect(() => {
    if (catParam) {
      setCategory(catParam);
      setPage(1);
    }
  }, [catParam]);

  const { perfumes, pagination, isLoading, error, refetch } = usePerfumes({
    page,
    limit,
    categoria: category || undefined,
    tipo: type || undefined,
    search: search || undefined,
  });

  const handleSearchChange = (val: string) => {
    setSearch(val);
    setPage(1);
  };

  const handleCategoryChange = (val: string) => {
    setCategory(val);
    setPage(1);
  };

  const handleTypeChange = (val: string) => {
    setType(val);
    setPage(1);
  };

  const handleResetFilters = () => {
    setSearch('');
    setCategory('');
    setType('');
    setPage(1);
  };

  const handleQuickOrder = (perfume: Perfume) => {
    const token = localStorage.getItem('noire_token');
    if (!token) {
      alert(`Para ordenar ${perfume.nombre}, por favor inicia sesión o crea una cuenta.`);
      window.location.href = '/login';
      return;
    }
    window.location.href = `/pedidos/nuevo?perfumeId=${perfume.id}`;
  };

  return (
    <section id="catalogo" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 scroll-mt-24">
      {/* Título de sección */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-4 border-b border-border/40 gap-4">
        <div>
          <span className="text-xs uppercase tracking-[0.25em] text-accent font-semibold block mb-1">
            Catálogo Oficial
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-foreground">
            Colección Selecta
          </h2>
        </div>

        {pagination && (
          <p className="text-xs text-foreground-muted">
            Mostrando <span className="font-semibold text-foreground">{perfumes.length}</span> de{' '}
            <span className="font-semibold text-foreground">{pagination.total}</span> fragancias
          </p>
        )}
      </div>

      {/* Barra de filtros */}
      <PerfumeFilters
        search={search}
        category={category}
        type={type}
        onSearchChange={handleSearchChange}
        onCategoryChange={handleCategoryChange}
        onTypeChange={handleTypeChange}
        onReset={handleResetFilters}
      />

      {/* Estado: Error */}
      {error && (
        <div className="p-6 mb-8 rounded-xl bg-danger/10 border border-danger/30 text-danger flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h4 className="font-semibold text-sm">Error al cargar las fragancias</h4>
            <p className="text-xs opacity-90 mt-0.5">{error}</p>
          </div>
          <Button variant="outline" size="sm" onClick={() => refetch()} className="border-danger/40 text-danger hover:bg-danger/10">
            Reintentar
          </Button>
        </div>
      )}

      {/* Estado: Cargando */}
      {isLoading && <PerfumeGridSkeleton count={8} />}

      {/* Estado: Vacío */}
      {!isLoading && !error && perfumes.length === 0 && (
        <div className="py-20 text-center bg-card/40 rounded-2xl border border-dashed border-border/60 p-8">
          <div className="w-12 h-12 rounded-full bg-secondary text-foreground-muted mx-auto flex items-center justify-center mb-4">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <h3 className="font-serif text-xl font-bold text-foreground mb-1">
            No se encontraron fragancias
          </h3>
          <p className="text-xs text-foreground-muted max-w-sm mx-auto mb-6">
            No hay perfumes que coincidan con los filtros aplicados. Prueba ajustando tu búsqueda o categoría.
          </p>
          <Button variant="outline" size="sm" onClick={handleResetFilters}>
            Restablecer Filtros
          </Button>
        </div>
      )}

      {/* Estado: Con datos */}
      {!isLoading && !error && perfumes.length > 0 && (
        <div className="space-y-12">
          <PerfumeGrid perfumes={perfumes} onQuickOrder={handleQuickOrder} />

          {/* Paginación */}
          {pagination && pagination.totalPages > 1 && (
            <div className="pt-6 border-t border-border/30 flex justify-center">
              <Pagination
                currentPage={pagination.page}
                totalPages={pagination.totalPages}
                onPageChange={(p: number) => {
                  setPage(p);
                  const el = document.getElementById('catalogo');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
              />
            </div>
          )}
        </div>
      )}
    </section>
  );
}

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <Suspense fallback={<div className="max-w-7xl mx-auto px-4 py-16"><PerfumeGridSkeleton count={8} /></div>}>
          <CatalogContent />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}