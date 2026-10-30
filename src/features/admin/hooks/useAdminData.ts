'use client';

import { useState, useEffect, useCallback } from 'react';
import { adminService } from '../services/adminService';
import { Pedido } from '@/features/pedidos/domain/pedido';
import { Perfume } from '@/features/perfumes/domain/perfume';

export function useAdminData() {
  const [pedidos, setPedidos] = useState<Pedido[]>([]);
  const [perfumes, setPerfumes] = useState<Perfume[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const [pedidosData, perfumesData] = await Promise.all([
        adminService.getAllPedidos(),
        adminService.getAllPerfumes(),
      ]);
      setPedidos(pedidosData);
      setPerfumes(perfumesData);
    } catch (err: any) {
      setError(err?.message || 'Error al cargar los datos del panel de administración.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const deletePerfume = async (id: number) => {
    await adminService.deletePerfume(id);
    setPerfumes((prev) => prev.filter((p) => p.id !== id));
  };

  const savePerfume = async (perfumeData: Partial<Perfume>, editId?: number) => {
    if (editId) {
      const updated = await adminService.updatePerfume(editId, perfumeData);
      setPerfumes((prev) => prev.map((p) => (p.id === editId ? updated : p)));
      return updated;
    } else {
      const created = await adminService.createPerfume(perfumeData);
      setPerfumes((prev) => [created, ...prev]);
      return created;
    }
  };

  return {
    pedidos,
    perfumes,
    isLoading,
    error,
    refetch: fetchData,
    deletePerfume,
    savePerfume,
  };
}