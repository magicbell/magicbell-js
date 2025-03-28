import fs from 'node:fs/promises';
import path from 'node:path';

import { SandpackFile, SandpackPredefinedTemplate } from '@codesandbox/sandpack-react';
import * as glob from 'glob';

import { TEMPLATES } from './templates';

export type ExampleConfig = {
  name: string;
  description?: string;
  dependencies: Record<string, string>;
  slug: string;
  template: SandpackPredefinedTemplate;
};

export async function getAllExamples(): Promise<ExampleConfig[]> {
  const packages = glob.sync('*/package.json', {
    cwd: './examples',
    ignore: ['shared/package.json'],
  });

  const shared = JSON.parse(await fs.readFile('./examples/shared/package.json', { encoding: 'utf-8' }));

  return Promise.all(
    packages.map((pkg) =>
      fs.readFile(path.join('./examples', pkg), { encoding: 'utf-8' }).then((data) => {
        const pkgJSON = JSON.parse(data) as ExampleConfig;

        const dependencies = Object.assign({}, shared.dependencies, pkgJSON.dependencies);

        return {
          ...pkgJSON,
          dependencies,
          slug: path.basename(path.dirname(pkg)),
          template: getSandpackTemplate(pkgJSON),
        };
      }),
    ),
  );
}

export async function readFolderContents(folder: string): Promise<Record<string, { code: string }>> {
  const filepaths = glob.sync(`**/*`, {
    cwd: `./examples/${folder}`,
  });

  const contents = await Promise.all(
    filepaths.map((file) =>
      fs.readFile(path.join('./examples/', folder, file), {
        encoding: 'utf-8',
      }),
    ),
  );

  const files: Record<string, { code: string }> = {};
  for (let i = 0; i < filepaths.length; i++) {
    files[`/${filepaths[i]}`] = { code: contents[i] };
  }

  return files;
}

export async function getFilesForExample(folder: string): Promise<Record<string, { code: string }>> {
  return readFolderContents(folder);
}

export function getSandpackTemplate(config: ExampleConfig): SandpackPredefinedTemplate {
  if (config.template) return config.template;
  if (config.dependencies['@magicbell/magicbell-react']) return 'react-ts';
  return 'vanilla-ts';
}

function pipe(...functions) {
  return (value) => functions.reduce((currentValue, currentFunction) => currentFunction(currentValue), value);
}

function move(current: string, next: string) {
  return (obj) => {
    if (!obj.hasOwnProperty(current)) return obj;
    const nextObj = { ...obj, [next]: obj[current] };
    delete nextObj[current];
    return nextObj;
  };
}

function add(name: string, content: string, options: Record<string, any> = {}) {
  return (obj) => ({
    ...obj,
    [name]: { code: content, ...options },
  });
}

function rm(name: string) {
  return (obj) => {
    const { [name]: _, ...rest } = obj;
    return rest;
  };
}

function edit(name: string, fn: (file: SandpackFile) => SandpackFile) {
  return (obj) => ({
    ...obj,
    [name]: fn(obj[name]),
  });
}

/**
 * Rename files based on the used template. This allows us to have a uniform folder
 * structure in /examples, even while Sandpack templates do not. Note that this
 * function mutates the input so it can be more effi
 *
 * @param files
 * @param template
 */
export async function reshapeForSandpack(
  files: Record<string, { code: string }>,
  template: SandpackPredefinedTemplate,
): Promise<Record<string, { code: string }>> {
  const shared = await readFolderContents('shared');
  const ops = [];

  for (const [file, { code }] of Object.entries(shared)) {
    ops.push(add(file, code, { hidden: true }));
  }

  for (const [file, code] of Object.entries(TEMPLATES[template])) {
    ops.push(add(file, code, { hidden: true }));
  }

  // Sandpack won't use the template if we include a package.json
  ops.push(rm('/package.json'));

  if (template === 'vanilla-ts') {
    ops.push(edit('/app.ts', (file) => ({ ...file, active: true })));
  } else if (template === 'react-ts') {
    ops.push(move('/app.tsx', '/App.tsx'));
  } else if (template === 'angular') {
    ops.push(
      move('/app.component.ts', '/src/app/app.component.ts'),
      move('/app.component.html', '/src/app/app.component.html'),
    );
  } else if (template === 'vue') {
    ops.push(move('/app.vue', '/src/App.vue'));
  } else if (template === 'vue3') {
    ops.push(move('/app.vue', '/src/App.vue'));
  }

  return pipe(...ops)(files);
}
