'use client';

import React, { useEffect, useState, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Navbar } from '@/features/common/components/Navbar';
import { Footer } from '@/features/common/components/Footer';
import { ProtectedRoute } from '@/features/auth/components/ProtectedRoute';
import { PedidoForm } from '@/features/pedidos/components/PedidoForm';
import { perfumeService } from '@/features/perfumes/services/perfumeService';
import { Perfume } from '@/features/perfumes/domain/perfume';
import { Button } from '@/features/common/components/Button';

function NuevoPedidoContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const perfumeIdParam = searchParams.get('perfumeId');
  const [perfume, setPerfume] = useState<Perfume | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!perfumeIdParam) {
      setError('No se especificó ninguna fragancia para realizar el pedido.');
      setIsLoading(false);
      return;
    }

    const id = parseInt(perfumeIdParam, 10);
    if (isNaN(id)) {
      setError('Identificador de fragancia inválido.');
      setIsLoading(false);
      return;
    }

    perfumeService
      .getById(id)
      .then((data) => {
        setPerfume(data);
      })
      .catch((err) => {
        setError(err?.message || 'No fue posible encontrar la fragancia seleccionada.');
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [perfumeIdParam]);

  if (isLoading) {
    return (
      <div className="min-h-[50vh] flex flex-col items-center justify-center">
        <div className="w-8 h-8 border-2 border-accent border-t-transparent rounded-full animate-spin mb-4" />
        <p className="text-xs text-foreground-muted">Preparando orden de alta perfumería...</p>
      </div>
    );
  }

  if (error || !perfume) {
    return (
      <div className="max-w-md mx-auto my-12 p-8 bg-card border border-border/50 rounded-2xl text-center space-y-4">
        <h3 className="font-serif text-xl font-bold text-foreground">Fragancia no disponible</h3>
        <p className="text-xs text-foreground-muted">{error || 'La fragancia solicitada no existe.'}</p>
        <Button variant="primary" size="sm" onClick={() => router.push('/#catalogo')}>
          Volver al Catálogo
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <PedidoForm perfume={perfume} />
    </div>
  );
}

export default function NuevoPedidoPage() {
  return (
    <ProtectedRoute>
      <div className="min-h-screen flex flex-col bg-background text-foreground">
        <Navbar />
        <main className="flex-1">
          <Suspense fallback={<div className="text-center py-20 text-xs text-foreground-muted">Cargando...</div>}>
            <NuevoPedidoContent />
          </Suspense>
        </main>
        <Footer />
      </div>
    </ProtectedRoute>
  );
}