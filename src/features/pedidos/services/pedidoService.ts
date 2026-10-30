import { httpClient } from '@/features/common/http';
import { CreatePedidoDto, Pedido } from '../domain/pedido';

export const pedidoService = {
  async create(data: CreatePedidoDto): Promise<Pedido> {
    return httpClient.post<Pedido>('/pedidos', data);
  },

  async getMias(): Promise<Pedido[]> {
    return httpClient.get<Pedido[]>('/pedidos/mias');
  },

  async getAll(): Promise<Pedido[]> {
    return httpClient.get<Pedido[]>('/pedidos');
  },
};