# Operating model

## Stack

AI Nightshift uses a deliberately simple stack:

- GitHub issues for structured task intake
- GitHub labels for execution permissions
- Markdown files for quick task capture
- a cloud AI coding agent for scheduled execution
- Git branches for isolation
- pull requests for review and approval

No application server, database, or dashboard is required for the first version.

## Source of truth

GitHub issues are preferred because they support labels, comments, links, assignees, and status history.

Markdown files in `tasks/inbox/` are a fallback for quick capture. They should eventually be converted into issues if they become important.

## Daily lifecycle

### During the day

Capture ideas and bugs quickly. Do not mark them ready until they are clear.

### Before the night run

Mark tasks as ready only when they are small, safe, and scoped.

Required labels:

- `ready-for-agent`
- `small`
- `safe-change`

### Overnight

The agent processes eligible tasks sequentially for as long as the run can safely continue. It creates branches and pull requests but never merges.

### Morning

Review PRs, check skipped tasks, answer questions, and decide what to merge.

## Decision boundaries

The agent may decide:

- whether a task is clear enough to execute
- whether a task is too risky to execute
- what minimal implementation is needed within the stated scope
- which relevant tests/checks to run
- whether enough run budget remains to start the next task safely

The agent may not decide:

- whether to merge
- business priority beyond provided labels
- major design direction
- production deployment decisions
- changes to restricted systems

## Task size policy

A good night task should usually touch 1 to 3 files and fit into a small PR.

A task is too large when it requires broad architecture understanding, large refactoring, new infrastructure, or subjective product decisions.

## Branch policy

Branch format:

```text
agent/<task-id>-<short-slug>
```

Examples:

```text
agent/42-fix-mobile-navbar
agent/task-css-cleanup-buttons
```

## PR policy

Every implementation task must end in a PR or a clear skip comment. No silent work.

## Queue policy

The queue may contain many ready tasks.

The agent should not stop after an arbitrary issue count. It should continue through ready tasks one by one until:

- no eligible tasks remain
- the next task is unclear or too risky
- the run can no longer safely continue
- a required tool or permission blocks progress

Completed work must be recorded before the agent starts another task.
