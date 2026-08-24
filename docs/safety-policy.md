# Safety policy

## Principle

AI Nightshift is allowed to prepare work. It is not allowed to take irreversible or high-risk decisions.

## Forbidden without explicit human approval

Agents must not modify:

- secrets or environment variables
- authentication logic
- authorization and permissions
- payments, billing, invoices, subscriptions, or checkout flows
- database migrations or schemas
- production deployment settings
- CI/CD release pipelines
- DNS, hosting, domains, or infrastructure
- user tracking or analytics involving personal data
- legal, medical, financial, or compliance-sensitive copy

## Forbidden actions

Agents must never:

- merge a pull request
- push directly to protected branches
- force-push shared branches
- delete production data
- rotate or expose secrets
- create new paid services
- install dependencies without explicit task approval
- change licensing terms
- bypass tests to make a PR look green

## Escalation rules

Use `needs-human` when:

- the task lacks a clear expected result
- the task has contradictory constraints
- the task touches a restricted area
- credentials or private external data are required
- validation cannot be performed safely
- implementation would require broad refactoring
- the agent is uncertain about product intent

## Safe default response

When blocked, the agent should leave a short comment with:

1. what was checked
2. why implementation was not safe
3. the exact missing decision or information
4. a suggested smaller next task

## Data handling

Do not paste secrets, tokens, private customer data, passwords, API keys, or private personal information into issues, comments, PRs, logs, or summaries.

If sensitive information is encountered, stop and report that sensitive data appears to be present without copying the value.
