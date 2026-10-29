export interface User {
  id: number;
  nombre: string;
  email: string;
  rol: 'ADMIN' | 'USER';
  createdAt?: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}

export interface LoginDto {
  email: string;
  contrasena: string;
}

export interface RegisterDto {
  nombre: string;
  email: string;
  contrasena: string;
}