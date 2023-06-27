#!/usr/bin/env zx
/* eslint-disable no-console */
import 'zx/globals';

import {
  builders as b,
  camelCase,
  capitalize,
  formatMarkdown,
  getRequestBody,
  getResources,
  hyphenCase,
  Method,
  recast,
  Resource,
  schemaToObject,
  updateReadme,
} from '@magicbell/codegen';
import { builders } from 'ast-types';
import * as K from 'ast-types/gen/kinds';
import fs from 'fs/promises';
import { OpenAPIV3 } from 'openapi-types';
import path from 'path';

const SPEC_URL = 'https://raw.githubusercontent.com/magicbell-io/public/main/openapi/spec/openapi.json';
const OUT_DIR = path.join(process.cwd(), 'src');
const META_FILE = path.join(__dirname, 'meta.json');
const README_MD = path.join(process.cwd(), 'README.md');

function cleanMarkdown(markdown = '') {
  return markdown.replace(/\[(.*)]\(.*\)/g, '$1');
}

function countChar(char: string, string: string): number {
  return string.split(char).length - 1;
}

type ResourceMeta = { description: string };
type Meta = {
  resources: Record<string, ResourceMeta>;
};

function createResource(resource: Resource, children: Resource[], meta: ResourceMeta) {
  const hasBetaMethod = resource.methods.some((x) => x.beta);

  const exportName = camelCase((resource as any).name || resource.path);
  const commandName = hyphenCase(resource.path.split('/').pop());

  // child resource imports
  const imports = children?.map((x) => b.importDeclaration([camelCase((x as any).name)], `./${x.path}`)) || [];

  // createCommand(commandName);
  let command = builders.callExpression(b.id('createCommand'), [builders.stringLiteral(commandName)]);

  // command.description(...)
  command = builders.callExpression(builders.memberExpression(command, b.id('description')), [
    builders.stringLiteral(cleanMarkdown(meta.description)),
  ]);

  const body: K.StatementKind[] = [];

  body.push(
    builders.exportNamedDeclaration(
      builders.variableDeclaration('const', [builders.variableDeclarator(b.id(exportName), command)]),
    ),
  );

  // subcommands
  // add `users.addCommand(usersNotifications);`
  for (const child of children) {
    body.push(
      builders.expressionStatement(
        builders.callExpression(builders.memberExpression(b.id(exportName), b.id('addCommand')), [
          b.id(camelCase((child as any).name)),
        ]),
      ),
    );
  }

  for (const method of resource.methods) {
    let expression: K.ExpressionKind = b.id(exportName);

    const hasData = Boolean(method.data);
    const isListMethod = method.name === 'list';

    // add command
    expression = builders.callExpression(builders.memberExpression(expression, b.id('command')), [
      builders.stringLiteral(hyphenCase(method.name)),
    ]);

    // add description
    const betaFlag = builders.callExpression(builders.memberExpression(b.id('kleur'), b.id('red')), [
      builders.stringLiteral('[BETA] '),
    ]);

    const description = builders.stringLiteral(cleanMarkdown(method.summary || method.description));

    expression = builders.callExpression(builders.memberExpression(expression, b.id('description')), [
      method.beta ? builders.binaryExpression('+', betaFlag, description) : description,
    ]);

    // add arguments
    for (const param of method.params) {
      expression = builders.callExpression(builders.memberExpression(expression, b.id('argument')), [
        builders.stringLiteral(`<${hyphenCase(param.title)}>`),
        builders.stringLiteral((cleanMarkdown(param.description) || '').split('\n')[0]),
      ]);
    }

    // add options
    for (const [option, schema] of Object.entries(method.data?.properties || {})) {
      const flag = `--${hyphenCase(option)}`;
      const type =
        schema.type === 'boolean'
          ? null
          : schema.type === 'array'
          ? 'string...'
          : schema.type === 'object'
          ? 'json'
          : schema.type;
      expression = builders.callExpression(builders.memberExpression(expression, b.id('option')), [
        builders.stringLiteral(type ? `${flag} <${type}>` : flag),
        builders.stringLiteral((cleanMarkdown(schema.description) || '').split('\n')[0]),
      ]);
    }

    // list methods get additional options
    if (isListMethod) {
      expression = builders.callExpression(builders.memberExpression(expression, b.id('option')), [
        builders.stringLiteral('--paginate'),
        builders.stringLiteral('Make additional HTTP requests to fetch all pages of results'),
      ]);
    }

    const methodNamespace = resource.path
      .split('/')
      .map((x) => camelCase(x))
      .join('.');

    // add action
    expression = builders.callExpression(builders.memberExpression(expression, b.id('action')), [
      builders.arrowFunctionExpression.from({
        async: true,
        params: [
          ...method.params.map((x) => b.id(camelCase(x.title))),
          isListMethod
            ? builders.objectPattern([b.objectProperty('paginate'), builders.restProperty(b.id('opts'))])
            : b.id('opts'),
        ],
        body: builders.blockStatement([
          builders.variableDeclaration('const', [
            builders.variableDeclarator(
              builders.objectPattern(
                [hasData && b.objectProperty('data'), b.objectProperty('options')].filter(Boolean),
              ),
              builders.callExpression(b.id('parseOptions'), [b.id('opts')]),
            ),
          ]),
          ...(isListMethod
            ? [
                // const list = getClient().<resource>.list(<...params>, <data>, <options>);
                builders.variableDeclaration('const', [
                  builders.variableDeclarator(
                    b.id('response'),
                    builders.callExpression(
                      builders.memberExpression(
                        builders.memberExpression(
                          builders.callExpression(b.id('getClient'), []),
                          b.id(methodNamespace),
                        ),
                        b.id(camelCase(method.name)),
                      ),
                      [
                        ...method.params.map((x) => b.id(camelCase(x.title))),
                        hasData && b.id('data'),
                        b.id('options'),
                      ].filter(Boolean),
                    ),
                  ),
                ]),
                builders.ifStatement(
                  b.id('paginate'),
                  // if (paginate) { await response.forEach(notification => printJson(notification)) }
                  builders.blockStatement([
                    builders.expressionStatement(
                      builders.awaitExpression(
                        builders.callExpression(builders.memberExpression(b.id('response'), b.id('forEach')), [
                          builders.arrowFunctionExpression(
                            [b.id('notification')],
                            builders.callExpression(b.id('printJson'), [b.id('notification')]),
                          ),
                        ]),
                      ),
                    ),
                  ]),
                  // else { await response.then(result => printJson(result)) }
                  builders.blockStatement([
                    builders.expressionStatement(
                      builders.awaitExpression(
                        builders.callExpression(builders.memberExpression(b.id('response'), b.id('then')), [
                          builders.arrowFunctionExpression(
                            [b.id('result')],
                            builders.callExpression(b.id('printJson'), [b.id('result')]),
                          ),
                        ]),
                      ),
                    ),
                  ]),
                ),
              ]
            : [
                // const response = await client.<resource>.<method>(< ...params>, <data>, <options>);
                builders.variableDeclaration('const', [
                  builders.variableDeclarator(
                    b.id('response'),
                    builders.awaitExpression(
                      builders.callExpression(
                        builders.memberExpression(
                          builders.memberExpression(
                            builders.callExpression(b.id('getClient'), []),
                            b.id(methodNamespace),
                          ),
                          b.id(camelCase(method.name)),
                        ),
                        [
                          ...method.params.map((x) => b.id(camelCase(x.title))),
                          hasData && b.id('data'),
                          b.id('options'),
                        ].filter(Boolean),
                      ),
                    ),
                  ),
                ]),
                // printJSON(response);
                builders.expressionStatement(builders.callExpression(b.id('printJson'), [b.id('response')])),
              ]),
        ]),
      }),
    ]);

    body.push(builders.expressionStatement(expression));
  }

  const dots = '../'.repeat(countChar('/', resource.path) + 1).replace(/\/$/, '');

  return builders.program.from({
    comments: [
      builders.commentLine.from({
        value: ' This file is generated. Do not update manually!\n',
      }),
    ],
    body: [
      hasBetaMethod && b.importDeclaration('kleur', 'kleur'),
      b.importDeclaration(['getClient'], `${dots}/lib/client`),
      b.importDeclaration(['createCommand'], `${dots}/lib/commands`),
      b.importDeclaration(['parseOptions'], `${dots}/lib/options`),
      b.importDeclaration(['printJson'], `${dots}/lib/printer`),
      ...imports,
      ...body,
    ].filter(Boolean),
  });
}

