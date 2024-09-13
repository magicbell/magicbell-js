import { builders } from 'ast-types';
import * as recast from 'recast';

import { recastTypeScriptParser } from './polyfills/recast-module.js';
import { wrapText } from './text.js';

type ObjectExpressionBuilder = typeof builders.objectExpression;
type CallExpressionArguments = Parameters<typeof builders.callExpression>[1][number];

export function importDeclaration(specifiers: string | string[], source: string) {
  const specifierArray = Array.isArray(specifiers) ? specifiers : [specifiers];

  return builders.importDeclaration.from({
    specifiers: specifierArray
      .filter(Boolean)
      .map((x) =>
        x.startsWith('* as ')
          ? builders.importNamespaceSpecifier(builders.identifier(x.replace('* as ', '')))
          : typeof specifiers === 'string'
          ? builders.importDefaultSpecifier(builders.identifier(x))
          : builders.importSpecifier(builders.identifier(x)),
      ),
    source: builders.literal(source),
  });
}

export function commentLine(line: string) {
  return builders.commentLine(line);
}

export function commentBlock(...lines: (string | undefined | null)[]) {
  return builders.commentBlock(
    `*\n${lines
      .filter((x) => typeof x === 'string')
      .flatMap((x) =>
        wrapText(x)
          .split('\n')
          .map((x, idx, all) => (idx > 0 && all[0][0] === '@' ? `  ${x}` : x)),
      )
      .map((line) => ` * ${line}`)
      .join('\n')}\n *`,
  );
}

export function objectProperty(name: string, value?: any) {
  return builders.objectProperty.from({
    key: builders.identifier(name),
    value:
      typeof value === 'object'
        ? value
        : typeof value === 'undefined'
        ? builders.identifier(name)
        : typeof value === 'boolean'
        ? builders.booleanLiteral(value)
        : typeof value === 'number'
        ? builders.numericLiteral(value)
        : builders.stringLiteral(value),
    shorthand: typeof value === 'undefined',
  });
}

export function param(name: string, type: string, optional = false) {
  return builders.identifier.from({
    name: optional ? `${name}?` : `${name}`,
    typeAnnotation: builders.tsTypeAnnotation(
      type === 'string' ? builders.tsStringKeyword() : builders.tsTypeReference(builders.identifier(`${type}`)),
    ),
  });
}

export function exportObject(id: string, obj: any, typeAnnotation?: string) {
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
            typeAnnotation: typeAnnotation ? builders.tsTypeReference(builders.identifier(typeAnnotation)) : undefined,
          }),
        }),
      ],
    }),
  });
}

export function tsTypeAliasDeclaration(id: string, type: string, exprName?: string) {
  return builders.tsTypeAliasDeclaration.from({
    id: builders.identifier(id),
    typeAnnotation: builders.tsTypeReference.from({
      typeName: builders.identifier(type),
      typeParameters: exprName
        ? builders.tsTypeParameterInstantiation.from({
            params: [
              builders.tsTypeQuery.from({
                exprName: builders.identifier(exprName),
              }),
            ],
          })
        : undefined,
    }),
  });
}

export function classProperty(key: string, value: any) {
  return builders.classProperty.from({
    key: builders.identifier(key),
    value: typeof value === 'string' ? builders.stringLiteral(value) : value,
  });
}

export function newExpression(callee: string, ...args: string[]) {
  return builders.newExpression.from({
    callee: builders.identifier(callee),
    arguments: args.map((x) => builders.identifier(x)).filter(Boolean),
  });
}

export function callExpression(callee: string, ...args: (CallExpressionArguments | string)[]) {
  return builders.callExpression.from({
    callee: builders.identifier(callee),
    arguments: args.map((x) => (typeof x === 'string' ? builders.identifier(x) : x)).filter(Boolean),
  });
}

export function objectExpression(...properties: Parameters<ObjectExpressionBuilder>[0]) {
  return builders.objectExpression(properties.filter(Boolean));
}

export function id(name: string) {
  return builders.identifier(name);
}
