'use client';

import React, { useState } from 'react';
import { Pedido } from '@/features/pedidos/domain/pedido';
import { Badge } from '@/features/common/components/Badge';

interface AdminPedidosTableProps {
  pedidos: Pedido[];
}

export function AdminPedidosTable({ pedidos }: AdminPedidosTableProps) {
  const [filter, setFilter] = useState<string>('TODOS');

  const filteredPedidos = pedidos.filter((p) => {
    if (filter === 'TODOS') return true;
    return p.estado === filter;
  });

  const getStatusVariant = (estado: string) => {
    switch (estado.toUpperCase()) {
      case 'CONFIRMADO':
        return 'status-confirmed';
      case 'CANCELADO':
        return 'status-cancelled';
      case 'PENDIENTE':
      default:
        return 'status-pending';
    }
  };

  return (
    <div className="bg-card border border-border/50 rounded-2xl overflow-hidden shadow-sm">
      <div className="p-5 border-b border-border/40 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="font-serif text-xl font-bold text-foreground">
            Gestión Global de Pedidos
          </h3>
          <p className="text-xs text-foreground-muted">
            Histórico completo de solicitudes recibidas en la plataforma
          </p>
        </div>

        <div className="flex gap-2">
          {['TODOS', 'PENDIENTE', 'CONFIRMADO', 'CANCELADO'].map((st) => (
            <button
              key={st}
              onClick={() => setFilter(st)}
              className={`px-2.5 py-1 text-xs rounded-lg border transition-colors ${
                filter === st
                  ? 'bg-accent text-accent-foreground border-accent font-semibold'
                  : 'bg-secondary text-secondary-foreground border-border/40 hover:border-accent/40'
              }`}
            >
              {st === 'TODOS' ? 'Todos' : st}
            </button>
          ))}
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead className="bg-secondary/40 text-foreground-muted uppercase tracking-wider text-[10px] border-b border-border/30">
            <tr>
              <th className="py-3 px-4 font-semibold">ID</th>
              <th className="py-3 px-4 font-semibold">Cliente</th>
              <th className="py-3 px-4 font-semibold">Fragancia</th>
              <th className="py-3 px-4 font-semibold text-center">Cant.</th>
              <th className="py-3 px-4 font-semibold text-right">Total</th>
              <th className="py-3 px-4 font-semibold">Destino</th>
              <th className="py-3 px-4 font-semibold text-center">Estado</th>
              <th className="py-3 px-4 font-semibold">Fecha</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/20">
            {filteredPedidos.length === 0 ? (
              <tr>
                <td colSpan={8} className="py-8 text-center text-foreground-muted">
                  No hay pedidos en este estado.
                </td>
              </tr>
            ) : (
              filteredPedidos.map((p) => {
                const total = (p.perfume?.precio || 0) * p.cantidad;
                const formattedTotal = new Intl.NumberFormat('es-CO', {
                  style: 'currency',
                  currency: 'COP',
                  maximumFractionDigits: 0,
                }).format(total);

                const date = p.createdAt
                  ? new Date(p.createdAt).toLocaleDateString('es-CO', {
                      day: '2-digit',
                      month: '2-digit',
                      year: '2-digit',
                    })
                  : '-';

                return (
                  <tr key={p.id} className="hover:bg-secondary/20 transition-colors">
                    <td className="py-3.5 px-4 font-mono font-medium text-foreground">
                      #{p.id.toString().padStart(4, '0')}
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="font-semibold text-foreground">
                        {p.user?.name || `Usuario #${p.userId}`}
                      </div>
                      <div className="text-[10px] text-foreground-muted">
                        {p.user?.email || p.telefono || 'Sin email'}
                      </div>
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="font-medium text-foreground">
                        {p.perfume?.nombre || `Fragancia #${p.perfumeId}`}
                      </div>
                      <div className="text-[10px] text-accent uppercase">
                        {p.perfume?.marca || 'Noiré'}
                      </div>
                    </td>
                    <td className="py-3.5 px-4 text-center font-semibold">
                      {p.cantidad}
                    </td>
                    <td className="py-3.5 px-4 text-right font-serif font-bold text-foreground">
                      {formattedTotal}
                    </td>
                    <td className="py-3.5 px-4 max-w-[180px] truncate text-foreground-muted">
                      {p.direccionEnvio}
                    </td>
                    <td className="py-3.5 px-4 text-center">
                      <Badge variant={getStatusVariant(p.estado) as any}>
                        {p.estado}
                      </Badge>
                    </td>
                    <td className="py-3.5 px-4 text-foreground-muted">
                      {date}
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}