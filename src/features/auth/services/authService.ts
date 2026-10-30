import { httpClient } from '@/features/common/http';
import { AuthResponse, LoginDto, RegisterDto, User } from '../domain/auth';

export const authService = {
  async login(credentials: LoginDto): Promise<AuthResponse> {
    const res = await httpClient.post<any>('/auth/login', {
      email: credentials.email,
      password: credentials.contrasena,
      contrasena: credentials.contrasena,
    });

    const user: User = {
      id: res.user.id,
      nombre: res.user.name || res.user.nombre,
      name: res.user.name || res.user.nombre,
      email: res.user.email,
      rol: (res.user.role || res.user.rol) as 'ADMIN' | 'USER',
    };

    const authResponse: AuthResponse = {
      token: res.token,
      user,
    };

    if (authResponse.token && typeof window !== 'undefined') {
      localStorage.setItem('noire_token', authResponse.token);
      localStorage.setItem('noire_user', JSON.stringify(authResponse.user));
      window.dispatchEvent(new Event('noire_auth_changed'));
    }
    return authResponse;
  },

  async register(data: RegisterDto): Promise<AuthResponse> {
    const res = await httpClient.post<any>('/auth/register', {
      name: data.nombre,
      nombre: data.nombre,
      email: data.email,
      password: data.contrasena,
      contrasena: data.contrasena,
    });

    const user: User = {
      id: res.user.id,
      nombre: res.user.name || res.user.nombre,
      name: res.user.name || res.user.nombre,
      email: res.user.email,
      rol: (res.user.role || res.user.rol) as 'ADMIN' | 'USER',
    };

    const authResponse: AuthResponse = {
      token: res.token,
      user,
    };

    if (authResponse.token && typeof window !== 'undefined') {
      localStorage.setItem('noire_token', authResponse.token);
      localStorage.setItem('noire_user', JSON.stringify(authResponse.user));
      window.dispatchEvent(new Event('noire_auth_changed'));
    }
    return authResponse;
  },

  async getProfile(): Promise<User> {
    const res = await httpClient.get<any>('/auth/me');
    return {
      id: res.id,
      nombre: res.name || res.nombre,
      name: res.name || res.nombre,
      email: res.email,
      rol: res.role || res.rol,
    };
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