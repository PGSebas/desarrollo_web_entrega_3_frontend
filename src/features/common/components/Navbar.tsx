'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ThemeToggle } from './ThemeToggle';
import { Button } from './Button';
import { Badge } from './Badge';

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [user, setUser] = useState<{ id: string; nombre: string; email: string; rol: string } | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);

    // Revisar sesión local
    const savedUser = localStorage.getItem('noire_user');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch {
        setUser(null);
      }
    }

    const onAuthChange = () => {
      const u = localStorage.getItem('noire_user');
      setUser(u ? JSON.parse(u) : null);
    };
    window.addEventListener('noire_auth_changed', onAuthChange);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('noire_auth_changed', onAuthChange);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('noire_token');
    localStorage.removeItem('noire_user');
    setUser(null);
    window.dispatchEvent(new Event('noire_auth_changed'));
    window.location.href = '/';
  };

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-background/90 backdrop-blur-md border-b border-border/50 shadow-md'
          : 'bg-background/70 backdrop-blur-xs border-b border-border/20'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex flex-col group">
            <span className="font-serif text-2xl sm:text-3xl font-bold tracking-[0.25em] text-foreground group-hover:text-accent transition-colors">
              NOIRÉ
            </span>
            <span className="text-[9px] uppercase tracking-[0.35em] text-foreground-muted -mt-1 font-medium">
              Haute Parfumerie
            </span>
          </Link>

          {/* Navegación Desktop */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link
              href="/#catalogo"
              className="text-xs uppercase tracking-widest font-medium text-foreground-muted hover:text-accent transition-colors"
            >
              Catálogo
            </Link>
            <Link
              href="/#catalogo?cat=hombres"
              className="text-xs uppercase tracking-widest font-medium text-foreground-muted hover:text-accent transition-colors"
            >
              Hombres
            </Link>
            <Link
              href="/#catalogo?cat=mujeres"
              className="text-xs uppercase tracking-widest font-medium text-foreground-muted hover:text-accent transition-colors"
            >
              Mujeres
            </Link>
            <Link
              href="/#catalogo?cat=unisex"
              className="text-xs uppercase tracking-widest font-medium text-foreground-muted hover:text-accent transition-colors"
            >
              Unisex
            </Link>
            {user && (
              <Link
                href="/pedidos"
                className="text-xs uppercase tracking-widest font-medium text-foreground-muted hover:text-accent transition-colors"
              >
                Mis Pedidos
              </Link>
            )}
          </nav>

          {/* Acciones derecha */}
          <div className="hidden md:flex items-center space-x-4">
            <ThemeToggle />

            {user ? (
              <div className="flex items-center space-x-3">
                <div className="text-right">
                  <span className="text-xs font-semibold block text-foreground">
                    {user.nombre}
                  </span>
                  <Badge variant={user.rol === 'ADMIN' ? 'gold' : 'neutral'} className="text-[10px]">
                    {user.rol}
                  </Badge>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleLogout}
                  className="text-xs"
                >
                  Salir
                </Button>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Link href="/login">
                  <Button variant="ghost" size="sm" className="text-xs tracking-wider uppercase">
                    Entrar
                  </Button>
                </Link>
                <Link href="/registro">
                  <Button variant="primary" size="sm" className="text-xs tracking-wider uppercase">
                    Registro
                  </Button>
                </Link>
              </div>
            )}
          </div>

          {/* Botón menú móvil */}
          <div className="flex md:hidden items-center space-x-2">
            <ThemeToggle />
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-foreground hover:bg-secondary transition-colors"
              aria-label="Abrir menú"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Menú móvil desplegable */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-card border-b border-border/50 px-4 pt-2 pb-6 space-y-3">
          <Link
            href="/#catalogo"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-sm uppercase tracking-wider font-medium text-foreground hover:text-accent"
          >
            Catálogo
          </Link>
          <Link
            href="/#catalogo?cat=hombres"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-sm uppercase tracking-wider font-medium text-foreground hover:text-accent"
          >
            Hombres
          </Link>
          <Link
            href="/#catalogo?cat=mujeres"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-sm uppercase tracking-wider font-medium text-foreground hover:text-accent"
          >
            Mujeres
          </Link>
          <Link
            href="/#catalogo?cat=unisex"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2 text-sm uppercase tracking-wider font-medium text-foreground hover:text-accent"
          >
            Unisex
          </Link>
          {user && (
            <Link
              href="/pedidos"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-sm uppercase tracking-wider font-medium text-foreground hover:text-accent"
            >
              Mis Pedidos
            </Link>
          )}

          <div className="pt-4 border-t border-border/40">
            {user ? (
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold">{user.nombre}</p>
                  <p className="text-xs text-foreground-muted">{user.email}</p>
                </div>
                <Button variant="outline" size="sm" onClick={handleLogout}>
                  Cerrar Sesión
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-2">
                <Link href="/login" onClick={() => setMobileMenuOpen(false)}>
                  <Button variant="outline" size="sm" className="w-full">
                    Ingresar
                  </Button>
                </Link>
                <Link href="/registro" onClick={() => setMobileMenuOpen(false)}>
                  <Button variant="primary" size="sm" className="w-full">
                    Registro
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}