/* eslint-disable no-console */
import { execSync } from 'node:child_process';
import * as fs from 'node:fs';
import * as path from 'node:path';

import { rimrafSync } from 'rimraf';

// biome-ignore lint/suspicious/noExplicitAny:
function getAllComponents(metadata: any) {
  // biome-ignore lint/suspicious/noExplicitAny:
  const allComponents: any[] = [];

  // biome-ignore lint/suspicious/noExplicitAny:
  metadata.modules.map((module: any) => {
    // biome-ignore lint/suspicious/noExplicitAny:
    module.declarations?.map((declaration: any) => {
      if (declaration.customElement) {
        const component = declaration;
        const path = module.path;

        if (component) {
          allComponents.push(Object.assign(component, { path }));
        }
      }
    });
  });

  return allComponents;
}

const outDir = './dist';
const reactDir = path.join('.', 'src', 'react');

// Clear build directory
rimrafSync(reactDir);
fs.mkdirSync(reactDir, { recursive: true });

// Fetch component metadata
const metadata = JSON.parse(fs.readFileSync(path.join(outDir, 'custom-elements.json'), 'utf8'));
const components = getAllComponents(metadata);

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
for await (const component of components) {
  const componentFile = path.join(reactDir, path.basename(component.path)).replace(/\.[jt]sx?$/, '.tsx');

  const importPath = path
    .relative(path.dirname(componentFile), path.join('src', component.path))
    .replace(/\.[jt]sx?$/, '.js');

  const eventImports = (component.events || [])
    .map((event: Record<string, unknown>) => `import type { ${event.eventName} } from '../events/${event.name}.js';`)
    .join('\n');

  const eventExports = (component.events || [])
    .map((event: Record<string, unknown>) => `export type { ${event.eventName} } from '../events/${event.name}.js';`)
    .join('\n');

  const eventNameImport = (component.events || []).length > 0 ? `import { type EventName } from '@lit/react';` : '';

  const events = (component.events || [])
    .map((event: Record<string, unknown>) => `${event.reactName}: '${event.name}' as EventName<${event.eventName}>`)
    .join(',\n');

  const jsDoc = component.jsDoc || '';

  const source = `
		import * as React from 'react';
		import { createComponent } from '@lit/react';
		import Component from '${importPath}';

		${eventNameImport}
		${eventImports}
		${eventExports}

		${jsDoc}
		export default createComponent({
			tagName: '${component.tagName}',
			elementClass: Component,
			react: React,
			events: {
				${events}
			},
			displayName: "${component.name}"
		})
	`;

  try {
    fs.writeFileSync(componentFile, source, 'utf8');
    execSync(`yarn format '${path.resolve(componentFile)}'`, {
      stdio: 'inherit',
      cwd: '../..',
    });
    console.log(`generated ${componentFile}`);
  } catch (e) {
    console.log('something went wrong', e);
  }
}
