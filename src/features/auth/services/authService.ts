import { httpClient } from '@/features/common/http';
import { AuthResponse, LoginDto, RegisterDto, User } from '../domain/auth';

export const authService = {
  async login(credentials: LoginDto): Promise<AuthResponse> {
    const res = await httpClient.post<AuthResponse>('/auth/login', credentials);
    if (res.token && typeof window !== 'undefined') {
      localStorage.setItem('noire_token', res.token);
      localStorage.setItem('noire_user', JSON.stringify(res.user));
      window.dispatchEvent(new Event('noire_auth_changed'));
    }
    return res;
  },

  async register(data: RegisterDto): Promise<AuthResponse> {
    const res = await httpClient.post<AuthResponse>('/auth/register', data);
    if (res.token && typeof window !== 'undefined') {
      localStorage.setItem('noire_token', res.token);
      localStorage.setItem('noire_user', JSON.stringify(res.user));
      window.dispatchEvent(new Event('noire_auth_changed'));
    }
    return res;
  },

  async getProfile(): Promise<User> {
    return httpClient.get<User>('/auth/perfil');
  },

  logout(): void {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('noire_token');
      localStorage.removeItem('noire_user');
      window.dispatchEvent(new Event('noire_auth_changed'));
    }
  },

  getStoredSession(): { token: string | null; user: User | null } {
    if (typeof window === 'undefined') {
      return { token: null, user: null };
    }
    const token = localStorage.getItem('noire_token');
    const userJson = localStorage.getItem('noire_user');
    let user: User | null = null;
    if (userJson) {
      try {
        user = JSON.parse(userJson);
      } catch {
        user = null;
      }
    }
    return { token, user };
  },
};