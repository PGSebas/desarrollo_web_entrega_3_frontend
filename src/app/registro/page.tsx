import React, { Suspense } from 'react';
import { Metadata } from 'next';
import { Navbar } from '@/features/common/components/Navbar';
import { Footer } from '@/features/common/components/Footer';
import { RegisterForm } from '@/features/auth/components/RegisterForm';

export const metadata: Metadata = {
  title: 'Crear Cuenta | Noiré Perfumes',
  description: 'Regístrate para solicitar pedidos de alta perfumería en Noiré.',
};

export default function RegistroPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <Navbar />
      <main className="flex-1 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <Suspense fallback={<div className="text-center text-xs text-foreground-muted">Cargando formulario...</div>}>
          <RegisterForm />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}