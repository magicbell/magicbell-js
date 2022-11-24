#!/usr/bin/env zx
import 'zx/globals';

/* eslint-disable no-console */
import parser from '@apidevtools/swagger-parser';
import { builders } from 'ast-types';
import axios from 'axios';
import { ESLint } from 'eslint';
import fs from 'fs/promises';
import { stringify } from 'json5';
import { IJsonSchema, OpenAPI, OpenAPIV3, OpenAPIV3_1 } from 'openapi-types';
import path from 'path';
import prettier from 'prettier';
import prettyMarkdown from 'prettier/parser-markdown';
import * as recast from 'recast';
import * as recastTypeScriptParser from 'recast/parsers/typescript';

type SchemaObject =
  | OpenAPIV3.SchemaObject
  | OpenAPIV3.ReferenceObject
  | OpenAPIV3_1.SchemaObject
  | OpenAPIV3_1.ReferenceObject;

const RECAST_OPTIONS: recast.Options = { tabWidth: 2, quote: 'single', wrapColumn: 120 };

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

const eslint = new ESLint({
  fix: true,
  useEslintrc: true,
  cwd: path.join(process.cwd(), '../..'),
  overrideConfig: {
    rules: {
      'prettier/prettier': ['error', { parser: 'typescript' }],
    },
  },
});

function wrap(text, width) {
  return text
    .replace(new RegExp(`(?![^\\n]{1,${width}}$)([^\\n]{1,${width}})\\s`, 'g'), '$1\n')
    .split('\n')
    .map((x) => x.trim())
    .join('\n');
}

async function formatCode(code: string) {
  return eslint.lintText(code).then((x) => {
    if (x[0].messages?.length) {
      console.log('ERRORS DURING CODE GENERATION:');
      console.dir(
        {
          t: typeof code,
          messages: x[0].messages,
          code: code
            .split('\n')
            .map((x, idx, all) => `${String(idx + 1).padStart(String(all.length).length, ' ')} ${x}`)
            .join('\n'),
        },
        { depth: null },
      );
    }
    return x[0].output;
  });
}

const SPEC_URL = 'https://raw.githubusercontent.com/magicbell-io/public/main/openapi/spec/openapi.json';
const CACHE_DIR = path.join(process.cwd(), 'scripts', '.cache');
const CACHE_FILE = path.join(CACHE_DIR, 'openapi.json');
const OUT_DIR = path.join(process.cwd(), 'src');

async function getOpenAPIDocument(options = { dereference: true }) {
  const parse = options.dereference ? parser.dereference.bind(parser) : parser.parse.bind(parser);

  if (argv.spec) {
    const contents = await fs.readFile(argv.spec, 'utf-8').then((x) => JSON.parse(x));
    return parse(contents);
  }

  if (argv.cache) {
    try {
      await fs.mkdir(CACHE_DIR, { recursive: true });
      const contents = await fs.readFile(CACHE_FILE, 'utf-8').then((x) => JSON.parse(x));
      return parse(contents);
    } catch {}
  }

  const contents = await axios.get(SPEC_URL).then((x) => x.data);
  await fs.writeFile(CACHE_FILE, JSON.stringify(contents, null, 2), 'utf-8');
  return parse(contents);
}

function getRootPaths(document: OpenAPI.Document) {
  const paths = Object.keys(document.paths);
  const rootPaths = paths.map((x) => x.split('/').filter(Boolean)[0]);
  return Array.from(new Set(rootPaths));
}

function getSuccessStatusCode(operation: OpenAPI.Operation) {
  return Object.keys(operation?.responses || {})
    .map((x) => Number(x))
    .find((response) => response >= 200 && response <= 299);
}

function isEmptySchema(schema: IJsonSchema) {
  return (
    !schema ||
    !schema.type ||
    (schema.type === 'object' && !schema.properties) ||
    (schema.type === 'array' && !schema.items)
  );
}

