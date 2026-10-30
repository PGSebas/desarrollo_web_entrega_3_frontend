'use client';

import { useState, useEffect, useCallback } from 'react';
import { Pedido, CreatePedidoDto } from '../domain/pedido';
import { pedidoService } from '../services/pedidoService';

export function usePedidos() {
  const [pedidos, setPedidos] = useState<Pedido[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPedidos = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await pedidoService.getMias();
      setPedidos(data);
    } catch (err: any) {
      setError(err?.message || 'No fue posible cargar tus pedidos.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPedidos();
  }, [fetchPedidos]);

  return {
    pedidos,
    isLoading,
    error,
    refetch: fetchPedidos,
  };
}

export function useCreatePedido() {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const createPedido = async (data: CreatePedidoDto): Promise<Pedido> => {
    setIsSubmitting(true);
    setError(null);
    try {
      const nuevoPedido = await pedidoService.create(data);
      return nuevoPedido;
    } catch (err: any) {
      const msg = err?.message || 'Error al procesar el pedido. Intenta nuevamente.';
      setError(msg);
      throw new Error(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    createPedido,
    isSubmitting,
    error,
    clearError: () => setError(null),
  };
}