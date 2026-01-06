# AI Development Guide - Observatory Project

> **Guía normativa para desarrolladores humanos e IAs trabajando en el proyecto Observatory**

**Versión:** 1.0.0
**Última actualización:** 2024
**Framework:** Next.js 16.1.1 (App Router)
**Lenguaje:** TypeScript 5.x
**Estado:** Estándar obligatorio

---

## Tabla de Contenidos

1. [Filosofía del Proyecto](#1-filosofía-del-proyecto)
2. [Principios de Arquitectura](#2-principios-de-arquitectura)
3. [Estructura de Carpetas](#3-estructura-de-carpetas)
4. [Reglas Estrictas de Desarrollo](#4-reglas-estrictas-de-desarrollo)
5. [Convenciones de Nombres](#5-convenciones-de-nombres)
6. [API Client](#6-api-client)
7. [React Query](#7-react-query)
8. [Server vs Client Components](#8-server-vs-client-components)
9. [Sistema de Diseño](#9-sistema-de-diseño)
10. [Accesibilidad](#10-accesibilidad)
11. [Performance](#11-performance)
12. [Seguridad](#12-seguridad)
13. [Testing](#13-testing)
14. [Anti-patrones](#14-anti-patrones)
15. [Prompts para IAs](#15-prompts-para-ias)
16. [Checklist Pre-PR](#16-checklist-pre-pr)
17. [Ejemplos de Código](#17-ejemplos-de-código)
18. [Glosario Técnico](#18-glosario-técnico)

---

## 1. Filosofía del Proyecto

### 1.1 Principios Fundamentales

**Observatory** se rige por los siguientes principios inmutables:

1. **Type Safety First**: TypeScript estricto. Cero `any` sin justificación explícita.
2. **Feature-First Architecture**: Organización por funcionalidad de negocio, no por tipo de archivo.
3. **Server Components by Default**: Usar Server Components siempre que sea posible.
4. **Separation of Concerns**: Capas claras: UI → Application → Data → API.
5. **Composition over Configuration**: Componentes pequeños y composables.
6. **Accessibility by Default**: WCAG 2.1 AA mínimo en todo el código.
7. **Performance Budget**: Lighthouse score > 90 en todas las métricas.
8. **Security by Design**: Validación, sanitización y autenticación en cada capa.

### 1.2 Valores del Proyecto

- **Mantenibilidad**: Código legible y autodocumentado
- **Escalabilidad**: Arquitectura que crece sin deuda técnica
- **Colaboración**: Estándares claros para equipos grandes
- **Calidad**: Testing, linting y type-checking obligatorios
- **DX (Developer Experience)**: Herramientas y documentación excelentes

### 1.3 Decisiones Arquitectónicas Inmutables

Estas decisiones NO pueden ser cambiadas sin aprobación del Principal Engineer:

- ✅ Feature-first structure
- ✅ Next.js App Router (no Pages Router)
- ✅ TypeScript strict mode
- ✅ React Query para estado del servidor
- ✅ API Client centralizado
- ✅ Zod para validación
- ✅ Design System con CVA (Class Variance Authority)

---

## 2. Principios de Arquitectura

### 2.1 Arquitectura en Capas

```
┌─────────────────────────────────────┐
│         UI Layer (Components)         │  ← Presentación pura
├─────────────────────────────────────┤
│      Application Layer (Hooks)        │  ← Lógica de negocio
├─────────────────────────────────────┤
│        Data Layer (Services)         │  ← Comunicación API
├─────────────────────────────────────┤
│         API Layer (Client)            │  ← HTTP requests
└─────────────────────────────────────┘
```

**Regla de Dependencias:**

- UI → Application → Data → API
- **NUNCA** al revés
- **NUNCA** saltar capas

### 2.2 Feature-First Structure

Cada feature es un módulo independiente:

```
src/features/{feature-name}/
├── components/     # Componentes específicos de la feature
├── hooks/          # Custom hooks (Application layer)
├── lib/            # Services y utilidades (Data layer)
├── types.ts        # Types específicos de la feature
├── actions.ts      # Server Actions (si aplica)
└── index.ts        # Public API de la feature
```

**Principios:**

- Cada feature es autocontenida
- Features NO dependen entre sí directamente
- Comunicación entre features vía props o eventos
- Shared code en `src/lib/` o `src/components/`

### 2.3 Separación de Responsabilidades

| Capa                    | Responsabilidad            | Ejemplo             |
| ----------------------- | -------------------------- | ------------------- |
| **UI (Components)**     | Renderizado, eventos de UI | `ProductCard.tsx`   |
| **Application (Hooks)** | Lógica de negocio, estado  | `useProducts.ts`    |
| **Data (Services)**     | Transformación, API calls  | `productService.ts` |
| **API (Client)**        | HTTP, headers, errores     | `api-client.ts`     |

**Regla:** Cada capa solo conoce la capa inmediatamente inferior.

---

## 3. Estructura de Carpetas

### 3.1 Estructura Completa

```
observatory/
├── src/
│   ├── app/                          # Next.js App Router
│   │   ├── (auth)/                   # Route groups
│   │   ├── layout.tsx                # Root layout
│   │   ├── page.tsx                  # Home page
│   │   └── globals.css               # Global styles
│   │
│   ├── features/                     # Features de negocio
│   │   └── {feature-name}/
│   │       ├── components/            # Componentes específicos
│   │       ├── hooks/                # Application layer hooks
│   │       ├── lib/                  # Data layer services
│   │       ├── types.ts              # Feature types
│   │       ├── actions.ts            # Server Actions
│   │       └── index.ts              # Public exports
│   │
│   ├── components/                   # Componentes compartidos
│   │   ├── primitives/                # Design system primitives
│   │   │   ├── Button/
│   │   │   ├── Card/
│   │   │   └── ...
│   │   ├── layout/                   # Layout components
│   │   └── examples/                 # Component examples
│   │
│   ├── lib/                          # Utilidades compartidas
│   │   ├── api/                      # API client
│   │   │   ├── api-client.ts
│   │   │   └── index.ts
│   │   ├── env.ts                    # Environment variables
│   │   ├── utils.ts                  # Utility functions
│   │   └── design-tokens.ts          # Design tokens
│   │
│   └── types/                        # Types globales (si aplica)
│
├── public/                            # Static assets
├── .env.example                       # Environment template
├── eslint.config.mjs                  # ESLint config
├── .prettierrc.json                   # Prettier config
└── tsconfig.json                      # TypeScript config
```

### 3.2 Reglas de Organización

#### 3.2.1 Features (`src/features/`)

**Cuándo crear una feature:**

- Representa una funcionalidad de negocio completa
- Tiene múltiples componentes relacionados
- Requiere lógica de negocio específica
- Puede evolucionar independientemente

**Estructura obligatoria:**

```
features/{feature-name}/
├── components/          # Mínimo 1 componente
├── hooks/               # Si hay lógica de negocio
├── lib/                 # Si hay servicios/API
├── types.ts             # SIEMPRE presente
├── index.ts             # SIEMPRE presente (public API)
└── actions.ts           # Solo si hay Server Actions
```

#### 3.2.2 Componentes Compartidos (`src/components/`)

**Cuándo usar:**

- Componente usado en 2+ features
- Componente del design system
- Componente de layout global

**Estructura:**

```
components/
├── primitives/          # Design system base components
├── layout/              # Layout components (Header, Footer, etc.)
└── examples/            # Component examples/documentation
```

#### 3.2.3 Utilidades (`src/lib/`)

**Cuándo usar:**

- Función usada en múltiples features
- Configuración global
- Cliente API centralizado

**Estructura:**

```
lib/
├── api/                 # API client y configuración
├── env.ts               # Environment variables
├── utils.ts             # Utility functions
└── design-tokens.ts     # Design tokens
```

### 3.3 Convenciones de Archivos

| Tipo       | Convención              | Ejemplo             |
| ---------- | ----------------------- | ------------------- |
| Componente | PascalCase              | `ProductCard.tsx`   |
| Hook       | camelCase con "use"     | `useProducts.ts`    |
| Service    | camelCase con "Service" | `productService.ts` |
| Utilidad   | camelCase               | `productUtils.ts`   |
| Type       | PascalCase              | `Product.ts`        |
| Constante  | UPPER_SNAKE_CASE        | `API_BASE_URL`      |

---

## 4. Reglas Estrictas de Desarrollo

### 4.1 Crear una Nueva Feature

#### Proceso Obligatorio

1. **Crear estructura base:**

   ```bash
   src/features/{feature-name}/
   ├── components/
   ├── hooks/
   ├── lib/
   ├── types.ts
   └── index.ts
   ```

2. **Definir tipos primero (`types.ts`):**

   ```typescript
   /**
    * {Feature Name} Types
    *
    * All types related to {feature-name} feature.
    */

   export interface {Feature} {
     id: string;
     // ... properties
   }

   export interface {Feature}Filters {
     // ... filter properties
   }

   export interface Create{Feature}Dto {
     // ... create properties
   }
   ```

3. **Crear servicio (`lib/{feature}Service.ts`):**

   ```typescript
   /**
    * {Feature} Service
    *
    * Data layer for {feature-name} operations.
    * Handles all API communication and data transformation.
    */

   import { {Feature}, {Feature}Filters, Create{Feature}Dto } from "../types";
   import { apiClient, ApiError } from "@/lib/api/api-client";

   // API format interface
   interface Api{Feature} {
     // ... API response structure
   }

   // Transform function
   function transform{Feature}FromAPI(data: Api{Feature}): {Feature} {
     // ... transformation logic
   }

   export const {feature}Service = {
     async get{Feature}s(filters?: {Feature}Filters): Promise<{Feature}[]> {
       // ... implementation
     },
     // ... other methods
   };
   ```

4. **Crear hooks (`hooks/use{Feature}s.ts`):**

   ```typescript
   /**
    * use{Feature}s Hook
    *
    * Application layer hook for managing {feature-name}.
    * Combines data fetching with business logic.
    */

   "use client";

   import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
   import { {feature}Service } from "../lib/{feature}Service";
   import { {Feature}Filters } from "../types";

   export function use{Feature}s(filters?: {Feature}Filters) {
     const { data, isLoading, error } = useQuery({
       queryKey: ["{feature}s", filters],
       queryFn: () => {feature}Service.get{Feature}s(filters),
       staleTime: 5 * 60 * 1000,
     });

     return { {feature}s: data ?? [], isLoading, error };
   }
   ```

5. **Crear componentes (`components/{Feature}Card.tsx`):**

   ```typescript
   /**
    * {Feature} Card Component
    *
    * Displays a single {feature-name} item.
    */

   import { {Feature} } from "../types";
   import { Card } from "@/components/primitives/Card";

   interface {Feature}CardProps {
     {feature}: {Feature};
   }

   export function {Feature}Card({ {feature} }: {Feature}CardProps) {
     return (
       <Card>
         {/* Component implementation */}
       </Card>
     );
   }
   ```

6. **Exportar public API (`index.ts`):**

   ```typescript
   /**
    * {Feature Name} Feature
    *
    * Public API exports for {feature-name} feature.
    */

   // Components
   export { {Feature}Card } from "./components/{Feature}Card";
   export { {Feature}List } from "./components/{Feature}List";

   // Hooks
   export { use{Feature}s, use{Feature} } from "./hooks/use{Feature}s";

   // Types
   export type { {Feature}, {Feature}Filters } from "./types";
   ```

#### Checklist de Feature

- [ ] Estructura de carpetas creada
- [ ] `types.ts` con todos los tipos necesarios
- [ ] `{feature}Service.ts` implementado
- [ ] Hooks creados con React Query
- [ ] Componentes creados (mínimo 1)
- [ ] `index.ts` exporta public API
- [ ] Tests unitarios (mínimo 80% coverage)
- [ ] Documentación en código (JSDoc)
- [ ] Accesibilidad verificada
- [ ] TypeScript sin errores

### 4.2 Crear un Servicio

#### Reglas Obligatorias

1. **Ubicación:** `src/features/{feature}/lib/{feature}Service.ts`

2. **Estructura obligatoria:**

   ```typescript
   /**
    * {Feature} Service
    *
    * Data layer for {feature-name} operations.
    * Handles all API communication and data transformation.
    */

   import { {Feature}, {Feature}Filters, Create{Feature}Dto } from "../types";
   import { apiClient, ApiError } from "@/lib/api/api-client";

   // 1. API format interface (internal)
   interface Api{Feature} {
     // Match API response structure
   }

   // 2. Transform function (internal)
   function transform{Feature}FromAPI(data: Api{Feature}): {Feature} {
     // Transform API format to app format
   }

   // 3. Service object (exported)
   export const {feature}Service = {
     // Methods here
   };
   ```

3. **Métodos obligatorios:**
   - `get{Feature}s()` - Listar con filtros opcionales
   - `get{Feature}ById(id)` - Obtener por ID
   - `create{Feature}(dto)` - Crear nuevo
   - `update{Feature}(id, dto)` - Actualizar
   - `delete{Feature}(id)` - Eliminar

4. **Reglas de implementación:**
   - ✅ Usar `apiClient` (nunca `fetch` directo)
   - ✅ Transformar datos API → App format
   - ✅ Manejar errores con `ApiError`
   - ✅ TypeScript estricto (sin `any`)
   - ✅ JSDoc en cada método
   - ✅ Detectar Server vs Client Component

5. **Ejemplo completo:**

   ```typescript
   /**
    * Product Service
    *
    * Data layer for product operations.
    * Handles all API communication and data transformation.
    */

   import { Product, ProductFilters, CreateProductDto } from "../types";
   import { apiClient, ApiError } from "@/lib/api/api-client";

   interface ApiProduct {
   	id: string;
   	name: string;
   	price: number;
   	created_at: string;
   	updated_at: string;
   }

   function transformProductFromAPI(data: ApiProduct): Product {
   	return {
   		id: data.id,
   		name: data.name,
   		price: data.price,
   		createdAt: new Date(data.created_at),
   		updatedAt: new Date(data.updated_at),
   	};
   }

   export const productService = {
   	async getProducts(filters?: ProductFilters): Promise<Product[]> {
   		try {
   			const isServer = typeof window === "undefined";
   			const data = await apiClient.get<ApiProduct[]>("/products", {
   				params: filters,
   				...(isServer && {
   					next: {
   						tags: ["products"],
   						revalidate: 3600,
   					},
   				}),
   			});

   			return data.map(transformProductFromAPI);
   		} catch (error) {
   			if (error instanceof ApiError) {
   				console.error("Error fetching products:", {
   					type: error.type,
   					status: error.status,
   					message: error.message,
   				});
   			}
   			throw error;
   		}
   	},

   	async getProductById(id: string): Promise<Product> {
   		try {
   			const isServer = typeof window === "undefined";
   			const data = await apiClient.get<ApiProduct>(`/products/${id}`, {
   				...(isServer && {
   					next: {
   						tags: ["products", `product-${id}`],
   						revalidate: 3600,
   					},
   				}),
   			});

   			return transformProductFromAPI(data);
   		} catch (error) {
   			if (error instanceof ApiError) {
   				if (error.status === 404) {
   					throw new Error("Product not found");
   				}
   				throw new Error(`Failed to fetch product: ${error.message}`);
   			}
   			throw error;
   		}
   	},

   	async createProduct(dto: CreateProductDto): Promise<Product> {
   		try {
   			const data = await apiClient.post<ApiProduct>("/products", dto);
   			return transformProductFromAPI(data);
   		} catch (error) {
   			console.error("Error creating product:", error);
   			throw error;
   		}
   	},

   	async updateProduct(id: string, dto: Partial<CreateProductDto>): Promise<Product> {
   		try {
   			const data = await apiClient.patch<ApiProduct>(`/products/${id}`, dto);
   			return transformProductFromAPI(data);
   		} catch (error) {
   			console.error("Error updating product:", error);
   			throw error;
   		}
   	},

   	async deleteProduct(id: string): Promise<void> {
   		try {
   			await apiClient.delete(`/products/${id}`);
   		} catch (error) {
   			console.error("Error deleting product:", error);
   			throw error;
   		}
   	},
   };
   ```

#### Checklist de Servicio

- [ ] Ubicado en `lib/{feature}Service.ts`
- [ ] Importa tipos de `../types`
- [ ] Usa `apiClient` (no `fetch`)
- [ ] Interface `Api{Feature}` definida
- [ ] Función `transform{Feature}FromAPI` implementada
- [ ] Métodos CRUD completos
- [ ] Manejo de errores con `ApiError`
- [ ] Detección Server/Client Component
- [ ] JSDoc en cada método
- [ ] TypeScript sin errores

### 4.3 Crear un Hook

#### Reglas Obligatorias

1. **Ubicación:** `src/features/{feature}/hooks/use{Feature}s.ts`

2. **Estructura obligatoria:**

   ```typescript
   /**
    * use{Feature}s Hook
    *
    * Application layer hook for managing {feature-name}.
    * Combines data fetching with business logic.
    */

   "use client";

   import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
   import { {feature}Service } from "../lib/{feature}Service";
   import { {Feature}Filters } from "../types";

   export function use{Feature}s(filters?: {Feature}Filters) {
     // Implementation
   }
   ```

3. **Reglas de implementación:**
   - ✅ SIEMPRE `"use client"` al inicio
   - ✅ Usar React Query (`useQuery`, `useMutation`)
   - ✅ Query keys consistentes: `["{feature}s", filters]`
   - ✅ `staleTime` configurado (mínimo 5 minutos)
   - ✅ Invalidación de cache en mutations
   - ✅ Lógica de negocio (filtros, sorting) en el hook
   - ✅ TypeScript estricto

4. **Patrones obligatorios:**

   **Query Hook:**

   ```typescript
   export function use{Feature}s(filters?: {Feature}Filters) {
     const { data, isLoading, error, refetch } = useQuery({
       queryKey: ["{feature}s", filters],
       queryFn: () => {feature}Service.get{Feature}s(filters),
       staleTime: 5 * 60 * 1000, // 5 minutes
     });

     // Business logic (filtering, sorting, etc.)
     const processed{Feature}s = useMemo(() => {
       if (!data) return [];
       // Apply business logic
       return data;
     }, [data, filters]);

     return {
       {feature}s: processed{Feature}s,
       isLoading,
       error,
       refetch,
     };
   }
   ```

   **Mutation Hook:**

   ```typescript
   export function useCreate{Feature}() {
     const queryClient = useQueryClient();

     return useMutation({
       mutationFn: (dto: Create{Feature}Dto) =>
         {feature}Service.create{Feature}(dto),
       onSuccess: () => {
         queryClient.invalidateQueries({ queryKey: ["{feature}s"] });
       },
     });
   }
   ```

5. **Ejemplo completo:**

   ```typescript
   /**
    * useProducts Hook
    *
    * Application layer hook for managing products.
    * Combines data fetching with business logic.
    */

   "use client";

   import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
   import { productService } from "../lib/productService";
   import { applyProductFilters, sortProducts } from "../lib/productUtils";
   import { ProductFilters, CreateProductDto } from "../types";
   import { useMemo } from "react";

   export function useProducts(filters?: ProductFilters) {
   	const { data, isLoading, error, refetch } = useQuery({
   		queryKey: ["products", filters],
   		queryFn: () => productService.getProducts(),
   		staleTime: 5 * 60 * 1000,
   	});

   	const processedProducts = useMemo(() => {
   		if (!data) return [];

   		let products = data;

   		if (filters) {
   			products = applyProductFilters(products, filters);
   		}

   		if (filters?.sortBy) {
   			products = sortProducts(products, filters.sortBy);
   		}

   		return products;
   	}, [data, filters]);

   	return {
   		products: processedProducts,
   		isLoading,
   		error,
   		refetch,
   	};
   }

   export function useProduct(id: string) {
   	return useQuery({
   		queryKey: ["product", id],
   		queryFn: () => productService.getProductById(id),
   		enabled: !!id,
   		staleTime: 5 * 60 * 1000,
   	});
   }

   export function useCreateProduct() {
   	const queryClient = useQueryClient();

   	return useMutation({
   		mutationFn: (dto: CreateProductDto) => productService.createProduct(dto),
   		onSuccess: () => {
   			queryClient.invalidateQueries({ queryKey: ["products"] });
   		},
   	});
   }
   ```

#### Checklist de Hook

- [ ] Ubicado en `hooks/use{Feature}s.ts`
- [ ] `"use client"` al inicio
- [ ] Usa React Query
- [ ] Query keys consistentes
- [ ] `staleTime` configurado
- [ ] Invalidación de cache en mutations
- [ ] Lógica de negocio implementada
- [ ] TypeScript sin errores
- [ ] JSDoc presente

### 4.4 Crear un Componente

#### Reglas Obligatorias

1. **Ubicación:**
   - Feature-specific: `src/features/{feature}/components/{Component}.tsx`
   - Shared: `src/components/{category}/{Component}.tsx`

2. **Estructura obligatoria:**

   ````typescript
   /**
    * {Component} Component
    *
    * {Brief description of what the component does}
    *
    * @example
    * ```tsx
    * <{Component} prop1="value" />
    * ```
    */

   import { {Type} } from "../types";
   import { Button } from "@/components/primitives/Button";

   interface {Component}Props {
     // Props definition
   }

   export function {Component}({ ...props }: {Component}Props) {
     // Implementation
   }
   ````

3. **Reglas de implementación:**
   - ✅ Server Component por defecto (no `"use client"` a menos que sea necesario)
   - ✅ Props tipadas con interface
   - ✅ JSDoc con descripción y ejemplo
   - ✅ Usar componentes del design system
   - ✅ Accesibilidad (ARIA, semantic HTML)
   - ✅ TypeScript estricto

4. **Server Component (default):**

   ```typescript
   /**
    * ProductList Component
    *
    * Server Component that displays a list of products.
    */

   import { productService } from "../lib/productService";
   import { ProductCard } from "./ProductCard";

   export async function ProductList() {
     const products = await productService.getProducts();

     return (
       <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
         {products.map((product) => (
           <ProductCard key={product.id} product={product} />
         ))}
       </div>
     );
   }
   ```

5. **Client Component (cuando necesario):**

   ```typescript
   /**
    * ProductFilters Component
    *
    * Client Component for filtering products.
    * Requires interactivity (state, events).
    */

   "use client";

   import { useState } from "react";
   import { ProductFilters as ProductFiltersType } from "../types";
   import { Button } from "@/components/primitives/Button";

   interface ProductFiltersProps {
     onFiltersChange: (filters: ProductFiltersType) => void;
   }

   export function ProductFilters({ onFiltersChange }: ProductFiltersProps) {
     const [filters, setFilters] = useState<ProductFiltersType>({});

     const handleChange = (key: keyof ProductFiltersType, value: string) => {
       const newFilters = { ...filters, [key]: value };
       setFilters(newFilters);
       onFiltersChange(newFilters);
     };

     return (
       <div className="space-y-4">
         {/* Filter inputs */}
       </div>
     );
   }
   ```

6. **Cuándo usar Client Component:**
   - ✅ Estado local (`useState`, `useReducer`)
   - ✅ Eventos (`onClick`, `onChange`)
   - ✅ Hooks del navegador (`useEffect`, `useRef`)
   - ✅ Context API
   - ✅ React Query (en Client Components)

7. **Cuándo usar Server Component:**
   - ✅ Data fetching directo
   - ✅ Acceso a recursos del servidor
   - ✅ Código sensible (API keys, secrets)
   - ✅ Reducir bundle size del cliente

#### Checklist de Componente

- [ ] Ubicado correctamente (feature o shared)
- [ ] Server Component por defecto
- [ ] `"use client"` solo si es necesario
- [ ] Props tipadas con interface
- [ ] JSDoc con descripción y ejemplo
- [ ] Usa componentes del design system
- [ ] Accesibilidad verificada
- [ ] TypeScript sin errores
- [ ] Sin console.log (excepto warn/error)

---

## 5. Convenciones de Nombres

### 5.1 Archivos y Carpetas

| Tipo           | Convención              | Ejemplo                        |
| -------------- | ----------------------- | ------------------------------ |
| Feature folder | kebab-case              | `product-list`                 |
| Component file | PascalCase              | `ProductCard.tsx`              |
| Hook file      | camelCase con "use"     | `useProducts.ts`               |
| Service file   | camelCase con "Service" | `productService.ts`            |
| Util file      | camelCase               | `productUtils.ts`              |
| Type file      | camelCase               | `types.ts` o `productTypes.ts` |
| Constant file  | camelCase               | `constants.ts`                 |

### 5.2 Código

| Tipo           | Convención            | Ejemplo                     |
| -------------- | --------------------- | --------------------------- |
| Component      | PascalCase            | `ProductCard`               |
| Hook           | camelCase con "use"   | `useProducts`               |
| Function       | camelCase             | `getProducts`               |
| Variable       | camelCase             | `productList`               |
| Constant       | UPPER_SNAKE_CASE      | `API_BASE_URL`              |
| Type/Interface | PascalCase            | `Product`, `ProductFilters` |
| Enum           | PascalCase            | `ProductStatus`             |
| Generic type   | PascalCase, una letra | `T`, `K`, `V`               |

### 5.3 Reglas Específicas

#### Componentes

- ✅ PascalCase
- ✅ Nombre descriptivo del propósito
- ✅ No usar abreviaciones innecesarias

```typescript
// ✅ Correcto
ProductCard;
UserProfile;
DashboardStats;

// ❌ Incorrecto
ProdCard;
UsrProf;
DashStats;
```

#### Hooks

- ✅ Empiezan con "use"
- ✅ camelCase
- ✅ Nombre en plural si retorna lista

```typescript
// ✅ Correcto
useProducts
useProduct
useCreateProduct
useAuth

// ❌ Incorrecto
getProducts (no es hook)
useProductList (redundante)
```

#### Services

- ✅ camelCase
- ✅ Terminan en "Service"
- ✅ Nombre en singular

```typescript
// ✅ Correcto
productService
userService
authService

// ❌ Incorrecto
productsService (plural)
ProductService (PascalCase)
product (sin Service)
```

#### Types/Interfaces

- ✅ PascalCase
- ✅ Nombre descriptivo
- ✅ DTOs terminan en "Dto"

```typescript
// ✅ Correcto
Product;
ProductFilters;
CreateProductDto;
UpdateProductDto;

// ❌ Incorrecto
product(camelCase);
productFilters(camelCase);
createProductDto(camelCase);
```

---

## 6. API Client

### 6.1 Uso Obligatorio

**NUNCA usar `fetch` directamente.** Siempre usar `apiClient`:

```typescript
// ✅ Correcto
import { apiClient } from "@/lib/api/api-client";

const data = await apiClient.get<Product[]>("/products");

// ❌ Incorrecto
const response = await fetch("/api/products");
const data = await response.json();
```

### 6.2 Importación

```typescript
import { apiClient, ApiError, ApiErrorType } from "@/lib/api/api-client";
```

### 6.3 Métodos Disponibles

```typescript
// GET
const products = await apiClient.get<Product[]>("/products", {
	params: { category: "electronics" },
});

// POST
const newProduct = await apiClient.post<Product>("/products", {
	name: "Product",
	price: 100,
});

// PUT
const updated = await apiClient.put<Product>(`/products/${id}`, {
	name: "Updated Product",
});

// PATCH
const patched = await apiClient.patch<Product>(`/products/${id}`, {
	price: 150,
});

// DELETE
await apiClient.delete(`/products/${id}`);
```

### 6.4 Configuración de Requests

```typescript
// Con query params
const data = await apiClient.get<Product[]>("/products", {
	params: {
		category: "electronics",
		minPrice: 100,
		maxPrice: 1000,
	},
});

// Con headers personalizados
const data = await apiClient.get<Product>("/products/1", {
	headers: {
		"X-Custom-Header": "value",
	},
});

// Sin autenticación
const data = await apiClient.get<PublicData>("/public/data", {
	includeAuth: false,
});

// Con timeout personalizado
const data = await apiClient.get<Product[]>("/products", {
	timeout: 10000, // 10 seconds
});
```

### 6.5 Server Components (Next.js Caching)

```typescript
// En Server Components
const isServer = typeof window === "undefined";

const data = await apiClient.get<Product[]>("/products", {
	...(isServer && {
		next: {
			tags: ["products"],
			revalidate: 3600, // Cache for 1 hour
		},
	}),
});
```

### 6.6 Manejo de Errores

```typescript
import { apiClient, ApiError } from "@/lib/api/api-client";

try {
	const product = await apiClient.get<Product>(`/products/${id}`);
} catch (error) {
	if (error instanceof ApiError) {
		switch (error.type) {
			case ApiErrorType.NETWORK:
				// Handle network error
				break;
			case ApiErrorType.CLIENT:
				// Handle 4xx error
				if (error.status === 404) {
					// Not found
				}
				break;
			case ApiErrorType.SERVER:
				// Handle 5xx error
				break;
			case ApiErrorType.TIMEOUT:
				// Handle timeout
				break;
		}
	}
	throw error;
}
```

### 6.7 Reglas Estrictas

1. ✅ **SIEMPRE** usar `apiClient` (nunca `fetch`)
2. ✅ **SIEMPRE** tipar respuestas: `apiClient.get<Type>()`
3. ✅ **SIEMPRE** manejar errores con `ApiError`
4. ✅ **SIEMPRE** detectar Server vs Client Component
5. ✅ **SIEMPRE** usar `next` config en Server Components para caching

---

## 7. React Query

### 7.1 Configuración

React Query está configurado globalmente. No necesitas configurarlo en cada feature.

### 7.2 Query Hooks

#### Estructura Básica

```typescript
"use client";

import { useQuery } from "@tanstack/react-query";
import { productService } from "../lib/productService";

export function useProducts() {
	return useQuery({
		queryKey: ["products"],
		queryFn: () => productService.getProducts(),
		staleTime: 5 * 60 * 1000, // 5 minutes
	});
}
```

#### Con Filtros

```typescript
export function useProducts(filters?: ProductFilters) {
	return useQuery({
		queryKey: ["products", filters], // Include filters in key
		queryFn: () => productService.getProducts(filters),
		staleTime: 5 * 60 * 1000,
	});
}
```

#### Query Individual

```typescript
export function useProduct(id: string) {
	return useQuery({
		queryKey: ["product", id],
		queryFn: () => productService.getProductById(id),
		enabled: !!id, // Only fetch if id exists
		staleTime: 5 * 60 * 1000,
	});
}
```

### 7.3 Mutation Hooks

#### Crear

```typescript
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useCreateProduct() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (dto: CreateProductDto) => productService.createProduct(dto),
		onSuccess: () => {
			// Invalidate and refetch
			queryClient.invalidateQueries({ queryKey: ["products"] });
		},
	});
}
```

#### Actualizar

```typescript
export function useUpdateProduct() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: ({ id, dto }: { id: string; dto: Partial<CreateProductDto> }) =>
			productService.updateProduct(id, dto),
		onSuccess: (_, variables) => {
			// Invalidate both list and specific item
			queryClient.invalidateQueries({ queryKey: ["products"] });
			queryClient.invalidateQueries({ queryKey: ["product", variables.id] });
		},
	});
}
```

#### Eliminar

```typescript
export function useDeleteProduct() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (id: string) => productService.deleteProduct(id),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["products"] });
		},
	});
}
```

### 7.4 Uso en Componentes

```typescript
"use client";

import { useProducts } from "../hooks/useProducts";
import { useCreateProduct } from "../hooks/useProducts";

export function ProductList() {
  const { products, isLoading, error } = useProducts();
  const createProduct = useCreateProduct();

  const handleCreate = async () => {
    try {
      await createProduct.mutateAsync({
        name: "New Product",
        price: 100,
      });
    } catch (error) {
      // Handle error
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      {products.map((product) => (
        <div key={product.id}>{product.name}</div>
      ))}
    </div>
  );
}
```

### 7.5 Query Keys

**Convención obligatoria:**

```typescript
// List
["products"][("products", filters)][
	// Single item
	("product", id)
][
	// Nested
	("user", userId, "products")
][("user", userId, "products", filters)];
```

**Reglas:**

- ✅ Siempre arrays
- ✅ Primera posición: nombre del recurso (plural para listas)
- ✅ Segunda posición: identificador (si es item individual)
- ✅ Incluir filtros/params en la key

### 7.6 Stale Time

**Configuración recomendada:**

```typescript
// Data que cambia frecuentemente
staleTime: 0; // Siempre refetch

// Data que cambia ocasionalmente
staleTime: 5 * 60 * 1000; // 5 minutes

// Data que cambia raramente
staleTime: 30 * 60 * 1000; // 30 minutes

// Data estática
staleTime: Infinity;
```

### 7.7 Reglas Estrictas

1. ✅ **SIEMPRE** usar React Query para data fetching en Client Components
2. ✅ **SIEMPRE** incluir filtros/params en query keys
3. ✅ **SIEMPRE** invalidar cache en mutations
4. ✅ **SIEMPRE** configurar `staleTime` apropiado
5. ✅ **SIEMPRE** usar `enabled` para queries condicionales

---

## 8. Server vs Client Components

### 8.1 Regla Fundamental

**Server Components por defecto.** Solo usar Client Components cuando sea absolutamente necesario.

### 8.2 Cuándo usar Server Components

✅ **SIEMPRE usar Server Components para:**

- Data fetching directo
- Acceso a recursos del servidor (BD, APIs, filesystem)
- Código sensible (API keys, secrets)
- Reducir bundle size del cliente
- Componentes que no requieren interactividad

```typescript
// ✅ Server Component (default)
import { productService } from "../lib/productService";

export async function ProductList() {
  const products = await productService.getProducts();

  return (
    <div>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
```

### 8.3 Cuándo usar Client Components

✅ **Solo usar Client Components para:**

- Estado local (`useState`, `useReducer`)
- Eventos del navegador (`onClick`, `onChange`, etc.)
- Hooks del navegador (`useEffect`, `useRef`, `useLayoutEffect`)
- Context API
- React Query (en Client Components)
- APIs del navegador (`localStorage`, `window`, etc.)

```typescript
// ✅ Client Component (necesario)
"use client";

import { useState } from "react";
import { useProducts } from "../hooks/useProducts";

export function ProductFilters() {
  const [filters, setFilters] = useState({});
  const { products } = useProducts(filters);

  return (
    <div>
      <input
        onChange={(e) => setFilters({ ...filters, search: e.target.value })}
      />
    </div>
  );
}
```

### 8.4 Patrón Híbrido

Combinar Server y Client Components:

```typescript
// Server Component (parent)
import { productService } from "../lib/productService";
import { ProductFilters } from "./ProductFilters"; // Client Component

export async function ProductPage() {
  const products = await productService.getProducts(); // Server-side fetch

  return (
    <div>
      <ProductFilters /> {/* Client Component */}
      <ProductList products={products} /> {/* Server Component */}
    </div>
  );
}
```

### 8.5 Reglas Estrictas

1. ✅ **NO** agregar `"use client"` a menos que sea necesario
2. ✅ **NO** importar Client Components en Server Components directamente
3. ✅ **SÍ** pasar datos de Server a Client Components vía props
4. ✅ **SÍ** usar Server Components para data fetching cuando sea posible

---

## 9. Sistema de Diseño

### 9.1 Componentes Primitivos

Los componentes primitivos están en `src/components/primitives/`:

- `Button` - Botones con variantes
- `Card` - Tarjetas contenedoras
- `Badge` - Etiquetas/badges
- `Alert` - Alertas y notificaciones

### 9.2 Uso de Componentes

```typescript
import { Button } from "@/components/primitives/Button";
import { Card } from "@/components/primitives/Card";
import { Badge } from "@/components/primitives/Badge";

export function ProductCard({ product }: ProductCardProps) {
  return (
    <Card>
      <h3>{product.name}</h3>
      <Badge variant="success">{product.category}</Badge>
      <Button variant="primary">Add to Cart</Button>
    </Card>
  );
}
```

### 9.3 Design Tokens

Los design tokens están en `src/lib/design-tokens.ts`:

```typescript
import { colors, spacing, typography } from "@/lib/design-tokens";

// Usar tokens en lugar de valores hardcodeados
<div style={{ color: colors.primary, padding: spacing.md }}>
  Text
</div>
```

### 9.4 Tailwind CSS

Usar clases de Tailwind para estilos:

```typescript
<div className="flex items-center gap-4 p-6 bg-background rounded-lg">
  <h2 className="text-2xl font-bold text-foreground">Title</h2>
</div>
```

### 9.5 Reglas Estrictas

1. ✅ **SIEMPRE** usar componentes primitivos cuando existan
2. ✅ **SIEMPRE** usar design tokens para valores
3. ✅ **SIEMPRE** usar Tailwind para estilos custom
4. ✅ **NO** crear componentes que ya existen en primitives
5. ✅ **NO** usar valores hardcodeados (colores, spacing, etc.)

---

## 10. Accesibilidad

### 10.1 Reglas Obligatorias

1. **Semantic HTML:**

   ```typescript
   // ✅ Correcto
   <button onClick={handleClick}>Click me</button>
   <nav><ul><li>...</li></ul></nav>

   // ❌ Incorrecto
   <div onClick={handleClick}>Click me</div>
   <div><div>...</div></div>
   ```

2. **ARIA Labels:**

   ```typescript
   <button aria-label="Close dialog">×</button>
   <input aria-label="Search products" />
   ```

3. **Alt Text en Imágenes:**

   ```typescript
   // ✅ Correcto
   <img src="photo.jpg" alt="Product photo showing the item" />

   // ❌ Incorrecto
   <img src="photo.jpg" alt="photo" />
   <img src="photo.jpg" />
   ```

4. **Keyboard Navigation:**

   ```typescript
   // Elementos interactivos deben ser accesibles por teclado
   <button onClick={handleClick} onKeyDown={handleKeyDown}>
     Click me
   </button>
   ```

5. **Focus Management:**

   ```typescript
   // Manejar focus apropiadamente
   <button autoFocus>First button</button>
   ```

### 10.2 Checklist de Accesibilidad

- [ ] Semantic HTML usado correctamente
- [ ] ARIA labels en elementos sin texto visible
- [ ] Alt text en todas las imágenes
- [ ] Keyboard navigation funcional
- [ ] Focus visible y manejado correctamente
- [ ] Contraste de colores suficiente (WCAG AA)
- [ ] Formularios con labels asociados
- [ ] Errores de formulario anunciados

### 10.3 Herramientas

- ESLint: `eslint-plugin-jsx-a11y` (ya configurado)
- Lighthouse: Verificar accesibilidad
- Screen readers: Probar con NVDA/JAWS

---

## 11. Performance

### 11.1 Reglas Obligatorias

1. **Code Splitting:**

   ```typescript
   // ✅ Lazy load componentes pesados
   const HeavyComponent = dynamic(() => import("./HeavyComponent"), {
     loading: () => <div>Loading...</div>,
   });
   ```

2. **Image Optimization:**

   ```typescript
   // ✅ Usar next/image
   import Image from "next/image";

   <Image
     src="/photo.jpg"
     alt="Description"
     width={500}
     height={300}
     priority // Solo si es above-the-fold
   />
   ```

3. **Memoization:**

   ```typescript
   // ✅ Memoizar cálculos costosos
   const expensiveValue = useMemo(() => {
   	return heavyCalculation(data);
   }, [data]);
   ```

4. **Server Components:**

   ```typescript
   // ✅ Usar Server Components para reducir bundle
   export async function ProductList() {
   	const products = await productService.getProducts();
   	// No se envía al cliente
   }
   ```

### 11.2 Métricas Objetivo

- **Lighthouse Performance:** > 90
- **First Contentful Paint (FCP):** < 1.8s
- **Largest Contentful Paint (LCP):** < 2.5s
- **Time to Interactive (TTI):** < 3.8s
- **Cumulative Layout Shift (CLS):** < 0.1

### 11.3 Checklist de Performance

- [ ] Imágenes optimizadas con `next/image`
- [ ] Code splitting en componentes pesados
- [ ] Server Components usados cuando sea posible
- [ ] Memoización de cálculos costosos
- [ ] React Query con `staleTime` apropiado
- [ ] Bundle size verificado
- [ ] Lighthouse score > 90

---

## 12. Seguridad

### 12.1 Reglas Obligatorias

1. **Environment Variables:**

   ```typescript
   // ✅ Usar env.ts (validado)
   import { env } from "@/lib/env";
   const apiUrl = env.NEXT_PUBLIC_API_URL;

   // ❌ NUNCA acceder directamente
   const apiUrl = process.env.NEXT_PUBLIC_API_URL; // ❌
   ```

2. **Input Validation:**

   ```typescript
   // ✅ Validar con Zod
   import { z } from "zod";

   const schema = z.object({
   	email: z.string().email(),
   	age: z.number().min(18),
   });

   const data = schema.parse(input);
   ```

3. **XSS Prevention:**

   ```typescript
   // ✅ React escapa automáticamente
   <div>{userInput}</div> // Seguro

   // ❌ NUNCA usar dangerouslySetInnerHTML sin sanitizar
   <div dangerouslySetInnerHTML={{ __html: userInput }} /> // ❌
   ```

4. **CSRF Protection:**
   - Next.js incluye protección CSRF por defecto
   - No hacer requests mutating desde Client Components sin protección

### 12.2 Checklist de Seguridad

- [ ] Environment variables usan `env.ts`
- [ ] Inputs validados con Zod
- [ ] No usar `dangerouslySetInnerHTML` sin sanitizar
- [ ] Secrets nunca en código cliente
- [ ] Autenticación verificada en cada request
- [ ] Headers de seguridad configurados

---

## 13. Testing

### 13.1 Cobertura Obligatoria

- **Mínimo:** 80% de cobertura
- **Crítico:** 100% en servicios y hooks
- **UI:** Componentes principales con tests

### 13.2 Estructura de Tests

```
src/features/{feature}/
├── __tests__/
│   ├── {feature}Service.test.ts
│   ├── use{Feature}s.test.ts
│   └── {Component}.test.tsx
```

### 13.3 Ejemplo de Test

```typescript
import { describe, it, expect } from "@jest/globals";
import { productService } from "../lib/productService";

describe("productService", () => {
	it("should fetch products", async () => {
		const products = await productService.getProducts();
		expect(products).toBeInstanceOf(Array);
	});
});
```

### 13.4 Checklist de Testing

- [ ] Tests unitarios para servicios
- [ ] Tests unitarios para hooks
- [ ] Tests de componentes (React Testing Library)
- [ ] Cobertura > 80%
- [ ] Tests críticos al 100%

---

## 14. Anti-patrones

### 14.1 ❌ NO Hacer

1. **NO usar `fetch` directamente:**

   ```typescript
   // ❌
   const data = await fetch("/api/products");

   // ✅
   const data = await apiClient.get("/products");
   ```

2. **NO acceder a `process.env` directamente:**

   ```typescript
   // ❌
   const url = process.env.NEXT_PUBLIC_API_URL;

   // ✅
   import { env } from "@/lib/env";
   const url = env.NEXT_PUBLIC_API_URL;
   ```

3. **NO usar `any` sin justificación:**

   ```typescript
   // ❌
   function process(data: any) {}

   // ✅
   function process<T>(data: T) {}
   ```

4. **NO crear Client Components innecesarios:**

   ```typescript
   // ❌
   "use client";
   export function StaticList({ items }: Props) {
     return <div>{items.map(...)}</div>;
   }

   // ✅
   export function StaticList({ items }: Props) {
     return <div>{items.map(...)}</div>;
   }
   ```

5. **NO saltar capas de arquitectura:**

   ```typescript
   // ❌ Componente llamando directamente al API
   const data = await apiClient.get("/products");

   // ✅ Componente → Hook → Service → API
   const { products } = useProducts();
   ```

6. **NO duplicar lógica entre features:**

   ```typescript
   // ❌ Lógica duplicada
   // features/products/lib/utils.ts
   function formatPrice(price: number) {}

   // features/orders/lib/utils.ts
   function formatPrice(price: number) {} // Duplicado

   // ✅ Lógica compartida
   // lib/utils.ts
   export function formatPrice(price: number) {}
   ```

7. **NO usar console.log en producción:**

   ```typescript
   // ❌
   console.log("Debug:", data);

   // ✅
   console.warn("Warning:", data);
   console.error("Error:", error);
   ```

### 14.2 Patrones a Evitar

- ❌ Props drilling excesivo (usar Context si es necesario)
- ❌ Estado global innecesario (usar React Query cuando sea posible)
- ❌ Componentes demasiado grandes (dividir en componentes más pequeños)
- ❌ Lógica de negocio en componentes (mover a hooks)
- ❌ Magic numbers/strings (usar constantes)

---

## 15. Prompts para IAs

### 15.1 Estructura de Prompt Recomendada

```
Actúa como {rol} trabajando en el proyecto Observatory.

Contexto:
- Framework: Next.js 16.1.1 (App Router)
- Arquitectura: Feature-first
- TypeScript: Strict mode
- Estado del servidor: React Query

Tarea:
{Descripción específica de la tarea}

Requisitos OBLIGATORIOS:
1. {Requisito 1}
2. {Requisito 2}
3. {Requisito 3}

Archivos relevantes:
- src/features/{feature}/...

Entregables:
- {Lista de archivos a crear/modificar}
- {Explicación de la implementación}
```

### 15.2 Ejemplos de Prompts

#### Crear una Nueva Feature

```
Actúa como Staff Frontend Engineer trabajando en el proyecto Observatory.

Contexto:
- Framework: Next.js 16.1.1 (App Router)
- Arquitectura: Feature-first
- TypeScript: Strict mode
- Estado del servidor: React Query

Tarea:
Crear una nueva feature "orders" que permita:
- Listar órdenes con filtros (status, date range)
- Ver detalle de una orden
- Crear nueva orden
- Actualizar estado de orden

Requisitos OBLIGATORIOS:
1. Seguir estructura feature-first estricta
2. Usar apiClient (nunca fetch directo)
3. Crear service, hooks y componentes
4. TypeScript estricto (sin any)
5. Server Components por defecto
6. Tests unitarios (mínimo 80% coverage)
7. Accesibilidad WCAG AA

Archivos a crear:
- src/features/orders/types.ts
- src/features/orders/lib/orderService.ts
- src/features/orders/hooks/useOrders.ts
- src/features/orders/components/OrderList.tsx
- src/features/orders/components/OrderCard.tsx
- src/features/orders/index.ts

Referencias:
- Ver src/features/products/ como ejemplo
```

#### Crear un Componente

```
Actúa como Frontend Developer trabajando en el proyecto Observatory.

Contexto:
- Framework: Next.js 16.1.1 (App Router)
- Design System: Componentes primitivos en src/components/primitives/
- TypeScript: Strict mode

Tarea:
Crear un componente ProductCard que muestre:
- Imagen del producto
- Nombre
- Precio
- Botón "Add to Cart"
- Badge de categoría

Requisitos OBLIGATORIOS:
1. Server Component (no "use client" a menos que sea necesario)
2. Usar componentes primitivos (Card, Button, Badge)
3. Props tipadas con interface
4. JSDoc con descripción y ejemplo
5. Accesibilidad completa (ARIA, alt text, etc.)
6. TypeScript estricto

Archivo:
- src/features/products/components/ProductCard.tsx

Referencias:
- src/components/primitives/ para componentes base
- src/features/products/types.ts para tipos
```

#### Crear un Servicio

```
Actúa como Backend Integration Engineer trabajando en el proyecto Observatory.

Contexto:
- API Client: src/lib/api/api-client.ts
- TypeScript: Strict mode
- Next.js App Router

Tarea:
Crear orderService que implemente:
- getOrders(filters?: OrderFilters): Promise<Order[]>
- getOrderById(id: string): Promise<Order>
- createOrder(dto: CreateOrderDto): Promise<Order>
- updateOrderStatus(id: string, status: OrderStatus): Promise<Order>

Requisitos OBLIGATORIOS:
1. Usar apiClient (nunca fetch)
2. Transformar datos API → App format
3. Manejar errores con ApiError
4. Detectar Server vs Client Component
5. JSDoc en cada método
6. TypeScript estricto (sin any)

Archivo:
- src/features/orders/lib/orderService.ts

Referencias:
- src/features/products/lib/productService.ts como ejemplo
- src/lib/api/api-client.ts para uso del cliente
```

### 15.3 Checklist para Prompts

- [ ] Contexto claro (framework, arquitectura)
- [ ] Tarea específica y acotada
- [ ] Requisitos obligatorios listados
- [ ] Archivos relevantes mencionados
- [ ] Referencias a código existente
- [ ] Entregables claros

---

## 16. Checklist Pre-PR

### 16.1 Código

- [ ] TypeScript compila sin errores (`npm run type-check`)
- [ ] ESLint pasa sin errores (`npm run lint`)
- [ ] Prettier formateado (`npm run format:check`)
- [ ] No hay `any` sin justificación
- [ ] No hay `console.log` (excepto warn/error)
- [ ] No hay código comentado innecesario

### 16.2 Arquitectura

- [ ] Sigue estructura feature-first
- [ ] Capas respetadas (UI → Application → Data → API)
- [ ] No hay dependencias circulares
- [ ] Server Components usados cuando sea posible
- [ ] `apiClient` usado (nunca `fetch` directo)

### 16.3 Funcionalidad

- [ ] Feature funciona correctamente
- [ ] Manejo de errores implementado
- [ ] Loading states implementados
- [ ] Edge cases considerados

### 16.4 Testing

- [ ] Tests unitarios escritos
- [ ] Cobertura > 80%
- [ ] Tests pasan (`npm test`)

### 16.5 Accesibilidad

- [ ] Semantic HTML usado
- [ ] ARIA labels presentes
- [ ] Alt text en imágenes
- [ ] Keyboard navigation funcional
- [ ] Contraste de colores suficiente

### 16.6 Performance

- [ ] Imágenes optimizadas
- [ ] Code splitting aplicado
- [ ] Server Components usados
- [ ] Bundle size verificado

### 16.7 Documentación

- [ ] JSDoc en funciones/métodos públicos
- [ ] README actualizado (si aplica)
- [ ] Comentarios explicativos donde sea necesario

### 16.8 Seguridad

- [ ] Environment variables usan `env.ts`
- [ ] Inputs validados
- [ ] No hay secrets en código

---

## 17. Ejemplos de Código

### 17.1 Feature Completa: Products

Ver `src/features/products/` para ejemplo completo de:

- Types (`types.ts`)
- Service (`lib/productService.ts`)
- Hooks (`hooks/useProducts.ts`)
- Components (`components/ProductCard.tsx`, etc.)
- Public API (`index.ts`)

### 17.2 Server Component con Data Fetching

```typescript
/**
 * ProductList Server Component
 *
 * Fetches and displays products on the server.
 */
import { productService } from "../lib/productService";
import { ProductCard } from "./ProductCard";

export async function ProductList() {
  const products = await productService.getProducts();

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
```

### 17.3 Client Component con React Query

```typescript
/**
 * ProductFilters Client Component
 *
 * Client-side filtering with React Query.
 */
"use client";

import { useState } from "react";
import { useProducts } from "../hooks/useProducts";
import { ProductFilters as ProductFiltersType } from "../types";
import { Button } from "@/components/primitives/Button";

export function ProductFilters() {
  const [filters, setFilters] = useState<ProductFiltersType>({});
  const { products, isLoading } = useProducts(filters);

  return (
    <div>
      <input
        onChange={(e) => setFilters({ ...filters, search: e.target.value })}
        aria-label="Search products"
      />
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <div>{products.length} products found</div>
      )}
    </div>
  );
}
```

### 17.4 Service con Transformación

```typescript
/**
 * Product Service
 *
 * Data layer for product operations.
 */
import { Product, CreateProductDto } from "../types";
import { apiClient, ApiError } from "@/lib/api/api-client";

interface ApiProduct {
	id: string;
	name: string;
	price: number;
	created_at: string;
}

function transformProductFromAPI(data: ApiProduct): Product {
	return {
		id: data.id,
		name: data.name,
		price: data.price,
		createdAt: new Date(data.created_at),
	};
}

export const productService = {
	async getProducts(): Promise<Product[]> {
		try {
			const isServer = typeof window === "undefined";
			const data = await apiClient.get<ApiProduct[]>("/products", {
				...(isServer && {
					next: { tags: ["products"], revalidate: 3600 },
				}),
			});

			return data.map(transformProductFromAPI);
		} catch (error) {
			if (error instanceof ApiError) {
				console.error("Error fetching products:", error.message);
			}
			throw error;
		}
	},
};
```

### 17.5 Hook con React Query

```typescript
/**
 * useProducts Hook
 *
 * Application layer hook for managing products.
 */
"use client";

import { useQuery } from "@tanstack/react-query";
import { productService } from "../lib/productService";
import { ProductFilters } from "../types";

export function useProducts(filters?: ProductFilters) {
	return useQuery({
		queryKey: ["products", filters],
		queryFn: () => productService.getProducts(filters),
		staleTime: 5 * 60 * 1000,
	});
}
```

---

## 18. Glosario Técnico

### 18.1 Términos de Arquitectura

| Término               | Definición                                                                          |
| --------------------- | ----------------------------------------------------------------------------------- |
| **Feature-First**     | Organización de código por funcionalidad de negocio en lugar de por tipo de archivo |
| **Server Component**  | Componente React que se renderiza en el servidor, no se envía al cliente            |
| **Client Component**  | Componente React que se renderiza en el cliente, requiere `"use client"`            |
| **Application Layer** | Capa que contiene lógica de negocio (hooks)                                         |
| **Data Layer**        | Capa que contiene servicios y comunicación con API                                  |
| **API Layer**         | Capa que contiene el cliente HTTP (apiClient)                                       |

### 18.2 Términos de Next.js

| Término           | Definición                                                       |
| ----------------- | ---------------------------------------------------------------- |
| **App Router**    | Sistema de routing de Next.js basado en el sistema de archivos   |
| **Route Group**   | Carpeta con paréntesis `(auth)` que no afecta la URL             |
| **Server Action** | Función que se ejecuta en el servidor, llamada desde el cliente  |
| **Layout**        | Componente que envuelve páginas y se mantiene entre navegaciones |
| **Page**          | Componente que representa una ruta específica                    |

### 18.3 Términos de React Query

| Término          | Definición                                       |
| ---------------- | ------------------------------------------------ |
| **Query**        | Solicitud de datos que se cachea automáticamente |
| **Mutation**     | Operación que modifica datos (POST, PUT, DELETE) |
| **Query Key**    | Identificador único para una query               |
| **Stale Time**   | Tiempo en que los datos se consideran frescos    |
| **Invalidation** | Marcar queries como obsoletas para refetch       |

### 18.4 Términos de TypeScript

| Término         | Definición                                                                  |
| --------------- | --------------------------------------------------------------------------- |
| **Strict Mode** | Configuración de TypeScript que habilita todas las verificaciones estrictas |
| **Generic**     | Tipo parametrizado que permite reutilización de código                      |
| **Interface**   | Contrato que define la estructura de un objeto                              |
| **Type**        | Alias para un tipo existente o unión de tipos                               |

### 18.5 Términos de Testing

| Término              | Definición                                          |
| -------------------- | --------------------------------------------------- |
| **Unit Test**        | Test que verifica una unidad de código aislada      |
| **Integration Test** | Test que verifica la interacción entre componentes  |
| **Coverage**         | Porcentaje de código ejecutado por los tests        |
| **Mock**             | Objeto simulado que reemplaza dependencias en tests |

---

## Conclusión

Esta guía establece los estándares obligatorios para el desarrollo en el proyecto Observatory. Todos los desarrolladores (humanos e IAs) deben seguir estas reglas estrictamente.

**Última actualización:** 2024
**Mantenedor:** Principal Engineer
**Versión:** 1.0.0

---

## Referencias

- [Next.js Documentation](https://nextjs.org/docs)
- [React Query Documentation](https://tanstack.com/query/latest)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [WCAG Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [ARCHITECTURE.md](./ARCHITECTURE.md) - Arquitectura detallada
- [ESLINT_PRETTIER_SETUP.md](./ESLINT_PRETTIER_SETUP.md) - Configuración de herramientas
