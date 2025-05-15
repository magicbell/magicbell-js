import { execSync } from 'node:child_process';
import * as fs from 'node:fs/promises';
import * as path from 'node:path';
import { parseArgs } from 'node:util';

import { sortPackageJson } from 'sort-package-json';

async function move(oldPath: string, newPath: string) {
  await fs.rm(newPath, { recursive: true, force: true });
  await fs.mkdir(path.dirname(newPath), { recursive: true });
  await fs.rename(oldPath, newPath);
}

async function readJSON(path: string) {
  return JSON.parse(await readFile(path));
}

async function writeJSON(path: string, data: any) {
  data = typeof data === 'string' ? data : JSON.stringify(data, null, 2) + '\n';
  return fs.writeFile(path, data, { encoding: 'utf-8' });
}

async function readFile(path: string): Promise<string> {
  if (/^https?:\/\//.test(path)) {
    return fetch(path, { headers: { 'content-type': 'application/json' } }).then((x) => x.text());
  }

  return fs.readFile(path, { encoding: 'utf-8' });
}

const { values: args } = parseArgs({
  options: {
    spec: { type: 'string', short: 's' },
  },
});

function hasChangesInPath(path: string) {
  try {
    execSync(`git diff --quiet HEAD ${path}`, { stdio: 'ignore' });
    return false;
  } catch (error) {
    return true;
  }
}

async function build(specfile) {
  if (!specfile) {
    console.log(`error: missing required argument '--spec <file>'`);
    process.exit(1);
  }

  const pkgPath = `./packages/${path.basename(path.resolve('.'))}`;

  let pkgJson = await readJSON('./package.json');
  console.log(`Building '${pkgJson.name}' using spec file '${specfile}'`);

  const liblabConfig = await readJSON('./liblab.config.json');
  const swaggerJSON = await readFile(specfile);
  await writeJSON(liblabConfig.specFilePath, swaggerJSON);

  execSync('npx -y liblab@latest build --skip-validation --approve-docs', { stdio: 'inherit' });
  await fs.rm(liblabConfig.specFilePath);

  await move('output/typescript/src', './src');
  execSync('npx fix-esm-import-path src');
  execSync(`yarn --cwd ../.. eslint --fix ${pkgPath}/src`, { stdio: 'inherit' });

  if (!hasChangesInPath('./src')) {
    console.log('No changes detected in output.');
    return;
  }

  await move('output/typescript/README.md', './README.md');
  await move('output/typescript/documentation', './documentation');

  // patch package.json
  const { dependencies } = JSON.parse(await fs.readFile('./output/typescript/package.json', { encoding: 'utf-8' }));
  pkgJson = sortPackageJson({ ...pkgJson, dependencies });

  await fs.writeFile('./package.json', JSON.stringify(pkgJson, null, 2) + '\n');
  await fs.rm('output', { recursive: true, force: true });

  execSync(`yarn --cwd ../.. eslint --fix ${pkgPath}`, { stdio: 'inherit' });
  execSync('yarn --cwd ../.. manypkg fix', { stdio: 'inherit' });
  execSync('yarn --cwd ../..', { stdio: 'inherit' });
  execSync('yarn build', { stdio: 'inherit' });
}

void build(args.spec || process.env.V2_SPEC_URL || process.env.SPEC_URL).finally(() =>
  fs.rm('output', { recursive: true, force: true }),
);
