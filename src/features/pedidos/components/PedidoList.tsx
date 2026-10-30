'use client';

import React from 'react';
import Link from 'next/link';
import { usePedidos } from '../hooks/usePedidos';
import { PedidoCard } from './PedidoCard';
import { Button } from '@/features/common/components/Button';

export function PedidoList() {
  const { pedidos, isLoading, error, refetch } = usePedidos();

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="bg-card border border-border/40 rounded-xl p-5 animate-pulse space-y-3"
          >
            <div className="flex justify-between">
              <div className="h-4 bg-muted/40 rounded w-28" />
              <div className="h-4 bg-muted/40 rounded w-16" />
            </div>
            <div className="flex gap-4">
              <div className="w-16 h-16 bg-muted/30 rounded-lg shrink-0" />
              <div className="flex-1 space-y-2">
                <div className="h-4 bg-muted/50 rounded w-1/3" />
                <div className="h-4 bg-muted/30 rounded w-1/2" />
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 rounded-xl bg-danger/10 border border-danger/30 text-danger text-center space-y-3">
        <p className="font-semibold text-sm">Error al cargar el historial</p>
        <p className="text-xs opacity-90">{error}</p>
        <Button variant="outline" size="sm" onClick={() => refetch()} className="border-danger/40 text-danger">
          Reintentar
        </Button>
      </div>
    );
  }

  if (pedidos.length === 0) {
    return (
      <div className="py-16 text-center bg-card/40 rounded-2xl border border-dashed border-border/60 p-8 space-y-4">
        <div className="w-12 h-12 rounded-full bg-secondary text-foreground-muted mx-auto flex items-center justify-center">
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
          </svg>
        </div>
        <h3 className="font-serif text-xl font-bold text-foreground">
          Aún no tienes pedidos registrados
        </h3>
        <p className="text-xs text-foreground-muted max-w-sm mx-auto">
          Explora nuestra colección selecta de alta perfumería y solicita tu primera fragancia exclusiva.
        </p>
        <Link href="/#catalogo">
          <Button variant="primary" size="md" className="uppercase tracking-wider text-xs">
            Explorar Colección
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {pedidos.map((pedido) => (
        <PedidoCard key={pedido.id} pedido={pedido} />
      ))}
    </div>
  );
}