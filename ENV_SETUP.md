# Environment Variables Setup Guide

## 📋 Tabla de Contenidos

1. [Introducción](#introducción)
2. [Configuración Inicial](#configuración-inicial)
3. [Variables Públicas vs Privadas](#variables-públicas-vs-privadas)
4. [Validación y Tipado](#validación-y-tipado)
5. [Uso en el Código](#uso-en-el-código)
6. [Troubleshooting](#troubleshooting)

---

## Introducción

Este proyecto usa un sistema centralizado y type-safe para gestionar variables de entorno. Todas las variables son validadas con Zod antes de que la aplicación inicie, asegurando que:

- ✅ No hay variables faltantes
- ✅ Todas las variables tienen tipos correctos
- ✅ Errores claros en desarrollo
- ✅ Separación entre variables públicas y privadas
- ✅ Seguridad por defecto

---

## Configuración Inicial

### 1. Copiar el Template

```bash
cp .env.example .env.local
```

### 2. Editar Variables

Abre `.env.local` y completa los valores necesarios:

```bash
# .env.local
NEXT_PUBLIC_API_URL=https://api.example.com
NEXT_PUBLIC_APP_NAME=My App
NEXT_PUBLIC_ENV=development
```

### 3. Verificar

Al iniciar la aplicación, las variables se validan automáticamente. Si falta alguna variable requerida o tiene un valor inválido, verás un error claro:

```
❌ Invalid environment variables:

Missing required variables:
  - NEXT_PUBLIC_API_URL: Required

💡 Tip: Copy .env.example to .env.local and fill in the values.
```

---

## Variables Públicas vs Privadas

### Variables Públicas (`NEXT_PUBLIC_*`)

**Características:**

- Expuestas al navegador (Client Components)
- Disponibles en Server Components y API routes
- ⚠️ **NUNCA** poner datos sensibles aquí

**Ejemplos:**

```env
NEXT_PUBLIC_API_URL=https://api.example.com
NEXT_PUBLIC_APP_NAME=My App
NEXT_PUBLIC_ENV=development
```

**Uso:**

```ts
import { env } from "@/lib/env";

// ✅ Funciona en Client Components
const apiUrl = env.NEXT_PUBLIC_API_URL;
```

### Variables Privadas (sin prefijo)

**Características:**

- Solo disponibles en Server Components y API routes
- **NUNCA** expuestas al navegador
- ✅ Seguras para datos sensibles

**Ejemplos:**

```env
DATABASE_URL=postgresql://user:pass@localhost:5432/db
NEXTAUTH_SECRET=your-secret-key
API_KEY=your-api-key
```

**Uso:**

```ts
import { env } from "@/lib/env";

// ✅ Funciona en Server Components
const dbUrl = env.DATABASE_URL;

// ❌ NO funciona en Client Components (será undefined)
// const dbUrl = env.DATABASE_URL; // undefined en browser
```

---

## Validación y Tipado

### Validación con Zod

Todas las variables se validan usando Zod en `src/lib/env.ts`:

```ts
const envSchema = z.object({
	NEXT_PUBLIC_API_URL: z.string().url().or(z.string().startsWith("/")),
	DATABASE_URL: z.string().url().optional(),
	// ...
});
```

### Cuándo se Valida

1. **Server-side**: Al cargar el módulo `env.ts`
2. **Client-side**: Solo valida variables públicas
3. **Build time**: Next.js valida en build
4. **Runtime**: Validación en cada request (Server Components)

### Tipos TypeScript

El objeto `env` está completamente tipado:

```ts
import { env } from "@/lib/env";

// ✅ TypeScript conoce todos los tipos
const apiUrl: string = env.NEXT_PUBLIC_API_URL;
const dbUrl: string | undefined = env.DATABASE_URL;
```

---

## Uso en el Código

### ✅ Correcto

```ts
import { env } from "@/lib/env";

// En cualquier componente o service
const apiUrl = env.NEXT_PUBLIC_API_URL;
const appName = env.NEXT_PUBLIC_APP_NAME;
```

### ❌ Incorrecto

```ts
// ❌ NO acceder a process.env directamente
const apiUrl = process.env.NEXT_PUBLIC_API_URL;

// ❌ NO usar variables privadas en Client Components
("use client");
const dbUrl = env.DATABASE_URL; // undefined en browser
```

### Ejemplo en Service

```ts
// src/features/products/lib/productService.ts
import { env } from "@/lib/env";
import { apiClient } from "@/lib/api/api-client";

export const productService = {
	async getProducts() {
		// ✅ Usar env validado
		const baseUrl = env.NEXT_PUBLIC_API_URL;

		// ✅ Usar apiClient que ya usa env internamente
		const data = await apiClient.get("/products");
		return data;
	},
};
```

---

## Troubleshooting

### Error: "Invalid environment variables"

**Problema**: Variables faltantes o inválidas.

**Solución**:

1. Verifica que `.env.local` existe
2. Verifica que todas las variables requeridas están presentes
3. Verifica que los valores tienen el formato correcto
4. Revisa el mensaje de error para ver qué variable falla

### Variable es `undefined` en Client Component

**Problema**: Intentando usar variable privada en Client Component.

**Solución**:

- Usa solo variables `NEXT_PUBLIC_*` en Client Components
- Mueve la lógica que necesita variables privadas a Server Component o API route

### Variable no se actualiza después de cambiar `.env.local`

**Problema**: Next.js cachea variables de entorno.

**Solución**:

```bash
# Reiniciar el servidor de desarrollo
npm run dev

# O limpiar cache
rm -rf .next
npm run dev
```

### Error en producción

**Problema**: Variables no configuradas en el servidor de producción.

**Solución**:

1. Configura variables en tu plataforma de deployment (Vercel, etc.)
2. Verifica que todas las variables requeridas están configuradas
3. Revisa los logs de build para ver qué variable falta

---

## Agregar Nueva Variable

### 1. Agregar al Schema

Edita `src/lib/env.ts`:

```ts
const envSchema = z.object({
	// ... variables existentes

	// Nueva variable pública
	NEXT_PUBLIC_NEW_FEATURE: z.string().min(1),

	// Nueva variable privada
	NEW_SECRET_KEY: z.string().min(32),
});
```

### 2. Agregar a `.env.example`

```env
# Nueva variable pública
NEXT_PUBLIC_NEW_FEATURE=default-value

# Nueva variable privada
NEW_SECRET_KEY=your-secret-key-here
```

### 3. Documentar

Agrega comentarios JSDoc en el schema explicando:

- Qué es la variable
- Cuándo es requerida
- Ejemplos de valores válidos

### 4. Usar en el Código

```ts
import { env } from "@/lib/env";

const newFeature = env.NEXT_PUBLIC_NEW_FEATURE;
```

---

## Seguridad

### ✅ Buenas Prácticas

1. **Nunca** poner secrets en `NEXT_PUBLIC_*` variables
2. **Siempre** validar variables con Zod
3. **Nunca** commitear `.env.local`
4. **Siempre** documentar variables en `.env.example`
5. **Usar** diferentes valores para dev/staging/prod

### ⚠️ Advertencias

- Variables `NEXT_PUBLIC_*` son visibles en el bundle del cliente
- Cualquiera puede ver estas variables en el código fuente del navegador
- Nunca pongas API keys, secrets, o tokens en variables públicas

---

## Recursos

- [Next.js Environment Variables](https://nextjs.org/docs/app/building-your-application/configuring/environment-variables)
- [Zod Documentation](https://zod.dev/)
- [`.env.example`](./.env.example) - Template de variables
- [`src/lib/env.ts`](./src/lib/env.ts) - Schema de validación

---

## Checklist

Antes de hacer deploy:

- [ ] Todas las variables requeridas están configuradas
- [ ] `.env.example` está actualizado
- [ ] Variables sensibles están en variables privadas (no `NEXT_PUBLIC_*`)
- [ ] Variables de producción están configuradas en el servidor
- [ ] No hay referencias directas a `process.env` fuera de `env.ts`
