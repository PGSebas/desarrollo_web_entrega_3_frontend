'use client';

import React from 'react';
import { Button } from './Button';

export function Hero() {
  const scrollToCatalog = () => {
    const el = document.getElementById('catalogo');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative overflow-hidden bg-background py-20 lg:py-28 border-b border-border/30">
      {/* Resplandor de fondo estilo alta perfumería */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-accent/30 bg-accent/5 text-accent text-xs font-semibold uppercase tracking-widest mb-6">
          <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
          Colección Privada 2026
        </div>

        <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-foreground max-w-4xl mx-auto leading-[1.15]">
          El Arte Sublime de la <span className="text-accent italic font-normal">Alta Perfumería</span>
        </h1>

        <p className="mt-6 text-base sm:text-lg text-foreground-muted max-w-2xl mx-auto font-light leading-relaxed">
          Piezas maestras de perfumería nicho y casas de diseño emblemáticas. Fragancias con concentración Extrait de Parfum, acordes audaces y fijación excepcional.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Button
            size="lg"
            variant="primary"
            onClick={scrollToCatalog}
            className="tracking-widest uppercase text-xs px-8 py-3.5 shadow-lg shadow-accent/15"
          >
            Explorar Catálogo
          </Button>

          <a href="#catalogo">
            <Button
              size="lg"
              variant="outline"
              className="tracking-widest uppercase text-xs px-8 py-3.5"
            >
              Novedades Nicho
            </Button>
          </a>
        </div>

        {/* Insignias de confianza */}
        <div className="mt-14 pt-10 border-t border-border/30 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto text-center">
          <div>
            <span className="block font-serif text-xl sm:text-2xl font-bold text-foreground">100%</span>
            <span className="text-xs text-foreground-muted uppercase tracking-wider">Fragancias Auténticas</span>
          </div>
          <div>
            <span className="block font-serif text-xl sm:text-2xl font-bold text-foreground">Extrait</span>
            <span className="text-xs text-foreground-muted uppercase tracking-wider">Máxima Concentración</span>
          </div>
          <div>
            <span className="block font-serif text-xl sm:text-2xl font-bold text-foreground">24-48h</span>
            <span className="text-xs text-foreground-muted uppercase tracking-wider">Envío Nacional</span>
          </div>
          <div>
            <span className="block font-serif text-xl sm:text-2xl font-bold text-foreground">Batch</span>
            <span className="text-xs text-foreground-muted uppercase tracking-wider">Garantía Verificada</span>
          </div>
        </div>
      </div>
    </section>
  );
}