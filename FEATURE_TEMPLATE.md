# Feature Template - Users

Este documento sirve como **template y ejemplo de referencia** para crear nuevas features en el proyecto Observatory.

## 📁 Estructura de la Feature

```
src/features/users/
├── components/          # Componentes específicos de la feature
│   ├── UserCard.tsx
│   ├── UserList.tsx
│   └── UserForm.tsx
├── hooks/              # Application layer hooks
│   └── useUsers.ts
├── lib/                # Data layer (services y utils)
│   ├── userService.ts
│   └── userUtils.ts
├── schemas.ts          # Validación con Zod
├── types.ts            # TypeScript types
├── index.ts            # Public API exports
└── README.md           # Documentación de la feature (opcional)
```

## 📝 Archivos Obligatorios

### 1. `types.ts` - Definición de Tipos

**Propósito:** Definir todos los tipos TypeScript relacionados con la feature.

**Contenido:**

- Interfaces principales (entidades)
- Enums
- DTOs (Data Transfer Objects)
- Tipos de filtros

**Ejemplo:**

```typescript
export interface User {
	id: string;
	email: string;
	name: string;
	role: UserRole;
	status: UserStatus;
	createdAt: Date;
	updatedAt: Date;
}

export enum UserRole {
	ADMIN = "admin",
	USER = "user",
}

export interface CreateUserDto {
	email: string;
	name: string;
	password: string;
}
```

### 2. `schemas.ts` - Validación con Zod

**Propósito:** Schemas de validación para formularios y API requests.

**Contenido:**

- Schemas de validación usando Zod
- Type inference de los schemas
- Validaciones reutilizables

**Ejemplo:**

```typescript
import { z } from "zod";

export const createUserSchema = z.object({
	email: z.string().email(),
	name: z.string().min(2),
	password: z.string().min(8),
});

export type CreateUserInput = z.infer<typeof createUserSchema>;
```

**Reglas:**

- ✅ Validar todos los inputs
- ✅ Mensajes de error claros
- ✅ Usar `.strict()` para evitar campos extra
- ✅ Exportar tipos inferidos

### 3. `lib/{feature}Service.ts` - Data Layer

**Propósito:** Servicio que maneja toda la comunicación con la API.

**Estructura:**

```typescript
// 1. Interface para formato API (interno)
interface ApiUser {
	id: string;
	created_at: string; // snake_case de la API
}

// 2. Función de transformación (interna)
function transformUserFromAPI(data: ApiUser): User {
	return {
		id: data.id,
		createdAt: new Date(data.created_at),
	};
}

// 3. Service object (exportado)
export const userService = {
	async getUsers(): Promise<User[]> {},
	async getUserById(id: string): Promise<User> {},
	async createUser(dto: CreateUserDto): Promise<User> {},
	async updateUser(id: string, dto: UpdateUserDto): Promise<User> {},
	async deleteUser(id: string): Promise<void> {},
};
```

**Reglas:**

- ✅ SIEMPRE usar `apiClient` (nunca `fetch`)
- ✅ Transformar datos API → App format
- ✅ Manejar errores con `ApiError`
- ✅ Detectar Server vs Client Component
- ✅ JSDoc en cada método

### 4. `lib/{feature}Utils.ts` - Utilidades

**Propósito:** Funciones de utilidad específicas de la feature.

**Contenido:**

- Funciones de filtrado
- Funciones de ordenamiento
- Helpers de formato
- Funciones de validación de negocio

**Ejemplo:**

```typescript
export function applyUserFilters(users: User[], filters: UserFilters): User[] {
	// Lógica de filtrado
}

export function sortUsers(users: User[], sortBy: string): User[] {
	// Lógica de ordenamiento
}
```

### 5. `hooks/use{Feature}s.ts` - Application Layer

**Propósito:** Hooks que combinan data fetching con lógica de negocio.

**Estructura:**

```typescript
"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

export function useUsers(filters?: UserFilters) {
	const { data, isLoading, error } = useQuery({
		queryKey: ["users", filters],
		queryFn: () => userService.getUsers(),
		staleTime: 5 * 60 * 1000,
	});

	// Aplicar lógica de negocio (filtros, sorting)
	const processedUsers = useMemo(() => {
		// ...
	}, [data, filters]);

	return { users: processedUsers, isLoading, error };
}

export function useCreateUser() {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: (dto: CreateUserDto) => userService.createUser(dto),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["users"] });
		},
	});
}
```

**Reglas:**

- ✅ SIEMPRE `"use client"` al inicio
- ✅ Usar React Query
- ✅ Query keys consistentes
- ✅ Invalidar cache en mutations
- ✅ Lógica de negocio en el hook

### 6. `components/{Component}.tsx` - UI Layer

**Server Component (default):**

```typescript
import { userService } from "../lib/userService";

export async function UserList() {
  const users = await userService.getUsers();
  return <div>{/* Render users */}</div>;
}
```

**Client Component (cuando necesario):**

```typescript
"use client";

import { useState } from "react";
import { useUsers } from "../hooks/useUsers";

export function UserForm() {
	const [formData, setFormData] = useState({});
	const { users } = useUsers();
	// ...
}
```

**Reglas:**

- ✅ Server Component por defecto
- ✅ `"use client"` solo si es necesario
- ✅ Props tipadas
- ✅ JSDoc con ejemplo
- ✅ Accesibilidad completa

### 7. `index.ts` - Public API

**Propósito:** Exportar solo lo que otras partes de la app necesitan.

**Estructura:**

```typescript
// Components
export { UserCard } from "./components/UserCard";
export { UserList } from "./components/UserList";

// Hooks
export { useUsers, useUser } from "./hooks/useUsers";

// Types
export type { User, UserFilters } from "./types";

// Schemas
export { createUserSchema } from "./schemas";

// Services (opcional, generalmente no se exportan)
export { userService } from "./lib/userService";
```

**Reglas:**

- ✅ Exportar solo lo necesario
- ✅ Organizar por categorías
- ✅ No exportar implementaciones internas

## ✅ Checklist para Nueva Feature

- [ ] Estructura de carpetas creada
- [ ] `types.ts` con todos los tipos
- [ ] `schemas.ts` con validaciones Zod
- [ ] `{feature}Service.ts` implementado
- [ ] `{feature}Utils.ts` con utilidades
- [ ] Hooks creados con React Query
- [ ] Componentes creados (mínimo 1)
- [ ] `index.ts` exporta public API
- [ ] Tests unitarios (mínimo 80% coverage)
- [ ] Documentación en código (JSDoc)
- [ ] Accesibilidad verificada
- [ ] TypeScript sin errores

## 📚 Referencias

- Ver `src/features/users/` como ejemplo completo
- Consultar `AI_GUIDE.md` para reglas detalladas
- Consultar `ARCHITECTURE.md` para principios arquitectónicos

## 🎯 Siguiente Feature

Para crear una nueva feature (ej: `billing`):

1. Copiar estructura de `users/`
2. Reemplazar `User` → `Billing`, `user` → `billing`
3. Adaptar tipos y lógica de negocio
4. Seguir este template

---

**Última actualización:** 2024
**Mantenedor:** Principal Engineer
