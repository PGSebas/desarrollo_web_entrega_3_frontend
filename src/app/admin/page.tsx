'use client';

import React, { useState } from 'react';
import { Navbar } from '@/features/common/components/Navbar';
import { Footer } from '@/features/common/components/Footer';
import { ProtectedRoute } from '@/features/auth/components/ProtectedRoute';
import { useAdminData } from '@/features/admin/hooks/useAdminData';
import { AdminStats } from '@/features/admin/components/AdminStats';
import { AdminPedidosTable } from '@/features/admin/components/AdminPedidosTable';
import { AdminPerfumesTable } from '@/features/admin/components/AdminPerfumesTable';
import { Button } from '@/features/common/components/Button';

function AdminDashboardContent() {
  const { pedidos, perfumes, isLoading, error, refetch, deletePerfume, savePerfume } = useAdminData();
  const [activeTab, setActiveTab] = useState<'pedidos' | 'perfumes'>('pedidos');

  if (isLoading) {
    return (
      <div className="min-h-[50vh] flex flex-col items-center justify-center">
        <div className="w-8 h-8 border-2 border-accent border-t-transparent rounded-full animate-spin mb-4" />
        <p className="text-xs text-foreground-muted">Cargando panel de administración...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-md mx-auto my-12 p-8 bg-card border border-border/50 rounded-2xl text-center space-y-4">
        <h3 className="font-serif text-xl font-bold text-foreground">Error al cargar datos</h3>
        <p className="text-xs text-foreground-muted">{error}</p>
        <Button variant="primary" size="sm" onClick={() => refetch()}>
          Reintentar
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Encabezado del Panel */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 mb-8 border-b border-border/40 gap-4">
        <div>
          <span className="text-xs uppercase tracking-[0.25em] text-accent font-semibold block mb-1">
            Panel de Control Exclusivo
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-foreground">
            Administración Noiré
          </h1>
        </div>

        {/* Pestañas */}
        <div className="flex gap-2 bg-secondary/50 p-1 rounded-xl border border-border/40">
          <button
            type="button"
            onClick={() => setActiveTab('pedidos')}
            className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors ${
              activeTab === 'pedidos'
                ? 'bg-accent text-accent-foreground shadow-sm'
                : 'text-foreground-muted hover:text-foreground'
            }`}
          >
            Pedidos ({pedidos.length})
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('perfumes')}
            className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors ${
              activeTab === 'perfumes'
                ? 'bg-accent text-accent-foreground shadow-sm'
                : 'text-foreground-muted hover:text-foreground'
            }`}
          >
            Catálogo ({perfumes.length})
          </button>
        </div>
      </div>

      {/* Métricas Generales */}
      <AdminStats pedidos={pedidos} perfumes={perfumes} />

      {/* Contenido según Pestaña */}
      {activeTab === 'pedidos' ? (
        <AdminPedidosTable pedidos={pedidos} />
      ) : (
        <AdminPerfumesTable
          perfumes={perfumes}
          onDelete={deletePerfume}
          onSave={savePerfume}
        />
      )}
    </div>
  );
}

export default function AdminPage() {
  return (
    <ProtectedRoute adminOnly={true}>
      <div className="min-h-screen flex flex-col bg-background text-foreground">
        <Navbar />
        <main className="flex-1">
          <AdminDashboardContent />
        </main>
        <Footer />
      </div>
    </ProtectedRoute>
  );
}