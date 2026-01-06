# Estructura del Proyecto Observatory

> **Guía completa de la estructura de carpetas y organización del código**

## 📁 Estructura Completa

```
observatory/
├── src/
│   ├── app/                    # Next.js App Router (Rutas)
│   │   ├── (auth)/             # Route groups (no afectan URL)
│   │   ├── (dashboard)/        # Route groups
│   │   ├── api/                # API Routes
│   │   ├── users/              # Páginas de features
│   │   ├── layout.tsx          # Root layout
│   │   ├── page.tsx            # Home page
│   │   ├── error.tsx           # Error boundary
│   │   └── globals.css         # Estilos globales
│   │
│   ├── components/             # Componentes compartidos
│   │   ├── ui/                 # shadcn/ui components
│   │   ├── shared/             # Componentes reutilizables
│   │   ├── layouts/            # Layout components (Header, Footer, etc.)
│   │   ├── primitives/         # Design system primitives
│   │   └── examples/           # Component examples
│   │
│   ├── features/               # Features de negocio (Feature-First)
│   │   ├── users/              # Feature: Users (EJEMPLO COMPLETO)
│   │   │   ├── components/     # Componentes específicos
│   │   │   │   ├── UserCard.tsx
│   │   │   │   ├── UserList.tsx
│   │   │   │   └── UserForm.tsx
│   │   │   ├── hooks/          # Application layer
│   │   │   │   └── useUsers.ts
│   │   │   ├── lib/            # Data layer
│   │   │   │   ├── userService.ts
│   │   │   │   └── userUtils.ts
│   │   │   ├── schemas.ts      # Validación Zod
│   │   │   ├── types.ts        # TypeScript types
│   │   │   └── index.ts        # Public API
│   │   ├── auth/               # Feature: Authentication
│   │   └── billing/            # Feature: Billing
│   │
│   ├── lib/                    # Utilidades compartidas
│   │   ├── api/                # API client
│   │   │   ├── api-client.ts
│   │   │   └── index.ts
│   │   ├── config/             # Configuración
│   │   ├── constants/          # Constantes globales
│   │   │   └── index.ts
│   │   ├── utils/              # Utilidades generales
│   │   │   └── utils.ts
│   │   ├── validations/        # Schemas de validación compartidos
│   │   │   └── index.ts
│   │   ├── env.ts              # Environment variables
│   │   └── design-tokens.ts   # Design tokens
│   │
│   ├── hooks/                  # Hooks compartidos
│   │   └── index.ts
│   │
│   ├── services/               # Servicios externos (APIs, SDKs)
│   │   └── index.ts
│   │
│   ├── store/                  # Estado global (Zustand/Redux)
│   │   └── index.ts
│   │
│   ├── styles/                 # Estilos adicionales
│   │
│   ├── types/                  # Types globales
│   │   └── index.ts
│   │
│   └── tests/                  # Tests compartidos
│
├── public/                     # Archivos estáticos
├── .env.example                # Template de variables de entorno
└── [archivos de configuración]
```

## 🎯 Características de la Estructura

### 1. Feature-First Architecture

Cada feature es un módulo independiente y autocontenido:

```
features/{feature-name}/
├── components/     # UI específica
├── hooks/          # Lógica de aplicación
├── lib/            # Servicios y utilidades
├── schemas.ts      # Validación
├── types.ts        # Tipos
└── index.ts        # Public API
```

**Ventajas:**

- ✅ Fácil de encontrar código relacionado
- ✅ Features independientes (bajo acoplamiento)
- ✅ Escalable para equipos grandes
- ✅ Cada desarrollador puede trabajar en su módulo

### 2. Separación de Capas

```
UI (Components) → Application (Hooks) → Data (Services) → API (Client)
```

**Regla:** Cada capa solo conoce la capa inmediatamente inferior.

### 3. Carpetas Compartidas

- `components/shared/` - Componentes usados en 2+ features
- `components/ui/` - shadcn/ui components
- `lib/` - Utilidades compartidas
- `hooks/` - Hooks compartidos
- `services/` - Clientes de APIs externas

## 📚 Ejemplo Completo: Feature Users

La feature `users` está completamente implementada como **referencia** para otras features.