function createDocs(resource: Resource) {
  const lines: Array<string> = [];
  const startLevel = 3;

  lines.push(`${'#'.repeat(startLevel)} ${capitalize(resource.path.replaceAll('/', ' '))}\n`);

  for (const method of resource.methods) {
    // don't document private methods
    if (method.private) continue;

    const parameters = method.parameters as OpenAPIV3.ParameterObject[];
    const requiresUserEmail = parameters.some((x) => /x-magicbell-user-email/i.test(x.name));
    const pathParams = method.params.map((x) => `<${hyphenCase(x.title)}>`);
    const requestBody = getRequestBody(method);

    const options = [];
    if (requiresUserEmail) {
      options.push(['user-email', 'person@example.com']);
    }

    const note = method.beta
      ? `
> **Warning**
>
> This method is in preview and is subject to change.
`.trim()
      : '';

    function normalizeOption(key, value) {
      if (key === 'recipients') value = value.map((x) => x.email || x.external_id).filter(Boolean)[0];
      if (value == null) return;
      if (Array.isArray(value)) value = value[0];
      if (typeof value === 'object') value = JSON.stringify(value);

      if (typeof value !== 'string') return `--${key} ${value}`;

      // some example objects are compacted using ..., we can't use them here
      if (value.includes('…') || value.includes('...')) return;

      value = value.replaceAll("'", "\\'");
      return `--${hyphenCase(key)} '${value}'`;
    }

    const bodyObject = requestBody?.example || schemaToObject(requestBody?.schema);
    const bodyFlags = Object.entries(bodyObject?.[method.entity] || bodyObject || {}).map(([key, value]) =>
      normalizeOption(key, value),
    );

    const optionsFlags =
      method.data && !bodyFlags
        ? Object.entries(schemaToObject(method.data)).map(([key, value]) => normalizeOption(key, value))
        : [];

    const flags = [...pathParams, ...optionsFlags, ...bodyFlags.map((x) => ` \\\n  ${x}`)].filter(Boolean).join(' ');

    const methodNamespace = resource.path
      .split('/')
      .map((x) => hyphenCase(x))
      .join(' ');

    lines.push(
      `
${'#'.repeat(startLevel + 1)} ${method.summary}

${note}

${method.description || ''}

\`\`\`shell
magicbell ${methodNamespace} ${hyphenCase(method.name)} ${flags}
\`\`\`
`.trim() + '\n',
    );
  }

  return formatMarkdown(lines.join('\n'));
}

