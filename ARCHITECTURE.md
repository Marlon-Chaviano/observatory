# Arquitectura Feature-First para Next.js App Router

## Tabla de Contenidos

1. [Introducción](#introducción)
2. [Estructura Feature-First](#estructura-feature-first)
3. [Separación de Responsabilidades](#separación-de-responsabilidades)
4. [Componentes Server vs Client](#componentes-server-vs-client)
5. [Patrones de Data Fetching](#patrones-de-data-fetching)
6. [Anti-patrones Comunes](#anti-patrones-comunes)
7. [Guía de Migración](#guía-de-migración)

---

## Introducción

La arquitectura **feature-first** organiza el código por funcionalidades de negocio en lugar de por tipo de archivo. Esto mejora la mantenibilidad, escalabilidad y colaboración en equipos.

### Principios Fundamentales

- **Cohesión**: Todo lo relacionado con una feature está junto
- **Bajo acoplamiento**: Features independientes no dependen entre sí
- **Colocación**: Código relacionado vive cerca
- **Discoverability**: Fácil encontrar código relacionado

---

## Estructura Feature-First

### Estructura de Directorios

```
src/
├── app/                          # Next.js App Router
│   ├── (auth)/                   # Route groups
│   │   ├── login/
│   │   │   └── page.tsx
│   │   └── register/
│   │       └── page.tsx
│   ├── (dashboard)/
│   │   ├── dashboard/
│   │   │   └── page.tsx
│   │   └── layout.tsx
│   └── layout.tsx
│
├── features/                     # Features de negocio
│   ├── auth/
│   │   ├── components/          # Componentes específicos de auth
│   │   │   ├── LoginForm.tsx
│   │   │   └── RegisterForm.tsx
│   │   ├── hooks/                # Custom hooks
│   │   │   └── useAuth.ts
│   │   ├── lib/                  # Utilidades específicas
│   │   │   └── validators.ts
│   │   ├── api/                  # API routes específicas
│   │   │   └── route.ts
│   │   └── types.ts              # Types específicos
│   │
│   ├── dashboard/
│   │   ├── components/
│   │   │   ├── DashboardStats.tsx
│   │   │   └── DashboardChart.tsx
│   │   ├── hooks/
│   │   │   └── useDashboardData.ts
│   │   ├── lib/
│   │   │   └── calculations.ts
│   │   └── types.ts
│   │
│   └── products/
│       ├── components/
│       │   ├── ProductList.tsx
│       │   ├── ProductCard.tsx
│       │   └── ProductFilters.tsx
│       ├── hooks/
│       │   ├── useProducts.ts
│       │   └── useProductFilters.ts
│       ├── lib/
│       │   ├── productService.ts
│       │   └── productUtils.ts
│       └── types.ts
│
├── components/                   # Componentes compartidos
│   ├── primitives/               # Componentes base del design system
│   ├── ui/                       # Componentes UI de shadcn
│   └── layout/                   # Componentes de layout
│       ├── Header.tsx
│       ├── Footer.tsx
│       └── Sidebar.tsx
│
├── lib/                          # Utilidades compartidas
│   ├── api/                      # Cliente API, interceptors
│   ├── utils/                    # Utilidades generales
│   ├── constants/                # Constantes globales
│   └── config/                   # Configuración
│
├── hooks/                        # Hooks compartidos
│   ├── useDebounce.ts
│   └── useLocalStorage.ts
│
└── types/                        # Types globales
    └── index.ts
```

### Reglas de Organización

1. **Features son independientes**: No deben importar de otras features directamente
2. **Componentes compartidos**: Van en `components/` solo si se usan en múltiples features
3. **Utilidades compartidas**: Van en `lib/` si son genéricas
4. **Types compartidos**: Van en `types/` si se usan globalmente

---

## Separación de Responsabilidades

### Capas de la Aplicación

```
┌─────────────────────────────────────┐
│   Presentation Layer (UI)            │
│   - Components, Pages                │
└─────────────────────────────────────┘
           ↓
┌─────────────────────────────────────┐
│   Application Layer (Business Logic)│
│   - Hooks, Services, Validators      │
└─────────────────────────────────────┘
           ↓
┌─────────────────────────────────────┐
│   Data Layer (Data Access)          │
│   - API Clients, Repositories       │
└─────────────────────────────────────┘
           ↓
┌─────────────────────────────────────┐
│   Infrastructure Layer              │
│   - HTTP, Storage, External APIs    │
└─────────────────────────────────────┘
```

### Responsabilidades por Capa

#### Presentation Layer (`components/`, `app/`)

**Responsabilidades:**

- Renderizar UI
- Manejar interacciones del usuario
- Componer componentes
- NO debe contener lógica de negocio compleja

**Ejemplo:**

```tsx
// ✅ Correcto - Solo presentación
export function ProductCard({ product }: ProductCardProps) {
	return (
		<Card>
			<CardHeader>
				<CardTitle>{product.name}</CardTitle>
			</CardHeader>
			<CardBody>
				<p>{product.description}</p>
				<Button onClick={() => handleAddToCart(product.id)}>Add to Cart</Button>
			</CardBody>
		</Card>
	);
}
```

#### Application Layer (`features/*/hooks/`, `features/*/lib/`)

**Responsabilidades:**

- Lógica de negocio
- Validación
- Transformación de datos
- Orquestación de operaciones

**Ejemplo:**

```tsx
// ✅ Correcto - Lógica de negocio
export function useProducts(filters: ProductFilters) {
	const { data, isLoading, error } = useQuery({
		queryKey: ["products", filters],
		queryFn: () => productService.getProducts(filters),
	});

	const filteredProducts = useMemo(() => {
		return applyBusinessRules(data, filters);
	}, [data, filters]);

	return { products: filteredProducts, isLoading, error };
}
```

#### Data Layer (`features/*/lib/*Service.ts`, `lib/api/`)

**Responsabilidades:**

- Comunicación con APIs
- Transformación de datos de API
- Manejo de errores de red
- Caching

**Ejemplo:**

```tsx
// ✅ Correcto - Solo acceso a datos
export const productService = {
	async getProducts(filters: ProductFilters): Promise<Product[]> {
		const response = await apiClient.get("/products", { params: filters });
		return response.data.map(transformProductFromAPI);
	},
};
```

---

## Componentes Server vs Client

### Reglas Fundamentales

1. **Por defecto, Server Components**
2. **Client Components solo cuando es necesario**
3. **Mínimo de Client Components en el árbol**

### Cuándo Usar Server Components

✅ **Usar Server Components para:**

- Fetching de datos
- Acceso a recursos del backend
- Mantener información sensible (tokens, keys)
- Reducir bundle size del cliente
- Mejorar SEO con contenido estático

```tsx
// ✅ Server Component (default)
export default async function ProductPage({ params }: { params: { id: string } }) {
	// Fetching directo en Server Component
	const product = await fetchProduct(params.id);

	return (
		<div>
			<h1>{product.name}</h1>
			<ProductDetails product={product} />
		</div>
	);
}
```

### Cuándo Usar Client Components

✅ **Usar Client Components para:**

- Interactividad (onClick, onChange, etc.)
- Hooks del navegador (useState, useEffect, etc.)
- Event listeners
- APIs del navegador (localStorage, etc.)
- Componentes de terceros que requieren client

```tsx
"use client"; // ✅ Necesario para interactividad

import { useState } from "react";

export function ProductFilters() {
	const [filters, setFilters] = useState({});

	return (
		<div>
			<input onChange={(e) => setFilters({ ...filters, search: e.target.value })} />
		</div>
	);
}
```

### Patrón: Composición Server + Client

```tsx
// ✅ Server Component (parent)
export default async function ProductsPage() {
	const products = await fetchProducts(); // Server-side fetch

	return (
		<div>
			<ProductList products={products} /> {/* Server Component */}
			<ProductFilters /> {/* Client Component - solo la parte interactiva */}
		</div>
	);
}

// ✅ Client Component (solo la parte interactiva)
("use client");
export function ProductFilters() {
	const [filters, setFilters] = useState({});
	// ... lógica interactiva
}

// ✅ Server Component (puede recibir data del server)
export function ProductList({ products }: { products: Product[] }) {
	return (
		<div>
			{products.map((product) => (
				<ProductCard key={product.id} product={product} />
			))}
		</div>
	);
}
```

### Reglas de Importación

```tsx
// ❌ INCORRECTO - No puedes importar Server Components en Client Components
"use client";
import { ServerComponent } from "./ServerComponent"; // Error!

// ✅ CORRECTO - Client Components como children
("use client");
export function ClientWrapper({ children }: { children: React.ReactNode }) {
	return <div>{children}</div>; // children puede ser Server Component
}

// ✅ CORRECTO - Pasar Server Components como props
export function ServerParent() {
	return (
		<ClientWrapper>
			<ServerChild />
		</ClientWrapper>
	);
}
```

### Boundary Pattern

```tsx
// ✅ Crear un boundary para aislar Client Components
"use client";
export function InteractiveSection() {
	const [state, setState] = useState();
	// Toda la interactividad aquí
	return <div>...</div>;
}

// Server Component puede usar el boundary
export default function Page() {
	const data = await fetchData();
	return (
		<div>
			<StaticContent data={data} />
			<InteractiveSection /> {/* Boundary claro */}
		</div>
	);
}
```

---

## Patrones de Data Fetching

### 1. Server Components - Fetching Directo

**Cuándo usar:** Datos que se necesitan para render inicial, SEO crítico

```tsx
// ✅ Fetching directo en Server Component
export default async function ProductPage({ params }: { params: { id: string } }) {
	const product = await fetch(`https://api.example.com/products/${params.id}`, {
		cache: "no-store", // o 'force-cache' para caching
	}).then((res) => res.json());

	return <ProductDetails product={product} />;
}
```

### 2. Server Actions

**Cuándo usar:** Mutaciones desde Server Components, formularios

```tsx
// ✅ Server Action
"use server";

export async function createProduct(formData: FormData) {
	const name = formData.get("name") as string;
	// Validación
	// Guardar en DB
	revalidatePath("/products");
	redirect("/products");
}

// Uso en Server Component
export default function NewProductPage() {
	return (
		<form action={createProduct}>
			<input name="name" />
			<button type="submit">Create</button>
		</form>
	);
}
```

### 3. React Query / TanStack Query (Client)

**Cuándo usar:** Datos que cambian frecuentemente, polling, optimistic updates

```tsx
"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

export function useProducts(filters: ProductFilters) {
	return useQuery({
		queryKey: ["products", filters],
		queryFn: () => productService.getProducts(filters),
		staleTime: 5 * 60 * 1000, // 5 minutos
	});
}

export function useCreateProduct() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: productService.createProduct,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["products"] });
		},
	});
}
```

### 4. Streaming con Suspense

**Cuándo usar:** Mejorar perceived performance, datos independientes

```tsx
// ✅ Streaming con Suspense
export default function DashboardPage() {
	return (
		<div>
			<Suspense fallback={<StatsSkeleton />}>
				<DashboardStats />
			</Suspense>
			<Suspense fallback={<ChartSkeleton />}>
				<DashboardChart />
			</Suspense>
		</div>
	);
}

