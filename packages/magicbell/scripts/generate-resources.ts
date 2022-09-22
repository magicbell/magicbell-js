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

function formatMarkdown(document) {
  return prettier.format(document, {
    parser: 'markdown',
    plugins: [prettyMarkdown],
  });
}

const SPEC_URL = 'https://raw.githubusercontent.com/magicbell-io/docs/main/docs/rest-api/reference/openapi.json';

const CACHE_DIR = path.join(process.cwd(), 'scripts', '.cache');
const CACHE_FILE = path.join(CACHE_DIR, 'openapi.json');
const OUT_DIR = path.join(process.cwd(), 'src', 'resources');

const ENTITY_MAP = {
  push_subscriptions: 'devices',
};

// TODO: cleanup source openapi.json
const NAME_MAP = {
  'notifications-create-notification': 'create',
  'notifications-get-notifications': 'list',
  'notifications-get-notification': 'retrieve',
  'notifications-delete-notification': 'delete',
  'notifications-mark-user-notification-as-read': 'markAsRead',
  'notifications-mark-user-notification-as-unread': 'markAsUnread',
  'notifications-archive-notification': 'archive',
  'notifications-unarchive-notification': 'unarchive',
  'notifications-mark-a-users-notification-as-read': 'markAllRead',
  'notifications-mark-a-users-notification-as-seen': 'markAllSeen',
  'users-create-user': 'create',
  'users-update-user': 'update',
  'users-delete-user': 'delete',
  'users-update-user-by-email': 'updateByEmail',
  'users-delete-user-by-email': 'deleteByEmail',
  'users-update-user-by-external-id': 'updateByExternalId',
  'users-delete-user-by-external-id': 'deleteByExternalId',
  'notification_preferences-get-preferences': 'retrieve',
  'notification_preferences-put-preferences': 'update',
  'push_subscriptions-create-push-subscription': 'create',
  'push_subscriptions-delete-push-subscription': 'delete',
  'subscriptions-list-topic-subscription': 'list',
  'subscriptions-create-topic-subscription': 'create',
  'subscriptions-unsubscribe-topic-subscription': 'unsubscribe',
  'subscriptions-show-topic-subscription': 'retrieve',
  'subscriptions-delete-topic-subscription': 'delete',
};

const eslint = new ESLint({ fix: true, useEslintrc: true, cwd: path.join(process.cwd(), '../..') });

const args = process.argv.slice(2);

