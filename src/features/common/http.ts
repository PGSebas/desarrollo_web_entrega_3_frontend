import { API_BASE_URL } from './config';

export class HttpError extends Error {
  constructor(public statusCode: number, message: string, public data?: any) {
    super(message);
    this.name = 'HttpError';
  }
}

export interface RequestOptions extends RequestInit {
  params?: Record<string, string | number | undefined>;
}

export async function httpClient<T>(endpoint: string, options: RequestOptions = {}): Promise<T> {
  let url = endpoint.startsWith('http')
    ? endpoint
    : `${API_BASE_URL}${endpoint.startsWith('/') ? '' : '/'}${endpoint}`;

  if (options.params) {
    const searchParams = new URLSearchParams();
    for (const [key, value] of Object.entries(options.params)) {
      if (value !== undefined && value !== null && value !== '') {
        searchParams.append(key, String(value));
      }
    }
    const queryString = searchParams.toString();
    if (queryString) {
      url += (url.includes('?') ? '&' : '?') + queryString;
    }
  }

  const token = typeof window !== 'undefined' ? localStorage.getItem('noire_token') : null;

  const headers = new Headers(options.headers || {});
  if (!headers.has('Content-Type') && !(options.body instanceof FormData)) {
    headers.set('Content-Type', 'application/json');
  }

  if (token) {
    headers.set('Authorization', `Bearer ${token}`);
  }

  const response = await fetch(url, {
    ...options,
    headers,
  });

  if (response.status === 401) {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('noire_token');
      localStorage.removeItem('noire_user');
      if (!window.location.pathname.includes('/login')) {
        window.location.href = '/login?expired=true';
      }
    }
    let errorJson: any = null;
    try {
      errorJson = await response.json();
    } catch {}
    throw new HttpError(401, errorJson?.message || 'Sesión expirada o no autorizada.');
  }

  if (!response.ok) {
    let errorJson: any = null;
    try {
      errorJson = await response.json();
    } catch {}
    const message = errorJson?.message || `Error HTTP: ${response.status} ${response.statusText}`;
    throw new HttpError(response.status, message, errorJson);
  }

  if (response.status === 204) {
    return {} as T;
  }

  return response.json() as Promise<T>;
}

httpClient.get = function<T>(endpoint: string, options?: RequestOptions): Promise<T> {
  return httpClient<T>(endpoint, { ...options, method: 'GET' });
};

httpClient.post = function<T>(endpoint: string, body?: any, options?: RequestOptions): Promise<T> {
  return httpClient<T>(endpoint, {
    ...options,
    method: 'POST',
    body: body ? JSON.stringify(body) : undefined,
  });
};

httpClient.put = function<T>(endpoint: string, body?: any, options?: RequestOptions): Promise<T> {
  return httpClient<T>(endpoint, {
    ...options,
    method: 'PUT',
    body: body ? JSON.stringify(body) : undefined,
  });
};

httpClient.delete = function<T>(endpoint: string, options?: RequestOptions): Promise<T> {
  return httpClient<T>(endpoint, { ...options, method: 'DELETE' });
};