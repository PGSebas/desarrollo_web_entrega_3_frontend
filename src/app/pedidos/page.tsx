'use client';

import React from 'react';
import { Navbar } from '@/features/common/components/Navbar';
import { Footer } from '@/features/common/components/Footer';
import { ProtectedRoute } from '@/features/auth/components/ProtectedRoute';
import { PedidoList } from '@/features/pedidos/components/PedidoList';
import Link from 'next/link';
import { Button } from '@/features/common/components/Button';

export default function PedidosPage() {
  return (
    <ProtectedRoute>
      <div className="min-h-screen flex flex-col bg-background text-foreground">
        <Navbar />
        <main className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Encabezado */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 mb-8 border-b border-border/40 gap-4">
            <div>
              <span className="text-xs uppercase tracking-[0.25em] text-accent font-semibold block mb-1">
                Seguimiento
              </span>
              <h1 className="font-serif text-3xl font-bold text-foreground">
                Mis Pedidos Exclusivos
              </h1>
            </div>

            <Link href="/#catalogo">
              <Button variant="outline" size="sm" className="text-xs uppercase tracking-wider">
                Nueva Fragancia
              </Button>
            </Link>
          </div>

          {/* Lista de Pedidos */}
          <PedidoList />
        </main>
        <Footer />
      </div>
    </ProtectedRoute>
  );
}