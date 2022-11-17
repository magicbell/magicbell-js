#!/usr/bin/env zx
import 'zx/globals';

/* eslint-disable no-console */
import parser from '@apidevtools/swagger-parser';
import { builders } from 'ast-types';
import axios from 'axios';
import { ESLint } from 'eslint';
import fs from 'fs/promises';
import { stringify } from 'json5';
import { OpenAPI, OpenAPIV3 } from 'openapi-types';
import path from 'path';
import prettier from 'prettier';
import prettyMarkdown from 'prettier/parser-markdown';
import * as recast from 'recast';
import * as recastTypeScriptParser from 'recast/parsers/typescript';

function formatMarkdown(document) {
  return prettier.format(document, {
    parser: 'markdown',
    plugins: [prettyMarkdown],
    singleQuote: true,
    semi: true,
    trailingComma: 'all',
    printWidth: 120,
    tabWidth: 2,
  });
}

const eslint = new ESLint({ fix: true, useEslintrc: true, cwd: path.join(process.cwd(), '../..') });
async function formatCode(code: string) {
  return eslint.lintText(code).then((x) => x[0].output);
}

const SPEC_URL = 'https://raw.githubusercontent.com/magicbell-io/public/main/openapi/spec/openapi.json';
const CACHE_DIR = path.join(process.cwd(), 'scripts', '.cache');
const CACHE_FILE = path.join(CACHE_DIR, 'openapi.json');
const OUT_DIR = path.join(process.cwd(), 'src', 'resources');

async function getOpenAPIDocument() {
  if (argv.spec) {
    const contents = await fs.readFile(argv.spec, 'utf-8').then((x) => JSON.parse(x));
    return parser.dereference(contents);
  }

  if (argv.cache) {
    try {
      await fs.mkdir(CACHE_DIR, { recursive: true });
      const contents = await fs.readFile(CACHE_FILE, 'utf-8').then((x) => JSON.parse(x));
      return parser.dereference(contents);
    } catch {}
  }

  const contents = await axios.get(SPEC_URL).then((x) => x.data);
  await fs.writeFile(CACHE_FILE, JSON.stringify(contents, null, 2), 'utf-8');
  return parser.dereference(contents);
}

function getRootPaths(document: OpenAPI.Document) {
  const paths = Object.keys(document.paths);
  const rootPaths = paths.map((x) => x.split('/').filter(Boolean)[0]);
  return Array.from(new Set(rootPaths));
}

