# Design System Documentation

## Tabla de Contenidos

1. [Introducción](#introducción)
2. [Convenciones de Nombres](#convenciones-de-nombres)
3. [Tokens de Diseño](#tokens-de-diseño)
4. [Estructura de Componentes](#estructura-de-componentes)
5. [Accesibilidad](#accesibilidad)
6. [Uso de CVA (Class Variance Authority)](#uso-de-cva)

---

## Introducción

Este sistema de diseño proporciona una base escalable y consistente para construir interfaces de usuario en Next.js usando Tailwind CSS y shadcn/ui.

### Principios Fundamentales

- **Consistencia**: Todos los componentes siguen las mismas convenciones
- **Escalabilidad**: Fácil de extender sin romper la consistencia
- **Accesibilidad**: Cumple con WCAG 2.1 AA como mínimo
- **Type-Safety**: TypeScript para prevenir errores en tiempo de desarrollo
- **Semántico**: Los tokens tienen nombres semánticos, no descriptivos

---

## Convenciones de Nombres

### Estructura de Archivos

```
src/
├── components/
│   ├── ui/              # Componentes base de shadcn
│   ├── primitives/      # Componentes primitivos reutilizables
│   └── patterns/        # Componentes compuestos/patrones
├── lib/
│   ├── design-tokens.ts # Tokens TypeScript
│   └── utils.ts         # Utilidades (cn, etc.)
└── app/
    └── globals.css      # Tokens CSS
```

### Nomenclatura de Componentes

#### Componentes Base (ui/)

- **Formato**: PascalCase
- **Ejemplo**: `Button.tsx`, `Input.tsx`, `Card.tsx`
- **Ubicación**: `src/components/ui/`

#### Componentes Primitivos

- **Formato**: PascalCase con prefijo descriptivo
- **Ejemplo**: `BaseButton.tsx`, `IconButton.tsx`
- **Ubicación**: `src/components/primitives/`

#### Componentes Compuestos/Patrones

- **Formato**: PascalCase descriptivo
- **Ejemplo**: `DataTable.tsx`, `FormField.tsx`, `NavigationBar.tsx`
- **Ubicación**: `src/components/patterns/`

### Nomenclatura de Variantes (CVA)

```typescript
// ✅ Correcto
const buttonVariants = cva("base-classes", {
  variants: {
    variant: {
      primary: "...",
      secondary: "...",
      destructive: "...",
    },
    size: {
      sm: "...",
      md: "...",
      lg: "...",
    },
  },
});

// ❌ Incorrecto - nombres inconsistentes
const buttonVariants = cva("base", {
  variants: {
    type: { ... },      // Debe ser "variant"
    dimension: { ... }, // Debe ser "size"
  },
});
```

### Convenciones de Clases CSS

1. **Orden de clases**: Utilidades → Variantes → Estados → Responsive

   ```tsx
   className={cn(
     "base-classes",           // Base siempre primero
     variants,                 // Variantes de CVA
     "hover:state",           // Estados
     "md:responsive"          // Responsive al final
   )}
   ```

2. **Uso de `cn()`**: Siempre usar `cn()` para combinar clases

   ```tsx
   // ✅ Correcto
   className={cn("base", conditional && "conditional")}

   // ❌ Incorrecto
   className={`base ${conditional ? "conditional" : ""}`}
   ```

3. **Tokens semánticos**: Usar tokens del sistema, no valores hardcodeados

   ```tsx
   // ✅ Correcto
   className = "bg-primary text-primary-foreground";

   // ❌ Incorrecto
   className = "bg-[#000000] text-[#ffffff]";
   ```

---

## Tokens de Diseño

### Colores

Los colores son **semánticos** y se adaptan automáticamente al modo claro/oscuro.

#### Paleta Base

- `primary` / `primary-foreground`
- `secondary` / `secondary-foreground`
- `accent` / `accent-foreground`
- `muted` / `muted-foreground`

#### Estados Semánticos

- `destructive` / `destructive-foreground` - Errores, acciones destructivas
- `warning` / `warning-foreground` - Advertencias
- `success` / `success-foreground` - Confirmaciones, éxito
- `info` / `info-foreground` - Información

#### Uso

```tsx
// Fondo y texto
<div className="bg-primary text-primary-foreground">...</div>

// Solo texto
<span className="text-destructive">Error message</span>

// Bordes
<div className="border border-border">...</div>
```

### Tipografía

#### Escala de Tamaños

```tsx
text-xs    // 12px
text-sm    // 14px
text-base  // 16px (base)
text-lg    // 18px
text-xl    // 20px
text-2xl   // 24px
text-3xl   // 30px
text-4xl   // 36px
text-5xl   // 48px
text-6xl   // 60px
```

#### Pesos

```tsx
font - light; // 300
font - normal; // 400
font - medium; // 500
font - semibold; // 600
font - bold; // 700
font - extrabold; // 800
```

#### Uso

```tsx
<h1 className="text-4xl font-bold leading-tight">Heading</h1>
<p className="text-base leading-relaxed">Body text</p>
```

### Espaciado

Sistema basado en múltiplos de 4px:

```tsx
p - 1; // 4px
p - 2; // 8px
p - 3; // 12px
p - 4; // 16px
p - 6; // 24px
p - 8; // 32px
p - 12; // 48px
p - 16; // 64px
```

**Regla**: Usar el mismo espaciado para elementos relacionados.

### Border Radius

```tsx
rounded-none
rounded-sm
rounded-md
rounded-lg
rounded-xl
rounded-2xl
rounded-3xl
rounded-4xl
rounded-full
```

---

## Estructura de Componentes

### Plantilla Base de Componente

```tsx
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { forwardRef } from "react";

// 1. Definir variantes con CVA
const componentVariants = cva(
	// Clases base (siempre aplicadas)
	"base-classes-here",
	{
		variants: {
			variant: {
				default: "variant-default-classes",
				primary: "variant-primary-classes",
			},
			size: {
				sm: "size-sm-classes",
				md: "size-md-classes",
				lg: "size-lg-classes",
			},
		},
		defaultVariants: {
			variant: "default",
			size: "md",
		},
	}
);

// 2. Tipos TypeScript
export interface ComponentProps
	extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof componentVariants> {
	// Props adicionales específicas del componente
}

// 3. Componente con forwardRef
const Component = forwardRef<HTMLDivElement, ComponentProps>(
	({ className, variant, size, ...props }, ref) => {
		return (
			<div ref={ref} className={cn(componentVariants({ variant, size }), className)} {...props} />
		);
	}
);

Component.displayName = "Component";

export { Component, componentVariants };
```

### Estructura de Carpetas

```
components/
├── ui/                    # shadcn components
│   ├── button.tsx
│   └── card.tsx
├── primitives/            # Componentes base reutilizables
│   ├── Badge/
│   │   ├── Badge.tsx
│   │   ├── Badge.test.tsx
│   │   └── index.ts
│   └── Avatar/
│       ├── Avatar.tsx
│       └── index.ts
└── patterns/              # Componentes compuestos
    ├── DataTable/
    └── FormField/
```

---

## Accesibilidad

### Reglas Obligatorias

#### 1. Contraste de Colores

- **Texto normal**: Mínimo 4.5:1 (WCAG AA)
- **Texto grande (18px+)**: Mínimo 3:1 (WCAG AA)
- **Componentes interactivos**: Mínimo 3:1 (WCAG AA)

#### 2. Navegación por Teclado

```tsx
// ✅ Siempre incluir focus-visible
<button className="focus-visible:outline-2 focus-visible:outline-ring">Click me</button>
```

#### 3. ARIA Labels

```tsx
// ✅ Para iconos sin texto
<button aria-label="Close dialog">
  <XIcon />
</button>

// ✅ Para elementos interactivos complejos
<div role="button" aria-label="Open menu" tabIndex={0}>
  <MenuIcon />
</div>
```

#### 4. Estados Semánticos

```tsx
// ✅ Usar estados semánticos
<button aria-disabled={disabled} disabled={disabled}>
  Submit
</button>

// ✅ Feedback visual y de screen reader
<div role="alert" aria-live="polite">
  {error && <span className="text-destructive">{error}</span>}
</div>
```

#### 5. Formularios

```tsx
// ✅ Labels asociados
<label htmlFor="email" className="text-sm font-medium">
  Email
</label>
<input
  id="email"
  type="email"
  aria-describedby="email-error"
  aria-invalid={!!error}
/>

// ✅ Mensajes de error accesibles
{error && (
  <span id="email-error" className="text-destructive text-sm" role="alert">
    {error}
  </span>
)}
```

### Utilidades de Accesibilidad

```tsx
// Reducir animaciones (prefers-reduced-motion)
// Ya está implementado en globals.css

// Alto contraste (prefers-contrast)
// Ya está implementado en globals.css
```

### Checklist de Accesibilidad

Antes de publicar un componente, verificar:

- [ ] Contraste de colores cumple WCAG AA
- [ ] Navegable completamente con teclado
- [ ] Focus visible en todos los elementos interactivos
- [ ] ARIA labels en iconos y elementos sin texto
- [ ] Estados semánticos (disabled, loading, error)
- [ ] Formularios con labels asociados
- [ ] Mensajes de error accesibles
- [ ] Probado con screen reader (opcional pero recomendado)

---

## Uso de CVA (Class Variance Authority)

### ¿Qué es CVA?

CVA permite definir variantes de componentes de forma type-safe y escalable.

### Ejemplo Básico

```tsx
import { cva } from "class-variance-authority";

const buttonVariants = cva(
	// Clases base
	"inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
	{
		variants: {
			variant: {
				default: "bg-primary text-primary-foreground hover:bg-primary/90",
				destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
				outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
				ghost: "hover:bg-accent hover:text-accent-foreground",
			},
			size: {
				sm: "h-8 px-3 text-sm",
				md: "h-10 px-4",
				lg: "h-12 px-8",
			},
		},
		defaultVariants: {
			variant: "default",
			size: "md",
		},
	}
);
```

### Combinando Variantes

```tsx
// Variantes independientes
const cardVariants = cva("rounded-lg border", {
	variants: {
		variant: {
			default: "bg-card",
			elevated: "bg-card shadow-lg",
		},
		padding: {
			none: "p-0",
			sm: "p-4",
			md: "p-6",
			lg: "p-8",
		},
	},
	defaultVariants: {
		variant: "default",
		padding: "md",
	},
});
```

### Variantes Compuestas

```tsx
// Variantes que dependen de otras
const alertVariants = cva("relative w-full rounded-lg border p-4", {
	variants: {
		variant: {
			default: "bg-background text-foreground",
			destructive:
				"border-destructive/50 text-destructive dark:border-destructive [&>svg]:text-destructive",
			success: "border-success/50 text-success [&>svg]:text-success",
		},
	},
	defaultVariants: {
		variant: "default",
	},
});
```

### Uso en Componentes

```tsx
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
	"inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
	{
		variants: {
			variant: {
				default: "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
				secondary:
					"border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
				destructive:
					"border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
				outline: "text-foreground",
			},
		},
		defaultVariants: {
			variant: "default",
		},
	}
);

export interface BadgeProps
	extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
	return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };
```

### Mejores Prácticas con CVA

1. **Siempre definir defaultVariants**

   ```tsx
   defaultVariants: {
     variant: "default",
     size: "md",
   }
   ```

2. **Clases base primero, luego variantes**

   ```tsx
   cva("base-classes", { variants: { ... } })
   ```

3. **Usar tokens del sistema, no valores hardcodeados**

   ```tsx
   // ✅ Correcto
   "bg-primary text-primary-foreground";

   // ❌ Incorrecto
   "bg-[#000000] text-[#ffffff]";
   ```

4. **Mantener variantes consistentes entre componentes**

   ```tsx
   // Si Button tiene variant: "primary" | "secondary"
   // Badge también debería tener las mismas opciones
   ```

5. **Exportar variantes para reutilización**
   ```tsx
   export { buttonVariants }; // Permite extender en otros componentes
   ```

---

## Recursos Adicionales

- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [shadcn/ui Documentation](https://ui.shadcn.com)
- [CVA Documentation](https://cva.style/docs)
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)

---

## Contribuir

Al agregar nuevos componentes o tokens:

1. Seguir las convenciones de nombres
2. Incluir variantes con CVA
3. Documentar props y variantes
4. Asegurar accesibilidad
5. Actualizar esta documentación
