'use client';

import React from 'react';
import Link from 'next/link';
import { Pedido } from '../domain/pedido';
import { Badge } from '@/features/common/components/Badge';

interface PedidoCardProps {
  pedido: Pedido;
}

export function PedidoCard({ pedido }: PedidoCardProps) {
  const formattedDate = pedido.createdAt
    ? new Date(pedido.createdAt).toLocaleDateString('es-CO', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : 'Fecha reciente';

  const unitPrice = pedido.perfume?.precio || 0;
  const totalPrice = unitPrice * pedido.cantidad;

  const formattedTotal = new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    maximumFractionDigits: 0,
  }).format(totalPrice);

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

  const getStatusLabel = (estado: string) => {
    switch (estado.toUpperCase()) {
      case 'CONFIRMADO':
        return 'Confirmado';
      case 'CANCELADO':
        return 'Cancelado';
      case 'PENDIENTE':
      default:
        return 'En Proceso';
    }
  };

  return (
    <div className="bg-card border border-border/50 rounded-xl p-5 hover:border-accent/40 transition-colors shadow-sm space-y-4">
      {/* Cabecera del pedido */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border/30 pb-3">
        <div>
          <span className="text-[11px] font-mono text-foreground-muted block">
            PEDIDO #{pedido.id.toString().padStart(4, '0')}
          </span>
          <span className="text-xs text-foreground-muted font-light">
            {formattedDate}
          </span>
        </div>

        <Badge variant={getStatusVariant(pedido.estado) as any}>
          {getStatusLabel(pedido.estado)}
        </Badge>
      </div>

      {/* Contenido: Perfume asociado */}
      <div className="flex items-center gap-4">
        {pedido.perfume?.imagenUrl ? (
          <img
            src={pedido.perfume.imagenUrl}
            alt={pedido.perfume.nombre}
            className="w-16 h-16 object-cover rounded-lg bg-muted/20 border border-border/30 shrink-0"
          />
        ) : (
          <div className="w-16 h-16 rounded-lg bg-secondary flex items-center justify-center shrink-0">
            <span className="text-xs text-foreground-muted">Noiré</span>
          </div>
        )}

        <div className="flex-1 min-w-0">
          <span className="text-[10px] font-semibold uppercase tracking-wider text-accent block">
            {pedido.perfume?.marca || 'Alta Perfumería'}
          </span>
          <h4 className="font-serif text-base font-bold text-foreground truncate">
            {pedido.perfume?.nombre || `Perfume #${pedido.perfumeId}`}
          </h4>
          <p className="text-xs text-foreground-muted">
            {pedido.cantidad} {pedido.cantidad === 1 ? 'unidad' : 'unidades'} · {pedido.perfume?.concentracion || 'Extrait de Parfum'}
          </p>
        </div>

        <div className="text-right">
          <span className="text-[10px] block text-foreground-muted uppercase">Total</span>
          <span className="font-serif text-base font-bold text-foreground">
            {formattedTotal}
          </span>
        </div>
      </div>

      {/* Detalles de Envío */}
      <div className="pt-3 border-t border-border/30 text-xs text-foreground-muted space-y-1">
        <div className="flex items-start gap-1">
          <span className="font-medium text-foreground">Destino:</span>
          <span className="truncate">{pedido.direccionEnvio}</span>
        </div>
        {pedido.telefono && (
          <div className="flex items-center gap-1">
            <span className="font-medium text-foreground">Contacto:</span>
            <span>{pedido.telefono}</span>
          </div>
        )}
        {pedido.mensaje && (
          <div className="mt-1 pt-1 border-t border-border/20 text-[11px] italic text-foreground-muted/80">
            &ldquo;{pedido.mensaje}&rdquo;
          </div>
        )}
      </div>
    </div>
  );
}