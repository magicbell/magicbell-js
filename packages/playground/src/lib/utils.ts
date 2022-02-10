import { SandpackPredefinedTemplate } from '@codesandbox/sandpack-react';
import { globby } from 'globby';
import fs from 'node:fs/promises';
import path from 'node:path';

export type ExampleConfig = {
  name: string;
  description?: string;
  dependencies: Record<string, string>;
  slug: string;
  template: SandpackPredefinedTemplate;
};

export async function getAllExamples(): Promise<ExampleConfig[]> {
  const packages = await globby('*/package.json', {
    cwd: './examples',
  });

  return Promise.all(
    packages.map((pkg) =>
      fs
        .readFile(path.join('./examples', pkg), { encoding: 'utf-8' })
        .then((data) => {
          const pkgJSON = JSON.parse(data) as ExampleConfig;
          return {
            ...pkgJSON,
            slug: path.basename(path.dirname(pkg)),
            template: getSandpackTemplate(pkgJSON),
          };
        }),
    ),
  );
}

export async function getFilesForExample(
  folder: string,
): Promise<Record<string, { code: string }>> {
  const filepaths = await globby(`**/*`, {
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

export function getSandpackTemplate(
  config: ExampleConfig,
): SandpackPredefinedTemplate {
  if (config.template) return config.template;
  if (config.dependencies['@magicbell/magicbell-react']) return 'react-ts';
  return 'vanilla-ts';
}

function pipe(...functions) {
  return (value) =>
    functions.reduce(
      (currentValue, currentFunction) => currentFunction(currentValue),
      value,
    );
}

function rename(current: string, next: string) {
  return (obj) => {
    if (!obj.hasOwnProperty(current)) return obj;
    const nextObj = { ...obj, [next]: obj[current] };
    delete nextObj[current];
    return nextObj;
  };
}

/**
 * Rename files based on the used template. This allows us to have a uniform folder
 * structure in /examples, even while Sandpack templates do not. Note that this
 * function mutates the input so it can be more effi
 *
 * @param files
 * @param template
 */
export function reshapeForSandpack(
  files: Record<string, { code: string }>,
  template: SandpackPredefinedTemplate,
): Record<string, { code: string }> {
  const newFiles = { ...files };

  // Sandpack won't use the template if we include a package.json
  delete newFiles['/package.json'];

  if (template === 'vanilla-ts') {
    return rename('/index.ts', '/src/index.ts')(newFiles);
  } else if (template === 'react-ts') {
    return rename('/app.tsx', '/App.tsx')(newFiles);
  } else if (template === 'angular') {
    return pipe(
      rename('/app.component.ts', '/src/app/app.component.ts'),
      rename('/app.component.html', '/src/app/app.component.html'),
    )(newFiles);
  } else if (template === 'vue') {
    return pipe(rename('/app.vue', '/src/App.vue'))(newFiles);
  } else if (template === 'vue3') {
    return pipe(rename('/app.vue', '/src/App.vue'))(newFiles);
  } else {
    return newFiles;
  }
}
