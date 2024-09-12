#!/usr/bin/env zx
import 'zx/globals';

import {
  builders as b,
  camelCase,
  capitalize,
  File,
  filterResourcesMethods,
  flattenResourceMethods,
  formatMarkdown,
  generateResourceFiles,
  getBetaMethods,
  getRequestBody,
  getResources,
  hasHeader,
  hyphenCase,
  isSchemaObject,
  Method,
  pascalCase,
  recast,
  Resource,
  schemaToObject,
  snakeCase,
  updateReadme,
} from '@magicbell/codegen';
/* eslint-disable no-console */
import { builders } from 'ast-types';
import fs from 'fs/promises';
import { stringify } from 'json5';
import path from 'path';

const SPEC_URL = argv.spec || process.env.SPEC_URL || 'https://public.magicbell.com/specs/openapi.json';

const initError = !argv.help && !argv.dest && !argv.docs;

if (initError) {
  console.error('Either --dest or --docs must be provided');
  argv.help = true;
}

if (argv.help) {
  console.log(`
Usage: generate-resources [options]

Options:
  --spec <url>    OpenAPI spec URL (default: https://public.magicbell.com/specs/openapi.json)
  --dest <dir>    Target directory for generated files
  --docs <file>   Target file for docs
`);

  process.exit(initError ? 1 : 0);
}

function countChar(char: string, string: string): number {
  return string.split(char).length - 1;
}

function createMethod(method: Method) {
  const paged = method.name === 'list';

  const responseType = method.returns?.title?.replace(/Schema$/, '') || 'void';
  const returnType = builders.tsTypeAnnotation(
    builders.tsTypeReference(
      builders.identifier(paged ? `IterablePromise<${responseType}>` : `Promise<${responseType}>`),
    ),
  );

  const hasData = isSchemaObject(method.data);
  const isDataOptional = (method.data?.required || []).length === 0;
  const hasOverloads = method.data && isDataOptional;

  const payloadType = method.data?.title.replace(/Schema$/, '');
  const payloadOrOptionsType = `${payloadType} | RequestOptions`;

  const pathParams = method.params.map((param) => b.param(camelCase(param.title), 'string'));
  const dataParam = b.param('data', payloadType);
  const optionsParam = b.param('options', 'RequestOptions', true);

  const paramsDocs = method.params.map(
    (x) => `@param ${camelCase(x.title)} ${x.description ? `- ${x.description}` : ''}`,
  );

  const fullSignatureComment = b.commentBlock(
    method.description || method.summary,
    '',
    ...paramsDocs,
    method.data && `@param data ${method.data.description ? `- ${method.data.description}` : ''}`,
    `@param options - override client request options.`,
    method.returns && `@returns ${method.returns.description || ''}`,
    method.beta && '',
    method.beta && `@beta`,
  );

  const overloads = hasOverloads
    ? [
        // create(options?: RequestOptions)
        builders.tsDeclareMethod.from({
          comments: [
            b.commentBlock(
              method.description || method.summary,
              '',
              ...paramsDocs,
              `@param options - override client request options.`,
              method.returns && `@returns ${method.returns.description || ''}`,
              method.beta && '',
              method.beta && `@beta`,
            ),
          ],
          key: builders.identifier(method.name),
          params: [...pathParams, optionsParam],
          returnType,
        }),
        // create(data: EntityPayload, options?: RequestOptions)
        builders.tsDeclareMethod.from({
          comments: [fullSignatureComment],
          key: builders.identifier(method.name),
          params: [...pathParams, dataParam, optionsParam],
          returnType,
        }),
      ]
    : [];

  return [
    ...overloads,
    builders.classMethod.from({
      key: builders.identifier(method.name),
      comments: hasOverloads ? [] : [fullSignatureComment],
      returnType,
      params: [
        ...pathParams,
        hasData && (hasOverloads ? b.param('dataOrOptions', payloadOrOptionsType) : b.param('data', payloadType)),
        optionsParam,
      ].filter(Boolean),
      body: builders.blockStatement(
        [
          method.beta &&
            builders.expressionStatement(
              builders.callExpression.from({
                callee: builders.identifier(`this.assertFeatureFlag`),
                arguments: [builders.stringLiteral(method.operationId)].filter(Boolean),
              }),
            ),
          builders.returnStatement(
            b.callExpression(
              'this.request',
              b.objectExpression(
                b.objectProperty('method', method.method.toUpperCase()),
                method.path && b.objectProperty('path', method.path),
                paged && b.objectProperty('paged', true),
              ),
              ...method.params.map((param) => 'title' in param && builders.identifier(camelCase(param.title))),
              method.data && builders.identifier(hasOverloads ? 'dataOrOptions' : 'data'),
              builders.identifier('options'),
            ),
          ),
        ].filter(Boolean),
      ),
    }),
  ].filter(Boolean);
}

