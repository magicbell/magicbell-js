#!/usr/bin/env zx
import 'zx/globals';

import {
  builders as b,
  camelCase,
  capitalize,
  formatMarkdown,
  getRequestBody,
  getResources,
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
import { OpenAPIV3 } from 'openapi-types';
import path from 'path';

const SPEC_URL = 'https://raw.githubusercontent.com/magicbell-io/public/main/openapi/spec/openapi.json';
const OUT_DIR = path.join(process.cwd(), 'src');
const README_MD = path.join(process.cwd(), 'README.md');

function createResource(resource: Resource) {
  const hasListMethod = resource.methods.some((x) => x.name === 'list');
  const resourceName = pascalCase(resource.path);

  return builders.program.from({
    comments: [
      builders.commentLine.from({
        value: ' This file is generated. Do not update manually!\n\n',
      }),
    ],
    body: [
      b.importDeclaration(['type FromSchema'], 'json-schema-to-ts'),
      b.importDeclaration(['Resource'], '../resource'),
      b.importDeclaration('* as schemas', `../schemas/${hyphenCase(resource.path)}`),
      b.importDeclaration(['type RequestOptions'], '../types'),
      hasListMethod && b.importDeclaration(['type IterablePromise'], '../method'),

      ...resource.methods
        .filter((x) => x.returns || x.data)
        .flatMap((method) => [
          isSchemaObject(method.returns) &&
            b.tsTypeAliasDeclaration(
              method.returns.title.replace(/Schema$/, ''),
              'FromSchema',
              `schemas.${method.returns.title}`,
            ),
          isSchemaObject(method.data) &&
            b.tsTypeAliasDeclaration(
              method.data.title.replace(/Schema$/, ''),
              'FromSchema',
              `schemas.${method.data.title}`,
            ),
        ]),
      builders.exportNamedDeclaration.from({
        declaration: builders.classDeclaration.from({
          id: builders.identifier(resourceName),
          superClass: builders.identifier('Resource'),
          body: builders.classBody(
            [
              b.classProperty('path', resource.path),
              b.classProperty('entity', resource.methods[0].entity),

              ...resource.methods
                .filter((x) => !x.private)
                .flatMap((method) => {
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

                  const pathParams = method.params.map((param) => b.param(param.title, 'string'));
                  const dataParam = b.param('data', payloadType);
                  const optionsParam = b.param('options', 'RequestOptions', true);

                  const paramsDocs = method.params.map(
                    (x) => `@param ${x.title} ${x.description ? `- ${x.description}` : ''}`,
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
                    ...(hasOverloads ? overloads : []),
                    builders.classMethod.from({
                      key: builders.identifier(method.name),
                      comments: hasOverloads ? [] : [fullSignatureComment],
                      returnType,
                      params: [
                        ...pathParams,
                        hasData &&
                          (hasOverloads
                            ? b.param('dataOrOptions', payloadOrOptionsType)
                            : b.param('data', payloadType)),
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
                              ...method.params.map((param) => 'title' in param && builders.identifier(param.title)),
                              method.data && builders.identifier(hasOverloads ? 'dataOrOptions' : 'data'),
                              builders.identifier('options'),
                            ),
                          ),
                        ].filter(Boolean),
                      ),
                    }),
                  ].filter(Boolean);
                }),
            ].filter(Boolean),
          ),
        }),
      }),
    ].filter(Boolean),
  });
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

  lines.push(`${'#'.repeat(startLevel)} ${capitalize(resource.path)}\n`);

  for (const method of resource.methods) {
    // don't document private methods
    if (method.private) continue;

    const parameters = method.parameters as OpenAPIV3.ParameterObject[];
    const requiresUserEmail = parameters.some((x) => /x-magicbell-user-email/i.test(x.name));
    const pathParams = method.params.map((x) => `{${snakeCase(x.title)}}`);
    const requestBody = getRequestBody(method);

    const options = requiresUserEmail ? { userEmail: 'person@example.com' } : null;

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
await magicbell.${camelCase(resource.path)}.${method.name}(${args});
\`\`\`
`.trim() + '\n',
    );
  }

  return formatMarkdown(lines.join('\n'));
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

  return lines.join('\n');
}

async function updateClient(filePath: string, files: File[]) {
  const resources = files
    .filter((x) => x.type === 'resources' && x.name.endsWith('.ts'))
    .map((x) => x.name.replace(/\.ts$/, ''))
    .map((name) => ({
      file: `./resources/${name}`,
      class: pascalCase(name),
      property: camelCase(name),
    }))
    .sort((a, b) => a.property.localeCompare(b.property));

  const source = await fs.readFile(filePath, 'utf-8');
  const ast = recast.parse(source);
  const program = ast.program;

  // update import statements
  program.body = program.body.filter(
    (x) => !(x.type === 'ImportDeclaration' && x.source.value.startsWith('./resources/')),
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

  const constructor = classBody.body.find((x) => x.type === 'ClassMethod' && x.kind === 'constructor');
  const firstIdx = classBody.body.indexOf(constructor);

  const properties = resources.map((x) =>
    builders.classProperty.from({
      key: builders.identifier(camelCase(x.property)),
      value: builders.newExpression.from({
        callee: builders.identifier(x.class),
        arguments: [builders.identifier('this')],
      }),
    }),
  );

  classBody.body.splice(firstIdx, 0, ...properties);
  const output = await recast.print(ast, false);
  if (!output) return;
  await fs.writeFile(filePath, output, 'utf-8');
}

type File = { type: string; name: string; source: string; docs?: string };

async function main() {
  const resources = await getResources(SPEC_URL);

  const files: Array<File> = [];
  const betaMethods = resources.flatMap((x) => x.methods).filter((x) => x.beta);

  // generate ast for new resource files
  for (const resource of resources) {
    const ast = createResource(resource);
    const docs = createDocs(resource);

    const source = await recast.print(ast);
    files.push({ type: 'resources', name: hyphenCase(resource.path) + '.ts', source, docs });

    const types = await recast.print(createResourceTypes(resource));
    files.push({ type: 'schemas', name: hyphenCase(resource.path) + '.ts', source: types });
  }

  const outDirs = Array.from(new Set(files.map((x) => x.type)));

  // add readme - this should not go through eslint
  outDirs.forEach((dir) => {
    files.push({
      type: dir,
      name: 'README.md',
      source: 'Files in this directory are auto generated. Do not make any manual changes within this directory.\n',
    });
  });

  // all files are generated & linted, now it makes sense to flush the old files and write new ones
  for (const dir of outDirs) {
    await fs.rm(path.join(OUT_DIR, dir), { recursive: true }).catch(() => void 0);
    await fs.mkdir(path.join(OUT_DIR, dir), { recursive: true });
  }

  for (const file of files) {
    const outFile = path.join(OUT_DIR, file.type, file.name);
    await fs.writeFile(outFile, file.source || '', 'utf-8');
    console.log(`generated ${path.relative(process.cwd(), outFile)}`);
  }

  // update method docs in readme
  const docs = files.map((x) => x.docs).filter(Boolean);
  await updateReadme(README_MD, 'RESOURCE_METHODS', docs);
  await updateReadme(README_MD, 'FEATURE_FLAGS', createFeatureFlagTable(betaMethods));
  console.log(`updated README.md`);

  await updateClient(path.join(process.cwd(), 'src', 'client.ts'), files);
  console.log(`updated ${path.relative(process.cwd(), path.join('src', 'client.ts'))}`);
}

main();
