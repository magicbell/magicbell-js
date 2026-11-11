// @vitest-environment node
import * as fs from 'node:fs/promises';
import * as os from 'node:os';
import * as path from 'node:path';

import { afterEach, expect, it } from 'vitest';

import { installGeneratedClient } from '../scripts/install-generated-client.js';

let directory: string;

afterEach(async () => {
  if (directory) await fs.rm(directory, { recursive: true, force: true });
});

it('keeps the existing client intact if its maintained runtime is missing', async () => {
  directory = await fs.mkdtemp(path.join(os.tmpdir(), 'magicbell-codegen-'));
  const source = path.join(directory, 'generated');
  const destination = path.join(directory, 'client');
  await fs.mkdir(source);
  await fs.mkdir(destination);
  await fs.writeFile(path.join(destination, 'index.ts'), 'existing API bindings');

  await expect(installGeneratedClient(source, destination)).rejects.toThrow();

  expect(await fs.readFile(path.join(destination, 'index.ts'), 'utf-8')).toBe('existing API bindings');
});

it('regenerates API bindings while preserving the maintained HTTP runtime', async () => {
  directory = await fs.mkdtemp(path.join(os.tmpdir(), 'magicbell-codegen-'));
  const source = path.join(directory, 'generated');
  const destination = path.join(directory, 'client');
  await fs.mkdir(path.join(source, 'http'), { recursive: true });
  await fs.mkdir(path.join(destination, 'http'), { recursive: true });
  await fs.writeFile(path.join(source, 'index.ts'), 'new API bindings');
  await fs.writeFile(path.join(source, 'http', 'client.ts'), 'generated runtime');
  await fs.writeFile(path.join(source, 'http', 'obsolete.ts'), 'generated only');
  await fs.writeFile(path.join(destination, 'http', 'client.ts'), 'maintained Zod 4 runtime');
  await fs.writeFile(path.join(destination, 'removed-api.ts'), 'old API bindings');

  await installGeneratedClient(source, destination);

  expect(await fs.readFile(path.join(destination, 'index.ts'), 'utf-8')).toBe('new API bindings');
  expect(await fs.readFile(path.join(destination, 'http', 'client.ts'), 'utf-8')).toBe('maintained Zod 4 runtime');
  await expect(fs.access(path.join(destination, 'http', 'obsolete.ts'))).rejects.toThrow();
  await expect(fs.access(path.join(destination, 'removed-api.ts'))).rejects.toThrow();
});
