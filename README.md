# NOIRÉ — Haute Parfumerie (Cliente Web Next.js)

> **Entrega 3 · Desarrollo Web (Semestre 2026-2)**  
> Plataforma de comercio electrónico y exhibición exclusiva de fragancias de nicho y diseñador, construida con arquitectura desacoplada full-stack en **Next.js 16 (App Router)**, **TypeScript** y **Tailwind CSS**.

---

## 🌐 Enlaces de Despliegue en Producción

| Entorno / Servicio | Plataforma | Enlace Oficial |
| :--- | :--- | :--- |
| **Frontend (Cliente Next.js)** | Vercel | [https://proyecto-semestral.vercel.app](https://proyecto-semestral.vercel.app) |
| **Backend (API REST Express)** | Render / Railway | [https://desarrollo-web-entrega-3-backend.onrender.com/api](https://desarrollo-web-entrega-3-backend.onrender.com/api) |
| **Repositorio Frontend** | GitHub | [https://github.com/PGSebas/desarrollo_web_entrega_3_frontend](https://github.com/PGSebas/desarrollo_web_entrega_3_frontend) |
| **Repositorio Backend** | GitHub | [https://github.com/PGSebas/desarrollo_web_entrega_3_backend](https://github.com/PGSebas/desarrollo_web_entrega_3_backend) |

---

## ⚜️ De Dónde Partimos: Evolución del Dominio

Continuando de forma estricta el dominio de la **Entrega 1** (*Noiré Perfumes*), la plataforma evoluciona de un sitio estático tradicional a una aplicación web moderna de alta fidelidad:

| Aspecto | Entrega 1 (Sitio Estático) | Entrega 3 (Full-Stack Desacoplado) |
| :--- | :--- | :--- |
| **Tecnología UI** | HTML5 semántico, CSS3 puro y JavaScript Vanilla. | **Next.js 16 (App Router)**, React 19, TypeScript y Tailwind CSS. |
| **Catálogo** | Arreglo en memoria local en `app.js`. | Catálogo persistido en **PostgreSQL 18** servido por API REST paginada (`GET /api/perfumes`). |
| **Interacción** | Formulario que capturaba datos y mostraba un JSON en alerta. | Checkout real autenticado que persiste pedidos en base de datos (`POST /api/pedidos`). |
| **Acceso & Roles** | Todo el contenido era público e indiscriminado. | Autenticación basada en **JWT**, sesión persistente y control de acceso basado en roles (`USER` y `ADMIN`). |
| **Diseño Visual** | Paleta oscura Noiré con fuentes tipográficas Playfair Display y Montserrat. | Sistema de diseño Noiré con soporte para tema claro/oscuro, microinteracciones y feedback de carga/error. |

---

## 🚀 Guía de Instalación y Ejecución en Local

### 1. Requisitos Previos
- **Node.js**: Versión 18.18.0 o superior (recomendado Node 20 LTS).
- **Gestor de Paquetes**: `npm` v9+ o `pnpm`.
- **Backend Activo**: La API REST del backend debe estar corriendo localmente (puerto `4000`) o en la nube para permitir el consumo de datos y autenticación.

### 2. Clonación e Instalación de Dependencias
```bash
# Clonar el repositorio
git clone https://github.com/PGSebas/desarrollo_web_entrega_3_frontend.git
cd desarrollo_web_entrega_3_frontend

# Instalar dependencias
npm install
```

### 3. Configuración de Variables de Entorno
Crea un archivo `.env.local` en la raíz del proyecto basándote en la plantilla `.env.example`:

```bash
cp .env.example .env.local
```

Contenido de `.env.local`:
```env
# URL base de la API REST del backend (sin pleca final)
NEXT_PUBLIC_API_HOST=http://localhost:4000/api
```

> **Nota para producción**: En Vercel, esta variable se configura como `NEXT_PUBLIC_API_HOST=https://desarrollo-web-entrega-3-backend.onrender.com/api`.

### 4. Scripts del Proyecto
| Comando | Descripción |
| :--- | :--- |
| `npm run dev` | Inicia el servidor de desarrollo local con Turbopack en `http://localhost:3000`. |
| `npm run build` | Ejecuta la verificación estricta de tipos de TypeScript y compila el bundle de producción optimizado. |
| `npm run start` | Arranca el servidor web en modo producción a partir del build generado. |
| `npm run lint` | Ejecuta el linter ESLint para análisis estático del código fuente. |