async function updateFeatureFlags(filePath: string, betaMethods: Method[]) {
  const source = await fs.readFile(filePath, 'utf-8');
  const ast = recast.parse(source);
  const program = ast.program;

  // find `const features: ClientOptions['features'] = {};`
  const features = program.body.find(
    (x) => x.type === 'VariableDeclaration' && x.declarations[0].id.name === 'features',
  );

  // update features to be an object with the beta methods
  features.declarations[0].init = builders.objectExpression(
    betaMethods.map((method) =>
      builders.property('init', builders.stringLiteral(method.operationId), builders.booleanLiteral(true)),
    ),
  );

  const output = await recast.print(ast, false);

  if (!output) return;
  await fs.writeFile(filePath, output, 'utf-8');
}

function createResourceIndex(resources: Resource[]) {
  return builders.program([
    ...resources.map((resource) =>
      builders.exportAllDeclaration(builders.stringLiteral(`./${hyphenCase(resource.path)}`), null),
    ),
  ]);
}

type File = { type: string; name: string; source: string; docs?: string; nested?: boolean };

async function main() {
  const resources = await getResources(argv.spec || SPEC_URL);
  const files: Array<File> = [];
  const betaMethods = resources
    .flatMap((x) => x.methods)
    .filter((x) => x.beta)
    .sort((a, b) => a.operationId.localeCompare(b.operationId));

  const meta = JSON.parse(await fs.readFile(META_FILE, 'utf8')) as Meta;
  meta.resources = meta.resources || {};

  // generate ast for new resource files
  for (const rootResource of resources) {
    const parent = { ...rootResource, methods: rootResource.methods.filter((x) => !x.group) };
    const childResourceNames = rootResource.methods.reduce((acc, x) => {
      if (x.group && !acc.includes(x.group)) acc.push(x.group);
      return acc;
    }, []);

    const children = childResourceNames.map((name) => ({
      name: `${rootResource.path}_${name}`,
      path: `${rootResource.path}/${name}`,
      methods: rootResource.methods.filter((x) => x.group === name),
    }));

    for (const resource of [parent, ...children]) {
      const isParent = resource === parent;

      meta.resources[resource.path] = meta.resources[resource.path] || {
        description: `Manage ${resource.path.replace(/[_/]/g, ' ')}`,
      };

      const ast = createResource(resource, isParent ? children : [], meta.resources[resource.path]);
      const docs = createDocs(resource);

      const source = await recast.print(ast);
      files.push({
        type: isParent ? 'resources' : 'sub-resources',
        name: hyphenCase(resource.path) + '.ts',
        source,
        docs,
      });
    }
  }

  await fs.writeFile(META_FILE, JSON.stringify(meta, null, 2) + '\n');

  const resourceIndex = await recast.print(createResourceIndex(resources));
  files.push({ type: 'resources', name: 'index.ts', source: resourceIndex });

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
  }

  for (const file of files) {
    const outFile = path.join(OUT_DIR, file.type.replace('sub-', ''), file.name);
    await fs.mkdir(path.dirname(outFile), { recursive: true });
    await fs.writeFile(outFile, file.source || '', 'utf-8');
    console.log(`generated ${path.relative(process.cwd(), outFile)}`);
  }

  // // update method docs in readme
  const docs = files.map((x) => x.docs).filter(Boolean);
  await updateFeatureFlags(path.join(process.cwd(), 'src/lib/client.ts'), betaMethods);
  await updateReadme(README_MD, 'RESOURCE_METHODS', docs);
  console.log(`updated README.md`);
}

main();
