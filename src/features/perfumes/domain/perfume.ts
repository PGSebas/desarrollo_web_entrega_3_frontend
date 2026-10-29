export interface Perfume {
  id: number;
  nombre: string;
  marca: string;
  precio: number;
  categoria: string;
  tipo: string;
  familiaOlfativa: string;
  concentracion: string;
  notas: string;
  imagenUrl: string;
  descripcion: string;
  stock: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface PerfumeFilters {
  page?: number;
  limit?: number;
  categoria?: string;
  tipo?: string;
  search?: string;
}

export interface PaginatedPerfumes {
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
  data: Perfume[];
}
