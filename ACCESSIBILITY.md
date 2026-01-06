# Guía de Accesibilidad

Esta guía establece las reglas y mejores prácticas de accesibilidad para el sistema de diseño.

## Estándares

Cumplimos con **WCAG 2.1 Nivel AA** como mínimo. Se recomienda apuntar a Nivel AAA cuando sea posible.

## Reglas Obligatorias

### 1. Contraste de Colores

#### Requisitos Mínimos

- **Texto normal (< 18px)**: Ratio de contraste mínimo **4.5:1**
- **Texto grande (≥ 18px o ≥ 14px bold)**: Ratio de contraste mínimo **3:1**
- **Componentes UI no textuales**: Ratio de contraste mínimo **3:1**
- **Estados de hover/focus**: Mantener o mejorar el contraste

#### Verificación

```tsx
// ✅ Correcto - usa tokens semánticos que cumplen contraste
<span className="text-foreground">Texto legible</span>

// ❌ Incorrecto - color hardcodeado sin verificar contraste
<span className="text-[#888888]">Texto posiblemente ilegible</span>
```

#### Herramientas

- [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)
- [Contrast Ratio](https://contrast-ratio.com/)

### 2. Navegación por Teclado

#### Reglas

1. **Todos los elementos interactivos deben ser navegables con Tab**
2. **Orden lógico de tabulación** (de arriba a abajo, izquierda a derecha)
3. **Focus visible** en todos los elementos interactivos
4. **No usar `tabIndex > 0`** excepto en casos excepcionales
5. **Trampas de teclado** deben ser evitables (ESC para cerrar modales)

#### Implementación

```tsx
// ✅ Correcto - focus visible
<button className="focus-visible:outline-2 focus-visible:outline-ring focus-visible:ring-offset-2">
  Click me
</button>

// ✅ Correcto - orden lógico
<div>
  <button>First</button>
  <button>Second</button>
</div>

// ❌ Incorrecto - sin focus visible
<button>Click me</button>

// ❌ Incorrecto - tabIndex innecesario
<div tabIndex={1}>Skip to content</div>
```

### 3. ARIA Labels y Roles

#### Cuándo Usar ARIA

**Siempre usar cuando:**

- Iconos sin texto descriptivo
- Elementos interactivos sin etiqueta visible
- Contenido dinámico que cambia
- Formularios con validación

**No usar cuando:**

- El elemento HTML semántico ya comunica la información
- El texto visible ya describe el elemento

#### Ejemplos

```tsx
// ✅ Icono sin texto
<button aria-label="Cerrar diálogo">
  <XIcon />
</button>

// ✅ Elemento interactivo sin texto
<div
  role="button"
  tabIndex={0}
  aria-label="Abrir menú"
  onKeyDown={(e) => e.key === 'Enter' && handleClick()}
>
  <MenuIcon />
</div>

// ✅ Contenido dinámico
<div role="status" aria-live="polite" aria-atomic="true">
  {loading ? "Cargando..." : "Completado"}
</div>

// ✅ Formulario con error
<input
  id="email"
  type="email"
  aria-describedby="email-error"
  aria-invalid={!!error}
/>
{error && (
  <span id="email-error" role="alert" className="text-destructive">
    {error}
  </span>
)}
```

### 4. Formularios Accesibles

#### Requisitos

1. **Labels asociados** con `htmlFor` y `id`
2. **Mensajes de error** asociados con `aria-describedby`
3. **Estados de validación** con `aria-invalid`
4. **Campos requeridos** marcados con `aria-required` o `required`
5. **Grupos de campos** con `fieldset` y `legend`

#### Ejemplo Completo

```tsx
<form>
	<div className="space-y-2">
		<label htmlFor="email" className="text-sm font-medium">
			Email <span aria-label="requerido">*</span>
		</label>
		<input
			id="email"
			type="email"
			required
			aria-required="true"
			aria-describedby="email-error email-help"
			aria-invalid={!!error}
			className={cn("w-full rounded-md border", error && "border-destructive")}
		/>
		{error && (
			<span id="email-error" role="alert" className="text-sm text-destructive">
				{error}
			</span>
		)}
		<span id="email-help" className="text-sm text-muted-foreground">
			Ingresa tu dirección de email
		</span>
	</div>
</form>
```

### 5. Estados Semánticos

#### Estados que Deben Ser Accesibles

```tsx
// Disabled
<button
  disabled
  aria-disabled="true"
  aria-label="Botón deshabilitado"
>
  Submit
</button>

// Loading
<button
  aria-busy="true"
  aria-label="Cargando..."
>
  <Spinner />
  Loading
</button>

// Error
<div role="alert" aria-live="assertive">
  <span className="text-destructive">Error: {message}</span>
</div>

// Success
<div role="status" aria-live="polite">
  <span className="text-success">Operación exitosa</span>
</div>
```

### 6. Imágenes

```tsx
// ✅ Imagen decorativa
<img src="decoration.svg" alt="" aria-hidden="true" />

// ✅ Imagen informativa
<img
  src="chart.png"
  alt="Gráfico mostrando crecimiento del 25% en Q4"
/>

// ✅ Imagen compleja
<img
  src="diagram.png"
  alt="Diagrama de flujo del proceso"
  aria-describedby="diagram-description"
/>
<p id="diagram-description">
  El diagrama muestra tres pasos: entrada, procesamiento y salida.
</p>
```

### 7. Animaciones y Movimiento

#### Reducir Animaciones

Ya implementado en `globals.css`:

```css
@media (prefers-reduced-motion: reduce) {
	* {
		animation-duration: 0.01ms !important;
		transition-duration: 0.01ms !important;
	}
}
```

#### Reglas

- **No usar animaciones que puedan causar mareo** (parpadeo, rotación rápida)
- **Respetar `prefers-reduced-motion`**
- **Animaciones deben poder pausarse**

```tsx
// ✅ Correcto - respeta prefers-reduced-motion
<div className="transition-all duration-200">
  Content
</div>

// ❌ Incorrecto - animación que puede causar problemas
<div className="animate-spin">Loading</div>
// Mejor usar aria-busy y texto
```

### 8. Contraste Alto

Ya implementado en `globals.css`:

```css
@media (prefers-contrast: high) {
	:root {
		--border: oklch(0.5 0 0);
	}
}
```

## Checklist de Accesibilidad

Antes de publicar cualquier componente o página:

### Contraste

- [ ] Todos los textos cumplen ratio 4.5:1 (o 3:1 para texto grande)
- [ ] Componentes UI cumplen ratio 3:1
- [ ] Estados hover/focus mantienen contraste

### Teclado

- [ ] Todos los elementos interactivos son navegables con Tab
- [ ] Focus visible en todos los elementos
- [ ] Orden de tabulación es lógico
- [ ] No hay trampas de teclado
- [ ] ESC cierra modales/diálogos

### ARIA

- [ ] Iconos sin texto tienen `aria-label`
- [ ] Contenido dinámico usa `aria-live`
- [ ] Formularios tienen `aria-describedby` para errores
- [ ] Estados semánticos (disabled, loading) tienen ARIA apropiado

### Formularios

- [ ] Todos los inputs tienen labels asociados
- [ ] Campos requeridos están marcados
- [ ] Errores están asociados con `aria-describedby`
- [ ] `aria-invalid` en campos con error

### Semántica HTML

- [ ] Uso correcto de elementos semánticos (`<button>`, `<nav>`, `<main>`, etc.)
- [ ] Headings en orden lógico (h1 → h2 → h3)
- [ ] Listas usan `<ul>` o `<ol>`
- [ ] Enlaces tienen texto descriptivo

### Otros

- [ ] Imágenes tienen `alt` apropiado (o `alt=""` si decorativas)
- [ ] Animaciones respetan `prefers-reduced-motion`
- [ ] Probado con screen reader (recomendado)
- [ ] Probado solo con teclado

## Herramientas de Testing

### Automatizadas

- [axe DevTools](https://www.deque.com/axe/devtools/) - Extensión de navegador
- [WAVE](https://wave.webaim.org/) - Evaluador de accesibilidad web
- [Lighthouse](https://developers.google.com/web/tools/lighthouse) - Auditoría de accesibilidad

### Manuales

- **Navegación por teclado**: Probar toda la interfaz solo con Tab, Enter, Espacio, ESC
- **Screen readers**: NVDA (Windows), VoiceOver (macOS/iOS), JAWS (Windows)
- **Zoom**: Verificar que la interfaz funciona al 200% de zoom

## Recursos

- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [ARIA Authoring Practices](https://www.w3.org/WAI/ARIA/apg/)
- [WebAIM](https://webaim.org/)
- [A11y Project](https://www.a11yproject.com/)

## Reportar Problemas

Si encuentras problemas de accesibilidad:

1. Documenta el problema
2. Incluye pasos para reproducir
3. Especifica qué estándar de WCAG se viola
4. Sugiere una solución si es posible