async function createResource(resource: Resource, children?: Resource[]) {
  const hasListMethod = resource.methods.some((x) => x.name === 'list');
  const resourceName = pascalCase((resource as any).name || resource.path);

  const types = resource.methods
    .filter((x) => x.returns || x.data)
    .flatMap((method) => [
      isSchemaObject(method.returns) &&
        // builders.exportNamedDeclaration(
        b.tsTypeAliasDeclaration(
          method.returns.title.replace(/Schema$/, ''),
          'FromSchema',
          `schemas.${method.returns.title}`,
        ),
      // ),
      isSchemaObject(method.data) &&
        // builders.exportNamedDeclaration(
        b.tsTypeAliasDeclaration(
          method.data.title.replace(/Schema$/, ''),
          'FromSchema',
          `schemas.${method.data.title}`,
        ),
      // ),
    ]);

  const imports = children?.map((x) => b.importDeclaration([pascalCase((x as any).name)], `./${x.path}.js`)) || [];

  const methods = resource.methods
    .filter((x) => !x.private)
    .flatMap(createMethod)
    .filter(Boolean);

  const properties =
    children?.map((x) =>
      builders.classProperty.from({
        key: builders.identifier(camelCase((x as any).name.substring(resourceName.length + 1))),
        value: builders.newExpression.from({
          callee: builders.identifier(pascalCase((x as any).name)),
          arguments: [builders.identifier('this.client')],
        }),
      }),
    ) || [];

  const dots = '../'.repeat(countChar('/', resource.path) + 1).replace(/\/$/, '');

  const ast = builders.program.from({
    comments: [
      builders.commentLine.from({
        value: ' This file is generated. Do not update manually!\n\n',
      }),
    ],
    body: [
      b.importDeclaration(['type FromSchema'], 'json-schema-to-ts'),
      hasListMethod && b.importDeclaration(['type IterablePromise'], `${dots}/client/method.js`),
      b.importDeclaration(['Resource'], `${dots}/client/resource.js`),
      b.importDeclaration(['type RequestOptions'], `${dots}/client/types.js`),
      b.importDeclaration('* as schemas', `${dots}/schemas/${hyphenCase(resource.path)}.js`),
      ...imports,
      ...types,
      builders.exportNamedDeclaration.from({
        declaration: builders.classDeclaration.from({
          id: builders.identifier(resourceName),
          superClass: builders.identifier('Resource'),
          body: builders.classBody(
            [
              b.classProperty('path', resource.path.split('/')[0]),
              b.classProperty('entity', resource.methods[0].entity),
              ...properties,
              ...methods,
            ].filter(Boolean),
          ),
        }),
      }),
    ].filter(Boolean),
  });

  return recast.print(ast);
}

function createResourceTypes({ methods }: Resource) {
  return builders.program.from({
    comments: [
      builders.commentLine.from({
        value: ' This file is generated. Do not update manually!',
      }),
    ],
    body: [
      ...methods
        .filter((method) => method.returns || method.data)
        .flatMap((method) =>
          [
            method.returns && b.exportObject(method.returns.title, method.returns, 'const'),
            method.data && b.exportObject(method.data.title, method.data, 'const'),
          ].filter(Boolean),
        ),
    ],
  });
}

