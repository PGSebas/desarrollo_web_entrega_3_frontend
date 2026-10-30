'use client';

import React, { useState } from 'react';
import { Perfume } from '@/features/perfumes/domain/perfume';
import { Badge } from '@/features/common/components/Badge';
import { Button } from '@/features/common/components/Button';
import { PerfumeModalForm } from './PerfumeModalForm';

interface AdminPerfumesTableProps {
  perfumes: Perfume[];
  onDelete: (id: number) => Promise<void>;
  onSave: (data: Partial<Perfume>, editId?: number) => Promise<any>;
}

export function AdminPerfumesTable({ perfumes, onDelete, onSave }: AdminPerfumesTableProps) {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedPerfume, setSelectedPerfume] = useState<Perfume | null>(null);
  const [deletingId, setDeletingId] = useState<number | null>(null);

  const handleCreate = () => {
    setSelectedPerfume(null);
    setModalOpen(true);
  };

  const handleEdit = (perfume: Perfume) => {
    setSelectedPerfume(perfume);
    setModalOpen(true);
  };

  const handleDelete = async (id: number, nombre: string) => {
    if (confirm(`¿Estás seguro de que deseas eliminar permanentemente "${nombre}" del catálogo?`)) {
      try {
        setDeletingId(id);
        await onDelete(id);
      } catch (err: any) {
        alert(err?.message || 'Error al eliminar el perfume.');
      } finally {
        setDeletingId(null);
      }
    }
  };

  return (
    <div className="bg-card border border-border/50 rounded-2xl overflow-hidden shadow-sm">
      <div className="p-5 border-b border-border/40 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="font-serif text-xl font-bold text-foreground">
            Inventario de Fragancias
          </h3>
          <p className="text-xs text-foreground-muted">
            Gestión completa de piezas de alta perfumería en la base de datos
          </p>
        </div>

        <Button variant="primary" size="sm" onClick={handleCreate} className="text-xs tracking-wider uppercase">
          + Nueva Fragancia
        </Button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead className="bg-secondary/40 text-foreground-muted uppercase tracking-wider text-[10px] border-b border-border/30">
            <tr>
              <th className="py-3 px-4 font-semibold">Fragancia</th>
              <th className="py-3 px-4 font-semibold">Colección</th>
              <th className="py-3 px-4 font-semibold">Segmento</th>
              <th className="py-3 px-4 font-semibold text-right">Precio</th>
              <th className="py-3 px-4 font-semibold text-center">Stock</th>
              <th className="py-3 px-4 font-semibold text-right">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/20">
            {perfumes.map((p) => {
              const formattedPrice = new Intl.NumberFormat('es-CO', {
                style: 'currency',
                currency: 'COP',
                maximumFractionDigits: 0,
              }).format(p.precio);

              return (
                <tr key={p.id} className="hover:bg-secondary/20 transition-colors">
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={p.imagenUrl}
                        alt={p.nombre}
                        className="w-10 h-10 rounded-lg object-cover bg-muted/20 border border-border/30 shrink-0"
                      />
                      <div className="min-w-0">
                        <div className="font-serif font-bold text-foreground truncate max-w-[180px]">
                          {p.nombre}
                        </div>
                        <div className="text-[10px] text-accent uppercase font-medium">
                          {p.marca}
                        </div>
                      </div>
                    </div>
                  </td>

                  <td className="py-3.5 px-4 capitalize text-foreground-muted">
                    {p.categoria}
                  </td>

                  <td className="py-3.5 px-4">
                    <Badge variant={p.tipo === 'nicho' ? 'nicho' : 'disenador'}>
                      {p.tipo}
                    </Badge>
                  </td>

                  <td className="py-3.5 px-4 text-right font-serif font-bold text-foreground">
                    {formattedPrice}
                  </td>

                  <td className="py-3.5 px-4 text-center">
                    <span
                      className={`font-semibold ${
                        p.stock <= 3 ? 'text-rose-400' : 'text-foreground'
                      }`}
                    >
                      {p.stock} uds
                    </span>
                  </td>

                  <td className="py-3.5 px-4 text-right">
                    <div className="inline-flex gap-2">
                      <Button
                        variant="secondary"
                        size="sm"
                        onClick={() => handleEdit(p)}
                        className="text-[11px] px-2.5 py-1"
                      >
                        Editar
                      </Button>
                      <Button
                        variant="danger"
                        size="sm"
                        disabled={deletingId === p.id}
                        onClick={() => handleDelete(p.id, p.nombre)}
                        className="text-[11px] px-2.5 py-1"
                      >
                        {deletingId === p.id ? '...' : 'Eliminar'}
                      </Button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {modalOpen && (
        <PerfumeModalForm
          perfume={selectedPerfume}
          onClose={() => setModalOpen(false)}
          onSave={async (data) => {
            await onSave(data, selectedPerfume?.id);
            setModalOpen(false);
          }}
        />
      )}
    </div>
  );
}