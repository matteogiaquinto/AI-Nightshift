# Task taxonomy

## Good autonomous tasks

These tasks are usually suitable for overnight implementation when scoped clearly:

| Type | Examples | Default action |
|---|---|---|
| `copy-docs` | Fix text, update README, add notes | Implement PR |
| `ui-css` | Small responsive fix, spacing issue, overflow bug | Implement PR |
| `bugfix` | Isolated bug in a named file or component | Implement PR |
| `test` | Add a focused test for known behavior | Implement PR |
| `cleanup` | Remove dead code in named files | Implement PR only if very small |

## Good analysis-only tasks

Use `no-autocode` for:

- review of a code area
- prioritization of TODO comments
- risk assessment before implementation
- investigation of a bug without a clear fix
- plan for a larger refactor

## Poor autonomous tasks

These should not be implemented automatically:

- improve the whole app
- clean the codebase
- make the design better
- optimize performance everywhere
- refactor the dashboard
- review all repos
- fix all bugs

These are too broad and should be split into small tasks.

## Risk mapping

| Risk | Meaning | Agent behavior |
|---|---|---|
| low | Local, reversible, easy to review | May implement if ready |
| medium | Touches several files or unclear side effects | Prefer plan or limited PR |
| high | Critical, broad, or business-sensitive | Do not implement without explicit approval |

## Required task labels

Implementation tasks should have:

- `ready-for-agent`
- `small`
- `safe-change`

Analysis-only tasks should have:

- `ready-for-agent`
- `no-autocode`

Blocked tasks should have:

- `needs-human` or `blocked`
