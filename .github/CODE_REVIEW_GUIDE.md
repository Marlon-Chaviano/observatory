# Guía de Code Review

## Para Reviewers

### Objetivos del Code Review

1. **Calidad**: Asegurar que el código cumple estándares
2. **Consistencia**: Mantener consistencia en el codebase
3. **Aprendizaje**: Oportunidad de aprendizaje para todos
4. **Prevención**: Encontrar bugs antes de producción

### Principios

- **Ser constructivo**: Sugerir mejoras, no solo criticar
- **Ser respetuoso**: Recordar que es código, no la persona
- **Ser específico**: Explicar el "por qué" de las sugerencias
- **Ser oportuno**: Revisar PRs en tiempo razonable (24-48 horas)

### Checklist de Revisión

#### Arquitectura y Estructura

- [ ] ¿Sigue la arquitectura feature-first?
- [ ] ¿Está en la carpeta correcta?
- [ ] ¿Nombres de archivos siguen convenciones?
- [ ] ¿No duplica código existente?
- [ ] ¿Reutiliza componentes/hooks existentes?

#### Server vs Client Components

- [ ] ¿Usa Server Components cuando es posible?
- [ ] ¿Client Components solo donde es necesario?
- [ ] ¿Boundaries claros entre Server y Client?
- [ ] ¿No importa Server Components en Client Components?

#### Código

- [ ] ¿Es legible y fácil de entender?
- [ ] ¿Sigue convenciones de naming?
- [ ] ¿No hay código muerto o comentado?
- [ ] ¿Manejo de errores apropiado?
- [ ] ¿Casos límite considerados?

#### Performance

- [ ] ¿Evita re-renders innecesarios?
- [ ] ¿Usa memoización cuando es apropiado?
- [ ] ¿No agrega dependencias innecesarias?
- [ ] ¿Caching apropiado para data fetching?

#### Testing

- [ ] ¿Tests cubren funcionalidad nueva?
- [ ] ¿Tests son relevantes y útiles?
- [ ] ¿Mocks usados correctamente?

#### Accesibilidad

- [ ] ¿ARIA labels donde es necesario?
- [ ] ¿Navegable con teclado?
- [ ] ¿Focus visible en elementos interactivos?
- [ ] ¿Contraste de colores adecuado?

### Tipos de Comentarios

#### ✅ Approve

Usar cuando el código está listo para merge.

```markdown
LGTM! ✅
```

#### 🔄 Request Changes

Usar cuando hay problemas que deben ser corregidos antes de merge.

```markdown
## Problemas que deben corregirse

1. **Error handling**: Falta manejo de error cuando la API falla
2. **Performance**: Este componente se re-renderiza en cada cambio de estado padre

Por favor, corrige estos puntos antes de re-request review.
```

#### 💬 Comentarios

Usar para sugerencias, preguntas, o observaciones.

```markdown
**Sugerencia**: Podríamos extraer esta lógica a un hook personalizado para reutilización.

**Pregunta**: ¿Por qué usamos `useState` aquí en lugar de Server Component?

**Observación**: Este componente podría beneficiarse de Suspense para mejor UX.
```

### Buenas Prácticas

#### Ser Específico

```markdown
❌ "Este código no se ve bien"
✅ "Esta función tiene 50 líneas y hace múltiples cosas. Considera dividirla en funciones más pequeñas."
```

#### Explicar el Por Qué

```markdown
❌ "Usa useMemo aquí"
✅ "Este cálculo es costoso y se ejecuta en cada render. `useMemo` evitará re-cálculos innecesarios cuando las dependencias no cambien."
```

#### Ofrecer Alternativas

```markdown
❌ "Esto está mal"
✅ "En lugar de esto, podrías considerar [alternativa] porque [razón]."
```

#### Reconocer lo Bueno

```markdown
✅ "Excelente manejo de errores aquí!"
✅ "Me gusta cómo extrajiste esta lógica a un hook reutilizable."
```

### Proceso de Revisión

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
- Aprobar o request changes
- Ser claro sobre qué debe corregirse

#### 4. Follow-up

- Revisar cambios después de correcciones
- Aprobar cuando está listo

### Red Flags

Estos son problemas que siempre deben ser corregidos:

- ❌ **Seguridad**: Exponer datos sensibles, falta de validación
- ❌ **Performance crítico**: Re-renders masivos, queries N+1
- ❌ **Breaking changes**: Sin documentación o migración
- ❌ **Tests faltantes**: Funcionalidad crítica sin tests
- ❌ **Arquitectura**: Violación de principios establecidos

### Tiempos de Respuesta

- **Pequeños PRs (< 200 líneas)**: 24 horas
- **PRs medianos (200-500 líneas)**: 48 horas
- **PRs grandes (> 500 líneas)**: 72 horas

Si no puedes revisar en tiempo, comunícalo o desasigna el PR.

---

## Para Autores

### Preparar el PR

Antes de crear el PR:

1. **Self-review**: Revisa tu propio código
2. **Tests**: Asegúrate de que todos los tests pasan
3. **Linter**: Sin errores de linter
4. **Documentación**: Actualiza documentación si es necesario

### Responder a Comentarios

- **Agradece feedback**: "Gracias por la sugerencia!"
- **Pregunta si no entiendes**: "¿Podrías explicar más sobre X?"
- **Discute alternativas**: "Consideré Y, pero elegí X porque..."
- **Aplica cambios**: Corrige los problemas señalados

### Re-request Review

Después de aplicar cambios:

```markdown
@reviewer He aplicado los cambios sugeridos:

- ✅ Corregido manejo de errores
- ✅ Agregado useMemo para performance
- ✅ Actualizado documentación

¿Podrías revisar de nuevo?
```

### No Tomar Personal

- Los comentarios son sobre el código, no sobre ti
- Todos cometemos errores
- El objetivo es mejorar el código, no criticar

---

## Ejemplos

### Buen Review

```markdown
## Excelente trabajo! 🎉

Solo un par de sugerencias menores:

1. **Performance**: En `ProductList`, podrías usar `useMemo` para el filtrado ya que es un cálculo costoso con muchos productos.

2. **Naming**: `handleClick` es un poco genérico. ¿Qué tal `handleAddToCart` para ser más específico?

3. **Error handling**: Considera agregar un try-catch en `productService.getProducts()` para manejar errores de red.

Por lo demás, todo se ve bien. Una vez que hagas estos cambios, estaré listo para aprobar! ✅
```

### Mal Review

```markdown
❌ Esto está mal.
❌ No me gusta este enfoque.
❌ Deberías hacerlo diferente.
```

---

## Recursos

- [Google's Code Review Guide](https://google.github.io/eng-practices/review/)
- [How to Make Good Code Reviews Better](https://stackoverflow.blog/2019/09/30/how-to-make-good-code-reviews-better/)
