'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Perfume } from '@/features/perfumes/domain/perfume';
import { useCreatePedido } from '../hooks/useCreatePedido';
import { Input } from '@/features/common/components/Input';
import { Button } from '@/features/common/components/Button';
import { Badge } from '@/features/common/components/Badge';

interface PedidoFormProps {
  perfume: Perfume;
}

export function PedidoForm({ perfume }: PedidoFormProps) {
  const router = useRouter();
  const { createPedido, isSubmitting, error } = useCreatePedido();

  const [cantidad, setCantidad] = useState<number>(1);
  const [direccionEnvio, setDireccionEnvio] = useState('');
  const [telefono, setTelefono] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [successMessage, setSuccessMessage] = useState(false);

  const precioTotal = perfume.precio * cantidad;

  const formattedTotal = new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    maximumFractionDigits: 0,
  }).format(precioTotal);

  const formattedUnit = new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    maximumFractionDigits: 0,
  }).format(perfume.precio);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!direccionEnvio.trim()) {
      alert('Por favor ingresa la dirección de entrega.');
      return;
    }

    try {
      await createPedido({
        perfumeId: perfume.id,
        cantidad,
        direccionEnvio: direccionEnvio.trim(),
        telefono: telefono.trim() || undefined,
        mensaje: mensaje.trim() || undefined,
      });

      setSuccessMessage(true);
      setTimeout(() => {
        router.push('/pedidos');
      }, 1500);
    } catch {
      // El error se muestra en el banner
    }
  };

  return (
    <div className="bg-card border border-border/50 rounded-2xl overflow-hidden shadow-2xl max-w-4xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-12">
        {/* Resumen del Perfume Elegido */}
        <div className="md:col-span-5 bg-secondary/30 p-6 sm:p-8 border-b md:border-b-0 md:border-r border-border/40 flex flex-col justify-between">
          <div>
            <div className="relative w-full h-64 rounded-xl overflow-hidden mb-6 bg-muted/20 border border-border/30">
              <img
                src={perfume.imagenUrl}
                alt={perfume.nombre}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-3 left-3">
                <Badge variant={perfume.tipo === 'nicho' ? 'nicho' : 'disenador'}>
                  {perfume.tipo === 'nicho' ? 'Alta Gama Nicho' : 'Diseñador'}
                </Badge>
              </div>
            </div>

            <span className="text-xs uppercase tracking-widest text-accent font-semibold block">
              {perfume.marca}
            </span>
            <h3 className="font-serif text-2xl font-bold text-foreground mt-1 mb-2">
              {perfume.nombre}
            </h3>
            <p className="text-xs text-foreground-muted line-clamp-3 mb-4">
              {perfume.descripcion}
            </p>

            <div className="space-y-1.5 text-xs text-foreground-muted border-t border-border/30 pt-3">
              <div className="flex justify-between">
                <span>Concentración:</span>
                <span className="font-medium text-foreground">{perfume.concentracion || 'Extrait de Parfum'}</span>
              </div>
              <div className="flex justify-between">
                <span>Familia:</span>
                <span className="font-medium text-foreground">{perfume.familiaOlfativa || 'Amaderada'}</span>
              </div>
              <div className="flex justify-between">
                <span>Precio unitario:</span>
                <span className="font-semibold text-foreground">{formattedUnit}</span>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-4 border-t border-border/40">
            <span className="text-[11px] uppercase tracking-wider text-foreground-muted block">
              Total Estimado
            </span>
            <span className="font-serif text-2xl font-bold text-accent">
              {formattedTotal}
            </span>
          </div>
        </div>

        {/* Formulario de Checkout */}
        <div className="md:col-span-7 p-6 sm:p-8 flex flex-col justify-between">
          <div>
            <div className="mb-6">
              <h2 className="font-serif text-2xl font-bold text-foreground">
                Solicitud de Pedido
              </h2>
              <p className="text-xs text-foreground-muted mt-1">
                Completa tus datos de envío para asegurar tu frasco exclusivo
              </p>
            </div>

            {error && (
              <div className="mb-6 p-4 rounded-lg bg-danger/10 border border-danger/30 text-danger text-xs">
                <p className="font-semibold">No se pudo crear el pedido</p>
                <p className="mt-0.5 opacity-90">{error}</p>
              </div>
            )}

            {successMessage && (
              <div className="mb-6 p-4 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs">
                <p className="font-semibold">¡Pedido creado con éxito!</p>
                <p className="mt-0.5 opacity-90">Redirigiendo a tu historial de pedidos...</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Selector de cantidad */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-foreground-muted mb-1.5">
                  Cantidad de Frascos
                </label>
                <div className="flex items-center gap-3">
                  <div className="flex items-center border border-border/50 rounded-lg overflow-hidden bg-background">
                    <button
                      type="button"
                      onClick={() => setCantidad(Math.max(1, cantidad - 1))}
                      disabled={cantidad <= 1 || isSubmitting}
                      className="px-3 py-2 text-foreground hover:bg-secondary disabled:opacity-40 transition-colors"
                    >
                      -
                    </button>
                    <span className="px-4 py-2 text-sm font-semibold text-foreground min-w-[2.5rem] text-center">
                      {cantidad}
                    </span>
                    <button
                      type="button"
                      onClick={() => setCantidad(Math.min(perfume.stock || 5, cantidad + 1))}
                      disabled={cantidad >= (perfume.stock || 5) || isSubmitting}
                      className="px-3 py-2 text-foreground hover:bg-secondary disabled:opacity-40 transition-colors"
                    >
                      +
                    </button>
                  </div>
                  <span className="text-xs text-foreground-muted">
                    Stock disponible: {perfume.stock} unidades
                  </span>
                </div>
              </div>

              {/* Dirección de envío */}
              <Input
                id="pedido-direccion"
                label="Dirección de Envío Completa"
                placeholder="Calle 123 # 45-67, Apto 801, Bogotá"
                value={direccionEnvio}
                onChange={(e) => setDireccionEnvio(e.target.value)}
                required
                disabled={isSubmitting}
              />

              {/* Teléfono */}
              <Input
                id="pedido-telefono"
                label="Teléfono de Contacto"
                placeholder="+57 300 123 4567"
                value={telefono}
                onChange={(e) => setTelefono(e.target.value)}
                disabled={isSubmitting}
              />

              {/* Mensaje o instrucciones */}
              <div>
                <label htmlFor="pedido-mensaje" className="block text-xs font-semibold uppercase tracking-wider text-foreground-muted mb-1.5">
                  Instrucciones o Notas Especiales (Opcional)
                </label>
                <textarea
                  id="pedido-mensaje"
                  rows={3}
                  placeholder="Ej: Entregar en portería, empaque para regalo..."
                  value={mensaje}
                  onChange={(e) => setMensaje(e.target.value)}
                  disabled={isSubmitting}
                  className="w-full px-3 py-2 rounded-lg border border-border/50 bg-background text-foreground text-xs focus:outline-hidden focus:ring-1 focus:ring-accent transition-colors"
                />
              </div>

              <div className="pt-2">
                <Button
                  type="submit"
                  variant="primary"
                  size="md"
                  isLoading={isSubmitting}
                  disabled={successMessage}
                  className="w-full uppercase tracking-wider text-xs py-3.5"
                >
                  {successMessage ? 'Pedido Registrado' : `Confirmar Pedido · ${formattedTotal}`}
                </Button>
              </div>
            </form>
          </div>

          <p className="mt-6 text-[11px] text-foreground-muted/70 text-center">
            Garantía de entrega protegida y batch 100% verificado. Sin cobros sorpresa.
          </p>
        </div>
      </div>
    </div>
  );
}