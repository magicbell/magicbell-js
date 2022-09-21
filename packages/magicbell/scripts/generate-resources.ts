import parser from '@apidevtools/swagger-parser';
import { builders } from 'ast-types';
import axios from 'axios';
import { ESLint } from 'eslint';
import fs from 'fs/promises';
import { OpenAPI } from 'openapi-types';
import path from 'path';
import * as recast from 'recast';

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
      return parser.parse(contents);
    } catch {}
  }

  const contents = await axios.get(SPEC_URL).then((x) => x.data);
  await fs.writeFile(CACHE_FILE, JSON.stringify(contents, null, 2), 'utf-8');
  return parser.parse(contents);
}

function getRootPaths(document: OpenAPI.Document) {
  const paths = Object.keys(document.paths);
  const rootPaths = paths.map((x) => x.split('/').filter(Boolean)[0]);
  return Array.from(new Set(rootPaths));
}

function getRootPathMethods(document: OpenAPI.Document, path: string) {
  const result: Array<{ path: string; method: string } & OpenAPI.Operation> = [];

  const apiPaths = Object.keys(document.paths).filter((x) => x.startsWith(`/${path}`));
  for (const apiPath of apiPaths) {
    for (const method of Object.keys(document.paths[apiPath])) {
      result.push({
        path: apiPath.replace(`/${path}`, '').replace(/^\//, ''),
        method,
        ...document.paths[apiPath][method],
      });
    }
  }

  return result;
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

function createResource({
  name,
  apiPath,
  methods,
}: {
  name: string;
  apiPath: string;
  methods: Array<{ path: string; method: string } & OpenAPI.Operation>;
}) {
  const entity = methods
    .map((x) => {
      if (!('requestBody' in x && 'content' in x.requestBody && x.requestBody.content['application/json'])) {
        return false;
      }
      const keys = Object.keys(x.requestBody.content['application/json'].example || {});
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

async function main() {
  const document = await getOpenAPIDocument();
  const paths = getRootPaths(document);

  const files: Array<{ name: string; source: string }> = [];

  // generate ast for new resource files
  for (const apiPath of paths) {
    const methods = getRootPathMethods(document, apiPath);
    const mappedName = ENTITY_MAP[apiPath] || apiPath;

    const ast = createResource({ name: mappedName, apiPath, methods });
    const { code } = recast.prettyPrint(ast, { tabWidth: 2, quote: 'single' });
    files.push({ name: hyphenCase(mappedName) + '.ts', source: code });
  }

  // prettify sources
  for (const file of files) {
    file.source = await eslint.lintText(file.source).then((x) => x[0].output);
  }

  // add readme - this should not go trough eslint
  files.push({
    name: 'README.md',
    source: 'Files in this directory are auto generated. Do not make any manual changes within this directory.',
  });

  // all files are generated & linted, now it makes sense to flush the old files and write new ones
  await fs.rmdir(OUT_DIR, { recursive: true });
  await fs.mkdir(OUT_DIR, { recursive: true });

  for (const file of files) {
    await fs.writeFile(path.join(OUT_DIR, file.name), file.source, 'utf-8');
    // eslint-disable-next-line no-console
    console.log(`generated ${file.name}`);
  }
}

main();
