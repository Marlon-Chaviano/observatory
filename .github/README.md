# GitHub Workflows y Templates

Este directorio contiene configuraciones y templates para GitHub.

## Estructura

- `pull_request_template.md` - Template para Pull Requests
- `CODE_REVIEW_GUIDE.md` - Guía completa de code review
- `workflows/pr-check.yml` - CI/CD checks para PRs
- `ISSUE_TEMPLATE/` - Templates para issues

## Uso

### Pull Requests

Al crear un PR, el template se carga automáticamente. Completa todas las secciones relevantes.

### Code Review

Revisa `.github/CODE_REVIEW_GUIDE.md` antes de hacer reviews para entender las mejores prácticas.

### Issues

Usa los templates al crear nuevos issues:

- Feature Request: Para nuevas features
- Bug Report: Para reportar bugs

## CI/CD

El workflow `pr-check.yml` ejecuta automáticamente:

- Lint check
- Type check
- Tests
- Build check

Todos deben pasar antes de que un PR pueda ser mergeado.
