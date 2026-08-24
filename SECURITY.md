# Security policy

## Reporting a security issue

Do not open a public issue for a vulnerability that could expose credentials, private repository data, agent permissions, or sensitive workflow behavior.

Use GitHub's private vulnerability reporting feature when it is enabled for the repository. If private reporting is unavailable, contact the repository owner through a private channel rather than posting sensitive details publicly.

## Security scope

Security issues relevant to AI Nightshift include:

- workflows that could allow an agent to merge or push directly to protected branches
- paths that could expose secrets, tokens, private URLs, or repository data
- task-validation bypasses that materially weaken execution boundaries
- instructions that unintentionally authorize restricted areas such as authentication, payments, deployments, or data migrations
- unsafe permission defaults for connected agents or GitHub Actions

## Sensitive data

Never include real credentials, tokens, customer data, private repository URLs, internal screenshots, or unreleased project details in a vulnerability report unless they are strictly necessary and shared through a private channel.

If sensitive data is discovered in a repository, issue, pull request, workflow log, or commit history, do not copy the value into another public location.

## Supported version

The latest version on the default branch is the supported version of this template.

## Operating safety

This repository defines guardrails for human-reviewed AI coding workflows. The security model assumes that:

- the working queue is private
- connected repositories are explicitly selected
- agents do not merge automatically
- protected branches block direct pushes where possible
- humans review agent-created pull requests before merging

See `docs/safety-policy.md` and `docs/privacy.md` for the operational safety model.