async function getOpenAPIDocument() {
  if (!args.includes('--no-cache')) {
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
  const result: Array<Method> = [];

  const apiPaths = Object.keys(document.paths).filter((x) => x.startsWith(`/${path}`));
  for (const apiPath of apiPaths) {
    const rootPath = apiPath.split('/').filter(Boolean)[0];

    for (const method of Object.keys(document.paths[apiPath])) {
      const operation = document.paths[apiPath][method];
      const name = getMethodName(rootPath, operation.operationId);
      const type = name === 'list' ? 'list' : null;

      result.push({
        name,
        type,
        path: apiPath.replace(`/${path}`, '').replace(/^\//, ''),
        method,
        ...operation,
      });
    }
  }

  return result;
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

function getMethodName(path: string, operationId: string) {
  const name = NAME_MAP[`${path}-${operationId}`];
  if (!name) throw new Error(`No method name alias found for ${path} / ${operationId}`);
  return name;
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
} & OpenAPI.Operation;

function createResource({ name, apiPath, methods }: { name: string; apiPath: string; methods: Array<Method> }) {
  const entity = methods
    .map((x) => {
      const requestBody = getRequestBody(x);
      if (!requestBody) return false;
      const keys = Object.keys(requestBody.example || {});
      return keys.length === 1 && keys[0] !== 'errors' ? keys[0] : false;
    })
    .find(Boolean);

  if (typeof entity !== 'string') throw new Error(`Could not determine entity name for ${apiPath}`);

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
          id: builders.identifier(pascalCase(name)),
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

              ...methods.map((method) => {
                const name = getMethodName(apiPath, method.operationId);
                const type = name === 'list' ? 'list' : null;

                return builders.classProperty.from({
                  comments: [
                    builders.commentBlock.from({
                      value: `*\n * ${method.summary}\n *`,
                    }),
                  ],
                  key: builders.identifier(name),
                  value: builders.callExpression.from({
                    callee: builders.identifier('createMethod'),
                    arguments: [
                      builders.objectExpression.from({
                        properties: [
                          builders.property.from({
                            key: builders.identifier('method'),
                            value: builders.stringLiteral(method.method.toUpperCase()),
                            kind: 'init',
                          }),
                          method.path &&
                            builders.property.from({
                              key: builders.identifier('path'),
                              value: builders.stringLiteral(method.path),
                              kind: 'init',
                            }),
                          type &&
                            builders.property.from({
                              key: builders.identifier('type'),
                              value: builders.stringLiteral('list'),
                              kind: 'init',
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

function createDocs({ name, apiPath, methods }: { name: string; apiPath: string; methods: Array<Method> }) {
  const lines: Array<string> = [];
  const startLevel = 3;
  const entity = apiPath.split('/').filter(Boolean)[0];

  lines.push(`${'#'.repeat(startLevel)} ${capitalize(name)}\n`);

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

    // TODO: validate example based on schema
    const bodyObj = requestBody?.example || schemaToObject(requestBody?.schema);
    const body = Object.keys(bodyObj || {}).length === 1 && bodyObj[entity] ? bodyObj[entity] : bodyObj;
    const args = [...pathParams, body, query, options]
      .filter((x) => x != null)
      .map((x) => stringify(x, { space: 2, quote: "'" }))
      .join(', ');

    lines.push(
      `
${'#'.repeat(startLevel + 1)} ${method.summary}

${method.description || ''}

\`\`\`js
await magicbell.${camelCase(name)}.${method.name}(${args});
\`\`\`
`.trim() + '\n',
    );
  }

  return formatMarkdown(lines.join('\n'));
}

async function updateReadme(filePath: string, blockName: string, content: string | string[]) {
  const lines = await fs.readFile(filePath, 'utf-8').then((x) => x.split('\n'));
  const startIdx = lines.indexOf(`<!-- AUTO-GENERATED-CONTENT:START (${blockName}) -->`);
  const endIdx = lines.indexOf(`<!-- AUTO-GENERATED-CONTENT:END (${blockName}) -->`);
  lines.splice(startIdx + 1, endIdx - startIdx - 1, ...(Array.isArray(content) ? content : [content]));
  return fs.writeFile(filePath, lines.join('\n'), 'utf-8');
}

async function main() {
  const document = await getOpenAPIDocument();
  const paths = getRootPaths(document);

  const files: Array<{ name: string; source: string }> = [];
  const docs = [];

  // generate ast for new resource files
  for (const apiPath of paths) {
    const methods = getRootPathMethods(document, apiPath);
    const name = ENTITY_MAP[apiPath] || apiPath;

    const ast = createResource({ name, apiPath, methods });
    const { code } = recast.prettyPrint(ast, { tabWidth: 2, quote: 'single' });
    files.push({ name: hyphenCase(name) + '.ts', source: code });

    const doc = createDocs({ name, apiPath, methods });
    docs.push(doc);
  }

  // prettify sources
  for (const file of files) {
    file.source = await eslint.lintText(file.source).then((x) => x[0].output);
  }

  // add readme - this should not go through eslint
  files.push({
    name: 'README.md',
    source: 'Files in this directory are auto generated. Do not make any manual changes within this directory.',
  });

  // all files are generated & linted, now it makes sense to flush the old files and write new ones
  await fs.rm(OUT_DIR, { recursive: true });
  await fs.mkdir(OUT_DIR, { recursive: true });

  for (const file of files) {
    const outFile = path.join(OUT_DIR, file.name);
    await fs.writeFile(outFile, file.source, 'utf-8');
    // eslint-disable-next-line no-console
    console.log(`generated ${path.relative(process.cwd(), outFile)}`);
  }

  // update method docs in readme
  await updateReadme(path.join(process.cwd(), 'README.md'), 'RESOURCE_METHODS', docs);
  // eslint-disable-next-line no-console
  console.log(`updated README.md`);
}

main();
