import fs from 'node:fs/promises';
import path from 'node:path';

export async function exists(path: string): Promise<boolean> {
  return fs
    .access(path)
    .then(() => true)
    .catch(() => false);
}

export function getDirs(paths) {
  const allDirs = new Set<string>();

  for (const file of paths) {
    const dir = path.dirname(file);
    allDirs.add(dir);
  }

  return Array.from(allDirs);
}
