# Morning review checklist

Use this checklist before merging any PR created by an agent.

## PR scope

- The PR links to a task or issue.
- The PR changes only the expected files or areas.
- The diff is small enough to review quickly.
- There are no unrelated refactors or formatting-only changes.
- No secrets, credentials, or private data appear in the diff.

## Behavior

- The implementation matches the expected result.
- The task constraints were respected.
- Edge cases mentioned in the task were considered.
- The change is reversible.

## Validation

- The PR states which checks were run.
- Any skipped checks are explained.
- UI changes include screenshots or a clear manual validation note when possible.
- Tests were not bypassed or weakened.

## Risk

- No production deployment behavior changed unexpectedly.
- No authentication, payments, billing, database migrations, or security-sensitive areas changed without approval.
- No dependency was added or upgraded without explicit request.

## Final decision

Merge only when:

1. The diff matches the task.
2. Validation is sufficient.
3. The risk is acceptable.
4. You understand the change.

Otherwise, request changes or close the PR without merging.
