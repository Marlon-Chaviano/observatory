# Husky Hooks

Este directorio contiene los Git hooks configurados con Husky.

## Hooks Configurados

### `.husky/pre-commit`

Ejecuta `lint-staged` en archivos staged antes de permitir el commit.

- ESLint + Prettier en archivos TypeScript/JavaScript
- Prettier en otros archivos
- Bloquea el commit si hay errores

### `.husky/commit-msg`

Valida mensajes de commit usando Conventional Commits.

- Verifica formato: `<type>: <subject>`
- Valida tipos permitidos
- Bloquea commits con formato inválido

### `.husky/pre-push`

Ejecuta type-check y tests antes de permitir el push.

- TypeScript type-check
- Jest tests
- Bloquea el push si algo falla

## Instalación

Los hooks se instalan automáticamente al ejecutar:

```bash
npm install
# o
pnpm install
```

Esto ejecuta el script `prepare` que inicializa Husky.

## Permisos

Los hooks deben tener permisos de ejecución. Si no funcionan:

```bash
chmod +x .husky/pre-commit
chmod +x .husky/commit-msg
chmod +x .husky/pre-push
```

## Deshabilitar Temporalmente

⚠️ **Solo en casos excepcionales**:

```bash
# Saltar pre-commit
git commit --no-verify -m "message"

# Saltar pre-push
git push --no-verify
```

## Más Información

Ver [CODE_QUALITY.md](../CODE_QUALITY.md) para documentación completa.