### Archivos Creados

1. **`types.ts`** - Tipos TypeScript
   - `User` interface
   - `UserRole`, `UserStatus` enums
   - `CreateUserDto`, `UpdateUserDto`
   - `UserFilters`

2. **`schemas.ts`** - Validación Zod
   - `createUserSchema`
   - `updateUserSchema`
   - `updateUserPasswordSchema`
   - `userFiltersSchema`
   - Type inference

3. **`lib/userService.ts`** - Data Layer
   - `getUsers()`
   - `getUserById()`
   - `createUser()`
   - `updateUser()`
   - `deleteUser()`
   - Transformación API → App format

4. **`lib/userUtils.ts`** - Utilidades
   - `applyUserFilters()`
   - `sortUsers()`
   - `getUserRoleDisplayName()`
   - Helpers de validación

5. **`hooks/useUsers.ts`** - Application Layer
   - `useUsers()` - Query hook
   - `useUser()` - Single item query
   - `useCreateUser()` - Mutation
   - `useUpdateUser()` - Mutation
   - `useDeleteUser()` - Mutation

6. **`components/UserCard.tsx`** - Server Component
   - Muestra un usuario en formato card
   - Usa componentes primitivos

7. **`components/UserList.tsx`** - Server Component
   - Lista de usuarios
   - Data fetching en servidor

8. **`components/UserForm.tsx`** - Client Component
   - Formulario de creación/edición
   - Validación con Zod
   - Manejo de estado

9. **`index.ts`** - Public API
   - Exporta solo lo necesario
   - Organizado por categorías

### Uso de la Feature

```typescript
// En un componente
import { UserList, useUsers, createUserSchema } from "@/features/users";

// En una página
import { UserList } from "@/features/users";
```

## 🚀 Crear una Nueva Feature

### Paso 1: Crear Estructura

```bash
mkdir -p src/features/{feature-name}/{components,hooks,lib}
```

### Paso 2: Seguir el Template

Ver `FEATURE_TEMPLATE.md` para guía detallada.

### Paso 3: Copiar de Users

1. Copiar estructura de `users/`
2. Reemplazar nombres (`User` → `{Feature}`)
3. Adaptar lógica de negocio
4. Seguir convenciones

### Checklist

- [ ] `types.ts` creado
- [ ] `schemas.ts` con validaciones Zod
- [ ] `{feature}Service.ts` implementado
- [ ] `{feature}Utils.ts` con utilidades
- [ ] Hooks creados
- [ ] Componentes creados
- [ ] `index.ts` exporta public API
- [ ] Tests escritos
- [ ] Documentación (JSDoc)

## 📖 Convenciones

### Nombres de Archivos

| Tipo      | Convención            | Ejemplo          |
| --------- | --------------------- | ---------------- |
| Component | PascalCase            | `UserCard.tsx`   |
| Hook      | camelCase + "use"     | `useUsers.ts`    |
| Service   | camelCase + "Service" | `userService.ts` |
| Util      | camelCase + "Utils"   | `userUtils.ts`   |
| Type      | camelCase             | `types.ts`       |
| Schema    | camelCase             | `schemas.ts`     |

### Nombres de Carpetas

| Tipo      | Convención | Ejemplo           |
| --------- | ---------- | ----------------- |
| Feature   | kebab-case | `user-management` |
| Component | kebab-case | `user-card`       |

## 🔗 Referencias

- **`FEATURE_TEMPLATE.md`** - Template detallado para nuevas features
- **`AI_GUIDE.md`** - Guía completa de desarrollo
- **`ARCHITECTURE.md`** - Principios arquitectónicos
- **`src/features/users/`** - Ejemplo completo de referencia

## ✅ Estructura Lista para Equipos

Esta estructura está diseñada para:

- ✅ **Múltiples desarrolladores** trabajando en paralelo
- ✅ **Features independientes** sin conflictos
- ✅ **Escalabilidad** fácil de mantener
- ✅ **Onboarding rápido** con ejemplos claros
- ✅ **Type safety** en todo el código
- ✅ **Validación consistente** con Zod

---

**Última actualización:** 2024
**Mantenedor:** Principal Engineer
