'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '../hooks/useAuth';
import { Input } from '@/features/common/components/Input';
import { Button } from '@/features/common/components/Button';

export function RegisterForm() {
  const router = useRouter();
  const { register } = useAuth();

  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [confirmContrasena, setConfirmContrasena] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!nombre.trim() || !email.trim() || !contrasena) {
      setError('Por favor completa todos los campos requeridos.');
      return;
    }

    if (contrasena.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres.');
      return;
    }

    if (contrasena !== confirmContrasena) {
      setError('Las contraseñas no coinciden.');
      return;
    }

    try {
      setLoading(true);
      await register({
        nombre: nombre.trim(),
        email: email.trim(),
        contrasena,
      });
      router.push('/');
    } catch (err: any) {
      setError(err?.message || 'No fue posible registrar la cuenta. El correo ya podría estar en uso.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto p-6 sm:p-8 bg-card border border-border/50 rounded-2xl shadow-xl">
      <div className="text-center mb-6">
        <h2 className="font-serif text-2xl sm:text-3xl font-bold text-foreground">
          Crear Cuenta
        </h2>
        <p className="text-xs text-foreground-muted mt-1">
          Únete al círculo exclusivo de clientes de Noiré Haute Parfumerie
        </p>
      </div>

      {error && (
        <div className="mb-6 p-4 rounded-lg bg-danger/10 border border-danger/30 text-danger text-xs">
          <p className="font-semibold">Error de registro</p>
          <p className="mt-0.5 opacity-90">{error}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          id="register-name"
          label="Nombre Completo"
          type="text"
          placeholder="Ej: Gabriel García"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          required
        />

        <Input
          id="register-email"
          label="Correo Electrónico"
          type="email"
          placeholder="tu@correo.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <Input
          id="register-password"
          label="Contraseña"
          type="password"
          placeholder="Mínimo 6 caracteres"
          value={contrasena}
          onChange={(e) => setContrasena(e.target.value)}
          required
        />

        <Input
          id="register-confirm-password"
          label="Confirmar Contraseña"
          type="password"
          placeholder="Repite tu contraseña"
          value={confirmContrasena}
          onChange={(e) => setConfirmContrasena(e.target.value)}
          required
        />

        <Button
          type="submit"
          variant="primary"
          size="md"
          isLoading={loading}
          className="w-full uppercase tracking-wider text-xs py-3 mt-2"
        >
          Crear Cuenta
        </Button>
      </form>

      <div className="mt-6 text-center text-xs text-foreground-muted">
        ¿Ya tienes una cuenta registrada?{' '}
        <Link href="/login" className="text-accent hover:underline font-semibold">
          Inicia sesión aquí
        </Link>
      </div>
    </div>
  );
}