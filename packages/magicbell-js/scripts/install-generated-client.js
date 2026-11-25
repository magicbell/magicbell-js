import * as fs from 'node:fs/promises';
import * as path from 'node:path';

const zodImport = /^import\s+(?:\{\s*z\s*\}|z)\s+from\s+(['"])zod\1;?$/gm;

/**
 * Liblab emits `import { z } from 'zod'`. Zod 4 bundles all of its locales through that import
 * under esbuild; a namespace import keeps the SDK tree-shakable.
 * @param {string} directory
 */
async function rewriteZodImports(directory) {
  const files = await fs.readdir(directory, { recursive: true });
  for (const file of files.filter((f) => f.endsWith('.ts'))) {
    const filePath = path.join(directory, file);
    const source = await fs.readFile(filePath, 'utf-8');
    const rewritten = source.replace(zodImport, "import * as z from 'zod';");
    if (rewritten !== source) await fs.writeFile(filePath, rewritten);
  }
}

/**
 * Install regenerated API bindings without replacing the maintained HTTP runtime.
 * @param {string} source
 * @param {string} destination
 */
export async function installGeneratedClient(source, destination) {
  const runtime = path.join(source, 'http');
  await fs.rm(runtime, { recursive: true, force: true });
  await fs.cp(path.join(destination, 'http'), runtime, { recursive: true });
  await rewriteZodImports(source);
  await fs.rm(destination, { recursive: true, force: true });
  await fs.rename(source, destination);
}
