import { ASTNode } from 'ast-types';
import * as recast from 'recast';

import { recastTypeScriptParser } from './polyfills/recast-module.js';
import { formatCode } from './text.js';

const RECAST_OPTIONS: recast.Options = { tabWidth: 2, quote: 'single', wrapColumn: 120 };

export function parse(source: string) {
  return recast.parse(source, { parser: recastTypeScriptParser });
}

export function print(node: ASTNode, pretty = true) {
  return pretty
    ? formatCode(recast.prettyPrint(node, RECAST_OPTIONS).code)
    : formatCode(recast.print(node, RECAST_OPTIONS).code);
}
