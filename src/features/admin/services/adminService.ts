import { httpClient } from '@/features/common/http';
import { Pedido } from '@/features/pedidos/domain/pedido';
import { Perfume } from '@/features/perfumes/domain/perfume';

export const adminService = {
  async getAllPedidos(): Promise<Pedido[]> {
    return httpClient.get<Pedido[]>('/pedidos');
  },

  async getAllPerfumes(): Promise<Perfume[]> {
    const res = await httpClient.get<{ data: Perfume[] }>('/perfumes?limit=100');
    return res.data || [];
  },

  async createPerfume(data: Partial<Perfume>): Promise<Perfume> {
    return httpClient.post<Perfume>('/perfumes', data);
  },

  async updatePerfume(id: number, data: Partial<Perfume>): Promise<Perfume> {
    return httpClient.put<Perfume>(`/perfumes/${id}`, data);
  },

  async deletePerfume(id: number): Promise<void> {
    return httpClient.delete<void>(`/perfumes/${id}`);
  },
};