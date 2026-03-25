# Guia de Commits

Aquest projecte utilitza **Conventional Commits** per mantenir un historial de commits net i consistent.

## Format

```
type(scope): descripció
```

- **type** — obligatori
- **scope** — opcional, indica la part del projecte afectada (ex: `backend`, `frontend`, `auth`, `db`)
- **descripció** — obligatòria, en minúscula, sense punt final

## Tipus permesos

| Tipus      | Ús                                                 |
| ---------- | -------------------------------------------------- |
| `feat`     | Nova funcionalitat                                 |
| `fix`      | Correcció de bug                                   |
| `docs`     | Canvis a documentació                              |
| `style`    | Format, semicolons, espais (no canvia lògica)      |
| `refactor` | Reestructuració de codi sense canviar comportament |
| `perf`     | Millora de rendiment                               |
| `test`     | Afegir o corregir tests                            |
| `build`    | Canvis al sistema de build (npm, webpack, etc.)    |
| `ci`       | Canvis a CI/CD (GitHub Actions, etc.)              |
| `chore`    | Tasques de manteniment (dependències, configs)     |
| `revert`   | Revertir un commit anterior                        |

## Exemples vàlids

```bash
git commit -m "feat: add user registration endpoint"
git commit -m "fix(backend): resolve database connection timeout"
git commit -m "chore: update dependencies"
git commit -m "docs: add API documentation"
git commit -m "refactor(frontend): simplify login form component"
git commit -m "test(backend): add unit tests for auth service"
```

## Exemples invàlids

```bash
git commit -m "Added new feature"           # falta el type
git commit -m "feat:add login"              # falta espai després de ":"
git commit -m "feat: Add login."            # majúscula + punt final
```

## Regles del projecte

- **No es pot fer commit directament a `main`**. Cal crear una branca i obrir un PR.
- Prettier es passa automàticament als fitxers staged abans de cada commit.
- Si el missatge de commit no segueix el format, el commit serà rebutjat.
