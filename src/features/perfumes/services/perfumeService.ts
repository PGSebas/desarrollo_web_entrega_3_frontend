import { httpClient } from '../../common/http';
import { Perfume, PerfumeFilters, PaginatedPerfumes } from '../domain/perfume';

export const perfumeService = {
  async getAll(filters: PerfumeFilters = {}): Promise<PaginatedPerfumes> {
    return httpClient<PaginatedPerfumes>('/perfumes', {
      params: {
        page: filters.page,
        limit: filters.limit || 8,
        categoria: filters.categoria,
        tipo: filters.tipo,
        search: filters.search,
        minPrice: filters.minPrice,
        maxPrice: filters.maxPrice,
      },
    });
  },

  async getById(id: number): Promise<Perfume> {
    return httpClient<Perfume>(`/perfumes/${id}`);
  },

  async create(data: Partial<Perfume>): Promise<Perfume> {
    return httpClient<Perfume>('/perfumes', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  async update(id: number, data: Partial<Perfume>): Promise<Perfume> {
    return httpClient<Perfume>(`/perfumes/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  },

  async delete(id: number): Promise<void> {
    return httpClient<void>(`/perfumes/${id}`, {
      method: 'DELETE',
    });
  },
};