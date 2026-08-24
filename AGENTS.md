# AGENTS.md

## Purpose

This repository is the control layer for AI coding agents working on scheduled or delegated development tasks.

Agents must treat this repository as a task queue, rulebook, and review system. It is not a place to make broad product decisions or run unsupervised production changes.

## Default operating mode

The default mode is throughput with conservative implementation:

1. Read only tasks explicitly marked as ready.
2. Work through eligible tasks sequentially while the run can safely continue.
3. Create one branch per task in the target repository.
4. Make the minimum change needed.
5. Open a pull request with clear review notes.
6. Record the task result before starting the next task.
7. Stop before merging.

## Source of truth

Preferred source of tasks:

1. GitHub issues in this repository.
2. Markdown files in `tasks/inbox/`.
3. Explicit user-provided task references.

A task is eligible only when it is clearly marked with:

- `ready-for-agent`
- `small`
- `safe-change`

If the task has `no-autocode`, perform analysis only.

If the task has any of these labels, do not implement it:

- `blocked`
- `needs-human`
- `agent-done`
- `agent-skipped`
- `agent-in-progress`
- `pr-open`
- `agent-error`

## Queue processing rules

Agents must:

- process `priority-high` tasks before normal tasks
- process older eligible ready issues before newer eligible ready issues
- prefer low-risk implementation tasks before broader work
- finish one task completely before starting another
- leave a PR, analysis result, skip comment, or `needs-human` comment for every task they touch
- update labels before moving to the next task when label permissions allow it
- continue to the next eligible task while the run can safely continue
- leave a final summary when the run stops

Agents must not:

- reserve many tasks without working on them
- start parallel branches for unrelated tasks
- keep partial work silent
- continue into unclear or risky work just to fill time
- process an issue that already has `agent-done`, `pr-open`, `agent-in-progress`, or `agent-error`

## Task intake rules

Before doing any work, verify that the task contains:

- target repository
- target branch
- affected area or likely files
- problem statement
- expected result
- constraints
- validation steps
- risk level

If any item is missing and the task cannot be safely inferred, mark or comment `needs-human`, remove `ready-for-agent` when possible, and continue to the next eligible task.

## Implementation rules

Agents must:

- create a dedicated branch using the format `agent/<task-id>-<short-slug>`
- keep changes limited to the stated scope
- prefer the smallest possible diff
- avoid opportunistic refactors
- avoid formatting unrelated files
- avoid dependency updates unless explicitly requested
- run only relevant checks
- document every command or check that was run
- open a PR instead of merging

Agents must not:

- push directly to `main`, `master`, `production`, or release branches
- merge PRs
- delete branches unless explicitly requested
- rewrite git history
- change repository settings
- change runtime configuration without explicit approval
- change deployment pipelines without explicit approval
- change identity, payment, data migration, or production infrastructure areas without explicit approval

## Issue lifecycle

When starting an implementation task:

1. Add `agent-in-progress` if label permissions allow it.
2. Do not remove `ready-for-agent` yet unless the platform supports reliable recovery.

When a PR is opened:

1. Add `agent-done` and `pr-open`.
2. Remove `ready-for-agent` and `agent-in-progress`.
3. Leave a result comment containing the PR link, validation notes, risks, and label updates.
4. Do not close the issue automatically unless explicitly requested.

When a task is skipped:

1. Add `agent-skipped`.
2. Remove `ready-for-agent` and `agent-in-progress`.
3. Explain the reason and the next smaller task.

When human input is required:

1. Add `needs-human`.
2. Remove `ready-for-agent` and `agent-in-progress`.
3. Explain the exact missing decision, data, or approval.

When tooling or permissions fail:

1. Add `agent-error` when possible.
2. Remove `agent-in-progress` when possible.
3. Leave a concise error comment.
4. Continue only if the next task can be processed safely.

If label updates fail, write the intended label changes in the comment.

## Context budget discipline

Maximize completed safe tasks without wasting context or compute.

Required behavior:

- read each task before reading code
- inspect only files relevant to the current task
- avoid loading the whole repository unless necessary
- do not run full builds by default
- do not run full test suites unless the task requires it
- do not estimate exact credit usage unless the platform exposes it
- stop when the next task is too large to complete safely in the remaining run

When in doubt, create a plan or question instead of continuing.

## Risk classification

Allowed for autonomous PR creation:

- copy changes
- CSS/layout fixes
- small UI bugs
- local component fixes
- isolated utility function fixes
- tests for a clearly scoped function
- documentation improvements
- simple cleanup in named files

Requires human approval before implementation:

- identity or access-control areas
- payment or billing areas
- data schema or migration areas
- deployment and CI/CD changes
- dependency upgrades with runtime impact
- sensitive runtime code
- large refactors
- architecture changes
- analytics or tracking changes involving user data

## Stop conditions

Stop the current task and move it out of the ready queue when:

- the task is vague
- the task conflicts with existing instructions
- the change would affect critical areas
- the repository cannot be inspected safely
- tests are missing and validation would be speculative
- more than 5 files need to change for a supposedly small task
- the task requires private external data
- the expected result is subjective or design-heavy without reference material

Do not let one blocked task stop the whole run when other eligible tasks remain.

## PR requirements

Every PR must include:

- linked task or issue
- summary of changes
- files changed
- validation performed
- checks not run and why
- risk assessment
- screenshots when relevant for UI changes
- explicit note that the PR was not merged

## Result comments

When completing a task, update the task with one of these outcomes:

- `agent-done`: PR opened and ready for review
- `agent-skipped`: task intentionally skipped
- `needs-human`: missing information or unsafe scope
- `agent-error`: tooling, permission, or runtime failure

Never mark a task done only because a plan was written. A task is done only when the requested deliverable exists.

## Human review remains mandatory

The repository owner must review and merge. Agents prepare work; they do not decide final acceptance.
