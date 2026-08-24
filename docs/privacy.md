# Privacy guide

## Public upstream vs private queue

The public upstream repository should contain only reusable templates, docs, labels, and examples.

Your working queue should be private because issues and pull requests may contain:

- project names
- roadmap details
- client context
- screenshots
- private links
- internal bugs
- implementation notes

## Do not put private data in the public repository

Avoid adding real tasks, real client names, private screenshots, invoices, credentials, personal information, or unreleased product details to the public upstream.

## Before making a repository public

Check:

- issue history
- pull request history
- commit history
- Actions logs
- screenshots and attachments
- branch names
- examples in docs
- hardcoded usernames or repository names

Deleting a file from the latest commit is not always enough if the old content remains in history.

## Safe publishing pattern

The safest pattern is:

1. keep your personal working copy private
2. create a separate clean public template repository
3. copy only generic files into the public template
4. avoid publishing personal issue history and task history

## Agent access

A cloud agent can only work with data it can access through connected services. Review which repositories and integrations the agent can access before scheduling unattended runs.
