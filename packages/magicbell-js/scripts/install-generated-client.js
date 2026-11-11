import * as fs from 'node:fs/promises';
import * as path from 'node:path';

/**
 * Install regenerated API bindings without replacing the maintained HTTP runtime.
 * @param {string} source
 * @param {string} destination
 */
export async function installGeneratedClient(source, destination) {
  const runtime = path.join(source, 'http');
  await fs.rm(runtime, { recursive: true, force: true });
  await fs.cp(path.join(destination, 'http'), runtime, { recursive: true });
  await fs.rm(destination, { recursive: true, force: true });
  await fs.rename(source, destination);
}
