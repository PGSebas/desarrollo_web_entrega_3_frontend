import { Perfume } from '@/features/perfumes/domain/perfume';
import { User } from '@/features/auth/domain/auth';

export type PedidoStatus = 'PENDIENTE' | 'CONFIRMADO' | 'CANCELADO';

export interface CreatePedidoDto {
  perfumeId: number;
  cantidad?: number;
  direccionEnvio: string;
  telefono?: string;
  mensaje?: string;
}

export interface Pedido {
  id: number;
  userId: number;
  user?: User;
  perfumeId: number;
  perfume?: Perfume;
  cantidad: number;
  direccionEnvio: string;
  telefono?: string | null;
  mensaje?: string | null;
  estado: PedidoStatus | string;
  createdAt?: string;
  updatedAt?: string;
}