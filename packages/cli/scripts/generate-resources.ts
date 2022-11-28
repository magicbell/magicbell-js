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
  recast,
  Resource,
  schemaToObject,
  snakeCase,
} from '@magicbell/codegen';
/* eslint-disable no-console */
import { builders } from 'ast-types';
import * as K from 'ast-types/gen/kinds';
import fs from 'fs/promises';
import { stringify } from 'json5';
import { OpenAPIV3 } from 'openapi-types';
import path from 'path';

const SPEC_URL = 'https://raw.githubusercontent.com/magicbell-io/public/main/openapi/spec/openapi.json';
const OUT_DIR = path.join(process.cwd(), 'src');
const META_FILE = path.join(__dirname, 'meta.json');
const README_MD = path.join(process.cwd(), 'README.md');

type ResourceMeta = { description: string };
type Meta = {
  resources: Record<string, ResourceMeta>;
};

function createResource(resource: Resource, meta: ResourceMeta) {
  const hasBetaMethod = resource.methods.some((x) => x.beta);

  const exportName = camelCase(resource.path);

  // new Command()
  let command: K.ExpressionKind = builders.newExpression(b.id('Command'), [
    builders.stringLiteral(hyphenCase(resource.path)),
  ]);
  // command.description(...)
  command = builders.callExpression(builders.memberExpression(command, b.id('description')), [
    builders.stringLiteral(meta.description),
  ]);

  const body: K.StatementKind[] = [];

  body.push(
    builders.exportNamedDeclaration(
      builders.variableDeclaration('const', [builders.variableDeclarator(b.id(exportName), command)]),
    ),
  );

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

    const description = builders.stringLiteral(method.summary || method.description);

    expression = builders.callExpression(builders.memberExpression(expression, b.id('description')), [
      method.beta ? builders.binaryExpression('+', betaFlag, description) : description,
    ]);

    // add arguments
    for (const param of method.params) {
      expression = builders.callExpression(builders.memberExpression(expression, b.id('argument')), [
        builders.stringLiteral(`<${hyphenCase(param.title)}>`),
        builders.stringLiteral((param.description || '').split('\n')[0]),
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
        builders.stringLiteral((schema.description || '').split('\n')[0]),
      ]);
    }

    // list methods get additional options
    if (isListMethod) {
      expression = builders.callExpression(builders.memberExpression(expression, b.id('option')), [
        builders.stringLiteral('--paginate'),
        builders.stringLiteral('Make additional HTTP requests to fetch all pages of results'),
      ]);
    }

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
                        builders.memberExpression(builders.callExpression(b.id('getClient'), []), b.id(exportName)),
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
                          builders.memberExpression(builders.callExpression(b.id('getClient'), []), b.id(exportName)),
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

  return builders.program.from({
    comments: [
      builders.commentLine.from({
        value: ' This file is generated. Do not update manually!\n',
      }),
    ],
    body: [
      b.importDeclaration(['Command'], 'commander'),
      hasBetaMethod && b.importDeclaration('kleur', 'kleur'),
      b.importDeclaration(['getClient'], '../client'),
      b.importDeclaration(['printJson'], '../lib/printer'),
      b.importDeclaration(['parseOptions'], '../options'),

      ...body,
    ].filter(Boolean),
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

function createResourceIndex(resources: Resource[]) {
  return builders.program([
    ...resources.map((resource) =>
      builders.exportAllDeclaration(builders.stringLiteral(`./${hyphenCase(resource.path)}`), null),
    ),
  ]);
}

type File = { type: string; name: string; source: string; docs?: string };

async function main() {
  const resources = await getResources(SPEC_URL);

  const files: Array<File> = [];

  const meta = JSON.parse(await fs.readFile(META_FILE, 'utf8')) as Meta;
  meta.resources = meta.resources || {};
  for (const resource of resources) {
    meta.resources[resource.path] = meta.resources[resource.path] || {
      description: `Manage ${resource.path.replace(/_/g, ' ')}`,
    };
  }

  await fs.writeFile(META_FILE, JSON.stringify(meta, null, 2));

  // generate ast for new resource files
  for (const resource of resources) {
    const ast = createResource(resource, meta.resources[resource.path]);
    const docs = createDocs(resource);

    const source = await recast.print(ast);
    files.push({ type: 'resources', name: hyphenCase(resource.path) + '.ts', source, docs });
  }

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
    await fs.mkdir(path.join(OUT_DIR, dir), { recursive: true });
  }

  for (const file of files) {
    const outFile = path.join(OUT_DIR, file.type, file.name);
    await fs.writeFile(outFile, file.source || '', 'utf-8');
    console.log(`generated ${path.relative(process.cwd(), outFile)}`);
  }
  //
  // // update method docs in readme
  // const docs = files.map((x) => x.docs).filter(Boolean);
  // await updateReadme(README_MD, 'RESOURCE_METHODS', docs);
  // await updateReadme(README_MD, 'FEATURE_FLAGS', createFeatureFlagTable(betaMethods));
  // console.log(`updated README.md`);
  //
}

main();
