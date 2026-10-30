'use client';

import React, { useState } from 'react';
import { Perfume } from '@/features/perfumes/domain/perfume';
import { Input } from '@/features/common/components/Input';
import { Button } from '@/features/common/components/Button';

interface PerfumeModalFormProps {
  perfume: Perfume | null;
  onClose: () => void;
  onSave: (data: Partial<Perfume>) => Promise<void>;
}

export function PerfumeModalForm({ perfume, onClose, onSave }: PerfumeModalFormProps) {
  const [nombre, setNombre] = useState(perfume?.nombre || '');
  const [marca, setMarca] = useState(perfume?.marca || '');
  const [precio, setPrecio] = useState<number>(perfume?.precio || 450000);
  const [categoria, setCategoria] = useState(perfume?.categoria || 'unisex');
  const [tipo, setTipo] = useState(perfume?.tipo || 'nicho');
  const [familiaOlfativa, setFamiliaOlfativa] = useState(perfume?.familiaOlfativa || 'Amaderada Oriental');
  const [concentracion, setConcentracion] = useState(perfume?.concentracion || 'Extrait de Parfum');
  const [notas, setNotas] = useState(perfume?.notas || 'Ámbar, Oud, Rosa, Vainilla');
  const [imagenUrl, setImagenUrl] = useState(perfume?.imagenUrl || 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?q=80&w=1000');
  const [descripcion, setDescripcion] = useState(perfume?.descripcion || '');
  const [stock, setStock] = useState<number>(perfume?.stock || 15);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!nombre.trim() || !marca.trim()) {
      setError('Por favor indica al menos el nombre y la marca.');
      return;
    }

    try {
      setIsSubmitting(true);
      await onSave({
        nombre: nombre.trim(),
        marca: marca.trim(),
        precio: Number(precio),
        categoria,
        tipo,
        familiaOlfativa,
        concentracion,
        notas,
        imagenUrl: imagenUrl.trim(),
        descripcion: descripcion.trim(),
        stock: Number(stock),
      });
    } catch (err: any) {
      setError(err?.message || 'Error al guardar la fragancia.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm overflow-y-auto">
      <div className="bg-card border border-border/50 rounded-2xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl relative my-8">
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 text-foreground-muted hover:text-foreground p-2"
        >
          ✕
        </button>

        <h3 className="font-serif text-2xl font-bold text-foreground mb-1">
          {perfume ? 'Editar Fragancia' : 'Nueva Fragancia Exclusiva'}
        </h3>
        <p className="text-xs text-foreground-muted mb-6">
          Ingresa los parámetros olfativos y comerciales del perfume
        </p>

        {error && (
          <div className="mb-4 p-3 rounded-lg bg-danger/10 border border-danger/30 text-danger text-xs">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              id="modal-nombre"
              label="Nombre del Perfume"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              required
            />
            <Input
              id="modal-marca"
              label="Casa o Marca"
              value={marca}
              onChange={(e) => setMarca(e.target.value)}
              required
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Input
              id="modal-precio"
              label="Precio (COP)"
              type="number"
              value={precio}
              onChange={(e) => setPrecio(Number(e.target.value))}
              required
            />
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-foreground-muted mb-1.5">
                Colección
              </label>
              <select
                value={categoria}
                onChange={(e) => setCategoria(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-lg border border-border/50 bg-background text-foreground"
              >
                <option value="hombres">Hombres</option>
                <option value="mujeres">Mujeres</option>
                <option value="unisex">Unisex</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-foreground-muted mb-1.5">
                Segmento
              </label>
              <select
                value={tipo}
                onChange={(e) => setTipo(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-lg border border-border/50 bg-background text-foreground"
              >
                <option value="nicho">Nicho</option>
                <option value="disenador">Diseñador</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              id="modal-familia"
              label="Familia Olfativa"
              value={familiaOlfativa}
              onChange={(e) => setFamiliaOlfativa(e.target.value)}
            />
            <Input
              id="modal-concentracion"
              label="Concentración"
              value={concentracion}
              onChange={(e) => setConcentracion(e.target.value)}
            />
          </div>

          <Input
            id="modal-notas"
            label="Notas Olfativas (separadas por coma)"
            value={notas}
            onChange={(e) => setNotas(e.target.value)}
          />

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="sm:col-span-2">
              <Input
                id="modal-imagen"
                label="URL de Imagen"
                value={imagenUrl}
                onChange={(e) => setImagenUrl(e.target.value)}
                required
              />
            </div>
            <div>
              <Input
                id="modal-stock"
                label="Unidades en Stock"
                type="number"
                value={stock}
                onChange={(e) => setStock(Number(e.target.value))}
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-foreground-muted mb-1.5">
              Descripción Sensorial
            </label>
            <textarea
              rows={3}
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
              className="w-full px-3 py-2 text-xs rounded-lg border border-border/50 bg-background text-foreground"
            />
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-border/30">
            <Button type="button" variant="ghost" size="sm" onClick={onClose} disabled={isSubmitting}>
              Cancelar
            </Button>
            <Button type="submit" variant="primary" size="sm" isLoading={isSubmitting}>
              {perfume ? 'Actualizar Fragancia' : 'Guardar Fragancia'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}