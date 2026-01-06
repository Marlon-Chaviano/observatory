# Sistema de Calidad de Código

Este documento explica el sistema completo de calidad de código y control de commits configurado en el proyecto.

## 📋 Tabla de Contenidos

1. [Husky Hooks](#husky-hooks)
2. [Commitlint](#commitlint)
3. [Lint-staged](#lint-staged)
4. [Scripts Disponibles](#scripts-disponibles)
5. [Configuración Inicial](#configuración-inicial)
6. [Troubleshooting](#troubleshooting)

---

## 🪝 Husky Hooks

Husky ejecuta scripts automáticamente en diferentes momentos del flujo de Git.

### Pre-commit Hook

**Archivo**: `.husky/pre-commit`

**Propósito**: Ejecuta `lint-staged` en archivos staged antes de permitir el commit.

**Qué hace**:

- Ejecuta ESLint y Prettier solo en archivos staged
- Formatea automáticamente el código
- Bloquea el commit si hay errores de linting

**Cuándo se ejecuta**: Antes de cada `git commit`

**Tiempo estimado**: 5-15 segundos (solo archivos staged)

### Commit-msg Hook

**Archivo**: `.husky/commit-msg`

**Propósito**: Valida que los mensajes de commit sigan el formato Conventional Commits.

**Qué hace**:

- Valida el formato del mensaje de commit
- Verifica que el tipo sea válido
- Asegura que el subject no esté vacío

**Cuándo se ejecuta**: Después de escribir el mensaje de commit

**Tiempo estimado**: < 1 segundo

**Formato requerido**:

```
<type>(<scope>): <subject>

[optional body]

[optional footer]
```

**Tipos permitidos**:

- `feat`: Nueva feature
- `fix`: Bug fix
- `refactor`: Refactoring
- `chore`: Tareas de mantenimiento
- `docs`: Documentación
- `test`: Tests
- `perf`: Mejoras de performance
- `build`: Cambios en build system
- `ci`: Cambios en CI/CD

**Ejemplos válidos**:

```bash
feat: add product filtering
fix: resolve product card image loading
refactor: improve product service error handling
docs: update architecture guide
test: add product service tests
```

**Ejemplos inválidos**:

```bash
# ❌ Sin tipo
add product filtering

# ❌ Tipo inválido
feature: add product filtering

# ❌ Subject vacío
feat:

# ❌ Con punto final
feat: add product filtering.
```

### Pre-push Hook

**Archivo**: `.husky/pre-push`

**Propósito**: Ejecuta type-check y tests antes de permitir el push.

**Qué hace**:

1. Ejecuta `npm run type-check` (TypeScript)
2. Ejecuta `npm run test` (Jest)
3. Bloquea el push si algo falla

**Cuándo se ejecuta**: Antes de cada `git push`

**Tiempo estimado**: 30-120 segundos (depende de la cantidad de tests)

**⚠️ Nota**: Este hook puede ser lento. Si necesitas hacer push rápido (por ejemplo, para un hotfix), puedes saltarlo temporalmente con:

```bash
git push --no-verify
```

**Pero solo hazlo en casos excepcionales.**

---

## 📝 Commitlint

**Archivo**: `.commitlintrc.json`

**Propósito**: Valida mensajes de commit usando Conventional Commits.

**Configuración**:

- Extiende `@commitlint/config-conventional`
- Tipos permitidos: feat, fix, refactor, chore, docs, test, perf, build, ci
- Máximo 100 caracteres en el header
- Subject en lowercase (sin mayúsculas al inicio)
- Sin punto final en el subject

**Mensajes de error claros**:
Si el commit no cumple el formato, verás un mensaje como:

```
✖   subject may not be empty [subject-empty]
✖   type must be one of [feat, fix, refactor, chore, docs, test, perf, build, ci] [type-enum]
```

---

## 🔍 Lint-staged

**Archivo**: `.lintstagedrc.json`

**Propósito**: Ejecuta linters y formatters solo en archivos staged (no en todo el proyecto).

**Qué hace**:

- **TypeScript/TSX**: ESLint + Prettier
- **JavaScript/JSX**: ESLint + Prettier
- **Otros archivos**: Solo Prettier

**Ventajas**:

- ⚡ Rápido: Solo procesa archivos modificados
- 🎯 Enfocado: Solo archivos que vas a commitear
- 🔧 Auto-fix: Corrige automáticamente problemas de formato

**Configuración**:

```json
{
	"*.{ts,tsx}": ["eslint --fix --max-warnings=0", "prettier --write"],
	"*.{json,md,mdx,css,html,yml,yaml,scss}": ["prettier --write"]
}
```

**Nota**: `--max-warnings=0` significa que cualquier warning bloqueará el commit.

---

## 📜 Scripts Disponibles

### Linting

```bash
# Lint todo el proyecto
npm run lint

# Lint y auto-fix
npm run lint:fix
```

### Formatting

```bash
# Formatear todo el proyecto
npm run format

# Verificar formato (sin modificar)
npm run format:check
```

### Type Checking

```bash
# Verificar tipos TypeScript
npm run type-check
```

### Testing

```bash
# Ejecutar tests
npm run test

# Tests en modo watch
npm run test:watch

# Tests con cobertura
npm run test:coverage
```

---

## 🚀 Configuración Inicial

### Para Nuevos Miembros del Equipo

1. **Clonar el repositorio**

   ```bash
   git clone <repo-url>
   cd observatory
   ```

2. **Instalar dependencias**

   ```bash
   npm install
   # o
   pnpm install
   ```

3. **Inicializar Husky**

   ```bash
   npm run prepare
   # o
   pnpm prepare
   ```

4. **Verificar que los hooks funcionan**
   ```bash
   # Intentar hacer un commit con formato inválido
   git commit -m "test commit"
   # Debería fallar
   ```

### Para el Proyecto Existente

Si ya tienes el proyecto configurado, los hooks deberían funcionar automáticamente después de `npm install` (gracias al script `prepare` en `package.json`).

---

## 🔧 Troubleshooting

### Los hooks no se ejecutan

**Problema**: Los hooks de Husky no se ejecutan al hacer commit/push.

**Solución**:

```bash
# Reinstalar Husky
npm run prepare

# Verificar que los hooks tienen permisos de ejecución
chmod +x .husky/pre-commit
chmod +x .husky/commit-msg
chmod +x .husky/pre-push
```

### Pre-commit es muy lento

**Problema**: El hook pre-commit tarda mucho tiempo.

**Solución**:

- Lint-staged solo procesa archivos staged, debería ser rápido
- Si es lento, verifica que no estés commitando muchos archivos a la vez
- Considera hacer commits más pequeños y frecuentes

### Pre-push es muy lento

**Problema**: El hook pre-push tarda mucho tiempo (tests).

**Solución**:

- Esto es normal, los tests pueden tardar
- Si necesitas hacer push rápido (hotfix), usa `git push --no-verify`
- Considera optimizar tests lentos o usar test filtering

### Commitlint rechaza commits válidos

**Problema**: Commitlint rechaza commits que parecen válidos.

**Solución**:

- Verifica el formato exacto: `<type>: <subject>`
- Asegúrate de que el tipo esté en la lista permitida
- Verifica que no haya punto final en el subject
- Revisa `.commitlintrc.json` para ver las reglas exactas

### ESLint encuentra errores que no puedo arreglar

**Problema**: ESLint encuentra errores pero no sé cómo arreglarlos.

**Solución**:

```bash
# Intentar auto-fix
npm run lint:fix

# Si no funciona, revisar el error específico
npm run lint

# Si es un error legítimo que no se puede auto-fix, puedes:
# 1. Arreglarlo manualmente
# 2. Usar eslint-disable (solo si es realmente necesario)
# 3. Preguntar al equipo
```

### Prettier cambia formato que no quiero cambiar

**Problema**: Prettier formatea código de manera que no me gusta.

**Solución**:

- Prettier está configurado para mantener consistencia
- Si hay un caso específico, puedes usar `// prettier-ignore` (raro)
- Discute cambios de formato con el equipo antes de modificar `.prettierrc.json`

---

## 📚 Recursos

- [Husky Documentation](https://typicode.github.io/husky/)
- [Commitlint Documentation](https://commitlint.js.org/)
- [Lint-staged Documentation](https://github.com/okonet/lint-staged)
- [Conventional Commits](https://www.conventionalcommits.org/)

---

## ✅ Checklist para Commits

Antes de hacer commit, asegúrate de:

- [ ] Código sigue las convenciones del proyecto
- [ ] No hay errores de linting (`npm run lint`)
- [ ] Código está formateado (`npm run format`)
- [ ] Types están correctos (`npm run type-check`)
- [ ] Tests pasan (`npm run test`)
- [ ] Mensaje de commit sigue Conventional Commits

---

## 🎯 Flujo Recomendado

1. **Hacer cambios en el código**
2. **Agregar archivos al staging**
   ```bash
   git add .
   ```
3. **Intentar commit** (pre-commit ejecutará lint-staged automáticamente)
   ```bash
   git commit -m "feat: add new feature"
   ```
4. **Si hay errores, arreglarlos y volver a intentar**
5. **Hacer push** (pre-push ejecutará tests y type-check)
   ```bash
   git push
   ```

---

## 💡 Tips

- **Commits pequeños**: Hacer commits pequeños y frecuentes facilita el proceso
- **Auto-fix primero**: Siempre intenta `npm run lint:fix` antes de arreglar manualmente
- **Tests locales**: Ejecuta tests localmente antes de push para evitar sorpresas
- **Mensajes claros**: Escribe mensajes de commit descriptivos, ayudan mucho en el futuro

---

¿Preguntas? Abre un issue o pregunta en el canal de desarrollo.
