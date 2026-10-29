'use client';

import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { User, LoginDto, RegisterDto } from '../domain/auth';
import { authService } from '../services/authService';

interface AuthContextType {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  isLoading: boolean;
  login: (credentials: LoginDto) => Promise<void>;
  register: (data: RegisterDto) => Promise<void>;
  logout: () => void;
  refreshSession: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const loadSession = useCallback(() => {
    const session = authService.getStoredSession();
    setUser(session.user);
    setToken(session.token);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    loadSession();

    const handleAuthChange = () => {
      loadSession();
    };

    window.addEventListener('noire_auth_changed', handleAuthChange);
    window.addEventListener('storage', handleAuthChange);

    return () => {
      window.removeEventListener('noire_auth_changed', handleAuthChange);
      window.removeEventListener('storage', handleAuthChange);
    };
  }, [loadSession]);

  const login = async (credentials: LoginDto) => {
    const res = await authService.login(credentials);
    setUser(res.user);
    setToken(res.token);
  };

  const register = async (data: RegisterDto) => {
    const res = await authService.register(data);
    setUser(res.user);
    setToken(res.token);
  };

  const logout = () => {
    authService.logout();
    setUser(null);
    setToken(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated: Boolean(token && user),
        isAdmin: user?.rol === 'ADMIN',
        isLoading,
        login,
        register,
        logout,
        refreshSession: loadSession,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}