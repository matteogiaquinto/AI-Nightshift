import { readFile, readdir } from 'node:fs/promises';
import { join } from 'node:path';

const REQUIRED_LABELS = [
  'ready-for-agent',
  'small',
  'safe-change',
  'no-autocode',
  'bounded-analysis',
  'needs-human',
  'blocked',
  'priority-high',
  'agent-in-progress',
  'pr-open',
  'agent-done',
  'agent-skipped',
  'agent-error',
  'risk-low',
  'risk-medium',
  'risk-high',
];

const FORBIDDEN_TEXT = [
  'ready-for-codex',
  'codex-done',
  'codex-skipped',
];

const IGNORED_FOR_FORBIDDEN_TEXT_SCAN = new Set([
  'scripts/validate-repository.mjs',
]);

const TEXT_ROOTS = [
  '.github',
  'docs',
  'templates',
  'tasks',
  'scripts',
];

const TOP_LEVEL_TEXT_FILES = [
  'README.md',
  'AGENTS.md',
  'NIGHTSHIFT.md',
  'CONTRIBUTING.md',
  'SECURITY.md',
  'labels.yml',
  'package.json',
];

async function listFiles(dir) {
  let entries;
  try {
    entries = await readdir(dir, { withFileTypes: true });
  } catch (error) {
    if (error.code === 'ENOENT') return [];
    throw error;
  }

  const files = [];
  for (const entry of entries) {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) files.push(...await listFiles(path));
    if (entry.isFile()) files.push(path);
  }
  return files;
}

async function readText(path) {
  return readFile(path, 'utf8');
}

function normalizePath(path) {
  return path.split('\\').join('/');
}

async function main() {
  const errors = [];
  const labels = await readText('labels.yml');

  for (const label of REQUIRED_LABELS) {
    if (!labels.includes(`name: ${label}`)) {
      errors.push(`labels.yml is missing ${label}`);
    }
  }

  const files = [...TOP_LEVEL_TEXT_FILES];
  for (const root of TEXT_ROOTS) files.push(...await listFiles(root));

  for (const file of new Set(files)) {
    const normalizedFile = normalizePath(file);
    if (IGNORED_FOR_FORBIDDEN_TEXT_SCAN.has(normalizedFile)) continue;

    const content = await readText(file);
    for (const forbidden of FORBIDDEN_TEXT) {
      if (content.includes(forbidden)) {
        errors.push(`${normalizedFile} contains deprecated label ${forbidden}`);
      }
    }
  }

  if (errors.length > 0) {
    console.error('Repository validation failed:\n');
    for (const error of errors) console.error(`- ${error}`);
    process.exitCode = 1;
    return;
  }

  console.log('Repository validation passed.');
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