async function DashboardStats() {
	const stats = await fetchStats(); // Puede ser lento
	return <div>{/* Render stats */}</div>;
}

async function DashboardChart() {
	const data = await fetchChartData(); // Puede ser lento
	return <div>{/* Render chart */}</div>;
}
```

### 5. Parallel Data Fetching

```tsx
// ✅ Fetching paralelo
export default async function ProductPage({ params }: { params: { id: string } }) {
	// Fetching paralelo - no bloquea
	const [product, reviews, related] = await Promise.all([
		fetchProduct(params.id),
		fetchReviews(params.id),
		fetchRelatedProducts(params.id),
	]);

	return (
		<div>
			<ProductDetails product={product} />
			<Reviews reviews={reviews} />
			<RelatedProducts products={related} />
		</div>
	);
}
```

### 6. Caching Strategies

```tsx
// ✅ Revalidación por tiempo
export const revalidate = 3600; // 1 hora

// ✅ Revalidación por tag
fetch(url, { next: { tags: ["products"] } });
revalidateTag("products");

// ✅ Revalidación por path
revalidatePath("/products");

// ✅ Cache estático
fetch(url, { cache: "force-cache" });

// ✅ Sin cache
fetch(url, { cache: "no-store" });
```

---

## Anti-patrones Comunes

### ❌ 1. Client Component innecesario

```tsx
// ❌ INCORRECTO - No necesita 'use client'
"use client";
export function ProductCard({ product }: { product: Product }) {
	return <div>{product.name}</div>; // Solo render, sin interactividad
}

