import React from 'react';
import Link from 'next/link';
import { Button } from '@/features/common/components/Button';

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 text-center">
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-border bg-secondary text-foreground-muted text-xs font-semibold uppercase tracking-widest mb-6">
        Código 404
      </div>

      <h1 className="font-serif text-5xl sm:text-7xl font-bold tracking-tight text-foreground mb-4">
        Fragancia No Encontrada
      </h1>

      <p className="text-base text-foreground-muted max-w-md mx-auto mb-8 font-light">
        La esencia o página que buscas no existe o ha sido trasladada a nuestros archivos privados.
      </p>

      <Link href="/">
        <Button variant="primary" size="lg" className="uppercase tracking-widest text-xs">
          Regresar a la Colección
        </Button>
      </Link>
    </div>
  );
}