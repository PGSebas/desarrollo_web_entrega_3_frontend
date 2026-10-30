import React from 'react';

export function Footer() {
  return (
    <footer className="bg-card border-t border-border/40 text-foreground-muted pt-12 pb-10 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 mb-8">
          {/* Marca Noiré */}
          <div className="space-y-2 max-w-md">
            <span className="font-serif text-2xl font-bold tracking-[0.25em] text-foreground block">
              NOIRÉ
            </span>
            <p className="text-xs leading-relaxed text-foreground-muted">
              Curaduría exclusiva de fragancias de autor, nicho y diseñador. Elevamos cada instante a una experiencia sensorial inolvidable.
            </p>
            <span className="text-[11px] block text-accent font-medium">
              Bogotá, Colombia · Entregas a todo el país
            </span>
          </div>

          {/* Información Académica */}
          <div className="space-y-1.5 md:text-right">
            <h4 className="text-xs font-semibold uppercase tracking-widest text-foreground">
              Proyecto Académico
            </h4>
            <p className="text-xs leading-relaxed text-foreground-muted">
              Desarrollo Web · Semestre 2026-2
              <br />
              Entrega 3: Arquitectura desacoplada Next.js + Express + PostgreSQL + JWT.
            </p>
            <div className="text-[10px] space-y-0.5 text-foreground-muted/70">
              <p>PostgreSQL 18 & Prisma ORM</p>
              <p>Next.js 16 App Router & Tailwind CSS</p>
            </div>
          </div>
        </div>

        <div className="pt-6 border-t border-border/30 flex flex-col sm:flex-row items-center justify-between text-xs gap-3">
          <p>© 2026 NOIRÉ Haute Parfumerie. Todos los derechos reservados.</p>
          <p className="text-foreground-muted/70">Diseñado con devoción por la excelencia olfativa.</p>
        </div>
      </div>
    </footer>
  );
}