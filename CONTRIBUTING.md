# Guía de Contribución

## Tabla de Contenidos

1. [Introducción](#introducción)
2. [Convenciones de Carpetas](#convenciones-de-carpetas)
3. [Convenciones de Naming](#convenciones-de-naming)
4. [Estrategia de Pull Requests](#estrategia-de-pull-requests)
5. [Code Review Checklist](#code-review-checklist)
6. [Workflow de Desarrollo](#workflow-de-desarrollo)

---

## Introducción

Esta guía establece las reglas y convenciones para contribuir al proyecto. Seguir estas reglas asegura consistencia, mantenibilidad y colaboración efectiva en un equipo grande.

### Principios

- **Consistencia**: Mismo estilo en todo el código
- **Claridad**: Código autodocumentado y fácil de entender
- **Colaboración**: PRs claros y reviews constructivos
- **Calidad**: Código probado y revisado antes de merge

---

## Convenciones de Carpetas

### Estructura Base

```
src/
├── app/                          # Next.js App Router (solo rutas)
│   ├── (route-groups)/          # Route groups para organización
│   │   └── feature-name/
│   │       ├── page.tsx
│   │       └── layout.tsx
│   └── layout.tsx
│
├── features/                     # Features de negocio
│   └── feature-name/
│       ├── components/          # Componentes específicos
│       ├── hooks/               # Custom hooks
│       ├── lib/                 # Servicios y utilidades
│       ├── types.ts             # Types específicos
│       ├── actions.ts           # Server Actions (opcional)
│       └── index.ts             # Barrel export
│
├── components/                   # Componentes compartidos
│   ├── primitives/              # Componentes base del design system
│   ├── ui/                      # Componentes UI de shadcn
│   └── layout/                  # Componentes de layout
│
├── lib/                         # Utilidades compartidas
│   ├── api/                     # Cliente API
│   ├── utils/                   # Utilidades generales
│   └── config/                  # Configuración
│
└── types/                       # Types globales
```

### Reglas de Carpetas

#### ✅ DO

- **Features independientes**: Cada feature en su propia carpeta
- **Barrel exports**: Usar `index.ts` para exports centralizados
- **Co-location**: Código relacionado junto (componente + test + types)
- **Route groups**: Usar `(nombre)` para agrupar rutas relacionadas

```tsx
// ✅ Correcto - Feature completa
features/
  products/
    components/
      ProductCard.tsx
      ProductCard.test.tsx      # Test junto al componente
      ProductCard.types.ts      # Types específicos si son complejos
    hooks/
    lib/
    index.ts
```

#### ❌ DON'T

- **No mezclar features**: No importar de otras features directamente
- **No duplicar estructura**: No crear `components/` dentro de `app/`
- **No anidar excesivamente**: Máximo 3-4 niveles de profundidad

```tsx
// ❌ Incorrecto - Mezclar features
features / products / components / UserProfile.tsx; // No pertenece aquí
```

### Convenciones por Tipo de Archivo

#### Componentes

```
components/
  FeatureName/
    FeatureName.tsx              # Componente principal
    FeatureName.test.tsx         # Tests
    FeatureName.stories.tsx      # Storybook (opcional)
    FeatureName.types.ts         # Types si son complejos
    index.ts                     # Export
```

#### Hooks

```
hooks/
  useFeatureName.ts              # Hook principal
  useFeatureName.test.ts         # Tests
  index.ts                       # Export
```

#### Services/Utils

```
lib/
  featureName/
    featureNameService.ts        # Servicio
    featureNameUtils.ts          # Utilidades
    featureName.test.ts          # Tests
```

---

## Convenciones de Naming

### Archivos y Carpetas

#### Componentes

```tsx
// ✅ PascalCase para componentes
ProductCard.tsx;
UserProfile.tsx;
DashboardStats.tsx;

// ✅ Con sufijos descriptivos
ProductCard.client.tsx; // Client Component explícito
ProductCard.server.tsx; // Server Component explícito (opcional)
ProductCard.test.tsx; // Tests
ProductCard.stories.tsx; // Storybook
```

#### Hooks

```tsx
// ✅ use + PascalCase
useProducts.ts;
useAuth.ts;
useLocalStorage.ts;

// ✅ Hooks específicos
useProductFilters.ts;
useDashboardData.ts;
```

#### Services/Utils

```tsx
// ✅ camelCase + sufijo descriptivo
productService.ts;
authService.ts;
dateUtils.ts;
validationUtils.ts;
```

#### Types/Interfaces

```tsx
// ✅ PascalCase
Product.ts;
UserProfile.ts;
ApiResponse.ts;

// ✅ Con sufijos cuando es necesario
ProductCardProps.ts;
UserFormData.ts;
```

#### Constantes

```tsx
// ✅ UPPER_SNAKE_CASE para constantes
const API_BASE_URL = "https://api.example.com";
const MAX_RETRY_ATTEMPTS = 3;
const DEFAULT_PAGE_SIZE = 20;
```

### Variables y Funciones

#### Variables

```tsx
// ✅ camelCase
const productList = [];
const isLoading = true;
const userProfile = {};

// ✅ Booleanos con prefijo is/has/should
const isVisible = true;
const hasPermission = false;
const shouldRender = true;
```

#### Funciones

```tsx
// ✅ camelCase con verbo descriptivo
function fetchProducts() {}
function calculateTotal() {}
function validateEmail() {}

// ✅ Async functions
async function getUserData() {}
async function createProduct() {}
```

#### Componentes

```tsx
// ✅ PascalCase
function ProductCard() {}
function UserProfile() {}

// ✅ Props interface
interface ProductCardProps {}
interface UserProfileProps {}
```

### Naming Patterns

#### Feature Naming

```tsx
// ✅ Singular para feature name
features/products/        // No "product" ni "products-feature"
features/auth/           // No "authentication"
features/dashboard/      // No "dashboards"
```

#### Component Naming

```tsx
// ✅ Nombre descriptivo y específico
<ProductCard />          // No <Card />
<UserProfileForm />      // No <Form />
<DashboardStats />       // No <Stats />

// ✅ Composición clara
<ProductCard />
<ProductCardSkeleton />
<ProductCardActions />
```

#### Hook Naming

```tsx
// ✅ use + verbo/objeto
useProducts(); // Obtiene productos
useAuth(); // Maneja autenticación
useLocalStorage(); // Utilidad de localStorage

// ✅ Específicos cuando es necesario
useProductFilters(); // Filtros específicos de productos
useDashboardData(); // Datos específicos del dashboard
```

### Imports

```tsx
// ✅ Orden de imports
// 1. React y Next.js
import { useState } from "react";
import { useRouter } from "next/navigation";

// 2. Librerías de terceros
import { useQuery } from "@tanstack/react-query";
import { z } from "zod";

// 3. Componentes compartidos
import { Button } from "@/components/primitives/Button";
import { Card } from "@/components/primitives/Card";

// 4. Features (mismo feature primero)
import { useProducts } from "@/features/products";
import { ProductCard } from "@/features/products/components/ProductCard";

// 5. Utilidades y tipos
import { cn } from "@/lib/utils";
import { Product } from "@/features/products/types";

// 6. Types (al final si son muchos)
import type { ProductCardProps } from "./ProductCard.types";
```

---

## Estrategia de Pull Requests

### Flujo de Trabajo

```
main (production)
  ↑
develop (staging)
  ↑
feature/feature-name (feature branch)
```

### Creación de Branches

#### Naming de Branches

```bash
# ✅ Feature branches
feature/products-list
feature/user-authentication
feature/dashboard-stats

# ✅ Bug fixes
fix/product-card-styling
fix/auth-redirect-issue

# ✅ Hotfixes
hotfix/critical-security-patch

# ✅ Refactoring
refactor/product-service
refactor/auth-hooks

# ❌ Evitar
feat/new-thing          # Usar "feature" en lugar de "feat"
bug/fix                 # Muy genérico
test                    # No descriptivo
```

#### Creación

```bash
# 1. Actualizar develop
git checkout develop
git pull origin develop

# 2. Crear feature branch
git checkout -b feature/products-list

# 3. Trabajar en el branch
# ... hacer commits ...

# 4. Push y crear PR
git push origin feature/products-list
```

### Estructura de PR

#### Título

```markdown
# ✅ Formato: [Tipo] Descripción breve

[Feature] Add product filtering and search
[Bugfix] Fix product card image loading
[Refactor] Improve product service error handling
[Docs] Update architecture documentation
```

#### Descripción

```markdown
## Descripción

Breve descripción de qué hace este PR y por qué es necesario.

## Tipo de Cambio

- [ ] Nueva feature
- [ ] Bug fix
- [ ] Refactoring
- [ ] Documentación
- [ ] Performance improvement

## Cambios Realizados

- Lista de cambios principales
- Cada cambio en una línea
- Ser específico

## Testing

- [ ] Tests unitarios agregados/actualizados
- [ ] Tests de integración agregados/actualizados
- [ ] Probado manualmente en [entorno]

## Screenshots (si aplica)

[Agregar screenshots para cambios de UI]

## Checklist

- [ ] Código sigue las convenciones del proyecto
- [ ] Self-review completado
- [ ] Comentarios agregados donde sea necesario
- [ ] Documentación actualizada
- [ ] No hay warnings de linter
- [ ] Tests pasan
- [ ] No hay breaking changes (o están documentados)

## Relacionado

Closes #123
Relates to #456
```

### Tamaño de PR

#### ✅ PRs Pequeños y Enfocados

- **Ideal**: 200-400 líneas de código
- **Máximo**: 1000 líneas
- **Si es más grande**: Dividir en múltiples PRs

#### Estrategia para PRs Grandes

```markdown
# PR Principal: Feature completa

feature/products-management

# PRs Dependientes (mergear primero)

feature/products-list # Lista de productos
feature/product-filters # Filtros
feature/product-details # Detalles del producto
```

### Commits en PR

#### Convenciones de Commits

```bash
# ✅ Formato: [Tipo] Descripción breve

feat: add product filtering
fix: resolve product card image loading
refactor: improve product service error handling
docs: update architecture guide
test: add product service tests
style: format product card component
chore: update dependencies
```

#### Tipos de Commits

- `feat`: Nueva feature
- `fix`: Bug fix
- `refactor`: Refactoring sin cambio de funcionalidad
- `docs`: Solo documentación
- `test`: Agregar o modificar tests
- `style`: Formato, punto y coma, etc. (no afecta código)
- `chore`: Tareas de mantenimiento
- `perf`: Mejoras de performance
- `ci`: Cambios en CI/CD

#### Buenas Prácticas

```bash
# ✅ Commits atómicos
git commit -m "feat: add product search input"
git commit -m "feat: implement product search logic"
git commit -m "test: add product search tests"

# ❌ Commits grandes
git commit -m "feat: add product search and filters and details"
```

### Reviewers

#### Asignación

- **Mínimo**: 1 reviewer
- **Recomendado**: 2 reviewers para features grandes
- **Obligatorio**: Tech Lead para cambios arquitectónicos

#### Etiquetas

```markdown
# Etiquetas útiles

[WIP] - Work in progress (no mergear)
[Ready for Review] - Listo para review
[Needs Discussion] - Requiere discusión
[Breaking Change] - Cambios que rompen compatibilidad
```

---

## Code Review Checklist

### Checklist para Autor

Antes de crear el PR, verificar:

#### Código

- [ ] **Convenciones**: Sigue las convenciones de naming y estructura
- [ ] **Linter**: No hay errores de linter (`npm run lint`)
- [ ] **Types**: TypeScript sin errores
- [ ] **Tests**: Tests agregados/actualizados y pasan
- [ ] **Imports**: Imports ordenados y sin duplicados
- [ ] **Comentarios**: Código autodocumentado, comentarios solo donde necesario
- [ ] **Dead code**: No hay código comentado o sin usar
- [ ] **Console logs**: Removidos console.logs de debug

#### Funcionalidad

- [ ] **Funciona**: Probado manualmente
- [ ] **Edge cases**: Casos límite manejados
- [ ] **Error handling**: Errores manejados apropiadamente
- [ ] **Loading states**: Estados de carga implementados
- [ ] **Empty states**: Estados vacíos manejados

#### Performance

- [ ] **Server Components**: Usados cuando es posible
- [ ] **Re-renders**: Evitados re-renders innecesarios
- [ ] **Bundle size**: No agrega dependencias innecesarias
- [ ] **Caching**: Caching apropiado para data fetching

#### Accesibilidad

- [ ] **ARIA labels**: Agregados donde es necesario
- [ ] **Keyboard navigation**: Navegable con teclado
- [ ] **Focus visible**: Focus visible en elementos interactivos
- [ ] **Contraste**: Contraste de colores adecuado

#### Seguridad

- [ ] **Sensitive data**: No expone datos sensibles
- [ ] **Input validation**: Validación de inputs
- [ ] **XSS**: Prevención de XSS en user input

### Checklist para Reviewer

#### Revisión Inicial

- [ ] **Título claro**: Título del PR es descriptivo
- [ ] **Descripción completa**: Descripción explica qué y por qué
- [ ] **Tamaño apropiado**: PR no es demasiado grande
- [ ] **Tests pasan**: Todos los tests pasan en CI

#### Arquitectura

- [ ] **Feature-first**: Sigue la arquitectura feature-first
- [ ] **Separación de capas**: Presentación, aplicación, datos separados
- [ ] **Server/Client**: Uso apropiado de Server y Client Components
- [ ] **No duplicación**: No duplica código existente
- [ ] **Reutilización**: Reutiliza componentes/hooks existentes cuando es posible

#### Código

- [ ] **Legible**: Código es fácil de leer y entender
- [ ] **Mantenible**: Fácil de mantener y extender
- [ ] **Performance**: No introduce problemas de performance
- [ ] **Error handling**: Manejo de errores apropiado
- [ ] **Edge cases**: Casos límite considerados

#### Testing

- [ ] **Cobertura**: Tests cubren funcionalidad nueva
- [ ] **Tests relevantes**: Tests son útiles y no redundantes
- [ ] **Mocks apropiados**: Mocks usados correctamente

#### Documentación

- [ ] **Comentarios**: Comentarios donde es necesario
- [ ] **JSDoc**: JSDoc en funciones complejas
- [ ] **README**: README actualizado si es necesario
- [ ] **Changelog**: Changelog actualizado (si aplica)

### Tipos de Comentarios en Review

#### ✅ Approve

```markdown
LGTM! (Looks Good To Me)
✅ Approved
```

#### 🔄 Request Changes

```markdown
## Sugerencias

1. **Performance**: Considera usar `useMemo` aquí para evitar re-cálculos
2. **Naming**: `handleClick` es muy genérico, considera `handleAddToCart`
3. **Error handling**: Falta manejo de error cuando la API falla

Por favor, revisa estos puntos antes de re-request review.
```

#### 💬 Comentarios

```markdown
**Pregunta**: ¿Por qué usamos `useState` aquí en lugar de Server Component?

**Sugerencia**: Podríamos extraer esta lógica a un hook personalizado.

**Observación**: Este componente podría beneficiarse de Suspense.
```

### Proceso de Review

#### 1. Revisión Inicial (15-30 min)

- Leer descripción del PR
- Revisar cambios de alto nivel
- Verificar que tests pasan
- Identificar problemas obvios

#### 2. Revisión Detallada (30-60 min)

- Revisar cada archivo cambiado
- Verificar lógica de negocio
- Revisar tests
- Verificar convenciones

#### 3. Feedback

- Comentarios constructivos
- Explicar el "por qué" de sugerencias
- Ofrecer alternativas cuando sea posible
- Ser respetuoso y profesional

#### 4. Aprobación

- Aprobar cuando está listo
- O re-request review después de cambios

### Reglas de Merge

#### Requisitos para Merge

- [ ] ✅ Al menos 1 approval
- [ ] ✅ Todos los tests pasan
- [ ] ✅ No hay conflictos
- [ ] ✅ Linter sin errores
- [ ] ✅ Build exitoso

#### Merge Strategy

```bash
# ✅ Preferir: Squash and Merge
# Mantiene historial limpio

# ✅ Alternativa: Rebase and Merge
# Para PRs pequeños y limpios

# ❌ Evitar: Merge commit
# Crea historial confuso
```

---

## Workflow de Desarrollo

### Día a Día

#### 1. Inicio del Día

```bash
# Actualizar develop
git checkout develop
git pull origin develop

# Verificar estado
npm run lint
npm run test
```

#### 2. Trabajando en Feature

```bash
# Crear branch
git checkout -b feature/nombre-feature

# Hacer cambios
# ... código ...

# Commits frecuentes
git add .
git commit -m "feat: descripción clara"

# Push regular
git push origin feature/nombre-feature
```

#### 3. Antes de PR

```bash
# Actualizar con develop
git checkout develop
git pull origin develop
git checkout feature/nombre-feature
git rebase develop  # o merge develop

# Verificar
npm run lint
npm run test
npm run build

# Push
git push origin feature/nombre-feature --force-with-lease
```

#### 4. Después de Merge

```bash
# Limpiar branch local
git checkout develop
git pull origin develop
git branch -d feature/nombre-feature
```

### Resolución de Conflictos

```bash
# 1. Actualizar develop
git checkout develop
git pull origin develop

# 2. Rebase feature branch
git checkout feature/nombre-feature
git rebase develop

# 3. Resolver conflictos
# ... editar archivos ...

# 4. Continuar rebase
git add .
git rebase --continue

# 5. Push
git push origin feature/nombre-feature --force-with-lease
```

---

## Herramientas y Configuración

### Pre-commit Hooks

```json
// .husky/pre-commit
#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"

npm run lint-staged
npm run type-check
```

### Lint-staged

```json
{
	"lint-staged": {
		"*.{ts,tsx}": ["eslint --fix", "prettier --write"]
	}
}
```

### CI/CD

```yaml
# .github/workflows/ci.yml
- Lint check
- Type check
- Unit tests
- Build check
- E2E tests (opcional)
```

---

## Recursos

- [Conventional Commits](https://www.conventionalcommits.org/)
- [Feature-Sliced Design](https://feature-sliced.design/)
- [Next.js Best Practices](https://nextjs.org/docs/app/building-your-application/routing/colocation)

---

## Preguntas Frecuentes

### ¿Cuándo crear un PR?

Cuando la feature está:

- ✅ Funcionalmente completa
- ✅ Probada
- ✅ Sin errores de linter
- ✅ Lista para review

### ¿Qué hacer si el PR es muy grande?

Dividir en múltiples PRs:

1. PR base con estructura
2. PRs incrementales con funcionalidad

### ¿Cómo manejar PRs bloqueados?

1. Comunicar claramente qué se necesita
2. Pedir ayuda si es necesario
3. Considerar dividir el PR

---

## Contacto

Para preguntas sobre estas reglas:

- Crear issue con label `question`
- Preguntar en canal de Slack #dev-discussion
- Contactar a Tech Lead