// ✅ CORRECTO - Server Component
export function ProductCard({ product }: { product: Product }) {
	return <div>{product.name}</div>;
}
```

### ❌ 2. Fetching en Client cuando debería ser Server

```tsx
// ❌ INCORRECTO - Fetching en Client para datos iniciales
"use client";
export function ProductsPage() {
	const [products, setProducts] = useState([]);

	useEffect(() => {
		fetch("/api/products")
			.then((res) => res.json())
			.then(setProducts);
	}, []);

	return <ProductList products={products} />;
}

// ✅ CORRECTO - Fetching en Server
export default async function ProductsPage() {
	const products = await fetchProducts();
	return <ProductList products={products} />;
}
```

### ❌ 3. Lógica de negocio en componentes

```tsx
// ❌ INCORRECTO - Lógica compleja en componente
export function ProductList({ products }: { products: Product[] }) {
	const filtered = products
		.filter((p) => p.price > 100)
		.sort((a, b) => b.rating - a.rating)
		.map((p) => ({ ...p, discountedPrice: p.price * 0.9 }));

	return <div>{/* render */}</div>;
}

// ✅ CORRECTO - Lógica en hook o service
export function useFilteredProducts(products: Product[]) {
	return useMemo(() => {
		return productService.filterAndSort(products);
	}, [products]);
}

