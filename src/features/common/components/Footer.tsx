import React from 'react';
import Link from 'next/link';

export function Footer() {
  return (
    <footer className="bg-card border-t border-border/40 text-foreground-muted pt-16 pb-12 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          {/* Columna Marca */}
          <div className="space-y-4 md:col-span-1">
            <span className="font-serif text-2xl font-bold tracking-[0.25em] text-foreground block">
              NOIRÉ
            </span>
            <p className="text-xs leading-relaxed">
              Curaduría exclusiva de fragancias de autor, nicho y diseñador. Elevamos cada instante a una experiencia sensorial inolvidable.
            </p>
            <span className="text-[11px] block text-accent font-medium">
              Bogotá, Colombia · Entregas a todo el país
            </span>
          </div>

          {/* Columna Categorías */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-widest text-foreground">
              Colecciones
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/#catalogo?cat=hombres" className="hover:text-accent transition-colors">
                  Fragancias Masculinas
                </Link>
              </li>
              <li>
                <Link href="/#catalogo?cat=mujeres" className="hover:text-accent transition-colors">
                  Fragancias Femeninas
                </Link>
              </li>
              <li>
                <Link href="/#catalogo?cat=unisex" className="hover:text-accent transition-colors">
                  Alta Perfumería Unisex
                </Link>
              </li>
              <li>
                <Link href="/#catalogo" className="hover:text-accent transition-colors">
                  Ediciones Nicho Limitadas
                </Link>
              </li>
            </ul>
          </div>

          {/* Columna Mi Cuenta */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-widest text-foreground">
              Acceso y Pedidos
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/login" className="hover:text-accent transition-colors">
                  Iniciar Sesión
                </Link>
              </li>
              <li>
                <Link href="/registro" className="hover:text-accent transition-colors">
                  Crear Cuenta
                </Link>
              </li>
              <li>
                <Link href="/pedidos" className="hover:text-accent transition-colors">
                  Rastreo de Pedidos
                </Link>
              </li>
            </ul>
          </div>

          {/* Columna Académica */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-widest text-foreground">
              Proyecto Académico
            </h4>
            <p className="text-xs leading-relaxed">
              Desarrollo Web · Semestre 2026-2.
              <br />
              Entrega 3: Arquitectura desacoplada Next.js + Express + PostgreSQL + JWT.
            </p>
            <div className="text-[10px] space-y-1 text-foreground-muted/80">
              <p>PostgreSQL 18 & Prisma ORM</p>
              <p>Next.js 16 App Router & Tailwind CSS</p>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-border/30 flex flex-col sm:flex-row items-center justify-between text-xs gap-4">
          <p>© 2026 NOIRÉ Haute Parfumerie. Todos los derechos reservados.</p>
          <p className="text-foreground-muted/70">Diseñado con devoción por la excelencia olfativa.</p>
        </div>
      </div>
    </footer>
  );
}