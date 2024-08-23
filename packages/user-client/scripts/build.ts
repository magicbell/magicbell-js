import { execSync } from 'node:child_process';
import * as fs from 'node:fs/promises';
import * as path from 'node:path';
import { parseArgs } from 'node:util';

import { rimraf } from 'rimraf';
import { sortPackageJson } from 'sort-package-json';

import rootPkgJson from '../../../package.json';

async function move(oldPath: string, newPath: string) {
  await rimraf(newPath);
  await fs.mkdir(path.dirname(newPath), { recursive: true });
  await fs.rename(oldPath, newPath);
}

function deleteAdminPaths(schema: any) {
  schema.tags = schema.tags.filter((x: any) => x.name !== 'admin' && x.name !== 'user');

  for (const path of Object.keys(schema.paths)) {
    for (const method of Object.keys(schema.paths[path])) {
      const operation = schema.paths[path][method];
      if (!('tags' in operation) || !Array.isArray(operation.tags)) continue;

      // delete operation if it's not for users
      if (operation.tags.includes('user')) {
        operation.tags = operation.tags.filter((x: any) => x !== 'user');
      } else {
        delete schema.paths[path][method];
        // console.log(`delete ${path}/${method}`)

        // delete path if no operations left
        if (Object.keys(schema.paths[path]).length > 0) continue;
        delete schema.paths[path];
        // console.log(`delete ${path}`);
      }
    }
  }

  return schema;
}

function findAllRefs(obj: any, refs = new Set<string>()) {
  if (typeof obj !== 'object' || obj === null) return refs;

  if (Array.isArray(obj)) {
    obj.forEach((item) => findAllRefs(item, refs));
  } else {
    for (const key in obj) {
      if (key === '$ref' && typeof obj[key] === 'string') {
        refs.add(obj[key]);
      } else {
        findAllRefs(obj[key], refs);
      }
    }
  }

  return refs;
}

function deleteUnreferencedComponents(swagger: any) {
  let refs = findAllRefs(swagger);
  const components = swagger.components && swagger.components.schemas;
  let initialCount, currentCount;

  do {
    initialCount = Object.keys(components || {}).length;

    if (components) {
      for (const schema in components) {
        const refString = `#/components/schemas/${schema}`;
        if (!refs.has(refString)) {
          delete components[schema];
          // console.log(`delete ${refString}`)
        }
      }
    }

    refs = findAllRefs(swagger); // Recalculate references after deletion
    currentCount = Object.keys(components || {}).length;
  } while (initialCount !== currentCount);
}

async function readFileOrUrl(path: string): Promise<string> {
  if (/^http?s:\/\//.test(path)) {
    return fetch(path, { headers: { 'content-type': 'application/json' } }).then((x) => x.text());
  }

  return fs.readFile(path, { encoding: 'utf-8' });
}

const { values: args } = parseArgs({
  options: {
    spec: { type: 'string', short: 's' },
  },
});

async function build(specfile = 'https://public.magicbell.com/specs/swagger.json') {
  const liblabConfig = JSON.parse(await fs.readFile('./liblab.config.json', { encoding: 'utf-8' }));
  let swaggerJSON = await readFileOrUrl(specfile);
  const spec = JSON.parse(swaggerJSON);

  deleteAdminPaths(spec);
  deleteUnreferencedComponents(spec);

  swaggerJSON = JSON.stringify(spec, null, 2);

  await fs.writeFile(liblabConfig.specFilePath, swaggerJSON);
  execSync(`npx -y liblab@latest build -y`, { stdio: 'inherit' });
  await rimraf(liblabConfig.specFilePath);

  await move('output/typescript/src', './src');
  // tests are currently ignored, as they're not stable between rebuilds, liblab is looking into this
  // await move('output/typescript/test', './test');
  await move('output/typescript/package.json', './package.json');
  await move('output/typescript/README.md', './README.md');
  await rimraf('output');

  // patch package.json
  let pkgJson = JSON.parse(await fs.readFile('./package.json', { encoding: 'utf-8' }));
  pkgJson.scripts.codegen = 'tsx scripts/build.ts';

  pkgJson.scripts['build'] = 'run-s build:*';
  pkgJson.scripts['build:cjs'] = 'tsc --project tsconfig.build.json --module commonjs --outDir dist/commonjs';
  pkgJson.scripts['build:esm'] = 'tsc --project tsconfig.build.json --module esnext --outDir dist/esm';
  pkgJson.scripts['start'] = 'rm -rf dist/ && tsc -w';

  delete pkgJson.scripts['watch'];
  delete pkgJson.scripts['build:umd'];
  delete pkgJson.scripts['build:all'];
  delete pkgJson.scripts['prepublishOnly'];

  for (const key of Object.keys(pkgJson.devDependencies)) {
    if (/eslint|prettier/.test(key)) {
      delete pkgJson.devDependencies[key];
    } else if (rootPkgJson.dependencies[key]) {
      pkgJson.devDependencies[key] = rootPkgJson.dependencies[key];
    }
  }

  pkgJson.repository = {
    type: 'git',
    url: 'https://github.com/magicbell/magicbell-js.git',
    directory: 'packages/user-client',
  };

  pkgJson = sortPackageJson(pkgJson);
  await fs.writeFile('./package.json', JSON.stringify(pkgJson, null, 2) + '\n');

  execSync(`yarn --cwd ../.. eslint --fix .`, { stdio: 'inherit' });
  execSync(`yarn --cwd ../.. manypkg fix`, { stdio: 'inherit' });
  execSync(`yarn --cwd ../..`, { stdio: 'inherit' });
  execSync(`yarn build`, { stdio: 'inherit' });
}

build(args.spec);
