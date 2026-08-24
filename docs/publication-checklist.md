# Publication checklist

Use this checklist before making an upstream AI Nightshift repository public or marking it as a template.

## Repository content

- No real personal tasks.
- No real client names.
- No private project names.
- No private screenshots or attachments.
- No private repository URLs.
- No internal roadmap details.
- No disposable smoke-test files.

## GitHub history

Check more than the latest file tree:

- issue history
- pull request history
- commit history
- branch names
- Actions logs
- uploaded screenshots and attachments

Deleting a file from the latest commit is not enough when sensitive context remains in history.

## Template quality

Confirm that:

- `LICENSE` contains the canonical MIT text.
- no extra license file conflicts with `LICENSE`.
- labels in `labels.yml` match README and setup docs.
- issue templates use generic placeholders.
- docs do not mention a private owner, client, or working queue.
- `CODEOWNERS` is generic or clearly optional.
- the smoke-test issue and PR are closed or removed from the public copy.

## Recommended publishing pattern

For the cleanest public release:

1. keep the real working queue private
2. create a clean public template repository
3. copy only reusable files into it
4. keep private issue and PR history out of the public template
