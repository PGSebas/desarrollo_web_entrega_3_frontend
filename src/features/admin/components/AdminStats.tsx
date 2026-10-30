'use client';

import React from 'react';
import { Pedido } from '@/features/pedidos/domain/pedido';
import { Perfume } from '@/features/perfumes/domain/perfume';

interface AdminStatsProps {
  pedidos: Pedido[];
  perfumes: Perfume[];
}

export function AdminStats({ pedidos, perfumes }: AdminStatsProps) {
  const totalIngresos = pedidos.reduce((acc, p) => {
    const precio = p.perfume?.precio || 0;
    return acc + precio * p.cantidad;
  }, 0);

  const formattedIngresos = new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    maximumFractionDigits: 0,
  }).format(totalIngresos);

  const pedidosPendientes = pedidos.filter((p) => p.estado === 'PENDIENTE').length;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {/* Total Facturado */}
      <div className="bg-card border border-border/50 rounded-xl p-5 shadow-sm">
        <span className="text-[11px] font-semibold uppercase tracking-wider text-foreground-muted block mb-1">
          Ventas Totales
        </span>
        <div className="font-serif text-2xl font-bold text-accent">
          {formattedIngresos}
        </div>
        <span className="text-[10px] text-foreground-muted mt-1 block">
          Calculado sobre {pedidos.length} pedidos
        </span>
      </div>

      {/* Pedidos Totales */}
      <div className="bg-card border border-border/50 rounded-xl p-5 shadow-sm">
        <span className="text-[11px] font-semibold uppercase tracking-wider text-foreground-muted block mb-1">
          Pedidos Registrados
        </span>
        <div className="font-serif text-2xl font-bold text-foreground">
          {pedidos.length}
        </div>
        <span className="text-[10px] text-amber-400 mt-1 block">
          {pedidosPendientes} pendientes de despacho
        </span>
      </div>

      {/* Catálogo Activo */}
      <div className="bg-card border border-border/50 rounded-xl p-5 shadow-sm">
        <span className="text-[11px] font-semibold uppercase tracking-wider text-foreground-muted block mb-1">
          Fragancias en Catálogo
        </span>
        <div className="font-serif text-2xl font-bold text-foreground">
          {perfumes.length}
        </div>
        <span className="text-[10px] text-foreground-muted mt-1 block">
          Nicho y Diseñador activas
        </span>
      </div>

      {/* Stock Total */}
      <div className="bg-card border border-border/50 rounded-xl p-5 shadow-sm">
        <span className="text-[11px] font-semibold uppercase tracking-wider text-foreground-muted block mb-1">
          Unidades en Stock
        </span>
        <div className="font-serif text-2xl font-bold text-foreground">
          {perfumes.reduce((acc, p) => acc + (p.stock || 0), 0)}
        </div>
        <span className="text-[10px] text-emerald-400 mt-1 block">
          Disponibles para venta inmediata
        </span>
      </div>
    </div>
  );
}