import type { Metadata } from 'next';
import './globals.css';
import { AuthProvider } from '@/features/auth/context/AuthContext';

export const metadata: Metadata = {
  title: 'Noiré Perfumes | Catálogo de Alta Perfumería',
  description: 'Plataforma web de exhibición y selección de fragancias de autor y diseñador.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  const saved = localStorage.getItem('noire-theme') || 'dark';
                  if (saved === 'light') {
                    document.documentElement.setAttribute('data-theme', 'light');
                  } else {
                    document.documentElement.removeAttribute('data-theme');
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body className="antialiased flex flex-col min-h-screen">
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}