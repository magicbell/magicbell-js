import { getOpenAPIDocument, getRootPathMethods, getRootPaths } from './openapi';

export * as builders from './builders';
export * from './files';
export * from './openapi';
export * as recast from './recast';
export * from './schema';
export * from './text';

export async function getResources(file: string) {
  const document = await getOpenAPIDocument(file);
  const paths = getRootPaths(document);

  return paths.map((path) => ({ path, methods: getRootPathMethods(document, path) }));
}