function createDocs(resource: Resource) {
  const lines: Array<string> = [];
  const startLevel = 3;

  lines.push(`${'#'.repeat(startLevel)} ${capitalize(resource.path.replaceAll('/', ' '))}\n`);

  for (const method of resource.methods) {
    // don't document private methods
    if (method.private) continue;

    const pathParams = method.params.map((x) => `{${snakeCase(x.title)}}`);
    const requestBody = getRequestBody(method);

    const options = null;
    const note = method.beta
      ? `
> **Warning**
>
> This method is in preview and is subject to change. It needs to be enabled via the \`${method.operationId}\` [feature flag](#feature-flags).
`.trim()
      : '';

    // TODO: validate example based on schema
    const bodyObj = requestBody?.example || schemaToObject(requestBody?.schema);
    const body = bodyObj?.[method.entity] || bodyObj;
    const query =
      method.data && !body
        ? Object.fromEntries(Object.entries(schemaToObject(method.data)).map(([k, v]) => [snakeCase(k), v]))
        : null;

    const args = [...pathParams, body, query, options]
      .filter((x) => x != null)
      .map((x) => stringify(x, { space: 2, quote: "'" }))
      .join(', ');

    lines.push(
      `
${'#'.repeat(startLevel + 1)} ${method.summary}

${note}

${method.description || ''}

\`\`\`js
await magicbell.${camelCase(resource.path.replaceAll('/', '.'))}.${method.name}(${args});
\`\`\`
`.trim() + '\n',
    );
  }

  return String(formatMarkdown(lines.join('\n')));
}

function createFeatureFlagTable(methods: Method[]) {
  if (!methods.some((x) => x.beta)) return '_There are no features in beta at this time._';

  const lines: Array<string> = [];

  lines.push('| Feature Flag | Description |');
  lines.push('|--------------|-------------|');

  for (const method of methods) {
    if (!method.beta) continue;
    lines.push(`| \`${method.operationId}\` | ${method.summary} ([docs](#${method.operationId})) |`);
  }

  return formatMarkdown(lines.join('\n'));
}