export function ProductList({ products }: { products: Product[] }) {
	const filtered = useFilteredProducts(products);
	return <div>{/* render */}</div>;
}
```

### ❌ 4. Props drilling excesivo

```tsx
// ❌ INCORRECTO - Props drilling
function App() {
	const user = { id: 1, name: "John" };
	return <Header user={user} />;
}
function Header({ user }) {
	return <Nav user={user} />;
}
function Nav({ user }) {
	return <UserMenu user={user} />;
}

// ✅ CORRECTO - Context o Server Component con data fetching
// Opción 1: Context (si es necesario en Client)
("use client");
const UserContext = createContext();
export function UserProvider({ children, user }) {
	return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
}

// Opción 2: Server Component con data (mejor)
export default async function Layout() {
	const user = await getCurrentUser();
	return <UserProvider user={user}>{children}</UserProvider>;
}
```

### ❌ 5. Importar Server Components en Client Components

```tsx
// ❌ INCORRECTO
"use client";
import { ServerCard } from "./ServerCard"; // Error!

export function ClientComponent() {
	return <ServerCard />;
}

// ✅ CORRECTO - Composición
("use client");
export function ClientWrapper({ children }: { children: React.ReactNode }) {
	return <div>{children}</div>;
}

// En el Server Component
export default function Page() {
	return (
		<ClientWrapper>
			<ServerCard /> {/* OK como children */}
		</ClientWrapper>
	);
}
```

### ❌ 6. Fetching duplicado

```tsx
// ❌ INCORRECTO - Fetching duplicado
export default async function ProductPage({ params }) {
	const product = await fetchProduct(params.id);
	return (
		<div>
			<ProductHeader product={product} />
			<ProductDetails productId={params.id} /> {/* Fetching de nuevo */}
		</div>
	);
}

async function ProductDetails({ productId }) {
	const product = await fetchProduct(productId); // Duplicado!
	return <div>{product.description}</div>;
}

// ✅ CORRECTO - Pasar datos como props
export default async function ProductPage({ params }) {
	const product = await fetchProduct(params.id);
	return (
		<div>
			<ProductHeader product={product} />
			<ProductDetails product={product} /> {/* Recibe como prop */}
		</div>
	);
}
```

### ❌ 7. No usar Suspense para loading states

```tsx
// ❌ INCORRECTO - Loading manual
export default async function Page() {
	const data = await slowFetch(); // Bloquea todo
	return <Content data={data} />;
}

// ✅ CORRECTO - Suspense boundaries
export default function Page() {
	return (
		<Suspense fallback={<Loading />}>
			<SlowContent />
		</Suspense>
	);
}
```

### ❌ 8. Mezclar Server y Client logic

```tsx
// ❌ INCORRECTO - Mezcla de lógica
"use client";
export async function Component() {
	// async en Client Component!
	const data = await fetchData();
	const [state, setState] = useState(); // useState necesita 'use client'
	return <div>...</div>;
}

// ✅ CORRECTO - Separar responsabilidades
// Server Component
export default async function Page() {
	const data = await fetchData();
	return <InteractiveComponent initialData={data} />;
}

// Client Component
("use client");
export function InteractiveComponent({ initialData }) {
	const [state, setState] = useState();
	return <div>...</div>;
}
```

---

## Guía de Migración

### Paso 1: Identificar Features

1. Agrupar código relacionado por funcionalidad
2. Identificar dependencias entre features
3. Planificar orden de migración

### Paso 2: Crear Estructura

```bash
# Crear estructura de feature
mkdir -p src/features/products/{components,hooks,lib,types}
```

### Paso 3: Mover Código

1. Mover componentes específicos a `features/*/components/`
2. Mover hooks a `features/*/hooks/`
3. Mover servicios a `features/*/lib/`
4. Mover types a `features/*/types.ts`

### Paso 4: Actualizar Imports

```tsx
// Antes
import { ProductCard } from "@/components/products/ProductCard";

// Después
import { ProductCard } from "@/features/products/components/ProductCard";
```

### Paso 5: Refactorizar Server/Client

1. Identificar componentes que necesitan 'use client'
2. Mover fetching a Server Components
3. Crear boundaries claros

---

## Checklist de Arquitectura

Antes de crear nuevo código:

- [ ] ¿Es código específico de una feature? → `features/*/`
- [ ] ¿Es compartido entre features? → `components/` o `lib/`
- [ ] ¿Necesita interactividad? → 'use client'
- [ ] ¿Puede ser Server Component? → Remover 'use client'
- [ ] ¿Dónde debe ir el fetching? → Server Component o hook
- [ ] ¿Hay lógica de negocio? → Mover a hook o service
- [ ] ¿Está bien separado por responsabilidades? → Revisar capas

---

## Recursos

- [Next.js App Router Documentation](https://nextjs.org/docs/app)
- [React Server Components](https://react.dev/blog/2023/03/22/react-labs-what-we-have-been-working-on-march-2023#react-server-components)
- [Feature-Sliced Design](https://feature-sliced.design/)
