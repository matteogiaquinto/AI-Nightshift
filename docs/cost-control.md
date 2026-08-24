# Cost control

## Goal

Use the available scheduled agent run efficiently without turning the queue into broad unsupervised repository analysis.

## Throughput mode

AI Nightshift does not use a fixed task cap by default.

Recommended nightly behavior:

- process eligible tasks until the ready queue is empty or the run can no longer safely continue
- complete one task fully before starting the next
- create one branch and one PR per implementation task
- leave a comment for every task that is completed, skipped, or moved to `needs-human`
- stop before broad, unclear, or high-risk work

## What controls usage

Usage is controlled by scope, not by a hard number of issues.

Good controls:

```text
Only process ready-for-agent + small + safe-change tasks.
Inspect only files needed for the current task.
Run only relevant checks.
Record the result of each task before starting another one.
Stop if the next task is too large to complete safely.
```

Bad controls:

```text
Review the whole repo and improve anything you find.
Process every issue even if the scope is unclear.
Start several branches at once.
Run full builds for unrelated small tasks.
```

## Task rules that reduce usage

Each task should include:

- target repo
- target branch
- likely files
- expected result
- constraints
- validation steps

The more precise the task, the less context the agent needs.

## Stop instead of expanding

If a task requires broad investigation, the agent should create a short plan or question instead of continuing automatically.

## Practical safe defaults

Use this nightly configuration after a successful smoke test:

```text
Process eligible tasks sequentially until the ready queue is empty or the run can no longer safely continue.
Do not stop after a fixed number of tasks.
Do not run full test suites unless the task is specifically about tests or CI.
Do not inspect unrelated directories.
Do not start a task that cannot reasonably end with a PR, analysis result, or skip comment.
```

For first-time setup, run one small task manually before enabling full throughput mode.