function getRootPathMethods(document: OpenAPI.Document, path: string) {
  const methods: Array<Method> = [];
  const apiPaths = Object.keys(document.paths).filter((x) => x.startsWith(`/${path}`));

  for (const apiPath of apiPaths) {
    const rootPath = apiPath.split('/').filter(Boolean)[0];

    for (const method of Object.keys(document.paths[apiPath])) {
      const operation = document.paths[apiPath][method];
      const name = camelCase(operation.operationId.slice(rootPath.length + 1));
      const type = name === 'list' ? 'list' : null;

      methods.push({
        name,
        type,
        path: apiPath.replace(`/${path}`, '').replace(/^\//, ''),
        method,
        private: Boolean(operation['x-private']),
        beta: Boolean(operation['x-beta']),
        ...operation,
      });
    }
  }

  return methods;
}

function capitalize(str: string) {
  return str
    .split(/[_\-\s]/)
    .map((x) => x[0].toUpperCase() + x.slice(1))
    .join(' ');
}

function camelCase(str: string) {
  return str.replace(/[_-](\w)/g, (g) => g[1].toUpperCase());
}

function pascalCase(str: string) {
  return str[0].toUpperCase() + camelCase(str.slice(1));
}

function hyphenCase(str: string) {
  return str.replace(/_/g, '-');
}

function getRequestBody(method: Method) {
  if (!('requestBody' in method && 'content' in method.requestBody)) return null;

  const content = method.requestBody.content['application/json'];
  if (!content) return null;

  return content;
}

type Method = {
  path: string;
  method: string;
  name: string;
  type?: string;
  beta: boolean;
  private: boolean;
} & OpenAPI.Operation;

function createResource({ apiPath, methods }: { apiPath: string; methods: Array<Method> }) {
  const entity = methods
    .map((x) => {
      const requestBody = getRequestBody(x);
      if (!requestBody) return false;
      const keys = Object.keys(requestBody.example || {});
      return keys.length === 1 && keys[0] !== 'errors' ? keys[0] : false;
    })
    .find(Boolean);

  return builders.program.from({
    comments: [
      builders.commentLine.from({
        value: ' This file is generated. Do not update manually!',
      }),
    ],
    body: [
      builders.importDeclaration.from({
        specifiers: [builders.importSpecifier(builders.identifier('createMethod'))],
        source: builders.literal('../method'),
      }),
      builders.importDeclaration.from({
        specifiers: [builders.importSpecifier(builders.identifier('Resource'))],
        source: builders.literal('../resource'),
      }),
      builders.exportNamedDeclaration.from({
        declaration: builders.classDeclaration.from({
          id: builders.identifier(pascalCase(apiPath)),
          // typeParameters: builders.typeParameterDeclaration([builders.typeParameter('T')]),
          superClass: builders.identifier('Resource'),
          // superTypeParameters: builders.typeParameterInstantiation([
          // builders.genericTypeAnnotation(builders.identifier('U'), null),
          // ]),
          body: builders.classBody(
            [
              builders.classProperty.from({
                key: builders.identifier('path'),
                value: builders.stringLiteral(apiPath),
              }),
              entity &&
                builders.classProperty.from({
                  key: builders.identifier('entity'),
                  value: builders.stringLiteral(entity),
                }),

              ...methods
                .filter((x) => !x.private)
                .map((method) => {
                  const type = method.name === 'list' ? 'list' : null;

                  return builders.classProperty.from({
                    comments: [
                      builders.commentBlock.from({
                        value: `*\n * ${method.summary}\n *`,
                      }),
                    ],
                    key: builders.identifier(method.name),
                    value: builders.callExpression.from({
                      callee: builders.identifier('createMethod'),
                      arguments: [
                        builders.objectExpression.from({
                          properties: [
                            builders.objectProperty.from({
                              key: builders.identifier('id'),
                              value: builders.stringLiteral(method.operationId),
                            }),
                            builders.objectProperty.from({
                              key: builders.identifier('method'),
                              value: builders.stringLiteral(method.method.toUpperCase()),
                            }),
                            method.path &&
                              builders.objectProperty.from({
                                key: builders.identifier('path'),
                                value: builders.stringLiteral(method.path),
                              }),
                            type &&
                              builders.objectProperty.from({
                                key: builders.identifier('type'),
                                value: builders.stringLiteral('list'),
                              }),
                            method.beta &&
                              builders.objectProperty.from({
                                key: builders.identifier('beta'),
                                value: builders.booleanLiteral(true),
                              }),
                          ].filter(Boolean),
                        }),
                      ],
                    }),
                  });
                }),
            ].filter(Boolean),
          ),
        }),
      }),
    ],
  });
}

function createDocs({ apiPath, methods }: { apiPath: string; methods: Array<Method> }) {
  const lines: Array<string> = [];
  const startLevel = 3;
  const entity = apiPath.split('/').filter(Boolean)[0];

  lines.push(`${'#'.repeat(startLevel)} ${capitalize(apiPath)}\n`);

  function schemaToObject(schema) {
    if (schema == null) return null;

    if (schema.type === 'object' || !schema.type) {
      return Object.keys(schema.properties || {}).reduce(
        (acc, key) => Object.assign(acc, { [key]: schemaToObject(schema.properties[key]) }),
        {},
      );
    }

    if (schema.type === 'array') {
      return [schemaToObject(schema.items)];
    }

    if (schema.type === 'string') {
      return '…';
    }

    if (schema.type === 'integer') {
      return 1;
    }

    if (schema.type === 'boolean') {
      return true;
    }

    if (schema.type) {
      throw new Error(`unimplemented schema type: ${schema.type} at /${apiPath}`);
    }

    return schema;
  }

  for (const method of methods) {
    // don't document private methods
    if (method.private) continue;

    const parameters = method.parameters as OpenAPIV3.ParameterObject[];
    const requiresUserEmail = parameters.some((x) => /x-magicbell-user-email/i.test(x.name));
    const pathParams = method.path.split(/[/:]/).filter((x) => x && x.startsWith('{'));
    const pathParamsCleaned = pathParams.map((x) => x.replace(/[{}]/g, ''));
    const queryParams = parameters.filter((x) => x.in === 'query' && !pathParamsCleaned.includes(x.name));
    const query = queryParams.length
      ? queryParams.reduce((acc, x) => Object.assign(acc, { [x.name]: schemaToObject(x.schema) }), {})
      : null;

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

    const body =
      Object.keys(bodyObj || {}).length === 1 && (bodyObj[entity] || bodyObj[entity.replace(/s$/, '')])
        ? bodyObj[entity] || bodyObj[entity.replace(/s$/, '')]
        : bodyObj;

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
await magicbell.${camelCase(apiPath)}.${method.name}(${args});
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

async function updateReadme(filePath: string, blockName: string, content: string | string[]) {
  const lines = await fs.readFile(filePath, 'utf-8').then((x) => x.split('\n'));
  const startIdx = lines.indexOf(`<!-- AUTO-GENERATED-CONTENT:START (${blockName}) -->`);
  const endIdx = lines.indexOf(`<!-- AUTO-GENERATED-CONTENT:END (${blockName}) -->`);
  lines.splice(startIdx + 1, endIdx - startIdx - 1, ...(Array.isArray(content) ? content : [content]));
  return fs.writeFile(filePath, lines.join('\n'), 'utf-8');
}

async function updateClient(filePath: string, files: File[]) {
  const resources = files
    .filter((x) => x.name.endsWith('.ts'))
    .map((x) => x.name.replace(/\.ts$/, ''))
    .map((name) => ({
      file: `./resources/${name}`,
      class: pascalCase(name),
      property: camelCase(name),
    }))
    .sort((a, b) => a.property.localeCompare(b.property));

  const source = await fs.readFile(filePath, 'utf-8');
  const ast = recast.parse(source, { parser: recastTypeScriptParser });
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
  const { code } = recast.print(ast, { tabWidth: 2, quote: 'single' });
  const output = await formatCode(code);
  await fs.writeFile(filePath, output, 'utf-8');
}

type File = { name: string; source: string; docs?: string };

async function main() {
  const document = await getOpenAPIDocument();
  const paths = getRootPaths(document);

  const files: Array<File> = [];

  // generate ast for new resource files
  for (const apiPath of paths) {
    const methods = getRootPathMethods(document, apiPath);
    if (methods.length === 0) continue;

    const ast = createResource({ apiPath, methods });
    const docs = createDocs({ apiPath, methods });

    const { code } = recast.prettyPrint(ast, { tabWidth: 2, quote: 'single' });
    const source = await formatCode(code);

    files.push({ name: hyphenCase(apiPath) + '.ts', source, docs });
  }

  // collect beta methods to list feature flags
  const betaMethods = paths
    .map((apiPath) => getRootPathMethods(document, apiPath))
    .flat()
    .filter((x) => x.beta);

  // add readme - this should not go through eslint
  files.push({
    name: 'README.md',
    source: 'Files in this directory are auto generated. Do not make any manual changes within this directory.\n',
  });

  // all files are generated & linted, now it makes sense to flush the old files and write new ones
  await fs.rm(OUT_DIR, { recursive: true });
  await fs.mkdir(OUT_DIR, { recursive: true });

  for (const file of files) {
    const outFile = path.join(OUT_DIR, file.name);
    await fs.writeFile(outFile, file.source, 'utf-8');
    console.log(`generated ${path.relative(process.cwd(), outFile)}`);
  }

  // update method docs in readme
  const docs = files.map((x) => x.docs).filter(Boolean);
  await updateReadme(path.join(process.cwd(), 'README.md'), 'RESOURCE_METHODS', docs);
  await updateReadme(path.join(process.cwd(), 'README.md'), 'FEATURE_FLAGS', createFeatureFlagTable(betaMethods));
  console.log(`updated README.md`);

  await updateClient(path.join(process.cwd(), 'src', 'client.ts'), files);
  console.log(`updated ${path.relative(process.cwd(), path.join('src', 'client.ts'))}`);
}

main();
