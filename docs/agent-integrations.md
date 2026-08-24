# Agent integrations

AI Nightshift is designed to be agent-agnostic. Any cloud agent that can read GitHub issues or repository files and create branches or pull requests can use the workflow.

## Generic requirements

Your agent should be able to:

- read this queue repository
- read issue labels and issue bodies
- read Markdown task files in `tasks/inbox/`
- inspect target repositories
- create branches
- make commits
- open pull requests
- leave issue comments or summaries

## Scheduled prompt

Use `NIGHTSHIFT.md` as the base prompt.

Replace:

```text
<QUEUE_REPOSITORY>
```

with your private queue repository name.

Replace:

```text
<LOCAL_TIMEZONE>
```

with your timezone.

## Tool-specific notes

### Codex-style cloud agents

Connect the queue repository and target repositories. Schedule the prompt from `NIGHTSHIFT.md`. After one successful smoke test, use throughput mode so the agent continues through eligible tasks until the run can no longer safely continue.

### Cursor-style agents

Use the same labels and issue templates. Configure the agent to read the queue first, then work only on target repositories listed in each task.

### Custom agents

Implement the workflow as a small loop:

1. find issues with `ready-for-agent`
2. filter out `blocked` and `needs-human`
3. split implementation tasks from `no-autocode` tasks
4. process the next eligible task
5. create a PR, analysis comment, skip comment, or `needs-human` comment
6. record the result before starting another task
7. continue until the ready queue is empty or the run can no longer safely continue
8. never merge automatically

## Recommended first run

Start with one small documentation task to verify branch creation, PR creation, issue comments, and review flow.

After the smoke test works, remove fixed task-count limits and rely on task labels, small scopes, and stop conditions.
