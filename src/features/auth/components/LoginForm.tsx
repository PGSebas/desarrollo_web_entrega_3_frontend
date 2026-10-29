'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '../hooks/useAuth';
import { Input } from '@/features/common/components/Input';
import { Button } from '@/features/common/components/Button';

export function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get('redirect') || '/';

  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!email || !contrasena) {
      setError('Por favor completa todos los campos requeridos.');
      return;
    }

    try {
      setLoading(true);
      await login({ email, contrasena });
      router.push(redirect);
    } catch (err: any) {
      setError(err?.message || 'Credenciales inválidas. Verifica tu correo y contraseña.');
    } finally {
      setLoading(false);
    }
  };

  const fillDemo = (demoEmail: string, demoPass: string) => {
    setEmail(demoEmail);
    setContrasena(demoPass);
  };

  return (
    <div className="w-full max-w-md mx-auto p-6 sm:p-8 bg-card border border-border/50 rounded-2xl shadow-xl">
      <div className="text-center mb-6">
        <h2 className="font-serif text-2xl sm:text-3xl font-bold text-foreground">
          Iniciar Sesión
        </h2>
        <p className="text-xs text-foreground-muted mt-1">
          Ingresa tus credenciales para acceder a tu cuenta Noiré
        </p>
      </div>

      {error && (
        <div className="mb-6 p-4 rounded-lg bg-danger/10 border border-danger/30 text-danger text-xs">
          <p className="font-semibold">Error al ingresar</p>
          <p className="mt-0.5 opacity-90">{error}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          id="login-email"
          label="Correo Electrónico"
          type="email"
          placeholder="tu@correo.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <Input
          id="login-password"
          label="Contraseña"
          type="password"
          placeholder="••••••••"
          value={contrasena}
          onChange={(e) => setContrasena(e.target.value)}
          required
        />

        <Button
          type="submit"
          variant="primary"
          size="md"
          isLoading={loading}
          className="w-full uppercase tracking-wider text-xs py-3 mt-2"
        >
          Acceder
        </Button>
      </form>

      {/* Demo Credentials Helper */}
      <div className="mt-6 pt-5 border-t border-border/30 text-left">
        <p className="text-[11px] font-semibold uppercase tracking-wider text-foreground-muted mb-2">
          Credenciales de Prueba (Semilla):
        </p>
        <div className="flex flex-col gap-1.5 text-xs">
          <button
            type="button"
            onClick={() => fillDemo('admin@noireperfumes.co', 'Admin123*')}
            className="text-left px-2.5 py-1.5 rounded bg-secondary hover:bg-accent/10 border border-border/40 hover:border-accent/40 text-foreground transition-colors flex items-center justify-between"
          >
            <span><strong>Admin:</strong> admin@noireperfumes.co</span>
            <span className="text-[10px] text-accent font-medium">Usar</span>
          </button>
          <button
            type="button"
            onClick={() => fillDemo('cliente@noireperfumes.co', 'Cliente123*')}
            className="text-left px-2.5 py-1.5 rounded bg-secondary hover:bg-accent/10 border border-border/40 hover:border-accent/40 text-foreground transition-colors flex items-center justify-between"
          >
            <span><strong>Cliente:</strong> cliente@noireperfumes.co</span>
            <span className="text-[10px] text-accent font-medium">Usar</span>
          </button>
        </div>
      </div>

      <div className="mt-6 text-center text-xs text-foreground-muted">
        ¿No tienes una cuenta aún?{' '}
        <Link href="/registro" className="text-accent hover:underline font-semibold">
          Regístrate aquí
        </Link>
      </div>
    </div>
  );
}