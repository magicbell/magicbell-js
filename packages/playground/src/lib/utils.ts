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

function getIndexHtml(template: SandpackPredefinedTemplate) {
  const body =
    template === 'vanilla-ts'
      ? '<div id="app"></div><script src="src/index.js"></script>'
      : template === 'react-ts'
      ? '<div id="root"></div>'
      : template === 'angular'
      ? '<app-root></app-root>'
      : template === 'vue'
      ? '<div id="app"></div>'
      : template === 'vue3'
      ? '<div id="app"></div>'
      : '';

  return `<!doctype html>
<html lang="en">
            
<head>
    <meta charset="utf-8">
    <title>MagicBell Playground</title>
    <base href="/">
            
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="icon" type="image/x-icon" href="favicon.ico">
</head>
            
<body>
  <div class="inline-block">
    ${body}
  </div>
</body>
            
</html>`;
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

function add(name: string, content: string, options: Record<string, any> = {}) {
  return (obj) => {
    return {
      ...obj,
      [name]: { code: content, ...options },
    };
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
    return pipe(
      rename('/index.ts', '/src/index.ts'),
      add('/index.html', getIndexHtml(template), { hidden: true }),
    )(newFiles);
  } else if (template === 'react-ts') {
    return pipe(
      rename('/app.tsx', '/App.tsx'),
      add('/public/index.html', getIndexHtml(template), { hidden: true }),
    )(newFiles);
  } else if (template === 'angular') {
    return pipe(
      rename('/app.component.ts', '/src/app/app.component.ts'),
      rename('/app.component.html', '/src/app/app.component.html'),
      add('/src/index.html', getIndexHtml(template), { hidden: true }),
    )(newFiles);
  } else if (template === 'vue') {
    return pipe(
      rename('/app.vue', '/src/App.vue'),
      add('/public/index.html', getIndexHtml(template), { hidden: true }),
    )(newFiles);
  } else if (template === 'vue3') {
    return pipe(
      rename('/app.vue', '/src/App.vue'),
      add('/public/index.html', getIndexHtml(template), { hidden: true }),
    )(newFiles);
  } else {
    return newFiles;
  }
}
