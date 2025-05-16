#! /usr/bin/env node --experimental-strip-types
import { fileURLToPath } from 'node:url';

import fs from 'fs';
import { sync } from 'globby';
import path from 'path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const pkgJson = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'package.json'), 'utf-8'));
const files = sync(pkgJson.tshy.exports);
const pkgPaths = [];

for (const file of files) {
  const relativePath = file.replace('./src/', '');
  const dir = relativePath.slice(0, -path.extname(relativePath).length);
  if (dir === 'index') continue;

  const pkgJson = {
    main: `../dist/commonjs/${relativePath.replace(path.extname(file), '.js')}`,
    types: `../dist/commonjs/${relativePath.replace(path.extname(file), '.d.ts')}`,
  };

  const pkgPath = path.join(dir, 'package.json');
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(pkgPath, JSON.stringify(pkgJson, null, 2), 'utf-8');
  pkgPaths.push(`/${pkgPath}`);
}

const ignores = ['docs-dist', 'out'];
fs.writeFileSync(path.join(__dirname, '..', '.gitignore'), [...ignores, ...pkgPaths].join('\n') + '\n', 'utf-8');

for (const file of pkgPaths) {
  if (pkgJson.files.includes(file)) continue;
  pkgJson.files.push(file);
}

fs.writeFileSync(path.join(__dirname, '..', 'package.json'), JSON.stringify(pkgJson, null, 2) + '\n', 'utf-8');