function getRootPathMethods(document: OpenAPI.Document, path: string) {
  const methods: Array<Method> = [];
  const apiPaths = Object.keys(document.paths).filter((x) => x.startsWith(`/${path}`));

  // we're using "entity" to wrap data and unwrap response. We might want to improve this, and
  // decide whether and how to wrap/unwrap on the method level, instead of making the resource
  // level decide for the method.
  const body = getRequestBody(document.paths[`/${path}`].post) || getResponseBody(document.paths[`/${path}`].get);
  const entity = Object.keys(body.schema['properties'])[0];

  for (const apiPath of apiPaths) {
    const rootPath = apiPath.split('/').filter(Boolean)[0];

    for (const method of Object.keys(document.paths[apiPath])) {
      const operation = document.paths[apiPath][method];
      const resource = operation.operationId.slice(0, rootPath.length);
      const name = camelCase(operation.operationId.slice(rootPath.length + 1));
      const type = name === 'list' ? 'list' : null;

      // url params, are applied like notifications.get('id')
      const urlParams = (apiPath.match(/{\w+}/g) || []).map((param) => param.replace(/[{}]/g, ''));
      const params = urlParams.map((param) => {
        const source = operation.parameters.find((x) => x.in === 'path' && x.name === param);
        return {
          title: camelCase(param),
          description: source?.description,
          type: 'string',
          ...source?.schema,
        };
      });

      // data is applied after url params, in an object, like notifications.create({ title: 'hi' })
      const query = (operation.parameters || [])
        .filter((x) => x.in === 'query')
        .map((x) => ({
          title: camelCase(x.name),
          description: x.description,
          ...x.schema,
        }));

      // const requestOptions = operation.parameters?.filter((x) => x.in === 'header').map((x) => x.name) ?? [];
      const TypePrefix = pascalCase(name) + pascalCase(resource);

      const requestBody = getRequestBody(operation)?.schema;
      const data = query.length
        ? {
            title: TypePrefix + 'PayloadSchema',
            type: 'object',
            properties: query.reduce((acc, x) => ({ ...acc, [x.title]: x }), {}),
            additionalProperties: false,
            required: query.filter((x) => x.required).map((x) => x.title),
          }
        : {
            title: TypePrefix + 'PayloadSchema',
            type: 'object',
            ...getSchema(document, requestBody, entity),
            additionalProperties: false,
          };

      const successResponse = getResponseBody(operation)?.schema;

      const returns = {
        title: TypePrefix + 'ResponseSchema',
        description: successResponse?.['description'],
        ...getSchema(document, successResponse, entity),
      };

      methods.push({
        name,
        entity,
        type,
        path: apiPath.replace(`/${path}`, '').replace(/^\//, ''),
        method,
        private: Boolean(operation['x-private']),
        beta: Boolean(operation['x-beta']),
        returns: isEmptySchema(returns) ? null : returns,
        params: params.filter((x) => !isEmptySchema(x)),
        data: isEmptySchema(data) ? null : data,
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
  return str[0].toLowerCase() + str.slice(1).replace(/[_-](\w)/g, (g) => g[1].toUpperCase());
}

function pascalCase(str: string) {
  return str[0].toUpperCase() + camelCase(str).slice(1);
}

function hyphenCase(str: string) {
  return str.replace(/_/g, '-');
}

function snakeCase(str: string) {
  return (
    str[0].toLowerCase() +
    str
      .replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`)
      .replace(/-/g, '_')
      .slice(1)
  );
}

function getRequestBody(method: OpenAPI.Operation) {
  if (!method || typeof method !== 'object' || !('requestBody' in method && 'content' in method.requestBody)) {
    return null;
  }

  const content = method.requestBody.content['application/json'];
  if (!content) return null;

  return content;
}

function getResponseBody(method: OpenAPI.Operation, code = getSuccessStatusCode(method)) {
  const response = method?.responses?.[code];
  if (!response || typeof response !== 'object' || !('content' in response && 'application/json' in response.content)) {
    return null;
  }

  const content = response.content['application/json'];
  if (!content) return null;

  return content;
}

type Method = {
  entity: string;
  path: string;
  method: string;
  name: string;
  type?: string;
  beta: boolean;
  private: boolean;
  params?: IJsonSchema[];
  data?: IJsonSchema;
  returns?: IJsonSchema;
} & OpenAPI.Operation;

function createResource({ apiPath, methods }: { apiPath: string; methods: Array<Method> }) {
  const hasListMethod = methods.some((x) => x.name === 'list');
  const resourceName = pascalCase(apiPath);

  return builders.program.from({
    comments: [
      builders.commentLine.from({
        value: ' This file is generated. Do not update manually!\n\n',
      }),
    ],
    body: [
      buildImportDeclaration(['type FromSchema'], 'json-schema-to-ts'),
      buildImportDeclaration(['Resource'], '../resource'),
      buildImportDeclaration('* as schemas', `../schemas/${hyphenCase(apiPath)}`),
      buildImportDeclaration(['type RequestOptions'], '../types'),
      hasListMethod && buildImportDeclaration(['type IterablePromise'], '../method'),

      ...methods
        .filter((x) => x.returns || x.data)
        .flatMap((method) =>
          [
            method.returns &&
              builders.tsTypeAliasDeclaration.from({
                id: builders.identifier(method.returns.title.replace(/Schema$/, '')),
                typeAnnotation: builders.tsTypeReference.from({
                  typeName: builders.identifier('FromSchema'),
                  typeParameters: builders.tsTypeParameterInstantiation.from({
                    params: [
                      builders.tsTypeQuery.from({
                        exprName: builders.identifier(`schemas.${method.returns.title}`),
                      }),
                    ],
                  }),
                }),
              }),
            method.data &&
              builders.tsTypeAliasDeclaration.from({
                id: builders.identifier(method.data.title.replace(/Schema$/, '')),
                typeAnnotation: builders.tsTypeReference.from({
                  typeName: builders.identifier('FromSchema'),
                  typeParameters: builders.tsTypeParameterInstantiation.from({
                    params: [
                      builders.tsTypeQuery.from({
                        exprName: builders.identifier(`schemas.${method.data.title}`),
                      }),
                    ],
                  }),
                }),
              }),
          ].filter(Boolean),
        ),
      builders.exportNamedDeclaration.from({
        declaration: builders.classDeclaration.from({
          id: builders.identifier(resourceName),
          superClass: builders.identifier('Resource'),
          body: builders.classBody(
            [
              builders.classProperty.from({
                key: builders.identifier('path'),
                value: builders.stringLiteral(apiPath),
              }),
              builders.classProperty.from({
                key: builders.identifier('entity'),
                value: builders.stringLiteral(methods[0].entity),
              }),

              ...methods
                .filter((x) => !x.private)
                .flatMap((method) => {
                  const paged = method.name === 'list';

                  const responseType = method.returns?.title?.replace(/Schema$/, '') || 'void';
                  const returnType = builders.tsTypeAnnotation(
                    builders.tsTypeReference(
                      builders.identifier(paged ? `IterablePromise<${responseType}>` : `Promise<${responseType}>`),
                    ),
                  );

                  const hasData = method.data;
                  const isDataOptional = (method.data?.required || []).length === 0;
                  const hasOverloads = method.data && isDataOptional;

                  const payloadType = method.data?.title.replace(/Schema$/, '');
                  const payloadOrOptionsType = `${payloadType} | RequestOptions`;

                  const pathParams = method.params.map((param) => buildParam(param.title, 'string'));
                  const dataParam = buildParam('data', payloadType);
                  const optionsParam = buildParam('options', 'RequestOptions', true);

                  const paramsDocs = method.params.map(
                    (x) => `@param ${x.title} ${x.description ? `- ${x.description}` : ''}`,
                  );

                  const fullSignatureComment = buildComment(
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
                            buildComment(
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
                            ? buildParam('dataOrOptions', payloadOrOptionsType)
                            : buildParam('data', payloadType)),
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
                          builders.returnStatement.from({
                            argument: builders.callExpression.from({
                              // typeArguments: builders.typeParameterInstantiation([TData]),
                              callee: builders.identifier('this.request'),
                              arguments: [
                                builders.objectExpression.from({
                                  properties: [
                                    buildProperty('method', method.method.toUpperCase()),
                                    method.path && buildProperty('path', method.path),
                                    paged && buildProperty('paged', true),
                                  ].filter(Boolean),
                                }),
                                ...method.params.map((param) => builders.identifier(param.title)),
                                method.data && builders.identifier(hasOverloads ? 'dataOrOptions' : 'data'),
                                builders.identifier('options'),
                              ].filter(Boolean),
                            }),
                          }),
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

function buildImportDeclaration(specifiers: string | string[], source: string) {
  const specifierArray = Array.isArray(specifiers) ? specifiers : [specifiers];

  return builders.importDeclaration.from({
    specifiers: specifierArray.map((x) =>
      x.startsWith('* as ')
        ? builders.importNamespaceSpecifier(builders.identifier(x.replace('* as ', '')))
        : builders.importSpecifier(builders.identifier(x)),
    ),
    source: builders.literal(source),
  });
}

function buildComment(...lines: (string | undefined | null)[]) {
  return builders.commentBlock.from({
    value: `*\n${lines
      .filter((x) => typeof x === 'string')
      .flatMap((x) =>
        wrap(x, 80)
          .split('\n')
          .map((x, idx, all) => (idx > 0 && all[0][0] === '@' ? `  ${x}` : x)),
      )
      .map((line) => ` * ${line}`)
      .join('\n')}\n *`,
  });
}

function buildProperty(name: string, value: any) {
  return builders.objectProperty.from({
    key: builders.identifier(name),
    value:
      typeof value === 'boolean'
        ? builders.booleanLiteral(value)
        : typeof value === 'number'
        ? builders.numericLiteral(value)
        : builders.stringLiteral(value),
  });
}

function buildParam(name: string, type: string, optional = false) {
  return builders.identifier.from({
    name: optional ? `${name}?` : `${name}`,
    typeAnnotation: builders.tsTypeAnnotation(
      type === 'string' ? builders.tsStringKeyword() : builders.tsTypeReference(builders.identifier(`${type}`)),
    ),
  });
}

function buildExportObjectAsConst(id: string, obj: any) {
  const expression = recast.parse(`const schema = ${JSON.stringify(obj)}`, {
    parser: recastTypeScriptParser,
  }).program.body[0].declarations[0].init;

  return builders.exportNamedDeclaration.from({
    declaration: builders.variableDeclaration.from({
      kind: 'const',
      declarations: [
        builders.variableDeclarator.from({
          id: builders.identifier(id),
          init: builders.tsAsExpression.from({
            expression,
            typeAnnotation: builders.tsTypeReference(builders.identifier('const')),
          }),
        }),
      ],
    }),
  });
}

function createResourceTypes({ methods }: { apiPath: string; methods: Array<Method> }) {
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
            method.returns && buildExportObjectAsConst(method.returns.title, method.returns),
            method.data && buildExportObjectAsConst(method.data.title, method.data),
          ].filter(Boolean),
        ),
    ],
  });
}

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
    throw new Error(`unimplemented schema type: ${schema.type}`);
  }

  return schema;
}

function createDocs({ apiPath, methods }: { apiPath: string; methods: Array<Method> }) {
  const lines: Array<string> = [];
  const startLevel = 3;

  lines.push(`${'#'.repeat(startLevel)} ${capitalize(apiPath)}\n`);

  for (const method of methods) {
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
  lines.splice(
    startIdx + 1,
    endIdx - startIdx - 1,
    '',
    (Array.isArray(content) ? content : [content]).join('\n').trim(),
    '',
  );
  return fs.writeFile(filePath, lines.join('\n'), 'utf-8');
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
  if (!output) return;
  await fs.writeFile(filePath, output, 'utf-8');
}

type File = { type: string; name: string; source: string; docs?: string };

function getByRef(doc: OpenAPI.Document, ref: string) {
  const [ns, type, name] = ref.replace('#/', '').split('/');
  return doc[ns][type][name];
}

// TODO: get schema unwrapped, or not ?!
function getSchema(doc: OpenAPI.Document, schema: SchemaObject, entity: string) {
  if (!schema) return null;
  const maybeWrapped = '$ref' in schema ? getByRef(doc, schema.$ref) : schema;
  const unwrapped = maybeWrapped.properties?.[entity] || maybeWrapped;
  return '$ref' in unwrapped ? getByRef(doc, unwrapped.$ref) : unwrapped;
}

async function main() {
  const document = await getOpenAPIDocument();
  const paths = getRootPaths(document);

  const files: Array<File> = [];
  const betaMethods: Method[] = [];

  // generate ast for new resource files
  for (const apiPath of paths) {
    const methods = getRootPathMethods(document, apiPath);
    if (methods.length === 0) continue;

    // collect beta methods to list feature flags
    for (const method of methods) {
      if (method.beta) betaMethods.push(method);
    }

    const ast = createResource({ apiPath, methods });
    const docs = createDocs({ apiPath, methods });

    const { code } = recast.prettyPrint(ast, RECAST_OPTIONS);
    const source = await formatCode(code);

    files.push({ type: 'resources', name: hyphenCase(apiPath) + '.ts', source, docs });

    const typeAst = recast.prettyPrint(createResourceTypes({ apiPath, methods }), RECAST_OPTIONS);
    const types = await formatCode(typeAst.code);

    files.push({ type: 'schemas', name: hyphenCase(apiPath) + '.ts', source: types });
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
  await updateReadme(path.join(process.cwd(), 'README.md'), 'RESOURCE_METHODS', docs);
  await updateReadme(path.join(process.cwd(), 'README.md'), 'FEATURE_FLAGS', createFeatureFlagTable(betaMethods));
  console.log(`updated README.md`);

  await updateClient(path.join(process.cwd(), 'src', 'client.ts'), files);
  console.log(`updated ${path.relative(process.cwd(), path.join('src', 'client.ts'))}`);
}

main();
