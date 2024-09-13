import path from 'path';

import { getOpenAPIDocument, getRootPathMethods, getRootPaths, Method } from './openapi.js';
import { hyphenCase } from './text.js';

export type Resource = {
  path: string;
  methods: Method[];
  summary?: string;
  description?: string;
};

export async function getResources(file: string): Promise<Resource[]> {
  const document = await getOpenAPIDocument(file);
  const paths = getRootPaths(document);

  return paths.map((path) => ({
    path,
    methods: getRootPathMethods(document, path),
    summary: document.paths[`/${path}`].summary,
    description: document.paths[`/${path}`].description,
  }));
}

export function filterResourcesMethods(resources: Resource[], cb: (method: Method) => boolean) {
  return resources
    .map((resource) => ({
      ...resource,
      methods: resource.methods.filter((method) => cb(method)),
    }))
    .filter((x) => x.methods.length);
}

export function hasHeader(method: Method, header: { name: string; required?: boolean }) {
  return method.parameters.some(
    (x) => x.in === 'header' && x.name.toLowerCase() === header.name.toLowerCase() && x.required === header.required,
  );
}

export function getBetaMethods(resources: Resource[]) {
  return resources
    .flatMap((x) => x.methods)
    .filter((x) => x.beta)
    .sort((a, b) => a.operationId.localeCompare(b.operationId));
}

export function flattenResourceMethods(resource: Resource): (Resource & { name: string })[] {
  const parent = { name: resource.path, ...resource, methods: resource.methods.filter((x) => !x.group) };
  const children = resource.methods
    .reduce((acc, x) => {
      if (x.group && !acc.includes(x.group)) acc.push(x.group);
      return acc;
    }, [])
    .map((name) => ({
      name: `${resource.path}_${name}`,
      path: `${resource.path}/${name}`,
      methods: resource.methods.filter((x) => x.group === name),
    }));

  return [parent, ...children];
}

export type File = { name: string; source: string; docs?: string };

type DocsFn = (resource: Resource) => Promise<string> | string;
type SourceFn = (resource: Resource, children: Resource[]) => Promise<string> | string;

export async function generateResourceFiles(
  resources: Resource[],
  destDir: string,
  sourceFn: SourceFn,
  docsFn: DocsFn,
): Promise<File[]> {
  const files: File[] = [];

  for (const rootResource of resources) {
    const [parent, ...children] = flattenResourceMethods(rootResource);

    for (const resource of [parent, ...children]) {
      files.push({
        name: path.join(destDir, hyphenCase(resource.path) + '.ts'),
        source: await sourceFn(resource, resource === parent ? children : []),
        docs: await docsFn(resource),
      });
    }
  }

  return files;
}
