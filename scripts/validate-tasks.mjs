import { pathToFileURL } from 'node:url';
import { readdir, readFile } from 'node:fs/promises';
import { join } from 'node:path';

const TASK_DIR = 'tasks/inbox';
export const REQUIRED_FIELDS = [
  'status',
  'target_repo',
  'target_branch',
  'type',
  'risk',
];

export async function listMarkdownFiles(dir) {
  let entries;

  try {
    entries = await readdir(dir, { withFileTypes: true });
  } catch (error) {
    if (error.code === 'ENOENT') return [];
    throw error;
  }

  const files = [];

  for (const entry of entries) {
    const fullPath = join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...await listMarkdownFiles(fullPath));
    } else if (entry.isFile() && entry.name.endsWith('.md')) {
      files.push(fullPath);
    }
  }

  return files;
}

export function normalizeLineEndings(content) {
  return content.split('\r\n').join('\n');
}

export function parseFrontmatter(content) {
  const normalized = normalizeLineEndings(content);
  const match = normalized.match(/^---\n([\s\S]*?)\n---/);
  if (!match) return null;

  const fields = new Set();
  for (const line of match[1].split('\n')) {
    const field = line.match(/^([a-zA-Z0-9_-]+):/);
    if (field) fields.add(field[1]);
  }

  return fields;
}

export function hasSection(content, heading) {
  const normalized = normalizeLineEndings(content);
  return normalized.split('\n').some((line) => line.trim() === `## ${heading}`);
}

export function validateTaskContent(content, file = 'task.md') {
  const errors = [];
  const fields = parseFrontmatter(content);

  if (!fields) {
    return [`${file}: missing YAML frontmatter`];
  }

  for (const field of REQUIRED_FIELDS) {
    if (!fields.has(field)) {
      errors.push(`${file}: missing frontmatter field '${field}'`);
    }
  }

  for (const section of ['Problem', 'Expected result', 'Constraints', 'Validation']) {
    if (!hasSection(content, section)) {
      errors.push(`${file}: missing section '## ${section}'`);
    }
  }

  return errors;
}

export async function main(taskDir = TASK_DIR) {
  const files = await listMarkdownFiles(taskDir);
  const errors = [];

  for (const file of files) {
    const content = await readFile(file, 'utf8');
    errors.push(...validateTaskContent(content, file));
  }

  if (errors.length > 0) {
    console.error('Task validation failed:\n');
    for (const error of errors) console.error(`- ${error}`);
    process.exitCode = 1;
    return;
  }

  console.log(`Task validation passed. Checked ${files.length} task file(s).`);
}

if (import.meta.url === pathToFileURL(process.argv[1]).href) {
  main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });
}