async function updateTypes(filePath: string, betaMethods: Method[]) {
  const source = await fs.readFile(filePath, 'utf-8');
  const ast = recast.parse(source);
  const program = ast.program;

  const clientOptions = program.body.find(
    (x) => x.type === 'ExportNamedDeclaration' && x.declaration.id.name === 'ClientOptions',
  );

  const features = clientOptions.declaration.typeAnnotation.members.find((x) => x.key.name === 'features');

  const featureFlagObject = builders.tsTypeLiteral.from({
    members: betaMethods.map((method) =>
      builders.tsPropertySignature.from({
        optional: true,
        key: builders.stringLiteral(method.operationId),
        typeAnnotation: builders.tsTypeAnnotation.from({
          typeAnnotation: builders.tsLiteralType.from({
            literal: builders.booleanLiteral(true),
          }),
        }),
      }),
    ),
  });

  // Use a Record<string, never> so that folks can keep `features: {}` in their options
  const emptyObject = builders.tsTypeReference(
    builders.identifier('Record'),
    builders.tsTypeParameterInstantiation([builders.tsStringKeyword(), builders.tsNeverKeyword()]),
  );

  features.typeAnnotation = builders.tsTypeAnnotation(betaMethods.length ? featureFlagObject : emptyObject);

  const output = await recast.print(ast, false);
  if (!output) return;
  await fs.writeFile(filePath, output, 'utf-8');
}
async function updateClient(filePath: string, files: File[]) {
  const baseDir = path.dirname(files.map((x) => x.name).sort((a, b) => a.length - b.length)[0]);
  const resources = files
    .filter((file) => path.extname(file.name) === '.ts' && path.dirname(path.relative(baseDir, file.name)) === '.')
    .map((x) => x.name.replace(/\.ts$/, ''))
    .map((filepath) => [filepath, path.relative(baseDir, filepath).replace(/\//g, '-')] as const)
    .map(([filepath, name]) => ({
      file: `./${filepath}.js`,
      class: pascalCase(name),
      property: camelCase(name),
    }))
    .sort((a, b) => a.property.localeCompare(b.property));

  const source = await fs.readFile(filePath, 'utf-8');
  const ast = recast.parse(source);
  const program = ast.program;

  // update import statements
  program.body = program.body.filter(
    (x) => !(x.type === 'ImportDeclaration' && x.source.value.startsWith(`./${baseDir}`)),
  );
  const imports = resources.map((resource) =>
    builders.importDeclaration.from({
      specifiers: [builders.importSpecifier(builders.identifier(resource.class))],
      source: builders.literal(resource.file),
    }),
  );
  program.body.splice(0, 0, ...imports);

  // update the class
  const classDeclaration = program.body.find(
    (x) => x.type === 'ExportNamedDeclaration' && x.declaration.type === 'ClassDeclaration',
  ).declaration;

  const classBody = classDeclaration.body;
  classBody.body = classBody.body.filter((x) => !(x.type === 'ClassProperty' && x.value.type === 'NewExpression'));

  const firstIdx = classBody.body.findIndex((x) => x.type === 'ClassMethod');

  const properties = resources.map((x) =>
    builders.classProperty.from({
      key: builders.identifier(camelCase(x.property)),
      value: builders.newExpression.from({
        callee: builders.identifier(x.class),
        arguments: [builders.identifier('this')],
      }),
    }),
  );

  if (firstIdx === -1) classBody.body.push(...properties);
  else classBody.body.splice(firstIdx, 0, ...properties);

  const output = await recast.print(ast, false);
  if (!output) return;
  await fs.writeFile(filePath, output, 'utf-8');
}

async function generateSchemaFiles(resources: Resource[], destDir: string): Promise<File[]> {
  const files: File[] = [];

  for (const rootResource of resources) {
    const [parent, ...children] = flattenResourceMethods(rootResource);

    for (const resource of [parent, ...children]) {
      files.push({
        name: path.join(destDir, hyphenCase(resource.path) + '.ts'),
        source: await recast.print(createResourceTypes(resource)),
      });
    }
  }

  return files;
}

async function main() {
  const resources = await getResources(SPEC_URL);

  const projectResources = filterResourcesMethods(resources, (method) =>
    hasHeader(method, { name: 'x-magicbell-api-secret', required: true }),
  );

  const userResources = filterResourcesMethods(
    resources,
    (method) => !hasHeader(method, { name: 'x-magicbell-api-secret', required: true }),
  );

  const betaMethods = getBetaMethods(resources);

  const files: Array<File> = [];

  // generate ast for new resource files
  files.push(...(await generateResourceFiles(projectResources, 'project-resources', createResource, createDocs)));
  files.push(...(await generateResourceFiles(userResources, 'user-resources', createResource, createDocs)));
  files.push(...(await generateSchemaFiles(resources, 'schemas')));

  const outDirs = Array.from(new Set(files.map((x) => path.dirname(x.name))));

  // add readme - this should not go through eslint
  outDirs.forEach((dir) => {
    files.push({
      name: path.join(dir, 'README.md'),
      source: 'Files in this directory are auto generated. Do not make any manual changes within this directory.\n',
    });
  });

  const projectResourceFiles = files.filter((x) => x.name.startsWith('project-resources'));
  const userResourceFiles = files.filter((x) => x.name.startsWith('user-resources'));

  if (argv.dest) {
    // all files are generated & linted, now it makes sense to flush the old files and write new ones
    for (const dir of outDirs) {
      await fs.rm(path.join(argv.dest, dir), { recursive: true }).catch(() => void 0);
      await fs.mkdir(path.join(argv.dest, dir), { recursive: true });
    }

    for (const file of files) {
      const outFile = path.join(argv.dest, file.name);
      await fs.mkdir(path.dirname(outFile), { recursive: true });
      await fs.writeFile(outFile, file.source || '', 'utf-8');
      console.log(`generated ${path.relative(argv.dest, outFile)}`);
    }

    await updateTypes(path.join(argv.dest, 'client', 'types.ts'), betaMethods);
    console.log(`updated ${path.relative(process.cwd(), path.join(argv.dest, 'client', 'types.ts'))}`);

    // update resource clients
    await updateClient(path.join(argv.dest, 'project-client.ts'), projectResourceFiles);
    console.log(`updated ${path.relative(process.cwd(), path.join(argv.dest, 'project-client.ts'))}`);
    await updateClient(path.join(argv.dest, 'user-client.ts'), userResourceFiles);
    console.log(`updated ${path.relative(process.cwd(), path.join(argv.dest, 'user-client.ts'))}`);
  }

  if (argv.docs) {
    // update method docs in readme
    await updateReadme(argv.docs, 'PROJECT_RESOURCE_METHODS', projectResourceFiles.map((x) => x.docs).filter(Boolean));
    await updateReadme(argv.docs, 'USER_RESOURCE_METHODS', userResourceFiles.map((x) => x.docs).filter(Boolean));
    await updateReadme(argv.docs, 'FEATURE_FLAGS', createFeatureFlagTable(betaMethods));
    console.log(`updated ${argv.docs}`);
  }
}

main();
