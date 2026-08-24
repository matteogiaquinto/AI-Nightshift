import test from 'node:test';
import assert from 'node:assert/strict';

import {
  normalizeLineEndings,
  parseFrontmatter,
  validateTaskContent,
} from './validate-tasks.mjs';

const validTask = `---
status: ready
target_repo: OWNER/example
target_branch: main
type: bugfix
risk: low
---

## Problem
Something is wrong.

## Expected result
The behavior is corrected.

## Constraints
Keep the change scoped.

## Validation
Run the relevant check.
`;

test('accepts a valid task', () => {
  assert.deepEqual(validateTaskContent(validTask), []);
});

test('accepts CRLF line endings', () => {
  const crlf = validTask.replaceAll('\n', '\r\n');
  assert.equal(normalizeLineEndings(crlf).includes('\r\n'), false);
  assert.deepEqual(validateTaskContent(crlf), []);
});

test('reports missing required metadata', () => {
  const invalid = validTask.replace('risk: low\n', '');
  assert.deepEqual(validateTaskContent(invalid), ["task.md: missing frontmatter field 'risk'"]);
});

test('reports missing required sections', () => {
  const invalid = validTask.replace('## Validation\nRun the relevant check.\n', '');
  assert.deepEqual(validateTaskContent(invalid), ["task.md: missing section '## Validation'"]);
});

test('parses frontmatter fields without values leaking into the field set', () => {
  const fields = parseFrontmatter(validTask);
  assert.deepEqual([...fields], ['status', 'target_repo', 'target_branch', 'type', 'risk']);
});
