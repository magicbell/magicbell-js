#!/usr/bin/env node
// Installs the packed tarball of each published package, alone, into an empty project outside the
// monorepo and loads each entry point the way consumers do: require() for "require" exports, import()
// for "import" exports, and each bin with --version. Catches runtime dependencies that are missing
// from package.json, which the monorepo's hoisted node_modules hides. Run after `yarn build`.
import { execFileSync } from 'node:child_process';
import { mkdirSync, mkdtempSync, readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';

const root = resolve(import.meta.dirname, '..');
const work = mkdtempSync(join(tmpdir(), 'magicbell-pack-'));

const packages = readdirSync(join(root, 'packages'))
  .map((dir) => join(root, 'packages', dir))
  .map((dir) => ({ dir, pkg: JSON.parse(readFileSync(join(dir, 'package.json'), 'utf8')) }))
  .filter(({ pkg }) => !pkg.private);

let failures = 0;
let total = 0;
for (const { dir, pkg } of packages) {
  // One project per package, so another package's dependencies cannot satisfy a missing one.
  const app = join(work, pkg.name.replace('/', '__'));
  mkdirSync(app);
  writeFileSync(join(app, 'package.json'), '{"private":true}');
  console.log(`\n${pkg.name}`);
  const tarball = execFileSync('npm', ['pack', '--silent', '--pack-destination', app], { cwd: dir, encoding: 'utf8' })
    .trim()
    .split('\n')
    .pop();
  execFileSync('npm', ['install', '--silent', '--no-fund', '--no-audit', '--no-package-lock', join(app, tarball)], {
    cwd: app,
    stdio: 'inherit',
  });

  const checks = [];
  for (const [subpath, target] of Object.entries(pkg.exports ?? {})) {
    if (subpath === './package.json') continue;
    const specifier = subpath === '.' ? pkg.name : `${pkg.name}/${subpath.slice(2)}`;
    if (target.require) checks.push([`require('${specifier}')`, ['-e', `require(${JSON.stringify(specifier)})`]]);
    if (target.import) {
      checks.push([
        `import('${specifier}')`,
        ['--input-type=module', '-e', `await import(${JSON.stringify(specifier)})`],
      ]);
    }
  }
  for (const bin of Object.keys(pkg.bin ?? {})) {
    checks.push([`${bin} --version`, [join(app, 'node_modules/.bin', bin), '--version']]);
  }

  for (const [name, args] of checks) {
    total++;
    try {
      execFileSync(process.execPath, args, { cwd: app, stdio: 'pipe' });
      console.log(`ok   ${name}`);
    } catch (error) {
      failures++;
      const message =
        String(error.stderr)
          .split('\n')
          .find((line) => /Error/.test(line)) ?? error.message;
      console.log(`FAIL ${name}: ${message.trim()}`);
    }
  }
}

console.log(failures ? `\n${failures} of ${total} entry points failed` : `\nAll ${total} entry points load`);
process.exit(failures ? 1 : 0);
