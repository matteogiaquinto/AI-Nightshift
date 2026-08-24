# Setup guide

## Recommended setup

Use AI Nightshift as a public template, then keep your personal working copy private.

Recommended flow:

1. Create a new repository from this template.
2. Choose private visibility for your copy.
3. Create or sync the labels from `labels.yml`.
4. Connect your private queue repository to your chosen cloud AI coding agent.
5. Connect only the target repositories the agent is allowed to work on.
6. Add tasks through GitHub issues.
7. Schedule the agent with the prompt in `NIGHTSHIFT.md`.
8. Review every pull request manually before merging.

## Why private copies are recommended

The queue repository can contain project names, roadmap items, screenshots, links, and internal context.

Keep that information out of the public upstream repository.

## Initial labels

Create these labels in your private copy:

```text
ready-for-agent
small
safe-change
no-autocode
bounded-analysis
needs-human
blocked
priority-high
agent-in-progress
pr-open
agent-done
agent-skipped
agent-error
risk-low
risk-medium
risk-high
```

Implementation tasks should normally use:

```text
ready-for-agent
small
safe-change
risk-low
```

Analysis-only tasks should normally use:

```text
ready-for-agent
no-autocode
bounded-analysis
```

Lifecycle labels such as `agent-in-progress`, `pr-open`, `agent-done`, `agent-skipped`, and `agent-error` are managed as work progresses.

## Repository settings

Recommended settings for private copies:

- disable auto-merge
- protect `main` or `master` where possible
- require review before merging agent PRs
- keep the issue tracker enabled
- keep Actions enabled for repository and task validation

For public template repositories, also consider protecting `main` and requiring the CI workflow before merge.

## Optional CODEOWNERS

`CODEOWNERS` is intentionally not included in the reusable template because ownership is repository-specific. Add `.github/CODEOWNERS` in your private copy if you want automatic reviewer assignment.

Example:

```text
* @YOUR-GITHUB-USERNAME
```

## First test task

Create a tiny documentation task first. Do not start with a production bug or a broad refactor.

Example:

```text
Target repository: OWNER/example-project
Target branch: main
Affected area: README.md
Problem: One sentence is unclear.
Expected result: Rewrite only that sentence.
Validation: Check that the README still renders correctly.
```
